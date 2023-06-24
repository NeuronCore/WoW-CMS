const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports =
    {
        target: 'node',
        plugins:
            [
                new NodePolyfillPlugin()
            ]
    }
