let {expect} = require('chai');
let dom = require('../lib/dom');
let win;
let $;

describe('jsonify()', function() {
  this.timeout(5000);
  
  before(done => {
    dom('').then(vars => {
      [win, $] = vars;
      done();
    }).catch(done);
  });
  
  after(() => win.close());
  
  it('converts single-quote-prefixed values to strings', () => {
    let json = '{age: \'22, enrolled: \'true, senior: \'null}';
    let obj = $.jsonify(json);
    expect(obj).to.eql({age: '22', enrolled: 'true', senior: 'null'});
  });
  
  it('replaces blank values with null', ()  => {
    let json = '{age: , enrolled: "", empty:}';
    let obj = $.jsonify(json);
    expect(obj).to.eql({age: null, enrolled: '', empty: null});
  });
  
  it('keeps double-quote strings unchanges', () => {
    let json = '{note: " A library that extends..   ", "spec{": "val[],:ue"}';
    let obj = $.jsonify(json);
    expect(obj).to.eql({
      note: ' A library that extends..   ',
      'spec{': 'val[],:ue'
    });
  });
  
  it('converts "naked" JSON into javascript object', () => {
    let json = "{sel: .main > table, some: true, age: 23.55, _:, arr: [, ]}";
    expect($.jsonify(json)).to.eql({
      sel: '.main > table', 
      some: true, 
      age: 23.55,
      _: null,
      arr: [null, null]
    });
  });
  
  it('supports regular JSON', () => {
    let json = '{"first-name": "Dmitriy", "age": 37, "married": false, "address": null}';
    expect($.jsonify(json)).to.eql({
      'first-name': 'Dmitriy',
      age: 37,
      married: false,
      address: null
    });
  });
  
  it('throws an error if an invalid "naked" JSON is provided', () => {
    let json = '{name: Dmi[riy, age{: 37}';
    expect(() => $.jsonify(json)).to.throw(/Unexpected token/);
  });
});
