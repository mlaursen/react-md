import React, { PureComponent } from 'react';
import { BottomNavigation, FontIcon } from 'react-md';

import Recent from './Recent';
import Favorites from './Favorites';
import Nearby from './Nearby';
import PhoneEmulator from 'components/PhoneEmulator';

const links = [{
  label: 'Recent',
  icon: <FontIcon>access_time</FontIcon>,
}, {
  label: 'Favorites',
  icon: <FontIcon>favorite</FontIcon>,
}, {
  label: 'Nearby',
  icon: <FontIcon>place</FontIcon>,
}];

export default class Fixed extends PureComponent {
  state = { title: links[0].label, children: <Recent /> };

  handleNavChange = (activeIndex) => {
    const title = links[activeIndex].label;
    let children;
    switch (activeIndex) {
      case 1:
        children = <Favorites key="favorites" />;
        break;
      case 2:
        children = <Nearby key="nearby" />;
        break;
      default:
        children = <Recent key="recent" />;
    }

    this.setState({ title, children });
  };

  render() {
    const { title, children } = this.state;

    return (
      <PhoneEmulator contentClassName="md-bottom-navigation-offset" toolbarTitle={title} transitionContent>
        {children}
        <BottomNavigation links={links} dynamic={false} onNavChange={this.handleNavChange} />
      </PhoneEmulator>
    );
  }
}
