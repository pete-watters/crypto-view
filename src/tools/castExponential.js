export const scientificToDecimal = number => {
  let numberHasSign = number.startsWith("-") || number.startsWith("+");
  let sign = numberHasSign ? number[0] : "";
  number = numberHasSign ? number.replace(sign, "") : number;

  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(number)) {
    let zero = '0';
    let parts = String(number).toLowerCase().split('e'); //split into coeff and exponent
    let e = parts.pop();//store the exponential part
    let l = Math.abs(e); //get the number of zeros
    let sign = e / l;
    let coeff_array = parts[0].split('.');

    if (sign === -1) {
      coeff_array[0] = Math.abs(coeff_array[0]);
      number = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
    } else {
      let dec = coeff_array[1];
      if (dec) l = l - dec.length;
      number = coeff_array.join('') + new Array(l + 1).join(zero);
    }
  }

  return `${sign}${number}`;
};

// Could be good way of running my own unit tests
var expect = function(value) {
  return {
      toEqual: function(otherValue) {
          if(value !== otherValue) {
              console.error(value+' did not yield the correct result!');
          }
      }
  };
};

expect(scientificToDecimal(2.5e25)).toEqual('25000000000000000000000000');
expect(scientificToDecimal(-1.123e-10)).toEqual('-0.0000000001123');
expect(scientificToDecimal(-1e-3)).toEqual('-0.001');
expect(scientificToDecimal(-1.2e-2)).toEqual('-0.012');
expect(scientificToDecimal(12.12)).toEqual(12.12);
expect(scientificToDecimal(141120000000000000)).toEqual(141120000000000000);
expect(scientificToDecimal('0')).toEqual(0);
expect(scientificToDecimal(1.23423534e-12)).toEqual(0.00000000000123423534);