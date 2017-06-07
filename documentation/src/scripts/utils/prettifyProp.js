import { kebabCase } from 'lodash/string';
import formatMarkdown from 'utils/formatMarkdown';

const MANUAL_DEFINITITION_REGEX = /```docgen(.*\r?\n)*```/;


/* eslint-disable no-use-before-define */
export function formatOneOf(values) {
  return `oneOf([${values.map(value => value.value).join(', ')}])`;
}

export function formatOneOfType(values, customPropTypes, manualDefinition) {
  return `oneOfType([${values.map(value => formatType(value, customPropTypes, manualDefinition)).join(', ')}])`;
}

export function formatShape(shape, customPropTypes, manualDefinition) {
  return `shape({ ${
    Object.keys(shape).map(key => `${key}: ${formatType(shape[key], customPropTypes, manualDefinition)}`).join(', ')
  } })`;
}

export function formatCustom(raw, customPropTypes, manualDefinition) {
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

export function addRequired(value, required) {
  return `${value}${required ? '.isRequired' : ''}`;
}

export function formatType({ name, value, raw, required }, customPropTypes, manualDefinition) {
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

export function createHash(component, propName) {
  return `#${kebabCase(component)}-proptypes${propName ? `-${kebabCase(propName)}` : ''}`;
}

export function addComponentPropLinks(description, component) {
  return description.replace(/\{@link #(\w+(-\w+)*)\}/g, (match, propName) => `[${propName}](${createHash(component, propName)})`);
}

export function addExternalPropLinks(description) {
  return description.replace(/{@link (\w+)\/(\w+)(#\w+(-\w+)*)?}/g, (match, section, component, hash) => {
    let prop;
    if (hash && hash.indexOf('#') !== -1) {
      prop = hash.substring(1);
    } else {
      prop = '';
      hash = ''; // eslint-disable-line no-param-reassign
    }

    if (section.match(/(helpers|pickers|progress|selectioncontrols)/i)) {
      section = `${section}/${kebabCase(component)}`; // eslint-disable-line no-param-reassign
    }

    return `[${component}${hash}](/components/${kebabCase(section)}?tab=1${createHash(component, prop)})`;
  });
}

export function addLinks(description, component) {
  return addComponentPropLinks(addExternalPropLinks(description), component);
}


/**
 * Takes in a prop from the output of react-docgen and formats it for use on the client.
 */
export default function prettifyProp(prop, propName, customPropTypes, file) {
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
