import {
  type Queries,
  type RenderOptions,
  type RenderResult,
  type queries,
  render,
} from "@react-md/core/test-utils";
import { Fragment, type ReactElement } from "react";

import { RootProviders } from "@/components/RootProviders.jsx";

export * from "@react-md/core/test-utils";
export * from "@react-md/core/test-utils/jest-globals";

export function renderWithEverything<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: ReactElement,
  options: RenderOptions<Q, Container, BaseElement> = {}
): RenderResult<Q, Container, BaseElement> {
  const { wrapper: Wrapper = Fragment, ...renderOptions } = options;

  return render(ui, {
    ...renderOptions,
    wrapper: function TestWrapper({ children }) {
      return (
        <RootProviders>
          <Wrapper>{children}</Wrapper>
        </RootProviders>
      );
    },
  });
}
