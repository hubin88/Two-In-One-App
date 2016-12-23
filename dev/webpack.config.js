// "use strict";

const cfg = require('./dev.config');

const opt = {
  isRouter: true,
  isIE8: false,
  isPrd: process.env.NODE_ENV === 'production',
};

module.exports = cfg(opt);