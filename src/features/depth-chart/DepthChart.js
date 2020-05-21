import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { depthChart } from 'styles/main.scss';
import { CryptoChart } from './chart';
import { CHART_CONFIG } from './constants';

class DepthChart extends Component {
  componentDidMount() {
    this.drawDepthChart();
  }
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.drawDepthChart();
    }
  }
  drawDepthChart() {
    const { data } = this.props;
    new CryptoChart(CHART_CONFIG.ID, CHART_CONFIG.WIDTH, CHART_CONFIG.HEIGHT, data);
  }

  render() {
    return (
      <section className={depthChart}>
        <div id={CHART_CONFIG.ID} />
        <div id={CHART_CONFIG.INFO_ID} />
      </section>);
  }
}

DepthChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DepthChart;
