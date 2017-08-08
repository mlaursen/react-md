import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import TableCardHeader from 'react-md/lib/DataTables/TableCardHeader';

export default class ComponentTitle extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    mobile: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    propFilter: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  state = { visible: false };

  open = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { id, source, component, mobile, propFilter, onFilter } = this.props;

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
      actions = <Button key="close" onClick={this.close} icon>arrow_back</Button>;
      children = <Button key="open" onClick={this.open} icon>filter_list</Button>;
    } else {
      children = [
        filter,
        <Button key="source" href={source} iconClassName="fa fa-github" icon />,
      ];
    }
    return (
      <TableCardHeader
        title={component}
        titleId={`${id}-proptypes`}
        actions={actions}
        visible={visible}
      >
        {children}
      </TableCardHeader>
    );
  }
}
