const MAP_DELIMETER = ': (';
const MIXIN_DELIMITER = '{';
const ELLIPSIS = '\u2026';

function trim(s) {
  return s.replace(/\r?\n/g, '').replace(/ {2}/g, '');
}

export default function toOneLineCode(code) {
  let startDelimiter = MIXIN_DELIMITER;
  let endDelimiter = '}';
  if (!code.match(/^(@(mixin|function)|%)/)) {
    endDelimiter = ')';
    startDelimiter = MAP_DELIMETER;
  }

  return `${trim(code.substring(0, code.indexOf(startDelimiter) + startDelimiter.length))} ${ELLIPSIS} ${endDelimiter}`;
}
