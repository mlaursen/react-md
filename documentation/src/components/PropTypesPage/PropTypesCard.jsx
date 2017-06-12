import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';

import componentMethods from 'propTypes/componentMethods';
import componentProps from 'propTypes/componentProps';
import Markdown from 'components/Markdown';

// import EnumsSection from './EnumsSection';
import MethodsSection from './MethodsSection';

export default class PropTypesCard extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    methods: PropTypes.arrayOf(componentMethods).isRequired,
    props: PropTypes.arrayOf(componentProps).isRequired,
    enums: PropTypes.arrayOf(PropTypes.object).isRequired,
    getters: PropTypes.arrayOf(PropTypes.object).isRequired,
    description: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { description } = this.props;
    const { id, methods } = this.props;
    if (description) {
      description = [
        <CardTitle key="description-title" id={`${id}-info`} title="Additional Info" />,
        <Markdown key="description-text" component={CardText} markdown={description} />,
      ];
    }

    console.log('this.props.getters:', this.props.getters);

    return (
      <Card className="md-cell md-cell--12 prop-types__card">
        <CardTitle title="Hello" />
        {methods.length ? <CardTitle title="Class Methods" /> : null}
        {methods.map(m => <MethodsSection {...m} key={m.name} id={id} />)}
        {description}
      </Card>
    );
  }
}
