import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import PhoneSizeDemo from 'components/PhoneSizeDemo';

@connect(({ ui: { drawer: { mobile, tablet, desktop } } }) => ({ mobile, tablet, desktop }))
export default class PhoneSizeDemoContainer extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,

    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  state = { demoComponent: null, statusBar: null };

  componentWillMount() {
    this._resolveDemoComponent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (['mobile', 'tablet', 'desktop'].some(media => nextProps[media] !== this.props[media])) {
      this._resolveDemoComponent(nextProps);
    }
  }

  _resolveDemoComponent = (props) => {
    if (props.mobile) {
      if (__CLIENT__) {
        require.ensure([], require => {
          this.setState({ demoComponent: require('./PhoneDemo').default, statusBar: null });
        });
      } else {
        this.setState({ demoComponent: require('./PhoneDemo').default, statusBar: null });
      }
    } else if (__CLIENT__) {
      require.ensure([], require => {
        this.setState({ demoComponent: PhoneSizeDemo, statusBar: require('components/PhoneSizeDemo/StatusBar').default });
      });
    } else {
      this.setState({ demoComponent: PhoneSizeDemo, statusBar: require('components/PhoneSizeDemo/StatusBar').default });
    }
  };

  render() {
    const { demoComponent: Demo, statusBar } = this.state;
    if (!Demo) {
      return null;
    }

    const {
      /* eslint-disable no-unused-vars,react/prop-types */
      mobile,
      tablet,
      desktop,
      dispatch,
      /* eslint-enable no-unused-vars,react/prop-types */
      ...props
    } = this.props;

    return <Demo {...props} statusBar={statusBar} />;
  }
}
