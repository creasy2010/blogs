---
title: what's React Hook?
subTitle: React Hook解读
cover: WX20181221-161638.png
category: "tools"
---

react Hook 是 react16.7-aplha 新特性;
下面来认识下什么是 react-hook;

## 为什么而引入

在(官主文档)[https://reactjs.org/docs/hooks-intro.html#motivation]上有详细的说明;
主要基于三点而引入这个新特性;

1. 组件内与状态有关的逻辑很难重用;
   目前这部分的重用,主要使用(高阶组件)[https://reactjs.org/docs/higher-order-components.html] 或(render props)[https://reactjs.org/docs/render-props.html],而这种方式会破坏组件的结构 比如我们使用的 react-router,plume2, redux 等库写出的代码,最终在 dom 层会包很多层; 而使用 react-hook 却不会有这样的结果 .
2. 组件变得难以理解;
   任何事情刚开始总是简单易用,当代码有了量变后,有些混乱才会显示出来;在组件中一般我们会把相关逻辑放到 生命周期方法 componentDidmount componentDidUpdate 中, 但这两个生命周期方法可能会包含 2 个甚至多个不相关的逻辑 .时间一长,代码量大了之后会产生混乱,导致容易出错,不易维护; 而使用 react-hook 可以把一个完整的逻辑封装在一起.
3. class component 很难进行编译优化;
   官方文档还强调了会对开发人员有更高的要求 ,比如要理解 this bind 等操作(这一点不太同意,不做详细说明了)
   然而编译优化却是一个难点; 目前前端框架如 svelte, angular glimmer vue.js 等大量产生, 对 react 来说性能优化也要跟上 如 component folding, hot reloading 等,在 class component 开发模式,速度慢,可信度也不高; 而使用 react-hook 使 reactd 在编译阶段的优化变的简单明了可靠;

## 个人使用感受

试用了下(目前还是测试版本),
第一个感觉是现在做的 react component 似乎成了假的 react ;
第二 函数式的写法给人的感觉很舒服;
第三 Context 使用起来 so easy;
而且 react-hook 考虑到 typescript,相信后面状态库的接入会更简单;

## useState useEffect 是如何发生变化的

不知道大家有没有详细读官方文档 , 有一段说的很清楚:

```typescript
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
  // First render
  // ------------
  useState("Mary"); // 1. Initialize the name state variable with 'Mary'
  useEffect(persistForm); // 2. Add an effect for persisting the form
  useState("Poppins"); // 3. Initialize the surname state variable with 'Poppins'
  useEffect(updateTitle); // 4. Add an effect for updating the title

  // -------------
  // Second render
  // -------------
  useState("Mary"); // 1. Read the name state variable (argument is ignored)
  useEffect(persistForm); // 2. Replace the effect for persisting the form
  useState("Poppins"); // 3. Read the surname state variable (argument is ignored)
  useEffect(updateTitle); // 4. Replace the effect for updating the title
  // ...
}
```

每当状态发生变化时,useState 会执行, 首次执行时,会初始化参数,第二次执行时会读取变量的值, 忽略参数;
useState 会返回一个数组,我们进行数组解构便可以拿到变量值与变量的更新方法(相当于 setState)

## 使用总结

### useEffect 优化

如上面的例子, 当组件发生变化 useEffect 便会执行一次, 好似在 class component 中在 componentDidmount didUpdate 中调用一般, 那么如何做到只执行一次, 或指定执行次数呢?自己写的代码 不能乱跑

```typescript
useEffect(
  () => {
    document.title = `You clicked ${count} times`;
  },
  [count]
); // Only re-run the effect if count changes
```

我们在调用 useEffect 时传入第二个可选参数,当数据发生变化时,才会执行?这样执行一次,或多次我们可以通过控制变量而精确控制

### 为什么只能在顶层使用 useHook?

官方举了一个(例子)[https://reactjs.org/docs/hooks-rules.html#explanation],但只说明了,如果不放在顶层 放在条件语句中会导致顺序不一致, 但没有解释 为什么一定要求顺序一致;
难道 useHook 参数只做初始化使用,后面再调用靠的是顺序来确定是什么调用,并不是 key ,如果是这样就说的通了.

```typescript
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
}
```

```typescript
// ------------
// First render
// ------------
useState("Mary"); // 1. Initialize the name state variable with 'Mary'
useEffect(persistForm); // 2. Add an effect for persisting the form
useState("Poppins"); // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle); // 4. Add an effect for updating the title

// -------------
// Second render
// -------------
useState("Mary"); // 1. Read the name state variable (argument is ignored)
useEffect(persistForm); // 2. Replace the effect for persisting the form
useState("Poppins"); // 3. Read the surname state variable (argument is ignored)
useEffect(updateTitle); // 4. Replace the effect for updating the title
// ...
```

```typescript
// 🔴 We're breaking the first rule by using a Hook in a condition
if (name !== "") {
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });
}

//如果把usehook放到方法里,会导致顺序与初始化时不一致;
useState("Mary"); // 1. Read the name state variable (argument is ignored)
// useEffect(persistForm)  // 🔴 This Hook was skipped!
useState("Poppins"); // 🔴 2 (but was 3). Fail to read the surname state variable
useEffect(updateTitle); // 🔴 3 (but was 4). Fail to replace the effect
```

那如果 我们场景中一定要加判断呢?

```typescript
useEffect(function persistForm() {
  // 👍 We're not breaking the first rule anymore
  if (name !== "") {
    localStorage.setItem("formData", name);
  }
});
```

### custom hooks

这个可以看(官方教程)[https://reactjs.org/docs/hooks-custom.html]
在自定义 custom hooks 中可以使用其他 react hooks;

## context 如何使用 ?

传统方式

```typescript
import React from "react";
import ReactDOM from "react-dom";

// Create a Context
const NumberContext = React.createContext();
// It returns an object with 2 values:
// { Provider, Consumer }

function App() {
  // Use the Provider to make a value available to all
  // children and grandchildren
  return (
    <NumberContext.Provider value={42}>
      <div>
        <Display />
      </div>
    </NumberContext.Provider>
  );
}

function Display() {
  // Use the Consumer to grab the value from context
  // Notice this component didn't get any props!
  return (
    <NumberContext.Consumer>{value => <div>The answer is {value}.</div>}</NumberContext.Consumer>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

让我们使用 useContext 优化下 display 的代码:

```typescript
import React, { useContext } from "react";

function Display() {
  const value = useContext(NumberContext);
  return <div>The answer is {value}.</div>;
}
```

## 参考文档

[How the useContext Hook Works]([https://daveceddia.com/usecontext-hook/)
[Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
[Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
[Performance Optimizations](https://reactjs.org/docs/hooks-faq.html#performance-optimizations)
