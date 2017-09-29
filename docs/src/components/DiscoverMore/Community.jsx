import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-md/lib/Media/Media';

import Markdown from 'components/Markdown';
import withMinHeight from 'components/hoc/withMinHeight';

const markdown = `
# Community

> There really isn't one at the moment.

If you want to see the progress of \`react-md\` or reach out to the community with a question,
you can chat with me on [Slack](https://react-md.herokuapp.com/) or use the contact email.
`;

const Community = ({ style }) => (
  <section style={style} className="md-grid md-grid--stacked">
    <Markdown markdown={markdown} className="md-text-container md-cell md-cell--12" />
    <div className="md-text-container md-cell md-cell--12">
      <Media>
        <iframe src="https://www.youtube.com/embed/8Mn_GHPETaU" />
      </Media>
    </div>
  </section>
);

Community.propTypes = {
  style: PropTypes.object,
};

export default withMinHeight(Community);
