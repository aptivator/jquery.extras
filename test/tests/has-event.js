let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" /><input type = "password" />`;
let $;

describe('hasEvent()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then($_ => {
      $ = $_;
      done();
    }).catch(done);
  });
  
  it('indicates whether the first element has a certain event', () => {
    $('input').on('keyup', () => {});
    expect($('input').hasEvent('keyup')).to.be.ok;
    expect($('input').hasEvent('click')).to.be.undefined;
  });
});
