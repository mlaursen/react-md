import React from 'react';
import { FontIcon, injectTooltip } from 'react-md';

const styles = {
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '1em',
  },
};

const TooltipFontIcon = injectTooltip(({ children, iconClassName, tooltip }) => (
  <div style={styles.tooltipContainer}>
    {tooltip}
    <FontIcon iconClassName={iconClassName}>{children}</FontIcon>
  </div>
));

const TooltipLink = injectTooltip(({ children, tooltip }) => (
  <a style={styles.tooltipContainer} className="link">
    {tooltip}
    {children}
  </a>
));

const CustomExamples = () => (
  <section>
    <p>Any component can be composed with the tooltip. Here is are some with the FontIcons.</p>
    <TooltipFontIcon tooltipLabel="Print" tooltipPosition="top">print</TooltipFontIcon>
    <TooltipFontIcon tooltipLabel="Print" tooltipPosition="right">print</TooltipFontIcon>
    <TooltipFontIcon tooltipLabel="Print" tooltipPosition="bottom">print</TooltipFontIcon>
    <TooltipFontIcon tooltipLabel="Print" tooltipPosition="left">print</TooltipFontIcon>
    <p>
      Tooltips will not appear on a composed component if the tooltipLabel is not specified.
      Here are some examples of a link.
    </p>
    <TooltipLink href="#">No tooltip</TooltipLink>
    <TooltipLink tooltipLabel="Wow!" tooltipPosition="top" href="#">Some link!</TooltipLink>
    <TooltipLink tooltipLabel="What a save!" tooltipPosition="right" href="#">Some link!</TooltipLink>
    <TooltipLink tooltipLabel="No Problem." tooltipPosition="bottom" href="#">Some link!</TooltipLink>
  </section>
);

export default CustomExamples;
