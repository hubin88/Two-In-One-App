const config = {
  server: {
    host: 'localhost', // IP 地址
    port: 8000, // 端口号
  },
  copyFile: [
    // { from: './single_part', to: './' },
    // { from: './config.js', to: './config.js' },
  ],
  html: [
    {
      title: 'React App',
      links: [
        // './static/bootstrap_part.min.css',
      ],
      scripts: [
        // './config.js',
        // `./js/index.entry.js`,
        './static/polyfill.min.js',
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
        },
      ],
    },
  ],
  entry: './src/index',
};

module.exports = config;
