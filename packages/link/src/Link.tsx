import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface ILinkBaseProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /**
   * Any optional class name to apply to the link.
   *
   * @docgen
   */
  className?: string;

  /**
   * An optional component to render as. This should really only be used if you are using a router library
   * like [react-router](https://github.com/ReactTraining/react-router) or
   * [@reach/router](https://github.com/reach/router). This will call `React.createElement` with this value
   * and provide all props and class name.
   *
   * @docgen
   */
  component?: React.ReactType;

  /**
   * An optional href to apply to the link. If this value is set to the empty string and the `component` prop is
   * not provided, the link will basically be disabled.
   *
   * @docgen
   */
  href?: string;
}

export interface ILinkWithComponentProps extends ILinkBaseProps {
  /**
   * I'm not really sure of a good way to implement this, but when the `component` prop is provided, all valid props
   * from that component should also be allowed.
   */
  [key: string]: any;
  component: React.ReactType;
}

export type ILinkProps = ILinkBaseProps | ILinkWithComponentProps;

const Link: React.SFC<ILinkProps> = ({ className: propClassName, component, children, ...props }) => {
  const className = cn("rmd-link", propClassName);
  if (component) {
    return React.createElement(component, {
      ...props,
      className,
    }, children);
  }

  return <a className={className} {...props}>{children}</a>;
};

Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  component: PropTypes.func,
};

export default Link;
