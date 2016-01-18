import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Dialog from '../Dialogs';
import DatePicker from './DatePicker';

export default class CalendarDialog extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
    previousIcon: PropTypes.node.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
    nextIcon: PropTypes.node.isRequired,
    onNextClick: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    currentMonth: PropTypes.object.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    onOkClick: PropTypes.func.isRequired,
    okLabel: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['date', 'year']).isRequired,
    onDateClick: PropTypes.func.isRequired,
    onYearClick: PropTypes.func.isRequired,
    onCalendarDateClick: PropTypes.func.isRequired,
    slideDir: PropTypes.oneOf(['left', 'right']).isRequired,
  };

  render() {
    const { isOpen, close, ...props } = this.props;

    return (
      <Dialog isOpen={isOpen} close={close} onlyChildren={true}>
        {isOpen && <DatePicker {...props} />}
      </Dialog>
    );
  }
}
