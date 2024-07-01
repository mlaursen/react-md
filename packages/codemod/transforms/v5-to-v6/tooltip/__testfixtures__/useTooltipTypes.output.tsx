// TODO: `TooltipTouchEventHandlers` type has been removed from react-md.
// TODO: `TooltipKeyboardEventHandlers` type has been removed from react-md.
// TODO: `TooltipInitiatedBy` type has been removed from react-md.
import {
  TooltipOptions,
  TooltipOptions,
  ProvidedTooltippedElementProps,
  ProvidedTooltipProps,
  TooltipImplementation,
  useTooltip,
} from "react-md";

type T1 = TooltipInitiatedBy;
type T2 = TooltipTouchEventHandlers;
type T3 = TooltipKeyboardEventHandlers;
type T4 = TooltipOptions;

interface ExampleProps {
  tooltipProps: ProvidedTooltipProps;
  elementProps: ProvidedTooltippedElementProps;
}

function useExample<E extends HTMLElement>(
  options: TooltipOptions<E>
): TooltipImplementation<E> {
  return useTooltip(options);
}
