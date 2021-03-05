export const removeNonNumbers = (s: string): string => s.replace(/[^0-9]/g, "");
export const getNumberValue = (s: string): number =>
  parseFloat(removeNonNumbers(s) || "0");

export const getCurrentValue = (
  value: string,
  digits: number,
  pad = true
): string => {
  const currentValue = removeNonNumbers(value).substring(0, digits);
  if (!pad) {
    return currentValue;
  }

  return currentValue.padStart(digits, "0");
};
