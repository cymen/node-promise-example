var Promise = require('promise');

var theyPressedEnter = function(input) {
  return input.indexOf('\n') != -1;
};

var getInput = function() {
  return new Promise(function(resolve, reject) {
    var input = '';

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
      input += chunk;

      if (theyPressedEnter(chunk)) {
        input = input.replace('\n', '');
        process.stdin.pause();
        resolve(input);
      }
    });
  });
};

process.stdout.write("Enter some text and press enter: ");

getInput().then(function(theInput) {
  console.log("You entered: " + theInput);
});
