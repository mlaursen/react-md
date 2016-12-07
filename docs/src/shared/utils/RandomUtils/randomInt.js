export default function randomInt({ min, max } = { min: 0, max: 10 }) {
  return Math.floor(Math.random() * max) + min;
}
