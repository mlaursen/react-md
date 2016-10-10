import React, { PureComponent } from 'react';
import { CardText } from 'react-md/lib/Cards';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, EditDialogColumn } from 'react-md/lib/DataTables';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';
import FontIcon from 'react-md/lib/FontIcons';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';
import { sort } from 'utils/ListUtils';

import movies from 'constants/movies';

export default class ComplexDataTableComments extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      large: false,
      sortedMovies: sort(movies, 'title', true).map(movie => ({ ...movie })),
      titleSorted: true,
      yearSorted: null,
      okOnOutsideClick: true,
    };
  }

  sort = () => {
    const key = typeof this.state.titleSorted === 'boolean' ? 'title' : 'year';
    const sorted = !this.state[`${key}Sorted`];

    this.setState({
      sortedMovies: sort(this.state.sortedMovies, key, sorted),
      [`${key}Sorted`]: sorted,
    });
  };

  handleSortTypeChange = (value) => {
    const key = value === 'year' ? 'title' : 'year';
    this.setState({
      [`${key}Sorted`]: null,
      [`${value}Sorted`]: true,
      sortedMovies: sort(this.state.sortedMovies, value, true),
    });
  };

  handleDialogSizeChange = () => {
    this.setState({ large: !this.state.large });
  };

  handleOutsideClickChange = () => {
    this.setState({ okOnOutsideClick: !this.state.okOnOutsideClick });
  };

  render() {
    const { sortedMovies, titleSorted, yearSorted, large, okOnOutsideClick } = this.state;
    const rows = sortedMovies.map(({ title, year }) => {
      return (
        <TableRow key={title}>
          <TableColumn>{title}</TableColumn>
          <TableColumn numeric>{year}</TableColumn>
          <EditDialogColumn
            label="Add a comment"
            maxLength={140}
            title="Add a comment"
            large={large}
            okOnOutsideClick={okOnOutsideClick}
          />
        </TableRow>
      );
    });

    const controls = [{
      label: 'Sort by movie title',
      value: 'title',
    }, {
      label: 'Sort by movie year',
      value: 'year',
    }];

    return (
      <div>
        <CardText className="table-controls">
          <SelectionControlGroup
            id="complexControl"
            name="complex-controls"
            type="radio"
            label="Table Props"
            onChange={this.handleSortTypeChange}
            controls={controls}
          />
          <SelectionControl
            type="switch"
            id="useEditDialog"
            label="Use large Edit Dialog"
            name="edit-dialog"
            onChange={this.handleDialogSizeChange}
          />
          <SelectionControl
            type="switch"
            id="saveOnOutside"
            label="Save comment on outside click"
            name="save-on-outside"
            checked={okOnOutsideClick}
            onChange={this.handleOutsideClickChange}
          />
        </CardText>
        <DataTable className="complex-table" baseId="complex">
          <TableHeader>
            <TableRow>
              <TableColumn
                sorted={titleSorted}
                onClick={typeof titleSorted === 'boolean' ? this.sort : null}
                tooltipLabel="The movie's title"
              >
                Title
              </TableColumn>
              <TableColumn
                numeric
                sorted={yearSorted}
                onClick={typeof yearSorted === 'boolean' ? this.sort : null}
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
