// TODO 
// need to revisit the data manipulation and remove ineffeciencies
// have nearly all the logic in place, onlt thing is to show fair market price
// need to remove the inefficient looping though, double map etc. 

const convertExpToNumerical = exponentialInput => {
  const [leadDigit,decimal,power] = exponentialInput.toString().split(/[eE]|\./);
  const expPower = +power.substring(0,2);
  const positiveExponential = expPower >= 0;
  return positiveExponential ? Number(leadDigit + (decimal.slice(0,+expPower)+'.'+decimal.slice(+expPower))) : 0;
}
// rename this as a generic util
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

export const sumFloats = (a, b) => (a*1000 + b*1000) / 1000;
export const subtractFloats = (a, b) => (b*1000 - a*1000) / 1000;

// Add a test for this
export const sortByColumn = (array, columnIndex) => 
// Split this out to a sort function
  array.sort((a, b) => {
    a = a[columnIndex]
    b = b[columnIndex]
    return (a === b) ? 0 : (a > b) ? -1 : 1
  });

export const sanitiseOrderBook = orderBook => orderBook.map(([price, volume]) =>
  [(Number(sanitisePriceData(price))).toFixed(1), (Number(volume)).toFixed(3)]
);

export const mapCumulativeVolume = (orderBook, type, cumulativeVolume) => orderBook
.map(([price, volume], index, array) => {
    cumulativeVolume = type === 'bid'
    ? sumFloats(volume, cumulativeVolume)
    : index === 0 //FIXME move this to it's own method
      ? cumulativeVolume
      : subtractFloats(array[index-1][1], cumulativeVolume);
  
  // WORKING but dirty      
  const formattedPrice = index > 0 
    ? findMatchingSubstring(price,  array[index-1][0])
    : ["", price];
    return [formattedPrice, String(volume).split('.'), String((Number(cumulativeVolume)).toFixed(3)).split('.')];
});

const findMatchingSubstring = (price, previousPrice) => {
  let matched_digits = "";
  const offset = price.length - previousPrice.length;
  
  for(let i = 0; i < price.length; i++){
    if(price[i+offset] === previousPrice[i]){
      matched_digits += previousPrice[i];
    } else{
      break;
    }
  }
 return[ matched_digits, price.replace(matched_digits, "")];
}