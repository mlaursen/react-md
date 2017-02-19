import React, { PropTypes } from 'react';
import Switch from 'react-md/lib/SelectionControls/Switch';
import Layover from 'react-md/lib/Helpers/Layover';
import SelectionControlGroup from 'react-md/lib/SelectionControls/SelectionControlGroup';
import TextField from 'react-md/lib/TextFields';

const positions = Object.keys(Layover.Positions).map(key => ({
  label: key,
  value: Layover.Positions[key],
}));

const contents = [{ label: 'List', value: 'list' }, { label: 'Card', value: 'card' }];

const PlaygroundForm = ({ onChange, card, defaultText, defaultTitle }) => (
  <form name="playground-form" onChange={onChange} className="md-grid">
    <SelectionControlGroup
      className="md-cell md-cell--12"
      inline
      label="Layover Children"
      controls={contents}
      id="contents"
      name="contents"
      type="radio"
    />
    {card && [
      <TextField
        id="title"
        key="title"
        label="Card Title"
        defaultValue={defaultTitle}
        className="md-cell"
      />,
      <TextField
        id="text"
        key="text"
        label="Card Markdown"
        defaultValue={defaultText}
        className="md-cell"
        rows={4}
      />,
      <TextField
        id="maxWidth"
        key="max-width"
        label="Card max-width"
        type="number"
        className="md-cell"
        min={180}
        step={1}
      />,
    ]}
    <SelectionControlGroup
      className="md-cell md-cell--12"
      inline
      label="Layover Position"
      controls={positions}
      defaultValue={Layover.Positions.BELOW}
      id="position"
      name="position"
      type="radio"
    />
    <Switch
      id="centered"
      name="layover-controls"
      label="Center the children relative to toggle"
      className="md-cell"
    />
    <Switch
      id="vertical"
      name="layover-controls"
      label="Fix layover within playground vertical scrolling"
      className="md-cell"
    />
    <Switch
      id="horizontal"
      name="layover-controls"
      label="Fix layover within playground horizontal scrolling"
      className="md-cell"
    />
    <Switch
      id="closeOnOutsideClick"
      name="layover-controls"
      label="Close the content on outside click"
      defaultChecked
      className="md-cell"
    />
    <Switch
      id="sameWidth"
      name="layover-controls"
      label="Force child to be same width as toggle"
      className="md-cell"
    />
  </form>
);

PlaygroundForm.propTypes = {
  defaultTitle: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  card: PropTypes.bool,
};

export default PlaygroundForm;
