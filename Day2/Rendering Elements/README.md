# Rendering Elements

## Updating the Rendered Element

**React 元素是不可变对象**

### Immutable
[Immutable Object](https://en.wikipedia.org/wiki/Immutable_object)

immutable object, 即创建后不能被改变的对象。Immutability，即经过处理后值或状态保持不变的变量。

在JavaScript中本来就有immutable类型，例如`String`对象的**值类型**。

在声明一个字符串时：`let str = 'abc'`，不能直接修改字符串中的字符。因为`str`是值类型而不是数组，因此不能用`str[0] = 'd'`这种方式修改字符串。虽然可以用`str = 'def'`，但这是重新赋值而不是修改最开始的`abc`那份字符串。即便使用一些内置的字符串方法，例如`replace`、`toUpperCase`、`trim`等，也是返回一个新的字符串，而不会修改最初的字符串。

虽然字符串是immutable，但是字符串对象并不是。所谓"不可变"，即不能改变变量的属性和状态，也不能增加新的属性。

```javascript
let str = 'immutable';

str.newAttr = 'cannot be set'; // silently ignore
console.log(str.newAttr); // undefined
```
上面的代码，第二行会静默失败。

```javascript
let strObj = new String('mutable');

strObj.newAttr = 'new attr';
console.log(strObj.newAttr); // new attr

strObj.newAttr = 'new attr2';
console.log(strObj.newAttr); // new attr2
```
`strObj`是一个字符串对象，可以给它增加、修改属性。

这和我们平时对`JavaScript`的了解一样，我们可以对对象做属性的增删改查。对于`immutable`在`React`中的使用，还需要了解另外一个概念。

### 引用相等和值相等
在`JavaScript`中，可以使用`===`和`!==`比较引用类型和值类型。对于两个值类型，直接比较值是否相等，而对于引用类型，需要比较两个引用是否为同一个对象。

对于值类型：

```javascript
let a1 = 1;
let a2 = a1;

console.log(a1 === a2); // true

let a3 = 1;

console.log(a1 === a3); // true
```

而对于引用类型：

```javascript
let b1 = {b: 1};
let b2 = b1;

console.log(b1 === b2); // true

let b3 = {b: 1};

console.log(b1 === b3); // false
```

因为`b3`虽然看上去和`b1`的内容是一样的，但是在创建`b3`时，实际上在内存中开辟了另外一片空间来储存`b3`的内容，因此它和`b1`所引用的并不是同一个内存空间中的对象，所以它们不相等。

而`React`则是利用了不可变的对象前后比较时更容易这个特性。

### React的性能优化
`React`内部维护了一个用来描述UI的虚拟DOM，任意一个DOM节点的内容（可能是节点属性，可能是节点的innerHTML等）改变了，对应的虚拟DOM的信息也会改变。然后，`React`会对前后两个版本的虚拟DOM做比较，这样，只有那些内容改变了的、或是受到影响的元素，才会更新。

如果元素的状态或值是immutable的，可以很容易比较它们是否被改变。

对于对象来说，如果是很深层次的嵌套，很难确定是哪一层改变了：`myPackage.addr.province.city.district.building.floor = 10`

而对于数组来说，判断两个数组是否相等，需要判断数组中每一项是否相等。那么对于那些数据量很大，或者数组项十分复杂的数据，依次判断是十分消耗性能的。

### 实现immutability
`JavaScript`中提供了一些创建新对象的方法，例如使用`Object.assign`创建新对象避免定义未修改的属性：

```javascript
const createNewObj = (source, newAttr1, newAttr2) => {
  return Object.assign({}, source, {
    attr1: newAttr1,
    attr2: newAttr2
  })
}
```

这样避免了修改到源对象。或者可以使用扩展运算符（二者的原理[不尽相同](https://2ality.com/2016/10/rest-spread-properties.html#spread-defines-properties-objectassign-sets-them)）：

```javascript
const createNewObj = (source, newAttr1, newAttr2) => {
  return {
    ...source,
    attr1: newAttr1,
    attr2: newAttr2
  }
}
```

对于数组也可以使用扩展运算符或者结合`slice`和`concat`方法创建新数组：

```javascript
const createNewArr = (source, newItem) => {
  return [...source, newItem]
}

const add = (source, newItem) => {
  return source.concat([newItem])
}

const remove = (source, index) => {
  return source.slice(0, index).concat(source.slice(index+1))
}
```

以上的方法也会有缺点，第一，对于大型的对象和数组来说，将属性和值从源数据移到新数据中，消耗可能会很大。第二，对象和数组都是默认可变的，我们需要时刻记住使用这些方法。所以一般会使用外部的immutable库来实现。

### Last but not least
`Immutable`是学习`React`需要理解的一个概念，但并不是没有缺点的。`Immutable`很重要，但也是折中的一种选择。

### Reference
- [https://juejin.im/post/5ad807b36fb9a045d639ad18](https://juejin.im/post/5ad807b36fb9a045d639ad18)
- [https://blog.csdn.net/qq_37746973/article/details/79381714](https://blog.csdn.net/qq_37746973/article/details/79381714)
- [https://en.wikipedia.org/wiki/Immutable_object](https://en.wikipedia.org/wiki/Immutable_object)
