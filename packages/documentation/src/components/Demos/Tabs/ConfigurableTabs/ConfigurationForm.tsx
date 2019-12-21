import React, { FC } from "react";
import { Checkbox, Fieldset, Form, Radio } from "@react-md/form";
import { Grid } from "@react-md/utils";

import { TabConfiguration } from "./useConfiguration";

const ConfigurationForm: FC<Omit<TabConfiguration, "tabs">> = ({
  // Tabs config
  themed,
  handleThemedChange,
  padded,
  handlePaddedChange,
  automatic,
  handleAutomaticChange,

  // Tab config
  noIcon,
  onlyIcon,
  includeIcon,
  handleIconChange,
  stacked,
  handleStackedChange,
  iconAfter,
  handleIconAfterChange,

  // TabPanel config
  persistent,
  handlePersistentChange,
  disableTransition,
  customTransition,
  handleTransitionChange,
}) => (
  <Form>
    <Grid clone columns={1} tabletColumns={2} largeDesktopColumns={3}>
      <Fieldset legend="Tabs Options">
        <Checkbox
          id="configurable-tabs-theme"
          name="themed"
          label="Themed"
          checked={themed}
          onChange={handleThemedChange}
        />
        <Checkbox
          id="configurable-tabs-padded"
          name="padded"
          label="Padded"
          checked={padded}
          onChange={handlePaddedChange}
        />
        <Checkbox
          id="configurable-tabs-automatic"
          name="automatic"
          label="Automatic Keyboard Selection"
          checked={automatic}
          onChange={handleAutomaticChange}
        />
      </Fieldset>
      <Fieldset legend="Icon Options">
        <Radio
          id="configurable-tabs-icons-none"
          name="icons"
          label="No Icon"
          value="none"
          checked={noIcon}
          onChange={handleIconChange}
        />
        <Radio
          id="configurable-tabs-icons-include"
          name="icons"
          value="include"
          label="Include"
          checked={includeIcon}
          onChange={handleIconChange}
        />
        <Radio
          id="configurable-tabs-icons-only"
          name="icons"
          value="only"
          label="Only Icons"
          checked={onlyIcon}
          onChange={handleIconChange}
        />
        <Checkbox
          id="configurable-tabs-stacked"
          name="stacked"
          label="Stacked"
          checked={stacked}
          onChange={handleStackedChange}
          disabled={!includeIcon}
        />
        <Checkbox
          id="configurable-tabs-icon-after"
          name="iconAfter"
          label="Icon After"
          checked={iconAfter}
          onChange={handleIconAfterChange}
          disabled={!includeIcon}
        />
      </Fieldset>
      <Fieldset legend="Tab Panel Options">
        <Checkbox
          id="configurable-tabs-panel-rendering"
          name="persistent"
          label="Persistent Tabs"
          checked={persistent}
          onChange={handlePersistentChange}
        />
        <Radio
          id="configurable-tabs-transition-enabled"
          name="transition"
          value="enabled"
          label="Transition Enabled"
          checked={!disableTransition && !customTransition}
          onChange={handleTransitionChange}
        />
        <Radio
          id="configurable-tabs-transition-disabled"
          name="transition"
          value="disabled"
          label="Transition Disabled"
          checked={disableTransition}
          onChange={handleTransitionChange}
        />
        <Radio
          id="configurable-tabs-transition-custom"
          name="transition"
          value="custom"
          label="Custom Transition"
          checked={customTransition}
          onChange={handleTransitionChange}
          disabled={persistent}
        />
      </Fieldset>
    </Grid>
  </Form>
);

export default ConfigurationForm;
