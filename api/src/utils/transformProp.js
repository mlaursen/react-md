import toClassName from 'utils/StringUtils/toClassName';

const MANUAL_DEFINITITION_REGEX = /```docgen(.*\r?\n)*```/;


/* eslint-disable no-use-before-define */
function formatOneOf(values) {
  return `oneOf([${values.map(value => value.value).join(', ')}])`;
}

function formatOneOfType(values, customPropTypes, manualDefinition) {
  return `oneOfType([${values.map(value => formatType(value, customPropTypes, manualDefinition)).join(', ')}])`;
}

function formatShape(shape, customPropTypes, manualDefinition) {
  return `shape({ ${
    Object.keys(shape).map(key => `${key}: ${formatType(shape[key], customPropTypes, manualDefinition)}`).join(', ')
  } })`;
}

function formatCustom(raw, customPropTypes, manualDefinition) {
  if (raw.match(/deprecated/)) {
    return raw.replace(/(\r?\n)|\s/g, '').replace(/,'.*/, ')');
  } else if (raw.match(new RegExp(customPropTypes.join('|')))) {
    return raw;
  } else if (manualDefinition && manualDefinition[0]) {
    const desc = manualDefinition[0].replace('```docgen\n', '');
    return desc.substring(0, desc.lastIndexOf('\n```')).replace(/PropTypes\./g, '');
  }

  return 'custom';
}

function addRequired(value, required) {
  return `${value}${required ? '.isRequired' : ''}`;
}

function formatType({ name, value, raw, required }, customPropTypes, manualDefinition) {
  switch (name) {
    case 'union':
      return addRequired(formatOneOfType(value, customPropTypes, manualDefinition), required);
    case 'arrayOf':
      return addRequired(`${name}(${formatType(value, customPropTypes, manualDefinition)})`, required);
    case 'enum':
      return addRequired(formatOneOf(value));
    case 'shape':
      return addRequired(formatShape(value, customPropTypes, manualDefinition));
    case 'instanceOf':
      return addRequired(`${name}(${value})`);
    case 'custom':
      return formatCustom(raw, customPropTypes, manualDefinition);
    default:
      return addRequired(name, required);
  }
}

function createHash(component, propName) {
  return `#${toClassName(component)}-proptypes${propName ? `-${toClassName(propName)}` : ''}`;
}

function addComponentPropLinks(description, component) {
  return description.replace(/\{@link #(\w+(-\w+)*)\}/g, (match, propName) => `[${propName}](${createHash(component, propName)})`);
}

function addExternalPropLinks(description) {
  return description.replace(/{@link (\w+)\/(\w+)(#\w+(-\w+)*)?}/g, (match, section, component, hash) => {
    let prop;
    if (hash && hash.indexOf('#') !== -1) {
      prop = hash.substring(1);
    } else {
      prop = '';
      hash = ''; // eslint-disable-line no-param-reassign
    }

    if (section.match(/(helpers|pickers|progress|selectioncontrols)/i)) {
      section = `${section}/${toClassName(component)}`; // eslint-disable-line no-param-reassign
    }

    return `[${component}${hash}](/components/${toClassName(section)}?tab=1${createHash(component, prop)})`;
  });
}

function addLinks(description, component) {
  return addComponentPropLinks(addExternalPropLinks(description), component);
}


export default function transformProp(prop, propName, customPropTypes, file) {
  let { description, defaultValue } = prop;
  const type = formatType(prop.type, customPropTypes, description.match(MANUAL_DEFINITITION_REGEX));

  if (description) {
    description = addLinks(description.replace(MANUAL_DEFINITITION_REGEX, ''), file);
  }

  if (type.indexOf('deprecated') !== -1) {
    description = `The \`${propName}\` prop has been deprecated and will be removed in the next major release.

${prop.type.raw.split(',')[1].replace(/\)$/, '').replace(/'/g, '').trim()}.`;
  }

  if (defaultValue) {
    defaultValue = defaultValue.value;
  }

  return {
    propName,
    type,
    description,
    required: prop.required,
    defaultValue,
  };
}
