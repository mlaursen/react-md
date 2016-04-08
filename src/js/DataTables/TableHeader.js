import React, { Component, PropTypes } from 'react';

export default class TableHeader extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    className: PropTypes.string,

    children: (props, propName, component) => {
      try {
        React.Children.only(props.children);
      } catch(e) {
        return new Error(`There must only be one child in a '${component}', but ${props.children ? props.children.length : 0} were given.`);
      }
    },
  };

  static contextTypes = {
    allSelected: PropTypes.bool.isRequired,
    toggleAllRows: PropTypes.func.isRequired,
  };

  render() {
    const { children, ...props } = this.props;
    const { toggleAllRows, allSelected } = this.context;
    const header = React.Children.only(children);
    const selected = typeof header.props.selected === 'undefined' ? allSelected : header.props.selected;

    const row = React.cloneElement(header, {
      ...header.props,
      selected,
      onCheckboxClick: e => {
        header.props.onCheckboxClick && header.props.onCheckboxClick(e);

        if(typeof header.props.selected === 'undefined') {
          toggleAllRows();
        }
      },
    });

    return (
      <thead {...props}>
        {row}
      </thead>
    );
  }
}
