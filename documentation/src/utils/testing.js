/* eslint-disable import/prefer-default-export, react/jsx-filename-extension */
import React from 'react';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';

export function createRouterSnapshot(children, location = '/', context = {}) {
  return renderer.create(
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  ).toJSON();
}
