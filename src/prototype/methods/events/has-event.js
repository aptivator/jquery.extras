export default function(event) {
  let events = this.events() || {};
  return events[event];  
}
