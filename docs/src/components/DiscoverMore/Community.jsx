import React from 'react';
import PropTypes from 'prop-types';
import { GridList, Media } from 'react-md';

import Markdown from 'components/Markdown';
import withMinHeight from 'components/hoc/withMinHeight';

const markdown = `
# Community

> There really isn't one at the moment.

If you want to see the progress of \`react-md\` or reach out to the community with a question,
you can chat with me on [Slack](https://react-md.herokuapp.com/) or use the contact email.
`;

const Community = ({ style }) => (
  <GridList stacked component="section" size={12} style={style} cellClassName="md-text-container">
    <Markdown markdown={markdown} />
    <div>
      <Media>
        <iframe src="https://www.youtube.com/embed/8Mn_GHPETaU" />
      </Media>
    </div>
  </GridList>
);

Community.propTypes = {
  style: PropTypes.object,
};

export default withMinHeight(Community);
