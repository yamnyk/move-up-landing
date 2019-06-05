const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const glob = require('glob');
const path = require('path');
const styles = glob.sync('./src/scss/**/*.scss');
const script = glob.sync('./src/js/**/*.js');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

module.exports = {
	entry: {
		'css/style': styles,
		'js/index': script
	},
	output:{
		filename:"[name].js",
		path: path.resolve(__dirname,"dist")
	},
	devServer: {
		quiet: true,
		overlay: true
	},
	optimization: {
		minimizer: [
			new TerserPlugin(),
			new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { map: { inline: false, annotation: true}}})
		]
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{loader: "html-loader", options: {minimize: true}}]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: "url-loader",
			},
			{
				test: /\.m?js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					{loader: "style-loader"},
					{loader: MiniCssExtractPlugin.loader},
					{loader: "css-loader"},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							plugins: () => [
								require('autoprefixer')({
									'browsers': ['> 0.2%', 'last 100 versions']
								}),
								require('css-mqpacker'),
								require('cssnano')({
									preset: [
										'default',
										{
											discardComments: {
												removeAll: true
											}
										}
									]
								})
							]
						}
					},
					{loader: "sass-loader"}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "src/index.html",
			filename: "./index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new CleanWebpackPlugin(),
		new NotifierPlugin({
			onErrors: (severity, errors) => {
				if (severity !== 'error') {
					return;
				}
				const error = errors[0];
				notifier.notify({
					title: "Webpack error",
					message: severity + ': ' + error.name,
					subtitle: error.file || '',
				});
			}
		})
	]
};
