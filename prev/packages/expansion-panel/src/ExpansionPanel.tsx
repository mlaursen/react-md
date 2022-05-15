import type { CSSProperties, MouseEventHandler, ReactNode, Ref } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type { CardContentProps, CardProps } from "@react-md/card";
import { Card, CardContent } from "@react-md/card";
import { useCollapseTransition } from "@react-md/transition";
import { bem } from "@react-md/utils";

import { ExpansionPanelHeader } from "./ExpansionPanelHeader";

type ConfigurableCardContentProps = Pick<
  CardContentProps,
  "disablePadding" | "disableSecondaryColor" | "disableParagraphMargin"
>;

export interface ExpansionPanelProps
  extends CardProps,
    ConfigurableCardContentProps {
  /**
   * An id for the panel that is required for a11y.
   */
  id: string;

  /**
   * An optional style object to provide to the default header implementation. If
   * the `header` prop is provided, this will do nothing.
   */
  headerStyle?: CSSProperties;

  /**
   * An optional className to provide to the default header implementation. If
   * the `header` prop is provided, this will do nothing.
   */
  headerClassName?: string;

  /**
   * An optional style to provide to the content of the panel.
   */
  contentStyle?: CSSProperties;

  /**
   * An optional className to provide the content of the panel.
   */
  contentClassName?: string;

  /**
   * An optional header element to display instead of the default
   * implementation.
   */
  customHeader?: ReactNode;

  /**
   * The children to display within the default header element.
   */
  header?: ReactNode;

  /**
   * An optional ref to pass to the default header implementation. This will be
   * provided automatically if you are using the `usePanels` hook to allow
   * keyboard movement with the arrow keys and home/end keys. If you provide
   * your own `header`, you'll need to pass the `headerRef` to your custom
   * implementation to the focusable element for the keyboard focus behavior to
   * work.
   */
  headerRef?: Ref<HTMLButtonElement>;

  /**
   * Boolean if clicking on the header should no longer toggle the expansion
   * state. This will automatically be provided from the `usePanels` hook for
   * when a panel cannot be closed to do preventing all panels from being closed
   * at a time.
   */
  disabled?: boolean;

  /**
   * An optional expander icon to use within the default header implementation.
   * This defaults to the `"expander"` icon.
   */
  expanderIcon?: ReactNode;

  /**
   * Boolean if margin top should be applied to this header to add some
   * additional spacing between this panel and the previous panel. This will
   * automatically be provided for panels when using the `usePanels` hook.
   */
  marginTop?: boolean;

  /**
   * Boolean if the panel is currently expanded.
   */
  expanded: boolean;

  /**
   * A function that should attempt to change the expansion state of the panel.
   */
  onExpandClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Boolean if the collapse transition should be disabled for the content
   * within the panel. It is recommended to disable this transition if there is
   * a lot of content within the panel since animating max-height isn't super
   * great since it causes DOM repaints during the entire transition.
   */
  disableTransition?: boolean;

  /**
   * Boolean if the content should be persistent within the DOM instead of
   * unmounting once no longer expanded. This is only really helpful if you want
   * to maintain state while the panel is hidden since the children will unmount
   * when not expanded.
   */
  persistent?: boolean;
}

const block = bem("rmd-expansion-panel");

/**
 * The expansion panel renders a header element (that is just a button) and
 * dynamically shows content once expanded.
 */
export const ExpansionPanel = forwardRef<HTMLDivElement, ExpansionPanelProps>(
  function ExpansionPanel(
    {
      className,
      children,
      headerStyle,
      headerClassName,
      contentStyle,
      contentClassName,
      headerRef,
      disablePadding = false,
      disableSecondaryColor = false,
      customHeader,
      header,
      expanded,
      onExpandClick,
      expanderIcon,
      marginTop = false,
      fullWidth = true,
      persistent = false,
      disabled = false,
      disableTransition = false,
      ...props
    },
    ref
  ) {
    const { id } = props;
    const contentId = `${id}-content`;
    const { elementProps, rendered } = useCollapseTransition({
      style: contentStyle,
      className: contentClassName,
      timeout: disableTransition ? 0 : undefined,
      transitionIn: expanded,
      temporary: !persistent,
    });

    return (
      <Card
        {...props}
        id={`${id}-container`}
        ref={ref}
        fullWidth={fullWidth}
        className={cn(block({ expanded, "margin-top": marginTop }), className)}
      >
        {customHeader || (
          <ExpansionPanelHeader
            aria-disabled={disabled || undefined}
            id={id}
            ref={headerRef}
            style={headerStyle}
            className={headerClassName}
            icon={expanderIcon}
            expanded={expanded}
            onClick={onExpandClick}
            disableTransition={disableTransition}
          >
            {header}
          </ExpansionPanelHeader>
        )}
        {rendered && (
          <CardContent
            {...elementProps}
            id={contentId}
            aria-labelledby={id}
            role="region"
            disableSecondaryColor={disableSecondaryColor}
            disablePadding={disablePadding}
            disableExtraPadding
          >
            {children}
          </CardContent>
        )}
      </Card>
    );
  }
);
