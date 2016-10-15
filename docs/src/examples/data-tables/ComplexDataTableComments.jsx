import React, { PureComponent } from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, EditDialogColumn } from 'react-md/lib/DataTables';
import FontIcon from 'react-md/lib/FontIcons';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';
import { sort } from 'utils/ListUtils';
import TableControls from './TableControls';

import movies from 'constants/movies';

export default class ComplexDataTableComments extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inline: false,
      large: false,
      sortedMovies: sort(movies, 'title', true).map(movie => ({ ...movie })),
      sortedType: 'title',
      titleSorted: true,
      yearSorted: null,
      okOnOutsideClick: true,
    };

    this._sort = this._sort.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleDialogChange = this._handleDialogChange.bind(this);
    this._handleInlineChange = this._handleInlineChange.bind(this);
    this._handleSaveChange = this._handleSaveChange.bind(this);
  }

  _sort() {
    const key = typeof this.state.titleSorted === 'boolean' ? 'title' : 'year';
    const sorted = !this.state[`${key}Sorted`];

    this.setState({
      sortedMovies: sort(this.state.sortedMovies, key, sorted),
      [`${key}Sorted`]: sorted,
    });
  }

  _handleSortChange(value) {
    const key = value === 'year' ? 'title' : 'year';
    this.setState({
      [`${key}Sorted`]: null,
      [`${value}Sorted`]: true,
      sortedType: value,
      sortedMovies: sort(this.state.sortedMovies, value, true),
    });
  }

  _handleDialogChange(large) {
    this.setState({ large });
  }

  _handleInlineChange(inline) {
    this.setState({ inline });
  }

  _handleSaveChange(okOnOutsideClick) {
    this.setState({ okOnOutsideClick });
  }

  render() {
    const {
      sortedMovies,
      titleSorted,
      yearSorted,
      sortedType,
      large,
      inline,
      okOnOutsideClick,
    } = this.state;

    const label = 'Add a comment';

    const rows = sortedMovies.map(({ title, year }) => {
      return (
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
      );
    });

    return (
      <div>
        <TableControls
          sorted={sortedType}
          onSortChange={this._handleSortChange}
          dialogChecked={large}
          onDialogChange={this._handleDialogChange}
          inlineChecked={inline}
          onInlineChange={this._handleInlineChange}
          saveChecked={okOnOutsideClick}
          onSaveChange={this._handleSaveChange}
        />
        <DataTable className="complex-table" baseId="complex">
          <TableHeader>
            <TableRow>
              <TableColumn
                sorted={titleSorted}
                onClick={typeof titleSorted === 'boolean' ? this._sort : null}
                tooltipLabel="The movie's title"
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
              <TableColumn className="prevent-grow">
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
