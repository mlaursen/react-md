import React, { Component, PropTypes, Children, cloneElement } from 'react';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import CardTitleBlock from './CardTitleBlock';
import CardExpander from './CardExpander';

/**
 * The `CardTitle` component is used to render a title in a Card along
 * with an optional subtitle or avatar.
 */
export default class CardTitle extends Component {
  static propTypes = {
    /**
     * An optional id to add to the `title`.
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The title to display.
     */
    title: PropTypes.node.isRequired,

    /**
     * An optional subtitle to display.
     */
    subtitle: PropTypes.node,

    /**
     * Any additional children to display in the title block
     * after the avatar, title, and subtitle.
     */
    children: PropTypes.node,

    /**
     * An optional avatar to display before the title and subtitle.
     */
    avatar: PropTypes.element,

    /**
     * Boolean if the `CardTitle` component should inject a button
     * for expanding all children below it.
     */
    expander: PropTypes.bool,

    isExpander: deprecated(PropTypes.bool, 'Use `expander` instead'),
  };

  render() {
    const {
      id,
      style,
      className,
      title,
      subtitle,
      expander,
      isExpander,
      children,
      ...props
    } = this.props;
    delete props.avatar;
    let { avatar } = this.props;
    if (avatar) {
      const { className: avatarClassName } = Children.only(avatar).props;
      avatar = cloneElement(avatar, {
        className: cn('md-avatar--card', avatarClassName),
      });
    }
    return (
      <div
        {...props}
        style={style}
        className={cn('md-card-title', {
          'md-card-title--primary': !avatar,
        }, className)}
      >
        {avatar}
        <CardTitleBlock id={id} title={title} subtitle={subtitle} avatar={!!avatar} />
        {children}
        {isExpander || expander && <CardExpander />}
      </div>
    );
  }
}
