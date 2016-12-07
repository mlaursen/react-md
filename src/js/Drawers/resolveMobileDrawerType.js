import DrawerTypes from './DrawerTypes';
import { isPermanent, isPersistent } from './isType';

export default function resolveMobileDrawerType(type, mobile) {
  if (!mobile && !(isPermanent(type) && isPersistent(type))) {
    return type;
  } else if (isPermanent(type) || DrawerTypes.PERSISTENT === type) {
    return DrawerTypes.TEMPORARY;
  }

  return DrawerTypes.TEMPORARY_MINI;
}
