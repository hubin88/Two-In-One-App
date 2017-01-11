/**
 * Created by Amg on 2017/1/10.
 */

const imitateData = {
  getExchangeList: [
    { name: '交易所1', id: 1, logoUrl: '/src/images/touxiang.jpg' },
    { name: '交易所2', id: 2, logoUrl: '/src/images/touxiang.jpg' },
    { name: '交易所3', id: 3, logoUrl: '/src/images/touxiang.jpg' },
    { name: '交易所4', id: 4, logoUrl: '/src/images/touxiang.jpg' },
    { name: '交易所5', id: 5, logoUrl: '/src/images/touxiang.jpg' },
  ],
  getOneExchangeInfo: {
    1: {
      id: 1,
      system: [
        { type: 'DCB', label: '点差宝', sort: 1 },
        { type: 'DWB', label: '点微宝', sort: 2 },
      ],
    },
    2: {
      id: 2,
      system: [
        { type: 'DCB', label: '点差宝', sort: 1 },
      ],
    },
    3: {
      id: 3,
      system: [
        { type: 'DWB', label: '点微宝', sort: 1 },
      ],
    },
    4: {
      id: 4,
      system: [
        { type: 'DWB', label: '点微宝', sort: 1 },
        { type: 'DCB', label: '点差宝', sort: 2 },
      ],
    },
  },
};
export default imitateData;
