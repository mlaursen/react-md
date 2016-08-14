import React, { PureComponent, PropTypes } from 'react';

export default class DefaultValue extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.shape({
      computed: PropTypes.bool.isRequired,
      value: PropTypes.string,
    }),
  };

  render() {
    const { defaultValue } = this.props;
    if (!defaultValue) {
      return null;
    }

    return (
      <div className="prop-default-value">
        default:
        <code>{defaultValue.value}</code>
      </div>
    );
  }
}
