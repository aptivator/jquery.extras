import buble from 'rollup-plugin-buble';
let packageJson = require('./package.json');
let {'jsnext:main': jsnext, main} = packageJson;

export default {
  moduleName: 'jquery.extras',
  entry: 'src/extras.js',
  targets: [{
    format: 'umd',
    dest: main
  }, {
    format: 'es',
    dest: jsnext
  }],
  globals: {
    jquery: '$'
  },
  external: ['jquery'],
  plugins: [
    buble()
  ]
};
