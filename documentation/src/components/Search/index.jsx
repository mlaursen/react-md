import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-md/lib/Autocompletes';
import FontIcon from 'react-md/lib/FontIcons';

import './_styles.scss';
import { searchRequest, searchNextRequest } from 'state/search';
import CodeVariable from 'components/CodeVariable';

export class PureSearch extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    searchNext: PropTypes.func.isRequired,
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

  setInput = (div) => {
    if (div) {
      this.input = div.querySelector('input');
    } else {
      this.input = null;
    }
  };

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
    if (value) {
      primaryText = type;
      secondaryText = <CodeVariable>${name}: {value}</CodeVariable>;
    }

    return {
      to,
      href,
      component,
      primaryText,
      secondaryText,
      threeLines: !!value,
      key: `${name}-${type}`,
    };
  };

  render() {
    const {
      search,
      results,
      meta: { next, start, total, limit },
    } = this.props;

    const data = results.map(this.mapToLink);
    if (next && start + limit < total) {
      data.push(<Waypoint key="lazy-load" onEnter={this.fetchNext} />);
    }

    return (
      <div className="search md-grid md-grid--no-spacing" ref={this.setInput}>
        <Autocomplete
          id="documentation-search"
          placeholder="Search"
          className={cn('search__autocomplete')}
          filter={null}
          onChange={search}
          data={data}
          total={total}
          leftIcon={<FontIcon>search</FontIcon>}
          listClassName="search__results"
          sameWidth={false}
        />
      </div>
    );
  }
}

export default connectAdvanced((dispatch) => {
  let result;
  const actions = bindActionCreators({
    search: value => searchRequest(value),
    searchNext: searchNextRequest,
  }, dispatch);

  return (state, props) => {
    const nextResult = { ...props, ...actions, ...state.search };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PureSearch);
