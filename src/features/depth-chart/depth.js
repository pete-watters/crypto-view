const ONE_HUNDRED = 100;
const TEN = 10;

export function CryptoChart(id, width, height, data) {
    const chart = this;
    chart.configureChart(id, width, height, data);
    // console.log(chart);
  }

  CryptoChart.prototype.configureChart = function(id, width, height, data) {
    const chart = this;
    chart.configureCanvas(id, width, height, data);
    chart.configureChartParams();
    chart.performPreOperations();
    chart.drawChart();
  };

  CryptoChart.prototype.configureCanvas = function(id, width, height, data) {
    const chart = this;
    chart.id = id;
    chart.width = width;
    chart.height = height;
    chart.data = data;
  };

  CryptoChart.prototype.configureChartParams = function() {
    const chart = this;
    chart.axisRatio = 10;
    chart.verticalMargin = (chart.height * chart.axisRatio) / ONE_HUNDRED;
    chart.horizontalMargin = (chart.width * chart.axisRatio) / ONE_HUNDRED;
    chart.axisColor = '#e0e0e0';
    chart.axisWidth = 0.75;
    chart.fontRatio = 3;
    chart.fontFamily = 'times';
    chart.fontStyle = 'normal';
    chart.fontWeight = '300';
    chart.fontColor = '#e0e0e0';
    chart.verticalFontSize = (chart.height * chart.fontRatio) / ONE_HUNDRED;
    chart.horizontalFontSize = (chart.width * chart.fontRatio) / ONE_HUNDRED;
    chart.guidelineColor = '#e5e5e5';
    chart.guidelineWidth = 0.5;
  };

  CryptoChart.prototype.performPreOperations = function () {
    const chart = this;
    chart.createCanvas();
    chart.handleData();
    chart.prepareData();
  };

  CryptoChart.prototype.createCanvas = function () {
    const chart = this;
    const canvas = document.createElement('canvas');
    canvas.id = chart.id;
    canvas.width = chart.width;
    canvas.height = chart.height;
    document.getElementById(chart.id).innerHTML = '';
    document.getElementById(chart.id).appendChild(canvas);
    chart.canvas = canvas;
    chart.context = canvas.getContext('2d');
  };

  CryptoChart.prototype.handleData = function () {
    const chart = this;
    chart.labels = [];
    chart.values = [];

    // could do with one big array here:
    // ["asks", price, volume]
    chart.data.asks.forEach(function(item) {
      chart.labels.push(item[0]);
      chart.values.push(item[1]);
    });

    // chart.data.bidss.forEach(function(item) {
    //   chart.labels.push(item[0]);
    //   chart.values.push(item[1]);
    // });
    // console.log(chart.data);
    // console.log(chart.values);
  };

  CryptoChart.prototype.prepareData = function() {
    const chart = this;
    chart.itemsNum = chart.data.length;
    chart.maxValue = Math.max.apply(null, chart.values);
    chart.minValue = Math.min.apply(null, chart.values);
    chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin;
    // chart.horizontalAxisWidth = chart.height - 2 * chart.verticalMargin;
    // TODO rewind here
    chart.horizontalAxisWidth = chart.height - 2 * chart.horizontalMargin;
    // TODO remove these ceils and use my preformatted data
    chart.verticalUpperBound = Math.ceil(chart.maxValue / TEN) * TEN;
    chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
    chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum;
  };

  CryptoChart.prototype.drawChart = function() {
    const chart = this;
    // chart.drawVerticalAxis();
    // chart.drawVerticalLabels();
    // chart.drawHorizontalAxis();
    // chart.drawHorizontalLabels();
    // chart.drawHorizontalGuideLines();
    // chart.drawVerticalGuideLines();
    // chart.drawBars();
    chart.drawDepthChart();
  };

  CryptoChart.prototype.drawVerticalAxis = function() {
    const chart = this;
    chart.context.beginPath();
    chart.context.strokeStyle = chart.axisColor;
    chart.context.lineWidth = chart.axisWidth;
    chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
    chart.context.lineTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.stroke();
  };

  CryptoChart.prototype.drawHorizontalAxis = function() {
    const chart = this;
    chart.context.beginPath();
    chart.context.strokeStyle = chart.axisColor;
    chart.context.lineWidth = chart.axisWidth;
    chart.context.moveTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.lineTo(chart.width - chart.horizontalMargin, chart.height - chart.verticalMargin);
    chart.context.stroke();
  };

  CryptoChart.prototype.drawVerticalLabels = function() {
    const chart = this;
    const labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px' + chart.fontFamily;
    chart.context.font = labelFont;
    chart.context.textAlign = 'right';
    chart.context.fillStyle = chart.fontColor;

    const scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

    for (let i = 0; i <= chart.itemsNum; i++ ) {
      const labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
      const verticalLabelX = chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio;
      const verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;
      chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
    }
  };

  CryptoChart.prototype.drawHorizontalLabels = function() {
    const chart = this;
    const labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px' + chart.fontFamily;
    chart.context.textAlign = 'center';
    chart.context.textBaseline = 'top';
    chart.context.font = labelFont;
    chart.context.fillStyle = chart.fontColor;

    for (let i = 0; i <= chart.itemsNum-1; i++ ) {
      const horizontalLabelX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / 2;
      const horizontalLabelY = chart.height - chart.verticalMargin + chart.verticalMargin / chart.axisRatio;
      chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);
    }
  };

  CryptoChart.prototype.drawHorizontalGuideLines = function() {
    const chart = this;
    chart.context.strokeStyle = chart.guidelineColor;
    chart.context.lineWidth = chart.guidelineWidth;

    const scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

    for (let i = 0; i <= chart.itemsNum; i++ ) {
      const horizontalGuidelineStartX = chart.horizontalMargin;
      const horizontalGuidelineStartY = chart.verticalMargin + i * scaledVerticalLabelFreq;
      const horizontalGuidelineEndX = chart.horizontalMargin + chart.horizontalAxisWidth;
      const horizontalGuidelineEndY = chart.verticalMargin + i * scaledVerticalLabelFreq;

      chart.context.beginPath();
      chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
      chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
      chart.context.stroke();
    }
  };

  CryptoChart.prototype.drawVerticalGuideLines = function() {
    const chart = this;
    chart.context.strokeStyle = chart.guidelineColor;
    chart.context.lineWidth = chart.guidelineWidth;
    for (let i = 0; i <= chart.itemsNum; i++ ) {
      const verticalGuidelineStartX = chart.horizontalMargin + i * chart.horizontalLabelFreq;
      const verticalGuidelineStartY = chart.height - chart.verticalMargin;
      const verticalGuidelineEndX =  chart.horizontalMargin + i * chart.horizontalLabelFreq;
      const verticalGuidelineEndY = chart.verticalMargin;
      chart.context.beginPath();
      chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
      chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
      chart.context.stroke();
    }
  };

  // CryptoChart.prototype.drawBars = function() {
  //   const chart = this;
  //   const color = 'red';
  //   // const fillOpacity = 0.3;
  //   const fillColor = color;
  //   const borderColor = 'green';

  //   for (let i = 0; i <= chart.itemsNum; i++ ) {
  //         chart.context.beginPath();
  //         const barX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / chart.axisRatio;
  //         const barY = chart.height - chart.verticalMargin;
  //         const barWidth = chart.horizontalLabelFreq -2 * chart.horizontalLabelFreq / chart.axisRatio;
  //         const barHeight = -1 * chart.verticalAxisWidth * chart.values[i] / chart.maxValue;
  //         chart.context.fillStyle = fillColor;
  //         chart.context.strokeStyle = borderColor;
  //         chart.context.rect(barX, barY, barWidth, barHeight);
  //         chart.context.stroke();
  //         chart.context.fill();
  //       }
  // };

  CryptoChart.prototype.drawDepthChart = function() {
    const chart = this;
    const color = 'red';
    // const fillOpacity = 0.3;
    const fillColor = color;
    const borderColor = 'green';
    chart.context.fillStyle = '#9dd';
    // var gap = 10;
    // var canvas=document.getElementById('depth');
    // var width = canvas.getAttribute('width');
    // var height = canvas.getAttribute('height');
    // var maxAmount = Math.max( chart.data['bids'][0]['total'],  chart.data['asks'][chart.data['asks'].length-1]['total']);
    // var scaleH = chart.maxValue / chart.height;
    var scaleW = chart.width / 2 / chart.data['bids'].length;

    // var context=canvas.getContext('2d');

    for (const i in chart.data['asks']) {
      let total = 0;
      for (let n=0; n<= i; n++) {
          total += chart.data['asks'][n][1];
      }

      chart.data['asks'][i]['total'] = total;
    }

    for (const i in chart.data['bids']) {
      let total = 0;
      for (let n=i; n< chart.data['bids'].length; n++) {
          total += chart.data['bids'][n][1];
      }

      chart.data['bids'][i]['total'] = total;
    }

    chart.context.beginPath();
    var x = 0;
    var y = 0;
    chart.context.moveTo(chart.horizontalAxisWidth / 2-chart.horizontalLabelFreq, chart.verticalAxisWidth);
    chart.context.fillStyle = 'green';

      for (const i in chart.data['bids']) {
        x = chart.width/2 - i * scaleW- chart.axisRatio;
        y = chart.height - chart.data['bids'][i]['total']/chart.maxValue * chart.height;
        chart.context.lineTo(x, y);
      }

      chart.context.lineTo(0, y);
      chart.context.lineTo(0, chart.height);
      chart.context.lineTo(chart.width/2- chart.axisRatio,chart.height);
      chart.context.fill();
      chart.context.closePath();

      chart.context.beginPath();
      chart.context.fillStyle = 'red';
      chart.context.moveTo(chart.width/2+ chart.axisRatio, chart.height);

      for (const i in chart.data['asks']) {
        var index = chart.data['asks'].length - i -1;
        x = chart.width/2 + i * scaleW +  chart.axisRatio;
        y = chart.height - chart.data['asks'][index]['total']/chart.maxValue * chart.height;
        chart.context.lineTo(x,y);
      }

      chart.context.lineTo(chart.width+ chart.axisRatio, y);
      chart.context.lineTo(chart.width+ chart.axisRatio, chart.height);
      chart.context.lineTo(chart.width/2+ chart.axisRatio, chart.height);
      chart.context.fill();
      chart.context.closePath();
      // Axes
      // var contextX = document.getElementById('x').getContext('2d');
      // var contextY = document.getElementById('y').getContext('2d');
      // contextX.fillStyle = '#ccc';
      // contextY.fillStyle = '#ccc';

      // for (const i in chart.data['bids']) {
      //   if (i%3) continue;
      //   x = chart.width/2 - i * scaleW-30;
      //   y = 12;
      //   contextX.fillText(chart.data['bids'][i][0], x, y);
      // }

      // for (const i in chart.data['asks']) {
      //   if (i%3) continue;
      //   x = chart.width/2 + i * scaleW;
      //   y = 12;
      //   var index = chart.data['asks'].length - i -1;
      //   contextX.fillText(chart.data['asks'][index][0], x, y);
      // }

      // var seg = maxAmount/5;
      // for (i=1; i<6; i++) {
      //   x = 12;
      //   y = chart.height - seg*i/maxAmount * height;
      //   chart.contextY.fillText(seg*i > 1000 ? (seg*i/1000+'K'): seg*i, x, y);
      // }

    // for (let i = 0; i <= chart.itemsNum; i++ ) {
    //       chart.context.beginPath();
    //       const barX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / chart.axisRatio;
    //       const barY = chart.height - chart.verticalMargin;
    //       const barWidth = chart.horizontalLabelFreq -2 * chart.horizontalLabelFreq / chart.axisRatio;
    //       const barHeight = -1 * chart.verticalAxisWidth * chart.values[i] / chart.maxValue;
    //       chart.context.fillStyle = fillColor;
    //       chart.context.strokeStyle = borderColor;
    //       chart.context.rect(barX, barY, barWidth, barHeight);
    //       chart.context.stroke();
    //       chart.context.fill();
    //     }
  };
