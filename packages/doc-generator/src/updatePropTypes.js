const createBlockReplacer = require('./createBlockReplacer');
const createDocgen = require('./createDocgen');
const updateMarkdownDescription = require('./updateMarkdownDescription');

const START_TOKEN = '<!-- PROPS_START -->';
const END_TOKEN = '<!-- PROPS_END -->';

const replaceBlock = createBlockReplacer(START_TOKEN, END_TOKEN);

function toPropTable(props) {
  return Object.keys(props).reduce((tableString, propName) => {
    const prop = props[propName];
    const { required } = prop;
    let { defaultValue, type, description } = prop;
    if (!/@docgen/.test(description)) {
      return tableString;
    }

    if (defaultValue) {
      defaultValue = defaultValue.value;
    }

    if (type) {
      type = type.name.replace(/ \| undefined/g, '');
    }

    if (description) {
      description = updateMarkdownDescription(description.replace(/@(docgen|see).*/, ''));
    }

    const line = `<tr>
<td>${propName}${required ? ' *' : ''}</td>
<td><code>${type}</code></td>
<td><code>${defaultValue}</code></td>
<td>
${description}
</td>
</tr>`;
    return `${tableString ? `${tableString}\n` : tableString}${line}`;
  }, '');
}

module.exports = function updatePropTypes(readme) {
  const docgens = createDocgen();
  if (!docgens.length) {
    return readme;
  }

  const update = docgens.reduce(
    (s, { displayName, description, props }) => `${s}
### ${displayName}
${description}

> Note: Required props will have an asterisk (*) after their name.

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default Value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
${toPropTable(props)}
</tbody>
</table>

`,
    '## Prop Types'
  );

  return replaceBlock(readme, update);
};
