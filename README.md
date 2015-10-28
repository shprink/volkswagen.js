Putting this here just in case it interest someone. This lib is by no mean complete or useful, it is just the result of an afternoon laughting about Volkswagen emissions scandal.

## Demo

http://shprink.github.io/volkswagen.js/

## Why

* For fun
* https://en.wikipedia.org/wiki/Volkswagen_emissions_scandal

## Installation

`npm install volkswagen.js`

## Usage

```
var Volkswagen = require('../dist/volkswagen.js');

var instance = new Volkswagen(document.querySelector("#two"), {
    direction: 'left',  // (left|right|top)
    trigger: 'click',   // optional
    timeout: 2000       // stop smoke after 2 sec
});
```
