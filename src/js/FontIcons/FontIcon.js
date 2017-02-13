import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

const styles = {
  sized: { width: 24, height: 24 },
  fullySized: { width: 24, height: 24, fontSize: 24 },
};

/**
 * The \`FontIcon\` component is used for rendering a font-icon library's
 * icon. The default is to use the `material-icons` library, but others
 * can be used as well.
 *
 * If you are using another font-icon library that does not always create
 * icons with a perfect 1:1 scale (such as font-awesome), it is recommended
 * to update the `.md-icon` styles to set the width and height to `$md-font-icon-size`.
 * However, this will prevent different sided icons.
 *
 * \`\`\`scss
 * .md-icon.fa {
 *   height: $md-font-icon-size;
 *   width: $md-font-icon-size;
 * }
 * \`\`\`
 */
export default class FontIcon extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `FontIcon`.
     */
    className: PropTypes.string,

    /**
     * The icon font library className to use to display the icon.
     */
    iconClassName: PropTypes.string.isRequired,

    /**
     * Any children required to display the icon with the font library.
     */
    children: PropTypes.node,

    /**
     * Boolean if the `FontIcon` should gain the disabled colors.
     */
    disabled: PropTypes.bool,

    /**
     * Either a boolean that will enforce the 24x24 size of the font icon or a number of the size
     * to enforce. This is useful when using other font icon libraries that do not have a consistent
     * size.
     */
    forceSize: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),

    /**
     * Boolean if the `forceSize` prop should also force the `font-size` instead of only `width` and `height`.
     */
    forceFontSize: (props, propName, component, ...args) => {
      let error = PropTypes.bool(props, propName, component, ...args);
      if (!error && typeof props.forceSize === 'undefined' && props[propName]) {
        error = new Error(
          `You provided a \`forceFontSize\` prop to the ${component} component, without specifying the \`forceSize\` ` +
          `prop. Either set the \`forceSize\` prop to a boolean or a number, or disable \`${propName}\`.`
        );
      }

      return error;
    },
  };

  static defaultProps = {
    iconClassName: 'material-icons',
  };

  render() {
    const {
      iconClassName,
      className,
      children,
      disabled,
      style,
      forceSize,
      forceFontSize,
      ...props
    } = this.props;

    let mergedStyles = style;
    if (typeof forceSize === 'boolean') {
      const merge = forceFontSize ? styles.fullySized : styles.sized;
      mergedStyles = style ? { ...merge, ...style } : merge;
    } else if (typeof forceSize === 'number') {
      const merge = {
        fontSize: forceFontSize ? forceSize : undefined,
        height: forceSize,
        width: forceSize,
      };

      mergedStyles = style ? { ...merge, ...style } : merge;
    }

    return (
      <i
        {...props}
        style={mergedStyles}
        className={cn('md-icon', iconClassName, {
          'md-icon--disabled': disabled,
        }, className)}
      >
        {children}
      </i>
    );
  }
}
