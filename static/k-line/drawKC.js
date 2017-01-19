/**
 * Created by wenxinfu on 2016/12/27.
 */
"use strict";
var baseDraw = {
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
  getEventType: function () {
    var eventType = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
    };
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
  drawGuideLine: function (canvasCtx, x, y, canvasWidth, canvasHeight) {
    canvasCtx.lineWidth = .5;
    var lineWidth = 4,
      spaceWidth = 2,
      wNum = Math.ceil(canvasWidth / lineWidth),
      hNum = Math.ceil(canvasHeight / lineWidth);
    canvasCtx.beginPath();
    for (var i = 0; i < wNum; i++) {
      var nWidth = i * lineWidth;
      if (i % 2 === 0) {
        canvasCtx.moveTo(nWidth, y);
      } else {
        canvasCtx.lineTo(nWidth + spaceWidth, y);
      }
    }
    for (var n = 0; n < hNum; n++) {
      var nHeight = n * lineWidth;
      if (n % 2 === 0) {
        canvasCtx.moveTo(x, nHeight);
      } else {
        canvasCtx.lineTo(x, nHeight + spaceWidth);
      }
    }
    canvasCtx.closePath();
    canvasCtx.stroke();
  },
  isArray: function (data) {
    return Object.prototype.toString.call(data) === '[object Array]';
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
  setOptions:function (options) {
    this.heightRatio = 0.15;
    var cHeight = this.canvas.parentNode.offsetHeight,
      cWidth = this.canvas.parentNode.offsetWidth;
    var kLineOpts = {
      viewRatio: this.viewRatio,
      lineWidth: options.lineWidth || 1,//上影线，下影线宽度
      barWidth: options.barWidth || 4,//阳线，阴线宽度
      spaceWidth: options.spaceWidth || 3,//阳线阴线之间的宽度，
      horizontalLineCount: options.horizontalLineCount || 5,//底部水平线的时间数
      verticalLineCount: options.verticalLineCount || 5,//左边垂直线的显示价格数
      timeType: options.timeType || 1,//1,分钟，2，天
      paddingTop: options.paddingTop || 10,
      paddingLeft: options.paddingLeft || 30,
      paddingBottom: options.paddingBottom || this.getPaddingBottom(cHeight),
    };

    this.defaultOpts = {
      width: options.width || cWidth,
      height: options.height || cHeight,
      paddingLeft: kLineOpts.paddingLeft,
      paddingTop: kLineOpts.paddingTop,
      paddingBottom: kLineOpts.paddingBottom,
    };
    this.kLine = new kLine(kLineOpts);
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
    this.kLine.init(this.canvas.width, this.canvas.height);
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
    // this.guide.style.borderBottom = 'solid rgb(77, 77, 68) 1px';
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
  getPaddingBottom: function (height) {
    return this.heightRatio * height;
  },
  resetCanvas: function (width, height) {
    this.defaultOpts.width = width || this.defaultOpts.width;
    this.defaultOpts.height = height || this.defaultOpts.height;
    this.initKLineCanvas();
    this.initGuideCanvas();
    var pBottom = this.getPaddingBottom(this.defaultOpts.height);
    this.defaultOpts.paddingBottom = pBottom;
    this.kLine.init(this.canvas.width, this.canvas.height, pBottom);
    this.redrawKLine();
  },
  drawKLine: function (data, isSwitch) {
    if (isSwitch) {
      this.data.length = 0;
    }
    this.setData(data);
    if (data) {
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
    baseDraw.drawGuideLine.call(this, ctx, x, y, canvasWidth, canvasHeight);
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
      if (new Date() - this.eventStatus.startPos.time > 500 && distance < 2) {
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
      ww = this.guide.width,
      wh = this.guide.height,
      eventType = baseDraw.getEventType();
    var touchStartEvent = function (event) {
      this.eventStatus.isChange = true;
      var nowPos = baseDraw.getPos(event, this.guide);
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
            this.drawGuide(ctx, nowPos.x, nowPos.y, ww, wh);
          }
        }.bind(this), 1000)
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
            if (this.kLine.dataInfo.count >= this.kLine.initDefaultData.count / 2) {
              draw = true;
            }
          } else {
            if (this.kLine.dataInfo.count <= this.kLine.initDefaultData.count) {
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
          this.drawGuide(ctx, nowPos.x, nowPos.y, ww, wh);
        }

      }
    }.bind(this);

    var touchEndEvent = function (event) {
      this.eventStatus.isChange = false;
      this.eventStatus.isShowGuide = false;
      this.eventStatus.isMove = false;
      clearInterval(this.eventStatus.isMoveTimeId);

      ctx.clearRect(0, 0, ww, wh);
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

function kLine(options) {
  this.viewRatio = options.viewRatio;
  this.kLineColor = {
    riseColor: 'red',//阳线颜色
    fallColor: 'green',//阴线颜色
    normalColor: 'black',//其他字体之类的颜色
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
    horizontalLineCount: options.horizontalLineCount,//底部水平线的时间数
    verticalLineCount: options.verticalLineCount,//左边垂直线的显示价格数
  };
  this.canvasSize = {
    width: 0,//画布宽度
    height: 0,//画布高度
  };
  this.dataInfo = {
    ratio: 1,//实际价格与画布显示正常比率，默认是1
    high: 0,//最高
    low: 0,//最低
    currentIndex: 0,//画布上显示的最后的一条数据index,初始化是最后一条数据
    currentDataLength: 0,//当前画布上显示的k线实际条数
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
};

kLine.prototype = {
  init: function (canvasWidth, canvasHeight, paddingBottom) {
    this.canvasSize.height = canvasHeight;
    this.canvasSize.width = canvasWidth;
    if (paddingBottom) {
      this.kLineWidth.paddingBottom = paddingBottom;
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

  getKLineBottom: function () {
    return this.kLineWidth.paddingBottom;
  },
  //计算一个画布上显示多少条k线
  setKLineCount: function (totalCount) {
    var canvasWidth = this.getCanvasWidth() - this.kLineWidth.paddingLeft;
    //计算一个k线的宽度跟间隙
    var width = this.kLineWidth.barWidth + this.kLineWidth.spaceWidth;
    var count = Math.floor(canvasWidth / width);
    this.dataInfo.blockWidth = canvasWidth / count;
    if (count * width !== canvasWidth && this.dataInfo.currentDataLength === count) {
      // this.kLineWidth.spaceWidth = this.setSpaceWidth(canvasWidth, count);
    } else if (count > totalCount) {
      // this.kLineWidth.spaceWidth = this.setSpaceWidth(canvasWidth, totalCount);
      count = totalCount;
    }
    this.dataInfo.count = count;
    if (this.isInit) {
      this.initDefaultData.count = this.dataInfo.count;
      this.isInit = false;
    }
  },
  //获取实际参数与画布的比例
  getRatio: function () {
    var height = this.dataInfo.high - this.dataInfo.low,
      ratio = (this.getCanvasHeight() - (this.kLineWidth.paddingTop + this.getKLineBottom())) / height;
    return ratio;
  },
  setCurrentDataLastIndex: function (length) {
    if (this.dataInfo.currentIndex > length) {
      this.dataInfo.currentIndex = length;
    } else if (this.dataInfo.currentIndex < 0) {
      this.dataInfo.currentIndex = this.dataInfo.count > length ? length : this.dataInfo.count;
    }
  },
  setCurrentDataFirstIndex: function (length) {
    var dataNum = this.dataInfo.currentIndex - this.dataInfo.count;
    if (dataNum < 0) {
      dataNum = 0;
      this.dataInfo.currentIndex = this.dataInfo.count > length ? length : this.dataInfo.count;
    }
    return dataNum;
  },
  //计算当前显示k线的数据
  setKLineItem: function (kData) {
    var length = kData.length;
    if (this.dataInfo.isLNewData) {
      this.dataInfo.currentIndex = length;
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

    for (var i = dataNum; i < this.dataInfo.currentIndex; i++) {
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
    // this.dataInfo.high = maxHigh;
    // this.dataInfo.low = minLow;
    this.dataInfo.high = maxHigh + 5;
    this.dataInfo.low = minLow - 5;
    this.dataInfo.currentDataLength = newData.length;
    this.dataInfo.ratio = this.getRatio();
    this.dataInfo.newData = newData;
  },
  getLineData: function (lineHigh, lineLow, lineOpen, lineClose) {
    var isRise = lineClose > lineOpen,//是否阳线
      ratio = this.dataInfo.ratio,//比例
      color = isRise ? this.kLineColor.riseColor : this.kLineColor.fallColor,
      lineHeight = Math.abs(ratio * (lineHigh - lineLow)),
      barHeight = ratio * Math.abs(lineClose - lineOpen),
      high = (this.dataInfo.high - lineHigh) * ratio,
      low = lineHeight + high,
      close, open;
    if (isRise) {
      close = (this.dataInfo.high - lineClose) * ratio;
      open = barHeight + close;
    } else {
      open = (this.dataInfo.high - lineOpen) * ratio;
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
  //画k线
  drawKLine: function (ctx) {
    ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    ctx.save();
    //移动原点
    ctx.translate(this.kLineWidth.paddingLeft, this.kLineWidth.paddingTop);
    this.drawText(ctx);
    var nWidth = this.dataInfo.blockWidth;
    this.posData = [];
    this.dataInfo.newData.forEach(function (kLine, index) {
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
  //绘制文本
  drawText: function (ctx) {
    var
      cHeight = this.getCanvasHeight(),
      pLeft = this.kLineWidth.paddingLeft,
      pTop = this.kLineWidth.paddingTop,
      pBottom = this.kLineWidth.paddingBottom,
      kHeight = ( cHeight - pTop - this.getKLineBottom()),//画k线区域高度
      vLineCount = this.kLineCount.verticalLineCount - 1,
      hLineCount = this.kLineCount.horizontalLineCount - 1;
    //画价格线
    var height = this.dataInfo.high - this.dataInfo.low,//总高度
      nPrice = Math.ceil(height / vLineCount),//每个价格大概相隔多少数量
      nHeight = kHeight / vLineCount,//每一个文字之间的距离
      high = this.dataInfo.high + nPrice;//初始化高度，方便下边操作
    for (var n = 0; n <= vLineCount; n++) {
      high = high - nPrice;
      var posY = n * nHeight;
      if (n === vLineCount) {//最底部直接显示最低价
        high = this.dataInfo.low;
      }
      ctx.fillText(high + '', -pLeft, posY);
    }

    //画时间线
    var
      length = this.dataInfo.newData.length,
      count = hLineCount > this.dataInfo.count ? this.dataInfo.count : hLineCount,
      nTime = Math.floor(length / count + 1) - 1,//计算每一个距离有多少条数据
      nT = 0;//计算每一个距离相对应的数据index
    if (length === 0) {
      return;
    }
    var times = this.getDateTime(this.dataInfo.newData[0].time),
      timeWidth = ctx.measureText(times).width,
      totalWidth = this.dataInfo.newData.length * this.dataInfo.blockWidth,
      totalCount = Math.floor(totalWidth / timeWidth),
      timeH = cHeight - 10;
    count = totalCount > count ? count : totalCount - 1;
    for (var i = 0; i <= count; i++) {
      nT = nT + nTime;
      if (nT >= length || i === count) {
        nT = length - 1;
      } else if (i === 0) {
        nT = 0;
      }
      var kWidth = (nT + 1) * this.dataInfo.blockWidth - this.dataInfo.blockWidth / 2,
        time = this.getDateTime(this.dataInfo.newData[nT].time),
        txtWidth = ctx.measureText(time).width;

      if (i === count) {//最后一条直接显示
        kWidth = totalWidth - txtWidth;
      } else if (i !== 0) {
        kWidth = kWidth - txtWidth / 2;
      } else {
        kWidth = 0;
      }

      ctx.fillText(time, kWidth, timeH);
      // ctx.fillText(time, kWidth, kHeight + pWidth / 2);
    }
  },
  getDateTime: function (dateString) {
    var date = new Date(dateString.replace(/-/g, "/"));
    if (this.timeType === 1) {
      var minutes = date.getMinutes();
      return date.getHours() + ':' + (minutes === 0 ? '00' : minutes);
    } else {
      return date.getFullYear() + ' ' + (date.getMonth() + 1) + '/' + date.getDate();
    }

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
    var length = this.dataInfo.newData.length;
    if (posIndex >= length) {
      posIndex = length - 1;
    } else if (posIndex < 0) {
      posIndex = 0;
    }
    return this.dataInfo.newData[posIndex];
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
      blockWidth: this.dataInfo.blockWidth,
      currentIndex: this.dataInfo.currentIndex,
      count: this.dataInfo.count,
    }
  },
  //设置当前数据索引
  setDataIndex: function (num) {
    this.dataInfo.currentIndex = num;
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
    this.dataInfo.isLNewData = isNew;
  },
};

function DrawChart(canvasId, options) {
  this.data = [];
  this.newData = [];
  this.ratio = 1;
  this.chart = document.getElementById(canvasId);
  this.chartCtx = this.chart.getContext('2d');
  this.options = {
    width: options.width || this.chart.parentNode.offsetWidth,
    height: options.height || this.chart.parentNode.offsetHeight,
    paddingLeft: options.paddingLeft || 35,
    paddingBottom: options.paddingBottom || 30,
    paddingTop: options.paddingTop || 30,
    timeCount: options.timeCount - 1 || 5,
    vLineCount: options.vLineCount - 1 || 4,//左边垂直价格数量
    chartLineColor: options.chartLineColor || 'rgba(2,100,30,1)',
    chartFillColor: options.chartFillColor || 'rgba(2,100,30,.1)',
    chartColor: options.chartColor || 'black',
  };
  this.createCanvas();
  this.init();
}
DrawChart.prototype = {
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
  resetCanvas: function (width, height) {
    this.options.width = width || this.options.width;
    this.options.height = height || this.options.height;
    this.setCanvas();
    this.setCanvasScale();
    this.drawChart();
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
    this.newData.length = 0;
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
  drawChart: function (data, isSwitch) {
    if (isSwitch) {
      this.data.length = 0;
    }
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
  drawTimeChart: function () {
    var layerHeight = this.layer.height / this.viewRatio;
    this.chartCtx.clearRect(0, 0, this.chart.width, this.chart.height);
    this.chartCtx.save();
    this.layerCtx.clearRect(0, 0, this.layer.width, this.layer.height);
    this.layerCtx.save();
    this.chartCtx.translate(this.options.paddingLeft, this.options.paddingTop);
    this.layerCtx.translate(this.options.paddingLeft, this.options.paddingTop);
    this.chartCtx.lineWidth = .5;
    this.chartCtx.beginPath();
    this.chartCtx.strokeStyle = this.options.chartLineColor;
    this.layerCtx.beginPath();
    this.layerCtx.moveTo(0, layerHeight);
    var startTime = 0;
    for (var n = 0; n < this.minute; n++) {
      if (n >= this.newData.length) {
        break;
      }
      var d = this.newData[n];
      var posX = n * this.blockWidth;
      var posY = (this.max - d.price) * this.ratio;
      if (n === 0) {
        startTime = new Date(d.time.replace(/-/g, "/")).getHours();
        this.chartCtx.moveTo(posX, posY);
      } else {
        this.chartCtx.lineTo(posX, posY);
      }
      this.layerCtx.lineTo(posX, posY);
    }
    this.chartCtx.stroke();
    this.chartCtx.restore();
    this.layerCtx.fillStyle = this.options.chartFillColor;
    this.layerCtx.lineTo(( this.newData.length - 1) * this.blockWidth, layerHeight);
    this.layerCtx.fill();
    this.layerCtx.fillStyle = this.options.chartColor;
    var layerH = layerHeight - this.options.paddingTop;
    //画时间线
    for (var i = 0; i <= this.options.timeCount; i++) {
      var layerPosX = i * 60 * this.blockWidth;
      if (i !== 0) {
        startTime += 1;
      }
      var txtTime = startTime + ':00';
      var txtWidth = this.layerCtx.measureText(txtTime).width;
      if (i === this.options.timeCount) {
        layerPosX = this.layer.width / this.viewRatio - this.options.paddingLeft;
        layerPosX -= txtWidth;
      } else if (i !== 0) {
        layerPosX -= txtWidth / 2;
      }
      this.layerCtx.fillText(txtTime, layerPosX, layerH);
    }
    //画价格文本
    var priceHeight = layerHeight - this.options.paddingTop - this.options.paddingBottom;

    var height = this.max - this.min,//总高度
      nPrice = Math.ceil(height / this.options.vLineCount),//每个价格大概相隔多少数量
      nHeight = priceHeight / this.options.vLineCount,//每一个文字之间的距离
      high = this.max + nPrice;//初始化高度，方便下边操作
    for (var m = 0; m <= this.options.vLineCount; m++) {
      high = high - nPrice;
      var pricePosY = m * nHeight;
      if (m === this.options.vLineCount) {//最底部直接显示最低价
        high = this.min;
      }
      this.layerCtx.fillText(high + '', -this.options.paddingLeft, pricePosY);
    }

    this.layerCtx.restore();
  },
  setCanvasScale: function () {
    this.chartCtx.scale(this.viewRatio, this.viewRatio);
    this.layerCtx.scale(this.viewRatio, this.viewRatio);
    this.tipsCtx.scale(this.viewRatio, this.viewRatio);
  },
  addBindEvent: function () {
    var eventType = baseDraw.getEventType();

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
    if (posIndex < 0 || posIndex > this.newData.length - 1) {
      return;
    }
    var newData = this.newData[posIndex];
    var posY = (this.max - newData.price) * this.ratio + this.options.paddingTop;
    this.tipsCtx.clearRect(0, 0, this.tips.offsetWidth, this.tips.offsetHeight);
    this.tipsCtx.save();
    baseDraw.drawGuideLine.call(this, this.tipsCtx, nowPos.x, posY, this.tips.offsetWidth, this.tips.offsetHeight);
    this.tipsCtx.beginPath();
    // this.tipsCtx.strokeStyle = "#ff8d30";
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