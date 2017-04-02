export default function(...args) {
  let result = this.val(...args);
  
  if(result === this) {
    return this;
  }
  
  if(!Array.isArray(result)) {
    result = [result];
  }
  
  return result;
}
