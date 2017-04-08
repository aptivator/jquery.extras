let jsdom = require('jsdom');
let path = require('path');
let jquery = path.resolve(__dirname, '../../node_modules/jquery/dist/jquery.js');
let extras = path.resolve(__dirname, '../../dist/extras.js');
let deps = [jquery, extras];

module.exports = (html, callback) => {
  return new Promise((resolve, reject) => {
    jsdom.env(html, deps, (err, window) => {
      if(err) {
        reject(err);
      }
      resolve([window, window.$]);
    });
  });
};
