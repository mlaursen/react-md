import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class CardTitleBlock extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node,
    avatar: PropTypes.bool,
  };

  render() {
    const { id, subtitle, avatar } = this.props;
    let { title } = this.props;
    title = (
      <h2
        id={id}
        className={cn('md-card-title--title md-text', {
          'md-card-title--large': !avatar,
        })}
      >
        {title}
      </h2>
    );

    if (!subtitle) {
      return title;
    }

    return (
      <div className="md-card-title--title-block">
        {title}
        <h3 className="md-card-title--title md-text--secondary">{subtitle}</h3>
      </div>
    );
  }
}
