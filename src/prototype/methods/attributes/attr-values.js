import patternAsserter from '../../lib/pattern-asserter';

export default function(rx, attrName, ignoreUndefined) {
  for(var results = {}, i = 0, len = this.length; i < len; i++) {
    let {attributes} = this[i];
    let attributesMap = [].reduce.call(attributes, (o, attribute) => {
      let {name, value} = attribute;
      if(patternAsserter(name, rx)) {
        o[name] = value;
      }
      
      return o;
    }, {});
    
    if(!attrName) {
      return attributesMap;
    }
    
    let attrValue = $(this[i]).attr(attrName);
    
    if(!attrValue) {
      if(ignoreUndefined) {
        continue;
      }
      
      throw new Error(`one of the elements does not have a [${attrName}} attribute`);
    }
    
    results[attrValue] = attributesMap;
  }
  
  return results;
}
