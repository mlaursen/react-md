import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { RaisedButton } from '../../../src/js';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.appBar = null;
  }

  static propTypes = {
    history: PropTypes.object, // from react-router
  }

  componentDidMount() {
    this.appBar = document.querySelector('.react-md-app-bar');
    this.appBar.classList.add('no-shadow');
    window.addEventListener('scroll', this.updateAppBar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateAppBar);
    this.appBar.classList.remove('no-shadow');
  }

  updateAppBar = () => {
    const isEnabled = window.scrollY < 600;
    const isClassed = this.appBar.classList.contains('no-shadow');
    if(isEnabled && !isClassed) {
      this.appBar.classList.add('no-shadow');
    } else if(!isEnabled && isClassed) {
      this.appBar.classList.remove('no-shadow');
    }
  }

  viewDemo = () => {
    setTimeout(() => { this.props.history.pushState(null, '/buttons'); }, 150);
  }

  render() {
    return (
      <div className="react-md-home">
        <section className="react-md-banner">
          <h1 className="md-display-2">react-md</h1>
          <h4 className="md-title">Material Design inspired React components built upon using scss/css instead of component styles.</h4>
          <RaisedButton onClick={this.viewDemo} secondary>Demo</RaisedButton>
        </section>
        <section className="react-md-about">
        </section>
        <section className=""></section>
      </div>
    );
  }
}
