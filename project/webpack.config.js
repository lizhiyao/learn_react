var path = require('path');

module.exports = {
    // 当前工程目录有一个入口文件 entry.js
    entry: './entry.js',
    // React 组件放置在一个 components/ 目录下，组件被 entry.js 引用，
    // 要使用 entry.js，我们把这个文件指定输出到 dist/bundle.js
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    // resolve 指定可以被 import 的文件后缀。
    // 比如 Hello.jsx 这样的文件就可以直接用 import Hello from 'Hello' 引用。
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        // loaders 指定 babel-loader 编译后缀名为 .js 或者 .jsx 的文件，
        // 这样就可以在这两种类型的文件中自由使用 JSX 和 ES6 了。
        loaders: [
            { 
                test: /\.js|jsx$/, 
                loaders: ['babel'] 
            }
        ]
    }
}

// 监听编译: webpack -d --watch