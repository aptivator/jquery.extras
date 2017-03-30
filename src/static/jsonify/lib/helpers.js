const asStr = str => str.startsWith("'") && !str.includes("'", 1);
const quote = str => `"${str}"`;

export {
  asStr,
  quote
};
