import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TabsContainer, Tabs, Tab } from 'react-md/lib/Tabs';

import { fetchSassDoc, fetchDocgen } from 'actions/fetch';

@connect(({ documentation: { sassdocs, docgens } }, { params: { component } }) => ({
  sassdoc: sassdocs[component],
  docgen: docgens[component],
}), { fetchSassDoc, fetchDocgen })
export default class DocPage extends PureComponent {
  static propTypes = {
    params: PropTypes.shape({
      component: PropTypes.string,
      section: PropTypes.string,
    }).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    fetchSassDoc: PropTypes.func.isRequired,
    fetchDocgen: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { params: { component }, fetchDocgen, fetchSassDoc } = this.props;
    fetchDocgen(component);
    fetchSassDoc(component);
  }

  render() {
    return (
      <TabsContainer component="div" colored>
        <Tabs tabId="documentation">
          <Tab label="Examples" id="documentation-examples" />
          <Tab label="Prop Types" id="documentation-prop-types" />
          <Tab label="SassDoc" id="documentation-sassdoc" />
        </Tabs>
      </TabsContainer>
    );
  }
}
