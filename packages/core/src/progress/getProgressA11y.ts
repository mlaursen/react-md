export interface ProgressA11y {
  "aria-busy": true;
  "aria-describedby": string;
}

/**
 * An extremely simple util that can be used to get the required a11y props for
 * another component that relies on a progress component.
 *
 * @param progressId - The id for the progress bar
 * @param progressing - Boolean if the progress bar is visible and progressing
 */
export function getProgressA11y(
  progressId: string,
  progressing: boolean
): ProgressA11y | undefined {
  if (!progressing) {
    return undefined;
  }

  return {
    "aria-busy": true,
    "aria-describedby": progressId,
  };
}
