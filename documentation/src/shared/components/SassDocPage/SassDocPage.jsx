import React, { PureComponent, PropTypes } from 'react';

import Section from './Section';

export default class SassDocPage extends PureComponent {
  static propTypes = {
    sassdoc: PropTypes.shape({
      placeholders: PropTypes.array.isRequired,
      variables: PropTypes.array.isRequired,
      mixins: PropTypes.array.isRequired,
    }),
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { sassdoc } = this.props;
    if (!sassdoc) {
      return null;
    }

    const { placeholders, variables, functions, mixins } = sassdoc;
    return (
      <div className="md-grid md-grid--40-16">
        <Section title="Placeholders" data={placeholders} />
        <Section title="Variables" data={variables} />
        <Section title="Functions" data={functions} />
        <Section title="Mixins" data={mixins} />
      </div>
    );
  }
}
