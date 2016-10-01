import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons';

export default class FullPageDemo extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { isOpen: false, pageX: null, pageY: null };
  }

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
      <Button
        icon
        onClick={this._close}
        className={cn({ 'md-toolbar-item margin-left-auto': onClick })}
      >
        close
      </Button>
    );
    return (
      <div>
        <Button raised label={`Launch ${title}`} onClick={this._launch} />
        <Dialog
          isOpen={isOpen}
          pageX={pageX}
          pageY={pageY}
          title={title}
          close={this._close}
          actionLeft={onClick ? <Button icon onClick={onClick}>menu</Button> : close}
          actionRight={onClick ? close : null}
        >
          {children}
        </Dialog>
      </div>
    );
  }
}
