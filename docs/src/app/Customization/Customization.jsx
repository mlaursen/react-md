import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import marked from 'marked';

import readme from './README.md';

export default class Customization extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static path = "customization";

  componentWillMount() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code, lang) => require('highlight.js').highlight(lang, code).value, // eslint-disable-line no-undef
    });
  }

  render() {
    return (
      <section
        className="text-container documentation"
        dangerouslySetInnerHTML={{
          __html: marked(readme),
        }}
      />
    );
  }
}
