module.exports = {
    entry: {
    "main": "./public/index.js",
    "test_planet": "./test/test_planet_draw/test_planet.js",
    "test_universe": "./test/test_universe_draw/test_universe.js"
    },
    output: {
        path: "./public/build/",
        filename: "[name].bundle.js"
    },
    "scripts": {
        "watch": "webpaack -- watch"
    }

};

