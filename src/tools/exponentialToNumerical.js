export const exponentialToNumerical = input => {
  if (!input) {
    return 0;
  }
  const [integral, decimal, power] = input.toString().split(/[eE]|\./);
  const expPowerValuePosition = 2;
  const expPower = power ? +power.substring(0, expPowerValuePosition) : 0;
  const positiveExponential = expPower >= 0;
  if (decimal) {
    if (positiveExponential) {
      return Number(`${integral}${decimal.slice(0, +expPower)}.${decimal.slice(+expPower)}`);
    } else {
      return 0;
    }
  } else if (!decimal) {
    return Number(integral);
  }
};
