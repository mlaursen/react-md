import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Link from 'react-router/lib/Link';
import Autocomplete from 'react-md/lib/Autocompletes';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import throttle from 'lodash.throttle';
import Waypoint from 'react-waypoint';

import './_search.scss';

export default class Search extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    searchNext: PropTypes.func.isRequired,
    showSearch: PropTypes.func.isRequired,
    hideSearch: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    results: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['Info', 'Examples', 'SassDoc', 'Prop Types', 'Mixin', 'Variable', 'Placeholder', 'Function']).isRequired,
      ref: PropTypes.string.isRequired,
    })).isRequired,
    meta: PropTypes.shape({
      start: PropTypes.number,
      total: PropTypes.number,
      limit: PropTypes.number,
      next: PropTypes.string,
      previous: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      closeVisible: false,
      animating: false,
      value: '',
    };
    this._timeout = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searching !== nextProps.searching) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      if (!nextProps.searching) {
        this._timeout = setTimeout(() => {
          this._timeout = null;
          this.setState({ closeVisible: false, animating: false });
        }, 317);
        this.setState({ animating: true, value: '' });
      } else {
        this.setState({ closeVisible: true });
      }
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _fetchNext = ({ previousPosition }) => {
    if (previousPosition) {
      this.props.searchNext(this.props.meta.next);
    }
  };

  _search = throttle(this.props.search, 250);

  _handleChange = (value) => {
    if (value) {
      this._search(value);
    }

    this.setState({ value });
  };

  _handleAutocomplete = () => {
    this.setState({ value: '' });
  };

  _mapToLink = ({ name, type, ref }) => {
    let to;
    let href;
    let component;
    if (ref.match(/sassdoc/)) {
      component = 'a';
      href = ref;
    } else {
      component = Link;
      to = ref;
    }

    return { to, href, component, primaryText: name, secondaryText: type, key: `${name}-${type}` };
  };

  render() {
    const { closeVisible, animating, value } = this.state;
    const {
      searching,
      results,
      showSearch,
      hideSearch,
      meta: { next, start, total, limit },
    } = this.props;

    const close = (
      <Button key="close" className="md-btn--toolbar" icon onClick={hideSearch} waitForInkTransition>
        close
      </Button>
    );

    const data = results.map(this._mapToLink);
    if (next && start + limit < total) {
      data.push(<Waypoint key="lazy-load" onEnter={this._fetchNext} />);
    }

    return (
      <div style={{ flexWrap: 'nowrap' }} className="md-grid md-grid--no-spacing">
        <Autocomplete
          key="autocomplete"
          id="documentation-search"
          placeholder="Search"
          filter={null}
          onChange={this._handleChange}
          value={value}
          data={data}
          onFocus={showSearch}
          onAutocomplete={this._handleAutocomplete}
          clearOnAutocomplete
          className={cn('main-search md-select-field--toolbar', {
            'main-search--active': searching,
            'main-search--min-enforced': searching || animating,
          })}
          leftIcon={<FontIcon key="search">search</FontIcon>}
          listStyle={{ width: 'calc(100% + 48px)' }}
        />
        {closeVisible ? close : null}
      </div>
    );
  }
}
