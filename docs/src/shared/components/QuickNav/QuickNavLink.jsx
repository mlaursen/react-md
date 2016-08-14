import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import FontIcon from 'react-md/lib/FontIcons';
import classnames from 'classnames';

export default class QuickNavLink extends PureComponent {
  static propTypes = {
    to: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    align: PropTypes.oneOf(['left', 'right']).isRequired,
    className: PropTypes.string,
  };

  render() {
    const { to, icon, label, name, align, className } = this.props;
    if (!to) {
      return <div className="quick-nav-link" />;
    }

    const fi = <FontIcon>{icon}</FontIcon>;
    return (
      <Link to={to} className={classnames('quick-nav-link', align, className)}>
        {align === 'left' && fi}
        <div className="titles">
          <h6 className="md-subheading-2">{label}</h6>
          <h4 className="md-headline">
            {name}
          </h4>
        </div>
        {align === 'right' && fi}
      </Link>
    );
  }
}
