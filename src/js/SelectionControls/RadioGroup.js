/* eslint-disable no-unused-vars, no-shadow */
import React, { PureComponent, PropTypes, Children } from 'react';
import deprecated from 'react-prop-types/lib/deprecated';

import SelectionControlGroup from './SelectionControlGroup';

// This will still work, but generate a lot of warnings

/**
 * The `RadioGroup` component is a state manager for the `Radio` component.
 * It will automatically inject the name, an onChange function, and
 * determine whether a radio is checked.
 *
 * This is just a simple wrapper to reduce some prop redundancy.
 */
export default class RadioGroup extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    inline: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,

    _deprecated: deprecated(PropTypes.bool, 'Use the `SelectionControlGroup` component instead'),
  };

  render() {
    const { children, ...props } = this.props;
    delete props.id;
    delete props.defaultValue;

    let { id, defaultValue } = this.props;
    if (!id) {
      id = `${props.name}RadiosUniquePlease`;
    }

    if (typeof props.value === 'undefined') {
      if (typeof defaultValue === 'undefined') {
        defaultValue = Children.map(children, ({ props: { value } }) => value)[0];
      }
    }

    const controls = Children.map(children, radio => {
      const props = Object.assign({}, radio.props);
      delete props.checkedIcon;
      delete props.uncheckedIcon;
      delete props.checkedIconChildren;
      delete props.checkedIconClassName;
      delete props.uncheckedIconChildren;
      delete props.uncheckedIconClassName;
      return { ...props };
    });
    return <SelectionControlGroup {...props} id={id} defaultValue={defaultValue} type="radio" controls={controls} />;
  }
}
