import React, { PureComponent } from 'react';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import PhoneEmulator from 'components/PhoneEmulator';

import './_styles.scss';
import PhotoList from './PhotoList';
import PhotoDrawer from './PhotoDrawer';

const title = [
  <span key="photos" className="drawers__content__title--hack">Photos &gt;</span>,
  'Beach',
];

const actions = [
  <Button key="search" icon>search</Button>,
  <Button key="windows?" icon>view_module</Button>,
];


export default class DrawerWithContent extends PureComponent {
  state = {
    items: [],
    drawerVisible: false,
    error: false,
    selected: undefined,
  };

  componentDidMount() {
    fetch('https://unsplash.it/list')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }).then((json) => {
        this.setState({ items: json.slice(5, 15), fetching: false });
      }).catch(() => {
        this.setState({ error: true, fetching: false });
      });
  }

  selectPhoto = (photo) => {
    this.setState({ selected: photo, drawerVisible: true });
  };

  handleVisibility = (drawerVisible) => {
    this.setState({ drawerVisible });
  };

  render() {
    const { items, fetching, error, drawerVisible, selected } = this.state;

    let errorMsg;
    let progress;
    if (fetching) {
      progress = <LinearProgress id="loading-image-list" key="progress" />;
    }

    if (error) {
      errorMsg = (
        <h3 key="error" className="md-text-container md-cell md-cell--12">
          It looks like the <a href="https://unsplash.it/list">https://unsplash.it/list</a> is currently
          down. Please try to view this demo again later once it has revived.
        </h3>
      );
    }

    return (
      <PhoneEmulator
        toolbarTitle={title}
        toolbarActions={actions}
        toolbarProminentTitle
        transitionContent
        contentClassName={cn({ 'md-grid': error })}
      >
        {progress}
        {errorMsg}
        <PhotoList items={items} onItemClick={this.selectPhoto} fetching={fetching} />
        <PhotoDrawer visible={drawerVisible} onVisibilityChange={this.handleVisibility} photo={selected} />
      </PhoneEmulator>
    );
  }
}
