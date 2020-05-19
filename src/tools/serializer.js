export const exponentialToNumerical = input => {
  if (input) {
    const [integral, decimal, power] = input.toString().split(/[eE]|\./);
    const expPowerValuePosition = 2;
    const expPower = power ? +power.substring(0, expPowerValuePosition) : 0;
    const positiveExponential = expPower >= 0;
    if (decimal) {
      if (positiveExponential) {
        return Number(`${integral}${decimal.slice(0, +expPower)}.${decimal.slice(+expPower)}`);
      }
      return 0;
    } if (!decimal) {
      return Number(integral);
    }
  }
  return 0;
};

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
