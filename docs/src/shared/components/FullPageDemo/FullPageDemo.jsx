import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Dialog from 'react-md/lib/Dialogs';
import { RaisedButton, IconButton } from 'react-md/lib/Buttons';

export default class FullPageDemo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpen: false, pageX: null, pageY: null };
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  _launch = (e) => {
    const { pageX, pageY } = e.changedTouches ? e.changedTouches[0] : e;

    this.setState({ isOpen: true, pageX, pageY });
  };

  _close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, pageX, pageY } = this.state;
    const { title, onClick, children } = this.props;

    const close = (
      <IconButton
        onClick={this._close}
        className={cn({ 'md-toolbar-item margin-left-auto': onClick })}
      >
        close
      </IconButton>
    );
    return (
      <div>
        <RaisedButton label={`Launch ${title}`} onClick={this._launch} />
        <Dialog
          isOpen={isOpen}
          pageX={pageX}
          pageY={pageY}
          title={title}
          close={this._close}
          actionLeft={onClick ? <IconButton onClick={onClick}>menu</IconButton> : close}
          actionRight={onClick ? close : null}
        >
          {children}
        </Dialog>
      </div>
    );
  }
}
