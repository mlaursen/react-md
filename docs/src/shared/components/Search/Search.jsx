import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Link from 'react-router/lib/Link';
import Autocomplete from 'react-md/lib/Autocompletes';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import throttle from 'lodash.throttle';
import Waypoint from 'react-waypoint';

import './_search.scss';

const style = { flexWrap: 'nowrap' };

export default class Search extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    searchNext: PropTypes.func.isRequired,
    showSearch: PropTypes.func.isRequired,
    hideSearch: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,

    /**
     * A list of matches/results from the current search.
     */
    results: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        'Info',
        'Examples',
        'SassDoc',
        'Prop Types',
        'Mixin',
        'Variable',
        'Placeholder',
        'Function',
      ]).isRequired,
      ref: PropTypes.string.isRequired,
    })).isRequired,

    /**
     * The meta object containg the last search's start index, the total results,
     * the last search's limit of results, an optional link to get the next results,
     * and an optional link to get the previous results.
     */
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
      closeVisible: props.searching, // for hot updates
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

  /**
   * Basically make sure the `Waypoint` has been mounted before attempting to fetch the next results.
   * When autocomplete menu opens for the first time, the `previousPosition` will be undefined and the
   * next results would also be fetched.
   */
  _fetchNext = ({ previousPosition }) => {
    if (previousPosition) {
      this.props.searchNext(this.props.meta.next);
    }
  };

  /**
   * Throttle the search so it only attempts to hit the endpoint once every 250ms
   */
  _search = throttle(this.props.search, 250);

  _handleChange = (value) => {
    if (value) {
      this._search(value);
    }

    this.setState({ value });
  };

  /**
   * Basically map the results shape into props for a `ListItem`.
   *
   * @param {Object} result - The result object to convert.
   * @param {String} result.name - The name for the search result.
   * @param {String} result.type - The search result type.
   * @param {String} result.ref - The link to use to navigate to that search result.
   * @return {Object} props to pass to the `ListItem` component in the autocomplete's menu.
   */
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

    return {
      to,
      href,
      component,
      primaryText: name,
      secondaryText: type,
      key: `${name}-${type}`,
    };
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
      <div style={style} className="md-grid md-grid--no-spacing">
        <Autocomplete
          key="autocomplete"
          id="documentation-search"
          placeholder="Search"
          filter={null}
          onChange={this._handleChange}
          value={value}
          data={data}
          onFocus={showSearch}
          className={cn('main-search md-select-field--toolbar', {
            'main-search--active': searching,
            'main-search--min-enforced': searching || animating,
          })}
          leftIcon={<FontIcon key="search">search</FontIcon>}
        />
        {closeVisible ? close : null}
      </div>
    );
  }
}
