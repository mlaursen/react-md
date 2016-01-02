import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import { Card, CardTitle, CardText, CardMedia, CardActions, FlatButton, Avatar, List, ListItem, FontIcon } from '../../../../src/js';

import DocPage from '../../DocPage';

export default class Cards extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['Card', 'CardTitle', 'CardText', 'CardMedia', 'CardActions']}
        code={code}
        examples={[
          <Card isExpandable={true} className="expandable-card">
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
          </Card>,
          <Card className="weather-card">
            <CardTitle title="San Francisco" subtitle="Mon, 12:30 PM, Mostly sunny" />
            <CardText className="forecast">
              <div>
                <h2 className="md-title">23</h2>
                <sup>&deg;C</sup>
              </div>
              <i className="fa fa-cloud" />
            </CardText>
            <CardText>
              <List>
                <ListItem leftIcon={<FontIcon>home</FontIcon>} primaryText="23 hm/h" />
                <ListItem leftIcon={<FontIcon>home</FontIcon>} primaryText="48%" />
              </List>
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
          </Card>,
        ]}
        components={[{
          component: Card,
          allRemaining: true,
          details: [
          ],
        }, {
          component: CardTitle,
          details: [],
        }, {
          component: CardMedia,
          details: [],
        }, {
          component: CardText,
          details: [],
        }, {
          component: CardActions,
          details: [],
        }]}
      />
    );
  }
}
