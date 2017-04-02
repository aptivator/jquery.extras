import patternAsserter from '../../lib/pattern-asserter';

export default function(rx) {
  return this.filter((idx, el) => {
    let {attributes} = el;
    for(let i = 0, len = attributes.length; i < len; i++) {
      if(patternAsserter(attributes[i].name, rx)) {
        return true;
      }
    }
  });
}
