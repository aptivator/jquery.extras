const prefix = 'jquery-extras-id-';
let idCounter = 0;

export default () => prefix + ++idCounter;
