/* eslint-disable max-len */
import { toCaterpillarCase } from 'utils/strings';
import pluralize from 'pluralize';

export const MANUAL_DOCGEN_DEFINTIION_REGEX = /```docgen(.*\r?\n)*```/;

function toPluralCaterpillar(s) {
  return toCaterpillarCase(s.endsWith('ss') ? s : pluralize(s));
}

function getComponentAndPath(section, component) {
  if (component) {
    component = component.replace('/', '');
  } else {
    component = section;
  }

  let path = toPluralCaterpillar(section);
  if (path.match(/(helpers|pickers|progress)/)) {
    path += `/${toPluralCaterpillar(component)}`;
  }

  return { component, path };
}

/**
 * Creates a url hash for the provided params. This is used to make direct links to different
 * props, enums, or functions on a component's prop type page.
 *
 * Example:
 * ```js
 * createHash('Autocomplete', 'total', 'proptypes') === '#autocomplete-proptypes-total';
 * createhash('Layover', 'VerticalAnchors', 'enums') === '#layover-enums-vertical-anchors';
 * ```
 *
 * @param {String} component - the current component
 * @param {String=} name - the name to be used for the url.
 * @param {String='proptypes'} type - the type of hash url to generate.
 * @return {String} a hash to be used in a url to directly link to some form of documentation.
 */
export function createHash(component, name, type = 'proptypes') {
  return `#${toCaterpillarCase(component)}-${type}${name ? `-${toCaterpillarCase(name)}` : ''}`;
}

/**
 * There are some components that have hard to document prop types, so it can be easier defined with
 * a manual docgen markdown creation. This is done by:
 *
 * ```docgen
 * PropTypes.shape({
 *   ...
 * })
 * ```
 *
 * This function will just strip it from the docgen creation since it isn't actually a part of the
 * prop description.
 *
 * @param {String} markdown - The markdown to update.
 * @return {String} the updated markdown.
 */
export function stripManualDocgenDefinitions(markdown) {
  return markdown.replace(MANUAL_DOCGEN_DEFINTIION_REGEX, '');
}

/**
 * Updates the provded markdown to have a GitHub flavored markdown url for directly linking to
 * a component's enum. This is to replace any of the `@see {@link #SOME_ENUM}` with a direct link.
 *
 * Example:
 * ```js
 * addComponentEnums('{@link #VerticalEnums}', 'Layover') === '[Layover.VerticalAnchors](#layover-enums-vertical-anchors)';
 * ```
 *
 * @param {String} markdown - The markdown to update.
 * @param {String} component - The current component that is being referenced.
 * @return {String} an updated markdown string.
 */
export function addComponentEnums(markdown, component) {
  return markdown.replace(
    /\{@link #([A-Z]\w+)\}/g,
    (match, enumerator) => `[${component}.${enumerator}](${createHash(component, enumerator, 'enums')})`
  );
}

/**
 * Updates the provded markdown to have a GitHub flavored markdown url for directly linking to
 * any component's enum. This is to replace any of the `@see {@link GROUP/?COMPONENT#SOME_ENUM}`
 * with a direct link.
 *
 * Example:
 * ```js
 * addComponentEnums('{@link Helpers/Layover#VerticalEnums}') === '[Layover.VerticalAnchors](/components/helpers/layovers?tab=1#layover-enums-vertical-anchors)';
 * ```
 *
 * @param {String} markdown - The markdown to update.
 * @return {String} an updated markdown string.
 */
export function addExternalEnums(markdown) {
  return markdown.replace(
    /\{@link ([A-Z]\w+)(\/[A-Z]\w+)?#([A-Z]\w+)\}/g,
    (match, section, componentMatch, enumerator) => {
      const { component, path } = getComponentAndPath(section, componentMatch);
      return `[${component}.${enumerator}](/components/${path}?tab=1${createHash(component, enumerator, 'enums')})`;
    }
  );
}

/**
 * Updates the provded markdown to have a GitHub flavored markdown url for directly linking to
 * a component's prop. This is to replace any of the `@see {@link #someProp}` with a direct link.
 *
 * Example:
 * ```js
 * addComponentProps('{@link #anchor}', 'Layover') === '[#anchor](#layover-proptypes-anchor)';
 * ```
 *
 * @param {String} markdown - The markdown to update.
 * @return {String} an updated markdown string.
 */
export function addComponentProps(markdown, component) {
  return markdown.replace(
    /\{@link #(\w+(-\w+)*)\}/g,
    (match, propName) => `[${propName}](${createHash(component, propName, 'proptypes')})`
  );
}

/**
 * Updates the provded markdown to have a GitHub flavored markdown url for directly linking to
 * any component's prop. This is to replace any of the `@see {@link GROUP/?COMPONENT#someProp}`
 * with a direct link.
 *
 * Example:
 * ```js
 * addExternalProps('{@link Helpers/Layover#anchor}') === '[#anchor](/components/helpers/layovers?tab=1#layover-proptypes-anchor)';
 * ```
 *
 * @param {String} markdown - The markdown to update.
 * @return {String} an updated markdown string.
 */
export function addExternalProps(markdown) {
  return markdown.replace(
    /\{@link (\w+)(\/\w+)?#(\w+(-\w)*)}/g,
    (match, section, componentMatch, propName) => {
      const { component, path } = getComponentAndPath(section, componentMatch);

      return `[${component}#${propName}](/components/${path}?tab=1${createHash(component, propName, 'proptypes')})`;
    }
  );
}

const transforms = [
  stripManualDocgenDefinitions,
  addComponentEnums,
  addExternalEnums,
  addComponentProps,
  addExternalProps,
];

export default function updateMarkdownLinks(markdown, component) {
  return transforms.reduce((updated, transform) => transform(updated, component), markdown);
}
