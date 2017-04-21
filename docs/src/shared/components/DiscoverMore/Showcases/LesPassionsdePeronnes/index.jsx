import React from 'react';

import ShowcaseCard from '../ShowcaseCard';
import logo from './logo.png';

const description = `
Les Passions de Péronnes offers you to discover wines of terroirs, wines of
vignerons. Most of them are encountered during oeno-tourist trips, telling
us their wines, their hopes sometimes very crazy.
`;

const LesPassionsdePeronnes = () => (
  <ShowcaseCard
    name="Les Passions de Peronnes"
    link="https://bredariol.be/product"
    logo={logo}
    author={{
      name: 'Fadi Khadra',
      github: 'https://github.com/sniphpet',
    }}
    description={description}
  />
);

export default LesPassionsdePeronnes;
