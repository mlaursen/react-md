import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DocumentationPage from 'components/DocumentationPage';
import componentMethods from 'propTypes/componentMethods';
import componentProps from 'propTypes/componentProps';

import PropTypesCard from './PropTypesCard';

export default class PropTypesPage extends PureComponent {
  static propTypes = {
    docgenRequest: PropTypes.func.isRequired,
    docgens: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.string.isRequired,
      component: PropTypes.string.isRequired,
      methods: PropTypes.arrayOf(componentMethods).isRequired,
      props: PropTypes.arrayOf(componentProps).isRequired,
    })),
    component: PropTypes.string.isRequired,
    section: PropTypes.string,
    toolbarTitle: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { docgenRequest, component, section } = this.props;
    docgenRequest(component, section);
  }

  render() {
    const { docgens, toolbarTitle } = this.props;
    return (
      <DocumentationPage loading={docgens === null} title={`${toolbarTitle} Prop Types`} className="prop-types">
        {docgens !== null ? docgens.map(docgen => <PropTypesCard {...docgen} key={docgen.component} />) : null}
      </DocumentationPage>
    );
  }
}
