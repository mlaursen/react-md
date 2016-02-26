import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { SpeedDial } from 'react-md/lib/FABTransitions';

import DocPage from 'react-md-documentation';
import SpeedDialExample from './SpeedDialExample';
import SpeedDialExampleRaw from '!!raw!./SpeedDialExample';

export default class FABTransitions extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        sectionName={['FAB', 'Transitions']}
        components={[{
          component: SpeedDial,
          details: [{
            name: 'isOpen',
            pt: 'b',
            desc: 'Boolean if the speed dial is currently flinging buttons.',
          }, {
            name: 'transitionName',
            pt: 's',
            desc: `The transition name for the main FAB to use when the isOpen state
            changes.`,
          }, {
            name: 'transitionEnterTimeout',
            pt: 'nu',
            desc: `The timeout for the main FAB's isOpen state change.`,
          }, {
            name: 'speedDialTransitionName',
            pt: 's',
            desc: `The transition name to use for the flinging (flung?) FABs.`,
          }, {
            name: 'speedDialTransitionEnterTimeout',
            pt: 'nu',
            desc: `The timeout to use for the flinging (flung?) FABs.`,
          }, {
            name: 'speedDialTransitionLeaveTimeout',
            pt: 'nu',
            desc: `The timeout to use for the retracting FABs.`,
          }, {
            name: 'passiveIconChildren',
            pt: 'no',
            desc: `Any children to use for the main FAB when the state is closed.`,
          }, {
            name: 'passiveIconClassName',
            pt: 's',
            desc: `The iconClassName to use for the main FAB when the state is closed.`,
          }, {
            name: 'activeIconChildren',
            pt: 'no',
            desc: `Any children to use for the main FAB when the state is open.`,
          }, {
            name: 'activeIconClassName',
            pt: 's',
            desc: `The iconClassName to use for the main FAB when the state is open.`,
          }, {
            name: 'fabs',
            pt: 'arrayOf(node || props)',
            desc: `The fabs property can be a list of \`FloatingButton\` or a list
            of properties to pass to the \`FloatingButton\` component. These fabs
            will get updated with another className of \`.md-speed-dial-fab\` and
            automatically sets \`mini: true\``,
          }, {
            name: 'any other props',
            pt: '',
            desc: `Any other props will be passed to the \`FloatingButton\` component to
            help render the main FAB.`,
          }],
        }]}
        examples={[{
          name: 'Speed Dial',
          markdown: SpeedDialExampleRaw,
          children: <SpeedDialExample {...this.props} />,
        }]}
        >
          <p>
            The floating action button is a unique example of a primary use case in
            an app. Take advantage of its visibility to create delightful transitions
            for a primary UI element.
          </p>
          <p>
            Common transitions include Trigger, Toolbar, Speed dial, and Morphing.
            This is not an exhaustive list. Floating action buttons are designed to
            be flexible. Experiment with transitions that best suit your app and
            the screens on which the button sits.
          </p>
      </DocPage>
    );
  }
}
