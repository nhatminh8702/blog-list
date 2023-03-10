module.exports = {
    module: {
        loader: [{ 
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets : ['es2015', 'react']
            }
        }]
      },
};