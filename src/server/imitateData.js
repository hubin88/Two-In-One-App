/**
 * Created by Amg on 2017/1/10.
 */

const imitateData = {
  getExchangeList: [
    { name: '交易所1', id: 1, logoUrl: 'images/exchange-1.jpg' },
    { name: '交易所2', id: 2, logoUrl: 'images/exchange-2.jpg' },
    { name: '交易所3', id: 3, logoUrl: 'images/exchange-3.jpg' },
    { name: '交易所4', id: 4, logoUrl: 'images/exchange-4.jpg' },
    { name: '交易所5', id: 5, logoUrl: 'images/exchange-5.jpg' },
  ],
  getOneExchangeInfo: {
    1: {
      id: 1,
      system: [
        { type: 'DCB', label: '点差宝', sortNum: 1 },
        { type: 'DWB', label: '点微宝', sortNum: 2 },
      ],
    },
    2: {
      id: 2,
      system: [
        { type: 'DCB', label: '点差宝', sortNum: 1 },
      ],
    },
    3: {
      id: 3,
      system: [
        { type: 'DWB', label: '点微宝', sortNum: 1 },
      ],
    },
    4: {
      id: 4,
      system: [
        { type: 'DWB', label: '点微宝', sortNum: 1 },
        { type: 'DCB', label: '点差宝', sortNum: 2 },
      ],
    },
  },
};
export default imitateData;
