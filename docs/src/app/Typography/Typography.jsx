import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Typography extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static path = 'typography';

  render() {
    return (
      <section className="documentation text-container">
        <h3 className="md-display-1">Material Design Typography</h3>
        <p>
          {'The typography has been built off of the '}
          <a href="https://www.google.com/design/spec/style/typography.html">typography specs</a>.
          There are some helper classes included in the scss.
        </p>
        <p>
          By default, the existing header tags, paragraphs, captions, etc will not be updated with
          these classes.
        </p>
        <ul className="md-list">
          <li className="md-display-4">.md-display-4</li>
          <li className="md-display-3">.md-display-3</li>
          <li className="md-display-2">.md-display-2</li>
          <li className="md-display-1">.md-display-1</li>
          <li className="md-headline">.md-headline</li>
          <li className="md-title">.md-title</li>
          <li className="md-subheading-2">.md-subheading-2</li>
          <li className="md-subheading-1">.md-subheading-1</li>
          <li className="md-body-2">.md-body-2</li>
          <li className="md-body-1">.md-body-1</li>
          <li className="md-caption">.md-caption</li>
        </ul>
      </section>
    );
  }
}
//import React from 'react';
//
//import DisplayReadme from '../DisplayReadme';
//import readme from './README.md';
//
//const Typography = (props) => <DisplayReadme {...props} readme={readme} />;
//Typography.path = 'typography';
//
//export default Typography;
