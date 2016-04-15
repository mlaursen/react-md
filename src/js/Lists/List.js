import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Subheader from '../Subheaders';

/**
 * Lists present multiple line items vertically as a single continuous element.
 */
export default class List extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * Boolean if this should be an ordered list (`<ol>`) component. Otherwise, it will
     * be rendered as `<ul>`.
     */
    ordered: PropTypes.bool,

    /**
     * An optional className to apply to the list.
     */
    className: PropTypes.string,

    /**
     * An optional subheader primaryText to use if you want the list to start
     * with a subheader.
     */
    subheader: PropTypes.string,

    /**
     * A boolean if the optional subheader should be styled with the primary color.
     */
    primarySubheader: PropTypes.bool,

    /**
     * This *should* be a list of `ListItem`, `ListItemControl`, `Divider`, or
     * `Subheader`.
     */
    children: PropTypes.node,
  };

  render() {
    const { className, subheader, children, primarySubheader, ordered, ...props } = this.props;
    let allChildren = children;
    if(subheader) {
      allChildren = [<Subheader key="subheader" primary={primarySubheader} primaryText={subheader} />].concat(children);
    }

    return React.createElement(ordered ? 'ol' : 'ul', {
      className: classnames('md-list', className),
      ...props,
    }, React.Children.map(allChildren, (child, i) => {
      if(i + 1 < children.length) {
        const nextChild = children[i + 1];
        if(nextChild.type && nextChild.type.name === 'Divider') {
          return React.cloneElement(child, { className: classnames(child.props.className, 'extra-mb') });
        }
      }
      return child;
    }));
  }
}
