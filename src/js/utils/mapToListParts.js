/** @module utils/mapToListParts */

import { createElement, isValidElement } from 'react';
import Divider from '../Dividers/Divider';
import Subheader from '../Subheaders/Subheader';
import ListItem from '../Lists/ListItem';

/**
 * A utility function to convert any "item" into a valid React element that is used
 * within the `List` component.
 *
 * Use cases:
 * - is a valid React element -> item returned unmodified
 * - `number` or `string` -> `ListItem` with the item as the `primaryText`
 * - an `object` with a key `divider: true` -> a `Divider` component with the remaining
 *    keys applied as props.
 * - an `object` with a key `subheader: true` -> a `Subheader` component with the remianing
 *    keys applied as props. This one technically requires the `primaryText` key to be defined.
 * - an `object` -> all keys passed into the `ListItem` component.
 *
 * Examples:
 * ```js
 * mapToListParts('Hello') == <ListItem primaryText="Hello" />
 * mapToListParts(100)     == <ListItem primaryText={100} />
 * mapToListParts({ primaryText: 'Item' }) == <ListItem primaryText="Item" />
 * mapToListParts({ divider: true }) == <Divider />
 * mapToListParts({ subheader: true, primaryText: 'Subheader' }) == <Subheader primaryText="Subheader" />
 * ```
 *
 * @param {string|number|Object} item - the item to convert
 * @param {number|string=} index - the current index in the array (if used in an array)
 * @return {Object} a React element
 */
export default function mapToListParts(item, index) {
  if (typeof item === 'string' || typeof item === 'number') {
    return createElement(ListItem, { key: item, primaryText: item });
  } else if (isValidElement(item)) {
    return item;
  }

  const { divider, subheader, nestedItems, ...remainingProps } = item;
  let component;
  if (divider) {
    component = Divider;
  } else if (subheader) {
    component = Subheader;
  } else {
    component = ListItem;
  }

  const props = { ...remainingProps, key: item.key || index };
  if (nestedItems) {
    props.nestedItems = nestedItems.map(mapToListParts);
  }

  return createElement(component, props);
}
