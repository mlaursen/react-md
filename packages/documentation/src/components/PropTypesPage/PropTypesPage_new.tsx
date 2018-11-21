import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@react-md/link";
import { List, ListItem } from "@react-md/list";
import { Text, TextContainer } from "@react-md/typography";
import { Markdown } from "components/Markdown";
import { TextIconSpacing } from "@react-md/icon";
import styled from "styled-components";
import { ImportExportSVGIcon } from "@react-md/material-icons";

export interface IPropTypesPageProps {
  name: string;
}

/* tslint:disable */
const DESCRIPTION = `The \`Button\` component is used to create a clickable area within your application. It can be styled
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
`;

const enums = false;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  th {
    text-align: left;
    white-space: nowrap;

    :not(:last-child) {
      padding-right: 1rem;
    }
  }

  p {
    margin: 0;
  }

  td {
    padding: 1rem 0;
    vertical-align: top;
  }

  td:first-child {
    white-space: nowrap;
  }

  td:not(:last-child) {
    padding-right: 1rem;
  }
`;

const CenteredDiv = styled.div`
  align-items: center;
  display: flex;
`;

const Navigation = styled.aside`
  background-color: var(--rmd-theme-surface, #fff);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  right: 0;
  top: 3.25rem;
  padding: 1rem;
  position: fixed;
  width: 12rem;
  z-index: 3;
`;

const NavigationItemWrapper = styled.li`
  margin-left: 1.5rem;
`;

const NavigationItem: React.FunctionComponent<{ children: React.ReactNode; to: string }> = ({ children, to }) => (
  <NavigationItemWrapper>
    <Link component={RouterLink} to={to}>
      {children}
    </Link>
  </NavigationItemWrapper>
);

const InterfaceItem: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
  <li>
    <Text type="subtitle-1" component="span">
      {children}
    </Text>
  </li>
);

const Wrapper = styled.div`
  padding: 2rem;
  padding-top: 0;
`;

export default class PropTypesPage extends React.Component<IPropTypesPageProps> {
  public render() {
    const { name } = this.props;
    return (
      <Wrapper>
        <TextContainer>
          <Text type="headline-2">{name}</Text>
        </TextContainer>
        <Markdown className="rmd-text-container" markdown={DESCRIPTION} />
        <Text type="headline-3">Props</Text>
        <Table className="markdown-container">
          <thead>
            <tr>
              <th>Prop Name</th>
              <th>Prop Type</th>
              <th>Default Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>type</td>
              <td>
                <code>"button" | "submit" | "reset"</code>
              </td>
              <td>
                <code>"button"</code>
              </td>
              <td>
                <Markdown
                  markdown={`The button's type attribute. This is set to "button" by default so that forms are not accidentally submitted
when this prop is omitted since buttons without a type attribute work as submit by default.
`}
                />
              </td>
            </tr>
            <tr>
              <td>
                <CenteredDiv>
                  <TextIconSpacing
                    iconAfter={true}
                    icon={
                      <Link component={RouterLink} to="#interface-ibuttonthemeprops">
                        <ImportExportSVGIcon
                          aria-describedby="props-btn-type-inherited-by-tooltip"
                          dense={true}
                        />
                      </Link>
                    }
                  >
                    <Text type="body-2">btnType *</Text>
                  </TextIconSpacing>
                </CenteredDiv>
              </td>
              <td>
                <code>"text" | "icon"</code>
              </td>
              <td>
                <code>"text"</code>
              </td>
              <td>
                <Markdown
                  markdown={`This is the specific material design button type to use. This can either be set to "text" or
"icon". When this is set to "text", the styles applied will make buttons with just text or text
with icons render nicely. When this is set to "icon", the styles applied will make icon only buttons
render nicely.
`}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Text type="headline-3">Attributes</Text>
        {enums && <Text type="headline-3">Enums</Text>}
        <Text type="headline-3">Typescript Consumers Only</Text>
        <Text type="body-2">
          The following sections are only for users of <code>react-md</code> that develop with
          typescript.
        </Text>
        <Text type="headline-4">Interfaces</Text>
        <Text type="headline-4">Types</Text>
        <Navigation>
          <List dense={true}>
            <InterfaceItem>IButtonProps</InterfaceItem>
            <NavigationItem to="#props-ibuttonprops-type">type</NavigationItem>
            <NavigationItem to="#props-ibuttonprops-theme">theme</NavigationItem>
            <InterfaceItem>IButtonThemeProps</InterfaceItem>
            <NavigationItem to="#props-ibuttonthemeprops-theme">btnType</NavigationItem>
            <NavigationItem to="#props-ibuttonthemeprops-disabled">disabled</NavigationItem>
            <NavigationItem to="#props-ibuttonthemeprops-theme">theme</NavigationItem>
            <NavigationItem to="#props-ibuttonthemeprops-theme-type">themeType</NavigationItem>
          </List>
        </Navigation>
      </Wrapper>
    );
  }
}
