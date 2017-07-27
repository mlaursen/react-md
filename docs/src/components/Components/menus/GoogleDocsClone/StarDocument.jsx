import React from 'react';
import injectTooltip from 'react-md/lib/Tooltips/injectTooltip';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';

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
    checkedCheckboxIconChildren="star"
    uncheckedCheckboxIconChildren="star_border"
  />
);
export default StarDocument;
