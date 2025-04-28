import {
  BaseTooltipHookOptions,
  TooltipHookOptions,
  TooltipHookProvidedElementProps,
  TooltipHookProvidedTooltipProps,
  TooltipHookReturnValue,
  TooltipInitiatedBy,
  TooltipKeyboardEventHandlers,
  TooltipTouchEventHandlers,
  useTooltip,
} from "react-md";

type T1 = TooltipInitiatedBy;
type T2 = TooltipTouchEventHandlers;
type T3 = TooltipKeyboardEventHandlers;
type T4 = BaseTooltipHookOptions;

interface ExampleProps {
  tooltipProps: TooltipHookProvidedTooltipProps;
  elementProps: TooltipHookProvidedElementProps;
}

function useExample<E extends HTMLElement>(
  options: TooltipHookOptions<E>
): TooltipHookReturnValue<E> {
  return useTooltip(options);
}
