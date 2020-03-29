## Components and Props

在`React`中又两种书写组件的方式：

- 函数组件

```javascript
function HelloWorld (props) {
  return <h1>Hi, {props.name}</h1>
}
```

- class组件

```javascript
class HelloWorld extends React.component {
  render () {
    return <h1>Hi, {this.props.name}</h1>
  }
}
```

*注：组件名称必须以大写字母开头。React会将小写字母开头的组件当做是HTML的原生DOM标签。*

**建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。**

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**