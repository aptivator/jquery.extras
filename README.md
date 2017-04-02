# jquery.extras

### Introduction

jQuery.extras is a library that augments jquery with extra helper methods. This 
collection was written to support jquery.behaviorize framework and includes 
extensions to both static (`$`) and prototype (`$.fn`) objects.

### Installation

`npm install --save jquery.extras`

### Static methods

<span style = "font-size: 18px;">**`$.jsonify`**</span>: converts JSON and 
"naked" JSON to a JavaScript object.  (To learn more about "naked" JSON, read the
following [documentation]).

```html
<!-- example.html -->

<input type = "text" naked-json = "{name: some name, age: 25, enrolled:}" />
```
```javascript
/* example.js */

let nakedJson = $('input:first').attr('naked-json');
let obj = $.jsonify(nakedJson);
//obj should be {name: 'some name', age: 25, enrolled: null}
```

### Prototype methods

<span style = "font-size: 18px">**`$.fn.attrValues`**</span>: selects a first 
element's attributes, whose names match the provided pattern (string or regular
expression), and returns an object of the matched attributes' names and values 
pairs.

```html
<!-- example.html -->

<input type = "text" dn-property = "prop1" dn-extra = "extra" />
<input type = "password" dn-method = "method" dn-extra = "something" />
```
```javascript
/* example-1.js */

let obj = $('input').attrValues('dn-');
//obj should be {'dn-property': 'prop1', 'dn-extra': 'extra'}
```
```javascript
/* example-2.js */

let obj = $('input:last').attrValues(/extra$/);
//obj should be {'dn-extra': 'something'}
```

<span style = "font-size: 18px;">**`$.fn.byAttrName`**</span>: filters selected
elements by attribute names that match the provided pattern (string or regular 
expression) and returns a collection of matched elements.

```html
<!-- example.html -->

<div pfaaa></div>
<div pfa></div>
<div pft></div>
```
```javascript
/* example.js */

let $pfaAll = $('div').byAttrName('pfa');
//$pfaAll should the first two divs

let $pft = $('div').byAttrName(/^pft$/);
//$pft should be the second div
```

<span style = "font-size: 18px;">**`$.fn.disable`**</span>: disables all 
selected elements by setting their `disabled` attribute to `disabled` value.

```html
<!-- example.html -->

<input type = "text" name = "first-name" />
<input type = "text" name = "last-name" />
```
```javascript
/* example.js */

$('input').disable();
```

<span style = "font-size: 18px;">**`$.fn.enable`**</span>: enables all
selected elements by removing their `disabled` attribute.

```html
<!-- example.html -->

<input type = "text" name = "first-name" disabled = "disabled" />
<input type = "text" name = "last-name" disabled = "disabled" />
```
```javascript
/* example.js */

$('input').enable();
```

<span style = "font-size: 18px;">**`$.fn.events`**</span>: fetches an events
object for the first element in the selection.

```javascript
/* example.js */

$('input').on('keyup', evt => {});
$('input').on('click', evt => {});

let events = $('input').events();
//events should be {'keyup': {...}, 'click': {...}}
```

<span style = "font-size: 18px;">**`$.fn.hasEvent`**</span>: returns a specific 
event configuration object (for the first element in the selection) if an event 
handler has been registered; otherwise returns `undefined`.

```javascript
/* example.js */

$('input').on('keyup', evt => {});
$('input').on('click', evt => {});

if($('input').hasEvent('click')) {
  //should do something because event handler has been registered
}
```

<span style = "font-size: 18px;">**`$.fn.id`**</span>: gets a value of an `id`
attribute, sets an `id` to some specified value, sets an `id` to an 
auto-generated unique value, or overrides an existing `id` with an 
auto-generated value.  (The function will be applied to the first element
in the selection).

```html
<!-- example.html -->

<input id = "some-id" type = "text" />
<input type = "password"  name = "password" />
<input type = "email" />
<input id = "another-id" type = "checkbox" />
```
```javascript
/* example.js */

let id = $('input:eq(0)').id();
//id should be 'some-id'

let id1 = $('[type = "password"]').id('password-id');
//id1 shouldbe 'password-id'

let id2 = $('[type = "email"]').id(true);
//id2 should be auto-generated and equal to 'jquery-extras-id-1'

let id3 = $('input:last').id(true);
//because id attribute exists, id3 should be 'another-id'

let id4 = $('input:last').id(true, true);
//id4 should be 'jquery-extras-id-2'; second true indicates to override an existing id
```

<span style = "font-size: 18px;">**`$.fn.name`**</span>: gets and sets a value
of a `name` attribute.

```html
<!-- example.html -->

<input id = "username" name = "username" />
<input id = "password" />
```
```javascript
/* example.js */

let userName = $('input:eq(0)').name();
//userName should be 'username'

let password = $('[id = "password"]').name('password');
//password should be 'password'
```

<span style = "font-size: 18px;">**`$.fn.val`**</span>: overrides jquery's 
native `val` function and implements a support to return an array of values
when there is more than one element in the selection and also implements 
functionality to return an object of values indexed by some attribute's value.

```html
<!-- example.html -->

<input id = "username" value = "something" />
<input id = "password" value = "password" />
```
```javascript
/* example.js */

$('input').val('something else');
//first input's value should be 'something else'

let values = $('input').val();
//values should be ['something else', 'password']

let obj = $('input').val('id', true);
//obj should be {username: 'something else', password: 'password'}
```

[documentation]: docs/NAKED-JSON.md
