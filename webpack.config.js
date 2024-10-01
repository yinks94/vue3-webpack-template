
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
// export
module.exports={
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'assets': path.resolve(__dirname, 'src/assets'),
        }
    },
    // parcel index.html
    // 파일을 읽어들이기 시작하는 진입점 설정
    entry: './src/main.js',

    // 결과물(번들)을 변환하는 설정
    output:{
        // path: path.resolve(__dirname, 'dist'),
        // filename: 'main.js',
        clean: true
    },

    // 모듈 처리 방식을 설정
    module:{
        rules: [
            {
              test: /\.vue$/,
              use:'vue-loader'
            },
            {
                test: /\.s?css$/,
                use:[
                    //순서가 중요
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use:[
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use:'file-loader'
            }
        ]
    },

    // 번들링 후 결과물의 처리 방식 등 다양한 플러인 처리
    plugins: [
        new HtmlPlugin({
                template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: 'static'}
            ]
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        host: 'localhost'
    }
}