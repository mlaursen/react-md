import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import './_flexible.scss';
import aliConnors from './ali-connors.jpg';
import ToolbarMenu from './ToolbarMenu';
import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import CloseButton from 'components/PhoneSizeDemo/ClosePhoneSizeDemoButton';
import AliConnorsContact from './AliConnorsContact';

const STATUS_BAR_HEIGHT = 24;
const MOBILE_TOOLBAR_HEIGHT = 56;
const FONT_SIZE_TRANSITION_POINT = 120;
const SCALE_TRANSITION_POINT = 80;
const FONT_SIZE_SCALE = FONT_SIZE_TRANSITION_POINT - MOBILE_TOOLBAR_HEIGHT;
const TITLE_FONT_SIZE = 20;
const BIGGER_TITLE_FONT_SIZE = 28;
const TITLE_FONT_SIZE_DIFFERENCE = BIGGER_TITLE_FONT_SIZE - TITLE_FONT_SIZE;
const IMG_HEIGHT = 270;

const ACTIONS = [
  <Button key="edit" icon>edit</Button>,
  <ToolbarMenu key="menu" />,
];


/* ================================================================ */
/* Welp.. Sort of hacked together. Would be nice to work into Toolbar
 * component itself, but scroll jacking and images and whatnot seems
 * like a lot of work to handle for one person. And this only works
 * for mousewheel atm. The example only works with mouse wheel and
 * touch events since... lazy.
 */
export default class FlexibleSpaceExample extends PureComponent {
  state = { height: IMG_HEIGHT };

  _setSection = (section) => {
    this._section = section;
  };

  _setContainer = (container) => {
    this._container = findDOMNode(container);
    if (this._container !== null) {
      this.setState({ statusBar: !!document.querySelector('.phone-status-bar') });
    }
  };

  _updateHeight = (nextAmt) => {
    const height = Math.min(
      IMG_HEIGHT,
      Math.max(MOBILE_TOOLBAR_HEIGHT, this.state.height + nextAmt)
    );

    let fontSize;
    const remainingDistance = height - MOBILE_TOOLBAR_HEIGHT;
    if (height < FONT_SIZE_TRANSITION_POINT && height !== MOBILE_TOOLBAR_HEIGHT) {
      fontSize = Math.max(
        TITLE_FONT_SIZE,
        TITLE_FONT_SIZE + (TITLE_FONT_SIZE_DIFFERENCE / FONT_SIZE_SCALE * remainingDistance)
      );
    } else if (height > FONT_SIZE_TRANSITION_POINT) {
      fontSize = undefined;
    }

    let { btnTransform, imgOpacity } = this.state;
    if (height < SCALE_TRANSITION_POINT && height !== MOBILE_TOOLBAR_HEIGHT) {
      const scale = remainingDistance / (SCALE_TRANSITION_POINT - MOBILE_TOOLBAR_HEIGHT);
      btnTransform = `scale(${scale})`;
      imgOpacity = scale;
    } else if (height >= SCALE_TRANSITION_POINT) {
      btnTransform = undefined;
      imgOpacity = undefined;
    } else if (height === MOBILE_TOOLBAR_HEIGHT) {
      btnTransform = 'scale(0)';
      imgOpacity = 0;
    }

    if (this._touchY) {
      this.setState({ height, fontSize, btnTransform, imgOpacity });
    } else if (!this._ticking) {
      // Throttle events a bit
      requestAnimationFrame(() => {
        this._ticking = false;
        this.setState({ height, fontSize, btnTransform, imgOpacity });
      });
    }

    this._ticking = true;
  };

  _handleWheel = (e) => {
    if (!this._container || !this._container.contains(e.target)) {
      return;
    }

    // Be lazy and prevent any scrolling while mouseover here
    e.preventDefault();
    let { deltaY } = e;

    // deltaMode of 0 means distance in px
    // deltaMode of 1 means in lines
    if (e.deltaMode === 1) {
      // Just multiply by line height
      deltaY *= 1.42857;
    }

    deltaY *= (-1);

    this._updateHeight(deltaY);
  };

  _handleTouchStart = (e) => {
    if (!this._section || !this._section.contains(e.target)) {
      return;
    }

    const { clientY } = e.changedTouches[0];
    this._touched = true;
    this._touchY = clientY;
  };

  _handleTouchMove = (e) => {
    if (!this._touched) {
      return;
    }

    e.preventDefault();

    const { clientY } = e.changedTouches[0];
    const diff = (clientY - this._touchY);
    this._touchY = clientY;
    this._updateHeight(diff);
  };

  _handleTouchEnd = () => {
    this._touched = false;
  };

  render() {
    const { height, fontSize, btnTransform, imgOpacity, statusBar } = this.state;

    const title = (
      <h2
        key="title"
        className={cn({
          'moving-title': height !== MOBILE_TOOLBAR_HEIGHT,
          'moving-title--absolute': height !== MOBILE_TOOLBAR_HEIGHT,
        })}
        style={{ fontSize }}
      >
        Ali Connors
      </h2>
    );

    return (
      <PhoneSizeDemo
        ref={this._setContainer}
        onWheel={this._handleWheel}
        onTouchStart={this._handleTouchStart}
        onTouchMove={this._handleTouchMove}
        toolbar={false}
        contentStyle={{ overflowY: 'initial' }}
      >
        <Toolbar
          colored
          title={title}
          nav={<CloseButton icon />}
          actions={ACTIONS}
          fixed
          style={{ height }}
          className="flexible-toolbar-example"
        >
          <div className="flexible-toolbar-img-container">
            <img
              key="img"
              className="flexible-toolbar-img"
              src={aliConnors}
              alt="Ali Connors"
              style={{ opacity: imgOpacity }}
            />
          </div>
        </Toolbar>
        <Button
          key="fixed"
          secondary
          floating
          fixed
          fixedPosition="tr"
          style={{
            top: height - (statusBar ? 0 : 24),
            WebkitTransform: btnTransform,
            MozTransform: btnTransform,
            msTransform: btnTransform,
            transform: btnTransform,
          }}
        >
          star
        </Button>
        <section
          style={{
            marginTop: height + (statusBar ? STATUS_BAR_HEIGHT : 0),
            height: `calc(100% - ${height}px)`,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
          className="phone-size-content"
          ref={this._setSection}
        >
          <AliConnorsContact />
        </section>
      </PhoneSizeDemo>
    );
  }
}
