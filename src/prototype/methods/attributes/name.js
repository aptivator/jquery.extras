import setterGetter from '../../lib/attr-setter-getter';

export default function(name) {
  return setterGetter(this.eq(0), 'name', name);  
}
