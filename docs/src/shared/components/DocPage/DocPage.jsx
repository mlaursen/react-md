import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import './_doc-page.scss';
import Header from './Header';
import Example from './Example';
import DocgenPropTypes from './DocgenPropTypes';
import { toClassName } from 'utils/StringUtils';

export default class DocPage extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    examples: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
    })).isRequired,
    docgens: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      props: PropTypes.object.isRequired,
    })).isRequired,
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    examples: [],
    docgens: [],
  };

  render() {
    const { name, description, examples, docgens, style, className, mobile, tablet } = this.props;

    return (
      <main
        style={style}
        className={cn(`react-doc doc-component-${toClassName(name)}`, className)}
      >
        <Header name={name} description={description} />
        <div className="md-card-list">
          {examples.map((example, key) => <Example key={key} {...example} fallbackId={`example-${key}`} />)}
        </div>
        <h2 className="md-headline">Prop Types</h2>
        <div className="md-card-list">
          {docgens.map((docgen, key) => <DocgenPropTypes key={key} {...docgen} mobile={mobile} tablet={tablet} />)}
        </div>
      </main>
    );
  }
}
