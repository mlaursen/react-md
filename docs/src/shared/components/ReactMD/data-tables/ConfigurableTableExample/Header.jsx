import React, { PropTypes } from 'react';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';

import FontIcon from 'react-md/lib/FontIcons';
// import IconSeparator from 'react-md/lib/Helpers/IconSeparator';

// Since the fixed stuff comes from context and most components are Pure, can cheat a bit
// for the demo to do timestamps as keys to get the update. The fixed part should really
// be more static instead of dynamic
const Header = ({ titleSorted, yearSorted, sort }) => (
  <TableHeader>
    <TableRow>
      <TableColumn
        key={Date.now()}
        sorted={titleSorted}
        onClick={typeof titleSorted === 'boolean' ? sort : null}
        tooltipLabel="The movie's title"
      >
        Title
      </TableColumn>
      <TableColumn
        key={Date.now() + 1}
        numeric
        sorted={yearSorted}
        onClick={typeof yearSorted === 'boolean' ? sort : null}
        tooltipLabel="The year the movie was released"
      >
        Year
      </TableColumn>
      <EditDialogColumn
        key={Date.now() + 2}
        inline
        noIcon
        leftIcon={<FontIcon>chat</FontIcon>}
        defaultValue="Comments"
        tooltipLabel="Add a comment!"
      />
    </TableRow>
  </TableHeader>
);

Header.propTypes = {
  sort: PropTypes.func.isRequired,
  titleSorted: PropTypes.bool,
  yearSorted: PropTypes.bool,
};

export default Header;
