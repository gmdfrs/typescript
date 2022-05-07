const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: 'none',
    entry: './src/index.ts',
    output: {
        path: path.resolve('.', 'dist'),
        library: 'amd',
        libraryTarget: 'umd',
        globalObject: 'this'
    }
};
