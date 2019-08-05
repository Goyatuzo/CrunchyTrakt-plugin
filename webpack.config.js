var path = require('path');

module.exports = [
    {
        entry: {
            "vrv": "./app/event-handlers/vrv-events"
        },
        mode: "development",
        output: {
            filename: "[name].js",
            path: path.join(__dirname, "app/dist")
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".js"]
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { test: /\.ts?$/, loader: "ts-loader" }
            ],
        },
    },
    {
        entry: {
            "background": "./app/background"
        },
        mode: "development",
        output: {
            filename: "[name].js",
            path: path.join(__dirname, "app/dist")
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".js"]
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { test: /\.ts?$/, loader: "ts-loader" }
            ],
        },
    }
];