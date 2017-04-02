import $       from 'jquery';
import reducer from '../../lib/reducer';

let {val} = $.fn;

export default function(value, asObj) {
  let valOnly = value && !asObj;
  let accumulator = asObj ? {} : value ? null : [];
  let values = reducer($(this), (accum, el) => {
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
