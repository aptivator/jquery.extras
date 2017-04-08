let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" disabled /><input type = "password" disabled/>`;
let $;

describe('enable()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then($_ => {
      $ = $_;
      done();
    }).catch(done);
  });
  
  it('enables all specified elements', () => {
    let disabled = $('input').attr('disabled');
    expect(disabled).to.eql(['disabled', 'disabled']);
    $('input').enable();
    let f = () => $('input').attrArr('disabled');
    expect(f).to.throw(/one of the elements does not have/);
  });
});
