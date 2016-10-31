import React from 'react';

import sassdocShape from './sassdocShape';

function preventDefault(e) {
  e.preventDefault();
  window.location = e.target.getAttribute('href');
}

const SassDoc = ({ sassdoc: { /* code, */name, type/* , path, description, usedBy, examples, parameters, returns*/ } }) => (
  <div className="sassdoc" id={`${type}-${name}`}>
    <a href={`#${type}-${name}`} className="md-headline" onClick={preventDefault}>{name}</a>
  </div>
);

SassDoc.propTypes = {
  sassdoc: sassdocShape,
};

export default SassDoc;
