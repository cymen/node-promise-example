# node-promise-example
A basic example of getting input from the user and using a promise to continue
program execution after the line of input is received.

    $ node example.js
    Enter some text and press enter: I am a great beer!
    You entered: I am a great beer!

Take a look at the code:

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

Note that `process.stdin` has a `end` event however it is triggered with the end
of stream or CTRL-D sequence. We want only a single line of input. So we check
the chunk that is provided by the `data` event to see if it contains `\n` and if
it does, we *resolve* the promise with the full input. The program execution
then continues with the `then` function passing the input to it.

## How does it really work?
It's complicated. Try them out for a bit and then take a look at the source for
the Promise module and at the [Promise/A+ specification](https://github.com/promises-aplus/promises-spec).
