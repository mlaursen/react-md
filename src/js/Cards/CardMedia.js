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
 * The `CardMedia` component is used to display images or some sort
 * media.
 */
export default class CardMedia extends PureComponent {
  static aspect = {
    equal: '1-1',
    wide: '16-9',
  };

  static propTypes = {
    /**
     * An optional className to apply to the card media component.
     */
    className: PropTypes.string,

    /**
     * An optional overlay component to be rendered over the media. This *should*
     * be A `CardTitle`, `CardActions` or both.
     */
    overlay: PropTypes.node,

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
      overlay,
      children,
      forceAspect,
      aspectRatio,
      ...props,
    } = this.props;
    delete props.expandable;

    return (
      <Component
        {...props}
        className={cn('md-media', className, {
          [`md-media--${aspectRatio}`]: forceAspect,
        })}
      >
        {children}
        {overlay && <div className="md-media-overlay">{overlay}</div>}
      </Component>
    );
  }
}
