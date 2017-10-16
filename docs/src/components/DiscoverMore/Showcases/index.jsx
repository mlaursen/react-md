import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridList } from 'react-md';

import Markdown from 'components/Markdown';
import withMinHeight from 'components/hoc/withMinHeight';
import LesPassionsdePeronnes from './LesPassionsdePeronnes';
import './_styles.scss';

const markdown = `
## Showcases

The following is a list of products/apps that use react-md other than this documentation site. Their entire
interface might not be implemented with react-md, but it should give a good idea of how it is used.

Want to showcase your app/product? Either open a pull request adding your application or look at
[the github issue](https://github.com/mlaursen/react-md/issues/196) for getting your site added.
`;

const Showcases = ({ style, className }) => (
  <GridList size={12} style={style} className={className}>
    <Markdown markdown={markdown} className="md-text-container" />
    <Grid component="ul" noSpacing className="md-list-unstyled">
      <LesPassionsdePeronnes />
    </Grid>
  </GridList>
);

Showcases.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default withMinHeight(Showcases);
