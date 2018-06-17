const toc = require('markdown-toc');
const createBlockReplacer = require('./createBlockReplacer');

const START_TOKEN = '<!-- TOC_START -->';
const END_TOKEN = '<!-- TOC_END -->';
const replaceBlock = createBlockReplacer(START_TOKEN, END_TOKEN);

module.exports = function updateTOC(readme) {
  const tableOfContents = toc(replaceBlock(readme.replace(/^# @react-md.+/, ''), '')).content;
  const newTOC = `## Table of Contents
${tableOfContents}
`;
  const updated = replaceBlock(readme, newTOC);
  console.log(tableOfContents);
  return updated;
}
