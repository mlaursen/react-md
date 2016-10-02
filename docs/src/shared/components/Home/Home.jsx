import React, { PureComponent } from 'react';

import './_home.scss';
import Banner from './Banner';
import GettingStarted from './GettingStarted';

export default class Home extends PureComponent {
  render() {
    return (
      <main className="home">
        <Banner />
        <section className="md-grid">
          <p className="about md-text-container md-title">
            This project's goal is to be able to quickly style and set up a material
            design react website through sass and css instead of inline styling. This
            is a web based library and not meant to be used with React Native.
          </p>
        </section>
        <GettingStarted />
      </main>
    );
  }
}
