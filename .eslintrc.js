module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "no-console": 0,
    "global-require": 0,
    "jsx-a11y/href-no-hash": 0,
    "react/forbid-prop-types": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    'import/no-dynamic-require': 0,
    'max-len': ["error", 120],
  },
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    DEBUG: true,
    BASE_SERVER: true,
    hex_md5: true,
    DCB_BULLISH_LABEL: true,
    DCB_BEARISH_LABEL: true,
    DWB_BULLISH_LABEL: true,
    DWB_BEARISH_LABEL: true,
    RANGE_LIST: true,
    PAY_TITLE: true,
    PAY_URL: true,
    WITHDRAW_TITLE: true,
    WITHDRAW_URL: true,
    DCB_SUGGEST_TITLE: true,
    DCB_SUGGEST_URL: true,
    DWB_SUGGEST_TITLE: true,
    DWB_SUGGEST_URL: true,
    HTML_PAGE:true,
    CRJ: true,
  }
};
