let {expect} = require('chai');
let dom = require('../lib/dom');
let $;
let html = `
  <input id = "aaa" type = "text" value = "first" />
  <input id = "aab" type = "text" value = "next" />
  <input />`;

describe('val()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then($_ => {
      $ = $_;
      done();
    }).catch(done);
  });
  
  it('fetches value for one element', () => {
    let value = $('input:first').val();
    expect(value).to.equal('first');
  });
  
  it('sets a value for an element using a function', () => {
    let value = $('input:first').val((idx, value) => {
      return value.toUpperCase();
    }).val();
    
    expect(value).to.equal('FIRST');
  });
  
  it('fetches array of values', () => {
    let values = $('input').val();
    expect(values).to.eql(['FIRST', 'next', '']);
  });
  
  it('sets a value for the first element in the selection', () => {
    let value = $('input:last').val('setter').val();
    expect(value).to.equal('setter');
  });
  
  it('sets all inputs to the same value', () => {
    let values = $('input').val('same').val();
    expect(values).to.eql(['same', 'same', 'same']);
  });
  
  it('retrieves all values indexing them by id attribute value', () => {
    let values = $('input:nth-child(-n + 2)').val('id', true);
    expect(values).to.eql({'aaa': 'same', 'aab': 'same'});
  });
  
  it('errors when attribute does not exist', () => {
    expect(() => $('input').val('name', true)).to.throw(/element has no value/);
  });
  
  it('errors when same attribute value is used', () => {
    $('input:last').id('aaa');
    expect(() => $('input').val('id', true)).to.throw(/already have a/);
  });   
});
