import DrawerTypes from './DrawerTypes';
const {
  FULL_HEIGHT,
  CLIPPED,
  FLOATING,
  PERSISTENT,
  PERSISTENT_MINI,
  TEMPORARY,
  TEMPORARY_MINI,
} = DrawerTypes;

export function isTemporary(type) {
  return [TEMPORARY, TEMPORARY_MINI].indexOf(type) !== -1;
}

export function isPersistent(type) {
  return [PERSISTENT, PERSISTENT_MINI].indexOf(type) !== -1;
}

export function isPermanent(type) {
  return [FULL_HEIGHT, CLIPPED, FLOATING].indexOf(type) !== -1;
}

export function isMini(type) {
  return [PERSISTENT_MINI, TEMPORARY_MINI].indexOf(type) !== -1;
}
