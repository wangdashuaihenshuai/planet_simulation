module.exports = {
    entry: {
    "main": "./public/index.js",
    "test_planet": "./test/test_planet/index.js",
    "test_universe": "./test/test_universe/index.js"
    },
    output: {
        path: "./public/build/",
        filename: "[name].bundle.js"
    },
    "scripts": {
        "watch": "webpaack -- watch"
    }

};

