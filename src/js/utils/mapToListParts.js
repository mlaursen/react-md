import { createElement, isValidElement } from 'react';
import Divider from '../Dividers';
import Subheader from '../Subheaders';
import ListItem from '../Lists/ListItem';

export default function mapToListParts(item, index) {
  if (isValidElement(item)) {
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

  const props = Object.assign({}, remainingProps, { key: item.key || index });
  if (nestedItems) {
    props.nestedItems = nestedItems.map(mapToListParts);
  }

  return createElement(component, props);
}
