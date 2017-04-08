let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input id = "aaa"/><input id = "aab"/><input />`;
let $;

describe('id()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then($_ => {
      $ = $_;
      done();
    }).catch(done);
  });
  
  it('retrieves an id value', () => {
    expect($('input').id()).to.equal('aaa');
  });
  
  it('retrieves an id value when in true mode', () => {
    expect($('input:eq(1)').id(true)).to.equal('aab');
  });
  
  it('overrides an id value with an auto-generated one', () => {
    expect($('input:eq(1)').id(true, true)).to.equal('jquery-extras-id-1');
  });
  
  it('sets an id to an auto-generated value', () => {
    expect($('input:last').id(true)).to.equal('jquery-extras-id-2');
  });
  
  it('sets an id attribute to a specified value', () => {
    $('input:first').id('ddd');
    expect($('input:first').attr('id')).to.equal('ddd');
  });
});
