export const convertExpToNumerical = exponentialInput => {
  const [integral, decimal, power] = exponentialInput.toString().split(/[eE]|\./);
  const expPowerValuePosition = 2;
  const expPower = +power.substring(0, expPowerValuePosition);
  const positiveExponential = expPower >= 0;
  return positiveExponential
    ? Number(`${integral}${decimal.slice(0, +expPower)}.${decimal.slice(+expPower)}`)
    : 0;
};
