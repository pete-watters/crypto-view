import { convertExpToNumerical } from './exponentialToNumerical';

// rename this as a generic util
export const serializeSourceData = input => {
  switch (typeof input) {
    case 'number':
      return input.toFixed(1);
    case 'object':
    case 'undefined':
      return '0.0';
    case 'string':
    default:
      return convertExpToNumerical(input).toFixed(1);
  }
};
