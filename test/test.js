let {expect} = require('chai');
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
  
  
  it('converts json-like structure to json and parses it', function() {
    let obj = "{selector: '.main > table', 'another': true}";
    expect($.jsonify(obj)).to.eql({selector: '.main > table', another: true});
  });
});
