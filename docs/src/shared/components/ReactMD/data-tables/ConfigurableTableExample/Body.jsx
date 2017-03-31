import React, { PropTypes } from 'react';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';

const Body = ({ inline, large, okOnOutsideClick, movies }) => {
  const rows = movies.map(({ title, year }) => (
    <TableRow key={title}>
      <TableColumn grow>{title}</TableColumn>
      <TableColumn numeric>{year}</TableColumn>
      <EditDialogColumn
        label={inline ? null : 'Add some comment'}
        placeholder="Add some comment"
        maxLength={inline ? null : 140}
        title={inline ? null : 'Add some comment'}
        large={inline ? null : large}
        okOnOutsideClick={okOnOutsideClick}
        inline={inline}
      />
    </TableRow>
  ));

  return <TableBody>{rows}</TableBody>;
};

Body.propTypes = {
  large: PropTypes.bool.isRequired,
  inline: PropTypes.bool.isRequired,
  okOnOutsideClick: PropTypes.bool.isRequired,
  movies: PropTypes.array.isRequired,
};

export default Body;
