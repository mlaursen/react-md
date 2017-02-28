import React, { PureComponent } from 'react';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import Layover from 'react-md/lib/Helpers/Layover';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import Markdown from 'components/Markdown';

import './_layovers.scss';
import PlaygroundForm from './PlaygroundForm';

const defaultTitle = 'Hello, World!';
const defaultText = `### Amazing Markdown

Would you believe it?!`;

export default class LayoverPlayground extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: defaultTitle,
      text: defaultText,
      contents: 'list',
      centered: false,
      'anchor-x': Layover.defaultProps.anchor.x,
      'anchor-y': Layover.defaultProps.anchor.y,
      visible: false,
      closeOnOutsideClick: true,
      horizontal: false,
      vertical: false,
      sameWidth: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this._playground || !this._wrapper || !this._button) {
      return;
    }

    const { vertical, horizontal } = this.state;
    if (vertical && vertical !== prevState.vertical) {
      const height = parseInt(window.getComputedStyle(this._playground).height, 10);
      this._wrapper.scrollTop = (height / 2) - (this._wrapper.offsetHeight / 2) + (this._button.offsetHeight / 2);
    } else if (horizontal && horizontal !== prevState.horizontal) {
      const width = parseInt(window.getComputedStyle(this._playground).width, 10);
      this._wrapper.scrollLeft = (width / 2) + (this._wrapper.offsetWidth / 2) - (this._button.offsetWidth / 2);
    }
  }

  _toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  _close = () => {
    this.setState({ visible: false });
  };

  _handleChange = (e) => {
    const { id, checked, value, name, type } = e.target;
    if (value === 'on' || value === 'off' || !name) {
      let v = type === 'checkbox' ? checked : value;
      if (id === 'maxWidth') {
        v = parseInt(v, 10);
      }

      this.setState({ [id]: v });
    } else {
      this.setState({ [name]: value });
    }
  };

  _setWrapper = (wrapper) => {
    this._wrapper = wrapper;
    this._playground = wrapper && wrapper.querySelector('.layover-playground');
    this._button = wrapper && wrapper.querySelector('.md-btn');
  };

  render() {
    const {
      visible,
      centered,
      contents,
      title,
      text,
      horizontal,
      vertical,
      closeOnOutsideClick,
      maxWidth,
      sameWidth,
      'anchor-x': anchorX,
      'anchor-y': anchorY,
    } = this.state;
    const toggle = <Button style={{ whiteSpace: 'nowrap' }} onClick={this._toggle} label="Toggle Layover" raised primary />;

    let children;
    switch (contents) {
      case 'list':
        children = (
          <List className="md-paper md-paper--1 md-list--menu" {...this.props}>
            <ListItem primaryText="Item 1" />
            <ListItem primaryText="Item 2" />
            <ListItem primaryText="Item 3" />
            <ListItem primaryText="Item 4" />
            <ListItem primaryText="Item 5" />
            <ListItem primaryText="Item 6" />
            <ListItem primaryText="Item 7" />
            <ListItem primaryText="Item 8" />
            <ListItem primaryText="Item 9" />
            <ListItem primaryText="Item 10" />
          </List>
        );
        break;
      case 'card':
        children = (
          <Card style={{ maxWidth }}>
            <CardTitle title={title} />
            <Markdown component={CardText} markdown={text} />
          </Card>
        );
        break;
      default:
        children = null;
    }

    const block = horizontal ? <div className="layover-playground__horizontal-block" /> : null;
    const prefix = 'layover-playground__';
    const className = cn('layover-playground', {
      [`${prefix}horizontal`]: horizontal,
      [`${prefix}vertical`]: vertical,
    });
    return (
      <div style={{ marginTop: 200 }}>
        <div className="layover-playground-wrapper md-background" ref={this._setWrapper}>
          <div className={className}>
            {block}
            <Layover
              visible={visible}
              toggle={toggle}
              centered={centered}
              anchor={{ x: anchorX, y: anchorY }}
              className={cn({ 'md-centered-block': !horizontal })}
              fixedTo={vertical || horizontal ? this._wrapper : undefined}
              onClose={this._close}
              closeOnOutsideClick={closeOnOutsideClick}
              sameWidth={sameWidth}
            >
              {children}
            </Layover>
            {block}
          </div>
        </div>
        <PlaygroundForm onChange={this._handleChange} defaultTitle={defaultTitle} defaultText={defaultText} card={contents === 'card'} />
      </div>
    );
  }
}
