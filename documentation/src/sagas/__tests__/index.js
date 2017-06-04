/* eslint-env jest */
import { updateCustomTheme } from 'state/helmet';
import { updateTheme } from 'state/theme';
import SagaTester from 'redux-saga-tester';
import * as cookie from 'utils/cookies';
import { watchThemeChanges } from '../';

jest.mock('utils/cookies');
const DONE = 'DONE_TESTING';
function done() {
  return { type: DONE };
}

describe('watchThemeChanges', () => {
  afterEach(() => {
    cookie.create.mockClear();
    cookie.remove.mockClear();
  });

  it('should dispatch the updateCustomTheme if there is an href', async () => {
    const href = '/themes/react-md.blue-green-200.dark.css';
    const sagaTester = new SagaTester({
      initialState: {
        theme: { href },
      },
    });
    sagaTester.start(watchThemeChanges);
    sagaTester.dispatch(updateTheme());
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    const expected = [
      updateTheme(),
      updateCustomTheme(href),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should dispatch the updateCustomTheme if there is no href', async () => {
    const sagaTester = new SagaTester({ initialState: { theme: { href: null } } });
    sagaTester.start(watchThemeChanges);
    sagaTester.dispatch(updateTheme());
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    const expected = [
      updateTheme(),
      updateCustomTheme(null),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should call the cookie.create function correctly', async () => {
    const href = '/themes/react-md.blue-green-200.dark.css';
    const sagaTester = new SagaTester({
      initialState: {
        theme: {
          href,
          saved: true,
        },
      },
    });
    sagaTester.start(watchThemeChanges);
    sagaTester.dispatch(updateTheme());
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(cookie.create.mock.calls.length).toBe(4);
  });

  it('should only call cookie.remove lazily', async () => {
    const href = '/themes/react-md.blue-green-200.dark.css';
    const sagaTester = new SagaTester({
      initialState: {
        theme: {
          href,
          saved: false,
        },
      },
    });
    sagaTester.start(watchThemeChanges);
    sagaTester.dispatch(updateTheme());
    sagaTester.dispatch(updateTheme());
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(cookie.remove.mock.calls.length).toBe(4); // instead of 8
  });
});
