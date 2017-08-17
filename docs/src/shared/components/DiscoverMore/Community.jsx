import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Media from 'react-md/lib/Media/Media';

import Markdown from 'components/Markdown';

const markdown = `
# Community

> There really isn't one atm.

If you want to see the progress of \`react-md\` or reach out to the community with a question,
you can chat with me on [Slack](https://react-md.herokuapp.com/) or use the contact email.
`;

export default class Community extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { style, className } = this.props;
    return (
      <section style={style} className={cn('md-grid', className)}>
        <Markdown markdown={markdown} className="md-text-container" />
        <div className="md-text-container">
          <Media>
            <iframe src="https://www.youtube.com/embed/8Mn_GHPETaU" />
          </Media>
        </div>
      </section>
    );
  }
}
