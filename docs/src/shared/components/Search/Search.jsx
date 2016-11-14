import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Autocomplete from 'react-md/lib/Autocompletes';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';
import throttle from 'lodash.throttle';

import './_search.scss';

export default class Search extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    showSearch: PropTypes.func.isRequired,
    hideSearch: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    results: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { closeVisible: false, animating: false };
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
        this.setState({ animating: true });
      } else {
        this.setState({ closeVisible: true });
      }
    }
  }

  _search = (query) => {
    this.props.search(query);
  };

  render() {
    const { closeVisible, animating } = this.state;
    const { searching, results, showSearch, hideSearch } = this.props;

    const close = (
      <Button key="close" className="md-btn--toolbar" icon onClick={hideSearch} waitForInkTransition>
        close
      </Button>
    );

    return (
      <div style={{ flexWrap: 'nowrap' }} className="md-grid md-grid--no-spacing">
        <Autocomplete
          key="autocomplete"
          id="documentation-search"
          placeholder="Search"
          filter={null}
          onChange={throttle(this._search, 250)}
          data={results}
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
