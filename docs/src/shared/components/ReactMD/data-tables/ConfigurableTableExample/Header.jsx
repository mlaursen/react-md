import React, { PropTypes } from 'react';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import FontIcon from 'react-md/lib/FontIcons';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';

const Header = ({ titleSorted, yearSorted, sort }) => (
  <TableHeader>
    <TableRow>
      <TableColumn
        sorted={titleSorted}
        onClick={typeof titleSorted === 'boolean' ? sort : null}
        tooltipLabel="The movie's title"
      >
        Title
      </TableColumn>
      <TableColumn
        numeric
        sorted={yearSorted}
        onClick={typeof yearSorted === 'boolean' ? sort : null}
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
);

Header.propTypes = {
  sort: PropTypes.func.isRequired,
  titleSorted: PropTypes.bool,
  yearSorted: PropTypes.bool,
};

export default Header;
