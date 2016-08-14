import React, { PureComponent, PropTypes } from 'react';
import IconButton from 'react-md/lib/Buttons/IconButton';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md/lib/DataTables';

import { GITHUB_LINK } from 'constants';
import { sort } from 'utils/ListUtils';
import { toPropTypeId } from 'utils/StringUtils';
import Markdown from 'components/Markdown';
import PropTypesRow from './PropTypesRow';

export default class DocgenPropTypes extends PureComponent {
  constructor(props) {
    super(props);

    const propList = Object.keys(props.props).map(name => ({ name, ...props.props[name] }));

    this.state = {
      ascending: true,
      sortedComponents: sort(propList, 'name', true),
    };
  }

  static propTypes = {
    component: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
  };

  _sort = () => {
    const ascending = !this.state.ascending;
    this.setState({
      ascending,
      sortedComponents: sort(this.state.sortedComponents, 'name', ascending),
    });
  };

  render() {
    const { ascending, sortedComponents } = this.state;
    const { component, source, description } = this.props;

    const rows = sortedComponents.map(props => <PropTypesRow key={props.name} {...props} />);

    return (
      <Card
        id={`prop-types-${toPropTypeId(component)}`}
        className="component-prop-types"
        raise={false}
        tableCard
      >
        <CardTitle title={component}>
          <IconButton
            href={`${GITHUB_LINK}/blob/master/${source}`}
            iconClassName="fa fa-github"
            tooltipLabel={`Github source for ${component}`}
            tooltipPosition="left"
          />
        </CardTitle>
        <Markdown markdown={description} className="md-card-text" />
        <DataTable plain>
          <TableHeader>
            <TableRow autoAdjust={false}>
              <TableColumn className="adjusted" onClick={this._sort} sorted={ascending}>Prop name</TableColumn>
              <TableColumn className="adjusted">Prop type</TableColumn>
              <TableColumn className="grow">Description</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </DataTable>
      </Card>
    );
  }
}
