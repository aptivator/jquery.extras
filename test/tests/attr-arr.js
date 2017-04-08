let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" /><div></div>`;
let $;

describe('attrArr()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then(_$ => {
      $ = _$;
      done();
    }).catch(done);
  });
  
  it('always returns an array', () => {
    let value = $('input:first').attrArr('type');
    expect(value).to.eql(['text']);
    value = $('input:first').attrArr('some-unknown-attr');
    expect(value).to.eql([undefined]);
  });
  
  it('should be chainable after attribute is set', () => {
    let value = $('div').attrArr('some', 'some value').attrArr('some');
    expect(value).to.eql(['some value']);
  });
});
