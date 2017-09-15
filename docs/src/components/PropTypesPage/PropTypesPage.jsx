import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DocumentationPage from 'components/DocumentationPage';
import componentFunctions from 'propTypes/componentFunctions';
import componentProps from 'propTypes/componentProps';

import './_styles.scss';
import PropTypesCard from './PropTypesCard';

export default class PropTypesPage extends PureComponent {
  static propTypes = {
    docgenRequest: PropTypes.func.isRequired,
    docgens: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.string.isRequired,
      component: PropTypes.string.isRequired,
      functions: PropTypes.arrayOf(componentFunctions).isRequired,
      props: PropTypes.arrayOf(componentProps).isRequired,
    })),
    component: PropTypes.string.isRequired,
    section: PropTypes.string,
    toolbarTitle: PropTypes.string.isRequired,
    mobile: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { docgenRequest, component, section } = this.props;
    docgenRequest(component, section);
  }

  componentWillReceiveProps(nextProps) {
    const { component, section, docgenRequest } = nextProps;
    if (this.props.component !== component) {
      docgenRequest(component, section);
    }
  }

  render() {
    const { docgens, toolbarTitle, mobile } = this.props;
    return (
      <DocumentationPage loading={docgens === null} title={`${toolbarTitle} Prop Types`} className="prop-types">
        {docgens !== null ? docgens.map(docgen => <PropTypesCard {...docgen} key={docgen.component} mobile={mobile} />) : null}
      </DocumentationPage>
    );
  }
}
