import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `CardMedia` component is used to display images or some sort
 * media.
 *
 * The media can be forced to be 1:1 aspect ratio or a 16:9 aspect ratio.
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
    aspectRatio: PropTypes.oneOf([CardMedia.aspect.equal, CardMedia.aspect.wide]).isRequired,

    /**
     * Boolean if this component should be expandable when there is a `CardExpander`
     * above it in the `Card`.
     */
    expandable: PropTypes.bool,
  };

  static defaultProps = {
    forceAspect: true,
    aspectRatio: CardMedia.aspect.wide,
  };

  render() {
    const { className, overlay, children, forceAspect, aspectRatio, ...props } = this.props;
    delete props.expandable;

    return (
      <section
        {...props}
        className={cn('md-card-media', className, {
          [`md-media-${aspectRatio}`]: forceAspect,
        })}
      >
        {children}
        {overlay && <div className="md-card-media-overlay">{overlay}</div>}
      </section>
    );
  }
}
