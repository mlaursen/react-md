import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Dialog from 'react-md/Dialogs';

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
          details: [],
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
