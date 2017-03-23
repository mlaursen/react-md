import React, { PureComponent } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';
import FontIcon from 'react-md/lib/FontIcons';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';

import movies from 'constants/movies';
import sort from 'utils/ListUtils/sort';
import TableControls from './TableControls';

export default class ComplexDataTableComments extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inline: false,
      large: false,
      sortedMovies: sort(movies, 'title', true).map(movie => ({ ...movie })),
      titleSorted: true,
      yearSorted: null,
      okOnOutsideClick: true,
      indeterminate: false,
    };
  }

  _sort = () => {
    const key = typeof this.state.titleSorted === 'boolean' ? 'title' : 'year';
    const sorted = !this.state[`${key}Sorted`];

    this.setState({
      sortedMovies: sort(this.state.sortedMovies, key, sorted),
      [`${key}Sorted`]: sorted,
    });
  };

  _handleSortChange = (value) => {
    const key = value === 'year' ? 'title' : 'year';
    this.setState({
      [`${key}Sorted`]: null,
      [`${value}Sorted`]: true,
      sortedMovies: sort(this.state.sortedMovies, value, true),
    });
  };

  _handleFormChange = (e) => {
    const { id, checked, value } = e.target;
    if (id.match(/sort/)) {
      this._handleSortChange(value);
    } else if (id.match(/dialog/)) {
      this.setState({ large: checked });
    } else if (id.match(/inline/)) {
      this.setState({ inline: checked });
    } else if (id.match(/outside/)) {
      this.setState({ okOnOutsideClick: checked });
    } else if (id.match(/indeterminate/)) {
      this.setState({ indeterminate: checked });
    }
  };

  render() {
    const {
      sortedMovies,
      titleSorted,
      yearSorted,
      large,
      inline,
      indeterminate,
      okOnOutsideClick,
    } = this.state;

    const label = 'Add a comment';

    const rows = sortedMovies.map(({ title, year }) => (
      <TableRow key={title}>
        <TableColumn>{title}</TableColumn>
        <TableColumn numeric>{year}</TableColumn>
        <EditDialogColumn
          label={inline ? null : label}
          placeholder={label}
          maxLength={inline ? null : 140}
          title={inline ? null : 'Add some comment'}
          large={inline ? null : large}
          okOnOutsideClick={okOnOutsideClick}
          inline={inline}
        />
      </TableRow>
    ));

    return (
      <div>
        <TableControls onChange={this._handleFormChange} />
        <DataTable className="complex-table" baseId="complex" indeterminate={indeterminate}>
          <TableHeader>
            <TableRow>
              <TableColumn
                sorted={titleSorted}
                onClick={typeof titleSorted === 'boolean' ? this._sort : null}
                tooltipLabel="The movie's title"
                grow
              >
                Title
              </TableColumn>
              <TableColumn
                numeric
                sorted={yearSorted}
                onClick={typeof yearSorted === 'boolean' ? this._sort : null}
                tooltipLabel="The year the movie was released"
              >
                Year
              </TableColumn>
              <TableColumn>
                <IconSeparator label="Comments" iconBefore>
                  <FontIcon>chat</FontIcon>
                </IconSeparator>
              </TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </DataTable>
      </div>
    );
  }
}
