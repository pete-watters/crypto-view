const ONE_THOUSAND = 1000;
// TODO look into doing some data manip here to avoid in helper
export const sumFloats = (a, b) =>
  (a * ONE_THOUSAND + b * ONE_THOUSAND) / ONE_THOUSAND;
export const subtractFloats = (a, b) =>
  (b * ONE_THOUSAND - a * ONE_THOUSAND) / ONE_THOUSAND;
