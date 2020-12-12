const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "black",
              "@link-color": "black",
              "@success-color": "#52c41a",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
