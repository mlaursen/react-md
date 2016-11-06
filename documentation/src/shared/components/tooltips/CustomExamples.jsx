import React from 'react';

import TooltipFontIcon from './TooltipFontIcon';
import TooltipLink from './TooltipLink';

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
