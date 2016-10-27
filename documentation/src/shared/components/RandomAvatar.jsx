import React, { PropTypes } from 'react';
import cn from 'classnames';

import randomImage from 'utils/RandomUtils/randomImage';

const RandomAvatar = props => <Avatar src={randomImage()} {...props} />;

RandomAvatar.propTypes = Avatar.propTypes;
RandomAvatar.defaultProps = {
  role: 'presentation',
};

export default RandomAvatar;
