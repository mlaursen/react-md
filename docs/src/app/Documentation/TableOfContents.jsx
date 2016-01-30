import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { List, ListSubheader } from 'react-md/lib/Lists';
import { toDashedName, toTitle } from './utils';
import { smoothScroll } from 'react-md/lib/utils';

export default class TableOfContents extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.string),
    examples: PropTypes.number,
  };

  getPropTypeItem = (name, displayName, type = 'prop-types') => {
    const id = `#${type}-${toDashedName(name)}`;
    return (
      <li
        className="md-list-tile"
        key={name}
        >
        <a
          className="md-tile-primary-text"
          onClick={() => {
            smoothScroll(window, 150, {
              toEl: document.getElementById(id),
            });
          }}
          >
          {toTitle(typeof displayName === 'string' ? displayName : name)}
        </a>
      </li>
    );
  };

  render() {
    const { examples, components } = this.props;
    if(examples < 2 && components.length < 2) { return null; }

    let exampleLinks;
    if(examples > 1) {
      const items = Array.apply(null, new Array(examples)).map((x, i) => {
        const name = `Example${i + 1}`;
        return this.getPropTypeItem(name, components[i] || name, 'examples');
      });
      exampleLinks = [
        <ListSubheader key="example-links" className="nested-header" primaryText="Examples" />,
        <List key="multiple-example-links">{items}</List>,
      ];
    }

    let propTypes;
    if(components.length > 1 || exampleLinks) {
      propTypes = [
        <ListSubheader key="prop-types" className="nested-header" primaryText="Prop Types" />,
        <List key="multiple-props-types">
          {components.map(name => this.getPropTypeItem(name))}
        </List>,
      ];
    }

    return (
      <nav className="doc-toc">
        <List className="toc">
          {exampleLinks}
          {propTypes}
        </List>
      </nav>
    );
  }
}
