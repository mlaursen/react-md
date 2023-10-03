import { type FormConfiguration } from "./types.js";

/**
 * @remarks \@since 6.0.0
 */
export const FORM_CONFIG: FormConfiguration = {
  theme: "outline",
  underlineDirection: "left",
  uncontrolledToggles: true,
};

/**
 * @remarks \@since 6.0.0
 */
export function getFormConfig<N extends keyof FormConfiguration>(
  name: N,
  override?: FormConfiguration[N]
): FormConfiguration[N] {
  if (typeof override !== "undefined") {
    return override;
  }

  return FORM_CONFIG[name];
}
