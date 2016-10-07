import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';

import LoremIpsum from 'components/LoremIpsum';
import PhoneSizeDemo from 'containers/PhoneSizeDemo';

@connect(({ ui: { media: { tablet } } }) => ({ tablet }))
export default class SimpleExample extends PureComponent {
  static propTypes = {
    tablet: PropTypes.bool.isRequired,
  };

  render() {
    const { tablet } = this.props;
    const count2 = tablet ? 2 : 1;
    const count3 = tablet ? 3 : 1;

    let secondaryLabel1 = <LoremIpsum key="first" className="md-text-capitalize" units="words" count={count3} />;
    let secondaryLabel2 = <LoremIpsum key="first" className="md-text-capitalize" units="words" count={count3} />;
    if (tablet) {
      secondaryLabel1 = [
        secondaryLabel1,
        <LoremIpsum key="second" className="md-text-capitalize" units="words" count={count3} />,
      ];
      secondaryLabel2 = [
        secondaryLabel2,
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
