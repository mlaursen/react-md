/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Cell, Card, Media } from 'react-md';

import './_styles.scss';
import images from './images';

const CellCard = ({ children }) => (
  <Cell size={1}>
    {({ className }) => <Card className={className}>{children}</Card>}
  </Cell>
);

const HOCUsage = () => (
  <Grid container="pictures">
    {({ className }) => (
      <section className={className}>
        {images.map(({ key, url }) => (
          <CellCard key={key}>
            <Media>
              <img src={url} alt="Something" />
            </Media>
          </CellCard>
        ))}
      </section>
    )}
  </Grid>
);
export default HOCUsage;
