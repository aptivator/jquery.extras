# "naked" JSON

### Introduction

"naked" JSON is a JSON document without or with partially used quotation marks. 
Embedding regular JSON into a text file that intrinsically requires a lot of
quotes may be combersome, will require extra typing, and may lead to errors.

For example, if a developer wishes to embed a JSON document into an HTML file,
then JSON's double quotes would either have to be escaped or JSON string would
have to be enclosed in single quotes.  The latter would be an easier approach as
illustrated in the example below.

```html
<!-- example.html with regular JSON -->

<input json = '{"full name": "First Last", "key": "some-api-key", "number": 22, "posts-count": null}'/>
```

The above JSON may be simplified further by stripping double quotes and null 
value(s).  In the end, the "naked" JSON string is about 20 percent smaller and 
easier to type.

```html
<!-- example.html with "naked" JSON -->

<input json = "{full name: First Last, key: some-api-key, number: 22, posts-count:}"/>
```

### Specifications and example

Using "naked" JSON is not without its caveats and restrictions and the following
features should be kept in mind when using `jquery.extras`' `$.jsonify` function.

* "Empties" are allowed.  These are single-quoted empty strings (e.g., 
`{address: ''}`) or an empty space after a property name (e.g., `{diploma:}`) 
or an empty space in an array (e.g., `{addresses: [address 1, ]}`).  "Empties"
are converted into `null` values.

* Per JSON specification, certain primitives (i.e., true, false, null, and 
numbers) are not converted into double-quoted strings.  To makes `$.jsonify` 
treat these primitives as strings, place single quote mark in front of a 
primitive (e.g., `{age: '25}`) or enclose a primitive in double quote marks 
(e.g., `{page: "25"}`).

* All white space is removed is trimmed from a string part.  For example, the
following document - `{name: name plus space       , age: 22}` - will be 
converted into the following JavaScript object: `{name: 'name plus space', 
age: 22}`.  Double quotes should be used indicate that the string is to be 
converted as is.

* The following characters are not allowed in 


* `$.jsonify` can accept regular JSON.