export default rx => {
  if(!rx) {
    rx = '';
  }
  
  if(typeof rx === 'string') {
    return new RegExp(`^${rx}`);
  }
  
  return rx;
};
