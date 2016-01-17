import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';
import ListSubheader from './ListSubheader';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    ordered: PropTypes.bool,
    className: PropTypes.string,
    subheader: PropTypes.string,
    primarySubheader: PropTypes.bool,
    children: PropTypes.node,
    textOnly: PropTypes.bool,
  };

  render() {
    const { className, subheader, children, ...props } = this.props;
    let allChildren = children;
    if(subheader) {
      allChildren = [<ListSubheader primary={isPropEnabled(props, 'primarySubheader')} primaryText={subheader} />].concat(children);
    }

    return React.createElement(isPropEnabled(props, 'ordered') ? 'ol' : 'ul', {
      className: classnames('md-list', className, { 'md-text-list': isPropEnabled(props, 'textOnly') }),
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
