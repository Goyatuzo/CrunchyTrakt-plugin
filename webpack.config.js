var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let envVariables = {
    'API_ROOT': JSON.stringify('https://api-staging.trakt.tv'),
    'CLIENT_ID': JSON.stringify('c4c79b5819a0efe568fea03f6dd8c579758e5878bd3622b3091ec9d39559f1f2'),
    'CLIENT_SECRET': JSON.stringify('2f1a5a55b770dc988a9e91efcfd4fe638e341c108cfb0a92e5b7e8a069dd4439')
}

if (process.env.NODE_ENV === 'production') {
    envVariables = {
        'API_ROOT': JSON.stringify('https://api.trakt.tv'),
        'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID ? process.env.CLIENT_ID : 'c4c79b5819a0efe568fea03f6dd8c579758e5878bd3622b3091ec9d39559f1f2'),
        'CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '2f1a5a55b770dc988a9e91efcfd4fe638e341c108cfb0a92e5b7e8a069dd4439')
    }
}


const outputLocation = {
    filename: "[name].js",
    path: path.join(__dirname, "dist")
};

module.exports = [
    {
        entry: {
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
            new webpack.DefinePlugin(envVariables),

            new CopyPlugin([{
                context: path.join(__dirname, 'app'),
                from: './images/**/*',
                to: path.join(__dirname, 'dist')
            }]),

            new CopyPlugin([{
                context: path.join(__dirname),
                from: './manifest.json',
                to: path.join(__dirname, 'dist')
            }])
        ]
    },
    {
        entry: {
            "crunchy-sync": "./app/crunchyroll-sync/index.tsx"
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
            new webpack.DefinePlugin(envVariables),

            new HtmlWebpackPlugin({
                hash: true,
                template: './app/crunchyroll-sync/index.html',
                filename: 'crunchyroll-sync/index.html'
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
            new webpack.DefinePlugin(envVariables),

            new HtmlWebpackPlugin({
                hash: true,
                template: './app/popup/index.html',
                filename: 'index.html'
            })
        ]
    }
];
