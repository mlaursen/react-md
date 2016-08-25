import React, { PureComponent, PropTypes } from 'react';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';

import LoremIpsum from 'components/LoremIpsum';

export default class SimpleExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    return (
      <ExpansionList>
        <ExpansionPanel label="Hello" secondaryLabel="World!" defaultExpanded>
          <LoremIpsum key="one-para" />
        </ExpansionPanel>
        <ExpansionPanel
          label={<LoremIpsum className="capitalize" units="words" count={2} />}
          secondaryLabel={[
            <LoremIpsum key={0} className="capitalize" units="words" count={3} />,
            <LoremIpsum key={1} className="capitalize" units="words" count={3} />,
          ]}
        >
          <LoremIpsum key="two-para" count={2} />
        </ExpansionPanel>
        <ExpansionPanel
          label={<LoremIpsum className="capitalize" units="words" count={2} />}
          secondaryLabel={[
            <LoremIpsum key={0} className="capitalize" units="words" count={3} />,
            <LoremIpsum key={1} className="capitalize" units="words" count={3} />,
          ]}
        >
          <LoremIpsum key="two-para" count={2} />
        </ExpansionPanel>
      </ExpansionList>
    );
  }
}
