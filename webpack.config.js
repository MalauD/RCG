const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
	entry: './Public/js/index.jsx',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'Public/Dist')
	},
	plugins: [new NodemonPlugin({ script: './server.js' })]
};
