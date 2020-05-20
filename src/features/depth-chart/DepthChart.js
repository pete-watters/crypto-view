import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { depthChart } from 'styles/_variables.scss';
import { CryptoChart } from './chart';
import { CHART_CONFIG } from './constants';

class DepthChart extends Component {
  componentDidMount() {
    const { data } = this.props;
    const chartData = data;
    // const chartData = data.asks;
    // const chartData = [[10, 5], [20,4]];
    new CryptoChart(CHART_CONFIG.ID, CHART_CONFIG.WIDTH, CHART_CONFIG.HEIGHT, chartData.asks);
    // const canvas = this.refs.canvas;
    // FIXME this only renders once, needs to do it on each recieving on new props
  }
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      new CryptoChart(CHART_CONFIG.ID, CHART_CONFIG.WIDTH, CHART_CONFIG.HEIGHT, data.asks);
    }
  }

  render() {
    // console.log(this.props.data);
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
