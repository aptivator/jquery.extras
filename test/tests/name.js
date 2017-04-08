let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" name = "first" />`;
let $;

describe('name()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then($_ => {
      $ = $_;
      done();
    }).catch(done);
  });
  
  it('retrieves name attribute value', () => {
    let name = $('input').name();
    expect(name).to.equal('first');
  });
  
  it('sets name attribute value', () => {
    $('input').name('name');
    expect($('input').attr('name')).to.equal('name');
  });  
});
