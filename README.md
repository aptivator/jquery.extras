# jquery.extras

### Introduction

jQuery.extras is a library that augments jquery with extra helper methods. This 
collection was written to support jquery.behaviorize framework and includes 
extensions to both static (`$`) and prototype (`$.fn`) objects.

### Installation

`npm install --save jquery.extras`

### Static methods

`$.jsonify`: converts JSON and "naked" JSON to a JavaScript object.  To learn 
more about "naked" JSON, read the following [documentation].

```html
<!-- example.html -->

<input type = "text" naked-json = "{name: some name, age: 25, enrolled:}" />
```
```javascript
/* example.js */

let nakedJson = $('input:first').attr('naked-json');
let obj = $.jsonify(nakedJson);

/*
  obj = {
    name: 'some name',
    age: 25,
    enrolled: null
  }
*/
```

### Prototype methods

* `$.fn.attrValues`
* `$.fn.byAttrName`
* 

[documentation]: docs/naked-json.md
