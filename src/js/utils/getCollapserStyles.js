import cn from 'classnames';

/**
 * A simple utility function to get the dynamic collapser styles.
 */
export default function getCollapserStyles({ flipped, suffix, suffixFlipped }, ...classNames) {
  return cn('md-collapser', {
    'md-collapser--flipped': flipped && (!suffixFlipped || !suffix),
    [`md-collapser--${suffix}`]: suffix,
    [`md-collapser--${suffix}-flipped`]: suffix && flipped && suffixFlipped,
  }, ...classNames);
}
