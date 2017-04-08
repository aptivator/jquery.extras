let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input value = "first" /><input value = "next" /><div></div>`;
let win;
let $;

describe('valArr()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then(vars => {
      [win, $] = vars;
      done();
    }).catch(done);
  });
  
  after(() => win.close());
  
  it('always returns an array', () => {
    let value = $('input:last').valArr();
    expect(value).to.eql(['next']);
    value = $('div').valArr();
    expect(value).to.eql(['']);
  });
  
  it('should be chainable after a value is set', () => {
    let value = $('div').valArr('some value').valArr();
    expect(value).to.eql(['some value']);
  });  
});
