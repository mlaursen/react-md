import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-md/lib/Autocompletes';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';

import './_styles.scss';
import { searchRequest, searchNextRequest, showSearch, hideSearch } from 'state/search';
import CodeVariable from 'components/CodeVariable';

const TRANSITION_TIME = 317; // 300ms for transition and 17 to match up with original CSSTransitionGroup

export class PureSearch extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    searchNext: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,
    showSearch: PropTypes.func.isRequired,
    hideSearch: PropTypes.func.isRequired,

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

  static defaultProps = {
    results: [],
    meta: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      animating: false,
      data: this.makeDataList(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { searching, results } = nextProps;

    if (this.props.results !== results) {
      this.setState({ data: this.makeDataList(nextProps) });
    }

    if (this.props.searching === searching) {
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (!searching) {
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ animating: false });
      }, TRANSITION_TIME);
      this.setState({ animating: true });
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  timeout = null;

  /**
   * Basically make sure the `Waypoint` has been mounted before attempting to fetch the next results.
   * When autocomplete menu opens for the first time, the `previousPosition` will be undefined and the
   * next results would also be fetched.
   */
  fetchNext = ({ previousPosition }) => {
    if (previousPosition) {
      this.props.searchNext(this.props.meta.next);
    }
  };

  /**
   * Need to make a cached list of the data in state so that the autocomplete doesn't get a this.props.data
   * diff and reopen the menu when closing.
   */
  makeDataList = ({ results, searching, meta: { start, total, limit, next } }) => {
    const data = results.map(this.mapToLink);
    if (searching && next && start + limit < total) {
      data.push(<Waypoint key="lazy-load" onEnter={this.fetchNext} />);
    }

    return data;
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
  mapToLink = ({ name, type, ref, value }) => {
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

    let primaryText = name;
    let secondaryText = type;
    let className = '';
    if (value) {
      primaryText = type;
      secondaryText = <CodeVariable component="pre">${name}: {value}</CodeVariable>;
      className = 'search__scss-item';
    }

    return {
      to,
      href,
      component,
      className,
      primaryText,
      secondaryText,
      threeLines: !!value,
      key: `${name}-${type}`,
    };
  };

  handleClick = (e) => {
    const { classList } = e.target;
    const { searching, showSearch } = this.props;
    if (!searching && (classList.contains('md-icon') || classList.contains('md-text-field-icon-container'))) {
      showSearch();
    }
  };

  render() {
    const { animating, data } = this.state;
    const {
      search,
      searching,
      hideSearch,
      meta: { total },
    } = this.props;

    let hideBtn;
    if (searching || animating) {
      hideBtn = (
        <Button key="hide" icon onClick={hideSearch}>
          close
        </Button>
      );
    }

    return (
      <div className="search md-grid md-grid--no-spacing">
        <Autocomplete
          id="documentation-search"
          placeholder="Search"
          className={cn('search__autocomplete')}
          inputClassName={cn('search__input', {
            'search__input--visible': searching,
            'search__input--active': searching || animating,
          })}
          filter={null}
          onChange={search}
          data={data}
          total={total}
          leftIcon={<FontIcon>search</FontIcon>}
          listClassName="search__results"
          onClick={this.handleClick}
        />
        {hideBtn}
      </div>
    );
  }
}

export default connectAdvanced((dispatch) => {
  let result;
  const actions = bindActionCreators({
    search: value => searchRequest(value),
    searchNext: searchNextRequest,
    showSearch,
    hideSearch,
  }, dispatch);

  return (state, props) => {
    const nextResult = { ...props, ...actions, ...state.search };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PureSearch);
