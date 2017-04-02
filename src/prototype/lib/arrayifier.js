export default method => 
  function(...args) {
    let result = this[method](...args);
    
    if(result === this) {
      return this;
    }
    
    if(!Array.isArray(result)) {
      result = [result];
    }
    
    return result;
  };
