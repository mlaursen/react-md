import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-md/lib/Autocompletes';

import './_quick-search.scss';
import { showOverlay, hideOverlay } from 'actions/ui';
import { searchForComponent } from 'actions/quickSearch';

@connect(({ quickSearch }) => ({ data: quickSearch.matches }), {
  onChange: searchForComponent,
  onBlur: hideOverlay,
  onMenuOpen: showOverlay,
  onAutocomplete: hideOverlay,
})
export default class QuickSearch extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onAutocomplete: PropTypes.func.isRequired,
    onMenuOpen: PropTypes.func.isRequired,
  };

  render() {
    const { ...props } = this.props;
    delete props.dispatch;

    return (
      <Autocomplete
        {...props}
        label="Search documentation"
        block
        fullWidth
        filter={null}
        className="quick-search"
        listClassName="quick-search-menu"
        containerClassName="quick-search-menu-container"
        clearOnAutocomplete
      />
    );
  }
}
