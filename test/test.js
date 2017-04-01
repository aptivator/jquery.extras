let {expect} = require('chai');
let jsdom = require('jsdom');
let path = require('path');
let jqueryPath = path.resolve(__dirname, '../node_modules/jquery/dist/jquery.js');
let extrasPath = path.resolve(__dirname, '../dist/extras.js');
let $;

describe('jquery.extra', function() {
  this.timeout(10000);
  
  before(done => {
    jsdom.env(
      `<input type = "text" value = "dmitriy" />
       <input type = "password" value = "password" name = "password" />
       <input id = "setter" />`,
      [jqueryPath, extrasPath],
      (err, window) => {
        if(err) {
          console.error(err);
        }
        
        ({$} = window);
        done();
      }
    );
  });

  describe('attrValues()', () => {
    it('makes name-value object for element\'s attributes that begin with a specified string', () => {
      var obj = $('input').attrValues('type');
      expect(obj).to.eql({type: 'text'});
    });
    
    it('makes name-value object for element\'s attributes that match a pattern', () => {
      var obj = $('input').attrValues(/.*/);
      expect(obj).to.eql({type: 'text', value: 'dmitriy'});
    });
  });
  
  describe('byAttrName()', () => {
    it('selects elements whose attribute names begin with a specified string', () => {
      let $typed = $('body > *').byAttrName('typ');
      expect($typed.length).to.equal(2);
    });
    
    it('selects elements whose attribute names match a pattern', () => {
      let $patterned = $('body > *').byAttrName(/d$/);
      expect($patterned.length).to.equal(1);
    });
  });

  describe('disable()', () => {
    it('disables all specified elements', () => {
      $('input').disable().each(function() {
        expect($(this).attr('disabled')).to.equal('disabled');
      });
    });
  });
  
  describe('enable()', () => {
    it('enables all specified elements', () => {
      $('input').enable().each(function() {
        expect($(this).attr('disabled')).to.equal.undefined;
      });
    });
  });

  
  describe('events()', () => {
    it('returns an object of events for the first element', () => {
      $('input:first').on('click', () => {});
      let events = $('input').events();
      let eventNames = Object.keys(events);
      expect(eventNames).to.eql(['click']);
    });
  });
  
  describe('hasEvent()', () => {
    it('indicates if the first element has a certain event', () => {
      expect($('input').hasEvent('mousedown')).to.be.undefined;
    });
  });
  
  describe('id()', () => {
    it('retrieves a value of an element\'s id attribute', () => {
      let id = $('input:last').id();
      expect(id).to.equal('setter');
    });
    
    it('obtains a value of an element\'s id when in true mode', () => {
      let id = $('input:last').id(true);
      expect(id).to.equal('setter');
    });
    
    it('overrides an existing id value with an auto-generated one', () => {
      let id = $('input:last').id(true, true);
      expect(id).to.equal('jquery-extras-id-1');
    });
    
    it('sets an id to an auto-generated unique value', () => {
      $('input').id(true);
      expect($('input').id()).to.equal('jquery-extras-id-2');
    });
    
    it('sets an id attribute to a specified value', () => {
      $('input:eq(1)').id('some-specified-id');
      expect($('input:eq(1)').id()).to.equal('some-specified-id');
    });
  });

  describe('jsonify()', function() {
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
      let json = '{description: " A library that extends..   ", "spec{": "val[],:ue"}';
      let obj = $.jsonify(json);
      expect(obj).to.eql({
        description: ' A library that extends..   ',
        'spec{': 'val[],:ue'
      });
    });
    
    it('converts "naked" JSON into javascript object', () => {
      let json = "{selector: .main > table, another: true, age: 23.55, blank:, arr: [, ]}";
      expect($.jsonify(json)).to.eql({
        selector: '.main > table', 
        another: true, 
        age: 23.55,
        blank: null,
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
  
  describe('name()', () => {
    it('retrieves a value of an element\'s name attribute', () => {
      let name = $('input:eq(1)').name();
      expect(name).to.equal('password');
    });
    
    it('sets a name attribute to a specified value', () => {
      let name = $('input:last').name($('input:last').id());
      expect(name).to.equal('jquery-extras-id-1');
    });
  });
  
  describe('val()', () => {
    it('fetches value for one element', () => {
      let value = $('input:first').val();
      expect(value).to.equal('dmitriy');
    });
    
    it('fetches array of values for multiple elements', () => {
      let values = $('input').val();
      expect(values).to.eql(['dmitriy', 'password', '']);
    });
    
    it('sets a value for the first element in the selection', () => {
      $('input:last').val('setter');
      let value = $('input:last').val();
      expect(value).to.equal('setter');
    });
  });
});
