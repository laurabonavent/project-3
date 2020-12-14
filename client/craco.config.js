const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "grey",
              "@success-color": "#52c41a",
              "@warning-color": "#faad14",
              "@error-color": "#f5222d",
              "@info-color": "#52c41a",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
