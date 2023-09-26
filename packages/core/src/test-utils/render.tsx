import {
  render,
  type Queries,
  type RenderOptions,
  type RenderResult,
  type queries,
} from "@testing-library/react";
import { Fragment, type ReactElement } from "react";
import { CoreProviders, type CoreProvidersProps } from "../CoreProviders.js";

/**
 * @remarks \@since 6.0.0
 */
export interface ReactMDRenderOptions<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
> extends RenderOptions<Q, Container, BaseElement> {
  rmdConfig?: Omit<CoreProvidersProps, "children">;
}

/**
 * @remarks \@since 6.0.0
 */
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
        <CoreProviders {...rmdConfig}>
          <Wrapper>{props.children}</Wrapper>
        </CoreProviders>
      );
    },
  });
}
