const path = require('path');
const { parse } = require('sassdoc');

module.exports = async function createSassDoc() {
  const rawSassDocs = await parse(path.join(process.cwd(), 'src'));

  return rawSassDocs.reduce((sassdocs, sassdoc, i) => {
    const {
      context: {
        name,
        type,
        value,
        code,
        access,
      },
      description,
      type: sassdocType,
      link: links,
      example: examples = [],
      parameter: parameters = [],
      require: requires,
      return: returns,
    } = sassdoc;
    if (access === 'private') {
      return sassdocs;
    }

    console.log('name: ', name);
    console.log('type: ', type);
    console.log('value: ', value);
    console.log('code: ', code);
    console.log('description: ', description);
    console.log('sassdocType: ', sassdocType);
    console.log('links: ', links);
    console.log('examples: ', examples);
    console.log('parameters: ', parameters);
    console.log('requires: ', requires);
    console.log('returns: ', returns);

    return sassdocs;
  }, {});
};
