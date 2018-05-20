const createBlockReplacer = require('./createBlockReplacer');
const createDocgen = require('../createDocgen');

const START_TOKEN = '<!-- PROPS_START -->';
const END_TOKEN = '<!-- PROPS_END -->';

const replaceBlock = createBlockReplacer(START_TOKEN, END_TOKEN);

function removeNewLines(s) {
  return s.replace(/\r?\n/g, '<br />');
}

function updateDescription(description) {
  const lines = description.replace(/`([^ `]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/, '<b>$1</b>')
    .replace(/\_([^_]+)\_/, '<i>$1</i>')
    .split(/\r?\n/);

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
}

function toPropTable(props) {
  return Object.keys(props).reduce((tableString, propName) => {
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
      description = updateDescription(description);
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
  }, '');;
}

module.exports = function updatePropTypes(readme) {
  const docgens = createDocgen();
  if (!docgens.length) {
    return readme;
  }

  const update = docgens.reduce((s, { displayName, description, props }) => `${s}
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
<tr>
</thead>
<tbody>
${toPropTable(props)}
</tbody>
</table>

`, '## Prop Types');

  return replaceBlock(readme, update);
}
