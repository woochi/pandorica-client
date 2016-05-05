module.exports = require("./make-webpack-config")({
	devServer: true,
	devtool: "eval",
	debug: true,
  devServer: {
    historyApiFallback: true
  }
});
