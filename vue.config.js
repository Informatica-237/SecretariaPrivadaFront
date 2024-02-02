const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const { defineConfig } = require('@vue/cli-service');

module.exports = {
  ...defineConfig({
    transpileDependencies: true
  }),

  devServer: {
    proxy: {
      '/api': {
        target: 'https://madariagasec.firebaseapp.com', // Reemplaza con la URL de tu servidor de API
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Elimina /api del inicio de la URL
        },
      },
    },
  },
};
