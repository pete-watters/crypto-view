import { exponentialToNumerical } from 'tools/exponentialToNumerical';

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
      return exponentialToNumerical(input).toFixed(1);
  }
};
