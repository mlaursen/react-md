import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import { setDrawerToolbarBoxShadow } from 'actions/ui';
import Home from 'components/Home';

@connect(({ ui: { drawer: { visibleBoxShadow } } }) => ({ visibleBoxShadow }), {
  updateToolbar: setDrawerToolbarBoxShadow,
})
export default class HomeContainer extends PureComponent {
  static propTypes = {
    visibleBoxShadow: PropTypes.bool.isRequired,
    updateToolbar: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this._updateToolbar();
    window.addEventListener('scroll', this._updateToolbar);
  }

  componentWillUnmount() {
    this.props.updateToolbar(true);
    window.removeEventListener('scroll', this._updateToolbar);
  }

  _setBannderHeight = (home) => {
    if (!home) {
      return;
    }

    this._bannerHeight = Math.max(findDOMNode(home).querySelector('.banner').offsetHeight, 400);
  };

  _updateToolbar = () => {
    const { visibleBoxShadow, updateToolbar } = this.props;

    const scrollDistance = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    const visible = scrollDistance > this._bannerHeight;
    if (visible !== visibleBoxShadow) {
      updateToolbar(visible);
    }
  };

  render() {
    return <Home ref={this._setBannderHeight} />;
  }
}
