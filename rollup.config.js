import buble    from 'rollup-plugin-buble';
import resolve  from 'rollup-plugin-node-resolve';

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
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    buble({
      transforms: {
        dangerousForOf: true
      }
    })
  ]
};
