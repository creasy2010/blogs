
npm打包上传时总是 出现"Payload Too Large"的错误,但是查看.npmignore文件总觉得没有问题,此情此景下如何验证?
查了下资料还真有一个小技巧 "npm pack",该命令会打一个压缩后,但不会上传到npm 这样我们就可以查看包中的内容,看看有什么不应该传入的东西了


Payload Too Large 报错信息如下:
```console
 pc git:(br-lerna) ✗ npm publish 
npm ERR! publish Failed PUT 413
npm ERR! Darwin 16.7.0
npm ERR! argv "/usr/local/bin/node" "/usr/local/lib/node_modules/npm3/node_modules/npm/cli.js" "publish"
npm ERR! node v8.9.2
npm ERR! npm  v3.10.10
npm ERR! code E413

npm ERR! 413 Payload Too Large
npm ERR! 
npm ERR! If you need help, you may report this error at:
npm ERR!     <https://github.com/npm/npm/issues>

npm ERR! Please include the following file with any support request:
npm ERR!     /Users/dong/OfficialWebsite/packages/pc/npm-debug.log

```


https://docs.npmjs.com/misc/developers#testing-whether-your-npmignore-or-files-config-works


```html

Testing whether your .npmignore or files config works
If you want to double check that your package will include only the files you intend it to when published, you can run the npm pack command locally which will generate a tarball in the working directory, the same way it does for publishing.

```

##其他 通过链接方式访问npm生成的压缩包http://registry.npm.qianmi.com/@qianmi/official-pc/download/@qianmi/official-pc-1.0.0-BETA11.11.tgz