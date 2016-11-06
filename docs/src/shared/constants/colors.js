const ACCENTABLE_COLORS = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',
  'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber',
  'orange', 'deep-orange',
];

const NOT_ACCENTABLE_COLORS = ['brown', 'grey', 'blue-grey'];
const PRIMARY_COLORS = ACCENTABLE_COLORS.concat(NOT_ACCENTABLE_COLORS);
const SECONDARY_HUES = [100, 200, 400, 700];

module.exports.ACCENTABLE_COLORS = ACCENTABLE_COLORS;
module.exports.PRIMARY_COLORS = PRIMARY_COLORS;
module.exports.SECONDARY_HUES = SECONDARY_HUES;
