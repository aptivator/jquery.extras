import patternAsserter from '../../lib/pattern-asserter';

export default function(rx) {
  let {attributes} = this[0];
  return [].reduce.call(attributes, (o, attribute) => {
    let {name, value} = attribute;
    if(patternAsserter(name, rx)) {
      o[name] = value;
    }
    
    return o;
  }, {});  
}
