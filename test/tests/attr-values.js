let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `
  <input id = "aaa" type = "text" name = "first" value = "Dmitriy" />
  <input id = "aab" type = "text" name = "last" value = "Nesterkin" />
  <input />`;
let win;
let $;

describe('attrValues()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then(vars => {
      [win, $] = vars;
      done();
    }).catch(done);
  });
  
  after(() => win.close());
  
  it('assembles name-value object for string attribute pattern', () => {
    var obj = $('input').attrValues('type');
    expect(obj).to.eql({type: 'text'});
  });
  
  it('assembles name-value object for regex pattern', () => {
    var obj = $('input').attrValues(/.*/);
    expect(obj).to.eql({id: 'aaa', type: 'text', name: 'first', value: 'Dmitriy'});
  });
  
  it('maps name-value object for matched elements to a larger object', () => {
    var obj = $('input:nth-child(-n + 2)').attrValues(/.*/, 'id');
    expect(obj).to.eql({
      aaa: {id: 'aaa', type: 'text', name: 'first', value: 'Dmitriy'},
      aab: {id: 'aab', type: 'text', name: 'last', value: 'Nesterkin'}
    });
  });
  
  it('errors when attribute used as hash is undefined', () => {
    var func = () => $('input').attrValues('value', 'id');
    expect(func).to.throw(/one of the elements does not have a/);
  });
  
  it('ignores an element whose hash attribute is undefined', () => {
    var func = () => $('input').attrValues('value', 'id', true);
    expect(func).to.not.throw(/one of the elements does not have a/);
  });  
});
