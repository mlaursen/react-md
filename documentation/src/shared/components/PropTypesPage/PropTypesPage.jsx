import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import docgenShape from './docgenShape';
import PropTypeCard from './PropTypeCard';

export default class PropTypesPage extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,
    docgen: PropTypes.arrayOf(docgenShape),
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { docgen, className, mobile, tablet, desktop, ...props } = this.props;
    if (!docgen) {
      return null;
    }

    return (
      <section {...props} className={cn('prop-types-page md-grid md-grid--40-16', className)}>
        {docgen.map(doc => <PropTypeCard key={doc.component} docgen={doc} mobile={mobile} tablet={tablet} desktop={desktop} />)}
      </section>
    );
  }
}
