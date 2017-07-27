import React from 'react';
import Paper from 'react-md/lib/Papers';

import './_styles.scss';

import Color from './Color';

const PRIMARY_INDEX = 5;
const primaries = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const accents = [100, 200, 400, 700];
const colors = [
  { color: 'red', p: 300, a: 100 },
  { color: 'pink', p: 200, a: 100 },
  { color: 'purple', p: 200, a: 100 },
  { color: 'deep-purple', p: 200, a: 100 },
  { color: 'indigo', p: 200, a: 100 },
  { color: 'blue', p: 400, a: 100 },
  { color: 'light-blue', p: 500, a: 400 },
  { color: 'cyan', p: 600 },
  { color: 'teal', p: 400 },
  { color: 'green', p: 500 },
  { color: 'light-green', p: 600 },
  { color: 'lime', p: 800 },
  { color: 'yellow' },
  { color: 'amber' },
  { color: 'orange', p: 700 },
  { color: 'deep-orange', p: 400, a: 200 },
  { color: 'brown', p: 200, a: null },
  { color: 'grey', p: 200, a: null },
  { color: 'blue-grey', p: 200, a: null },
].map(({ color, p, a }) => primaries.concat(a === null ? [] : accents).map((weight, i) => {
  const isAccent = i > primaries.length - 1;
  const name = `md-${color}-${isAccent ? 'a-' : ''}${weight}`;
  const comparator = isAccent ? a : p;
  const light = !comparator || weight <= comparator;

  return {
    color,
    name,
    light,
    divide: i === primaries.length,
  };
}));

const ColorPalette = () => {
  const palette = colors.map((colorHues) => {
    const primary = colorHues[PRIMARY_INDEX];

    const colorBlocks = colorHues.map(({ name, light, divide }) => (
      <Color key={name} name={name} light={light} divide={divide} />
    ));

    return (
      <Paper
        component="ul"
        zDepth={1}
        key={colorHues[0].color}
        className="md-cell md-cell--top md-list-unstyled"
      >
        <Color
          key={primary}
          name={primary.name}
          color={primary.color}
          light={primary.light}
          divide={false}
        />
        {colorBlocks}
      </Paper>
    );
  });

  return (
    <section className="md-grid color-palette">
      {palette}
    </section>
  );
};

export default ColorPalette;
