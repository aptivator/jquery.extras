let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" /><input type = "text" /><input />`;
let $;

describe('attr()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then($_ => {
      $ = $_;
      done();
    }).catch(done);
  });
  
  it('fetches value for one element', () => {
    expect($('input:first').attr('type')).to.equal('text');
  });
  
  it('produces undefined for non-set attribute', () => {
    expect($('input:first').attr('some-attribute')).to.be.undefined;
  });
  
  it('returns an array of attribute values', () => {
    expect($('input:nth-child(-n + 2)').attr('type')).to.eql(['text', 'text']);
  });
  
  it('errors when an element in the selection does not have an attribute', () => {
    expect(() => $('input').attr('type')).to.throw(/elements does not have/);
  });
});
