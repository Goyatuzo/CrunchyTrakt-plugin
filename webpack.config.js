var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let API_ROOT = 'https://api-staging.trakt.tv'

if (process.env.NODE_ENV === 'production') {
    API_ROOT = 'https://api.trakt.tv';
}

const outputLocation = {
    filename: "[name].js",
    path: path.join(__dirname, "app/dist")
};

module.exports = [
    {
        entry: {
            "vrv": "./app/event-handlers/vrv-events",
            "background": "./app/background"
        },
        mode: "development",
        output: outputLocation,

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
    },
    {
        entry: {
            'popup': './app/popup/index.tsx'
        },
        mode: "development",
        output: outputLocation,

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { test: /\.tsx?$/, loader: "ts-loader" }
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                'API_ROOT': JSON.stringify(API_ROOT)
            }),

            new HtmlWebpackPlugin({
                hash: true,
                template: './app/popup/index.html',
                filename: 'index.html'
            })
        ]
    }
];