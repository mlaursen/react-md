import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import Button from 'react-md/lib/Buttons/Button';

import Section from './Section';
import FindInPage from './FindInPage';

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

    this.state = { finderVisible: false };
  }

  _toggleFinder = () => {
    this.setState({ finderVisible: !this.state.finderVisible });
  };

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
        <Button
          key="fab"
          floating
          secondary
          fixed
          onClick={this._toggleFinder}
          tooltipPosition="left"
          tooltipLabel="Find SassDoc in Page"
        >
          find_in_page
        </Button>,
        <FindInPage
          key="finder"
          visible={this.state.finderVisible}
          onVisibilityToggle={this._toggleFinder}
          placeholders={placeholders}
          variables={variables}
          functions={functions}
          mixins={mixins}
        />,
      ];
    }

    return (
      <section {...props} className={cn('md-grid md-grid--40-16', className)}>
        {children}
      </section>
    );
  }
}
