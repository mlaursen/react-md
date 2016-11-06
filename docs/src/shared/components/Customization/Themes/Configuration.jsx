import React, { PropTypes } from 'react';
import SelectField from 'react-md/lib/SelectFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';

const HUES = [100, 200, 400, 700];

const Configuration = ({
  primary,
  secondary,
  hue,
  light,
  saved,
  saveDisabled,
  onPrimaryChange,
  onSecondaryChange,
  onHueChange,
  onLightChange,
  onSaveChange,
  filteredPrimaries,
  filteredSecondaries,
}) => (
  <section className="md-cell md-cell--8 md-cell--6-desktop">
    <h3 className="md-title">Theme Configuration</h3>
    <SelectionControl
      id="light-theme"
      type="checkbox"
      name="theme"
      checked={light}
      label="Light theme"
      onChange={onLightChange}
    />
    <SelectionControl
      id="save-theme"
      type="checkbox"
      name="theme"
      checked={saved}
      label="Save for future visits"
      disabled={saveDisabled}
      onChange={onSaveChange}
    />
    <i>
      When the save for future visits checkbox is checked, a key in your local storage will
      be created containing your theme. If you do not check this checkbox, the default website
      theme will be applied when you leave this page.
    </i>
    <SelectField
      id="primary"
      label="Primary color"
      value={primary}
      menuItems={filteredPrimaries}
      onChange={onPrimaryChange}
    />
    <SelectField
      id="secondary"
      label="Secondary color"
      value={secondary}
      menuItems={filteredSecondaries}
      onChange={onSecondaryChange}
    />
    <SelectField
      id="hue"
      label="Secondary hue"
      value={hue}
      menuItems={HUES}
      onChange={onHueChange}
    />
  </section>
);

Configuration.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  hue: PropTypes.number.isRequired,
  light: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  saveDisabled: PropTypes.bool,
  filteredPrimaries: PropTypes.arrayOf(PropTypes.string).isRequired,
  filteredSecondaries: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPrimaryChange: PropTypes.func.isRequired,
  onSecondaryChange: PropTypes.func.isRequired,
  onHueChange: PropTypes.func.isRequired,
  onLightChange: PropTypes.func.isRequired,
  onSaveChange: PropTypes.func.isRequired,
};

export default Configuration;
