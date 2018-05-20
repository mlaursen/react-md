module.exports = function createBlockReplacer(startToken, endToken) {
  return function replaceBlock(readme, value = '') {
    const start = readme.indexOf(startToken);
    const end = readme.indexOf(endToken);

    if (start ===-1 || end === -1) {
      throw new Error(
        'The README.md file does not have a valid block-replacement scope defined in th file. ' +
        `There must be a block of "${startToken}" and "${endToken}". Please update the README.md ` +
        'and run this command again.'
      );
    }

    if (value) {
      value = `\n${value}\n`;
    }

    return `${readme.substring(0, start + startToken.length)}${value}${readme.substring(end)}`;
  }
}
