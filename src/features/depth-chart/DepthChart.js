import React, { memo } from 'react';
import { depthChart } from 'styles/_variables.scss';

const DepthChart = () => (
  <section className={depthChart}>
    <canvas id="depth" width="40rem" height="30rem" />
  </section>
);
export default memo(DepthChart);
