# "naked" JSON

### Introduction

"naked" JSON is a JSON document without or with partially used quotation marks. 
Embedding regular JSON into a text file that intrinsically requires a lot of
double quotes may be cumbersome, will require extra typing, and may lead to 
errors.

For example, if a developer wishes to embed a JSON document into an HTML file,
then JSON's double quotes would either have to be escaped or JSON string would
have to be enclosed in single quotes.  The latter would be an easier approach as
illustrated in the example below.

```html
<!-- example.html with regular JSON -->

<input json = '{"full name": "First Last", "key": "some-api-key", "number": 22, "posts-count": null}'/>
```

The JSON may be simplified further by stripping double quotes and null value(s).
In the end, the "naked" JSON string is about 20 percent smaller and easier to 
type.

```html
<!-- example.html with "naked" JSON -->

<input json = "{full name: First Last, key: some-api-key, number: 22, posts-count:}"/>
```

### Specifications and examples

Using "naked" JSON is not without its caveats and restrictions and the following
features should be kept in mind when using `jquery.extras` `$.jsonify` function.

* Empty values (empties) are allowed.  These are blank spaces or no spaces.
Empties are converted to `null`s.

```javascript
let json = '{enrolled:, addresses: [], last-visit: }';
let obj = $.jsonify(json);
//obj should be {enrolled: null, addresses: [null], 'last-visit': null}
```

* JSON primitives (i.e., true, false, null, and numbers) are not converted to 
double-quoted strings.  To make `$.jsonify` treat these primitives as strings, 
a single quote mark could be placed in front of a primitive.

```javascript
let json = "{id: '2343212343, enrolled: 'true}";
let obj = $.jsonify(json);
//obj should be {id: '2343212343', enrolled: 'true'}
```

* All white space is trimmed from object properties and values.

```javascript
let json '{   id:    23432343    , message: Message      , sent: true}';
let obj = $.jsonify(json);
//obj should be {id: 23432343, message: 'Message', sent: true}
```

* The following special characters are not allowed in object properties and
values: array brackets (`[]`), object parentheses (`{}`), comma (`,`), and 
colon (`:`).  Using these is likely to result in an error.

```javascript
let json = '{name: Dmi[riy, age{: 137}';
let obj = $.jsonify(json);
//should throw a SyntaxError
```

* `$.jsonify` leaves double-quoted strings as is.  Any of the above behaviors
of "naked" JSON can be overridden by enclosing either an object property or 
some value in double quotes.

```javascript
let json = '{empty: "", "speci{": "value,", age: "25", enrolled: "true"}';
let obj = $.jsonify(json);
//obj should be {empty: '', 'speci{': 'value', age: '25', enrolled: 'true'}
```
