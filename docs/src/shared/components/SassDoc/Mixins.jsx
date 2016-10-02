import React, { PureComponent, PropTypes } from 'react';

import mixinShape from './mixinShape';
import Mixin from './Mixin';

export default class Mixins extends PureComponent {
  static propTypes = {
    rawFile: PropTypes.string.isRequired,
    mixins: PropTypes.arrayOf(mixinShape),
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { mixins, rawFile } = this.props;
    return (
      <section className="md-cell md-cell--12">
        <header>
          <h2 className="md-display-1">Mixins</h2>
        </header>
        {mixins.map(mixin => <Mixin key={mixin.context.name} mixin={mixin} rawFile={rawFile} />)}
      </section>
    );
  }
}
