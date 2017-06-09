import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-md/lib/Autocompletes';
import Button from 'react-md/lib/Buttons/Button';
import Drawer from 'react-md/lib/Drawers';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';

import { toTitle } from 'utils/strings';

function buildSubList(docs) {
  if (!docs.length) {
    return [];
  }

  return [{
    primaryText: toTitle(docs[0].type),
    defaultVisible: true,
    nestedItems: docs.map(({ name, type }) => {
      const hash = `#${type}-${name}`;
      return {
        primaryText: name,
        component: Link,
        to: `${window.location.pathname}${window.location.search}${hash}`,
      };
    }),
  }];
}

export default class FindInPage extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onVisibilityChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    placeholders: PropTypes.array.isRequired,
    variables: PropTypes.array.isRequired,
    functions: PropTypes.array.isRequired,
    mixins: PropTypes.array.isRequired,
  };

  static defaultProps = {
    placeholders: [],
    variables: [],
    functions: [],
    mixins: [],
  };

  constructor(props) {
    super(props);

    const navItems = buildSubList(props.placeholders)
      .concat(buildSubList(props.variables))
      .concat(buildSubList(props.functions))
      .concat(buildSubList(props.mixins));

    this.state = { navItems, filteredNavItems: navItems };
  }

  componentWillReceiveProps(nextProps) {
    const { variables: v, placeholders: p, mixins: m, functions: f } = nextProps;

    if (v !== this.props.variables || p !== this.props.placeholders || m !== this.props.mixins || f !== this.props.functions) {
      const navItems = buildSubList(p)
        .concat(buildSubList(v))
        .concat(buildSubList(f))
        .concat(buildSubList(m));

      this.setState({ navItems, filteredNavItems: navItems });
    }
  }

  filter = (value) => {
    if (!value) {
      this.setState({ filteredNavItems: this.state.navItems });
      return;
    }

    const filteredNavItems = this.state.navItems.slice().map(section => ({
      ...section,
      nestedItems: Autocomplete.fuzzyFilter(section.nestedItems, value, 'primaryText'),
    }));

    this.setState({ filteredNavItems });
  };

  render() {
    const { filteredNavItems } = this.state;
    const { visible, onVisibilityChange } = this.props;
    const closeButton = <Button icon onClick={onVisibilityChange}>keyboard_arrow_left</Button>;
    const autocomplete = (
      <TextField
        id="sassdoc-finder"
        placeholder="Filter SassDoc"
        className="md-select-field--toolbar sassdoc__filter"
        onChange={this.filter}
      />
    );

    return (
      <Drawer
        visible={visible}
        onVisibilityChange={onVisibilityChange}
        tabletType={Drawer.DrawerTypes.TEMPORARY}
        desktopType={Drawer.DrawerTypes.TEMPORARY}
        type={Drawer.DrawerTypes.TEMPORARY}
        clickableDesktopOverlay={false}
        header={<Toolbar actions={closeButton}>{autocomplete}</Toolbar>}
        navItems={filteredNavItems}
        autoclose={false}
        navClassName="sassdoc__finder-list"
      />
    );
  }
}
