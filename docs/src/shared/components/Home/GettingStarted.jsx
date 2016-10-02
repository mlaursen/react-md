import React, { PureComponent } from 'react';
import customization from '../../imgs/customization.svg';
import gettingStarted from '../../imgs/getting-started.svg';
import components from '../../imgs/components.svg';
import ImgCard from 'components/ImgCard';
import { FIRST_COMPONENT_LINK } from 'utils/RouteUtils';

export default class GettingStarted extends PureComponent {
  render() {
    return (
      <section className="getting-started md-grid">
        <ImgCard
          to="getting-started/prerequisites"
          src={gettingStarted}
          alt="A Mac and a Macbook with design mock ups."
          title="Getting Started"
        />
        <ImgCard
          to="customization/colors"
          src={customization}
          alt="A chemistry set with material design colors flowing into a text editor."
          title="Customization"
        />
        <ImgCard
          to={FIRST_COMPONENT_LINK}
          src={components}
          alt="A pickture of a data chip."
          title="Components"
        />
      </section>
    );
  }
}
