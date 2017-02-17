import transformSassdocVariable from './transformSassdocVariable';
import { buildSassDocLink } from './buildSassDocList';

function transformParams({ name, default: value }) {
  return `$${name}${value ? `: ${value}` : ''}`;
}

function transformRequires({ name, type, item: { group } }) {
  return { context: { name, type }, group };
}

export default function transformSassdocFunction(sassdoc) {
  const {
    parameter: parameters,
    require: requires,
    return: returns,
    context: { name, type, code },
  } = sassdoc;

  const params = parameters
    ? `(${parameters.map(transformParams).join(', ')})`
    : '';

  return Object.assign(transformSassdocVariable(sassdoc), {
    code: `@${type} ${name}${params} {${code}}`,
    parameters: parameters || [],
    requires: requires ? requires.map(transformRequires).map(buildSassDocLink) : [],
    returns,
  });
}
