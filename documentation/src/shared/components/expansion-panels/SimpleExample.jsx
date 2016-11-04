import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';

import LoremIpsum from 'components/LoremIpsum';
import PhoneSizeDemo from 'containers/PhoneSizeDemo';

@connect(({ ui: { drawer: { mobile } } }) => ({ mobile }))
export default class SimpleExample extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
  };

  render() {
    const { mobile } = this.props;
    const count2 = mobile ? 2 : 1;
    const count3 = mobile ? 3 : 1;

    let secondaryLabel1;
    let secondaryLabel2;
    if (!mobile) {
      secondaryLabel1 = [
        <LoremIpsum key="first" className="md-text-capitalize" units="words" count={count3} />,
        <LoremIpsum key="second" className="md-text-capitalize" units="words" count={count3} />,
      ];
      secondaryLabel2 = [
        <LoremIpsum key="first" className="md-text-capitalize" units="words" count={count3} />,
        <LoremIpsum key="second" className="md-text-capitalize" units="words" count={count3} />,
      ];
    }

    return (
      <PhoneSizeDemo mobileOnly>
        <ExpansionList style={{ padding: 16 }}>
          <ExpansionPanel label="Hello" secondaryLabel="World!" defaultExpanded>
            <LoremIpsum key="one-para" />
          </ExpansionPanel>
          <ExpansionPanel
            label={<LoremIpsum className="md-text-capitalize" units="words" count={count2} />}
            secondaryLabel={secondaryLabel1}
          >
            <LoremIpsum key="two-para" count={2} />
          </ExpansionPanel>
          <ExpansionPanel
            label={<LoremIpsum className="md-text-capitalize" units="words" count={count2} />}
            secondaryLabel={secondaryLabel2}
          >
            <LoremIpsum key="two-para" count={2} />
          </ExpansionPanel>
        </ExpansionList>
      </PhoneSizeDemo>
    );
  }
}
