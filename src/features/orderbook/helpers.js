import { sumArray, sumFloats, subtractFloats } from 'tools/sum';
import { sortByColumn } from 'tools/sort';
import { serializeSourceData } from 'tools/serializer';
import { findMatchingSubstring } from 'tools/match';
import { ask, bid } from 'styles/_variables.scss';
import { DECIMAL_PLACES } from './constants';

const isBid = type => type === bid;
const isFirstElement = index => index === 0;

const calculateAskVolume = (index, array, volume) =>
  (isFirstElement(index) ? volume : subtractFloats(array[index - 1][1], volume));

const serializePrice = price =>
  Number(serializeSourceData(price)).toFixed(DECIMAL_PLACES.PRICE);

const getPreviousPrice = (index, array) => (isFirstElement(index) ? '' : array[index - 1][0]);

const sanitiseOrderBook = orderBook =>
  sortByColumn(orderBook.map(([price, volume]) => [serializePrice(price), volume]), 0);

const formatPrice = (index, price, previousPrice) =>
  findMatchingSubstring(price, previousPrice);

const formatVolume = volume =>
  String(Number(volume).toFixed(DECIMAL_PLACES.VOLUME)).split('.');

const computeVolume = (orderBook, type, cumulativeVolume) => {
  let totalVolume = cumulativeVolume;
  return orderBook.map(([price, volume], index, array) => {
    if (isBid(type)) {
      totalVolume = sumFloats(volume, totalVolume);
    } else {
      totalVolume = calculateAskVolume(index, array, totalVolume);
    }
    return [
      formatPrice(index, price, getPreviousPrice(index, array)),
      formatVolume(volume),
      formatVolume(totalVolume),
    ];
  });
};

export const serializeOrderBook = ({ asks, bids }) => ({
  asks: computeVolume(sanitiseOrderBook(asks), ask, sumArray(asks, 1)),
  bids: computeVolume(sanitiseOrderBook(bids), bid, 0),
});
