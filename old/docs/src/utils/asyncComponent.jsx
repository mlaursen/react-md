import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { asyncContentLoaded, asyncContentLoading } from 'state/drawer/contentProps';
import LoadingContent from 'components/LoadingContent';

export default function asyncComponent(getComponent, loadingChildren = <LoadingContent />) {
  class AsyncComponent extends PureComponent {
    static propTypes = {
      asyncContentLoaded: PropTypes.func.isRequired,
      asyncContentLoading: PropTypes.func.isRequired,
    };

    static Component = null;
    static async loadComponent() {
      const { default: Component } = await getComponent();
      AsyncComponent.Component = Component;
      return Component;
    }

    state = { Component: AsyncComponent.Component };

    async componentWillMount() {
      if (!AsyncComponent.Component) {
        this.props.asyncContentLoading();
        const Component = await AsyncComponent.loadComponent();
        if (this.mounted) {
          this.setState({ Component }, this.props.asyncContentLoaded);
        }
      } else if (!this.state.Component) {
        this.setState({ Component: AsyncComponent.Component });
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    mounted = false;

    render() {
      const { Component } = this.state;
      if (!Component) {
        return loadingChildren;
      }

      const {
        /* eslint-disable no-unused-vars */
        asyncContentLoaded,
        asyncContentLoading,
        /* eslint-enable no-unused-vars */
        ...props
      } = this.props;

      return <Component {...props} />;
    }
  }

  return connect(null, { asyncContentLoaded, asyncContentLoading })(AsyncComponent);
}
