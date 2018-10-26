import * as React from "react";
import { create, ReactTestRendererJSON } from "react-test-renderer";
import { mount } from "enzyme";

import Text, { ITextProps, DefaultTextComponentProps } from "../Text";

export function createSnapshot(children: React.ReactElement<any>): ReactTestRendererJSON | null {
  return create(children).toJSON();
}

export function expectSnapshot(children: React.ReactElement<any>): void {
  expect(createSnapshot(children)).toMatchSnapshot();
}

const HELLO_WORLD = "Hello, world!";
const LONG_TEXT =
  "This is another string that is just some text. I'm not sure how helpful this is though.";

interface ICustomProps {
  enabled: boolean;
  className?: string;
}

const Custom: React.SFC<ICustomProps> = ({ enabled, ...props }) => (
  <div {...props} className={`${props.className} ${enabled}`} />
);
interface IClassProps {
  something?: any;
  className?: string;
  children: React.ReactNode;
}

class Class extends React.Component<IClassProps> {
  public render() {
    const { className, children } = this.props;
    return <code className={className}>{children}</code>;
  }
}

describe("Text", () => {
  describe("rendering return value", () => {
    it("should render as a <p> with the body-1 styles by default", () => {
      const text = create(<Text>{HELLO_WORLD}</Text>);

      expect(() => text.root.findByType("p")).not.toThrow();
      expect(text.toJSON()).toMatchSnapshot();
    });

    it("should render as the provided component prop when it's simple strings", () => {
      ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div", "button", "caption"].forEach(
        component => {
          const test = create(<Text component={component}>{HELLO_WORLD}</Text>);
          expect(() => test.root.findByType(component)).not.toThrow();
          expect(test.toJSON()).toMatchSnapshot();
        }
      );
    });

    it("should be able to render as an SFC", () => {
      const text = create(
        <Text<ICustomProps & DefaultTextComponentProps>
          component={Custom}
          type="headline-3"
          enabled={false}
        >
          {HELLO_WORLD}
        </Text>
      );

      expect(text.toJSON()).toMatchSnapshot();
    });

    it("should be able to render as a class Component", () => {
      const text = create(
        <Text<IClassProps & DefaultTextComponentProps> component={Class} type="headline-3">
          {HELLO_WORLD}
        </Text>
      );

      expect(text.toJSON()).toMatchSnapshot();
    });

    it("should be able to render a forwardedRef component or SFC", () => {
      interface ICustomDivProps<T = any> extends ICustomProps {
        forwardedRef: React.Ref<T>;
      }

      const CustomDiv: React.SFC<ICustomDivProps> = () => <div />;
      const CustomRef = React.forwardRef<HTMLDivElement, ICustomProps>((props, ref) => (
        <CustomDiv forwardedRef={ref} {...props} />
      ));

      const text = create(
        <Text<ICustomProps> component={CustomRef} type="headline-3" enabled={false}>
          {HELLO_WORLD}
        </Text>
      );

      expect(text.toJSON()).toMatchSnapshot();
    });
  });

  it("should provide the className if the children is a callback function", () => {
    expectSnapshot(
      <Text>{({ className }) => <div className={className}>{HELLO_WORLD}</div>}</Text>
    );
  });
});
