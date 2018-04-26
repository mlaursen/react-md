import React, { PureComponent } from 'react';
import loremIpsum from 'lorem-ipsum';
import { Button, Collapse, GridList } from 'react-md';

export default class Simple extends PureComponent {
  state = { collapsed: true, ipsum: [] };

  componentWillMount() {
    this.setState({
      collapsed: true,
      ipsum: Array.from(Array(5)).map((_, i) => ({
        key: i,
        text: loremIpsum({ count: 1, units: 'paragraphs' }),
      })),
    });
  }

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
          <GridList size={12}>
            {ipsum.map(({ key, text }) => <p key={key}>{text}</p>)}
          </GridList>
        </Collapse>
      </div>
    );
  }
}
