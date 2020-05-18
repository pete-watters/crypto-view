import React, { memo } from 'react';
import { gridRow } from 'styles/_variables.scss';

const LatestTrades = ({ latestTrades }) =>
  latestTrades && latestTrades.map(([type, price, volume, time]) => (
    <div key={`${time}-${volume}`} className={gridRow}>
      <span className={type}>{price}</span>
      <span>{volume}</span>
      <span>{time}</span>
    </div>
  ));

export default memo(LatestTrades);
