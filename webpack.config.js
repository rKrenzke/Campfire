const path = require('path');

module.exports = {

    entry: "./src/index.tsx",

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".png", ".jpg"],
    },
    module: {
          rules: [
           {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
             {
              loader: "ts-loader"
             }
            ],
           },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ], 
            },

           {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
           },
           {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
           }
          ]
         },
}

//loaders?