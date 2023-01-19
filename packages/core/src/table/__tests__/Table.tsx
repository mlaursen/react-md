import { render } from "@testing-library/react";
import { createRef } from "react";
import { act } from "react-dom/test-utils";
import type { PropsWithRef } from "../../types";
import type { TableProps } from "../Table";
import { table, Table } from "../Table";
import { TableBody } from "../TableBody";
import { TableCell } from "../TableCell";
import { TableContainer } from "../TableContainer";
import { TableFooter } from "../TableFooter";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";

describe("Table", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLTableElement>();
    const props: PropsWithRef<TableProps, HTMLTableElement> = {
      ref,
      children: (
        <>
          <TableHeader>
            <TableRow>
              <TableCell>Header 1</TableCell>
              <TableCell>Header 2</TableCell>
              <TableCell>Header 3</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Row 1 Cell 1</TableCell>
              <TableCell>Row 1 Cell 2</TableCell>
              <TableCell>Row 1 Cell 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2 Cell 1</TableCell>
              <TableCell>Row 2 Cell 2</TableCell>
              <TableCell>Row 2 Cell 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 3 Cell 1</TableCell>
              <TableCell>Row 3 Cell 2</TableCell>
              <TableCell>Row 3 Cell 3</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Footer Cell</TableCell>
            </TableRow>
          </TableFooter>
        </>
      ),
    };

    const { getByRole, rerender } = render(<Table {...props} />);
    const table = getByRole("table");
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
    expect(ref.current).toBe(table);
    expect(table).toMatchSnapshot();

    rerender(
      <Table
        {...props}
        fullWidth
        disableHover
        disableBorders
        style={{ backgroundColor: "orange" }}
        className="custom-class-name"
      />
    );
    expect(table).toMatchSnapshot();

    rerender(<Table {...props} dense lineWrap />);
    expect(table).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(table()).toMatchSnapshot();
    });
  });

  // NOTE: This might be one I should only test with cypress/playwright because
  // of the `getRootMargin` behavior for both of these
  describe("sticky table behavior", () => {
    let _observer: MockIntersectionObserver | undefined;
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null;
      readonly rootMargin: string;
      readonly thresholds: readonly number[];

      // for testing purposes
      readonly callback: IntersectionObserverCallback;
      targets: Element[];

      constructor(
        callback: IntersectionObserverCallback,
        options: IntersectionObserverInit = {}
      ) {
        const { root = null, rootMargin = "", threshold = [] } = options;
        this.callback = callback;
        this.targets = [];
        this.root = root;
        this.rootMargin = rootMargin;
        this.thresholds =
          typeof threshold === "number" ? [threshold] : threshold;

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        _observer = this;
      }

      unobserve(target: Element): void {
        this.targets = this.targets.filter((current) => current !== target);
      }
      observe(target: Element): void {
        this.targets.push(target);
      }

      disconnect(): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    beforeEach(() => {
      _observer = undefined;

      Object.defineProperty(window, "IntersectionObserver", {
        writable: true,
        configurable: true,
        value: MockIntersectionObserver,
      });
    });

    describe("TableHeader", () => {
      it("should use an intersection observer to apply a custom className when the table's header is covering content within the table using the full viewport", () => {
        const { container } = render(
          <Table>
            <TableHeader sticky>
              <TableRow>
                <TableCell>Header Cell</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 20 }, (_, i) => (
                <TableRow key={i}>
                  <TableCell>{`Row ${i + 1}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

        if (!_observer) {
          throw new Error();
        }
        const observer = _observer;
        expect(container).toMatchSnapshot();

        // pretend like the intersection observer was called after scrolling in
        // the container
        act(() => {
          const entry = {
            intersectionRatio: 0.5,
            boundingClientRect: {
              bottom: window.innerHeight - 50,
            },
          } as IntersectionObserverEntry;

          observer.callback([entry], observer);
        });
        expect(container).toMatchSnapshot();
      });

      it("should use an intersection observer to apply a custom className when the table's header is covering content within the table using the table container", () => {
        const { container } = render(
          <TableContainer>
            <Table>
              <TableHeader sticky>
                <TableRow>
                  <TableCell>Header Cell</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 20 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell>{`Row ${i + 1}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );

        if (!_observer) {
          throw new Error();
        }
        const observer = _observer;
        expect(container).toMatchSnapshot();

        // pretend like the intersection observer was called after scrolling in
        // the container
        act(() => {
          const entry = {
            intersectionRatio: 0.5,
            boundingClientRect: {
              bottom: window.innerHeight - 50,
            },
          } as IntersectionObserverEntry;

          observer.callback([entry], observer);
        });
        expect(container).toMatchSnapshot();
      });
    });

    describe("TableFooter", () => {
      it("should use an intersection observer to apply a custom className when the table's footer is covering content within the table using the full viewport", () => {
        const { container } = render(
          <Table>
            <TableBody>
              {Array.from({ length: 20 }, (_, i) => (
                <TableRow key={i}>
                  <TableCell>{`Row ${i + 1}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter sticky>
              <TableRow>
                <TableCell>Footer Cell</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        );

        if (!_observer) {
          throw new Error();
        }
        const observer = _observer;
        expect(container).toMatchSnapshot();

        // pretend like the intersection observer was called after scrolling in
        // the page and the table header is covering the table body
        act(() => {
          const entry = {
            intersectionRatio: 0.5,
            boundingClientRect: {
              top: 40,
            },
          } as IntersectionObserverEntry;

          observer.callback([entry], observer);
        });
        expect(container).toMatchSnapshot();

        // pretend like the intersection observer was called after scrolling in
        // the page and the table header is no longer covering the table body
        act(() => {
          const entry = {
            intersectionRatio: 0.5,
            boundingClientRect: {
              top: -40,
            },
          } as IntersectionObserverEntry;

          observer.callback([entry], observer);
        });
        expect(container).toMatchSnapshot();
      });

      it("should use an intersection observer to apply a custom className when the table's footer is covering content within the table using the table container", () => {
        const { container } = render(
          <TableContainer>
            <Table>
              <TableBody>
                {Array.from({ length: 20 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell>{`Row ${i + 1}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter sticky>
                <TableRow>
                  <TableCell>Footer Cell</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        );

        if (!_observer) {
          throw new Error();
        }
        const observer = _observer;
        expect(container).toMatchSnapshot();

        // pretend like the intersection observer was called after scrolling in
        // the container
        act(() => {
          const entry = {
            isIntersecting: true,
          } as IntersectionObserverEntry;

          observer.callback([entry], observer);
        });
        expect(container).toMatchSnapshot();

        // pretend like the intersection observer was called after scrolling in
        // the container and making the footer no longer covering the table body
        act(() => {
          const entry = {
            isIntersecting: false,
          } as IntersectionObserverEntry;

          observer.callback([entry], observer);
        });
        expect(container).toMatchSnapshot();
      });
    });
  });
});
