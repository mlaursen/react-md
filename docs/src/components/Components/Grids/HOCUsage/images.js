import { UNSPLASH_IT } from 'constants/application';

export default [1, 20, 5, 100, 80, 32, 9, 51, 76, 111, 18, 49, 85, 67, 45].map(image => ({
  key: `image-${image}`,
  url: `${UNSPLASH_IT}/110?image=${image}`,
}));
