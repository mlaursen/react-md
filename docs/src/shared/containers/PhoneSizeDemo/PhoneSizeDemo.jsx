import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import PhoneSize from 'components/PhoneSize';

@connect(({ ui: { media } }) => media)
export default class PhoneSizeDemo extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,

    mobileOnly: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      component: null,
    };

    this._resolveDemoComponent = this._resolveDemoComponent.bind(this);
  }

  componentWillMount() {
    this._resolveDemoComponent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { mobile, tablet, desktop } = this.props;
    if (mobile !== nextProps.mobile || tablet !== nextProps.tablet || desktop !== nextProps.desktop) {
      this._resolveDemoComponent(nextProps);
    }
  }

  _resolveDemoComponent(props) {
    const stateMobile = typeof this.state.mobile === 'boolean' && this.state.mobile;
    const standaloneDemo = props.tablet || props.desktop;
    if (props.mobile && !standaloneDemo && !stateMobile) {
      if (__CLIENT__) {
        require.ensure(['./PhoneDemo'], require => {
          this.setState({ component: require('./PhoneDemo').default, mobile: true });
        });
      } else {
        this.setState({ component: require('./PhoneDemo').default, mobile: true });
      }
    } else {
      this.setState({ component: PhoneSize, mobile: false });
    }
  }

  render() {
    const { component: Demo } = this.state;
    if (!Demo) {
      return null;
    }

    const { ...props } = this.props;
    delete props.mobile;
    delete props.desktop;
    delete props.dispatch;

    return <Demo {...props} />;
  }
}
