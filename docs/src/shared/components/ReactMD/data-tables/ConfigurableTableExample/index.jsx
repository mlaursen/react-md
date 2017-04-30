import React, { PureComponent } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';

import movies from 'constants/movies';
import sort from 'utils/ListUtils/sort';

import Configuration from './Configuration';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default class ConfigurableTableExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inline: false,
      large: false,
      sortedMovies: sort(movies, 'title', true),
      sortedType: 'title',
      titleSorted: true,
      yearSorted: null,
      okOnOutsideClick: true,
      fixedHeader: true,
      fixedFooter: true,
      fixedHeight: 0,
      fixedWidth: 0,
    };
  }

  sort = () => {
    const key = this.state.sortedType;
    const sorted = !this.state[`${key}Sorted`];

    this.setState({
      sortedMovies: sort(movies, key, sorted),
      [`${key}Sorted`]: sorted,
    });
  };

  changeSortType = (value) => {
    const key = value === 'year' ? 'title' : 'year';
    this.setState({
      [`${key}Sorted`]: null,
      [`${value}Sorted`]: true,
      sortedType: value,
      sortedMovies: sort(movies, value, true),
    });
  };

  handleDialogChange = (large) => {
    this.setState({ large });
  };

  handleInlineChange = (inline) => {
    let { large } = this.state;
    if (inline) {
      large = false;
    }
    this.setState({ inline, large });
  };

  handleSaveChange = (okOnOutsideClick) => {
    this.setState({ okOnOutsideClick });
  };

  handleFixedHeaderChange = (fixedHeader) => {
    this.setState({ fixedHeader });
  };

  handleFixedFooterChange = (fixedFooter) => {
    this.setState({ fixedFooter });
  };

  handleHeightChange = (value) => {
    this.setState({ fixedHeight: parseFloat(value || 0) });
  };

  handleWidthChange = (value) => {
    this.setState({ fixedWidth: parseFloat(value || 0) });
  };

  render() {
    const {
      large,
      inline,
      okOnOutsideClick,
      yearSorted,
      titleSorted,
      sortedType,
      sortedMovies,
      fixedHeader,
      fixedFooter,
      fixedWidth,
      fixedHeight,
    } = this.state;

    return (
      <div>
        <Configuration
          dialogChecked={large}
          onDialogChange={this.handleDialogChange}
          inlineChecked={inline}
          onInlineChange={this.handleInlineChange}
          sorted={sortedType}
          onSortChange={this.changeSortType}
          saveChecked={okOnOutsideClick}
          onSaveChange={this.handleSaveChange}
          fixedHeader={fixedHeader}
          onFixedHeaderChange={this.handleFixedHeaderChange}
          fixedFooter={fixedFooter}
          onFixedFooterChange={this.handleFixedFooterChange}
          fixedHeight={fixedHeight}
          onHeightChange={this.handleHeightChange}
          fixedWidth={fixedWidth}
          onWidthChange={this.handleWidthChange}
        />
        <DataTable
          baseId="movies"
          className="movies-table"
          fixedHeader={fixedHeader}
          fixedFooter={fixedFooter}
          fixedHeight={fixedHeight !== 0 ? fixedHeight : null}
          fixedWidth={fixedWidth !== 0 ? fixedWidth : null}
        >
          <Header yearSorted={yearSorted} titleSorted={titleSorted} sort={this.sort} />
          <Body movies={sortedMovies} inline={inline} large={large} okOnOutsideClick={okOnOutsideClick} />
          <Footer />
        </DataTable>
      </div>
    );
  }
}
