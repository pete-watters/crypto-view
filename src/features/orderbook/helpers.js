import { sumFloats, subtractFloats } from 'tools/sum';
import { sortByColumn } from 'tools/sort';
import { serializeSourceData } from 'tools/serializer';
import { findMatchingSubstring } from 'tools/match';
import { ask, bid } from 'styles/_variables.scss';
import { DECIMAL_PLACES } from './constants';

export const serializeOrderBook = data => {
  const orderBook = data;
  const cleanAsks = sanitiseOrderBook(orderBook.asks);
  const cleanBids = sanitiseOrderBook(orderBook.bids);
  const sortedAsks = sortByColumn(cleanAsks, 0);
  const sortedBids = sortByColumn(cleanBids, 0);
  // Try figure out an optimal algo here to avid the double mapping
  const totalVolumeAsks = cleanAsks.map(item => item[1]).reduce((a, b) => sumFloats(a, b));

  return {
      asks: mapCumulativeVolume(sortedAsks, ask, totalVolumeAsks),
      bids: mapCumulativeVolume(sortedBids, bid, 0),
    };
};

// FIXME = clean up this code, all the repeated NUMBER etc.
export const sanitiseOrderBook = orderBook =>
  orderBook.map(([price, volume]) => [
    Number(serializeSourceData(price)).toFixed(DECIMAL_PLACES.PRICE),
    // (Number(volume)).toFixed(DECIMAL_PLACES.VOLUME),
    volume,
  ]);

const isBid = type => type === bid;
const isFirstElement = index => index === 0;
// FIXME refactor more here to get rid of the -1 - make a const
const calculateAskVolume = (index, array, cumulativeVolume) =>
  isFirstElement(index) ? cumulativeVolume : subtractFloats(array[index - 1][1], cumulativeVolume);

const formatPrice = (index, price, previousPrice) =>
  isFirstElement(index) ? ['', price] : findMatchingSubstring(price, previousPrice);

const formatVolume = volume => String(Number(volume).toFixed(DECIMAL_PLACES.VOLUME)).split('.');

export const mapCumulativeVolume = (orderBook, type, cumulativeVolume) => {
  let totalVolume = cumulativeVolume;
  return orderBook.map(([price, volume], index, array) => {
    const firstElement = isFirstElement(index);
    // FIXME Assignment to function parameter 'cumulativeVolume'  no-param-reassign
    totalVolume = isBid(type)
      ? sumFloats(volume, totalVolume)
      : calculateAskVolume(index, array, totalVolume);
    const previousPrice = firstElement ? '' : array[index - 1][0];
    // FIXME big work needed here to make this clearer
    return [
      formatPrice(index, price, previousPrice),
      formatVolume(volume),
      formatVolume(totalVolume),
    ];
  });
};
