import randomBoolean from './randomBoolean';

export default function randomBooleans(size = 1) {
  return [...new Array(size)].map(() => randomBoolean());
}
