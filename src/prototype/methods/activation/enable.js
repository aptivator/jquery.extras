import $ from 'jquery';

export default function() {
  return this.each((idx, el) => $(el).removeAttr('disabled'));  
}
