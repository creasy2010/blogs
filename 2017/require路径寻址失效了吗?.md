## require路径寻址失效了吗? 

在使用lerna+bootstrap管理项目时,require总是找不到module? 有点颠覆我的认知,最后终于明朗起来,记录下来;


### 背景介绍
项目结构如下. 通过lerna管理项目,并开启useWorkspaces, packages/*下的node_module聚集到x-site/node_modules避免module包重复加载;

 ![alt text](http://oss-hz.qianmi.com/x-site/dev/doc/dong/video2deal/xsite/blogs/WX20171220-075649@2x.png)


问题就来了. 原本执行的好好的命令执行不了了. 

```pwd
/Users/dong/workbench/x-site/packages/x-site-web-openapi
node --harmony ./settings/webpack.openapi.config.js

Babel compiler cannot be found, please add it to your package.json file:
    npm install --save-dev babel-core
 { Error: Cannot find module '/Users/dong/workbench/x-site/packages/x-site-web-openapi/node_modules/babel-core'
    at Function.Module._resolveFilename (module.js:536:15)
    at Function.Module._load (module.js:466:25)
    at Module.require (module.js:579:17)
    at require (internal/module.js:11:18)
    at setupBabel (/Users/dong/workbench/x-site/node_modules/awesome-typescript-loader/src/instance.ts:232:25)
    at Object.ensureInstance (/Users/dong/workbench/x-site/node_modules/awesome-typescript-loader/src/instance.ts:121:21)
    at compiler (/Users/dong/workbench/x-site/node_modules/awesome-typescript-loader/src/index.ts:47:22)
    at Object.loader (/Users/dong/workbench/x-site/node_modules/awesome-typescript-loader/src/index.ts:16:18)
    at LOADER_EXECUTION (/Users/dong/workbench/x-site/node_modules/loader-runner/lib/LoaderRunner.js:119:14)
    at runSyncOrAsync (/Users/dong/workbench/x-site/node_modules/loader-runner/lib/LoaderRunner.js:120:4)
    at iterateNormalLoaders (/Users/dong/workbench/x-site/node_modules/loader-runner/lib/LoaderRunner.js:229:2)
    at Array.<anonymous> (/Users/dong/workbench/x-site/node_modules/loader-runner/lib/LoaderRunner.js:202:4)
    at Storage.finished (/Users/dong/workbench/x-site/node_modules/webpack/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:40:15)
    at /Users/dong/workbench/x-site/node_modules/webpack/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:77:9
    at /Users/dong/workbench/x-site/node_modules/graceful-fs/graceful-fs.js:78:16
    at FSReqWrap.readFileAfterClose [as oncomplete] (fs.js:511:3) code: 'MODULE_NOT_FOUND' }

```
报错提示babel-core 找不到... 



按照require的规则会一直向上寻找直到系统根目录

参考官方解释
```html

Loading from node_modules Folders#
If the module identifier passed to require() is not a core module, and does not begin with '/', '../', or './', then Node.js starts at the parent directory of the current module, and adds /node_modules, and attempts to load the module from that location. Node will not append node_modules to a path already ending in node_modules.

If it is not found there, then it moves to the parent directory, and so on, until the root of the file system is reached.

For example, if the file at '/home/ry/projects/foo.js' called require('bar.js'), then Node.js would look in the following locations, in this order:

/home/ry/projects/node_modules/bar.js
/home/ry/node_modules/bar.js
/home/node_modules/bar.js
/node_modules/bar.js
This allows programs to localize their dependencies, so that they do not clash.

It is possible to require specific files or sub modules distributed with a module by including a path suffix after the module name. For instance require('example-module/path/to/file') would resolve path/to/file relative to where example-module is located. The suffixed path follows the same module resolution semantics.
```


#### 临时方案-试一把
猜测可能 是项目执行路径有问题导致的, 所以把子项目的命令放到根目录来处理

```pwd
/Users/dong/workbench/x-site/
node --harmony ./packages/x-site-web-openapi/settings/webpack.openapi.config.js
```


试一试, 果然OK了. 

#### 刨根问底
那么根本 原因呢 ?  是官方文档写错了, 是我理解错了. 还是项目配置错了. 


一步一步跟踪,查看awesome-typescript-loader后发现这里引入babel-core 是通过require 而且参数是全路径; 
这样问题就解决了 
如果是使用require('babel-core') 那么会依照规则一层一层向上查找, 而现在是require('/Users/dong/workbench/x-site/packages/x-site-web-openapi/node_modules/babel-core') 当然找不到了. 

```typescript

function setupBabel(loaderConfig: LoaderConfig, context: string): any {
    let babelImpl: any;
    if (loaderConfig.useBabel) {
        try {
            let babelPath = loaderConfig.babelCore || path.join(context, 'node_modules', 'babel-core');
            console.log("babelPath:",babelPath,loaderConfig.babelCore,context);
            babelImpl = require(babelPath);
        } catch (e) {
            console.error(BABEL_ERROR, e);
            process.exit(1);
        }
    }

    return babelImpl;
}

```

#### 解决方案; 
