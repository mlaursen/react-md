import React, { PureComponent } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';

import movies from 'constants/movies';
import sort from 'utils/ListUtils/sort';

import Configuration from './Configuration';
import Header from './Header';
import Body from './Body';

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
    this.setState({ inline });
  };

  handleSaveChange = (okOnOutsideClick) => {
    this.setState({ okOnOutsideClick });
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
        />
        <DataTable baseId="movies" className="movies-table" fixedHeader>
          <Header yearSorted={yearSorted} titleSorted={titleSorted} sort={this.sort} />
          <Body movies={sortedMovies} inline={inline} large={large} okOnOutsideClick={okOnOutsideClick} />
        </DataTable>
      </div>
    );
  }
}
