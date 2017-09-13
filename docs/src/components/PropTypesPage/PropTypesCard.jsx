import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import { sortBy } from 'lodash/collection';

import componentFunctions from 'propTypes/componentFunctions';
import componentProps from 'propTypes/componentProps';
import Markdown from 'components/Markdown';

import ComponentTitle from './ComponentTitle';
import PropTypesTable from './PropTypesTable';
import EnumsSection from './EnumsSection';
import FunctionsSection from './FunctionsSection';

export default class PropTypesCard extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    mobile: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    functions: PropTypes.arrayOf(componentFunctions).isRequired,
    props: PropTypes.arrayOf(componentProps).isRequired,
    enums: PropTypes.arrayOf(PropTypes.object).isRequired,
    getters: PropTypes.arrayOf(PropTypes.object).isRequired,
    description: PropTypes.string,
  };

  constructor(props) {
    super();

    this.indexer = new Fuse(props.props, {
      keys: [{ name: 'propName', weight: 0.75 }, { name: 'description', weight: 0.25 }],
    });

    this.state = {
      propFilter: '',
      ascending: true,
      visibleProps: this.sort(true, props.props),
    };
  }

  sort = (ascending = this.state.ascending, visibleProps = this.state.visibleProps) => {
    if (ascending) {
      return sortBy(visibleProps, ['propName']);
    }

    return visibleProps.slice().reverse();
  };

  handleFilter = (propFilter) => {
    const visibleProps = propFilter ? this.indexer.search(propFilter) : this.sort(true, this.props.props);
    this.setState({ propFilter, visibleProps });
  };

  handleSort = () => {
    const ascending = !this.state.ascending;
    this.setState({ ascending, visibleProps: this.sort(ascending) });
  };

  render() {
    const { ascending, visibleProps, propFilter } = this.state;
    let { description } = this.props;
    const { id, functions, getters, enums, source, component, mobile } = this.props;
    if (description) {
      description = <Markdown component={CardText} markdown={description} />;
    }

    const sections = [];
    if (enums.length) {
      sections.push(
        <CardTitle title="Enums" key="enums" />,
        ...enums.map(e => <EnumsSection {...e} key={e.name} id={id} />),
      );
    }

    if (getters.length) {
      sections.push(
        <CardTitle title="Getters" key="getters" />,
        ...getters.map(getter => <FunctionsSection key={getter.name} {...getter} id={id} />),
      );
    }

    if (functions.length) {
      sections.push(
        <CardTitle title="Class Functions" key="functions" />,
        ...functions.map(func => <FunctionsSection key={func.name} {...func} id={id} />),
      );
    }

    return (
      <Card className="md-cell md-cell--12 prop-types__card">
        <ComponentTitle
          id={id}
          source={source}
          component={component}
          mobile={mobile}
          onFilter={this.handleFilter}
          propFilter={propFilter}
        />
        {description}
        <PropTypesTable ascending={ascending} sortProps={this.handleSort} visibleProps={visibleProps} baseId={id} />
        {sections}
      </Card>
    );
  }
}
