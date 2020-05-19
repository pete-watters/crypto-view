import { sumArray, sumFloats, subtractFloats } from 'tools/sum';
import { sortByColumn } from 'tools/sort';
import { serializeSourceData } from 'tools/serializer';
import { findMatchingSubstring } from 'tools/match';
import { ask, bid } from 'styles/_variables.scss';
import { DECIMAL_PLACES } from './constants';

const isBid = type => type === bid;

const isFirstElement = index => index === 0;

const calculateAskVolume = (index, array, amount) =>
  (isFirstElement(index) ? amount : subtractFloats(array[index - 1][1], amount));

const serializePrice = price =>
  Number(serializeSourceData(price)).toFixed(DECIMAL_PLACES.PRICE);

const getPreviousPrice = (index, array) => (isFirstElement(index) ? '' : array[index - 1][0]);

const sanitiseOrderBook = orderBook =>
  sortByColumn(orderBook.map(([price, amount]) => [serializePrice(price), amount]), 0);

const formatPrice = (index, price, previousPrice) =>
  findMatchingSubstring(price, previousPrice);

const formatVolume = amount =>
  String(Number(amount).toFixed(DECIMAL_PLACES.AMOUNT)).split('.');

const calculateVolume = type => (index, array, amount, cumulativeAmount) =>
  isBid(type)
    ? sumFloats(amount, cumulativeAmount)
    : calculateAskVolume(index, array, cumulativeAmount);

const computeVolume = (orderBook, type, cumulativeAmount) =>
  orderBook.map(([price, amount], index, array) => [
      formatPrice(index, price, getPreviousPrice(index, array)),
      formatVolume(amount),
      formatVolume(calculateVolume(type)(index, array, amount, cumulativeAmount)),
    ]);

export const serializeOrderBook = ({ asks, bids }) => ({
  asks: computeVolume(sanitiseOrderBook(asks), ask, sumArray(asks, 1)),
  bids: computeVolume(sanitiseOrderBook(bids), bid, 0),
});
