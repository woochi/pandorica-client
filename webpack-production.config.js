module.exports = require("./make-webpack-config")({
	// commonsChunk: true,
	prerender: true,
	longTermCaching: true,
	separateStylesheet: true,
	// devtool: "source-map"
});
