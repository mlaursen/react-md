import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: props.initialValue || React.Children.toArray(props.children)[0].props.value,
    };
  }

  static propTypes = {
    initialValue: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node),
    component: PropTypes.string,
    stacked: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    component: 'span',
    stacked: false,
  }

  handleChange = (e) => {
    this.props.onChange && this.props.onChange(e, e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    const { component, className, children, stacked, ...props } = this.props;
    const fullProps = {
      ...props,
      className: classnames('md-radio-group', className, {
        'stacked': stacked,
      }),
    };
    return React.createElement(component, fullProps, React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        key: i,
        checked: this.state.value === child.props.value,
        onChange: this.handleChange,
      });
    }));
  }
}
