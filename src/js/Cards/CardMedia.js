import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import deprecated from 'react-prop-types/lib/deprecated';
import componentDeprecated from '../utils/PropTypes/componentDeprecated';
import Media from '../Media/Media';
import MediaOverlay from '../Media/MediaOverlay';

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
    overlay: deprecated(PropTypes.node, 'Use the `MediaOverlay` component as a child instead'),

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

    /**
     * The component to render the card media as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    deprecated: componentDeprecated(
      'There were no unique styles for media in cards so it is simpler to just use the ' +
      '`Media` component.'
    ),
  };

  static defaultProps = {
    forceAspect: true,
    aspectRatio: CardMedia.aspect.wide,
    component: 'section',
  };

  render() {
    const {
      className,
      children,
      ...props
    } = this.props;
    delete props.overlay;

    let { overlay } = this.props;
    if (overlay) {
      overlay = <MediaOverlay>{overlay}</MediaOverlay>;
    }

    return (
      <Media className={cn('md-card-media', className)} {...props}>
        {children}
        {overlay}
      </Media>
    );
  }
}
