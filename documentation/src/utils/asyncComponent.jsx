import React, { PureComponent } from 'react';
import cn from 'classnames';

export default function asyncComponent(getComponent, loadingChildren = null) {
  return class AsyncComponent extends PureComponent {
    static Component = null;
    state = {
      Component: AsyncComponent.Component,
      enter: false,
      active: false,
    };
    timeout = null;

    componentWillMount() {
      if (!AsyncComponent.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.transitionIn();
          this.setState({ Component });
        });
      } else if (!this.state.Component) {
        this.setState({ Component: AsyncComponent.Component });
      } else {
        this.transitionIn();
      }
    }

    componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }

    transitionIn = () => {
      this.setState({ enter: true });
      this.timeout = setTimeout(() => {
        this.transitionInActive();
        this.setState({ active: true });
      }, 17);
    };

    transitionInActive = () => {
      this._timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ active: false, enter: false });
      }, 300);
    };

    render() {
      const { Component, enter, active } = this.state;
      if (!Component) {
        return loadingChildren;
      }

      return (
        <div
          className={cn({
            'md-cross-fade-enter': enter,
            'md-cross-fade-enter-active': enter && active,
          })}
        >
          <Component {...this.props} />
        </div>
      );
    }
  };
}
