import * as React from "react";
import { create, ReactTestRendererJSON } from "react-test-renderer";

export function createSnapshot(children: React.ReactElement<any>): ReactTestRendererJSON | null {
  return create(children).toJSON();
}

export function expectSnapshot(children: React.ReactElement<any>): void {
  expect(createSnapshot(children)).toMatchSnapshot();
}
