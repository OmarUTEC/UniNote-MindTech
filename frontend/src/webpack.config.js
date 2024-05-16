import path from 'path';

module.exports = {
    // Otras configuraciones de Webpack
    resolve: {
      alias: {
        'styles': path.resolve(__dirname, 'src/App.css')
      }
    }
  };
  