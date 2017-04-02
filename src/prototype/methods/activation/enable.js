export default function() {
  return this.each(function() {
    $(this).removeAttr('disabled');  
  });
}
