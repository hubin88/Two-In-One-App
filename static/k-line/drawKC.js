/**
 * Created by wenxinfu on 2016/12/27.
 */
"use strict";
var baseDraw = {
  kLineTimeType: {
    minute: 1,
    day: 2,
    week: 3,
    year: 4,
    mouth: 5
  },
  canvasW: {
    marginLeft: 5,
    marginRight: 5,
  },
  getPixelRatio: function (context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
  },
  isMobile: function () {
    return navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i);
  },
  getEventType: function (chart) {
    var eventType = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
    };
    if (chart) {
      eventType.end = 'mouseout';
    }
    if (this.isMobile()) {
      eventType.start = 'touchstart';
      eventType.move = 'touchmove';
      eventType.end = 'touchend';
    }
    return eventType;
  },
  getPos: function (event, canvas) {
    var nowPos;
    if (this.isMobile()) {
      if (event.preventDefault) event.preventDefault();
      event.cancelBubble = true;
      var touch = event.touches[0];
      nowPos = this.canvasPos(canvas, touch.pageX, touch.pageY);
    } else {
      nowPos = this.canvasPos(canvas, event.clientX, event.clientY);
    }
    return nowPos;
  },
  canvasPos: function (canvas, x, y) {
    var bBox = canvas.getBoundingClientRect();
    return {
      x: x - bBox.left * (canvas.offsetWidth / bBox.width),
      y: y - bBox.top * (canvas.offsetHeight / bBox.height)
    };
  },
  drawGuideLine: function (opts) {
    opts.canvasCtx.lineWidth = 1;
    opts.canvasCtx.strokeStyle = 'black';
    var lineWidth = 4,
      spaceWidth = 2,
      wNum = Math.ceil(opts.canvasWidth / lineWidth),
      hNum = Math.ceil(opts.canvasHeight / lineWidth),
      cW = baseDraw.canvasW.marginLeft;
    opts.canvasCtx.beginPath();
    for (var i = 0; i < wNum; i++) {
      var nWidth = i * lineWidth;
      if (i % 2 === 0) {
        opts.canvasCtx.moveTo(nWidth + cW, opts.y);
      } else {
        opts.canvasCtx.lineTo(nWidth + spaceWidth + cW, opts.y);
      }
    }
    for (var n = 0; n < hNum; n++) {
      var nHeight = n * lineWidth;
      if (n % 2 === 0) {
        opts.canvasCtx.moveTo(opts.x, nHeight);
      } else {
        opts.canvasCtx.lineTo(opts.x, nHeight + spaceWidth);
      }
    }
    opts.canvasCtx.closePath();
    opts.canvasCtx.stroke();
  },
  isArray: function (data) {
    return Object.prototype.toString.call(data) === '[object Array]';
  },
  getPaddingBottom: function (height) {
    return 0.15 * height;
  },
  getDateTime: function (dateString, timeType) {
    var date = new Date(dateString.replace(/-/g, "/"));
    switch (timeType) {
      case this.kLineTimeType.minute:
        var minutes = date.getMinutes();
        return date.getHours() + ':' + (minutes === 0 ? '00' : minutes);
      case this.kLineTimeType.year:
      case this.kLineTimeType.week:
      case this.kLineTimeType.day:
      case this.kLineTimeType.mouth:
        return date.getFullYear() + ' ' + (date.getMonth() + 1) + '/' + date.getDate();
      default:
        break;
    }
  },
  fillAndDrawGrid: function (opts) {
    opts.ctx.beginPath();
    opts.ctx.strokeStyle = '#fff';
    opts.ctx.moveTo(opts.pointOne.x, opts.pointOne.y);
    opts.ctx.lineTo(opts.pointTwo.x, opts.pointTwo.y);
    opts.ctx.lineTo(opts.pointThree.x, opts.pointThree.y);
    opts.ctx.lineTo(opts.pointFour.x, opts.pointFour.y);
    opts.ctx.closePath();
    opts.ctx.stroke();
    opts.ctx.fillStyle = opts.backgroundColor;
    opts.ctx.fill();

    var nWidth = Math.ceil(opts.width / 4);
    var nHeight = Math.ceil(opts.height / 6);

    opts.ctx.beginPath();
    for (var i = nWidth; i < opts.width; i += nWidth) {
      opts.ctx.moveTo(i - opts.paddingTop, -opts.paddingTop);
      opts.ctx.lineTo(i - opts.paddingTop, opts.height);
    }
    for (var n = nHeight; n < opts.height; n += nHeight) {
      opts.ctx.moveTo(0, n - opts.paddingTop);
      opts.ctx.lineTo(opts.width, n - opts.paddingTop);
    }
    opts.ctx.closePath();
    opts.ctx.stroke();
  },
  drawPrice: function (opts) {
    var height = opts.max - opts.min,//总高度
      nPrice = Math.ceil(height / opts.vLineCount),//每个价格大概相隔多少数量
      nHeight = opts.canvasHeight / opts.vLineCount,//每一个文字之间的距离
      high = opts.max + nPrice;//初始化高度，方便下边操作
    for (var n = 0; n <= opts.vLineCount; n++) {
      high = high - nPrice;
      var posY = n * nHeight;
      if (n === opts.vLineCount) {//最底部直接显示最低价
        high = opts.min;
      }
      opts.ctx.fillText(high + '', -opts.paddingLeft + this.canvasW.marginLeft, posY);
    }
  },
  getWidth: function (width) {
    return width - this.canvasW.marginRight;
  },

};

function DrawKLine(canvasId, options) {
  this.data = [];
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');
  this.viewRatio = baseDraw.getPixelRatio(this.ctx);
  this.setOptions(options);
  this.init();
}
DrawKLine.prototype = {
  setOptions: function (options) {
    var cHeight = this.canvas.parentNode.offsetHeight,
      cWidth = this.canvas.parentNode.offsetWidth;
    var kLineOpts = {
      viewRatio: this.viewRatio,
      lineWidth: options.lineWidth || 1,//上影线，下影线宽度
      barWidth: options.barWidth || 4,//阳线，阴线宽度
      spaceWidth: options.spaceWidth || 3,//阳线阴线之间的宽度，
      horizontalLineCount: options.horizontalLineCount || 5,//底部水平线的时间数
      verticalLineCount: options.verticalLineCount || 5,//左边垂直线的显示价格数
      timeType: options.timeType || baseDraw.kLineTimeType.minute,
      paddingTop: options.paddingTop || 10,
      paddingLeft: options.paddingLeft || 40,
      paddingBottom: options.paddingBottom || baseDraw.getPaddingBottom(cHeight),
      backgroundColor: options.backgroundColor || '#f0f7fc',
    };
    this.defaultOpts = {
      width: baseDraw.getWidth(options.width || cWidth),
      height: options.height || cHeight,
      paddingLeft: kLineOpts.paddingLeft,
      paddingTop: kLineOpts.paddingTop,
      paddingBottom: kLineOpts.paddingBottom,
    };
    this.kLine = new KLine(kLineOpts);
    this.eventStatus = {
      isChange: false,
      dir: 'right',
      isRedrawing: true,
      prevX: 0,
      distance: 0,
      ratio: 1,
      startPos: {
        x: 0,
        y: 0,
        time: new Date()
      },
      drawTimeId: 0,
      isShowGuide: false,
      isMove: false,
      isMoveTimeId: 0,
    };
  },
  init: function () {
    this.setCanvas();
    this.kLine.setBaseData({
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
    });
  },
  createCanvas: function () {
    var parentElement = this.canvas.parentNode,
      container = document.createElement('div'),
      canvas = document.createElement('canvas'),
      tips = document.createElement('div');
    tips.id = 'k-line-tip';
    container.className = 'k-line-container';
    canvas.id = 'k-line-guide';
    container.appendChild(this.canvas);
    container.appendChild(canvas);
    container.appendChild(tips);
    parentElement.appendChild(container);
    this.guide = canvas;
    this.tips = tips;
  },
  //初始化画布,根据几倍屏设置画布
  setCanvas: function () {
    this.initKLineCanvas();
    this.createCanvas();
    this.initGuideCanvas();
    this.addEvent();
  },
  initKLineCanvas: function () {
    this.canvas.width = this.defaultOpts.width * this.viewRatio;
    this.canvas.height = this.defaultOpts.height * this.viewRatio;
    this.canvas.style.width = this.defaultOpts.width + 'px';
    this.canvas.style.height = this.defaultOpts.height + 'px';
    this.ctx.scale(this.viewRatio, this.viewRatio);
  },
  initGuideCanvas: function () {
    this.guide.width = this.canvas.width;
    this.guide.height = this.canvas.height;
    this.guide.style.width = this.defaultOpts.width + 'px';
    this.guide.style.height = this.defaultOpts.height + 'px';
    this.guide.getContext('2d').scale(this.viewRatio, this.viewRatio);
  },
  //加工k线数据
  setData: function (data) {
    if (data) {
      if (baseDraw.isArray(data)) {
        data.forEach(function (d) {
          this.data.push({
            close: d.close,
            high: d.high,
            low: d.low,
            open: d.open,
            prevclose: d.prevclose,
            price: d.price,
            time: d.time,
            volume: d.volume,
            turnover: d.turnover,
            // avgprice: d.avgprice,//移动平均线均价
          });
        }.bind(this));
        this.kLine.setIsNewData(true);
      }
    }
  },

  resetCanvas: function (opts) {
    this.defaultOpts.width = baseDraw.getWidth(opts && opts.width) || this.defaultOpts.width;
    this.defaultOpts.height = opts && opts.height || this.defaultOpts.height;
    this.initKLineCanvas();
    this.initGuideCanvas();
    var pBottom = baseDraw.getPaddingBottom(this.defaultOpts.height);
    this.defaultOpts.paddingBottom = pBottom;
    this.kLine.setBaseData({
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
      paddingBottom: pBottom,
    });
    this.redrawKLine();
  },
  drawKLine: function (opts) {
    if (opts && opts.timeType) {
      this.kLine.setBaseData({
        timeType: opts.timeType,
      });
    }
    if (opts && opts.data) {
      this.setData(opts.data);
      this.redrawKLine();
    }

  },
  //重绘k线
  redrawKLine: function () {
    this.kLine.redrawKLine(this.ctx, this.data);
  },

  //判断当前是否多触点
  isMoreTouch: function (event) {
    return baseDraw.isMobile() ? event.targetTouches.length > 1 : false;
  },
  //获取当前第二触点位置
  getTouchSecondPos: function (event, canvas) {
    var nowPos = {
      x: 0,
      y: 0,
    };
    if (this.isMoreTouch(event)) {
      if (event.preventDefault) event.preventDefault();
      event.cancelBubble = true;
      var touch = event.touches[1],
        pos = baseDraw.canvasPos(canvas, touch.pageX, touch.pageY);
      nowPos.x = pos.x;
      nowPos.y = pos.y;
    }
    return nowPos;
  },
  //计算两个触点距离
  getDistance: function (x1, y1, x2, y2) {
    var x = Math.abs(x1 - x2),
      y = Math.abs(y1 - y2);
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  },
  //隐藏提示框
  hideKLineTips: function () {
    this.tips.style.display = 'none';
  },
  //获取当前提示画布的比例
  getCanvasWidthRatio: function () {
    return this.guide.offsetWidth / (this.canvas.width / this.viewRatio);
  },
  //获取当前触点坐标跟相对应的数据索引
  getCurrentPosition: function (x) {
    var kLine = this.kLine,
      info = kLine.getBaseInfo(),
      ratio = this.getCanvasWidthRatio(),
      newPos = x - info.paddingLeft * ratio,
      canvasWidth = this.guide.offsetWidth - info.paddingLeft * ratio,
      blockWidth = canvasWidth / info.count;
    return {
      posIndex: Math.floor(newPos / blockWidth),
      newPos: newPos,
    };
  },
  //显示提示框
  setKLineTips: function (x, y, position) {
    var kLine = this.kLine;
    if (position.newPos > 0 && x < this.guide.offsetWidth && y < this.guide.offsetHeight) {
      this.tips.style.display = 'block';
      var posX = x;
      var middleX = this.guide.offsetWidth / 2;
      if (middleX > x) {
        posX = posX + 50;
      } else {
        posX = (posX - this.tips.offsetWidth - 30);
      }
      this.tips.style.left = posX + 'px';
      this.tips.style.top = y - 40 + 'px';
      this.tips.innerHTML = kLine.getTipHtml(position.posIndex);
    } else {
      this.tips.style.display = 'none';
    }
  },
  //画辅助线
  drawGuide: function (ctx, x, y, canvasWidth, canvasHeight) {
    var position = this.getCurrentPosition(x);
    this.setKLineTips(x, y, position);
    var pos = this.kLine.getCurrentPosData(position.posIndex);
    if (!pos) {
      return;
    }
    var ay = (this.guide.height / this.viewRatio) / (this.canvas.height / this.viewRatio);
    var ax = (this.guide.width / this.viewRatio) / (this.canvas.width / this.viewRatio);
    y = ay * pos.y + this.defaultOpts.paddingTop * ay;
    x = ax * pos.x + this.defaultOpts.paddingLeft * ax;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.save();

    baseDraw.drawGuideLine.call(this, {
      canvasCtx: ctx,
      x: x,
      y: y,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
    });
    ctx.restore();
  },

  //移动k线
  moveKLine: function (xPos) {
    var kLine = this.kLine;
    var info = kLine.getBaseInfo();
    if (xPos < this.eventStatus.prevX) {
      this.eventStatus.dir = 'left';//往左移动
    } else {
      this.eventStatus.dir = 'right';//往左移动
    }
//移动几个k线
    var rangeCount = Math.floor(Math.abs(xPos - this.eventStatus.startPos.x) / info.blockWidth);
    var n = 0;
    if (this.eventStatus.dir === 'left') {
      n = info.currentIndex + rangeCount;
    } else {
      n = info.currentIndex - rangeCount;
    }
    var distance = Math.abs(this.eventStatus.prevX - xPos);
    if (distance < info.blockWidth / 2) {
      if (new Date() - this.eventStatus.startPos.time > 250 && distance < 2) {
        this.eventStatus.isShowGuide = true;
      }
      return;
    } else {
      this.eventStatus.startPos.time = new Date();
    }
    if (rangeCount > 0 && this.eventStatus.isRedrawing === true && this.eventStatus.isShowGuide === false) {
      kLine.setDataIndex(n);
      this.eventStatus.isRedrawing = false;
      this.redrawKLine();
      this.eventStatus.prevX = xPos;
      clearTimeout(this.eventStatus.drawTimeId);
      this.eventStatus.drawTimeId = setTimeout(function () {
        this.eventStatus.isRedrawing = true;
      }.bind(this), 150);
    }

  },
  addEvent: function () {
    var ctx = this.guide.getContext('2d'),
      eventType = baseDraw.getEventType();
    var touchStartEvent = function (event) {
      var nowPos = baseDraw.getPos(event, this.guide);
      this.eventStatus.isChange = true;
      this.eventStatus.prevX = nowPos.x;
      this.eventStatus.startPos.x = nowPos.x;
      this.eventStatus.startPos.time = new Date();
      if (this.isMoreTouch(event)) {
        var secondPos = this.getTouchSecondPos(event, this.guide);
        this.eventStatus.distance = this.getDistance(nowPos.x, nowPos.y, secondPos.x, secondPos.y);
        this.hideKLineTips();
      } else {
        this.eventStatus.isMoveTimeId = setInterval(function () {
          if (this.eventStatus.isMove === false) {
            clearInterval(this.eventStatus.isMoveTimeId);
            this.eventStatus.isShowGuide = true;

            this.drawGuide(ctx, nowPos.x, nowPos.y, this.guide.width, this.guide.height);
          }
        }.bind(this), 500)
      }
    }.bind(this);

    var touchMoveEvent = function (event) {
      var nowPos = baseDraw.getPos(event, this.guide);
      this.eventStatus.isMove = true;
      if (this.isMoreTouch(event)) {

        if (this.eventStatus.isRedrawing === true) {
          this.eventStatus.isRedrawing = false;
          var secondPos = this.getTouchSecondPos(event, this.guide),
            distance = this.getDistance(nowPos.x, nowPos.y, secondPos.x, secondPos.y),
            ratio = distance / this.eventStatus.distance,
            draw = false;
          if (ratio > 1) {
            if (this.kLine.kLineData.count >= this.kLine.initDefaultData.count / 2) {
              draw = true;
            }
          } else {
            if (this.kLine.kLineData.count <= this.kLine.initDefaultData.count) {
              draw = true;
            }
          }
          if (draw) {
            this.kLine.setRatio(ratio);
            this.redrawKLine();
          }
          clearTimeout(this.eventStatus.drawTimeId);
          this.eventStatus.drawTimeId = setTimeout(function () {
            this.eventStatus.isRedrawing = true;
          }.bind(this), 200);
        }

      } else {

        if (this.eventStatus.isChange) {
          this.moveKLine(nowPos.x);
        }
        if (this.eventStatus.isShowGuide) {
          this.drawGuide(ctx, nowPos.x, nowPos.y, this.guide.width, this.guide.height);
        }

      }
    }.bind(this);

    var touchEndEvent = function (event) {
      this.eventStatus.isChange = false;
      this.eventStatus.isShowGuide = false;
      this.eventStatus.isMove = false;
      clearInterval(this.eventStatus.isMoveTimeId);

      ctx.clearRect(0, 0, this.guide.width, this.guide.height);
      ctx.save();
      this.hideKLineTips();
      if (event.preventDefault) {
        event.preventDefault();
      }
      event.cancelBubble = true;
    }.bind(this);
    this.guide.removeEventListener(eventType.move, touchMoveEvent);
    this.guide.removeEventListener(eventType.start, touchStartEvent);
    this.guide.removeEventListener(eventType.end, touchEndEvent);

    this.guide.addEventListener(eventType.move, touchMoveEvent, false);
    this.guide.addEventListener(eventType.start, touchStartEvent, false);
    this.guide.addEventListener(eventType.end, touchEndEvent, false);
  },
}

function KLine(options) {
  this.setOptions(options);
};

KLine.prototype = {
  setOptions: function (options) {
    this.viewRatio = options.viewRatio;
    this.kLineColor = {
      riseColor: 'red',//阳线颜色
      fallColor: 'green',//阴线颜色
      normalColor: 'black',//其他字体之类的颜色
      backgroundColor: options.backgroundColor,
    }
    this.kLineWidth = {
      lineWidth: options.lineWidth,//上影线，下影线宽度
      barWidth: options.barWidth,//阳线，阴线宽度
      spaceWidth: options.spaceWidth,//阳线阴线之间的宽度，
      paddingLeft: options.paddingLeft,
      paddingTop: options.paddingTop,
      paddingBottom: options.paddingBottom,
    }
    this.kLineCount = {
      horizontalLineCount: options.horizontalLineCount - 1,//底部水平线的时间数
      verticalLineCount: options.verticalLineCount - 1,//左边垂直线的显示价格数
    };
    this.canvasSize = {
      width: 0,//画布宽度
      height: 0,//画布高度
    };
    this.kLineData = {
      ratio: 1,//实际价格与画布显示正常比率，默认是1
      high: 0,//最高
      low: 0,//最低
      currentIndex: 0,//画布上显示的最后的一条数据index,初始化是最后一条数据
      count: 0,//画布上最多显示几条k线
      blockWidth: 0,//每一等分宽度
      data: [],//初始数据
      newData: [],//当前数据
      isLNewData: true,
    };
    this.isInit = true;
    this.initDefaultData = {
      count: 0,
      barWidth: options.barWidth,
      lineWidth: options.lineWidth,
    };
    this.timeType = options.timeType;
  },
  setBaseData: function (opts) {
    if (opts.canvasHeight) {
      this.canvasSize.height = opts.canvasHeight;
    }
    if (opts.canvasWidth) {
      this.canvasSize.width = opts.canvasWidth;
    }

    if (opts.paddingBottom) {
      this.kLineWidth.paddingBottom = opts.paddingBottom;
    }
    if (opts.timeType) {
      this.timeType = opts.timeType;
      this.kLineWidth.lineWidth = this.initDefaultData.lineWidth;
      this.kLineWidth.barWidth = this.initDefaultData.barWidth;
    }
  },
  //获取画布的高度
  getCanvasHeight: function () {
    return this.canvasSize.height / this.viewRatio;
  },
  //获取画布宽度
  getCanvasWidth: function () {
    return this.canvasSize.width / this.viewRatio;
  },
  //设置k线直接的间隔
  setSpaceWidth: function (canvasWidth, count) {
    return (canvasWidth - (count * this.kLineWidth.barWidth)) / count;
  },
  getContentHeight: function () {
    return this.getCanvasHeight() - this.kLineWidth.paddingTop - this.kLineWidth.paddingBottom;
  },
  getRightCanvasWidth: function () {
    return this.getCanvasWidth() - this.kLineWidth.paddingLeft;
  },
  //计算一个画布上显示多少条k线
  setKLineCount: function (totalCount) {
    var canvasWidth = this.getRightCanvasWidth();
    //计算一个k线的宽度跟间隙
    var width = this.kLineWidth.barWidth + this.kLineWidth.spaceWidth;
    var count = Math.floor(canvasWidth / width);
    this.kLineData.blockWidth = canvasWidth / count;
    if (count > totalCount) {
      count = totalCount;
    }
    this.kLineData.count = count;
    if (this.isInit || this.initDefaultData.count === 0) {
      this.initDefaultData.count = this.kLineData.count;
      this.isInit = false;
    }
  },
  //获取实际参数与画布的比例
  getRatio: function () {
    var height = this.kLineData.high - this.kLineData.low,
      ratio = this.getContentHeight() / height;
    return ratio;
  },
  getCurrentIndex: function (length) {
    return this.kLineData.count > length ? length : this.kLineData.count;
  },
  //设置当前数据中最后一条数据的索引
  setCurrentDataLastIndex: function (length) {
    if (this.kLineData.currentIndex > length) {
      this.kLineData.currentIndex = length;
    } else if (this.kLineData.currentIndex < 0) {
      this.kLineData.currentIndex = this.getCurrentIndex(length);
    }
  },
  //设置当前数据中第一条数据的索引
  setCurrentDataFirstIndex: function (length) {
    var dataNum = this.kLineData.currentIndex - this.kLineData.count;
    if (dataNum < 0) {
      dataNum = 0;
      this.kLineData.currentIndex = this.getCurrentIndex(length);
    }
    return dataNum;
  },
  setHeadSpace: function (max, min) {
    this.kLineData.high = max + 5;
    this.kLineData.low = min - 5;
  },
  //计算当前显示k线的数据
  setKLineItem: function (kData) {
    var length = kData.length;
    if (this.kLineData.isLNewData) {
      this.kLineData.currentIndex = length;
      this.setIsNewData(false);
    }
    this.setKLineCount(length);
    this.setCurrentDataLastIndex(length);
    var newData = [],
      maxHigh = 0,
      minLow = 0,
      isFirst = true,
      //判断是否足够数量显示
      dataNum = this.setCurrentDataFirstIndex(length);

    for (var i = dataNum; i < this.kLineData.currentIndex; i++) {
      newData.push(kData[i]);
    }
    newData.forEach(function (d) {
      if (isFirst) {
        minLow = d.low;
        isFirst = false;
      }
      maxHigh = Math.max(d.high, maxHigh);
      minLow = Math.min(d.low, minLow);
    });
    this.setHeadSpace(maxHigh, minLow);
    this.kLineData.ratio = this.getRatio();
    this.kLineData.newData = newData;
  },
  getLineData: function (lineHigh, lineLow, lineOpen, lineClose) {
    var isRise = lineClose > lineOpen,//是否阳线
      ratio = this.kLineData.ratio,//比例
      color = isRise ? this.kLineColor.riseColor : this.kLineColor.fallColor,
      lineHeight = Math.abs(ratio * (lineHigh - lineLow)),
      barHeight = ratio * Math.abs(lineClose - lineOpen),
      high = (this.kLineData.high - lineHigh) * ratio,
      low = lineHeight + high,
      close, open;
    if (isRise) {
      close = (this.kLineData.high - lineClose) * ratio;
      open = barHeight + close;
    } else {
      open = (this.kLineData.high - lineOpen) * ratio;
      close = barHeight + open;
    }
    return {
      high: high,
      low: low,
      open: open,
      close: close,
      color: color,
      isRise: isRise,
      barHeight: barHeight,
    }
  },
  //绘制文本
  drawText: function (ctx) {
    var hLineCount = this.kLineCount.horizontalLineCount;
    //画价格线
    var priceOpts = {
      ctx: ctx,
      max: this.kLineData.high,
      min: this.kLineData.low,
      vLineCount: this.kLineCount.verticalLineCount,
      canvasHeight: this.getContentHeight(),
      paddingLeft: this.kLineWidth.paddingLeft,
    }
    baseDraw.drawPrice(priceOpts);
    //画时间线
    var
      length = this.kLineData.newData.length,
      count = hLineCount > this.kLineData.count ? this.kLineData.count : hLineCount,
      nTime = Math.floor(length / count + 1) - 1,//计算每一个距离有多少条数据
      nT = 0;//计算每一个距离相对应的数据index
    if (length === 0) {
      return;
    }
    var times = baseDraw.getDateTime(this.kLineData.newData[0].time, this.timeType),
      timeWidth = ctx.measureText(times).width,
      totalWidth = length * this.kLineData.blockWidth,
      totalCount = Math.floor(totalWidth / timeWidth),
      timeH = this.getCanvasHeight() - 10;
    count = totalCount > count ? count : totalCount - 1;
    for (var i = 0; i <= count; i++) {
      nT = nT + nTime;
      if (nT >= length || i === count) {
        nT = length - 1;
      } else if (i === 0) {
        nT = 0;
      }
      var kWidth = (nT + 1) * this.kLineData.blockWidth - this.kLineData.blockWidth / 2,
        time = baseDraw.getDateTime(this.kLineData.newData[nT].time, this.timeType),
        txtWidth = ctx.measureText(time).width;

      if (i === count) {//最后一条直接显示
        kWidth = totalWidth - txtWidth;
      } else if (i !== 0) {
        kWidth = kWidth - txtWidth / 2;
      } else {
        kWidth = 0;
      }

      ctx.fillText(time, kWidth, timeH);
    }
  },
  //画k线
  drawKLine: function (ctx) {
    ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    ctx.save();
    //移动原点
    ctx.translate(this.kLineWidth.paddingLeft, this.kLineWidth.paddingTop);

    this.drawText(ctx);
    var
      canvasWidth = this.getRightCanvasWidth(),
      canvasHeight = this.getContentHeight();
    //加1减1只是为了画出右边，顶部线条，因为默认线条宽度是1
    var opts = {
      backgroundColor: this.kLineColor.backgroundColor,
      ctx: ctx,
      pointOne: { x: 0, y: -this.kLineWidth.paddingTop + 1 },
      pointTwo: { x: 0, y: canvasHeight - 1 },
      pointThree: {
        x: canvasWidth - 1,
        y: canvasHeight - 1,
      },
      pointFour: {
        x: canvasWidth - 1,
        y: -this.kLineWidth.paddingTop + 1,
      },
      width: canvasWidth,
      height: canvasHeight,
      paddingTop: this.kLineWidth.paddingTop,
    }
    baseDraw.fillAndDrawGrid.call(this, opts);

    var nWidth = this.kLineData.blockWidth;
    this.posData = [];
    this.kLineData.newData.forEach(function (kLine, index) {
      var line = this.getLineData(kLine.high, kLine.low, kLine.open, kLine.close),
        nthWidth = index * nWidth,
        centerX = nthWidth + nWidth / 2,
        barX = centerX - (this.kLineWidth.barWidth / 2);
      //开始绘制
      ctx.fillStyle = line.color;
      ctx.strokeStyle = line.color;
      ctx.lineWidth = this.kLineWidth.lineWidth;
      //画线
      ctx.beginPath();
      ctx.moveTo(centerX, line.high);
      ctx.lineTo(centerX, line.low);
      ctx.stroke();
      //画蜡炬图
      ctx.beginPath();
      if (line.isRise) {
        ctx.fillRect(barX, line.close,
          this.kLineWidth.barWidth,
          line.barHeight);
      } else {
        ctx.fillRect(barX, line.open,
          this.kLineWidth.barWidth,
          line.barHeight);
      }
      //表示如果开盘价等于收盘价，就画一条线
      if (line.barHeight === 0) {
        ctx.beginPath();
        ctx.moveTo(barX, line.open);
        ctx.lineTo(barX + this.kLineWidth.barWidth, line.open);
        ctx.stroke();
      }
      this.posData.push({ x: centerX, y: line.close });
    }.bind(this));
    ctx.restore();
  },

  //根据上一日收盘价与当前价对比设置颜色
  getPriceColor: function (kData, price) {
    if (price > kData.prevclose) {
      return this.kLineColor.riseColor;
    } else if (price < kData.prevclose) {
      return this.kLineColor.fallColor;
    } else {
      return this.kLineColor.normalColor;
    }
  },
  //根据位置获取当前的k线收盘价数据，计算过的数据
  getCurrentPosData: function (posIndex) {
    return this.posData[posIndex];
  },
  //根据位置获取当前k线数据
  getData: function (posIndex) {
    var length = this.kLineData.newData.length;
    if (posIndex >= length) {
      posIndex = length - 1;
    } else if (posIndex < 0) {
      posIndex = 0;
    }
    return this.kLineData.newData[posIndex];
  },
  //获取提示信息
  getTipHtml: function (posIndex) {
    var data = this.getData(posIndex)
    var tipHtml = '<div>' +
      '<b>' + data.time + '</b></div>' +
      '昨收价：<span style="color:' + this.getPriceColor(data, data.prevclose) + '">' + data.prevclose + '</span><br/>' +
      '开盘价：<span style="color:' + this.getPriceColor(data, data.open) + '">' + data.open + '</span><br/>' +
      '收盘价：<span style="color:' + this.getPriceColor(data, data.close) + '">' + data.close + '</span><br/>' +
      '最高价：<span style="color:' + this.getPriceColor(data, data.high) + '">' + data.high + '</span><br/>' +
      '最低价：<span style="color:' + this.getPriceColor(data, data.low) + '">' + data.low + '</span><br/>' +
      '成交量：' + data.volume + '<br/>' +
      '成交额：' + data.turnover;
    return tipHtml;
  },
  //重绘k线
  redrawKLine: function (ctx, kData) {
    this.setKLineItem(kData);
    this.drawKLine(ctx)
  },
  //提供一些基础数据
  getBaseInfo: function () {
    return {
      paddingLeft: this.kLineWidth.paddingLeft,
      barWidth: this.kLineWidth.barWidth,
      spaceWidth: this.kLineWidth.spaceWidth,
      blockWidth: this.kLineData.blockWidth,
      currentIndex: this.kLineData.currentIndex,
      count: this.kLineData.count,
    }
  },
  //设置当前数据索引
  setDataIndex: function (num) {
    this.kLineData.currentIndex = num;
  },
  //缩放比例设置
  setRatio: function (ratio) {
    this.kLineWidth.barWidth *= ratio;
    this.kLineWidth.lineWidth *= ratio;
    if (this.kLineWidth.barWidth < this.initDefaultData.barWidth) {
      this.kLineWidth.barWidth = this.initDefaultData.barWidth;
      this.kLineWidth.lineWidth = this.initDefaultData.lineWidth;
    }
  },
//设置是否初始化数据
  setIsNewData: function (isNew) {
    this.kLineData.isLNewData = isNew;
  },
};

function DrawChart(canvasId, options) {
  this.data = [];
  this.newData = [];
  this.ratio = 1;
  this.chart = document.getElementById(canvasId);
  this.chartCtx = this.chart.getContext('2d');
  this.setOptions(options);
  this.createCanvas();
  this.init();
}
DrawChart.prototype = {
  setOptions: function (options) {
    var cHeight = this.chart.parentNode.offsetHeight,
      cWidth = this.chart.parentNode.offsetWidth;
    this.options = {
      width: baseDraw.getWidth(options.width || cWidth),
      height: options.height || cHeight,
      paddingLeft: options.paddingLeft || 35,
      paddingBottom: options.paddingBottom || baseDraw.getPaddingBottom(cHeight),
      paddingTop: options.paddingTop || 10,
      timeCount: options.timeCount - 1 || 5,
      vLineCount: options.vLineCount - 1 || 4,//左边垂直价格数量
      chartLineColor: options.chartLineColor || 'rgba(2,100,30,1)',
      chartFillColor: options.chartFillColor || 'rgb(2,100,30)',
      chartColor: options.chartColor || 'black',
      backgroundColor: options.backgroundColor || '#f0f7fc',
    };
  },
  createCanvas: function () {
    var parentElement = this.chart.parentNode,
      container = document.createElement('div'),
      tips = document.createElement('canvas'),
      layer = document.createElement('canvas'),
      textTips = document.createElement('div'),
      ball = document.createElement('div'),
      outer = document.createElement('div'),
      outer2 = document.createElement('div'),
      inner = document.createElement('div');
    container.className = 'draw-chart-container';
    outer.className = 'outer ball';
    outer2.className = 'outer2 ball';
    inner.className = 'inner ball';
    tips.id = 'chart-tip';
    layer.id = 'chart-layer';
    textTips.id = 'text-Tips';
    ball.id = 'chart-ball';
    ball.appendChild(outer);
    ball.appendChild(outer2);
    ball.appendChild(inner);
    container.appendChild(textTips);
    container.appendChild(ball);
    container.appendChild(this.chart);
    container.appendChild(layer);
    container.appendChild(tips);
    parentElement.appendChild(container);
    this.layer = layer;
    this.tips = tips;
    this.tipsCtx = this.tips.getContext('2d');
    this.layerCtx = this.layer.getContext('2d');
    this.textTips = textTips;
    this.ball = ball;
  },
  init: function () {
    this.getViewRatio();
    this.setCanvas();
    this.setMinute();
    this.setCanvasScale();
    this.addBindEvent();
  },
  setCanvas: function () {
    this.chart.width = this.tips.width = this.layer.width = this.options.width * this.viewRatio;
    this.chart.height = this.tips.height = this.layer.height = this.options.height * this.viewRatio;
    this.chart.style.width = this.tips.style.width = this.layer.style.width = this.options.width + 'px';
    this.chart.style.height = this.tips.style.height = this.layer.style.height = this.options.height + 'px';
  },
  resetCanvas: function (opts) {
    this.options.width = baseDraw.getWidth(opts && opts.width) || this.options.width;
    this.options.height = opts && opts.height || this.options.height;
    this.options.paddingBottom = baseDraw.getPaddingBottom(this.options.height);
    this.setCanvas();
    this.setCanvasScale();
    this.drawChart();
  },
  //获取画布的高度
  getCanvasHeight: function () {
    return this.layer.height / this.viewRatio;
  },
  //获取画布宽度
  getCanvasWidth: function () {
    return this.layer.width / this.viewRatio;
  },
  getViewRatio: function () {
    this.viewRatio = baseDraw.getPixelRatio(this.chartCtx);
  },
  getRelativeRatio: function () {
    var chartHeight = this.options.paddingBottom + this.options.paddingTop;
    this.ratio = ((this.chart.height / this.viewRatio) - chartHeight) / (this.max - this.min);
  },
  setMinute: function () {
    this.minute = this.options.timeCount * 60;
  },
  setData: function (data) {
    this.blockWidth = (this.chart.width / this.viewRatio - this.options.paddingLeft) / this.minute;
    if (data) {
      if (baseDraw.isArray(data)) {
        data.forEach(function (d) {
          this.data.push({
            mktime: d.mktime,
            price: d.price,
            time: d.time,
          });
        }.bind(this));
      }
    } else {
      return;
    }

    var spliceDataCount = Math.ceil(this.data.length / 60);
    var startCount = 0;
    this.newData = [];
    if (this.options.timeCount < spliceDataCount) {
      startCount = spliceDataCount - this.options.timeCount;
      this.data.map(function (d, index) {
        if (index < startCount * 60) {
          return;
        }
        this.newData.push(d);
      }.bind(this));
    } else {
      this.newData = this.data;
    }
    this.max = 0;
    this.min = 0;
    this.newData.forEach(function (d, index) {
      if (index === 0) {
        this.min = d.price;
      }
      this.max = Math.max(d.price, this.max);
      this.min = Math.min(d.price, this.min);
    }.bind(this));
    if (this.max === this.min) {
      this.max += 10;
      this.min -= 10;
    }

  },
  drawChart: function (data) {
    // if (isSwitch) {
    this.data.length = 0;
    // }

    this.setData(data);
    this.getRelativeRatio();
    this.drawTimeChart();

    var last = this.newData[this.newData.length - 1];
    if (!last) {
      return;
    }

    var x = this.blockWidth * this.newData.length + this.options.paddingLeft,
      y = (this.max - last.price) * this.ratio + this.options.paddingTop;
    var ss = 'transform:translate3d(' + parseFloat(x).toFixed(2) + 'px,' + parseFloat(y).toFixed(2) + 'px,0px)';
    this.ball.setAttribute('style', '-webkit-' + ss + ';' + ss);

  },
  getDateTime: function (time) {
    return new Date(time.replace(/-/g, "/")).getHours();
  },
  getLineGradient: function () {
    var lineGradient = this.layerCtx.createLinearGradient(0, 0, 0, this.getCanvasHeight());
    lineGradient.addColorStop(0.1, this.options.chartFillColor);
    lineGradient.addColorStop(0.9, 'white');
    return lineGradient;
  },
  drawTimeChart: function () {
    var layerHeight = this.getCanvasHeight();
    var layerWidth = this.getCanvasWidth();
    this.chartCtx.clearRect(0, 0, this.chart.width, this.chart.height);
    this.chartCtx.save();
    this.layerCtx.clearRect(0, 0, this.layer.width, this.layer.height);
    this.layerCtx.save();

    this.chartCtx.translate(this.options.paddingLeft, 0);
    this.chartCtx.beginPath();
    this.chartCtx.fillStyle = this.options.backgroundColor;
    this.chartCtx.fillRect(0, 0, this.chart.width - this.options.paddingLeft, this.chart.height);
    this.layerCtx.save();
    this.layerCtx.restore();
    this.chartCtx.translate(0, this.options.paddingTop);

    // this.chartCtx.translate(this.options.paddingLeft, this.options.paddingTop);
    this.layerCtx.translate(this.options.paddingLeft, this.options.paddingTop);

    // var opts = {
    //   backgroundColor: this.options.backgroundColor,
    //   ctx: this.chartCtx,
    //   lineOne: { x: 0, y: -this.options.paddingTop+1 },
    //   lineTwo: { x: 0, y: layerHeight },
    //   lineThree: {
    //     x: layerWidth - this.options.paddingLeft-1,
    //     y: layerHeight-1,
    //   },
    //   lineFour: {
    //     x: layerWidth - this.options.paddingLeft,
    //     y: -this.options.paddingTop+1,
    //   },
    //   width: layerWidth - this.options.paddingLeft,
    //   height: layerHeight,
    //   paddingTop: this.options.paddingTop,
    // }
    //
    // baseDraw.fillAndDrawGrid.call(this, opts);

    this.chartCtx.lineWidth = 2;
    this.chartCtx.beginPath();
    this.chartCtx.strokeStyle = this.options.chartLineColor;
    this.layerCtx.beginPath();
    this.layerCtx.moveTo(0, layerHeight);

    for (var n = 0; n < this.minute; n++) {
      if (n >= this.newData.length) {
        break;
      }
      var d = this.newData[n];
      var posX = n * this.blockWidth;
      var posY = (this.max - d.price) * this.ratio;
      if (n === 0) {
        this.chartCtx.moveTo(posX, posY);
      } else {
        this.chartCtx.lineTo(posX, posY);
      }
      this.layerCtx.lineTo(posX, posY);
    }
    this.chartCtx.stroke();

    this.chartCtx.restore();

    this.layerCtx.lineTo(( this.newData.length - 1) * this.blockWidth, layerHeight);

    this.layerCtx.fillStyle = this.getLineGradient();
    this.layerCtx.fill();

    this.layerCtx.fillStyle = this.options.chartColor;
    var layerH = layerHeight - this.options.paddingTop;
    //画时间线
    var startTime = 0;
    for (var i = 0; i <= this.options.timeCount; i++) {
      var t = i * 60;
      var layerPosX = t * this.blockWidth;
      var dd = this.newData[t];
      if (dd) {
        startTime = this.getDateTime(dd.time);
      }
      else {
        startTime += 1;
      }
      var txtTime = startTime + ':00';
      var txtWidth = this.layerCtx.measureText(txtTime).width;
      if (i === this.options.timeCount) {
        layerPosX = layerWidth - this.options.paddingLeft;
        layerPosX -= txtWidth;
      } else if (i !== 0) {
        layerPosX -= txtWidth / 2;
      }
      this.layerCtx.fillText(txtTime, layerPosX, layerH);
    }

    //画价格文本
    var priceHeight = layerH- this.options.paddingBottom;

    var priceOpts = {
      ctx: this.layerCtx,
      max: this.max,
      min: this.min,
      vLineCount: this.options.vLineCount,
      canvasHeight: priceHeight,
      paddingLeft: this.options.paddingLeft,
    }
    baseDraw.drawPrice(priceOpts);

    this.layerCtx.restore();
  },
  setCanvasScale: function () {
    this.chartCtx.scale(this.viewRatio, this.viewRatio);
    this.layerCtx.scale(this.viewRatio, this.viewRatio);
    this.tipsCtx.scale(this.viewRatio, this.viewRatio);
  },
  addBindEvent: function () {
    var eventType = baseDraw.getEventType(true);

    function tipsEvent(event) {
      var nowPos = baseDraw.getPos(event, this.tips);
      this.setTips(nowPos);
    }

    this.tips.addEventListener(eventType.start, tipsEvent.bind(this), false);
    this.tips.addEventListener(eventType.move, tipsEvent.bind(this), false);
    this.tips.addEventListener(eventType.end, function () {
      this.tipsCtx.clearRect(0, 0, this.tips.offsetWidth, this.tips.offsetHeight);
      this.textTips.style.display = 'none';
    }.bind(this), false);
  },
  setTips: function (nowPos) {
    var posIndex = Math.floor((nowPos.x - this.options.paddingLeft) / this.blockWidth);
    if (!posIndex) {
      return;
    }
    if (posIndex < 0) {
      posIndex = 0;
      nowPos.x = this.options.paddingLeft;
    } else if (posIndex > this.newData.length - 1) {
      posIndex = this.newData.length - 1;
      nowPos.x = posIndex * this.blockWidth + this.options.paddingLeft;
    }

    var newData = this.newData[posIndex];
    if (!newData) {
      return;
    }
    var posY = (this.max - newData.price) * this.ratio + this.options.paddingTop;
    this.tipsCtx.clearRect(0, 0, this.tips.offsetWidth, this.tips.offsetHeight);
    this.tipsCtx.save();

    baseDraw.drawGuideLine.call(this, {
      canvasCtx: this.tipsCtx,
      x: nowPos.x,
      y: posY,
      canvasWidth: this.tips.offsetWidth,
      canvasHeight: this.tips.offsetHeight,
    });
    this.tipsCtx.beginPath();
    this.tipsCtx.arc(nowPos.x, posY, 3, 0, Math.PI * 2, false);
    this.tipsCtx.stroke();
    this.tipsCtx.restore();
    var posX = nowPos.x;
    var middleX = this.tips.offsetWidth / 2;
    if (middleX > nowPos.x) {
      posX = posX + 50;
    } else {
      posX = (posX - this.textTips.offsetWidth - 30);
    }
    var s = 'transform:translate3d(' + posX + 'px, ' + (nowPos.y - 40) + 'px, 0)';
    this.textTips.setAttribute('style', '-webkit-' + s + ';' + s + ';display:block');
    this.textTips.innerHTML = newData.time + '<br/><b>' + newData.price + '</b>';

  },
};