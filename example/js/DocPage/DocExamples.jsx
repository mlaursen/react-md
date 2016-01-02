import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Card, CardTitle, CardText } from '../../../src/js';

export default class DocExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    examples: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Card className="react-md-doc-card">
        <CardTitle title="Examples" />
        <CardText className={`examples ${this.props.className}-examples`}>
          {React.Children.map(this.props.examples, (child, i) => child.key ? child : React.cloneElement(child, { key: i }))}
        </CardText>
      </Card>
    );
  }
}
