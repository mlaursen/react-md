const createSassDoc = require('./createSassDoc');
const createBlockReplacer = require('./createBlockReplacer');
const updateMarkdownDescription = require('./updateMarkdownDescription');

const START_TOKEN = '<!-- SASSDOC_START -->';
const END_TOKEN = '<!-- SASSDOC_END -->';
const replaceBlock = createBlockReplacer(START_TOKEN, END_TOKEN);

function createParameterTable(parameters) {
  return `<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</thead>
<tbody>
${parameters.reduce((paramString, { name, type, description, default: value }) => {
    const line = `<tr>
<td>${name}</td>
<td>${type}</td>
<td>${value || ''}</td>
<td>${updateMarkdownDescription(description)}</td>
</tr>`;

    return `${paramString ? `${paramString}\n` : paramString}${line}`;
  }, '')}
</tbody>
</table>
`;
}

function createExamples(examples) {
  if (!examples || !examples.length) {
    return '';
  }
  return examples.reduce((s, { type, code, description }) => {
    const example = `
##### ${description}

\`\`\`${type}
${code}
\`\`\`
`;
    return `${s}${example}`;
  }, '');
}

function toMixinTable(mixins) {
  return mixins.reduce((tableString, mixin) => {
    const { name, description, parameters } = mixin;
    const nameWithParams = `<code>${name}${parameters.length ? `(${parameters.map(({ name }) => `${name}`).join(', ')})` : ''}</code>`;
    const line = `<tr>
<td>${nameWithParams}</td>
<td>${updateMarkdownDescription(description)}
${parameters.length ? `<h5>Parameters</h5>\n${createParameterTable(parameters)}` : ''}
</td>
</tr>`;
    return `${tableString ? `${tableString}\n` : tableString}${line}`;
  }, '');
}

function createMixinTable(mixins) {
  if (!mixins.length) {
    return '';
  }

  const examples = mixins.map(({ examples }) => createExamples(examples)).filter(Boolean);

  return `
### Mixins

<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
${toMixinTable(mixins)}
</tbody>
</table>
${examples.length ? `\n#### Examples\n\n${examples}` : ''}`;
}

function toFunctionTable(functions) {
  return functions.reduce((tableString, fn) => {
    const { name, description, parameters, returns } = fn;
    const nameWithParams = `<code>${name}${parameters.length ? `(${parameters.map(({ name }) => `${name}`).join(', ')})` : ''}</code>`;
    const line = `<tr>
<td>${nameWithParams}</td>
<td>${returns.type} - ${returns.description}</td>
<td>${updateMarkdownDescription(description)}
${parameters.length ? `<h5>Parameters</h5>\n${createParameterTable(parameters)}` : ''}
</td>
</tr>`;
    return `${tableString ? `${tableString}\n` : tableString}${line}`;
  }, '');
}

function createFunctionTable(functions) {
  if (!functions.length) {
    return '';
  }

  const examples = functions.map(({ examples }) => createExamples(examples)).filter(Boolean);

  return `
### Functions

<table>
<thead>
<tr>
<th>Name</th>
<th>Returns</th>
<th>Description</th>
</tr>
</thead>
<tbody>
${toFunctionTable(functions)}
</tbody>
</table>
${examples.length ? `\n#### Examples\n\n${examples}` : ''}`;
}

function toVariableTable(variables) {
  return variables.reduce((tableString, { name, description }) => {
    if (!description) {
      return tableString;
    }

    const line = `<tr>
<td><code>${name}</code></td>
<td>${updateMarkdownDescription(description)}</td>
</tr>`;
    return `${tableString ? `${tableString}\n` : ''}${line}`;
  }, '');
}

function createVariableTable(variables) {
  if (!variables.length) {
    return '';
  }

  return `
### Variables
<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
${toVariableTable(variables)}
</tbody>
</table>
`;
}

module.exports = async function updateSassDoc(readme) {
  const { functions, variables, mixins } = await createSassDoc();
  if (!functions.length && !variables.length && !mixins.length) {
    return readme;
  }

  const update = [createMixinTable(mixins), createFunctionTable(functions), createVariableTable(variables)].reduce((s, part) => {
    if (s && part) {
      s = `${s}\n`;
    }

    return `${s}${part}`;
  }, '');

  return replaceBlock(readme, update);
};
