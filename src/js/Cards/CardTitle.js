import React, { Component, PropTypes, Children, cloneElement } from 'react';
import cn from 'classnames';

import CardTitleBlock from './CardTitleBlock';
import CardExpander from './CardExpander';

export default class CardTitle extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    avatar: PropTypes.element,
    isExpander: PropTypes.bool,
  };

  render() {
    const {
      id,
      title,
      subtitle,
      className,
      isExpander,
      children,
    } = this.props;
    let { avatar } = this.props;
    if (avatar) {
      const { className: avatarClassName } = Children.only(avatar).props;
      avatar = cloneElement(avatar, {
        className: cn('md-avatar--card', avatarClassName),
      });
    }
    return (
      <div
        className={cn('md-card-title', {
          'md-card-title--primary': !avatar,
        }, className)}
      >
        {avatar}
        <CardTitleBlock id={id} title={title} subtitle={subtitle} avatar={!!avatar} />
        {children}
        {isExpander && <CardExpander />}
      </div>
    );
  }
}
