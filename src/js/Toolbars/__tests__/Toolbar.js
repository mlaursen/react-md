/* eslint-env jest */
/* eslint-disable react/prop-types */
jest.unmock('../Toolbar');

import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import Toolbar from '../Toolbar';
import ToolbarTitle from '../ToolbarTitle';
import Paper from '../../Papers/Paper';
import SelectField from '../../SelectFields/SelectField';

class Button extends React.PureComponent {
  render() {
    const { className, ...props } = this.props;
    return <button className={`woop ${className}`} {...props} />;
  }
}

describe('Toolbar', () => {
  it('renders as a paper component', () => {
    const toolbar = renderIntoDocument(<Toolbar />);
    const papers = scryRenderedComponentsWithType(toolbar, Paper);
    expect(papers.length).toBe(1);
  });

  it('renders the paper component as a header', () => {
    const toolbar = renderIntoDocument(<Toolbar />);
    const paper = findRenderedComponentWithType(toolbar, Paper);
    expect(paper.props.component).toBe('header');
  });

  it('pases the style and className to the paper component', () => {
    const props = {
      style: { background: 'red' },
      className: 'something',
    };

    const toolbar = renderIntoDocument(<Toolbar {...props} />);
    const paper = findRenderedComponentWithType(toolbar, Paper);
    expect(paper.props.style).toEqual(props.style);
    expect(paper.props.className).toContain(props.className);
  });

  it('renders a toolbar title component', () => {
    const props = {
      prominentTitle: false,
      title: 'Woop woop',
    };

    const toolbar = renderIntoDocument(<Toolbar {...props} />);
    const title = findRenderedComponentWithType(toolbar, ToolbarTitle);
    expect(title.props.title).toBe(props.title);
    expect(title.props.prominent).toBe(props.prominentTitle);
    expect(title.props.offset).toBe(props.prominentTitle);
  });

  it('clones the nav prop with some additional className', () => {
    const props = { nav: <Button>menu</Button> };
    const toolbar = renderIntoDocument(<Toolbar {...props} />);
    const button = findRenderedComponentWithType(toolbar, Button);
    expect(button.props.className).toContain('--toolbar');
    expect(button.props.className).toContain('--action-left');
  });

  it('renders the actions in a div', () => {
    const props = { actions: <Button>menu</Button> };
    const toolbar = renderIntoDocument(<Toolbar {...props} />);
    const actions = scryRenderedDOMComponentsWithClass(toolbar, 'md-toolbar--action-right');
    expect(actions.length).toBe(1);
  });

  it('clones the actions prop with the md-btn--toolbar className if it is a single element', () => {
    const props = { actions: <Button>menu</Button> };
    const toolbar = renderIntoDocument(<Toolbar {...props} />);
    const button = findRenderedComponentWithType(toolbar, Button);
    expect(button.props.className).toContain('md-btn--toolbar');
  });

  it('clones the actions prop with the md-btn--toolbar className to each element in the array', () => {
    const props = {
      actions: [<Button key="menu">menu</Button>, <Button key="help">help</Button>],
    };
    const toolbar = renderIntoDocument(<Toolbar {...props} />);
    const buttons = scryRenderedComponentsWithType(toolbar, Button);
    expect(buttons.length).toBe(2);
    expect(buttons[0].props.className).toContain('md-btn--toolbar');
    expect(buttons[1].props.className).toContain('md-btn--toolbar');
  });

  it('clones the titleMenu prop with some additional props', () => {
    const props = {
      titleMenu: <SelectField id="test" className="woop" />,
    };
    const toolbar = renderIntoDocument(<Toolbar {...props} />);
    const select = findRenderedComponentWithType(toolbar, SelectField);
    expect(select.props.className).toContain('woop');
    expect(select.props.position).toBe('tl');
  });
});
