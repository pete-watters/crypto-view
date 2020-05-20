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
    // ["ask", price, volume]
    chart.data.forEach(function(item) {
      chart.labels.push(item[0]);
      chart.values.push(item[1]);
    });
    // chart.data.bids.forEach(function(item) {
    //   chart.labels.push(item[0]);
    //   chart.values.push(item[1]);
    // });
    console.log(chart.data);
    console.log(chart.values);
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
    chart.drawVerticalAxis();
    chart.drawVerticalLabels();
    chart.drawHorizontalAxis();
    chart.drawHorizontalLabels();
    chart.drawHorizontalGuideLines();
    chart.drawVerticalGuideLines();
    chart.drawBars();
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
      const verticalGuidelineEndX =  chart.horizontalMargin + i * chart.horizontalLabelFreq;;
      const verticalGuidelineEndY = chart.verticalMargin;
      chart.context.beginPath();
      chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
      chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
      chart.context.stroke();
    }
  };

  CryptoChart.prototype.drawBars = function() {
    const chart = this;
    const color = 'red';
    // const fillOpacity = 0.3;
    const fillColor = color;
    const borderColor = 'green';
    // console.log(color);

    for (let i = 0; i <= chart.itemsNum; i++ ) {
          chart.context.beginPath();
          const barX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / chart.axisRatio;
          const barY = chart.height - chart.verticalMargin;
          const barWidth = chart.horizontalLabelFreq -2 * chart.horizontalLabelFreq / chart.axisRatio;
          const barHeight = -1 * chart.verticalAxisWidth * chart.values[i] / chart.maxValue;

          chart.context.fillStyle = fillColor;
          chart.context.strokeStyle = borderColor;
          chart.context.rect(barX, barY, barWidth, barHeight);
          chart.context.stroke();
          chart.context.fill();
        }
  };
