const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@layouts': path.resolve(__dirname, 'src/layouts/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@App': path.resolve(__dirname, 'src/App/'),
      '@theme': path.resolve(__dirname, 'src/theme/'),
    }
  },
};
