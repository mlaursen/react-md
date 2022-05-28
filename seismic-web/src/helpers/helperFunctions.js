import { ADMIN_USERS } from './constants';

export const isAdmin = (user) => {
  return user && user.email ? ADMIN_USERS.includes(user.email) : false;
};
