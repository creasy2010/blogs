# Pandora.js要解决什么问题

浏览Pandora.js的介绍文章<a href="http://taobaofed.org/blog/2017/12/21/pandora-ipc/">文章</a> , 有一段话印象比较深刻

```
进程间如何通信呢？
起初我们有一个比较简单的 IPC 实现，通过 Domain Socket 进行通信。也是传统的 C/S 架构的，两个进程间进行比较基础的消息通信（比较类似 Node-IPC 这个包）。

不过实在是太基础了，时不时地在想：

在同一台计算机上的同一个语言，为什么要搞得这么痛苦？是 Node.js 太弱了吗？
我要有线程的话，需要活的这么累吗？
```

# 技术实现
node是单线程, 采用多进程为了为了提高系统cpu资源利用率,Pandora.js中进程通信是如何做的呢?;



## 序列化与反序列化
<a href ="https://github.com/midwayjs/pandora/blob/a45b519eadb500a72364dda9eae6c27b90173f9b/packages/messenger/src/client.ts">pandora/packages/messenger/src/client.ts</a>

```

/**
   * 反序列化
   * @param {Buffer} buf - 二进制数据
   * @return {Object} 对象
   */
  decode(buf, header) {
    const first = header.readUInt8(0);
    const id = header.readUInt32BE(1);
    let data;
    if (buf) {
      data = JSON.parse(buf);
    }

    return {
      oneway: !!(first & 0x80),
      isResponse: !(first & 0x40),
      id,
      data,
    };
  }
  /**
   * 序列化消息
   * @param {Buffer} buf - 二进制数据
   * @return {Object} 对象
   */
  encode(message) {
    /*
     *  header 8byte
     * 1byte 8bit用于布尔判断 是否双向通信|响应还是请求|后面6bit保留
     * 4byte packetId 包id最大4位
     * 4byte 消息长度 最大长度不要超过4个字节
     * body
     * nbyte 消息内容
     * */
    let first = 0;
    if (message.oneway) {
      first = first | 0x80;
    }
    if (message.isResponse === false) {
      first = first | 0x40;
    }
    const header = new Buffer(9);
    const data = JSON.stringify(message.data, replaceErrors);
    const body = new Buffer(data);
    header.fill(0);
    header.writeUInt8(first, 0);
    header.writeUInt32BE(message.id, 1);
    header.writeUInt32BE(Buffer.byteLength(data), 5);
    return Buffer.concat([header, body]);
  }

```


## 发送数据

<a href ="https://github.com/midwayjs/pandora/blob/a45b519eadb500a72364dda9eae6c27b90173f9b/packages/messenger/src/client.ts">pandora/packages/messenger/src/client.ts</a>
```
/**
      * 发送数据
      * @param {Object} packet
      *   - {Number} id - packet id
      *   - {Buffer} data - 发送的二进制数据
      *   - {Boolean} [oneway] - 是否单向
      *   - {Number} [timeout] - 请求超时时长
      * @param {Function} [callback] - 回调函数，可选
      * @return {void}
      */
     _send(packet, callback?) {
       // 如果有设置并发，不应该再写入，等待正在处理的请求已完成；或者当前没有可用的socket，等待重新连接后再继续send
       if (!this._writable) {
         this._queue.push([packet, callback]);
         // 如果设置重连的话还有可能挽回这些请求
         if (!this._socket && !this._reConnectTimes) {
           this._cleanQueue();
         }
         return;
       }

       packet.id = this.createPacketId();
       if (callback) {
         const timeout = packet.timeout || this.options.responseTimeout;
         const callbackEvent = `response_callback_${packet.id}`;
         const timer = setTimeout(() => {
           this.removeAllListeners(callbackEvent);
           const err = new Error(`target no response in ${timeout}ms`);
           err.name = 'MessengerRequestTimeoutError';
           callback(err);
         }, timeout);
         this.once(callbackEvent, (message) => {
           clearTimeout(timer);
           callback(null, message);
         });
       }

       this._socket.write(this.encode(packet));
       this._resume();
     }

```

## hub及路由的概念

起初非常不理解, 多了很多遍才有所感受 为什么引入hub 及路由
hub 集线器,我们把不同的服务(进程间调用的服务)集中起来当做一个"服务端" , 客户端(调用进程)通过标识符访问是要用路由决定用那个服务来处理,似乎像一个微型的web服务,而每一个调用就是一个request;


<a href = "https://github.com/midwayjs/pandora/blob/a45b519eadb500a72364dda9eae6c27b90173f9b/packages/hub/src/hub/Hub.ts">pandora/packages/hub/src/hub/Hub.ts </a>
<a href = "https://github.com/midwayjs/pandora/blob/a45b519eadb500a72364dda9eae6c27b90173f9b/packages/hub/src/hub/HubClient.ts">pandora/packages/hub/src/hub/HubClient.ts </a>
<a href = "https://github.com/midwayjs/pandora/blob/a45b519eadb500a72364dda9eae6c27b90173f9b/packages/hub/src/hub/Balancer.ts">pandora/packages/hub/src/hub/Balancer.ts </a>

## object-proxying
字面上看对象代理,结合场景就很容易理解了,

## 数据监控ops-first



# 相关
<a href ="https://github.com/midwayjs/pandora">pandora Git</a>

<a href ="http://taobaofed.org/blog/2017/12/21/pandora-ipc/">让进程间通信更容易 - Pandora.js 的 IPC-Hub</a>