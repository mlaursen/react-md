import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Route } from 'react-router-dom';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';

const Link = ({ label, to, exact, icon, href, avatar, routes }) => (
  <Route path={to} exact={exact}>
    {({ match }) => {
      let leftIcon;
      let component;
      let nestedItems;
      if (href) {
        component = 'a';
      } else if (to && !routes) {
        component = RouterLink;
      }

      if (icon) {
        leftIcon = <FontIcon>{icon}</FontIcon>;
      }

      if (avatar) {
        leftIcon = <Avatar {...avatar} iconSized />;
      }

      if (routes) {
        nestedItems = routes.map(route => <Link {...route} key={route.to || route.label} />);
      }

      return (
        <ListItem
          href={href}
          component={component}
          active={!!match && !href}
          to={to}
          rel={href && 'noopener noreferrer'}
          primaryText={label}
          leftIcon={leftIcon}
          nestedItems={nestedItems}
          defaultVisible={routes && !!match}
        />
      );
    }}
  </Route>
);

Link.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  exact: PropTypes.bool,
  icon: PropTypes.node,
  href: PropTypes.string,
  avatar: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  routes: PropTypes.arrayOf(PropTypes.object),
};
export default Link;
