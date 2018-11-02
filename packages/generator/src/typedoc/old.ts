const COMMENT = `The \`Button\` component is used to create a clickable area within your application. It can be styled
to be flat with the background, outlined, or contained. A contained button will include some elevation
to help increase its visibility within the app. In addition, the button can be themed to either be clear,
a default grey color, or to use the app's defined primary or secondary color.

Buttons come in the form of text, icon, or text and icon together. It is recommended to use the text
version when possible since it is less confusing for the user, but icons can be used if they are easy
to understand and there is limited space.

Another feature of the \`Button\` is that it can be conditionally rendered as a \`<div>\` instead of a \`<button>\`
if you need to create a more advanced clickable area that has \`<div>\`s inside (it is considered invalid html to have
a \`<div>\` within a \`<button>\`). This will make the div fully accessible to keyboard users and add the correct
keyboard events.

\`\`\`tsx
import * as React from "react";
import { IAppBarProps, AppBar } from "@react-md/app-bar"

const MyCustomAppBar: React.SFC<IAppBarProps> = ({ className, children, ...props }) => (
 <AppBar {...props} className={cn("my-custom-app-bar", className)}>
   <img src="/company-logo" alt="Company logo" />
   {children}
 </AppBar>
)
\`\`\`

\`\`\`jsx
export default class Example extends React.Component {
  render() {
    return <MyComponent ref={this.handleRef} />;
  }

  handleRef = (instance) => {
    // choose one of the following
    const el = ReactDOM.findDOMNode(instance);
    const el = document.getElementById('my-component-id');
    const el = document.querySelector('my-component-query');

    this.props.callbackRef(instance ? el : null);
  }
}
\`\`\`

\`\`\`scss
.my-button {
  @include rmd-btn-unstyled;
  @include rmd-typography(button);

  display: inline-flex;
}
\`\`\`

\`\`\`scss
@import '@react-md/icon/dist/icon';
@import '@react-md/theme/dist/theme';
@import '@react-md/typography/dist/typography';

@include react-md-icon;
@include react-md-theme;
@include react-md-typography;

// or if you don't need to use any of the provided variables, mixins, or functions, only include the following lines
@import '@react-md/icon/dist/styles';
@import '@react-md/theme/dist/styles';
@import '@react-md/typography/dist/styles';
\`\`\`
`;
