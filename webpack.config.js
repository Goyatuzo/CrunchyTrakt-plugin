var path = require('path');
var webpack = require('webpack');

let API_ROOT = 'https://api-staging.trakt.tv'

if (process.env.NODE_ENV === 'production') {
    API_ROOT = 'https://api.trakt.tv';
}

module.exports = [
    {
        entry: {
            "vrv": "./app/event-handlers/vrv-events",
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

        plugins: [
            new webpack.DefinePlugin({
                'API_ROOT': JSON.stringify(API_ROOT)
            })
        ]
    }
];