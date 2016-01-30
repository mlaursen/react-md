import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Snackbar from 'react-md/lib/Snackbars';

import DocPage from 'react-md-documentation';
import SnackbarExamples from './SnackbarExamples';
import SnackbarExamplesRaw from '!!raw!./SnackbarExamples';

export default class Snackbars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Snackbar,
          desc: `A snackbar takes a queue of toasts and displays them to the user one after
          another. They can be auto dismissed, or require user interaction to close the toast.

\`\`\`js
const toast = {
  text: PropTypes.string.isRequired, // text to display
  action: PropTypes.oneOfType([
    PropTypes.string, // automatically calls dismiss onClick
    PropTypes.shape({
      onClick: PropTypes.func.isRequired, // requires manual dimiss call
      label: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};
\`\`\``,
          details: [{
            name: 'toasts',
            pt: 'arrayOf({ text, key?, action, onAppear? })',
            desc: `This is a queue of toasts to display to the user. After the user interacts
            with the toast or the \`autohideTimeout\` time has happened, the toast will be
            dismissed and the next one will be dispalyed.`,
          }, {
            name: 'autohide',
            pt: 'ba',
            desc: 'Boolean if the toast should dismiss automatically after a given time.',
          }, {
            name: 'autohideTimeout',
            pt: 'nu',
            desc: 'The time to wait before auto-dimissing the current toast.',
          }, {
            name: 'dismiss',
            pt: 'f',
            desc: 'A function to dimiss the first item from the queue',
          }, {
            name: 'multiline',
            pt: 'ba',
            desc: 'Boolean if the toast is more than one line for additional styling',
          }],
        }]}
        examples={[{
          markdown: SnackbarExamplesRaw,
          children: <SnackbarExamples />,
        }]}
        >
        Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen. Snackbars can contain an action.
      </DocPage>
    );
  }
}
