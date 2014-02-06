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

## reject
Notice in the above code we one of the parameters at the top of the function is reject
yet it is not used. Well this allows us to reject the promise. Say something bad
happened like we couldn't read from process.stdin. In that case, we could handle
the error by rejecting the promise with an error message. The execution would then
go to the second function in the `then` call. A really basic example of rejecting:

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

Try running that (code in reject.js)...

## How does it really work?
It's complicated. Try them out for a bit and then take a look at the source for
the Promise module and at the [Promise/A+ specification](https://github.com/promises-aplus/promises-spec).
