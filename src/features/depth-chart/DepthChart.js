import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { depthChart } from 'styles/_variables.scss';
import { CryptoChart } from './chart';
import { CHART_CONFIG } from './constants';

class DepthChart extends Component {
  componentDidMount() {
    const { data } = this.props;
    new CryptoChart(CHART_CONFIG.ID, CHART_CONFIG.WIDTH, CHART_CONFIG.HEIGHT, data.asks);
  }
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      new CryptoChart(CHART_CONFIG.ID, CHART_CONFIG.WIDTH, CHART_CONFIG.HEIGHT, data.asks);
    }
  }

  render() {
    return (
      <section className={depthChart}>
        <div id={CHART_CONFIG.ID}>
          This will be the depth chart
        </div>
      </section>);
  }
}

DepthChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DepthChart;
