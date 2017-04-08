let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" /><input type = "password" /><input end/>`;
let win;
let $;

describe('byAttrName()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then(vars => {
      [win, $] = vars;
      done();
    }).catch(done);
  });
  
  after(() => win.close());
  
  it('gets elements whose attributes names start with a certain string', () => {
    let $typed = $('body > *').byAttrName('typ');
    expect($typed.length).to.equal(2);
  });
  
  it('selects elements whose attribute names match a regex', () => {
    let $patterned = $('body > *').byAttrName(/nd$/);
    expect($patterned.length).to.equal(1);
  });  
});
