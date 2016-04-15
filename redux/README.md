Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。

# 安装

安装稳定版：

    npm install --save redux
    
多数情况下，你还需要使用 React 绑定库和开发者工具。

    npm install --save react-redux
    npm install --save-dev redux-devtools
    
# FLUX思想

大致的过程是这样的，View层不能直接对state进行操作，
而需要依赖Actions派发指令来告知Store修改状态，
Store接收Actions指令后发生相应的改变，View层同时跟着Store的变化而变化。

  ╔═════════╗       ╔════════╗       ╔═════════════════╗
  ║ Actions ║──────>║ Stores ║──────>║ View Components ║
  ╚═════════╝       ╚════════╝       ╚═════════════════╝
       ^                                      │
       └──────────────────────────────────────┘


    
# 要点

应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。
惟一改变 state 的办法是触发 action，一个描述发生什么的对象。
为了描述 action 如何改变 state 树，你需要编写 reducers。

你应该把要做的修改变成一个普通对象，这个对象被叫做 action，而不是直接修改 state。
然后编写专门的函数来决定每个 action 如何改变应用的 state，这个函数被叫做 reducer。

如果你以前使用 Flux，那么你只需要注意一个重要的区别。Redux 没有 Dispatcher 且不支持多个 store。
相反，只有一个单一的 store 和一个根级的 reduce 函数（reducer）。
随着应用不断变大，你应该把根级的 reducer 拆成多个小的 reducers，
分别独立地操作 state 树的不同部分，而不是添加新的 stores。
这就像一个 React 应用只有一个根级的组件，这个根组件又由很多小组件构成。

它的美在于做复杂应用和庞大系统时优秀的扩展能力。
由于它可以用 action 追溯应用的每一次修改，因此才有强大的开发工具。
如录制用户会话并回放所有 action 来重现它。

# 三大原则

## 单一数据源

整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。
由于是单一的 state tree ，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。
此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。

## State 是只读的

惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。
因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。
 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

## 使用纯函数来执行修改

为了描述 action 如何改变 state tree ，你需要编写 reducers。

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。
刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，
分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，
你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。





















# 参考

[reactjs/redux](https://github.com/reactjs/redux)

[Redux 中文文档](http://cn.redux.js.org/)