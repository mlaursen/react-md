import React from 'react';
import Avatar from 'react-md/lib/Avatars';

import randomImage from 'utils/RandomUtils/randomImage';

const RandomAvatar = props => <Avatar src={randomImage()} {...props} />;

RandomAvatar.propTypes = Avatar.propTypes;
RandomAvatar.defaultProps = {
  role: 'presentation',
};

export default RandomAvatar;
