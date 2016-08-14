import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setToolbarInactive } from 'actions/ui';
import Home from 'components/Home';

@connect(({ ui: { drawer } }) => ({ inactive: drawer.inactive }), { setToolbarInactive })
export default class HomeContainer extends PureComponent {
  static propTypes = {
    inactive: PropTypes.bool.isRequired,
    setToolbarInactive: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this._updateToolbar();
    window.addEventListener('scroll', this._updateToolbar);
  }

  componentWillUnmount() {
    this.props.setToolbarInactive(false);
    window.removeEventListener('scroll', this._updateToolbar);
  }

  _updateToolbar = () => {
    const { inactive, setToolbarInactive } = this.props;
    const scrollDistance = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    if (!this._bannerHeight) {
      this._bannerHeight = document.querySelector('.banner').offsetHeight;
    }

    const nowInactive = scrollDistance < this._bannerHeight;
    if (nowInactive !== inactive) {
      setToolbarInactive(nowInactive);
    }
  };

  render() {
    return (
      <Home />
    );
  }
}
