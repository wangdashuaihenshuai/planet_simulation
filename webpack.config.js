module.exports = {
    entry: {
        "main": "./src/index.js",
    },
    output: {
        path: "./public/dist/",
        filename: "[name].bundle.js"
    },
    "scripts": {
        "watch": "webpaack -- watch"
    }
};
