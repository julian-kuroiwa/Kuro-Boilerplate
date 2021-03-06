# Kuro Boilerplate

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE.md)

This project uses ES6, Webpack, Nunjucks, SASS, PostCSS, Gulp and Browsersync.

Maybe you want to read about them:
- [Browsersync](https://www.browsersync.io/)
- [GulpJS](http://gulpjs.com/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [PostCSS](https://postcss.org/)
- [Sass](http://sass-lang.com/)
- [Webpack](https://webpack.js.org/)

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
├── dev/build
│   ├── css/
│   │   └── main.min.css
│   ├── images/
│   ├── scripts/
│   │   └── main.min.js
│   ├── index.html
├── gulpfile.babel.js
│   ├── config.json
│   ├── index.js
├── package.json
└── src
    ├── images/
    ├── js/
    │   └── main.js
    ├── sass
    │   └── main.scss
    └── views
    └── └── index.html
```

Those folders and file will change during the project.

### Code Standards

This project uses [eslint](http://eslint.org/) and [.editorconfig](https://github.com/julian-kuroiwa/Kuro-Boilerplate/blob/master/.editorconfig) is defined to have indent_size of **2 spaces**.

This project also uses [Husky](https://github.com/typicode/husky) to prevent commit and push messy and wrong code.

### Tasks

- `npm start`: run all tasks and initialize watch for changes and a server
- `npm run build`: run all tasks and deploy files

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
