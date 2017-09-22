import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'react-md/lib/SelectFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';

import { SECONDARY_HUES, PRIMARY, SECONDARY, HUE, LIGHT } from 'constants/colors';
import Message from './Message';

const NAME = 'theme-configuration';

const Configuration = ({
  primary,
  secondary,
  hue,
  light,
  saved,
  saveDisabled,
  onChange,
  onSelectChange,
  filteredPrimaries,
  filteredSecondaries,
}) => (
  <form
    id="theme-configuration-form"
    name={NAME}
    className="md-cell md-cell--8 md-cell--6-desktop"
    onChange={onChange}
  >
    <h3 className="md-title">Theme Configuration</h3>
    <SelectionControl
      id={LIGHT}
      type="checkbox"
      name={NAME}
      defaultChecked={light}
      label="Light theme"
    />
    <SelectionControl
      id="save-theme"
      type="checkbox"
      name={NAME}
      defaultChecked={saved}
      label="Save for future visits"
      disabled={saveDisabled}
    />
    <Message />
    <SelectField
      id={PRIMARY}
      label="Primary color"
      value={primary}
      menuItems={filteredPrimaries}
      className="md-cell"
      onChange={onSelectChange}
      simplifiedMenu={false}
    />
    <SelectField
      id={SECONDARY}
      label="Secondary color"
      value={secondary}
      menuItems={filteredSecondaries}
      className="md-cell"
      onChange={onSelectChange}
      simplifiedMenu={false}
    />
    <SelectField
      id={HUE}
      label="Secondary hue"
      value={hue}
      menuItems={SECONDARY_HUES}
      className="md-cell"
      onChange={onSelectChange}
      simplifiedMenu={false}
    />
  </form>
);

Configuration.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  hue: PropTypes.number.isRequired,
  light: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  filteredPrimaries: PropTypes.arrayOf(PropTypes.string).isRequired,
  filteredSecondaries: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
};

export default Configuration;
