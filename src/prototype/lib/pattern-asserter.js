export default (str, rx) => {
  if(typeof rx === 'string') {
    return str.startsWith(rx);
  }
  return rx.test(str);
};
