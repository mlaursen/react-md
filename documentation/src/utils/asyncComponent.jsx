import React, { PureComponent } from 'react';

export default function asyncComponent(getComponent, loadingChildren = null) {
  return class AsyncComponent extends PureComponent {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!AsyncComponent.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      } else if (!this.state.Component) {
        this.setState({ Component: AsyncComponent.Component });
      }
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : loadingChildren;
    }
  };
}
