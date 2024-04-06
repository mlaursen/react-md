"use client";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  NullSuspense,
  useToggle,
} from "react-md";
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

function fakeImport<P>(
  Component: FC<P>,
  delay: number
): Promise<{ default: FC<P> }> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ default: Component });
    }, delay);
  });
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
