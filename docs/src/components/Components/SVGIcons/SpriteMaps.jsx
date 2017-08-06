import React from 'react';
import SVGIcon from 'react-md/lib/SVGIcons';

import copyright from 'icons/copyright.svg';
import deleteSVG from 'icons/delete.svg';
import done from 'icons/done.svg';

const CopyrightIcon = props => <SVGIcon {...props} use={copyright.url} />;
const DeleteIcon = props => <SVGIcon {...props} use={deleteSVG.url} />;
const DoneIcon = props => <SVGIcon {...props} use={done.url} />;

const SpriteMaps = () => (
  <div className="icons__examples">
    <CopyrightIcon />
    <DeleteIcon secondary />
    <DoneIcon primary />
    <DoneIcon error />
    <DeleteIcon disabled />
  </div>
);
export default SpriteMaps;
