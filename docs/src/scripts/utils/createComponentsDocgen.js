import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import { parse } from 'react-docgen';
import { kebabCase } from 'lodash/string';
import { toCaterpillarCase } from 'utils/strings';

import jsdocs from 'server/databases/jsdocs.json';
import { BASE_SOURCE_PATH } from 'server/constants';
import isPrivate from './isPrivate';
import prettifyProp from './prettifyProp';

const readFile = Promise.promisify(fs.readFile);

const CONTAINERS = ['DatePicker', 'TimePicker', 'Snackbar'];

const JSDOC_KEYS = Object.keys(jsdocs);
const regex = new RegExp(`static (${JSDOC_KEYS.join('|')})`, 'g');

function getEnums(source) {
  const matches = source.match(regex);
  if (matches) {
    return matches.reduce((enums, match) => {
      const name = match.replace('static ', '');
      const jsdoc = jsdocs[name];
      if (jsdoc) {
        enums.push(jsdoc);
      }

      return enums;
    }, []);
  }

  return [];
}

function getParams(parameters, file, method) {
  if (!parameters) {
    return [];
  }

  return parameters.map(({ name, description, type, required }) => {
    if (!type) {
      throw new Error(`There is no defined param type for \`${file}\`'s method \`${method}\` param \`${name}\`. Please add one.`);
    }

    return {
      name,
      description,
      type: type.name,
      required: !!required,
    };
  });
}

function getFunctions(componentFunctions, file) {
  return componentFunctions.reduce((functions, { name, params, returns, description, modifiers, docblock }) => {
    if (!isPrivate(name, docblock)) {
      if (!description) {
        throw new Error(`There is no documentation for \`${file}\`'s method \`${name}\`. Please add one.`);
      } else if (returns && returns.type === null) {
        throw new Error(`There is no defined return type for \`${file}\`'s method \`${name}\`. Please add one.`);
      }

      functions.push({
        name,
        type: modifiers.length || !returns ? 'function' : 'getter',
        description,
        returns: returns ? { description: returns.description, type: returns.type.name } : null,
        params: getParams(params, file, name),
      });
    }

    return functions;
  }, []);
}

function parseDocgen(source) {
  return parse(
    source.replace(/ComposedComponent =>/, '')
      .replace(/withTableFixes\((\w+), .*/, 'withTableFixes($1);')
  );
}

export async function createComponentDocgen(folder, fullPath, file, customPropTypes) {
  const fileName = `${file}${CONTAINERS.indexOf(file) !== -1 ? 'Container' : ''}.js`;

  try {
    const source = await readFile(path.join(fullPath, fileName), 'UTF-8');
    const { description, methods: allFunctions, props } = await parseDocgen(source);
    const { functions, getters, enums } = getEnums(source).concat(getFunctions(allFunctions, file)).reduce((types, type) => {
      switch (type.type) {
        case 'function':
          types.functions.push(type);
          break;
        case 'getter':
          types.getters.push(type);
          break;
        case 'constant':
          types.enums.push(type);
          break;
        default:
          types.functions.push(type);
      }

      return types;
    }, { functions: [], getters: [], enums: [] });

    return {
      id: toCaterpillarCase(file),
      source: `${BASE_SOURCE_PATH}/src/js/${folder}/${fileName}`,
      component: file,
      functions,
      enums,
      getters,
      props: Object.keys(props).reduce((list, propName) => {
        const prop = props[propName];
        if (!isPrivate(propName) && !prop.description.match(/@access private/)) {
          list.push(prettifyProp(prop, propName, customPropTypes, file));
        }

        return list;
      }, []),
      description,
    };
  } catch (e) {
    throw new Error(`There was an error creating docgen for \`${fileName}\`. ${e.message}`);
  }
}

export default async function createComponentsDocgen({ folder, fullPath, components }, customPropTypes) {
  const docgens = await Promise.all(components.map(component => createComponentDocgen(folder, fullPath, component, customPropTypes)));
  return {
    docgens,
    group: kebabCase(folder),
  };
}
