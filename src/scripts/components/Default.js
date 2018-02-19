class Default {
    constructor() {
        this.default();
    }

    default() {
        // arrow function
        [1, 2, 3].map(num => console.log(num * 2));

        // new variable type
        const world = 'World';

        /* eslint-disable no-console */

        // template string
        console.log(`Hey ${world}`);

        // spread
        console.log(...[1, 2, 3]);

    }
}

module.exports = Default;
