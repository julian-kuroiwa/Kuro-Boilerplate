(function(win, doc) {

    'use strict';

    // arrow function
    [1, 2, 3].map(num => num * 2);

    // new variable type
    const world = 'World';

    /* eslint-disable no-console */

    // template string
    console.log(`Hey ${world}`);

    // spread
    console.log(...[1, 2, 3]);


})(window, document);