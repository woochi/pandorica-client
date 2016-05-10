var path = require("path");
var webpack = require("webpack");
var CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var loadersByExtension = require("./config/loadersByExtension");
var autoprefixer = require('autoprefixer');
var _ = require('lodash');

module.exports = function (options) {
  var cssLoaderDefinition = "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]";
	var loaders = {
		"jsx": "babel-loader",
		"js": {
			loader: "babel-loader",
			include: path.join(__dirname, "app")
		},
		"json": "json-loader",
		"coffee": "coffee-redux-loader",
		"json5": "json5-loader",
		"txt": "raw-loader",
		"png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
		"woff|woff2": "url-loader?limit=100000",
		"ttf|eot": "file-loader",
		"wav|mp3": "file-loader",
		"html": "html-loader",
		"md|markdown": ["html-loader", "markdown-loader"]
	};

  var config = _.extend({
  	module: {
  		loaders: loadersByExtension(loaders).concat([
        {
          test: /\.(scss|sass)$/,
          loader: ExtractTextPlugin.extract('style', '!css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!resolve-url!sass')
        }
      ])
		},
  	entry: {
	    app: ["./app/main.jsx"]
	  },
	  output: {
	    path: path.resolve(__dirname, "build"),
	    filename: "bundle.js"
	  },
    resolve: {
      root: [
        path.resolve('./app')
      ],
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.ProvidePlugin({
        'React': 'react',
        'ReactDOM': 'react-dom'
      }),
      new ExtractTextPlugin("[name].css", {allChunks: true}),
      new HtmlWebpackPlugin({
        template: 'index.html', // Load a custom template
        inject: 'body' // Inject all scripts into the body
      })
    ],
    postcss: function() {
      return [autoprefixer];
    },
    sassLoader: {
      includePaths: [path.resolve(__dirname, './app/styles')]
    }
	}, options);

  return config;
};
