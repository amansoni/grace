// Gets called when running npm start

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
// var cors = require('cors');

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: true, // Without logging,
  proxy : {
	  "/api": {
		"target": 'https://eas-grist06.aston.ac.uk',
		"pathRewrite": { '^/api': '' },
		"changeOrigin": true,
		"secure": false
	  }
	}
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});

// this is an untested sample
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions = { origin: true }
//   callback(null, corsOptions) // callback expects two parameters: error and options 
// }
// app.get('/products/:id', cors(corsOptionsDelegate), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
// })
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })