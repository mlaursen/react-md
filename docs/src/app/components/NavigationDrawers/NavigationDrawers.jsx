import React, { PropTypes, Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import DocPage from 'react-md-documentation';
import NavigationDrawerExamples from './NavigationDrawerExamples';
import NavigationDrawerExamplesRaw from '!!raw!./NavigationDrawerExamples';
import Markdown from '../../Markdown';

const markdown = `
Navigation drawers are an excellent component to use to set up
the initial layout of your application. This component combines
a Navigation drawer (a sidebar of nav items), an app bar,
and displays any additional content.

Navigation drawers have 7 types:

\`\`\`js
const {
  FULL_HEIGHT,
  CLIPPED,
  FLOATING,
  PERSISTENT,
  PERSISTENT_MINI,
  TEMPORARY,
  TEMPORARY_MINI,
} = NavigationDrawer.DrawerType;
\`\`\`

The \`TEMPORARY\` or \`TEMPORARY_MINI\` *must* be used for mobile devices. The
default media queries will already handle this for you. If the \`drawerType\`
is set to anything except for \`PERSISTENT_MINI\`, the mobile version of the
drawer will automatically be \`TEMPORARY\`. If the \`drawerType\` is set to
\`PERSISTENT_MINI\`, then the mobile version will be \`TEMPORARY_MINI\`.

If you would like a consistent \`drawerType\` between all devices, you can
always set the \`drawerType\` to \`TEMPORARY\` or \`TEMPORARY_MINI\`.


> Note: The example below will behave wierdly because the Navigation Drawer
> component is meant to be an entire application layout.
`;

export default class NavigationDrawers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    marked: PropTypes.func,
  };

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: NavigationDrawer,
          details: [],
        }]}
        examples={[{
          markdown: NavigationDrawerExamplesRaw,
          children: <NavigationDrawerExamples {...this.props} />,
        }]}
        >
          <Markdown marked={this.props.marked} markdown={markdown} />
      </DocPage>
    );
  }
}
