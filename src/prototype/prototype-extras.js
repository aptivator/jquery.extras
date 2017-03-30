import $            from 'jquery';
import id_          from './lib/id';
import setterGetter from './lib/attr-setter-getter';
import toRx         from './lib/to-rx';

let {val} = $.fn;

$.extend($.fn, {
  attrValues(rx) {
    let {attributes} = this[0];
    rx = toRx(rx);
    return [].reduce.call(attributes, (o, attribute) => {
      let {name, value} = attribute;
      if(rx.test(name)) {
        o[name] = value;
      }
      
      return o;
    }, {});
  },

  byAttrName(rx) {
    rx = toRx(rx);
    return this.filter((idx, el) => {
      let {attributes} = el;
      for(let i = 0, len = attributes.length; i < len; i++) {
        if(rx.test(attributes[i].name)) {
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
  
  id(id) {
    if(id === true) {
      id = id_();
    }
    return setterGetter(this.eq(0), 'id', id);
  },
  
  name(name) {
    return setterGetter(this.eq(0), 'name', name);
  },
  
  val(...args) {
    let values = [];
    this.each((idx, el) => values.push(val.apply($(el), args)));
    
    if(values.length > 1) {
      return values;
    }
    
    if(values.length) {
      return values[0];
    }
  }
});
