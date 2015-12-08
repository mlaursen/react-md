import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { fuzzyFilter } from '../../../src/js/utils/PropUtils';
import { FontIcon, Avatar } from '../../../src/js';

import * as components from '../components';
const componentLinks = Object.keys(components).map(k => {
  const c = components[k];
  if(!c.name) {
    return;
  }

  const name = c.name.replace('Doc', '').split(/(?=[A-Z])/);

  return {
    link: name.map(c => c.toLowerCase()).join('-'),
    label: name.join(' '),
  };
}).filter(c => !!c);
const mainLinks = [{ link: '', label: 'Home', leftIcon: <FontIcon>home</FontIcon> }];


const OutsideLink = ({ children, className, ...props }) => <a href="sassdoc" className={`md-list-tile ${className}`} {...props}>{children}</a>;
const sublinks = [{
  component: OutsideLink,
  primaryText: 'SASS Doc',
  key: 'sassdoc',
  leftIcon: <Avatar src="http://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png" alt="Sass icon" />,
}, {
  divider: true,
  key: 'main-divider',
}, {
  subheader: true,
  primaryText: 'Components',
  key: components,
}];

import { AppBar, IconButton, Sidebar } from '../../../src/js/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isNavOpen: props.location.pathname !== '/', filteredLinks: componentLinks };
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object, // from react-router
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.location.pathname === nextProps.location.pathname) {
      return;
    }

    if(nextProps.location.pathname === '/' && nextState.isNavOpen) {
      this.setState({ isNavOpen: false });
    } else if(nextProps.location.pathname !== '/' && !nextState.isNavOpen){
      this.setState({ isNavOpen: true });
    }
  }

  toggleSidebar = () => {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  filterLinks = (e) => {
    this.setState({ filteredLinks: fuzzyFilter(componentLinks, e.target.value, 'label') });
  }

  toRouterLink = ({ link, label, ...props }) => {
    return {
      component: Link,
      className: `/${link}` === this.props.location.pathname ? 'active' : null,
      to: `/${link}`,
      primaryText: label,
      key: link,
      ...props,
    };
  }

  render() {
    return (
      <div className="react-md">
        <AppBar
          title="react md"
          className="react-md-app-bar"
          leftNode={<IconButton onClick={this.toggleSidebar}>menu</IconButton>}
          rightNode={<IconButton href="https://github.com/mlaursen/react-md" iconClassName="fa fa-github" />}
        />
        <Sidebar
          isOpen={this.state.isNavOpen}
          items={mainLinks.map(this.toRouterLink).concat(sublinks).concat(this.state.filteredLinks.map(this.toRouterLink))}
        />
        <main className={this.props.location.pathname === '/' ? 'react-md-home-container' : null}>
          {this.props.children}
          {/*
          <section className="avatar-section">
            <Paper>
              <Avatar src="http://lorempixel.com/120/120/people" alt="some image" />
              <Avatar icon={<FontIcon iconClassName="fa fa-hand-spock-o" />} />
              <Avatar icon={<FontIcon iconClassName="fa fa-rocket" />} random />
              <Avatar>M</Avatar>
              <Avatar random>O</Avatar>
              <Avatar color={2}>X</Avatar>
            </Paper>
          </section>
          <section className="card-section">
            <Card isExpandable={true}>
              <CardTitle avatar={<Avatar src="http://lorempixel.com/120/120/people" alt="some image" />} title="Title goes here" subtitle="Subtitle here" />
              <CardMedia overlay={<CardTitle title="Some nature shit" subtitle="So wow" />}>
                <img src="http://lorempixel.com/600/337/nature" />
              </CardMedia>
              <CardActions isExpander={true}>
                <FlatButton default>Action 1</FlatButton>
                <FlatButton default>Action 2</FlatButton>
              </CardActions>
              <CardText expandable={true}>
                <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
                <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
                <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
                <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
                <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
              </CardText>
            </Card>
            <div className="card-grid">
              <Card>
                <CardMedia aspectRatio="1:1" overlay={<CardActionOverlay title="Title goes here" subtitle="Subtitle goes here" actions={[{ children: 'Action 1' }, { children: 'Action 2' }]} />}>
                  <img src="http://lorempixel.com/300/300/nature" />
                </CardMedia>
              </Card>
              <Card>
                <CardMedia aspectRatio="1:1" overlay={<CardActionOverlay title="Title goes here" subtitle="Subtitle goes here" actions={[{ children: 'Action 1' }, { children: 'Action 2' }]} />}>
                  <img src="http://lorempixel.com/300/300/nature" />
                </CardMedia>
              </Card>
              <Card>
                <CardMedia aspectRatio="1:1" overlay={<CardActionOverlay title="Title goes here" subtitle="Subtitle goes here" actions={[{ children: 'Action 1' }, { children: 'Action 2' }]} />}>
                  <img src="http://lorempixel.com/300/300/nature" />
                </CardMedia>
              </Card>
              <Card>
                <CardMedia aspectRatio="1:1" overlay={<CardActionOverlay title="Title goes here" subtitle="Subtitle goes here" actions={[{ children: 'Action 1' }, { children: 'Action 2' }]} />}>
                  <img src="http://lorempixel.com/300/300/nature" />
                </CardMedia>
              </Card>
            </div>
            <Card className="weather-card">
              <CardTitle title="San Francisco" subtitle="Mon, 12:30 PM, Mostly sunny" />
              <CardText className="forecast">
                <h2>23&deg;C</h2>
                <i className="fa fa-cloud" />
              </CardText>
              <CardActions>
                <input type="range" min="5" max="8" />
              </CardActions>
              <CardMedia>
                <ul className="md-list-group">
                  <li className="md-list-item">
                    <div>Tuesday</div>
                    <i className="fa fa-sun-o" />
                    <div>24&deg;/12&deg;</div>
                  </li>
                  <li className="md-list-item">
                    <div>Wednesday</div>
                    <i className="fa fa-sun-o" />
                    <div>22&deg;/14&deg;</div>
                  </li>
                  <li className="md-list-item">
                    <div>Thursday</div>
                    <i className="fa fa-cloud" />
                    <div>25&deg;/15&deg;</div>
                  </li>
                </ul>
              </CardMedia>
              <CardActions>
                <FlatButton default>Full report</FlatButton>
              </CardActions>
            </Card>
          </section>
          */}
        </main>
      </div>
    );
  }
}
