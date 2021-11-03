module.exports = {
    transpileDependencies: ['vuetify'],

    devServer: {
        https: true,
    },

    pwa: {
      themeColor: '#9155FD',
      msTileColor: '#f4f5fa',
      manifestOptions: {
        background_color: '#f4f5fa'
      }
    }
};
