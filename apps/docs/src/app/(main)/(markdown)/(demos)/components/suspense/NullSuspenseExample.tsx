"use client";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { CardFooter } from "@react-md/core/card/CardFooter";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardTitle } from "@react-md/core/card/CardTitle";
import { NullSuspense } from "@react-md/core/suspense/NullSuspense";
import { useToggle } from "@react-md/core/useToggle";
import { wait } from "@react-md/core/utils/wait";
import {
  lazy,
  useMemo,
  type FC,
  type LazyExoticComponent,
  type ReactElement,
} from "react";

export default function NullSuspenseExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  const LazyButton = useFakeLazyImport(Button);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Hello</Button>
        {toggled && (
          <NullSuspense>
            <LazyButton>World!</LazyButton>
          </NullSuspense>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={toggle}>Toggle lazy button</Button>
      </CardFooter>
    </Card>
  );
}

async function fakeImport<P>(
  Component: FC<P>,
  delay: number
): Promise<{ default: FC<P> }> {
  await wait(delay);
  return { default: Component };
}

/**
 * This is a hook that will allow lazily import a component each time the `Component`
 * changes or the `key` changes so that it can work with `Suspense` from React.
 *
 * You should probably never do this... but this is a way to make it so that
 * the lazy loaded component can be re-loaded infinitely after resetting the
 * demo. Without this, the lazy implementation will immediately resolve the
 * fake import and not show any progress
 */
export function useFakeLazyImport<P = Record<string, unknown>>(
  Component: FC<P>,
  delay = 200
): LazyExoticComponent<FC<P>> {
  return useMemo(
    () => lazy(() => fakeImport(Component, delay)),
    [Component, delay]
  );
}
