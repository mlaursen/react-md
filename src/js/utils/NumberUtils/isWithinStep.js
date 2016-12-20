export default function isWithinStep(value, step) {
  const decimals = String(step).split('.')[1];
  const corrector = typeof decimals !== 'undefined' && decimals.length > 0
    ? Math.pow(10, decimals.length)
    : 1;

  return (value * corrector) % (step * corrector) === 0;
}
