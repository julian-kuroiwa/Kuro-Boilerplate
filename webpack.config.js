import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';

import { env, isDevEnv } from './node-env';

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
  devtool: isDevEnv ? 'source-map' : false,
	entry: {
		app: './src/js/main.js'
  },
	output: {
		filename: 'js/[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: plugins
};
