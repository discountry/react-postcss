# react-postcss

## 安装依赖

```bash
npm install autoprefixer postcss-initial postcss-import postcss-mixins postcss-nested postcss-simple-vars postcss-math postcss-color-function --save-dev
```

## 改动部分

### postcss.config.js

```js
module.exports = {
  plugins: {
    /* autoprefix for different browser vendors */
    'autoprefixer': {},
    /* reset inherited rules */
    'postcss-initial':{
      reset: 'inherited' // reset only inherited rules
    },
    /* enable css @imports like Sass/Less */
    'postcss-import': {},
    /* enable mixins like Sass/Less */
    'postcss-mixins':{
      mixins: require('./src/mixins')
    },
    /* enable nested css selectors like Sass/Less */
    'postcss-nested':{},
    /* require global variables */
    'postcss-simple-vars':{
      variables: function variables() {
        return require('./src/variables')
      },
      unknown: function unknown(node, name, result) {
        node.warn(result, 'Unknown variable ' + name)
      }
    },
    /* PostCSS plugin for making calculations with math.js  */
    'postcss-math':{},
    /* transform W3C CSS color function to more compatible CSS. */
    'postcss-color-function':{}
  }
}
```

### config/src/mixins.js

```js
// src/mixins.js
var globalMixins = {
  /* noSelect is a static mixin  */
  noSelect: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
  },
  /* OpenSans is a dynamic mixin  */
  OpenSans: function (obj, value) {
    return {
      'font-family': 'Open Sans, sans-serif',
      'font-style': 'normal',
      'font-size': value,
      'font-weight': 200,
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale'
    }
  }
}
module.exports = globalMixins
```

### config/src/variables.js

```js
var globalVariable = {
  primary: 'blue'
}
module.exports = globalVariable
```

### webpack.config.dev.js

```js
// 189
{
  loader: require.resolve('postcss-loader'),
  options: {
    config: {
      path: './config/postcss.config.js'
    }
  }
},
// 198
```

### App.css

```css
/* 16 */
.App-intro {
  color: $primary; /* variable usage */
  @mixin noSelect; /* mixin usage */
  @mixin OpenSans 30px; /* mixin with value usage */
}
/* 22 */
```

### App.js

```js
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
```