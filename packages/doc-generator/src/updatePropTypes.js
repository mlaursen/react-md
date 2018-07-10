const createBlockReplacer = require('./createBlockReplacer');
const createDocgen = require('./createDocgen');
const updateMarkdownDescription = require('./updateMarkdownDescription');

const START_TOKEN = '<!-- PROPS_START -->';
const END_TOKEN = '<!-- PROPS_END -->';

const replaceBlock = createBlockReplacer(START_TOKEN, END_TOKEN);

function toPropTable(props) {
  // since all react-md components pass all remaining props down, need to check for the '@last-prop' in the description
  // so all the normal html attributes are not applied.
  let lastPropFound = false;
  return Object.keys(props).reduce((tableString, propName) => {
    if (lastPropFound) {
      return tableString;
    }

    const prop = props[propName];
    const { required } = prop;
    let { defaultValue, type, description } = prop;
    if (defaultValue) {
      defaultValue = defaultValue.value;
    }

    if (type) {
      type = type.name.replace(/ \| undefined/g, '');
    }

    if (description) {
      const i = description.indexOf('@last-prop');
      if (i !== -1) {
        lastPropFound = true;
        description = description.substring(0, i);
      }

      description = updateMarkdownDescription(description);
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
