import _random from 'lodash/random';

export const randomAvatarGenerator = (avatars) =>
  `${avatars[_random(1, avatars.length) - 1]}`;
