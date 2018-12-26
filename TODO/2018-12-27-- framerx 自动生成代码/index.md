---
title: framerx 自动生成代码
subTitle: framerx 自动生成代码
cover: WX20181226-172250@2x.png
category: "tools"
---

## 生成代码后的问题

1. 生成时有二次修改, 那么再次生成时,不就覆盖了代码吗 ?????

   能否保证,生成的代码与开发者写的代码隔离

2. 组件对后台数据的依赖怎么解决?:标准化接口来处理,显示时可以使用默认值;

3. 相关组件的逻辑要提到 code 目录要开发人员做中去. 那页面是设计做的 两个人在一个逻辑中做事.会不会冲突?

   再回归到本质:功能 是给谁做的, 解决什么问题? 要不要让设计师要页面全 ok 了,还是设计还是出设计,开发通过拖拽快速形成页面?

## 项目结构

在项目代码目录中(打开 file/ show project folder ) ./design/document.json 代表了所编辑页面所有内容(类似于建站的配置清单)

举例说明下.

> \_\_class:表示组件类型, 此例中使用到的是 CodeComponent;
> codeComponentIdentifier:表示此组件引用路径,用于 import 动态加载进入项目
> children:表示  此组件的子组件 表明组件间  可以嵌套;在官方文档  对 frame 及 stack 组件的描述可知嵌套是无限级的.
> width heigth;表示组件的大小
> left top:表示组件的定位;
> id parentID; 组件唯一标识,级父组件标识;

又这里的信息又引发几个问题

1. 反应式如何实现?
2. metadata 目录是做什么用的?
3. link 如何实现

   在 json 中有 navigationTarget 属性

```json
{
            "__class" : "CodeComponentNode",
            "aspectRatio" : null,
            "blur" : 12,
            "blurEnabled" : 0,
            "blurType" : "layer",
            "borderBottom" : 1,
            "borderColor" : "#222",
            "borderEnabled" : 0,
            "borderLeft" : 1,
            "borderPerSide" : false,
            "borderRight" : 1,
            "borderStyle" : "solid",
            "borderTop" : 1,
            "borderWidth" : 1,
            "bottom" : null,
            "boxShadows" : [

            ],
            "brightness" : 100,
            "brightnessEnabled" : 0,
            "centerAnchorX" : 0.5,
            "centerAnchorY" : 0.047976011994002997,
            "children" : [

            ],
            "clip" : true,
            "codeComponentIdentifier" : "@framer\/framer.examples\/.\/NavigationBar.tsx_NavigationBar",
            "codeComponentProps" : {
              "appearance" : "light",
              "backItemTitle" : "Previous",
              "customBackground" : "#09F",
              "rightItemTitle" : "Edit",
              "showChevron" : true,
              "textColor" : "black",
              "tintColor" : "#007AFF",
              "title" : "Title"
            },
            "codeOverrideEnabled" : true,
            "constraintsLocked" : false,
            "contrast" : 100,
            "contrastEnabled" : 0,
            "exportOptions" : [

            ],
            "fillColor" : "rgba(255,255,255,1)",
            "fillEnabled" : false,
            "fillGradient" : {
              "__class" : "LinearGradient",
              "alpha" : 1,
              "angle" : 0,
              "end" : "rgba(0,0,0,0)",
              "start" : "black"
            },
            "fillImage" : null,
            "fillImagePixelHeight" : null,
            "fillImagePixelWidth" : null,
            "fillImageResize" : "fill",
            "fillType" : "color",
            "grayscale" : 0,
            "grayScaleEnabled" : 0,
            "height" : 64,
            "heightType" : 0,
            "hueRotate" : 0,
            "hueRotateEnabled" : 0,
            "id" : "TycfuAbur",
            "intrinsicHeight" : 64,
            "intrinsicWidth" : 375,
            "invert" : 0,
            "invertEnabled" : 0,
            "left" : 0,
            "locked" : false,
            "name" : null,
            "opacity" : 1,
            "originalid" : null,
            "parentid" : "LlE6CVmSM",
            "radius" : 0,
            "radiusBottomLeft" : 0,
            "radiusBottomRight" : 0,
            "radiusIsRelative" : false,
            "radiusPerCorner" : false,
            "radiusTopLeft" : 0,
            "radiusTopRight" : 0,
            "right" : 0,
            "rotation" : 0,
            "saturate" : 100,
            "saturateEnabled" : 0,
            "sepia" : 0,
            "sepiaEnabled" : 0,
            "top" : 0,
            "visible" : true,
            "width" : 375,
            "widthType" : 0}
```
