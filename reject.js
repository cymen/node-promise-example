var Promise = require('promise');

new Promise(function(resolve, reject) {
    reject('something really bad happened');
}).then(
    function() {
        console.log('I never get called -- nobody resolved!');
    },
    function(error) {
        console.log('I got called with', error);
    }
);
