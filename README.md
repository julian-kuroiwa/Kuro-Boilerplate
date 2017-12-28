# Kuro Boilerplate

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/julian-kuroiwa/Kuro-Boilerplate/blob/master/LICENSE.md)

This project uses ES6, SASS, Gulp and Browsersync.

Maybe you want to read about them:
- [GulpJS](http://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Browsersync](https://www.browsersync.io/)

### Installation

First of all, install the dependencies to run this boilerplate.

- [NodeJS](http://nodejs.org/)
- [GulpJS](http://gulpjs.com/)

```sh
# Clone this repository
$ git clone git@github.com:julian-kuroiwa/kuro-boilerplate.git
$ cd kuro-boilerplate

# install gulp globally
$ npm install -g gulp

# install dependencies
$ npm install

```

With the commands above, you have everything to start.

```sh
├── README.md
├── build
│   ├── css/
│   │   └── styles.css
│   ├── img/
│   ├── scripts/
│   │   └── main.min.js
│   ├── index.html
├── gulpfile.babel.js
│   ├── config.json
│   ├── index.js
├── package.json
└── src
    ├── img/
    ├── scripts/
    │   └── main.js
    ├── css
    │   ├── base/*.scss
    │   ├── components/*.scss
    │   ├── mixin/*.scss
    │   ├── pages/*.scss
    │   └── styles.scss
    └── html
    │   ├── components/*.html
    └── └── index.html
```

Those folders and file will change during the project.

### Code Standards

This project uses [eslint](http://eslint.org/) and [.editorconfig](https://github.com/julian-kuroiwa/Kuro-Boilerplate/blob/master/.editorconfig) is defined to have indent_size of **4 spaces**.

This project also uses [Husky](https://github.com/typicode/husky) to prevent commit and push messy and wrong code.

### Tasks

- `gulp`: run all tasks and initialize watch for changes and a server
- `gulp js`: execute js files
- `gulp html`: compile html files
- `gulp sass`: compile sass files
- `gulp images`: compress image files
- `gulp browser-sync`: inicialize a server
- `gulp watch`: call for watch files
- `gulp build`: run all tasks and deploy files to gh-pages

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details