let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" /><input type = "password" />`;
let win;
let $;

describe('disable()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then(vars => {
      [win, $] = vars;
      done();
    }).catch(done);
  });
  
  after(() => win.close());
  
  it('disables specified elements', () => {
    $('input').disable();
    let disabled = $('input').attr('disabled');
    expect(disabled).to.eql(['disabled', 'disabled']);
  });
});
