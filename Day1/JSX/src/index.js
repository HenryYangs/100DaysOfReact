let domContainer = document.querySelector('#root');
let renderContent, text;

// * basic use
// text = 'Henry';
// renderContent = <h1>Hi, { text }</h1>;

// * expression in JSX
// renderContent = <h1>1 + 1 = { 1 + 1 }</h1>

// * use JSX in for loop
renderContent = [1, 2, 3, 4, 5].map(i => <h1 key={i}>{i}</h1>)

// * special attributes
// renderContent = <p tabIndex='1'>tabIndex</p>

// * escape character
// renderContent = <p>{'<script>alert(1)</script>'}</p>

ReactDOM.render(
  renderContent,
  domContainer
);