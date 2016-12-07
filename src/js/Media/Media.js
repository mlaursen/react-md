import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

function validateAspectRatio(props, propName, component, ...args) {
  const value = props[propName];
  let err = PropTypes.string.isRequired(props, propName, component, ...args);
  if (!err && value.split('-').length !== 2) {
    err = new Error(
      `Your provided an \`${propName}\` prop to the ${component} that is not a valid ` +
      `aspect ratio \`${value}\`. This should be in the form of '{width}-{height}'.`
    );
  }

  return err;
}

/**
 * The `Media` component is used to display images, iframes, ...media. Who'da thunk?
 */
export default class Media extends PureComponent {
  static propTypes = {
    /**
     * An optional className to apply to the card media component.
     */
    className: PropTypes.string,

    /**
     * Any media to display.
     */
    children: PropTypes.node,

    /**
     * Boolean if the aspect ratio should be forced.
     */
    forceAspect: PropTypes.bool,

    /**
     * The aspect ratio to use.
     */
    aspectRatio: validateAspectRatio,

    /**
     * Boolean if this component should be expandable when there is a `CardExpander`
     * above it in the `Card`.
     */
    expandable: PropTypes.bool,

    /**
     * The component to render the card media as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
  };

  static defaultProps = {
    forceAspect: true,
    aspectRatio: '16-9',
    component: 'section',
  };

  render() {
    const {
      component: Component,
      className,
      children,
      forceAspect,
      aspectRatio,
      ...props
    } = this.props;
    delete props.expandable;

    return (
      <Component
        {...props}
        className={cn('md-media', {
          [`md-media--${aspectRatio}`]: forceAspect,
        }, className)}
      >
        {children}
      </Component>
    );
  }
}
