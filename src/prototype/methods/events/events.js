import $ from 'jquery';

export default function() {
  return $._data(this[0], 'events');  
}
