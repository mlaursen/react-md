import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dialog from 'react-md/lib/Dialogs';

import DocPage from 'react-md-documentation';
import SimpleDialogExample from './SimpleDialogExample';
import SimpleDialogExampleRaw from '!!raw!./SimpleDialogExample';
import ModalDialogExample from './ModalDialogExample';
import ModalDialogExampleRaw from '!!raw!./ModalDialogExample';
import FullPageDialogExample from './FullPageDialogExample';
import FullPageDialogExampleRaw from '!!raw!./FullPageDialogExample';
//import './_dialog.scss';

export default class Dialogs extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: Dialog,
          desc: [
            `There are three types of Dialogs: \`Simple\`, \`Modal\`, and \`Full Page\`.`,
            `A \`Simple Dialog\` will be rendered if there are no actions given
            to this component. A simple dialog usually consists of list items
            that a user must select. These can be scrollable. This dialog can
            be closed by clicking the overlay or one of the actions.`,
            `A \`Modal Dialog\` is a dialog that **must** be closed by clicking
            one of the actions.`,
            `A \`Full Page Dialog\` is what it says: a full page dialog.. This
            is probably more useful on mobile devices. A full page dialog
            is rendered if \`actionLeft\` and \`actionRight\` are given as props.`,
            `When opened, the dialog will consist of an app bar with the given \`title\`,
            \`actionLeft\`, and \`actionRight\`. Any other content will be rendered in
            \`.md-dialog-content\`. When the dialog is opened, the \`document.body\`
            will have it's overflow hidden so a user cannot scroll.`,
          ],
          details: [{
            name: 'isOpen',
            pt: 'b',
            desc: 'Boolean if the dialog is currently open.',
          }, {
            name: 'close',
            pt: 'f',
            desc: 'A function to close the dialog. This is used to close the dialog when clicking the overlay.',
          }, {
            name: 'children',
            pt: 'no',
            desc: 'The children to display in the dialog content area.',
          }, {
            name: 'title',
            pt: 's',
            desc: 'An optional title to display in the dialog.',
          }, {
            name: 'actions',
            pt: 'no',
            desc: `Any renderable items for displaying in the dialog footer.
            This should *usually* be a list of \`FlatButtons\`.`,
          }, {
            name: 'actionLeft',
            pt: 'no',
            desc: `An action to place to the left of the title in a full page dialog.`,
          }, {
            name: 'actionRight',
            pt: 'no',
            desc: `Any action(s) to place to the right of the title. It should normally
            be placed in the \`ActionArea\` component from \`Toolbars\`.`,
          }, {
            name: 'className',
            pt: 's',
            desc: `Any additional css className to add to the dialog.`,
          }, {
            name: 'contentClassName',
            pt: 's',
            desc: `Any additional css className to add to the dialog content.`,
          }, {
            name: 'containerClassName',
            pt: 's',
            desc: `Any additional css className to add to the \`.md-dialog-container\`.
            The dialog container is a CSSTransitionGroup holding the overlay and the
            \`.md-dialog\` when it is open.`,
          }, {
            name: 'modal',
            pt: 'ba',
            desc: `Boolean if the dialog should act as a modal. This means that a user
            **must** select one of the actions to close the dialog. They are unable
            to click the overlay to close it.`,
          }, {
            name: 'style',
            pt: 'o',
            desc: `Any additional style to apply to the dialog.`,
          }, {
            name: 'pageX',
            pt: 'nu',
            desc: `An optional click event pageX to use for a full page dialog. This
            number is used for setting the \`transformOrigin\` property when opening.
            If this and/or \`pageY\` are ommitted, the full page dialog will open
            from the center of the page.`,
          }, {
            name: 'pageY',
            pt: 'nu',
            desc: `An optional click event pageY. See above.`,
          }, {
            name: 'transitionName',
            pt: 's',
            desc: `The dialog transition name for appearing.`,
          }, {
            name: 'transitionEnter',
            pt: 'b',
            desc: `Boolean if the enter animation is active for the dialog.`,
          }, {
            name: 'transitionEnterTimeout',
            pt: 'nu',
            desc: `The timeout for the dialog enterting.`,
          }, {
            name: 'transitionLeave',
            pt: 'b',
            desc: `Boolean if the dialog leave transition is enabled.`,
          }, {
            name: 'transitionLeaveTimeout',
            pt: 'nu',
            desc: `The timeout for the dialog leaving.`,
          }],
        }]}
        examples={[{
          markdown: SimpleDialogExampleRaw,
          children: <SimpleDialogExample />,
        }, {
          markdown: ModalDialogExampleRaw,
          children: <ModalDialogExample />,
        }, {
          markdown: FullPageDialogExampleRaw,
          children: <FullPageDialogExample />,
        }]}
        >
        <p>
          Dialogs contain text and UI controls focused on a specific task.
          They inform users about critical information, require users to
          make decisions, or involve multiple tasks.
        </p>
      </DocPage>
    );
  }
}
