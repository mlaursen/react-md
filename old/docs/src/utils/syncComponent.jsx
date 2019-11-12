import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default function syncComponent(chunkName, module) {
  const Component = module.default ? module.default : module;

  return class SyncComponent extends PureComponent {
    static propTypes = {
      staticContext: PropTypes.shape({
        bundles: PropTypes.arrayOf(PropTypes.string),
      }),
    };

    /**
     * This is only here for development purposes. Needs to match the API of the
     * asyncComponent.
     */
    static loadComponent() {
      return Component;
    }

    componentWillMount() {
      const { staticContext } = this.props;
      if (staticContext && staticContext.bundles) {
        staticContext.bundles.push(chunkName);
      } else if (!__CLIENT__) {
        throw new Error(
          `The \`staticContext\` was not defined for the synchronous route's chunk \`${chunkName}\`.` +
          'This means that the synchronous component is not a direct child of a Route component. ' +
          'This can happen if the route has multiple components that could be rendered. Update ' +
          'the component to also provide the `staticContext` prop.'
        );
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}
