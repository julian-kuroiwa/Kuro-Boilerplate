import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';

const { env, isDevEnv } = require('./node-env');

const plugins = [
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery'
	})
];

if ( !isDevEnv ) {
	plugins.push(
		new UglifyJsPlugin()
	);
}

module.exports = {
	mode: env ? 'development' : 'production',

	entry: {
		app: [
			'babel-polyfill',
			'./src/js/main.js'
		]
	},

	devtool: isDevEnv ? 'source-map' : false,

	output: {
		filename: 'js/[name].min.js'
	},

	watch: isDevEnv,

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
                loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: [
						['env', {
							targets: {
								browsers: ['last 3 versions']
							}
						}]
					]
				}
			}
		]
	},

	plugins: plugins
};
