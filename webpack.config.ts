module.exports = {
    devtool: 'source-map', // 소스맵을 통해 디버깅이 가능하게 해준다.
    mode: 'development',
    // mode: 'production',
    entry: { gbPlayer: './index.ts' },
    optimization: {
        concatenateModules: true, // 성능 최적화
    },
    output: {
        filename: 'gbPlayer.js',
        sourceMapFilename: 'gbPlayer.map',
        library: 'GbPlayer',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: 'ts-loader',
            }]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};
