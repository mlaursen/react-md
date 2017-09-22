import React from 'react';
import Media from 'react-md/lib/Media/Media';

import Markdown from 'components/Markdown';

const markdown = `
# Community

> There really isn't one at the moment.

If you want to see the progress of \`react-md\` or reach out to the community with a question,
you can chat with me on [Slack](https://react-md.herokuapp.com/) or use the contact email.
`;

const Community = () => (
  <section className="md-grid">
    <Markdown markdown={markdown} className="md-text-container md-cell md-cell--12" />
    <div className="md-text-container md-cell md-cell--12">
      <Media>
        <iframe src="https://www.youtube.com/embed/8Mn_GHPETaU" />
      </Media>
    </div>
  </section>
);

export default Community;
