# Handling Events

- `React`的事件名使用camelCase
- 使用JSX时，需要传入一个函数作为事件处理函数
- 默认会在函数的最后一个参数后面，传入合成事件e
- 在事件中必须显示地阻止默认行为

class的方法默认不会绑定`this`，因此在class组件中绑定方法时，需要在构造函数中先手动绑定`this`。不过有两种方法可以解决：
- 使用`public class field`

```javascript
class Demo extends React.Component {
  handleClick = () => {
    console.log('this: ', this)
  }
  
  render () {
    return (
      <button onClick={this.handleClick}>Click me</button>
    )
  }
}
```

- 在回调函数中使用箭头函数

```javascript
class Demo extends React.Component {
  handleClick () {
    console.log('this: ', this)
  }
  
  render () {
    return (
      <button onClick={() => {this.handleClick()}}>Click me</button>
    )
  }
}
```

但是上面这个方法会有一个问题，即如果把这个回调函数当做prop传递给子组件，那么每次都会重新绑定一个新的函数。因此建议在构造函数中绑定`this`或者使用`public class field`