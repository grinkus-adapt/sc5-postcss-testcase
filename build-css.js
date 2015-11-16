var fs = require('fs');
var postcss = require('postcss');
var nested = require('postcss-nested');

var inFile = 'src/style.css';
var outFile = 'dist/bundle.css';

var css = fs.readFileSync(inFile);

postcss()
	.use(nested)
	.process(css, { from: inFile, to: outFile, map: { inline: false }})
	.then(function handleResult(result) {
		fs.writeFileSync(outFile, result.css);
		if (result.map) {
			fs.writeFileSync(outFile + '.map', result.map);
		}
	})
	.catch(
		function handleErrors(err) {
			console.log(err.stack);
		}
	);
