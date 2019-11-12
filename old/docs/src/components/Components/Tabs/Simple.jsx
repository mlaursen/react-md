import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TabsContainer, Tabs, Tab } from 'react-md';

const Simple = ({ mobile }) => (
  <TabsContainer panelClassName="md-grid" colored>
    <Tabs tabId="simple-tab" mobile={mobile}>
      <Tab label="Tab one">
        <h3>Hello, World!</h3>
      </Tab>
      <Tab label="Tab two">
        <h3>Now look at me!</h3>
      </Tab>
    </Tabs>
  </TabsContainer>
);

Simple.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

export default connect(({ media: { mobile, tablet } }) => ({ mobile: mobile || tablet }))(Simple);
