/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { render, shallow, mount } from 'enzyme';
import rootReducer from 'state';

/**
 * I'm lazy.
 *
 * Could be lazier and do `expectSnapshot` though..
 */
export function createSnapshot(children) {
  return renderer.create(children).toJSON();
}

/**
 * A simple test wrapper to create a snapshot with react-test-renderer and a component that
 * uses something from react-router.
 */
export function createRouterSnapshot(children, location = '/', context = {}) {
  return createSnapshot(
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  );
}

/**
 * A simple test wrapper to create a snapshot with react-test-renderer and a component that
 * requires the redux provider.
 *
 * > It is better to test "pure" components instead of these, so this probably shouldn't
 * > get used much.
 */
export function createReduxSnapshot(children, state) {
  const store = createStore(rootReducer, state);
  return createSnapshot(
    <Provider store={store}>
      {children}
    </Provider>
  );
}

/**
 * A simple test wrapper to create a snapshot with react-test-renderer and a component that
 * requires both the redux Provider and something from react-router.
 *
 * > It is better to test "pure" components instead of these, so this probably shouldn't
 * > get used much.
 */
export function createReduxRouterSnapshot(children, state, location = '/', context = {}) {
  const store = createStore(rootReducer, state);
  return createSnapshot(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        {children}
      </StaticRouter>
    </Provider>
  );
}

/**
 * This is a simple test wrapper to create a snapshot with enzyme's render instead of react-test-renderer
 * and when the component or child component relies on react-router. This should be used when a component
 * or child component uses findDOMNode or the CSSTransitionGroup, otherwise the createRouterSnapshot should
 * be used.
 */
export function renderRouterSnapshot(children, location = '/', context = {}) {
  return render(
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  );
}

/**
 * This is a simple test wrapper to create a snapshot with enzyme's render instead of react-test-renderer
 * and when the component or child component requires the redux Provider. This should be used when a component
 * or child component uses findDOMNode or the CSSTransitionGroup, otherwise the createReduxSnapshot should
 * be used.
 */
export function renderReduxSnapshot(children, state) {
  const store = createStore(rootReducer, state);
  return render(
    <Provider store={store}>
      {children}
    </Provider>
  );
}

/**
 * This is a simple test wrapper to create a snapshot with enzyme's render instead of react-test-renderer
 * and when the component or child component requires both the redux Provider and something from react-router.
 * This should be used when a component * or child component uses findDOMNode or the CSSTransitionGroup,
 * otherwise the createReduxRouterSnapshot should be used.
 */
export function renderReduxRouterSnapshot(children, state, location = '/', context = {}) {
  const store = createStore(rootReducer, state);
  return render(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        {children}
      </StaticRouter>
    </Provider>
  );
}

/**
 * A simple wrapper to use enzyme's shallow rendering when the component or a child
 * requires something from react-router.
 */
export function shallowWithRouter(children, location = '/', context = {}) {
  return shallow(
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  );
}


/**
 * A simple wrapper to use enzyme's mount rendering when the component or a child
 * requires something from react-router.
 */
export function mountWithRouter(children, location = '/', context = {}) {
  return mount(
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  );
}

/**
 * A simple wrapper to use enzyme's shallow rendering when the component or a child
 * requires something from react-redux.
 *
 * > It is better to test "pure" components instead of these, so this probably shouldn't
 * > get used much.
 */
export function shallowWithProvider(children, state) {
  const store = createStore(rootReducer, state);
  return shallow(<Provider store={store}>{children}</Provider>);
}

/**
 * A simple wrapper to use enzyme's mount rendering when the component or a child
 * requires something from react-redux.
 *
 * > It is better to test "pure" components instead of these, so this probably shouldn't
 * > get used much.
 */
export function mountWithProvider(children, state) {
  const store = createStore(rootReducer, state);
  return mount(<Provider store={store}>{children}</Provider>);
}

/**
 * A utility function that will override the console's behavior and throw errors
 * if console.error occurs. This is useful when you want to consider React warnings
 * as failures.
 */
export function captureConsole(match = null) {
  const console = global.console;

  beforeAll(() => {
    global.console = {
      ...console,
      error: (error) => {
        if (match === null || error.match(match)) {
          throw new Error(error);
        }
      },
    };
  });

  afterAll(() => {
    global.console = console;
  });
}
