import React from 'react';
import RandomAvatar from 'components/RandomAvatar';

/**
 * Creates a list of random avatars.
 *
 * @param {Number} amt - The amount to generate
 * @param {Object} props - Any props to apply to the avatar.
 *
 * @return {Array.<Component>} a list of random avatars.
 */
export default function randomAvatars(amt, props) {
  return [...new Array(amt)].map((_, i) => <RandomAvatar key={props && props.key ? props.key + i : i} {...props} />);
}
