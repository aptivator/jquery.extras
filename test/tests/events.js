let {expect} = require('chai');
let dom = require('../lib/dom');
let html = `<input type = "text" /><input type = "password" />`;
let win;
let $;

describe('events()', function() {
  this.timeout(5000);
  
  before(done => {
    dom(html).then(vars => {
      [win, $] = vars;
      done();
    }).catch(done);
  });
  
  after(() => win.close());
  
  it('returns an object of events for the first element', () => {
    $('input').on('click', () => {});
    let events = $('input').events();
    let eventNames = Object.keys(events);
    expect(eventNames).to.eql(['click']);
  });
});
