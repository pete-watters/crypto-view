import { swirl, roboto, white, bid, ask } from 'styles/main.scss';
import { CHART_CONFIG } from './constants';

export class CryptoChart {
    constructor(id, width, height, data) {
      const chart = this;
      chart.configureChart(id, width, height, data);
  }
  configureChart(id, width, height, data) {
    const chart = this;
    chart.configureCanvas(id, width, height, data);
    chart.configureChartParams();
    chart.performPreOperations();
    chart.drawChart();
  }

  configureCanvas(id, width, height, data) {
    const chart = this;
    chart.id = id;
    chart.width = width;
    chart.height = height;
    chart.data = data;
  }

  configureChartParams() {
    const chart = this;
    chart.axisRatio = 10;
    chart.fontRatio = 3;
    chart.fontFamily = roboto;
    chart.fontColor = white;
    chart.guidelineColor = swirl;
    chart.guidelineWidth = 0.2;
    chart.lineDash = [chart.fontRatio,chart.fontRatio,chart.fontRatio];
  }

  performPreOperations () {
    const chart = this;
    chart.createCanvas();
    chart.handleData();
    chart.prepareData();
    chart.handleMouseEvents();
  }

  createCanvas () {
    const chart = this;
    const canvas = document.createElement('canvas');
    canvas.id = chart.id;
    canvas.width = chart.width;
    canvas.height = chart.height;
    document.getElementById(chart.id).innerHTML = '';
    document.getElementById(chart.id).appendChild(canvas);
    chart.canvas = canvas;
    chart.context = canvas.getContext('2d');
  }

  handleData () {
    const chart = this;
    chart.labels = [];
    chart.values = [];
    chart.data.asks.forEach(item => {
      chart.labels.push(item[0]);
      chart.values.push(item[1]);
    });
    chart.data.bids.forEach(item =>{
      chart.labels.push(item[0]);
      chart.values.push(item[1]);
    });
  }

  prepareData() {
    const chart = this;
    chart.itemsNum = chart.values.length;
    if (chart.itemsNum > 0) {
      chart.maxValue = Math.max( chart.data[CHART_CONFIG.ASKS][0][2],  chart.data[CHART_CONFIG.BIDS][chart.data[CHART_CONFIG.BIDS].length-1][2]);
     }
  }

  drawChart() {
    const chart = this;
    chart.drawHorizontalLabels();
    chart.drawVerticalGuideLines();
    if (chart.itemsNum > 0) {
      chart.drawDepthChart(bid);
      chart.drawDepthChart(ask);
    }
  }

  drawHorizontalLabels() {
    const chart = this;
    const isEven = index => index & 1;
    chart.context.textAlign = 'center';
    chart.context.textBaseline = 'top';
    chart.context.fillStyle = chart.fontColor;

    for (const i in chart.data[CHART_CONFIG.BIDS]) {
      if (!isEven(i)) continue;
      const horizontalLabelX = chart.width/2 - i * chart.itemsNum;
      const horizontalLabelY = chart.height - chart.axisRatio;
      chart.context.fillText(chart.data[CHART_CONFIG.BIDS][i][0], horizontalLabelX, horizontalLabelY);
    }

    for (const i in chart.data[CHART_CONFIG.ASKS]) {
      if (!isEven(i)) continue;
      const horizontalLabelX = chart.width/2 + i * chart.itemsNum;
      const horizontalLabelY = chart.height - chart.axisRatio;
      var index = chart.data[CHART_CONFIG.ASKS].length - i -1;
      chart.context.fillText(chart.data[CHART_CONFIG.ASKS][index][0], horizontalLabelX, horizontalLabelY);
    }
  }

  drawVerticalGuideLines() {
    const chart = this;
    chart.context.strokeStyle = chart.guidelineColor;
    chart.context.lineWidth = chart.guidelineWidth;
    chart.context.setLineDash(chart.lineDash);
    for (let i = 0; i <= chart.itemsNum; i++ ) {
      const verticalGuidelineStartX = chart.width - i * chart.itemsNum;
      const verticalGuidelineStartY = 0;
      const verticalGuidelineEndX =  chart.width - i * chart.itemsNum;
      const verticalGuidelineEndY = chart.height;
      chart.context.beginPath();
      chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
      chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
      chart.context.stroke();
    }
  }

  drawDepthChart(orderType) {
    const chart = this;
    const opaque = 0.1;
    const getColour = (type, opacity) =>  type === bid ? `rgb(0, 185, 9, ${opacity})`: `rgb(198, 6, 6, ${opacity})`;

    const scaleWidth = chart.width / 2 / (chart.itemsNum/2);
    const typePosition = 3;
    chart.context.beginPath();
    chart.context.moveTo(chart.width/2, chart.height);

    if (orderType === bid) {
      for (let i in chart.data[CHART_CONFIG.BIDS]) {
        chart.context.fillStyle = getColour(chart.data[CHART_CONFIG.BIDS][i][typePosition], opaque);
        chart.context.strokeStyle = getColour(chart.data[CHART_CONFIG.BIDS][i][typePosition], 1);
        chart.context.stroke();
        const x = chart.width/2 - i * scaleWidth;
        const y = chart.height - chart.data[CHART_CONFIG.BIDS][i][2]/ chart.maxValue * chart.height;
        chart.context.lineTo(x, y);
      }
    }
    else if (orderType === ask) {
      for (let i in chart.data[CHART_CONFIG.ASKS]) {
        chart.context.fillStyle = getColour(chart.data[CHART_CONFIG.ASKS][i][typePosition], opaque);
        chart.context.strokeStyle = getColour(chart.data[CHART_CONFIG.ASKS][i][typePosition], 1);
        chart.context.stroke();
        const index =chart.data[CHART_CONFIG.ASKS].length - i -1;
        const x = chart.width/2 + i * scaleWidth;
        const y = chart.height - chart.data[CHART_CONFIG.ASKS][index][2]/chart.maxValue * chart.height;
        chart.context.lineTo(x,y);
      }
    }

    chart.context.lineTo(orderType === bid ? 0 : chart.width, 0);
    chart.context.lineTo(orderType === bid ? 0 : chart.width, chart.height);
    chart.context.lineTo(chart.width/2, chart.height);
    chart.context.fill();
    chart.context.closePath();
  }

  handleMouseEvents() {
    const chart = this;
    // This is not an accurate price
    // its a best guess of hte value closest to the mouse
    const guessPrice = mousePosX => {
      const pixelsPerElement = chart.width / chart.itemsNum;
      const approxPriceArrayPosition = chart.itemsNum - (mousePosX / pixelsPerElement).toFixed(0);
      return chart.labels[approxPriceArrayPosition];
    };

    chart.canvas.addEventListener('mouseover', event => {
      var mousePos = chart.getMousePosition(event);
      const message = guessPrice(mousePos.x);
      document.getElementById(CHART_CONFIG.INFO_ID).innerHTML = message ? message : '';
    }, false);

    chart.canvas.addEventListener('mouseout', () => {
      document.getElementById(CHART_CONFIG.INFO_ID).innerHTML = '';
    }, false);
  }
  getMousePosition({clientX, clientY}) {
    const chart = this;
    const { left, top } = chart.canvas.getBoundingClientRect();
    return {
      x: clientX - left,
      y: clientY - top,
    };
  }
}