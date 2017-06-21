import PropTypes from 'prop-types';

export default PropTypes.shape({
  avatar_url: PropTypes.string.isRequired,
  events_url: PropTypes.string.isRequired,
  followers_url: PropTypes.string.isRequired,
  following_url: PropTypes.string.isRequired,
  gists_url: PropTypes.string.isRequired,
  gravatar_id: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  organizations_url: PropTypes.string.isRequired,
  received_events_url: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  site_admin: PropTypes.bool.isRequired,
  starred_url: PropTypes.string.isRequired,
  subscriptions_url: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['User', 'Organization']).isRequired,
  url: PropTypes.string.isRequired,
});
