import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import { updateMedia } from 'state/media';

const helmetConfig = {
  htmlAttributes: { lang: 'en' },
  defaultTitle: 'react-md',
  titleTemplate: '%s - react-md',
  meta: [{
    name: 'description',
    content: 'Google\'s Material Design UI Components built with accessibility in mind, Sass, And React.',
  }, {
    name: 'keywords',
    content: 'react-md,material design,react,components,material ui',
  }],
  link: [{
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700|Material+Icons',
  }, {
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css',
  }],
};

@connect(({ media: { defaultMedia } }) => ({ defaultMedia }))
export default class App extends PureComponent {
  static propTypes = {
    defaultMedia: PropTypes.string.isRequired,

    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  updateMedia = (drawerType, media) => {
    this.props.dispatch(updateMedia(drawerType, media));
  };

  render() {
    const { defaultMedia } = this.props;
    return (
      <NavigationDrawer
        drawerTitle="react-md"
        toolbarTitle="Woop"
        defaultMedia={defaultMedia}
        onMediaTypeChange={this.updateMedia}
      >
        <Helmet {...helmetConfig} />
        <h1>Hello, world!</h1>
      </NavigationDrawer>
    );
  }
}
