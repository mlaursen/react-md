import React, { PureComponent, PropTypes } from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
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
    let children;
    if (!docgen || docgen.fetching) {
      children = <CircularProgress id="loading-sassdoc" key="loader" />;
    } else {
      children = docgen.map(doc => <PropTypeCard key={doc.component} docgen={doc} mobile={mobile} tablet={tablet} desktop={desktop} />);
    }

    return (
      <section {...props} className={cn('prop-types-page md-grid md-grid--40-16', className)}>
        {children}
      </section>
    );
  }
}
