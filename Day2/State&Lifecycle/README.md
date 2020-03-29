# State & Lifecycle

## 正确使用State

- 不要直接修改state，而是使用`setState()`，只能在构造函数中给state赋值
- state的更新可能是异步的，不要依赖props或state更新下一个状态。如果必须依赖，可以向`setState()`传入一个函数，这个函数接收两个参数，上一个状态的state和下一个状态的props
- state的更新会被合并。state可能会包含几个变量，但是每次调用`setState()`可以只更新某一个或某几个变量，React会执行浅合并。
  