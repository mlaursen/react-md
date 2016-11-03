/* eslint-env jest*/
import React from 'react';

export default jest.fn(ComposedComponent =>
  class InkedComonent extends React.Component {
    createInk() {
    }

    getComposedComponent() {
      return this;
    }

    render() {
      const { ...props } = this.props;
      delete props.inkStyle;
      delete props.inkClassName;
      delete props.inkContainerStyle;
      delete props.inkContainerClassName;
      delete props.inkDisabled;
      delete props.inkTransitionOverlap;
      delete props.inkTransitionEnterTimeout;
      delete props.inkTransitionLeaveTimeout;
      delete props.waitForInkTransition;
      delete props.disabledInteractions;

      return <ComposedComponent {...props} />;
    }
  }
);
