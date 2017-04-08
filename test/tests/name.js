let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" name = "first" />`;
let win;
let $;

describe('name()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then(vars => {
      [win, $] = vars;
      done();
    }).catch(done);
  });
  
  after(() => win.close());
  
  it('retrieves name attribute value', () => {
    let name = $('input').name();
    expect(name).to.equal('first');
  });
  
  it('sets name attribute value', () => {
    $('input').name('name');
    expect($('input').attr('name')).to.equal('name');
  });  
});
