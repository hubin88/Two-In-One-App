const config = {
  server: {
    host: '192.168.1.127', // IP 地址
    port: 8000, // 端口号
  },
  copyFile: [
    // { from: './single_part', to: './' },
    { from: './config.js', to: './config.js' },
  ],
  html: [
    {
      title: 'React App',
      links: [
        './static/k-line/kline.css',
      ],
      scripts: [
        './config.js',
        './static/md5.js',
        './static/k-line/drawKC.js',
        './static/k-line/jsonData.js',
        './static/k-line/jsonData2.js',
        './static/polyfill.min.js',
        './js/index.entry.js',
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
        },
      ],
    }, {
      title: '手机号注册',
      filename: 'register.html',
      links: [
        // './static/bootstrap_part.min.css',
      ],
      scripts: [
        './config.js',
        './static/md5.js',
        './static/polyfill.min.js',
        './js/register.entry.js',
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
        },
      ],
    },
  ],
  entry: {
    index: './src/index',
    register: './src/single-page/register',
  },
};

module.exports = config;
