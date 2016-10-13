import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

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
  };

  static defaultProps = {
    iconClassName: 'material-icons',
  };

  render() {
    const { iconClassName, className, children, disabled, ...props } = this.props;
    return (
      <i
        {...props}
        className={cn('md-icon', iconClassName, {
          'md-icon--disabled': disabled,
        }, className)}
      >
        {children}
      </i>
    );
  }
}
