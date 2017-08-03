import React, { PureComponent } from 'react';

import './_styles.scss';
import Reset from './Reset';
import ToolbarWithBadge from './ToolbarWithBadge';

const unsplash = 'https://unsplash.it/100?image=';

const NOTIFICATIONS = [{
  id: 'fake-google-notification-1',
  image: `${unsplash}1027`,
  alt: 'A lady from unsplash.it',
  message: 'Emilia Kristensen shared an image with you.',
}, {
  id: 'fake-google-notification-2',
  image: `${unsplash}1025`,
  alt: 'A pug in a blanket',
  message: 'Scot Dixon did something amazing. Why don\'t you check it out?',
}, {
  id: 'fake-google-notification-3',
  image: `${unsplash}1011`,
  alt: 'A lady in a canoe',
  message: 'Candida Salomon went canoeing. Check out the pictures they uploaded!',
}, {
  id: 'fake-google-notification-4',
  image: `${unsplash}903`,
  alt: 'A pretty moon',
  message: 'You won\'t believe these 5 things about some random planet!',
}, {
  id: 'fake-google-notification-5',
  image: `${unsplash}883`,
  alt: 'A guy with clouds in the background',
  message: 'Clouds. Clouds. Clouds. I\'m out of dummy data ideas.',
}];

export default class Notifications extends PureComponent {
  state = { notifications: NOTIFICATIONS };

  reset = (e) => {
    const l = this.state.notifications.length;
    if (l !== NOTIFICATIONS.length) {
      // Don't propagate to close dialog listener
      e.stopPropagation();
      this.setState({ notifications: NOTIFICATIONS });
    }
  };

  dismiss = (index) => {
    const notifications = this.state.notifications.slice();
    notifications.splice(index, 1);
    this.setState({ notifications });
  };

  render() {
    const { notifications } = this.state;
    return (
      <div className="badges__notifications">
        <Reset onClick={this.reset} />
        <ToolbarWithBadge notifications={notifications} onDismiss={this.dismiss} />
      </div>
    );
  }
}
