import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Autocomplete,
  Button,
  Drawer,
  TextField,
  Toolbar,
  bem,
} from 'react-md';

import { toTitle } from 'utils/strings';

function buildSubList(docs, { location: { pathname, search } }) {
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
        to: `${pathname}${search}${hash}`,
      };
    }),
  }];
}

class FindInPage extends PureComponent {
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
    super();

    const navItems = buildSubList(props.placeholders, props)
      .concat(buildSubList(props.variables, props))
      .concat(buildSubList(props.functions, props))
      .concat(buildSubList(props.mixins, props));

    this.state = { navItems, filteredNavItems: navItems };
  }

  componentWillReceiveProps(nextProps) {
    const { variables: v, placeholders: p, mixins: m, functions: f } = nextProps;

    if (v !== this.props.variables || p !== this.props.placeholders || m !== this.props.mixins || f !== this.props.functions) {
      const navItems = buildSubList(p, nextProps)
        .concat(buildSubList(v, nextProps))
        .concat(buildSubList(f, nextProps))
        .concat(buildSubList(m, nextProps));

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
        className={bem('sassdoc', 'filter', {}, 'md-select-field--toolbar')}
        onChange={this.filter}
      />
    );

    return (
      <Drawer
        id="sassdoc-finder-drawer"
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
export default withRouter(FindInPage);
