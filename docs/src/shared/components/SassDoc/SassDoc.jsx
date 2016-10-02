import React, { PureComponent, PropTypes } from 'react';

import './_styles.scss';
import mixinShape from './mixinShape';
import variableShape from './variableShape';
import placeholderShape from './placeholderShape';
import Placeholders from './Placeholders';
import Variables from './Variables';
import Functions from './Functions';
import Mixins from './Mixins';

function extractTypes(sassdocs) {
  const variables = [];
  const mixins = [];
  const placeholders = [];
  const functions = [];

  sassdocs.forEach(sassdoc => {
    switch (sassdoc.context.type) {
      case 'variable':
        variables.push(sassdoc);
        break;
      case 'mixin':
        mixins.push(sassdoc);
        break;
      case 'placeholder':
        placeholders.push(sassdoc);
        break;
      case 'function':
        functions.push(sassdoc);
        break;
      default:
        console.log('Unknown type: ', sassdoc.context.type);
    }
  });

  return { variables, mixins, placeholders, functions };
}

export default class SassDoc extends PureComponent {
  static propTypes = {
    rawFile: PropTypes.string.isRequired,
    sassdoc: PropTypes.arrayOf(PropTypes.oneOfType([
      placeholderShape,
      variableShape,
      mixinShape,
    ])).isRequired,
  };

  render() {
    const { rawFile } = this.props;
    const { variables, mixins, functions, placeholders } = extractTypes(this.props.sassdoc);

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
