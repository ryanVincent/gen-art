module.exports = {
    entry: "./random-lines/src/index.js",
    output: {
        path: __dirname + "/random-lines",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
