import React, { PureComponent } from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import { sortBy } from 'lodash/collection';

import { movies } from 'constants/sampleData';

export default class Sortable extends PureComponent {
  state = {
    ascending: false,
    sortedMovies: sortBy(movies, 'title'),
  };

  sort = () => {
    const ascending = !this.state.ascending;
    const sortedMovies = this.state.sortedMovies.slice();
    sortedMovies.reverse();

    this.setState({ ascending, sortedMovies });
  };

  render() {
    const { ascending, sortedMovies } = this.state;

    const rows = sortedMovies.map(({ title, year }) => (
      <TableRow key={title}>
        <TableColumn>{title}</TableColumn>
        <TableColumn numeric>{year}</TableColumn>
      </TableRow>
    ));

    return (
      <DataTable baseId="movies">
        <TableHeader>
          <TableRow>
            <TableColumn grow sorted={ascending} role="button" onClick={this.sort}>
              Title
            </TableColumn>
            <TableColumn numeric>
              Year
            </TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </DataTable>
    );
  }
}
