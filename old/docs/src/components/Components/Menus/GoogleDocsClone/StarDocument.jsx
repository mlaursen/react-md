import React from 'react';
import { FontIcon, SelectionControl, injectTooltip } from 'react-md';

const Checkbox = injectTooltip(SelectionControl);

const StarDocument = () => (
  <Checkbox
    id="star-document"
    name="document-controls"
    type="checkbox"
    inline
    tooltipLabel="Star"
    tooltipDelay={300}
    aria-label="Star the document"
    className="md-btn--toolbar"
    checkedCheckboxIcon={<FontIcon>star</FontIcon>}
    uncheckedCheckboxIcon={<FontIcon>star_border</FontIcon>}
  />
);
export default StarDocument;
