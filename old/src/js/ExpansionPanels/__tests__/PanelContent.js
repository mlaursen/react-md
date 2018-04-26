/* eslint-env jest */
/* eslint-disable max-len */
import React from 'react';
import { shallow } from 'enzyme';

import PanelContent from '../PanelContent';

const PROPS = {
  onSave: jest.fn(),
  onCancel: jest.fn(),
  saveLabel: 'Save',
  cancelLabel: 'Cancel',
};

describe('PanelContent', () => {
  it('should apply the correct styles', () => {
    global.expectRenderSnapshot(
      <PanelContent
        {...PROPS}
        style={{ height: 200 }}
        className="some-test"
        contentStyle={{ background: 'red' }}
      />
    );
  });

  it('should render correctly based on props', () => {
    const panel = shallow(
      <PanelContent
        {...PROPS}
        saveType="submit"
        cancelType="reset"
        savePrimary={false}
        saveSecondary
        cancelPrimary={false}
        cancelSecondary={false}
      />
    );

    expect(panel.render()).toMatchSnapshot();

    panel.setProps({ savePrimary: true, saveSecondary: false });
    expect(panel.render()).toMatchSnapshot();
  });
});
