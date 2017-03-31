import transformSassdocVariable, { refList } from './transformSassdocVariable';

function transformParams({ name, default: value }) {
  return `$${name}${value ? `: ${value}` : ''}`;
}

function transformRequires({ name, type, item: { group } }) {
  return { context: { name, type }, group };
}

export default function transformSassdocFunction(sassdoc) {
  const {
    parameter: parameters,
    require,
    return: returns,
    context: { name, type, code },
  } = sassdoc;

  const params = parameters
    ? `(${parameters.map(transformParams).join(', ')})`
    : '';

  let requires = [];
  if (require) {
    requires = refList(requires.map(transformRequires));
  }

  return Object.assign(transformSassdocVariable(sassdoc), {
    code: `@${type} ${name}${params} {${code}}`,
    parameters: parameters || [],
    requires,
    returns,
  });
}
