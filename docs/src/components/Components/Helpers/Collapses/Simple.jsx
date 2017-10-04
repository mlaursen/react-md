import React, { PureComponent } from 'react';
import loremIpsum from 'lorem-ipsum';
import { Button, Collapse } from 'react-md';

export default class Simple extends PureComponent {
  state = {
    collapsed: true,
    ipsum: [...new Array(3)].map((_, i) => ({
      key: i,
      text: loremIpsum({ count: 1, units: 'paragraphs' }),
    })),
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { collapsed, ipsum } = this.state;

    return (
      <div>
        <Button raised onClick={this.toggle}>
          Toggle Collapse
        </Button>
        <Collapse collapsed={collapsed}>
          <div className="md-grid">
            {ipsum.map(({ key, text }) => <p key={key} className="md-cell md-cell--12">{text}</p>)}
          </div>
        </Collapse>
      </div>
    );
  }
}
