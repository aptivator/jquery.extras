import $       from 'jquery';
import reducer from '../../lib/reducer';

let {attr} = $.fn;

export default function(...args) {
  let both = args.length == 2;
  let $els = $(this);
  let {length} = $els;
  let values = reducer($els, (accum, el) => {
    let $el = $(el);
    let result = attr.apply($el, args);
    
    if(both) {
      return;
    }
    
    if(typeof result === 'undefined' && length > 1) {
      throw new Error(`one of the elements does not have [${args[0]}] attribute`);
    }
    
    accum.push(result);
    
    return accum;
  }, []);
  
  if(both) {
    return this;
  }
  
  if(values.length > 1) {
    return values;
  }
  
  return values[0];
}
