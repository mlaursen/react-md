import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { RaisedButton } from 'react-md';

import './_home.scss';
import * as components from '../components';

const firstLink = Object.keys(components)[0].split(/(?=[A-Z])/).join('-').toLowerCase();

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    history: PropTypes.object, // from react-router
  };

  componentDidMount() {
    this.appBar = document.querySelector('.react-md-docs-app-bar');
    this.appBar.classList.add('no-shadow');
    window.addEventListener('scroll', this.updateAppBar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateAppBar);
    this.appBar.classList.remove('home-page');
  }

  updateAppBar = () => {
    const isEnabled = window.scrollY < 600;
    const isClassed = this.appBar.classList.contains('no-shadow');
    if(isEnabled && !isClassed) {
      this.appBar.classList.add('no-shadow');
    } else if(!isEnabled && isClassed) {
      this.appBar.classList.remove('no-shadow');
    }
  };

  viewDemo = () => {
    this.props.history.pushState(null, `/${firstLink}`);
  };

  render() {
    return (
      <div className="home">
        <section className="banner">
          <h1 className="md-display-2">react-md</h1>
          <h4 className="md-title">Material Design inspired React components built with sass</h4>
          <RaisedButton onClick={this.viewDemo} secondary label="Demo" />
        </section>
        <section className="about">
        </section>
        <section className="getting-started">
        </section>
      </div>
    );
  }
}
