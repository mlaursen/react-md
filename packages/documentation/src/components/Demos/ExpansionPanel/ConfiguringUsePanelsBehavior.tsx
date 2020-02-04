import React, { FC } from "react";
import {
  ExpansionList,
  ExpansionPanel,
  usePanels,
} from "@react-md/expansion-panel";
import { Checkbox, Fieldset, useCheckboxState } from "@react-md/form";
import { Grid } from "@react-md/utils";

interface Props {
  multiple: boolean;
  expandedIndex: boolean;
  preventAllClosed: boolean;
}

const Example: FC<Props> = ({ multiple, expandedIndex, preventAllClosed }) => {
  let defaultExpandedIndex: number | number[] | undefined;
  if (expandedIndex) {
    defaultExpandedIndex = multiple ? [1, 2] : 0;
  }

  const [panels, onKeyDown] = usePanels({
    count: 3,
    idPrefix: "configuring-panels",
    multiple,
    preventAllClosed,
    // this will be considered `0` if the `preventAllClosed` option is enabled
    // but still `undefined`
    defaultExpandedIndex,
  });

  return (
    <ExpansionList onKeyDown={onKeyDown}>
      <ExpansionPanel {...panels[0]} header="Panel 1">
        Nam lorem est, porta id tincidunt et, consectetur in nulla. Morbi cursus
        at massa a feugiat. Mauris eu convallis elit, ac mollis metus. Quisque
        pulvinar ante libero, ut laoreet dolor bibendum volutpat. In diam purus,
        dictum a ex id, ornare feugiat ligula. Integer eget lorem quis augue
        venenatis sodales at pretium lectus. Pellentesque eu odio augue. Fusce
        ultricies lacus in massa finibus gravida. Maecenas turpis libero,
        fringilla nec sodales sed, lacinia eget libero.
      </ExpansionPanel>
      <ExpansionPanel {...panels[1]} header="Panel 2">
        Aenean rhoncus tristique fringilla. Phasellus ac libero porta, iaculis
        quam quis, porta nibh. Maecenas laoreet dignissim magna quis ultricies.
        Vivamus ut blandit nisl. Curabitur vel turpis vulputate, mollis ante in,
        dignissim felis. Nullam vel est eu felis rutrum rhoncus. Fusce vitae
        finibus lectus. Donec eleifend felis odio, vitae gravida purus ornare
        sed.
      </ExpansionPanel>
      <ExpansionPanel {...panels[2]} header="Panel 3">
        Donec lacinia ut sem vitae molestie. Nam placerat tristique facilisis.
        Aliquam iaculis augue eget mollis fermentum. Morbi mattis ultricies
        lacinia. Fusce vitae commodo nisl. Donec congue arcu ut porta feugiat.
        Pellentesque cursus diam ut mauris ultrices, quis tristique eros
        feugiat. Mauris justo justo, sollicitudin a augue non, varius blandit
        lorem. Curabitur cursus mi quis maximus faucibus. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Pellentesque mattis libero mauris, quis vehicula sapien porttitor at.
        Morbi laoreet lacus sed sodales fermentum.
      </ExpansionPanel>
    </ExpansionList>
  );
};

const ConfiguringUsePanelsBehavior: FC = () => {
  const [multiple, onMultipleChange] = useCheckboxState(false);
  const [expandedIndex, onExpandedIndexChange] = useCheckboxState(false);
  const [preventAllClosed, onPreventAllClosedChange] = useCheckboxState(false);

  return (
    <Grid columns={1}>
      <Fieldset legend="Options">
        <Checkbox
          id="panel-options-multiple"
          name="multiple"
          label="Multiple?"
          checked={multiple}
          onChange={onMultipleChange}
        />
        <Checkbox
          id="panel-options-default-expanded"
          name="defaultExpandedIndex"
          label="Default expanded index?"
          checked={expandedIndex}
          onChange={onExpandedIndexChange}
        />
        <Checkbox
          id="panel-options-prevent-all-closed"
          name="multiple"
          label="Prevent all closed?"
          checked={preventAllClosed}
          onChange={onPreventAllClosedChange}
        />
      </Fieldset>
      <Example
        // note the key here -- the usePanels does not support being updated
        // after being mounted with these options. It will allow for changing
        // the number of panels though
        key={`${multiple}-${expandedIndex}-${preventAllClosed}`}
        multiple={multiple}
        expandedIndex={expandedIndex}
        preventAllClosed={preventAllClosed}
      />
    </Grid>
  );
};

export default ConfiguringUsePanelsBehavior;
