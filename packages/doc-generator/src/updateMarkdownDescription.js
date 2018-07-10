const encode = require('ent/encode');

module.exports = function updateMarkdownDescription(description) {
  const lines = encode(description)
    .replace(/`([^ `]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/, '<b>$1</b>')
    .replace(/_([^_]+)_/, '<i>$1</i>')
    .replace(/\r?\n\r?\n$/, '')
    .split(/\r?\n/);

  let prev = '';
  return lines.reduce((desc, line, i) => {
    if (line === '' && prev.indexOf('`') === -1) {
      // Replace empty lines with breaks to get correct spacing in tables.
      line = '<br /><br />';

      // if the second next line is a code block, need to add an empty line back
      // to get code markdown parsing from github.
      if ((lines[i + 2] || '').indexOf('```') !== -1) {
        line = `${line}\n`;
      }
    }

    if (desc) {
      desc = `${desc}\n`;
    }

    prev = line;

    return `${desc}${line}`;
  }, '');
};
