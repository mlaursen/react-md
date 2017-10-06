/** @module utils/bem */
import cn from 'classnames';

/**
 * A utility function to apply BEM class names to an element.
 *
 * ### Examples:
 * ```js
 * bem('class') === 'class'
 * bem('block', 'element') === 'block__element'
 * bem('block', 'element', 'sub-element') === 'block__element__sub-element'
 * bem('block', { 'mod-1': true, 'mod-2': false }) === 'block block--mod-1'
 * bem('block', 'element', { 'mod-1': false, 'mod-2': true }) === 'block__element block__element--mod-2'
 * bem('block', 'element', {
 *   'mod-1': false,
 *   'mod-2': true,
 * }, 'other', 'class-names') === 'block__element block__element--mod-2 other class-names'
 * ```
 *
 * @param {...String} blocks - 1 to many blocks to use. These names will be joined
 *    with underscores.
 * @param {Object=} modifiers - Any conditional modifiers to apply to the blocks. Each
 *    key in this object will be applied as a `--suffix` to the blocks ONLY when
 *    their value is true-ish.
 * @param {...String} others - Any additional class names to apply.
 * @return {String} the bem-formatted className string.
 */
export default function bem(...args) {
  const base = [];
  let modifiers = null;
  let remaining = -1;
  args.some((arg, i) => {
    if (arg) {
      const type = typeof arg;
      if (type === 'number' || type === 'string') {
        base.push(arg);
      } else if (type === 'object') {
        modifiers = arg;
        remaining = i + 1;
      }
    }
    return modifiers;
  });

  const element = base.join('__');
  if (modifiers) {
    modifiers = Object.keys(modifiers).reduce((obj, key) => {
      obj[`${element}--${key}`] = modifiers[key];
      return obj;
    }, {});
  }
  const classes = remaining > -1 ? args.slice(remaining) : null;
  return cn(element, modifiers, classes).trim();
}
