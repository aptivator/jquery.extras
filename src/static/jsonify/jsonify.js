import {empties, jsonPartRx, numStrRx, primitives} from './lib/vars';
import {asStr, quote} from './lib/helpers';

export default json => {
  for(var start = 0, str = '', result; (result = jsonPartRx.exec(json));) {
    let part = result[1];
    let end = --jsonPartRx.lastIndex - part.length;
    let prefix = json.substring(start, end);
    part = part.trim();
    
    if(asStr(part)) {
      part = quote(part.slice(1));
    } else if(!primitives.includes(part) && !numStrRx.test(part)) {
      if(empties.includes(part)) {
        part = 'null';
      } else {
        part = quote(part);
      }
    } 
    
    str += prefix + part;
    start = jsonPartRx.lastIndex;
  }
  
  str += json.substr(start);
  
  return JSON.parse(str);
};
