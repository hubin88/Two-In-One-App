const config = {
  server: {
    host: '192.168.0.61', // IP 地址
    port: 9000, // 端口号
  },
  copyFile: [
    // { from: './single_part', to: './' },
    { from: './config.js', to: './config.js' },
  ],
  html: [
    {
      title: 'React App',
      links: [
        // './static/bootstrap_part.min.css',
      ],
      scripts: [
        './config.js',
        './static/md5.js',
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
  htmlPage: {
    DC: 'http://120.25.135.199:9003/webstatic/1zjyjy/rule/rule.html',
    DW: 'http://www.baidu.com',
  },
  entry: {
    index: './src/index',
    register: './src/single-page/register',
  },
};

module.exports = config;
