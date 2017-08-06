import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import CardTitle from 'react-md/lib/Cards/CardTitle';

import { createMessage } from 'state/messages';

@connect(null, { createMessage })
export default class Title extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createMessage: PropTypes.func.isRequired,

    // This is only required because of how the Card reads the prop types for this to work.
    expander: PropTypes.bool,
  };

  static defaultProps = {
    expander: true,
  };

  state = { visible: false };

  setArea = (area) => {
    this.area = area;
  };

  copy = () => {
    const { createMessage } = this.props;
    try {
      this.area.select();
      const success = document.execCommand('copy');
      if (!success) {
        throw new Error('Unable to copy.');
      }

      createMessage('Example link copied. You can now link to this example by pasting from the keyboard.');
    } catch (e) {
      createMessage(e.message);
    }
  };

  handleMouseEnter = () => {
    if (!this.state.visible) {
      this.setState({ visible: true });
    }
  };

  handleMouseLeave = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { id, title, expander } = this.props;

    return (
      <CardTitle title={title} expander={expander} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <textarea
          id={`${id}-copy-area`}
          ref={this.setArea}
          readOnly
          tabIndex={-1}
          aria-hidden
          className="examples-page__example-link"
          value={`${location.href}#${id}`}
        />
        <Button
          id={`${id}-copy-btn`}
          icon
          onClick={this.copy}
          className={cn('examples-page__example-link-btn', {
            'examples-page__example-link-btn--active': visible,
          })}
        >
          link
        </Button>
      </CardTitle>
    );
  }
}
