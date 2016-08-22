import React, { PureComponent } from 'react';
import { CardText } from 'react-md/lib/Cards';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, EditDialogColumn } from 'react-md/lib/DataTables';
import { RadioGroup, Radio, Switch } from 'react-md/lib/SelectionControls';
import FontIcon from 'react-md/lib/FontIcons';
import { sort } from 'utils/ListUtils';

import movies from 'constants/movies';

export default class ComplexDataTableComments extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      large: false,
      sortedMovies: sort(movies, 'title', true).map(movie => ({ ...movie, comment: '' })),
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

  handleCommentChange = (index, comment) => {
    const sortedMovies = this.state.sortedMovies.slice();
    sortedMovies[index] = Object.assign({}, sortedMovies[index], { comment });

    this.setState({ sortedMovies });
  };

  handleOutsideClickChange = () => {
    this.setState({ okOnOutsideClick: !this.state.okOnOutsideClick });
  };

  render() {
    const { sortedMovies, titleSorted, yearSorted, large, okOnOutsideClick } = this.state;
    const rows = sortedMovies.map(({ title, year, comment }, key) => {
      return (
        <TableRow key={key}>
          <TableColumn>{title}</TableColumn>
          <TableColumn numeric>{year}</TableColumn>
          <EditDialogColumn
            label="Add a comment"
            maxLength={140}
            title="Add a comment"
            large={large}
            value={comment}
            okOnOutsideClick={okOnOutsideClick}
            onChange={() => this.handleCommentChange(key)}
            onCancelClick={() => this.handleCommentChange(key)}
          />
        </TableRow>
      );
    });

    return (
      <div>
        <CardText className="table-controls">
          <h3 className="md-title">Table Props</h3>
          <div>
            {/* Set to inline block so the label is a bit shorter so clicking anywhere in the line won't toggle. */}
            <RadioGroup onChange={this.handleSortTypeChange} className="inline-block">
              <Radio value="title" label="Sort by movie title" />
              <Radio value="year" label="Sort by movie year" />
            </RadioGroup>
          </div>
          <div>
            {/* Set to inline flex so the label is a bit shorter so clicking anywhere in the line won't toggle. */}
            <Switch className="inline-flex" label="Use large Edit Dialog" onClick={this.handleDialogSizeChange} />
          </div>
          <div>
            {/* Set to inline flex so the label is a bit shorter so clicking anywhere in the line won't toggle. */}
            <Switch className="inline-flex" label="Save comment on outside click" toggled={okOnOutsideClick} onChange={this.handleOutsideClickChange} />
          </div>
        </CardText>
        <DataTable className="complex-table">
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
                <FontIcon>chat</FontIcon>
                <span className="inline-top">Comments</span>
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
