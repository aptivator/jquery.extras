const empties = ['""', "''", ''];
const jsonPartRx = /[\{\,\:\[]\s*([^\,\:\"\[\]\}\{]*|\"[^"]*\")\s*[\:\,\]\}]/g;
const numStrRx = /^[\d\"-]/;
const primitives = ['true', 'false', 'null'];

export {
  empties,
  numStrRx,
  primitives,
  jsonPartRx
};
