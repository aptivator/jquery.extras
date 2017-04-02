import $               from 'jquery';
import id_             from './lib/id';
import patternAsserter from './lib/pattern-asserter';
import setterGetter    from './lib/attr-setter-getter';

let {val} = $.fn;
let reducer = [].reduce.call.bind([].reduce);

$.extend($.fn, {
  attrValues(rx) {
    let {attributes} = this[0];
    return [].reduce.call(attributes, (o, attribute) => {
      let {name, value} = attribute;
      if(patternAsserter(name, rx)) {
        o[name] = value;
      }
      
      return o;
    }, {});
  },

  byAttrName(rx) {
    return this.filter((idx, el) => {
      let {attributes} = el;
      for(let i = 0, len = attributes.length; i < len; i++) {
        if(patternAsserter(attributes[i].name, rx)) {
          return true;
        }
      }
    });
  },

  disable() {
    return this.each((idx, el) => $(el).attr('disabled', 'disabled'));
  },
  
  enable() {
    return this.each((idx, el) => $(el).removeAttr('disabled'));
  },
  
  events() {
    return $._data(this[0], 'events');
  },
  
  hasEvent(event) {
    let events = this.events() || {};
    return events[event];
  },
  
  id(id, override) {
    let $el = this.eq(0);
    
    if(id === true) {
      if(!override) {
        id = setterGetter($el, 'id');
        if(id) {
          return id;
        }
      }
      id = id_();
    }
    return setterGetter($el, 'id', id);
  },
  
  name(name) {
    return setterGetter(this.eq(0), 'name', name);
  },
  
  val(value, asObj) {
    let valOnly = value && !asObj;
    let accumulator = asObj ? {} : value ? null : [];
    let values = reducer($(this), function(accum, el) {
      let $el = $(el);
      let result = val.apply($el, valOnly ? [value] : []);
      
      if(valOnly) {
        return;
      }
      
      if(asObj) {
        let attrValue = $el.attr(value);
        
        if(!attrValue) {
          throw new Error(`one element has no value for [${value}] attribute`);
        }
        
        if(accum[attrValue]) {
          throw new Error(`already have a [${attrValue}] key`);
        }
        
        accum[attrValue] = result;
      } else {
        accum.push(result);
      }
      
      return accum;
    }, accumulator);
    
    if(!values) {
      return this;
    }
    
    if(asObj || values.length > 1) {
      return values;
    }
    
    if(values.length) {
      return values[0];
    }
  }
});
