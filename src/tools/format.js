// export const convertExpToNumerical = number => {
//   if (number) {
//     const data = String(number).split(/[eE]/);
//     if (data.length == 1) return data[0];
//     var z = '',
//       sign = number < 0 ? '-' : '',
//       str = data[0].replace('.', ''),
//       mag = Number(data[1]) + 1;

//     if (mag < 0) {
//       z = sign + '0.';
//       while (mag++) z += '0';
//       return z + str.replace(/^-/, '');
//     }
//     mag -= str.length;
//     while (mag--) z += '0';
//     return str + z;
//   }
//   return number;
// };

const convertExpToNumerical = exponentialInput => {
  const [leadDigit,decimal,power] = exponentialInput.toString().split(/[eE]|\./);
  const expPower = +power.substring(0,2);
  const positiveExponential = expPower >= 0;
  return positiveExponential ? Number(leadDigit + (decimal.slice(0,+expPower)+'.'+decimal.slice(+expPower))) : 0;
}

export const sanitisePriceData = input => {
  switch(typeof input) {
    case 'number':
      return input.toFixed(1);
    case 'object':
    case 'undefined':
      return '0.0';
    case 'string':
    default:
      return convertExpToNumerical(input).toFixed(1);
  }
}

// export const getCumulativeVolume = (volume, totalVolume) => 
//   (volume*1000 + totalVolume*1000) / 1000;
export const sumFloats = (a, b) => (a*1000 + b*1000) / 1000;
export const subtractFloats = (a, b) => (b*1000 - a*1000) / 1000;
export const sort = (a, b) => {
  // FIXME - change this to accept index
  const a0 = a[0];
  const b0 = b[0];
  return a0 !== b0 ? b0 - a0: 0;

}

export const formatVolume = volume => 
  String(volume).split('.').map(([integral, decimal]) => `${integral}.<em>${decimal}</em>`);

export const sanitiseOrderBook = orderBook => orderBook
.map(([price, volume]) =>
  [(Number(sanitisePriceData(price))).toFixed(1), (Number(volume)).toFixed(3)]
);

export const mapCumulativeVolume = (orderBook, type, cumulativeVolume) => orderBook
.map(([price, volume], index, array) => {
    cumulativeVolume = type === 'bid'
    ? sumFloats(volume, cumulativeVolume)
    : index === 0 //FIXME move this to it's own method
      ? cumulativeVolume
      : subtractFloats(array[index-1][1], cumulativeVolume);
      // WORKING but dirty - I need to subtract the previous volume from the total, not the current
    return [price, String(volume).split('.'), String((Number(cumulativeVolume)).toFixed(3)).split('.')];
});