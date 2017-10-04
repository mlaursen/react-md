import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, TableCardHeader } from 'react-md';

import { QuickLinkTitle } from 'components/QuickLink';

const ComponentTitle = ({
  mobile,
  id,
  source,
  component,
  propFilter,
  mobileFilterVisible,
  onFilter,
  onMobileFilterShow,
  onMobileFilterHide,
}) => {
  const filter = (
    <TextField
      id={`${id}-proptypes-filter`}
      key="filter"
      placeholder="Filter props"
      fullWidth={false}
      value={propFilter}
      onChange={onFilter}
    />
  );

  let actions;
  let children;
  if (mobile) {
    actions = <Button key="close" onClick={onMobileFilterHide} icon>arrow_back</Button>;
    children = <Button key="open" onClick={onMobileFilterShow} icon>filter_list</Button>;
  } else {
    children = [
      filter,
      <Button key="source" href={source} iconClassName="fa fa-github" icon />,
    ];
  }
  return (
    <TableCardHeader
      className="quick-link"
      title={<QuickLinkTitle id={`${id}-proptypes`} title={component} desktop={!mobile} />}
      titleId={`${id}-proptypes`}
      actions={actions}
      visible={mobileFilterVisible}
      contextualChildren={filter}
    >
      {children}
    </TableCardHeader>
  );
};

ComponentTitle.propTypes = {
  mobile: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
  propFilter: PropTypes.string.isRequired,
  mobileFilterVisible: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  onMobileFilterShow: PropTypes.func.isRequired,
  onMobileFilterHide: PropTypes.func.isRequired,
};

export default ComponentTitle;
