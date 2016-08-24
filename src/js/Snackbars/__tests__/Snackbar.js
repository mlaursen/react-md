/* eslint-env jest*/
jest.unmock('../Snackbar');

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import Snackbar from '../Snackbar';
import Toast from '../Toast';

describe('Snackbar', () => {
  it('renders a toast', () => {
    let toasts = [];
    const dismiss = jest.fn();

    let snackbar = renderIntoDocument(
      <Snackbar toasts={toasts} dismiss={dismiss} />
    );

    let toastComps = scryRenderedComponentsWithType(snackbar, Toast);
    expect(toastComps.length).toBe(0);

    toasts = [{ text: 'Hello' }];
    snackbar = renderIntoDocument(
      <Snackbar toasts={toasts} dismiss={dismiss} />
    );

    toastComps = scryRenderedComponentsWithType(snackbar, Toast);
    expect(toastComps.length).toBe(1);
  });

  it('automatically dismisses a toast after the autohide timeout', () => {
    const dismiss = jest.fn();

    class Test extends React.Component {
      constructor(props) {
        super(props);

        this.state = { toasts: [] };
      }

      render() {
        return <Snackbar toasts={this.state.toasts} dismiss={dismiss} />;
      }
    }
    const test = renderIntoDocument(<Test />);

    let toastComps = scryRenderedComponentsWithType(test, Toast);
    expect(toastComps.length).toBe(0);

    test.setState({ toasts: [{ text: 'Hello' }] });

    toastComps = scryRenderedComponentsWithType(test, Toast);
    expect(toastComps.length).toBe(1);
    expect(dismiss.mock.calls.length).toBe(0);

    jest.runAllTimers();
    expect(dismiss.mock.calls.length).toBe(1);
  });
});
