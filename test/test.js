let assert = require('assert');
let jsdom = require("jsdom");
let path = require('path');
let jqueryPath = path.resolve(__dirname, '../node_modules/jquery/dist/jquery.js');
let extrasPath = path.resolve(__dirname, '../dist/extras.js');
let $;

describe('jquery.extra', function() {
  this.timeout(15000);
  
  before(function(done) {
    jsdom.env(
      '<a href = "">Dmitriy</a>',
      [jqueryPath, extrasPath],
      function(err, window) {
        if(err) {
          console.error(err);
        }
        ({$} = window);
        done();
      }
    );
  });
  
  
  it('runs tests', function() {
    assert.ok($.jsonify);
  });
});
