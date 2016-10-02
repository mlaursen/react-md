import React, { PureComponent, PropTypes, isValidElement } from 'react';
import cn from 'classnames';
import Divider from 'react-md/lib/Dividers';

import Markdown from 'components/Markdown';

export default class Header extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  };

  render() {
    const { name, description, className } = this.props;

    let resolvedDescription;
    if (isValidElement(description)) {
      resolvedDescription = description;
    } else {
      resolvedDescription = Array.isArray(description) ? description : [description];
      resolvedDescription = resolvedDescription.map((md, i) => <Markdown className="md-text-container" key={i} markdown={md} />);
    }
    return (
      <header className={cn('md-grid', className)}>
        <h1 className="md-display-1 md-cell md-cell--12">{name}</h1>
        <Divider className="md-cell md-cell--12" style={{ marginBottom: 16 }} />
        <section className="md-cell md-cell--12">
          {resolvedDescription}
        </section>
      </header>
    );
  }
}
