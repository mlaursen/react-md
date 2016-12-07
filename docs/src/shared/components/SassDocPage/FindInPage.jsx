import React, { PureComponent, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Autocomplete from 'react-md/lib/Autocompletes';
import Button from 'react-md/lib/Buttons/Button';
import Drawer from 'react-md/lib/Drawers';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import toTitle from 'utils/StringUtils/toTitle';

function buildSubList(docs) {
  if (!docs.length) {
    return [];
  }

  return [{
    primaryText: toTitle(docs[0].type),
    defaultOpen: true,
    nestedItems: docs.map(doc => ({
      primaryText: doc.name,
      component: Link,
      to: location => ({ ...location, hash: `#${doc.type}-${doc.name}` }),
    })),
  }];
}

export default class FindInPage extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    placeholders: PropTypes.array.isRequired,
    variables: PropTypes.array.isRequired,
    functions: PropTypes.array.isRequired,
    mixins: PropTypes.array.isRequired,
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

  _filter = (value) => {
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
    const { visible, onVisibilityToggle } = this.props;
    const closeButton = <Button icon onClick={onVisibilityToggle} waitForInkTransition>keyboard_arrow_left</Button>;
    const autocomplete = (
      <TextField
        id="sassdoc-finder"
        placeholder="Filter SassDoc"
        className="md-select-field--toolbar sassdoc-filter"
        onChange={this._filter}
      />
    );

    return (
      <Drawer
        visible={visible}
        onVisibilityToggle={onVisibilityToggle}
        type={Drawer.DrawerTypes.TEMPORARY}
        className="powerlevel-over-9000"
        clickableDesktopOverlay={false}
        header={<Toolbar actions={closeButton}>{autocomplete}</Toolbar>}
        navItems={filteredNavItems}
        closeOnNavItemClick={false}
        navClassName="md-list--less-nested"
      />
    );
  }
}
