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
    this.state = { isNavOpen: true, filteredLinks: componentLinks };
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object, // from react-router
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
          leftNode={<IconButton onClick={this.toggleSidebar}>menu</IconButton>}
          rightNode={<IconButton href="https://github.com/mlaursen/react-md" iconClassName="fa fa-github" />}
        />
        <Sidebar
          isOpen={this.state.isNavOpen}
          items={mainLinks.map(this.toRouterLink).concat(sublinks).concat(this.state.filteredLinks.map(this.toRouterLink))}
        />
        <main>
          {this.props.children}
          {/*
          <section className="toolbar">
            <Paper>
              <Toolbar>
                <IconButton>menu</IconButton>
              </Toolbar>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>
            </Paper>
            <Paper>
              <Toolbar primary>
                <IconButton>menu</IconButton>
              </Toolbar>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>
            </Paper>
            <Paper>
              <Toolbar secondary>
                <IconButton>menu</IconButton>
              </Toolbar>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>
            </Paper>
          </section>
          <section className="buttons-section">
            <Paper>
              <IconButton>chat_bubble_outline</IconButton>
              <IconButton>home</IconButton>
              <IconButton>favorite</IconButton>
            </Paper>
            <Paper className="flex-column">
              <h5>Flat Buttons</h5>
              <FlatButton default label="normal" />
              <FlatButton primary label="Talk">
                <FontIcon>chat_bubble_outline</FontIcon>
              </FlatButton>
              <FlatButton secondary label="Talk" iconBefore={false}>
                <FontIcon>chat_bubble_outline</FontIcon>
              </FlatButton>
              <FlatButton disabled>disabled</FlatButton>
            </Paper>
            <Paper className="flex-column">
              <h5>Raised Buttons</h5>
              <RaisedButton default>raised</RaisedButton>
              <RaisedButton primary label="Spock" iconBefore={false}>
                <FontIcon iconClassName="fa fa-hand-spock-o" />
              </RaisedButton>
              <RaisedButton secondary label="Paper">
                <FontIcon iconClassName="fa fa-hand-paper-o" />
              </RaisedButton>
              <RaisedButton disabled>raised</RaisedButton>
            </Paper>
            <Paper className="flex-column">
              <h5>Floating Buttons</h5>
              <FloatingButton default>
                home
              </FloatingButton>
              <FloatingButton primary>
                grade
              </FloatingButton>
              <FloatingButton secondary>
                favorite
              </FloatingButton>
            </Paper>
          </section>
          <section className="tabs-section">
            <h5>Tabs - Unmanaged</h5>
            <Tabs>
              <Tab label="Tab 1">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>
              </Tab>
              <Tab label="Tab 2">
                <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
              </Tab>
            </Tabs>
            <h5>Tabs - Externally Managed</h5>
            <Tabs activeTabIndex={this.state.activeTabIndex} onTabChange={this.handleTabChange} primary>
              <Tab label="Tab 1 with a ridiculously long title that woops">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.</p>
              </Tab>
              <Tab label="Tab 2">
                <p>Quisque egestas, purus in tempor vulputate, diam augue mollis quam, quis elementum ipsum ex a risus. Quisque sed augue porta, facilisis felis vitae, cursus mi. Nullam mollis magna eget tincidunt mollis. Sed suscipit placerat ultricies. Sed eget lorem et ipsum ultricies congue eu a enim. Nam quis ex nec lorem dignissim suscipit eu ut felis. Vivamus molestie felis id purus congue, vel ultrices sem molestie.</p>
              </Tab>
            </Tabs>
          </section>
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
          <section>
            <Checkbox />
            <Checkbox isInitiallyChecked={true} />
            <Checkbox disabled />
            <RadioGroup stacked>
              <Radio name="woop" value="A" label="Click Me, A" />
              <Radio name="woop" value="B" label="Click Me, B" />
              <Radio name="woop" value="C" label="Click Me, C" />
            </RadioGroup>
            <Switch value="A" label="Enable A" />
            <Switch value="B" label="Enable B" disabled />
          </section>
          */}
        </main>
      </div>
    );
  }
}
