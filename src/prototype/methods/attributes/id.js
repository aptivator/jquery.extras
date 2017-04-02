import id_          from '../../lib/id';
import setterGetter from '../../lib/attr-setter-getter';


export default function(id, override) {
  let $el = this.eq(0);
  
  if(id === true) {
    if(!override) {
      id = setterGetter($el, 'id');
      if(id) {
        return id;
      }
    }
    id = id_();
  }
  return setterGetter($el, 'id', id);  
}
