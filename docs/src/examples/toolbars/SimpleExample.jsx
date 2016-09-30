import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons';
import SelectField from 'react-md/lib/SelectFields';

import ToolbarMenu from './ToolbarMenu';

const nav = <Button key="nav" icon>menu</Button>;
const TITLES = ['All', 'Family', 'Friends', 'Coworkers'];
const titleMenu = (
  <SelectField
    key="titleMenu"
    id="titles"
    menuItems={TITLES}
    defaultValue={TITLES[0]}
  />
);

@connect(({ ui: { media: { tablet, desktop } } }) => ({ tablet, desktop }))
export default class SimpleExample extends PureComponent {
  static propTypes = {
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,
  };

  render() {
    const { tablet, desktop } = this.props;

    const actions = [
      <Button key="search" icon>search</Button>,
    ];

    // All don't fit for mobile
    if (tablet || desktop) {
      actions.push(<Button key="favorite" icon>favorite</Button>);
    }

    actions.push(<ToolbarMenu key="menu" />);
    return (
      <div className="toolbar-group">
        <Toolbar
          themed
          title="Themed"
          nav={nav}
          actions={actions}
        />
        <Toolbar
          colored
          title="Colored"
          nav={nav}
          actions={actions}
        />
        <Toolbar
          title="Transparent"
          nav={nav}
          actions={actions}
        />
        <Toolbar
          colored
          title="Prominent"
          nav={nav}
          actions={actions}
          prominentTitle
        />
        <Toolbar
          colored
          nav={nav}
          actions={actions}
          titleMenu={titleMenu}
        />
        <Toolbar
          colored
          nav={nav}
          actions={actions}
          prominentTitle
          titleMenu={titleMenu}
        />
      </div>
    );
  }
}
