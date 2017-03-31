const jsonPartRx = /[\{\,\:\[]\s*([^\,\:\"\[\]\}\{]*|\"[^"]*\")\s*[\:\,\]\}]/g;
const numStrRx = /^[\d\"-]/;
const primitives = ['true', 'false', 'null'];

export {
  numStrRx,
  primitives,
  jsonPartRx
};
