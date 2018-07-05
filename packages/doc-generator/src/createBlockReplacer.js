/**
 * A function that is used to create a function to replace "blocks" within the README.md with other
 * content.
 *
 * @param {String} startToken - The token that should be used to start a block replacer section.
 * @param {String} endToken - The token that should be used to end a block replacer section.
 * @return {function} a function to replace a block in the README.md file with the provided value.
 */
module.exports = function createBlockReplacer(startToken, endToken) {
  /**
   * Replaces a block in the README.md with the provided value string. This replacement can be
   * multiple lines.
   *
   * @param {String} readme - The README.md file contents as a string. The README should have a section
   *    of `startToken` and `endToken` so the contents can be replaced.
   * @param {String=''} value - The value to replace between the start and end tokens.
   * @return {String} the readme updated with the provided value in the block section.
   */
  return function replaceBlock(readme, value = '') {
    const start = readme.indexOf(startToken);
    const end = readme.indexOf(endToken);

    if (start === -1 || end === -1) {
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
  };
};
