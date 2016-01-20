import React from 'react';

import { DatePicker } from 'react-md/Pickers';

export default function DatePickerExamples() {
  return (
    <div>
      <DatePicker label="Select a date" floatingLabel={false} type="date"/>
      <DatePicker label="Select a date" floatingLabel={false} type="date" displayMode="portrait" />
      <DatePicker label="Select a date" floatingLabel={false} type="date" inline={true} />
      <DatePicker label="Select a date" floatingLabel={false} type="date" displayMode="portrait" inline={true} />
      <DatePicker label="Select a time" floatingLabel={false} type="time"/>
      <DatePicker label="Select a time" floatingLabel={false} type="time" displayMode="portrait" />
      <DatePicker label="Select a time" floatingLabel={false} type="time" inline={true} />
      <DatePicker label="Select a time" floatingLabel={false} type="time" displayMode="portrait" inline={true} />
    </div>
  );
  /*
  return (
    <div>
      <Dialog isOpen={true} close={() => {}}>
        <div className="md-picker date-picker portrait">
          <header className="md-picker-header">
            <PickerControl onClick={() => {}} active={false}>
              <h6 className="md-subtitle">2017</h6>
            </PickerControl>
            <PickerControl onClick={() => {}} active={true}>
              <h4 className="md-display-1">Thu,&nbsp;</h4>
              <h4 className="md-display-1">Apr 13</h4>
            </PickerControl>
          </header>
          <div className="md-picker-content-container">
            <section className="md-picker-content">
            </section>
            <PickerFooter onOkClick={() => {}} onCancelClick={() => {}} />
          </div>
        </div>
        <div className="md-picker time-picker portrait">
          <header className="md-picker-header">
            <PickerControl active={true} onClick={() => {}}>
              <h4 className="md-display-3">5</h4>
            </PickerControl>
            <PickerControl active={false} onClick={() => {}}>
              <h4 className="md-display-3">:30</h4>
            </PickerControl>
            <div className="md-time-periods">
              <PickerControl active={true} onClick={() => {}}>
                <h6 className="md-subtitle">AM</h6>
              </PickerControl>
              <PickerControl active={false} onClick={() => {}}>
                <h6 className="md-subtitle">PM</h6>
              </PickerControl>
            </div>
          </header>
          <div className="md-picker-content-container">
            <section className="md-picker-content clock">
              <div className="md-clock" />
            </section>
            <PickerFooter onOkClick={() => {}} onCancelClick={() => {}} />
          </div>
        </div>
      </Dialog>
    </div>
  );
  */
}
