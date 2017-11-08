import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DataTable, TableRow, TableColumn, TableBody, Paper, ResizeObserver } from 'react-md';
import { randomInt } from 'utils/random';

export default class Simple extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  state = {
    style: { maxHeight: 100, maxWidth: 150 },
    height: 100,
    width: 150,
  };

  componentDidMount() {
    this.timeout = setTimeout(this.randomize, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * The `onResize` callback function returns:
   * - height
   * - width
   * - scrollHeight
   * - scrollWidth
   * - el
   */
  handleResize = ({ height, width, el }) => {
    this.el = el;
    this.setState({ height, width });
  };

  /**
   * Sets a random max width and max height for the paper and then creates a timer to
   * call the randomize function again after 2-8 seconds. It will set the max height
   * to a random number between 100 and 500 while the max width will be between 150 and the
   * width of the card.
   */
  randomize = () => {
    const maxHeight = randomInt({ min: 100, max: 500 });
    const maxWidth = randomInt({ min: 150, max: this.el ? this.el.parentElement.offsetWidth : 300 });
    this.setState({ style: { maxHeight, maxWidth } });

    this.timeout = setTimeout(this.randomize, randomInt({ min: 2, max: 8 }) * 1000);
  };

  render() {
    const { style, height, width } = this.state;
    return (
      <Paper zDepth={1} style={style} className="resize-observers__paper">
        <DataTable plain className="resize-observers__table">
          <TableBody>
            <TableRow>
              <TableColumn header scope="row" adjusted={false}>
                height:
              </TableColumn>
              <TableColumn grow>
                {height}
              </TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn header scope="row" adjusted={false}>
                width:
              </TableColumn>
              <TableColumn>
                {width}
              </TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
        <ResizeObserver watchWidth watchHeight onResize={this.handleResize} />
      </Paper>
    );
  }
}
