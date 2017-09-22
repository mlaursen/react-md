import React from 'react';
import SVGIcon from 'react-md/lib/SVGIcons';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';

import check from 'icons/check.svg';
import favorite from 'icons/favorite.svg';
import favoriteBorder from 'icons/favorite_border.svg';

const checkboxControls = [{
  label: 'Checkbox 1',
  value: '1',
  checkedCheckboxIcon: <SVGIcon use={favorite.url} />,
  uncheckedCheckboxIcon: <SVGIcon use={favoriteBorder.url} />,
}, {
  label: 'Checkbox 2',
  value: '2',
}, {
  label: 'Checkbox 3',
  value: '3',
  disabled: true,
  uncheckedCheckboxIcon: null,
}];

const radioControls = [{
  label: 'Radio 1',
  value: '1',
  checkedRadioIcon: <SVGIcon use={favorite.url} />,
  uncheckedRadioIcon: <SVGIcon use={favoriteBorder.url} />,
}, {
  label: 'Radio 2',
  value: '2',
}, {
  label: 'Radio 3',
  value: '3',
  disabled: true,
  uncheckedRadioIcon: null,
}];

const UsingCustomIcons = () => (
  <div className="md-grid">
    <div className="md-cell md-cell--4">
      <Checkbox
        id="custom-checkbox-icon"
        name="using-custom-icons"
        label="Favorite checkbox"
        checkedCheckboxIcon={<SVGIcon use={favorite.url} />}
        uncheckedCheckboxIcon={<SVGIcon use={favoriteBorder.url} />}
      />
      <SelectionControl
        id="custom-checkbox-icon-2"
        name="using-custom-icons"
        type="checkbox"
        label="Check checkbox"
        checkedCheckboxIcon={<SVGIcon use={check.url} />}
      />
    </div>
    <SelectionControlGroup
      id="using-custom-checkbox-icons"
      name="using-custom-icons"
      label="Some checkbox list"
      type="checkbox"
      controls={checkboxControls}
      checkedCheckboxIcon={<SVGIcon use={check.url} />}
      className="md-cell md-cell--4"
    />
    <SelectionControlGroup
      id="using-custom-radio-icons"
      name="using-custom-icons"
      label="Some radio list"
      type="radio"
      controls={radioControls}
      checkedCheckboxIcon={<SVGIcon use={check.url} />}
      className="md-cell md-cell--4"
    />
  </div>
);
export default UsingCustomIcons;
