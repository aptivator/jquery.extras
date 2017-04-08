let {expect} = require('chai');
let dom = require('../lib/dom');
let $;
let html = `<input type = "text" /><input type = "password" /><input end/>`;

describe('byAttrName()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then($_ => {
      $ = $_;
      done();
    }).catch(done);
  });
  
  it('gets elements whose attributes names start with a certain string', () => {
    let $typed = $('body > *').byAttrName('typ');
    expect($typed.length).to.equal(2);
  });
  
  it('selects elements whose attribute names match a regex', () => {
    let $patterned = $('body > *').byAttrName(/nd$/);
    expect($patterned.length).to.equal(1);
  });  
});
