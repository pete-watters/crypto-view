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
    chart.lineDash = [chart.fontRatio, chart.fontRatio, chart.fontRatio];
    chart.askRgbColor = '198, 6, 6';
    chart.bidRgbColor = '0, 185, 9';
    chart.fillOpacity = 0.1;
    chart.lineOpacity = 1;
  }

  performPreOperations() {
    const chart = this;
    chart.createCanvas();
    chart.handleData();
    chart.prepareData();
    chart.handleMouseEvents();
  }

  createCanvas() {
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

  handleData() {
    const chart = this;
    chart.labels = [];
    chart.values = [];
    chart.data.asks.forEach(item => {
      chart.labels.push(item[0]);
      chart.values.push(item[1]);
    });
    chart.data.bids.forEach(item => {
      chart.labels.push(item[0]);
      chart.values.push(item[1]);
    });
  }

  prepareData() {
    const chart = this;
    chart.itemsNum = chart.values.length;
    if (chart.itemsNum > 0) {
      const asksTotal = chart.data[CHART_CONFIG.ASKS][0][2];
      const bidsLength = chart.data[CHART_CONFIG.BIDS].length;
      const bidsTotal = chart.data[CHART_CONFIG.BIDS][bidsLength - 1][2];
      chart.maxValue = Math.max(asksTotal, bidsTotal);
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

    for (let i = 0; i < chart.data[CHART_CONFIG.BIDS].length; i += 1) {
      if (isEven(i)) {
        const horizontalLabelX = chart.width / 2 - i * chart.itemsNum;
        const horizontalLabelY = chart.height - chart.axisRatio;
        const label = chart.data[CHART_CONFIG.BIDS][i][0];
        chart.context.fillText(label, horizontalLabelX, horizontalLabelY);
      }
    }
    for (let i = 0; i < chart.data[CHART_CONFIG.ASKS].length; i += 1) {
      if (isEven(i)) {
        const horizontalLabelX = chart.width / 2 + i * chart.itemsNum;
        const horizontalLabelY = chart.height - chart.axisRatio;
        const index = chart.data[CHART_CONFIG.ASKS].length - i - 1;
        const label = chart.data[CHART_CONFIG.ASKS][index][0];
        chart.context.fillText(label, horizontalLabelX, horizontalLabelY);
      }
    }
  }

  drawVerticalGuideLines() {
    const chart = this;
    chart.context.strokeStyle = chart.guidelineColor;
    chart.context.lineWidth = chart.guidelineWidth;
    chart.context.setLineDash(chart.lineDash);
    for (let i = 0; i <= chart.itemsNum; i += 1) {
      const verticalGuidelineStartX = chart.width - i * chart.itemsNum;
      const verticalGuidelineStartY = 0;
      const verticalGuidelineEndX = chart.width - i * chart.itemsNum;
      const verticalGuidelineEndY = chart.height;
      chart.context.beginPath();
      chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
      chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
      chart.context.stroke();
    }
  }

  drawDepthChart(orderType) {
    const chart = this;
    const scaleWidth = chart.width / 2 / (chart.itemsNum / 2);
    chart.context.beginPath();
    chart.context.moveTo(chart.width / 2, chart.height);

    if (orderType === bid) {
      chart.drawBids(scaleWidth);
      chart.context.lineTo(0, 0);
      chart.context.lineTo(0, chart.height);
    } else if (orderType === ask) {
      chart.drawAsks(scaleWidth);
      chart.context.lineTo(chart.width, 0);
      chart.context.lineTo(chart.width, chart.height);
    }

    chart.context.lineTo(chart.width / 2, chart.height);
    chart.context.fill();
    chart.context.closePath();
  }

  drawAsks(scaleWidth) {
    const chart = this;
    for (let i = 0; i < chart.data[CHART_CONFIG.ASKS].length; i += 1) {
      const index = chart.data[CHART_CONFIG.ASKS].length - i - 1;
      const totalAsks = chart.data[CHART_CONFIG.ASKS][index][2];
      chart.context.fillStyle = `rgb(${chart.askRgbColor}, ${chart.fillOpacity})`;
      chart.context.strokeStyle = `rgb(${chart.askRgbColor}, ${chart.lineOpacity})`;
      chart.context.stroke();
      const x = chart.width / 2 + i * scaleWidth;
      const y = chart.height - totalAsks / chart.maxValue * chart.height;
      chart.context.lineTo(x, y);
    }
  }

  drawBids(scaleWidth) {
    const chart = this;
    for (let i = 0; i < chart.data[CHART_CONFIG.BIDS].length; i += 1) {
      const totalBids = chart.data[CHART_CONFIG.BIDS][i][2];
      chart.context.fillStyle = `rgb(${chart.bidRgbColor}, ${chart.fillOpacity})`;
      chart.context.strokeStyle = `rgb(${chart.bidRgbColor}, ${chart.lineOpacity})`;
      chart.context.stroke();
      const x = chart.width / 2 - i * scaleWidth;
      const y = chart.height - totalBids / chart.maxValue * chart.height;
      chart.context.lineTo(x, y);
    }
  }

  handleMouseEvents() {
    const chart = this;
    // This is not an accurate price its a best guess of the value closest to the mouse
    const guessPrice = mousePosX => {
      const pixelsPerElement = chart.width / chart.itemsNum;
      const approxPriceArrayPosition = chart.itemsNum - (mousePosX / pixelsPerElement).toFixed(0);
      return chart.labels[approxPriceArrayPosition];
    };

    chart.canvas.addEventListener('mouseover', event => {
      const mousePos = chart.getMousePosition(event);
      const message = guessPrice(mousePos.x);
      document.getElementById(CHART_CONFIG.INFO_ID).innerHTML = message || '';
    }, false);

    chart.canvas.addEventListener('mouseout', () => {
      document.getElementById(CHART_CONFIG.INFO_ID).innerHTML = '';
    }, false);
  }

  getMousePosition({ clientX, clientY }) {
    const chart = this;
    const { left, top } = chart.canvas.getBoundingClientRect();
    return {
      x: clientX - left,
      y: clientY - top,
    };
  }
}
