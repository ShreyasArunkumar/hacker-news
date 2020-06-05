require('ignore-styles')

require('@babel/register')({
    ignore: [/(node_module)/],
    presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
})

require('./server')