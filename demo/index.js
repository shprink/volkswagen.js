(function(){
    var Volkswagen = require('../dist/volkswagen.js');
    var volkswagenOne = new Volkswagen(document.querySelector("#one"));
    var volkswagenTwo = new Volkswagen(document.querySelector("#two"), {
        direction: 'left',
        // trigger: 'click',
        // timeout: 2000
    });
    var volkswagenTwo = new Volkswagen(document.querySelector("#three"), {
        direction: 'right'
    });
    console.log('volkswagenOne', volkswagenOne);
    console.log('volkswagenTwo', volkswagenTwo);
})();
