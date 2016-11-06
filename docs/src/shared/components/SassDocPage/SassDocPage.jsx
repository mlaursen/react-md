import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import Section from './Section';

export default class SassDocPage extends PureComponent {
  static propTypes = {
    sassdoc: PropTypes.shape({
      fetching: PropTypes.bool,
      placeholders: PropTypes.array.isRequired,
      variables: PropTypes.array.isRequired,
      functions: PropTypes.array.isRequired,
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
    const { sassdoc, className, ...props } = this.props;

    let children;
    if (!sassdoc || sassdoc.fetching) {
      children = <CircularProgress id="loading-sassdoc" key="loader" />;
    } else {
      const { placeholders, variables, functions, mixins } = sassdoc;
      children = [
        <Section key="placeholders" title="Placeholders" data={placeholders} />,
        <Section key="variables" title="Variables" data={variables} />,
        <Section key="functions" title="Functions" data={functions} />,
        <Section key="mixins" title="Mixins" data={mixins} />,
      ];
    }

    return (
      <section {...props} className={cn('md-grid md-grid--40-16', className)}>
        {children}
      </section>
    );
  }
}
