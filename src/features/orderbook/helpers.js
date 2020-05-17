import { sumFloats, subtractFloats } from 'tools/sum';
import { serializeSourceData } from 'tools/serializer';
import { findMatchingSubstring } from 'tools/matchingString';
import { bid } from 'styles/_variables.scss';
import { DECIMAL_PLACES } from './constants';

// FIXME = clean up this code, all the repeated NUMBER etc.
export const sanitiseOrderBook = orderBook => orderBook.map(([price, volume]) =>
  [
    (Number(serializeSourceData(price))).toFixed(DECIMAL_PLACES.PRICE),
    // (Number(volume)).toFixed(DECIMAL_PLACES.VOLUME),
    volume,
  ]);

const isBid = type => type === bid;
const isFirstElement = index => index === 0;
// FIXME refactor more here to get rid of the -1 - make a const
const calculateAskVolume = (index, array, cumulativeVolume) => (
  isFirstElement(index) ? cumulativeVolume : subtractFloats(array[index - 1][1], cumulativeVolume)
);

const formatPrice = (index, price, previousPrice) =>
  (isFirstElement(index) ? ['', price] : findMatchingSubstring(price, previousPrice));

const formatVolume = volume =>
  String((Number(volume)).toFixed(DECIMAL_PLACES.VOLUME)).split('.');

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
