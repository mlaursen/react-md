import _random from 'lodash/random';
import { adjectives } from './adjectives';
import { nouns } from './nouns';

const adjs = adjectives.terms;
const pronouns = nouns.terms;
const randomAdj = adjs[Math.floor(Math.random() * adjs.length)];
const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];

export const nameGenerator = () =>
  `${randomAdj} ${randomPronoun} ${_random(1, 25)}`;
