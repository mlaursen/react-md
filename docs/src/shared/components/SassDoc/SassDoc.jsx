import React, { PureComponent, PropTypes } from 'react';

import './_styles.scss';
import mixinShape from './mixinShape';
import variableShape from './variableShape';
import placeholderShape from './placeholderShape';
import Placeholders from './Placeholders';
import Variables from './Variables';
import Functions from './Functions';
import Mixins from './Mixins';

export default class SassDoc extends PureComponent {
  static propTypes = {
    rawFile: PropTypes.string.isRequired,
    sassdoc: PropTypes.shape({
      placeholders: PropTypes.arrayOf(placeholderShape).isRequired,
      variables: PropTypes.arrayOf(variableShape).isRequired,
      mixins: PropTypes.arrayOf(mixinShape).isRequired,
    }).isRequired,
  };

  render() {
    const {
      rawFile,
      sassdoc: {
        variables,
        mixins,
        functions,
        placeholders,
      },
    } = this.props;

    return (
      <section className="md-grid md-grid--40-16">
        <Placeholders placeholder={placeholders} rawFile={rawFile} />
        <Variables rawFile={rawFile} variables={variables} />
        <Functions functions={functions} rawFile={rawFile} />
        <Mixins mixins={mixins} rawFile={rawFile} />
      </section>
    );
  }
}
