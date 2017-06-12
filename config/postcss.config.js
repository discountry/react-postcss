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