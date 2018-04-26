import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';

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
        className={cn('md-card-title--title', {
          'md-card-title--large': !avatar,
        }, themeColors({ text: true }))}
        tabIndex={id ? -1 : null}
      >
        {title}
      </h2>
    );

    if (!subtitle) {
      return title;
    }

    return (
      <div
        className={cn('md-card-title--title-block', {
          'md-card-title--one-line': avatar,
        })}
      >
        {title}
        <h3 className={`md-card-title--title ${themeColors({ hint: true })}`}>{subtitle}</h3>
      </div>
    );
  }
}
