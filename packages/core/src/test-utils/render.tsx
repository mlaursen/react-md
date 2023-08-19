import type {
  Queries,
  RenderOptions,
  RenderResult,
  queries,
} from "@testing-library/react";
import { render } from "@testing-library/react";
import { Fragment, type ReactElement } from "react";
import type { CoreProvidersProps } from "../CoreProviders.js";
import { CoreProviders } from "../CoreProviders.js";

export interface ReactMDRenderOptions<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
> extends RenderOptions<Q, Container, BaseElement> {
  rmdConfig?: Omit<CoreProvidersProps, "children">;
}

export function rmdRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: ReactElement,
  options: ReactMDRenderOptions<Q, Container, BaseElement> = {}
): RenderResult<Q, Container, BaseElement> {
  const { wrapper: Wrapper = Fragment, rmdConfig, ...renderOptions } = options;

  return render(ui, {
    ...renderOptions,
    wrapper: function ReactMDTestWrapper(props) {
      return (
        <CoreProviders elementInteractionMode="none" {...rmdConfig}>
          <Wrapper>{props.children}</Wrapper>
        </CoreProviders>
      );
    },
  });
}
