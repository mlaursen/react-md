import React, { FC } from "react";
import { Fieldset, Form } from "@react-md/form";
import { Grid } from "@react-md/utils";

import Checkbox from "components/Checkbox";
import Radio from "components/Radio";

import { TabConfiguration } from "./useConfiguration";

const ConfigurationForm: FC<Omit<TabConfiguration, "tabs">> = ({
  // Tabs config
  themed,
  handleThemedChange,
  padded,
  handlePaddedChange,

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
  disableTransition,
  customTransition,
  handleTransitionChange,
}) => (
  <Form>
    <Grid clone columns={1} tabletColumns={2} desktopColumns={3}>
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
        />
      </Fieldset>
    </Grid>
  </Form>
);

export default ConfigurationForm;
