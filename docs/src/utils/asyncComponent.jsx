import React, { PureComponent } from 'react';

export default function asyncComponent(getComponent, loadingChildren = null) {
  return class AsyncComponent extends PureComponent {
    static Component = null;
    static async loadComponent() {
      const { default: Component } = await getComponent();
      AsyncComponent.Component = Component;
      return Component;
    }

    state = { Component: AsyncComponent.Component };
    mounted = false;

    async componentWillMount() {
      if (!AsyncComponent.Component) {
        const Component = await AsyncComponent.loadComponent();
        if (this.mounted) {
          this.setState({ Component });
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
    render() {
      const { Component } = this.state;
      if (!Component) {
        return loadingChildren;
      }

      return <Component {...this.props} />;
    }
  };
}
