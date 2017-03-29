import $             from 'jquery';
import jsonReplacers from './lib/json-replacers';

$.extend($, {
  jsonify(json) {
    if(typeof json !== 'string') {
      return json; 
    }
  
    for(let [rx, replacer] of jsonReplacers.values) {
      json = json.replace(rx, replacer);
    }
    
    return JSON.parse(json);
  }
});
