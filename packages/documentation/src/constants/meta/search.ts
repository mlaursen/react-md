/**
 * This file was generated from @react-md/dev-utils and should not be updated
 * manually.
 */

import { RouteMetadata } from "./types";

const metadata: ReadonlyArray<RouteMetadata> = [
  {
    title: "About",
    summary:
      "This project's goal is to help create extremely customizable and fully accessible React components matching the guidelines from https://www.w3.org along with the Material Design principals. The main difference between this library and material-ui is how the styles are provided. This library is focused more towards developers that like Sass instead of CSS-in-JS solutions.",
    type: "guide",
    pageUrl: "/about",
    pathname: "/about",
  },
  {
    title: "Color Palette",
    summary:
      "Learn more about the material design color palette and all the default colors provided.",
    type: "theme",
    pageUrl: "/colors-and-theming/color-palette",
    pathname: "/colors-and-theming/color-palette",
  },
  {
    title: "Creating Dynamic Themes",
    summary:
      "Starting with react-md@v2, the majority of the packages now allow for customizing colors and spacing with CSS variables with the new theme API. This new theme API is extremely powerful and allows for a lot of additional customization and configuration in your app since your theme can be configured at a component-by-component basis or at runtime.",
    type: "guide",
    pageUrl: "/colors-and-theming/creating-dynamic-themes",
    pathname: "/colors-and-theming/creating-dynamic-themes",
  },
  {
    title: "Overriding Defaults",
    summary:
      "Before reading this page, you must have first completed the documentation for customizing your theme as this is an expansion upon those two pages to customize your theme.",
    type: "guide",
    pageUrl: "/colors-and-theming/overriding-defaults",
    pathname: "/colors-and-theming/overriding-defaults",
  },
  {
    title: "Theme Builder",
    summary:
      "Create a custom theme for your app and this documentation site using the live preview. The theme builder supports changing the theme colors using the material design color palette as well as warning when there are contrast ratio problems.",
    type: "theme",
    pageUrl: "/colors-and-theming/theme-builder",
    pathname: "/colors-and-theming/theme-builder",
  },
  {
    title: "Advanced Installation",
    summary:
      "The base react-md package is available as a UMD bundle that has been hosted through the CDN: unpkg.com. The UMD will export a global variable named ReactMD that will contain all the exported components, hooks, and utils just like the npm package:",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/advanced-installation",
  },
  {
    title: "Configuring Your Layout",
    summary:
      "If you couldn't tell already, there are a lot of features and configuration within react-md that require initializing React Context Providers. Since it can be annoying to have to import all of these providers manually and initialize them, the @react-md/layout package provides a nice Configuration component that will initialize all of these for you with reasonable defaults that can be overridden.",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/configuring-your-layout",
  },
  {
    title: "Contributing",
    summary: "First off, thanks for taking the time to contribute!",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/contributing",
  },
  {
    title: "Creating A New App",
    summary:
      "This guide will help you create a new app with react-md along with create-react-app as the project bootstrapper. The basic requirements for continuing are:",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/creating-a-new-app",
  },
  {
    title: "Customizing Your Theme",
    summary:
      "The default theme within react-md is something that I recommend changing as soon as possible since I'm terrible at colors and just chose two random ones.",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/customizing-your-theme",
  },
  {
    title: "Including Styles Without Webpack",
    summary:
      "Something you might've noticed is that all the @import statements start with a tilde (~) character. This allows webpack to resolve files that are found within the node_modules folder. However, if you aren't using webpack and are using one of the other Sass compilers you'll get a great error:",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/including-styles-without-webpack",
  },
  {
    title: "Installation",
    summary:
      "react-md is a React component library that aims to aid in creating an accessible web application following the rules outlined at w3.org, using the material design specifications for design, and styles provided by SCSS files. This page is targeted towards developers that have an existing app that should be updated to use react-md. If you do not have an app initialized already or a new user, I recommend the creating a new app documentation instead.",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/installation",
  },
  {
    title: "Scoped Packages",
    summary:
      "In the simple installation guide, you should have seen react-md being installed as:",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/scoped-packages",
  },
  {
    title: "Using The Sass Exports",
    summary:
      "The naming conventions and export structure will be the same for the majority of the packages within react-md and should follow this pattern (with a few exceptions):",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/using-the-sass-exports",
  },
  {
    title: "Working With v1",
    summary:
      "If you are a previous user of react-md, I would like to first apologize for not making this backwards compatible or a bit easier to migrate. react-md@v2 ended up being a giant rewrite to be built using Typescript and React hooks along with additional accessibility fixes so I couldn't think of a good way to release this along with a nice migration.",
    type: "guide",
    pageUrl: "/guides/[id]",
    pathname: "/guides/working-with-v1",
  },
  {
    title: "Alert API",
    summary: "The component API for the @react-md/alert package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/alert/api",
  },
  {
    title: "Alert Changelog",
    summary:
      "This package is a new implementation of the Snackbar component from v1. There should now be some accessibility fixes and hopefully a better way to queue messages as well as cancel them but I also feel like I might need to re-work this again to work without the React context API.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/alert/changelog",
  },
  {
    title: "Alert Demos",
    summary:
      "Demos using the @react-md/alert's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/alert/demos",
    pathname: "/packages/alert/demos",
  },
  {
    title: "Alert Demo - Simple Message Queue",
    summary:
      "This example will be fairly simple and show some example messages you can send using the addMessage API. The messages are fairly customizable out of the box and it can render:",
    type: "demo",
    pageUrl: "/packages/alert/demos#simple-message-queue-title",
    pathname: "/packages/alert/demos#simple-message-queue-title",
  },
  {
    title: "Alert Demo - Handling Duplicated Messages",
    summary:
      'If the example above you might have noticed that if you spammed the "Add Message" button, the same toast would be shown repeatedly by hiding and reappearing. This is the default behavior out of the box but it can be updated so that duplicates will be prevented entirely or that the timer will be restarted if the same message is added to the queue while it is currently visible.',
    type: "demo",
    pageUrl: "/packages/alert/demos#handling-duplicated-messages-title",
    pathname: "/packages/alert/demos#handling-duplicated-messages-title",
  },
  {
    title: "Alert Demo - Updating Message Priority",
    summary:
      "Whenever you call the addMessage the new message will be added to the end of the queue. This is great for most use cases, but what about important notifications that need to be shown immediately such as online/offline status? When you create a message, you can also add a messagePriority property that will update the message's insertion point in the queue. The default behavior is to always add the new message at the end of the queue, but there is also support for:",
    type: "demo",
    pageUrl: "/packages/alert/demos#updating-message-priority-title",
    pathname: "/packages/alert/demos#updating-message-priority-title",
  },
  {
    title: "Alert Installation",
    summary:
      "Create accessible alerts that can be displayed to users in your app. This package provides a MessageQueue for showing messages and a useAddMessage hook to push alerts into the queue.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/alert/installation",
  },
  {
    title: "Alert SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/alert package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/alert/sassdoc",
  },
  {
    title: "AppBar API",
    summary: "The component API for the @react-md/app-bar package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/app-bar/api",
  },
  {
    title: "AppBar Changelog",
    summary:
      "This package is a replacement of the old Toolbar component in v1 that has now been separated into multiple components for additional customization.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/app-bar/changelog",
  },
  {
    title: "AppBar Demos",
    summary:
      "Demos using the @react-md/app-bar's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/app-bar/demos",
    pathname: "/packages/app-bar/demos",
  },
  {
    title: "AppBar Demo - Simple Usage",
    summary:
      "An app bar is a good place to put your main navigation toggle, your app's title or the page's title, and some common actions for your app. As shown below, the app bar will automatically attempt to use a color with enough contrast relative to the background by default and the icons will automatically inherit that color as well.",
    type: "demo",
    pageUrl: "/packages/app-bar/demos#simple-usage-title",
    pathname: "/packages/app-bar/demos#simple-usage-title",
  },
  {
    title: "AppBar Demo - Different Sizes",
    summary:
      "There are 4 different sizes available for the app bar by default:",
    type: "demo",
    pageUrl: "/packages/app-bar/demos#different-sizes-title",
    pathname: "/packages/app-bar/demos#different-sizes-title",
  },
  {
    title: "AppBar Demo - Auto Dense",
    summary:
      'Since it can be a bit annoying having to set the dense prop via js for all these different app bars, it\'s possible to create an auto-dense theme using media queries and the provided mixins from @react-md/app-bar. This example will automatically set the AppBar and the related actions to dense when the viewport size is considered "desktop".',
    type: "demo",
    pageUrl: "/packages/app-bar/demos#auto-dense-title",
    pathname: "/packages/app-bar/demos#auto-dense-title",
  },
  {
    title: "AppBar Demo - Fixed with Offset",
    summary:
      "App bars are generally great for using in your main layout, so there is also the ability to fix the app bar at the top of the page. Unfortunately, once the app bar has been fixed, your main content can be covered by the app bar which isn't super great. To work around this, you can apply any of the following class names to your main content element to be correctly offset based off of the app bar's size:",
    type: "demo",
    pageUrl: "/packages/app-bar/demos#fixed-with-offset-title",
    pathname: "/packages/app-bar/demos#fixed-with-offset-title",
  },
  {
    title: "AppBar Demo - Animating App Bar",
    summary:
      "It is also possible to animate and change the height of the toolbar using the rmd-app-bar-theme mixins or custom CSS variables. The example below will show how you can animate the app bar when the user scrolls from a custom height to the default app bar height.",
    type: "demo",
    pageUrl: "/packages/app-bar/demos#animating-app-bar-title",
    pathname: "/packages/app-bar/demos#animating-app-bar-title",
  },
  {
    title: "AppBar Installation",
    summary:
      "This package is used to create a top-level fixed app bar in your application to display some sort of navigation button like a hamburger menu, your app title and/or logo, as well as any top-level actions for your app. You can also use this component to create toolbars or other header elements for different sections of your app.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/app-bar/installation",
  },
  {
    title: "AppBar SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/app-bar package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/app-bar/sassdoc",
  },
  {
    title: "AutoComplete API",
    summary: "The component API for the @react-md/autocomplete package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/autocomplete/api",
  },
  {
    title: "AutoComplete Changelog",
    summary:
      "The v2 release completely re-write the Autocomplete component and renamed it to AutoComplete. There is a new API for dealing with data as well as a lot of accessibility fixes.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/autocomplete/changelog",
  },
  {
    title: "AutoComplete Demos",
    summary:
      "Demos using the @react-md/autocomplete's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/autocomplete/demos",
    pathname: "/packages/autocomplete/demos",
  },
  {
    title: "AutoComplete Demo - Simple Example",
    summary:
      "The base requirements for an AutoComplete are to provide an id, a list of data to filter, and a filter behavior/custom function. However, it is recommended to also provide a label or aria-label for additional accessibility and a placeholder value for additional context.",
    type: "demo",
    pageUrl: "/packages/autocomplete/demos#simple-example-title",
    pathname: "/packages/autocomplete/demos#simple-example-title",
  },
  {
    title: "AutoComplete Demo - Using Object Data Sets",
    summary:
      "Since it isn't extremely helpful to only use strings, the AutoComplete can also filter and display a list of objects. The base requirements for an object result is that it should have:",
    type: "demo",
    pageUrl: "/packages/autocomplete/demos#using-object-data-sets-title",
    pathname: "/packages/autocomplete/demos#using-object-data-sets-title",
  },
  {
    title: "AutoComplete Demo - Highlight Matches",
    summary:
      'The AutoComplete also supports some basic support for highlight letters that match the text field\'s value when the list of data have string labels. This will only work for "case-insensitive" filtering or a custom filter function that ensures that the matches always match all the letters in order.',
    type: "demo",
    pageUrl: "/packages/autocomplete/demos#highlight-matches-title",
    pathname: "/packages/autocomplete/demos#highlight-matches-title",
  },
  {
    title: "AutoComplete Installation",
    summary:
      "Create an accessible autocomplete component that allows a user to get real-time suggestions as they type within an input. This component can also be hooked up to a backend API that handles additional filtering or sorting.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/autocomplete/installation",
  },
  {
    title: "Avatar API",
    summary: "The component API for the @react-md/avatar package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/avatar/api",
  },
  {
    title: "Avatar Changelog",
    summary:
      "The avatar component should be fairly similar to the v1 version except for a few behavior changes.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/avatar/changelog",
  },
  {
    title: "Avatar Demos",
    summary:
      "Demos using the @react-md/avatar's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/avatar/demos",
    pathname: "/packages/avatar/demos",
  },
  {
    title: "Avatar Demo - Simple Usage",
    summary:
      "Avatars are a great way to represent people or specific objects within your app. They can render as:",
    type: "demo",
    pageUrl: "/packages/avatar/demos#simple-usage-title",
    pathname: "/packages/avatar/demos#simple-usage-title",
  },
  {
    title: "Avatar Demo - Color Examples",
    summary:
      "The Avatar component has a few pre-made colors available by default. You can change the color by supplying the color prop.",
    type: "demo",
    pageUrl: "/packages/avatar/demos#color-examples-title",
    pathname: "/packages/avatar/demos#color-examples-title",
  },
  {
    title: "Avatar Installation",
    summary:
      "Create avatars to represent people or objects with images, icons, or text. Different theme colors can also be applied for icons or text.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/avatar/installation",
  },
  {
    title: "Avatar SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/avatar package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/avatar/sassdoc",
  },
  {
    title: "Badge API",
    summary: "The component API for the @react-md/badge package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/badge/api",
  },
  {
    title: "Badge Changelog",
    summary:
      "This release has introduced two additional components: BadgeContainer and BadgedButton. The BadgedButton is the closest thing to the old Badge component but it always renders as a Button instead. The BadgeContainer is a small wrapper component to add basic styles to allow a Badge to be positioned relative to another component.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/badge/changelog",
  },
  {
    title: "Badge Demos",
    summary:
      "Demos using the @react-md/badge's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/badge/demos",
    pathname: "/packages/badge/demos",
  },
  {
    title: "Badge Demo - Simple Examples",
    summary:
      'The most common use-case for a badge is to be displayed on a button indicating the number of new alerts for a user. This package exports a nice wrapper component named the BadgedButton which will default to rendering as a icon button with a notification FontIcon and an aria-label="Notifications".',
    type: "demo",
    pageUrl: "/packages/badge/demos#simple-examples-title",
    pathname: "/packages/badge/demos#simple-examples-title",
  },
  {
    title: "Badge Demo - Themed Badges",
    summary:
      "Just like other components within react-md, the Badge component comes with a few themes:",
    type: "demo",
    pageUrl: "/packages/badge/demos#themed-badges-title",
    pathname: "/packages/badge/demos#themed-badges-title",
  },
  {
    title: "Badge Demo - With Tooltips",
    summary:
      "Tooltips can also be integrated with a Badge to show additional information about these notifications as well. Unfortunately there isn't a component included in react-md at this time to do this, but it can easily be created using the Tooltipped and BadgedButton components.",
    type: "demo",
    pageUrl: "/packages/badge/demos#with-tooltips-title",
    pathname: "/packages/badge/demos#with-tooltips-title",
  },
  {
    title: "Badge Demo - Customizing Badges",
    summary:
      "Badges do not need to always be rendered with a Button and can be used as supplementary text for any other element. To create a custom badge, you can use the BadgeContainer and Badge components directly instead of the BadgedButton.",
    type: "demo",
    pageUrl: "/packages/badge/demos#customizing-badges-title",
    pathname: "/packages/badge/demos#customizing-badges-title",
  },
  {
    title: "Badge Installation",
    summary:
      "A badge is a floating element that is normally fixed to another element to add additional information. The biggest use-case for a badge is to show a count of notifications.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/badge/installation",
  },
  {
    title: "Badge SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/badge package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/badge/sassdoc",
  },
  {
    title: "Button API",
    summary: "The component API for the @react-md/button package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/button/api",
  },
  {
    title: "Button Changelog",
    summary:
      "The Button component was completely re-written in this release for full Typescript support, forwarding the ref to the <button> element, and can be rendered with only children to enable a default theme. However, the Button component removed built-in support for tooltips and rendering icons with text but can be easily added back in with the @react-md/tooltip and\n@react-md/icon packages.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/button/changelog",
  },
  {
    title: "Button Demos",
    summary:
      "Demos using the @react-md/button's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/button/demos",
    pathname: "/packages/button/demos",
  },
  {
    title: "Button Demo - Text Buttons",
    summary:
      "Text buttons are generally used when an action is less important or should not be the user's main focus. This is the default button theme type and allows you to create a button with no additional props (other than children):",
    type: "demo",
    pageUrl: "/packages/button/demos#text-buttons-title",
    pathname: "/packages/button/demos#text-buttons-title",
  },
  {
    title: "Button Demo - Outlined Buttons",
    summary:
      'Outline buttons have a bit more emphasis than text buttons since they have an additional outline color. They should generally be used in places that aren\'t the primary action in the app, but should still be noticeable. You can create outlined buttons by adding a new prop: themeType="outline".',
    type: "demo",
    pageUrl: "/packages/button/demos#outlined-buttons-title",
    pathname: "/packages/button/demos#outlined-buttons-title",
  },
  {
    title: "Button Demo - Contained Buttons",
    summary:
      'Contained buttons have high emphasis as they have an entire color fill and shadow. Contained buttons can be created by setting the themeType="contained" prop.',
    type: "demo",
    pageUrl: "/packages/button/demos#contained-buttons-title",
    pathname: "/packages/button/demos#contained-buttons-title",
  },
  {
    title: "Button Demo - Icon Buttons",
    summary:
      "Icon Buttons are great when you have limited space and an icon that is well known/self-describing. Common places for icon buttons are within the @react-md/app-bar or as expansion toggles. You will need to install the @react-md/icon and include the styles for icons for these types of buttons. It is also recommended to install the\n@react-md/material-icons package for all the material icons pre-built as React components.",
    type: "demo",
    pageUrl: "/packages/button/demos#icon-buttons-title",
    pathname: "/packages/button/demos#icon-buttons-title",
  },
  {
    title: "Button Demo - Text Buttons with Icons",
    summary:
      "When you have the additional room, it is also possible to render icons with text within buttons using the TextIconSpacing component from @react-md/icon.",
    type: "demo",
    pageUrl: "/packages/button/demos#text-buttons-with-icons-title",
    pathname: "/packages/button/demos#text-buttons-with-icons-title",
  },
  {
    title: "Button Demo - Floating Action Buttons",
    summary:
      "Buttons can also be rendered as a floating action button\n(FAB) by setting the floating prop to a position to render within the viewport. The default available positions are:",
    type: "demo",
    pageUrl: "/packages/button/demos#floating-action-buttons-title",
    pathname: "/packages/button/demos#floating-action-buttons-title",
  },
  {
    title: "Button Demo - Custom Button Theme",
    summary:
      "Since it might not be desired to have the same material design theme for your app, it is possible to update the base button theme by updating the different button SCSS variables before importing and including the button styles. If you have not done so, please read the pretty good write up in the theme documentation for all the detailed theming information. It's also recommended to read the states documentation to read about disable the ripple effect or custom interaction states as well.",
    type: "demo",
    pageUrl: "/packages/button/demos#custom-button-theme-title",
    pathname: "/packages/button/demos#custom-button-theme-title",
  },
  {
    title: "Button Installation",
    summary:
      "Create native buttons with multiple themes based on the material design specifications including:",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/button/installation",
  },
  {
    title: "Button SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/button package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/button/sassdoc",
  },
  {
    title: "Card API",
    summary: "The component API for the @react-md/card package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/card/api",
  },
  {
    title: "Card Changelog",
    summary:
      "The card package was re-written from the ground up for the v2 release which should allow for additional customization and styling behavior. Almost everything is a breaking change.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/card/changelog",
  },
  {
    title: "Card Demos",
    summary:
      "Demos using the @react-md/card's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/card/demos",
    pathname: "/packages/card/demos",
  },
  {
    title: "Card Demo - Simple Example",
    summary:
      "Cards are usually used to show some basic information and then allow the user to interact with it to show more data. The size of the card is determined by the content within.",
    type: "demo",
    pageUrl: "/packages/card/demos#simple-example-title",
    pathname: "/packages/card/demos#simple-example-title",
  },
  {
    title: "Card Demo - With Media",
    summary:
      "Another main use case for cards is to display some sort of media along with a description. You can use the @react-md/media package with this to handle making responsive media and create custom overlays with the CardTitle.",
    type: "demo",
    pageUrl: "/packages/card/demos#with-media-title",
    pathname: "/packages/card/demos#with-media-title",
  },
  {
    title: "Card Demo - With Actions",
    summary:
      "Since a user normally interacts with the content of a card, you can also apply actions using the CardActions component. This is normally used alongside the Button component from @react-md/button as the CardActions just applies some simple padding and flex behavior.",
    type: "demo",
    pageUrl: "/packages/card/demos#with-actions-title",
    pathname: "/packages/card/demos#with-actions-title",
  },
  {
    title: "Card Demo - Expandable Cards",
    summary:
      "Another common pattern is to create expandable cards so that the base information is available at the beginning, but more can be viewed afterwards. This can be accomplished by using:",
    type: "demo",
    pageUrl: "/packages/card/demos#expandable-cards-title",
    pathname: "/packages/card/demos#expandable-cards-title",
  },
  {
    title: "Card Installation",
    summary:
      "This package is for creating interactable cards from the material design guidelines.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/card/installation",
  },
  {
    title: "Card SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/card package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/card/sassdoc",
  },
  {
    title: "Chip API",
    summary: "The component API for the @react-md/chip package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/chip/api",
  },
  {
    title: "Chip Changelog",
    summary:
      "The chip package was completely re-written with Typescript and additional theming support for the v2 release.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/chip/changelog",
  },
  {
    title: "Chip Demos",
    summary:
      "Demos using the @react-md/chip's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/chip/demos",
    pathname: "/packages/chip/demos",
  },
  {
    title: "Chip Demo - Simple Chips",
    summary:
      'Chips are a simplified version of the @react-md/button package that can be used to represent input, attributes, or actions. Chips only have two themes by default:\n"solid" and "outline", but also have built-in support for rendering icons or avatars to the left and right of the chip contents.',
    type: "demo",
    pageUrl: "/packages/chip/demos#simple-chips-title",
    pathname: "/packages/chip/demos#simple-chips-title",
  },
  {
    title: "Chip Demo - Filter Chips",
    summary:
      "One use-case for chips is to be used for displaying filter behavior in a compact form when checkboxes or dropdowns are not desired. A filter styled chip can be created by setting the selected prop to false or true. The default behavior will be to animate a check icon in and out of view while the selected prop changes unless the disableIconTransition prop is enabled.",
    type: "demo",
    pageUrl: "/packages/chip/demos#filter-chips-title",
    pathname: "/packages/chip/demos#filter-chips-title",
  },
  {
    title: "Chip Demo - Action Chips",
    summary:
      "Chips can also be used as simple action buttons. The example below will show the following behavior:",
    type: "demo",
    pageUrl: "/packages/chip/demos#action-chips-title",
    pathname: "/packages/chip/demos#action-chips-title",
  },
  {
    title: "Chip Demo - Choice Chips",
    summary:
      "A chip can also be used as a radio group which is named a choice chip from the material design guidelines. These sorts of chips are great if you want to create a more condensed version of a radio group to display all choices to the user.",
    type: "demo",
    pageUrl: "/packages/chip/demos#choice-chips-title",
    pathname: "/packages/chip/demos#choice-chips-title",
  },
  {
    title: "Chip Demo - Input Chips",
    summary:
      "Chips can also be used alongside text fields or autocompletes to help show selected values. This example will show an idea for how something like this might be implemented, but it's nowhere near perfect. The email field will allow for showing a list of contacts that create chips when clicked.",
    type: "demo",
    pageUrl: "/packages/chip/demos#input-chips-title",
    pathname: "/packages/chip/demos#input-chips-title",
  },
  {
    title: "Chip Installation",
    summary:
      "Create a compact actionable element that can be used to represent an input, attribute, or action. A chip can be used to represent filters, tags, emails, or other inline elements.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/chip/installation",
  },
  {
    title: "Chip SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/chip package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/chip/sassdoc",
  },
  {
    title: "Dialog API",
    summary: "The component API for the @react-md/dialog package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/dialog/api",
  },
  {
    title: "Dialog Changelog",
    summary:
      "The Dialog component was completely re-written in this release and each part of the dialog has been exported for additional customization. Since the goal of react-md@v2 is to be an extension of HTML Elements with additional styling, all refs will be forwarded on to the component's element instead so you have access to the DOM nodes.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/dialog/changelog",
  },
  {
    title: "Dialog Demos",
    summary:
      "Demos using the @react-md/dialog's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/dialog/demos",
    pathname: "/packages/dialog/demos",
  },
  {
    title: "Dialog Demo - Simple Example",
    summary:
      "A dialog is used to show important content above all other elements within the page. This is normally used for alerts, confirmations, or just temporary content. The dialog within react-md also has the additional features for accessibility:",
    type: "demo",
    pageUrl: "/packages/dialog/demos#simple-example-title",
    pathname: "/packages/dialog/demos#simple-example-title",
  },
  {
    title: "Dialog Demo - Full Page Example",
    summary:
      "A full page dialog is really just as it seems: a dialog that covers the entire page. These sorts of dialogs are good to use when you want to display a lot of information temporarily but don't need to transition to a different page. Some good examples of this are:",
    type: "demo",
    pageUrl: "/packages/dialog/demos#full-page-example-title",
    pathname: "/packages/dialog/demos#full-page-example-title",
  },
  {
    title: "Dialog Demo - Simple List Example",
    summary:
      "Another common example for dialogs is to show a list of items and close the dialog when clicked. Since there is additional padding on the DialogContent component and the List component, you will want to just use the List component on its own in the dialog as well as update some padding values to match the dialog.",
    type: "demo",
    pageUrl: "/packages/dialog/demos#simple-list-example-title",
    pathname: "/packages/dialog/demos#simple-list-example-title",
  },
  {
    title: "Dialog Demo - Alert Dialogs and Modals",
    summary:
      'An alert dialog variant should be used when assistive technologies should immediately bring the user\'s attention to the dialog. This pattern is normally used for confirmation dialogs. To create an alert dialog, the only change required is to add a new prop: role="alertdialog".',
    type: "demo",
    pageUrl: "/packages/dialog/demos#alert-dialogs-and-modals-title",
    pathname: "/packages/dialog/demos#alert-dialogs-and-modals-title",
  },
  {
    title: "Dialog Demo - Fixed Dialog Example",
    summary:
      "You can also create dialogs that are fixed to other elements using the FixedDialog component. This is generally used alongside badges and buttons to show some additional information that can't be shown in a tooltip.",
    type: "demo",
    pageUrl: "/packages/dialog/demos#fixed-dialog-example-title",
    pathname: "/packages/dialog/demos#fixed-dialog-example-title",
  },
  {
    title: "Dialog Demo - Nested Dialogs",
    summary:
      "Dialogs can also be nested fairly easily since they use the @react-md/portal API behind the scenes so that the last created dialog will be shown over all the other dialogs. However, since each dialog creates its own overlay, the background will start getting darker and darker as more dialogs appear on the page and pressing the escape key will close all dialogs by default.",
    type: "demo",
    pageUrl: "/packages/dialog/demos#nested-dialogs-title",
    pathname: "/packages/dialog/demos#nested-dialogs-title",
  },
  {
    title: "Dialog Installation",
    summary:
      "Create fully accessible dialogs that can span the entire page, centered within the viewport, or positioned anywhere. The dialogs can also act as a modal so that the user must press one of the actions to close the dialog instead of closing by pressing the background overlay.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/dialog/installation",
  },
  {
    title: "Dialog SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/dialog package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/dialog/sassdoc",
  },
  {
    title: "Divider API",
    summary: "The component API for the @react-md/divider package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/divider/api",
  },
  {
    title: "Divider Changelog",
    summary:
      "The Divider component was completely re-written for this release, but it should not be a breaking change. This package now also has better support for rendering dividers vertically with the VerticalDivider component.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/divider/changelog",
  },
  {
    title: "Divider Demos",
    summary:
      "Demos using the @react-md/divider's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/divider/demos",
    pathname: "/packages/divider/demos",
  },
  {
    title: "Divider Demo - Horizontal Dividers",
    summary:
      "Horizontal dividers can be used to separate content within your page when just spacing isn't enough. The example below will show how you can use dividers between different text blocks.",
    type: "demo",
    pageUrl: "/packages/divider/demos#horizontal-dividers-title",
    pathname: "/packages/divider/demos#horizontal-dividers-title",
  },
  {
    title: "Divider Demo - Within Lists",
    summary:
      "Dividers work well with the @react-md/list package as well since a normal pattern is to add a distinction between different parts of a list. The Divider component also supports being inset so that it can align with the list keyline.",
    type: "demo",
    pageUrl: "/packages/divider/demos#within-lists-title",
    pathname: "/packages/divider/demos#within-lists-title",
  },
  {
    title: "Divider Demo - Vertical Dividers",
    summary:
      "It is also possible to create vertical dividers using the VerticalDivider component instead of the base Divider component. I would personally recommend using the rmd-divider-border mixin instead since it a bit easier when using borders instead of a component, but it is possible. The VerticalDivider will automatically update its own height based on the parent element's height so that it can be shown.",
    type: "demo",
    pageUrl: "/packages/divider/demos#vertical-dividers-title",
    pathname: "/packages/divider/demos#vertical-dividers-title",
  },
  {
    title: "Divider Installation",
    summary:
      "Dividers group and separate content within lists and page layouts. The divider is a thin rule, lightweight yet sufficient to distinguish content visually and spatially.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/divider/installation",
  },
  {
    title: "Divider SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/divider package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/divider/sassdoc",
  },
  {
    title: "Elevation Changelog",
    summary:
      "This is a re-write of the old Paper component as well as the paper styles. It has now been renamed to elevation to match the material design specs. This package no longer includes any styles by default and is a utility package instead.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/elevation/changelog",
  },
  {
    title: "Elevation Demos",
    summary:
      "Demos using the @react-md/elevation's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/elevation/demos",
    pathname: "/packages/elevation/demos",
  },
  {
    title: "Elevation Demo - All Elevations",
    summary:
      "At this time, the @react-md/elevation package is a bit different than the other packages since it only exports utility functions and does not generate any styles or expose any React components.",
    type: "demo",
    pageUrl: "/packages/elevation/demos#all-elevations-title",
    pathname: "/packages/elevation/demos#all-elevations-title",
  },
  {
    title: "Elevation Demo - Animating Elevation",
    summary:
      "This package also exports an additional mixins that might be useful:",
    type: "demo",
    pageUrl: "/packages/elevation/demos#animating-elevation-title",
    pathname: "/packages/elevation/demos#animating-elevation-title",
  },
  {
    title: "Elevation Installation",
    summary:
      "This is a small package for react-md that can create the elevation styles in the material design spec. Unlike the other react-md packages, this package only exports utility mixins and does not provide any React components or any default styles.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/elevation/installation",
  },
  {
    title: "Elevation SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/elevation package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/elevation/sassdoc",
  },
  {
    title: "ExpansionPanel API",
    summary: "The component API for the @react-md/expansion-panel package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/expansion-panel/api",
  },
  {
    title: "ExpansionPanel Changelog",
    summary:
      "This release has fixed the keyboard movement behavior for the expansion panels as well as updating the API to use a hook instead of React.cloneElement hacks. In addition, the ExpansionPanel will now no longer attempt to create equal width labels within each panel and instead will need to be done manually.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/expansion-panel/changelog",
  },
  {
    title: "ExpansionPanel Demos",
    summary:
      "Demos using the @react-md/expansion-panel's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/expansion-panel/demos",
    pathname: "/packages/expansion-panel/demos",
  },
  {
    title: "ExpansionPanel Demo - Simple Example",
    summary:
      "When using an expansion panel, you'll normally have a list of two or more in a list to dynamically show content as needed. Each ExpansionPanel requires:",
    type: "demo",
    pageUrl: "/packages/expansion-panel/demos#simple-example-title",
    pathname: "/packages/expansion-panel/demos#simple-example-title",
  },
  {
    title: "ExpansionPanel Demo - Configuring Use Panels Behavior",
    summary:
      "As shown in the first example, the default behavior of usePanels is to only allow one panel to be expanded at a time as well as not expanding any panels by default. Luckily, this is all configurable with different options available to this hook. Use the playground below to see what how the different configuration options work.",
    type: "demo",
    pageUrl:
      "/packages/expansion-panel/demos#configuring-use-panels-behavior-title",
    pathname:
      "/packages/expansion-panel/demos#configuring-use-panels-behavior-title",
  },
  {
    title: "ExpansionPanel Demo - Single Panel",
    summary:
      'An ExpansionPanel can also be used on its own as a "reveal" type of component. Depending on your preference, you can still use the usePanels hook with a count set to 1 to generate the props and state for you. Otherwise, you\'ll just need to provide the props on your own.',
    type: "demo",
    pageUrl: "/packages/expansion-panel/demos#single-panel-title",
    pathname: "/packages/expansion-panel/demos#single-panel-title",
  },
  {
    title: "ExpansionPanel Installation",
    summary:
      "Dividers group and separate content within lists and page layouts. The divider is a thin rule, lightweight yet sufficient to distinguish content visually and spatially.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/expansion-panel/installation",
  },
  {
    title: "ExpansionPanel SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/expansion-panel package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/expansion-panel/sassdoc",
  },
  {
    title: "Form API",
    summary: "The component API for the @react-md/form package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/form/api",
  },
  {
    title: "Form Changelog",
    summary:
      'Starting with v2 of react-md, all checkbox and radio inputs will now correctly work like native <input type="checkbox" /> and <input type="radio" /> without any additional wrappers.',
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/form/changelog",
  },
  {
    title: "Form Demos",
    summary:
      "Demos using the @react-md/form's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/form/demos",
    pathname: "/packages/form/demos",
  },
  {
    title: "Form Demo - Text Field Example",
    summary:
      'Text fields are a wrapper for the <input type="text" /> with some general themes and styles applied. There are four different themes available by default:',
    type: "demo",
    pageUrl: "/packages/form/demos#text-field-example-title",
    pathname: "/packages/form/demos#text-field-example-title",
  },
  {
    title: "Form Demo - Text Field Types",
    summary:
      "The TextField component also has some limited support for rendering as other text input tyes:",
    type: "demo",
    pageUrl: "/packages/form/demos#text-field-types-title",
    pathname: "/packages/form/demos#text-field-types-title",
  },
  {
    title: "Form Demo - Text Area Example",
    summary:
      "The TextArea component is a general wrapper for the <textarea> element with most of the same styles as the TextField. The TextArea will default to have a minimal starting height and animates as the user types. This behavior can be updated so that the transition for height changes is disabled and happens immediately. The default behavior is to allow the textarea to infinitely grow, but specific limits can be set by using the maxRows prop. The textarea will grow until the row limit and then allow native scrolling behavior within the textarea.",
    type: "demo",
    pageUrl: "/packages/form/demos#text-area-example-title",
    pathname: "/packages/form/demos#text-area-example-title",
  },
  {
    title: "Form Demo - File Input Example",
    summary:
      'A file input is just a simple wrapper of the <input type="file" /> that adds some default styles to look like a button. This means that all the themes available for a button are also available for this component. The file input has some reasonable defaults by showing a download file icon and a screen reader only accessible label of Upload. Unlike buttons, the file input is defaulted to render as an icon button with the primary theme color and the contained styles.',
    type: "demo",
    pageUrl: "/packages/form/demos#file-input-example-title",
    pathname: "/packages/form/demos#file-input-example-title",
  },
  {
    title: "Form Demo - Native Select Example",
    summary:
      "The NativeSelect component is a simple wrapper for the <select> element with TextField styles. Just like native <select> elements, this wrapper does not support:",
    type: "demo",
    pageUrl: "/packages/form/demos#native-select-example-title",
    pathname: "/packages/form/demos#native-select-example-title",
  },
  {
    title: "Form Demo - Select Example",
    summary:
      "The Select component is a custom widget that allows you to have additional styling controls for a native <select> element while still being accessible. This component inherits all the TextField styles just like the NativeSelect, but also allows each option to be rendered like a ListItem from the @react-md/list and @react-md/menu packages.",
    type: "demo",
    pageUrl: "/packages/form/demos#select-example-title",
    pathname: "/packages/form/demos#select-example-title",
  },
  {
    title: "Form Demo - Customizing Select Options",
    summary:
      "The default behavior for the Select component is to just render any number or string options as the children within the ListItem. Since it is sometimes helpful to be able to add additional information, styling, or icons with the options, an option can also be an object of props to pass to the ListItem instead.",
    type: "demo",
    pageUrl: "/packages/form/demos#customizing-select-options-title",
    pathname: "/packages/form/demos#customizing-select-options-title",
  },
  {
    title: "Form Demo - Checkbox and Radio Examples",
    summary:
      "Checkboxes and radios have been implemented to behave exactly like their native counterparts and add a slight animation when the selection state changes. Unlike v1 of react-md, all checkboxes and radios can be fully uncontrolled and will also reset correctly if a form reset button is clicked.",
    type: "demo",
    pageUrl: "/packages/form/demos#checkbox-and-radio-examples-title",
    pathname: "/packages/form/demos#checkbox-and-radio-examples-title",
  },
  {
    title: "Form Demo - Indeterminate Checkboxes",
    summary:
      "The Checkbox component also supports an indeterminate state to help indicate that it controls the checked state for other checkboxes as well. To use this feature:",
    type: "demo",
    pageUrl: "/packages/form/demos#indeterminate-checkboxes-title",
    pathname: "/packages/form/demos#indeterminate-checkboxes-title",
  },
  {
    title: "Form Demo - Custom Checkboxes",
    summary:
      "The Checkbox and Radio components use a little css trick with the ::before and ::after pseudo elements to animate the toggled states based on the\n:checked state. It is does this way so that each checkbox and radio can act like a native toggle input and not be fully controlled to swap out icons.",
    type: "demo",
    pageUrl: "/packages/form/demos#custom-checkboxes-title",
    pathname: "/packages/form/demos#custom-checkboxes-title",
  },
  {
    title: "Form Demo - Switch Examples",
    summary:
      "A switch is another version of the Checkbox component that allows the user to toggle between distinct on and off states. Just like a checkbox, the switch can be toggled with a spacebar press and trigger a form submit when the enter key is pressed.",
    type: "demo",
    pageUrl: "/packages/form/demos#switch-examples-title",
    pathname: "/packages/form/demos#switch-examples-title",
  },
  {
    title: "Form Demo - Async Switch Example",
    summary:
      "You can also use the AsyncSwitch component that will update the behavior of the Switch. When the loading prop is enabled, the Switch will gain a circular progress indicator and prevent the switch from being toggled again until the loading prop is set to false . This sort of switch is useful if you are trying to send an API request to update some behavior, but it fails due to some error.",
    type: "demo",
    pageUrl: "/packages/form/demos#async-switch-example-title",
    pathname: "/packages/form/demos#async-switch-example-title",
  },
  {
    title: "Form Demo - Simple Help and Error Messages",
    summary:
      "The form package also exports a FormMessage component to add custom help text, error text, and a counter to a form elements but generally used alongside TextField components. The FormMessage component is mostly an accessibility helper that will ensure that help text and/or error text will be correctly read to screen readers if the contents change.",
    type: "demo",
    pageUrl: "/packages/form/demos#simple-help-and-error-messages-title",
    pathname: "/packages/form/demos#simple-help-and-error-messages-title",
  },
  {
    title: "Form Demo - Example Form",
    summary:
      'This package also exports an extremely simple Form component that just prevents default behavior when it is submitted. This is super nice since the majority of the time you\'ll want to use ajax on form submit instead of the default behavior. Check out the example below for an extended usage of the Form component and some of the other components together to make a "New Contact" form.',
    type: "demo",
    pageUrl: "/packages/form/demos#example-form-title",
    pathname: "/packages/form/demos#example-form-title",
  },
  {
    title: "Form Installation",
    summary:
      "Create material design form elements with a lot of customization. This package exports the following form components:",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/form/installation",
  },
  {
    title: "Form SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/form package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/form/sassdoc",
  },
  {
    title: "Icon API",
    summary: "The component API for the @react-md/icon package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/icon/api",
  },
  {
    title: "Icon Changelog",
    summary:
      "This is a new component implementation for the\n.md-collapser/getCollapserStyles that existed in v1 but wasn't really documented",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/icon/changelog",
  },
  {
    title: "Icon Demos",
    summary:
      "Demos using the @react-md/icon's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/icon/demos",
    pathname: "/packages/icon/demos",
  },
  {
    title: "Icon Demo - Simple Examples",
    summary:
      "This package exports two different icon components so that you can create icons either from a font icon library or custom SVG paths. The example below also shows some force sizing props to help adjust the icon size when non-material icons font libraries don't have consistent sizes for their icons.",
    type: "demo",
    pageUrl: "/packages/icon/demos#simple-examples-title",
    pathname: "/packages/icon/demos#simple-examples-title",
  },
  {
    title: "Icon Demo - Icon Spacing",
    summary:
      "The TextIconSpacing component is extremely useful since it allows you to render an icon or any component separated by any text or another component with some spacing in-between. The main use case for this component will be within buttons, but it can be updated to be used in other components to add spacing between any two elements.",
    type: "demo",
    pageUrl: "/packages/icon/demos#icon-spacing-title",
    pathname: "/packages/icon/demos#icon-spacing-title",
  },
  {
    title: "Icon Demo - Overriding Default Icons",
    summary:
      'A lot of components within react-md end up using icons to help display supplementary data out of the box. The default implementation is to use the Material Icons font icon implementation to have a "nice" starting point to keep the react-md bundle size a bit smaller. Unfortunately, this might not be ideal for all applications and designs since you might want to use a different font icon library, use SVG icons from @react-md/material-icons, or use your own custom icons.',
    type: "demo",
    pageUrl: "/packages/icon/demos#overriding-default-icons-title",
    pathname: "/packages/icon/demos#overriding-default-icons-title",
  },
  {
    title: "Icon Installation",
    summary:
      "Create icons using a font-icon library like material-icons or font-awesome or plain old accessible SVG icons. There are also a few additional helpers to creating animating rotating icons and separating text from an icon.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/icon/installation",
  },
  {
    title: "Icon SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/icon package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/icon/sassdoc",
  },
  {
    title: "Layout API",
    summary: "The component API for the @react-md/layout package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/layout/api",
  },
  {
    title: "Layout Changelog",
    summary:
      "This package is kind of a replacement for the NavigationDrawer component that also now has a top-level Configuration provider for react-md.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/layout/changelog",
  },
  {
    title: "Layout Demos",
    summary:
      "Demos using the @react-md/layout's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/layout/demos",
    pathname: "/packages/layout/demos",
  },
  {
    title: "Layout Demo - Configurable Layout",
    summary:
      "The Layout component is used to structure the general layout within your app which can be configured for each app size breakpoint (see AppSizeListener for more information). A general layout has a fixed AppBar at the top of the page, a <main> element that contains your app's main content, a configurable navigation Tree, and a keyboard focusable only link that can skip everything in the AppBar and navigation Tree and focus the <main> content instead.",
    type: "demo",
    pageUrl: "/packages/layout/demos#configurable-layout-title",
    pathname: "/packages/layout/demos#configurable-layout-title",
  },
  {
    title: "Layout Installation",
    summary:
      "Create your app's layout and configure all of react-md in one place. There are eight different types of layouts supported that change automatically based on the window size and have reasonable defaults to get you started. The base layout will create a persistent navigation tree with a fixed header on desktop, while the navigation tree will be toggleable in a sliding sheet on mobile.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/layout/installation",
  },
  {
    title: "Layout SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/layout package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/layout/sassdoc",
  },
  {
    title: "Link API",
    summary: "The component API for the @react-md/link package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/link/api",
  },
  {
    title: "Link Changelog",
    summary:
      "There are no breaking changes for this release as this is the first time a link component has been introduced into react-md.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/link/changelog",
  },
  {
    title: "Link Demos",
    summary:
      "Demos using the @react-md/link's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/link/demos",
    pathname: "/packages/link/demos",
  },
  {
    title: "Link Demo - Simple Examples",
    summary:
      "The link component is fairly new for react-md and I'm still trying to figure out some reasonable defaults for it. You will most likely want to change the following scss variables for your app:",
    type: "demo",
    pageUrl: "/packages/link/demos#simple-examples-title",
    pathname: "/packages/link/demos#simple-examples-title",
  },
  {
    title: "Link Demo - Third Party Routing Libraries",
    summary:
      "You can also render the Link component using a third-party link/routing library. Popular examples are:",
    type: "demo",
    pageUrl: "/packages/link/demos#third-party-routing-libraries-title",
    pathname: "/packages/link/demos#third-party-routing-libraries-title",
  },
  {
    title: "Link Demo - Malicious Target",
    summary:
      'The Link component also has some built-in "security" around opening links with target="_blank". Whenever a link is updated to have target="_blank", it will automatically add a rel="noopener norefferer" attribute as well. You can check out this link for some more details about this risk.',
    type: "demo",
    pageUrl: "/packages/link/demos#malicious-target-title",
    pathname: "/packages/link/demos#malicious-target-title",
  },
  {
    title: "Link Demo - With Icons",
    summary:
      "The link can be used alongside icons as well if needed. For accessibility concerns, you'll need to either update the icon with different roles, or aria attributes.",
    type: "demo",
    pageUrl: "/packages/link/demos#with-icons-title",
    pathname: "/packages/link/demos#with-icons-title",
  },
  {
    title: "Link Demo - With Button Styles",
    summary:
      "Since there will be times where you'd like a link to have button styles, you can use the buttonThemeClassNames export from @reaact-md/button to style a link as a button.",
    type: "demo",
    pageUrl: "/packages/link/demos#with-button-styles-title",
    pathname: "/packages/link/demos#with-button-styles-title",
  },
  {
    title: "Link Installation",
    summary:
      "Create simple links from react-md with a customizable theme. The provided Link component can easily integrate with react-router,\n@reach/router, and theoretically any other routing library if needed.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/link/installation",
  },
  {
    title: "Link SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/link package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/link/sassdoc",
  },
  {
    title: "List API",
    summary: "The component API for the @react-md/list package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/list/api",
  },
  {
    title: "List Changelog",
    summary:
      "This package has a lot of changes from the v1 API that should hopefully make it easier to use. There are also new components to help with styling and positioning of addons that can be used without a ListItem/List component.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/list/changelog",
  },
  {
    title: "List Demos",
    summary:
      "Demos using the @react-md/list's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/list/demos",
    pathname: "/packages/list/demos",
  },
  {
    title: "List Demo - Single Line Examples",
    summary:
      "The most common usage of the @react-md/list package will be to create single line lists that are interactable. This can be accomplished using the List and ListItem components exported by this package. The ListItem component will create a keyboard focusable and clickable element that gains the different interaction states.",
    type: "demo",
    pageUrl: "/packages/list/demos#single-line-examples-title",
    pathname: "/packages/list/demos#single-line-examples-title",
  },
  {
    title: "List Demo - Two Line Examples",
    summary:
      "The ListItem also supports adding a second line of supplementary text using the secondaryText prop. The secondary text will be placed below the primary text within the item and gain the secondary text color to show some contrast. All the normal left and right addons can be used as well. Just like the primary text within a list item, the secondary text will be truncated once it reaches the overflow point.",
    type: "demo",
    pageUrl: "/packages/list/demos#two-line-examples-title",
    pathname: "/packages/list/demos#two-line-examples-title",
  },
  {
    title: "List Demo - Three Line Examples",
    summary:
      "List items can also be rendered as three lines of text: one line for primary text and two lines for secondary text. This can be enabled by enabling the threeLines prop which will modify the height and update the height for the secondaryText.",
    type: "demo",
    pageUrl: "/packages/list/demos#three-line-examples-title",
    pathname: "/packages/list/demos#three-line-examples-title",
  },
  {
    title: "List Demo - Non Interactable",
    summary:
      "You can also create non-interactable lists by using the SimpleListItem component even though this method is not recommended as using the default <ul> or <ol> elements along with <li> might be a bit easier due to some styling issues.",
    type: "demo",
    pageUrl: "/packages/list/demos#non-interactable-title",
    pathname: "/packages/list/demos#non-interactable-title",
  },
  {
    title: "List Installation",
    summary:
      "Create lists of content that can have optional supplementary icons, avatars, or images placed with the text.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/list/installation",
  },
  {
    title: "List SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/list package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/list/sassdoc",
  },
  {
    title: "MaterialIcons API",
    summary: "The component API for the @react-md/material-icons package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/material-icons/api",
  },
  {
    title: "MaterialIcons Changelog",
    summary:
      "This package is completely new for v2 and introduced the new 1864 icons (932 font icons and 932 svg icons).",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/material-icons/changelog",
  },
  {
    title: "MaterialIcons Demos",
    summary:
      "Demos using the @react-md/material-icons's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/material-icons/demos",
    pathname: "/packages/material-icons/demos",
  },
  {
    title: "MaterialIcons Demo - Simple Examples",
    summary:
      "All the current material icons are available with a FontIcon and SVGIcon suffix. If you're interested in how these icon components were generated, you can check out the generation script folder.",
    type: "demo",
    pageUrl: "/packages/material-icons/demos#simple-examples-title",
    pathname: "/packages/material-icons/demos#simple-examples-title",
  },
  {
    title: "MaterialIcons Demo - All Icons",
    summary:
      "There are around 933 unique icons provided by Material Icons, and\n@react-md/material-icons creates two React components per icon to support developers using font icons or svg icons. All the unique icons will be listed below along with their component's name minus the icon type suffix. To separate the two icons, the font icons will be suffixed with FontIcon while svg icons will be SVGIcon.",
    type: "demo",
    pageUrl: "/packages/material-icons/demos#all-icons-title",
    pathname: "/packages/material-icons/demos#all-icons-title",
  },
  {
    title: "MaterialIcons Installation",
    summary:
      "This package is just a simple wrapper for using material icons within react-md as either font icons or SVG icons. All of the icons were pulled directly from material-icons using the custom create cli. Please thank all the contributors and maintainers of material icons for the work they have put in.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/material-icons/installation",
  },
  {
    title: "Media API",
    summary: "The component API for the @react-md/media package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/media/api",
  },
  {
    title: "Media Changelog",
    summary:
      "The media package contains some helper components to help create responsive media like images and videos and optionally enforcing an aspect ratio.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/media/changelog",
  },
  {
    title: "Media Demos",
    summary:
      "Demos using the @react-md/media's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/media/demos",
    pathname: "/packages/media/demos",
  },
  {
    title: "Media Demo - Simple Responsive Media",
    summary:
      "The example below will show how you can use the MediaContainer component to create responsive images that are based on the current size of the MediaContainer's width. The MediaContainer will automatically make any:",
    type: "demo",
    pageUrl: "/packages/media/demos#simple-responsive-media-title",
    pathname: "/packages/media/demos#simple-responsive-media-title",
  },
  {
    title: "Media Demo - Forced Aspect Ratio",
    summary:
      "Sometimes it can be helpful to enforce a specific aspect ratio so that a general layout can be used even if images are different sizes. This is helpful when users can upload content without a specific resolution or when you have no control over the size of the content.",
    type: "demo",
    pageUrl: "/packages/media/demos#forced-aspect-ratio-title",
    pathname: "/packages/media/demos#forced-aspect-ratio-title",
  },
  {
    title: "Media Demo - With Overlay",
    summary:
      "This package also includes a component to overlay any responsive media item with an overlay that can contain text, buttons, icons, or any additional information related to your image.",
    type: "demo",
    pageUrl: "/packages/media/demos#with-overlay-title",
    pathname: "/packages/media/demos#with-overlay-title",
  },
  {
    title: "Media Installation",
    summary:
      "This package is used for adding responsive media within your page such as images and videos. Unlike other react-md packages, this package does not include a theme.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/media/installation",
  },
  {
    title: "Media SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/media package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/media/sassdoc",
  },
  {
    title: "Menu API",
    summary: "The component API for the @react-md/menu package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/menu/api",
  },
  {
    title: "Menu Changelog",
    summary:
      "The menu package was completely re-written to fix all the accessibility issues and keyboard focus behavior.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/menu/changelog",
  },
  {
    title: "Menu Demos",
    summary:
      "Demos using the @react-md/menu's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/menu/demos",
    pathname: "/packages/menu/demos",
  },
  {
    title: "Menu Demo - Simple Examples",
    summary:
      "Menus within react-md can be created using the DropdownMenu component which is a wrapper for the lower level components and should work for most of your use cases. The menu will handle the visibility of the menu and renders the button to show the menu, the menu itself, and all items within the menu.",
    type: "demo",
    pageUrl: "/packages/menu/demos#simple-examples-title",
    pathname: "/packages/menu/demos#simple-examples-title",
  },
  {
    title: "Menu Demo - Adding Event Handlers",
    summary: "You can add event handlers to items in multiple ways:",
    type: "demo",
    pageUrl: "/packages/menu/demos#adding-event-handlers-title",
    pathname: "/packages/menu/demos#adding-event-handlers-title",
  },
  {
    title: "Menu Demo - Menu Positioning",
    summary:
      "If you haven't noticed before, but the DropdownMenu component will automatically try to position itself within the viewport using the useFixedPositioning hook. The default behavior is to \"anchor\" itself to the top-right of the MenuButton and animate downwards. If there isn't enough room within the viewport to render the entire menu, it'll swap the horizontal and vertical positions as needed. There's a great write up on the useFixedPositioning example that goes into details about this positioning logic, so feel free to read up on it there.",
    type: "demo",
    pageUrl: "/packages/menu/demos#menu-positioning-title",
    pathname: "/packages/menu/demos#menu-positioning-title",
  },
  {
    title: "Menu Demo - Fixing Overflow Issues",
    summary:
      "After reading over a couple of the other examples, you might be wondering why all this work is going into positioning menus since this seems a bit overkill. If you've made a pop-out menu before, you'll know that you can pretty easily position two elements together with:",
    type: "demo",
    pageUrl: "/packages/menu/demos#fixing-overflow-issues-title",
    pathname: "/packages/menu/demos#fixing-overflow-issues-title",
  },
  {
    title: "Menu Demo - Accessibility Example",
    summary:
      "Menus within react-md are fully accessible for screen readers and keyboard users. The menu can be opened in a few different ways:",
    type: "demo",
    pageUrl: "/packages/menu/demos#accessibility-example-title",
    pathname: "/packages/menu/demos#accessibility-example-title",
  },
  {
    title: "Menu Demo - Simple Context Menu",
    summary:
      "Custom context menus can be created within react-md by using the useContextMenu hook along with the Menu component. The useContextMenu hook will maintain the same positioning logic so that it will attempt to render itself within the viewport and update its position to be relative to the pointer instead of the container element. It also returns the following ordered list:",
    type: "demo",
    pageUrl: "/packages/menu/demos#simple-context-menu-title",
    pathname: "/packages/menu/demos#simple-context-menu-title",
  },
  {
    title: "Menu Demo - Horizontal Menu",
    summary:
      "Menus can also be rendered horizontally by enabling the horizontal prop. This will automatically update the keyboard behavior so that the ArrowLeft and ArrowRight keys will be used to navigate the menu items instead of the ArrowUp and ArrowDown.",
    type: "demo",
    pageUrl: "/packages/menu/demos#horizontal-menu-title",
    pathname: "/packages/menu/demos#horizontal-menu-title",
  },
  {
    title: "Menu Demo - Nested Dropdown Menus",
    summary:
      "This package also supports creating nested menu items with the same accessibility features as a single level menu using the DropdownMenuItem component. These sorts of menus are really only used for complex desktop applications where everything can't be done in a single menu (like Google Docs).",
    type: "demo",
    pageUrl: "/packages/menu/demos#nested-dropdown-menus-title",
    pathname: "/packages/menu/demos#nested-dropdown-menus-title",
  },
  {
    title: "Menu Demo - Custom Renderers",
    summary:
      "It is possible to also use a custom renderer if you need more control over the menu or menu item generation using the menuRenderer and/or itemRenderer props. The menuRenderer will provide the base Menu props as the first argument as well as the items list as the second argument. The itemRenderer will provide the current item and the key to use for the item.",
    type: "demo",
    pageUrl: "/packages/menu/demos#custom-renderers-title",
    pathname: "/packages/menu/demos#custom-renderers-title",
  },
  {
    title: "Menu Installation",
    summary:
      "Create accessible dropdown menus that auto-position themselves to stay within the viewport. The menus are entirely navigable with a keyboard along with some additional behavior:",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/menu/installation",
  },
  {
    title: "Menu SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/menu package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/menu/sassdoc",
  },
  {
    title: "Overlay API",
    summary: "The component API for the @react-md/overlay package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/overlay/api",
  },
  {
    title: "Overlay Changelog",
    summary:
      "This package is kind of new for the v2 release since the Overlay was never actually a public component but the SCSS variables were public.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/overlay/changelog",
  },
  {
    title: "Overlay Demos",
    summary:
      "Demos using the @react-md/overlay's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/overlay/demos",
    pathname: "/packages/overlay/demos",
  },
  {
    title: "Overlay Demo - Simple Example",
    summary:
      "The Overlay is a simple component that normally will cover the entire screen while some other more prominent material (such as dialogs or drawers) are visible on the page to help the user know where their main focus should be. The Overlay will animate in and out based on the visible prop.",
    type: "demo",
    pageUrl: "/packages/overlay/demos#simple-example-title",
    pathname: "/packages/overlay/demos#simple-example-title",
  },
  {
    title: "Overlay Demo - Fixing Overflow Issues",
    summary:
      "If you attempt to render an overlay within a fixed element or a container that has overflow set to the non-default value, the overlay might be contained within that element and not cover the entire page. To work around this, the Overlay component has also been updated to work with the @react-md/portal component it can be portalled out of this container element and still cover the entire page.",
    type: "demo",
    pageUrl: "/packages/overlay/demos#fixing-overflow-issues-title",
    pathname: "/packages/overlay/demos#fixing-overflow-issues-title",
  },
  {
    title: "Overlay Demo - Custom Theme",
    summary:
      "The overlay is also themeable for the background-color and z-index values. To update these values, you can use the rmd-overlay-theme mixin.",
    type: "demo",
    pageUrl: "/packages/overlay/demos#custom-theme-title",
    pathname: "/packages/overlay/demos#custom-theme-title",
  },
  {
    title: "Overlay Installation",
    summary:
      "Create overlays within your app to help the user focus on a temporary material such as dialogs or drawers.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/overlay/installation",
  },
  {
    title: "Overlay SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/overlay package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/overlay/sassdoc",
  },
  {
    title: "Portal API",
    summary: "The component API for the @react-md/portal package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/portal/api",
  },
  {
    title: "Portal Changelog",
    summary:
      'This was a re-write of the Portal component that created a "more usable" API as well as removing temporary workarounds before the createPortal API was added into React.',
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/portal/changelog",
  },
  {
    title: "Portal Demos",
    summary:
      "Demos using the @react-md/portal's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/portal/demos",
    pathname: "/packages/portal/demos",
  },
  {
    title: "Portal Demo - Simple Example",
    summary:
      "A really good example for portals is the fixing overflow issues example in the overlay package. I'll add another example blow for using the portal, but the fix is really only valid on iOS devices.",
    type: "demo",
    pageUrl: "/packages/portal/demos#simple-example-title",
    pathname: "/packages/portal/demos#simple-example-title",
  },
  {
    title: "Portal Demo - Custom Portal Container",
    summary:
      "By default, the Portal will render as the last child in the document.body. You can provide either the into or intoId props to manually select where the children should be portalled to instead.",
    type: "demo",
    pageUrl: "/packages/portal/demos#custom-portal-container-title",
    pathname: "/packages/portal/demos#custom-portal-container-title",
  },
  {
    title: "Portal Installation",
    summary:
      "The Portal component is a simple wrapper with React's createPortal API that will automatically generate portal nodes behind the scenes as needed. Unlike the majority of react-md packages, this package does not export any styles.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/portal/installation",
  },
  {
    title: "Progress API",
    summary: "The component API for the @react-md/progress package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/progress/api",
  },
  {
    title: "Progress Changelog",
    summary:
      "The progress package probably went through the least amount of changes for the v2 release. The main changes involved were switching to <span>s instead of\n<div>s so they can be rendered within buttons and a few API changes to hopefully be easier to work with.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/progress/changelog",
  },
  {
    title: "Progress Demos",
    summary:
      "Demos using the @react-md/progress's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/progress/demos",
    pathname: "/packages/progress/demos",
  },
  {
    title: "Progress Demo - Simple Indeterminate Examples",
    summary:
      "The biggest use case for the progress components is to show a loading indicator while you are waiting for:",
    type: "demo",
    pageUrl: "/packages/progress/demos#simple-indeterminate-examples-title",
    pathname: "/packages/progress/demos#simple-indeterminate-examples-title",
  },
  {
    title: "Progress Demo - Simple Determinate Examples",
    summary:
      "Another use case for the progress components is to show the current progress for:",
    type: "demo",
    pageUrl: "/packages/progress/demos#simple-determinate-examples-title",
    pathname: "/packages/progress/demos#simple-determinate-examples-title",
  },
  {
    title: "Progress Demo - With Suspense",
    summary:
      "You can also use the progress components with the React.Suspense component as a fallback value while waiting for lazy-loaded child components are resolved.",
    type: "demo",
    pageUrl: "/packages/progress/demos#with-suspense-title",
    pathname: "/packages/progress/demos#with-suspense-title",
  },
  {
    title: "Progress Demo - Within Buttons",
    summary:
      "Since the progress bars are rendered using <span>s, you can also render them within buttons. They can be placed using the TextIconSpacing component or as an overlay. When using the CircularProgress within buttons, you'll want to update the size as well using the rmd-progress-theme-update-var mixin so that it can fit correctly within a button.",
    type: "demo",
    pageUrl: "/packages/progress/demos#within-buttons-title",
    pathname: "/packages/progress/demos#within-buttons-title",
  },
  {
    title: "Progress Installation",
    summary:
      "Create accessible horizontal or vertical progress bars or circular progress indicators that can either be deterministic or indeterministic.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/progress/installation",
  },
  {
    title: "Progress SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/progress package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/progress/sassdoc",
  },
  {
    title: "Sheet API",
    summary: "The component API for the @react-md/sheet package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/sheet/api",
  },
  {
    title: "Sheet Changelog",
    summary:
      "This package is the new version of the Drawer component from v1 that is no longer really used for layout and app size.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/sheet/changelog",
  },
  {
    title: "Sheet Demos",
    summary:
      "Demos using the @react-md/sheet's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/sheet/demos",
    pathname: "/packages/sheet/demos",
  },
  {
    title: "Sheet Demo - Position Examples",
    summary:
      'A Sheet is an extension of the Dialog component that allows you to create temporary elements at the edges of the viewport instead of centered within the page. Fixing a sheet to the left or right sides of the page is useful for creating permanent or temporary content such as navigation trees, additional configuration, or filters. The left and right behavior will automatically be updated when the language is set to dir="rtl" for you as well.',
    type: "demo",
    pageUrl: "/packages/sheet/demos#position-examples-title",
    pathname: "/packages/sheet/demos#position-examples-title",
  },
  {
    title: "Sheet Demo - Mobile Action Sheet",
    summary:
      "Since mobile devices have less real estate than larger screens, it can be hard to display dropdown menus in a nice way. Luckily, the @react-md/menu package supports a custom menuRenderer which can allow you to switch to an action sheet on mobile devices.",
    type: "demo",
    pageUrl: "/packages/sheet/demos#mobile-action-sheet-title",
    pathname: "/packages/sheet/demos#mobile-action-sheet-title",
  },
  {
    title: "Sheet Demo - Sheet Sizing",
    summary:
      "The Sheet updates it size based on whether it is fixed to the top/bottom or the left/right viewport edges. Just for clarity, the Sheet will call the top/bottom positions the verticalSize and the left/right positions the horizontalSize.",
    type: "demo",
    pageUrl: "/packages/sheet/demos#sheet-sizing-title",
    pathname: "/packages/sheet/demos#sheet-sizing-title",
  },
  {
    title: "Sheet Installation",
    summary:
      "A sheet is an extension of the Dialog component that allows for creating a fixed element that appears inline with other content fixed to the viewport borders. Sheets are great for:",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/sheet/installation",
  },
  {
    title: "Sheet SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/sheet package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/sheet/sassdoc",
  },
  {
    title: "States API",
    summary: "The component API for the @react-md/states package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/states/api",
  },
  {
    title: "States Changelog",
    summary:
      'This package is kind of new for the v2 release but the closest thing within v1 is the injectInk and "ink" effects. The ink effect has been renamed to a ripple effect and there are some other additional goodies included now.',
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/states/changelog",
  },
  {
    title: "States Demos",
    summary:
      "Demos using the @react-md/states's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/states/demos",
    pathname: "/packages/states/demos",
  },
  {
    title: "States Demo - Setup Example",
    summary:
      "The @react-md/states package will probably not be used much from a developer standpoint all the react-md components that are interactable will already hook into this API. You'll really only need to use this package for initial state configuration or if you want to make your own custom component since react-md is lacking a feature you need.",
    type: "demo",
    pageUrl: "/packages/states/demos#setup-example-title",
    pathname: "/packages/states/demos#setup-example-title",
  },
  {
    title: "States Demo - Disabling Ripple Effect",
    summary:
      "Since some designers or users do not like the ripple effect from material design, there is a fallback option to disable ripples and use normal background color changes instead as a simplified pressed states interaction. You can switch to this feature by either updating the StatesConfig to enable the disableRipple prop which will make all interactable elements from react-md no longer use the ripple effect or provide the disableRipple effect to each interactable element.",
    type: "demo",
    pageUrl: "/packages/states/demos#disabling-ripple-effect-title",
    pathname: "/packages/states/demos#disabling-ripple-effect-title",
  },
  {
    title: "States Demo - Custom Interactions",
    summary:
      "Since the default interactions might not cover 100% of the use cases, you can use some of the provided mixins to add more custom styles. This package exports the following useful mixins:",
    type: "demo",
    pageUrl: "/packages/states/demos#custom-interactions-title",
    pathname: "/packages/states/demos#custom-interactions-title",
  },
  {
    title: "States Demo - Custom Component",
    summary:
      "Since react-md might not have every component available for every single use case, @react-md/states also provides a React hook: useInteractionStates that allows you to add interaction states to any component. In order to use the hook, you will also need to ensure that your component has position: relative as well as using the rmd-states-surface mixin. The position: relative is so that the different states can be contained within your component and the rmd-states-surface mixin will create the ::before or ::after tag within your component so the different states can be applied.",
    type: "demo",
    pageUrl: "/packages/states/demos#custom-component-title",
    pathname: "/packages/states/demos#custom-component-title",
  },
  {
    title: "States Installation",
    summary:
      'This package is used to create different interaction states for when a user is touching, hovering, pressing, or keyboard focusing an element on the page. There are also some mixins and styles that allow you to apply styles only while the user is in "touch", "mouse", or "keyboard" mode so you can finally get that amazing keyboard focus only effect going on.',
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/states/installation",
  },
  {
    title: "States SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/states package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/states/sassdoc",
  },
  {
    title: "Table API",
    summary: "The component API for the @react-md/table package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/table/api",
  },
  {
    title: "Table Changelog",
    summary:
      "This release focused on updating the tables to be more customizable, easier to style, and better for accessibility with sticky cells. To create a table within v2, you'll have access to the following components:",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/table/changelog",
  },
  {
    title: "Table Demos",
    summary:
      "Demos using the @react-md/table's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/table/demos",
    pathname: "/packages/table/demos",
  },
  {
    title: "Table Demo - Default Styles",
    summary:
      "A Table within react-md will have some defaulted styles to match the material design specifications. The default styles are:",
    type: "demo",
    pageUrl: "/packages/table/demos#default-styles-title",
    pathname: "/packages/table/demos#default-styles-title",
  },
  {
    title: "Table Demo - Default Styles Configurable",
    summary:
      "Ok... I must admit that the example above was not super exciting but it helped set a baseline for what tables look like. To help with some additional styling, tables can be configured to:",
    type: "demo",
    pageUrl: "/packages/table/demos#default-styles-configurable-title",
    pathname: "/packages/table/demos#default-styles-configurable-title",
  },
  {
    title: "Table Demo - Selectable Rows",
    summary:
      "A common table pattern is to allow a user to select rows either by clicking on a checkbox for that row or to click anywhere in the row. Since react-md is attempting to be a low-level customizable component library, there isn't a super nice table wrapper component that does this for you, but it can be easily implemented by using the selected prop on the TableRow component, the TableCheckbox component, ans the useIndeterminateChecked hook from\n@react-md/form.",
    type: "demo",
    pageUrl: "/packages/table/demos#selectable-rows-title",
    pathname: "/packages/table/demos#selectable-rows-title",
  },
  {
    title: "Table Demo - Sortable Columns",
    summary:
      "Another common functionality found within tables is the ability to sort based on a column header. react-md does not provide a way to sort your data since there are multiple ways to sort a list of data, but it does provide an accessible way to render these sortable headers.",
    type: "demo",
    pageUrl: "/packages/table/demos#sortable-columns-title",
    pathname: "/packages/table/demos#sortable-columns-title",
  },
  {
    title: "Table Demo - Sticky Columns - Part 1",
    summary:
      "One of the most useful things that can be applied to large tables is to apply sticky headers so that the user can still view what a column type is while they scroll through a large data set. react-md has implemented this functionality with the position: sticky implementation and should work for all your use-cases if you don't need to support IE11 (which isn't a supported browser for this library anyways). If you aren't familiar with the sticky position behavior, it's recommended to read over the sticky positioning documentation on the Mozilla Developer site but I'll also provide a quick summary next.",
    type: "demo",
    pageUrl: "/packages/table/demos#sticky-columns-part-1-title",
    pathname: "/packages/table/demos#sticky-columns-part-1-title",
  },
  {
    title: "Table Demo - Sticky Columns - Part 2",
    summary:
      "Since it might not always be desired to use a scroll container for the sticky columns, it's also possible to use the entire viewport and document instead. The only difference between this example and the example above is that the Table component will no longer be wrapped in the TableContainer component so the scroll behavior is inherited from the entire document as well as updating the top value for the fixed headers.",
    type: "demo",
    pageUrl: "/packages/table/demos#sticky-columns-part-2-title",
    pathname: "/packages/table/demos#sticky-columns-part-2-title",
  },
  {
    title: "Table Demo - Sticky Columns - Part 3",
    summary:
      "It is also possible to create sticky footers within react-md by enabling the sticky prop on the TableFooter. That being said, sticky cells within the TableFooter are normally different than sticky headers since the normal pattern for a footer is to span the entire width of the table. If that is not the case, you can follow the same pattern as the TableHeader for a sticky footer.",
    type: "demo",
    pageUrl: "/packages/table/demos#sticky-columns-part-3-title",
    pathname: "/packages/table/demos#sticky-columns-part-3-title",
  },
  {
    title: "Table Demo - Sticky Columns - Part 4",
    summary:
      "Now that you've seen sticky headers and footers, lets add the final peace of allowing sticky cells within the TableBody. To create a sticky TableCell within the TableBody there is no convenience API on the parent TableBody or even TableRow components and must enable the sticky prop on each cell that should be sticky. This is because you'll normally only have one cell that is sticky per row that will be left aligned (or right aligned in RTL languages) instead of making the entire row sticky.",
    type: "demo",
    pageUrl: "/packages/table/demos#sticky-columns-part-4-title",
    pathname: "/packages/table/demos#sticky-columns-part-4-title",
  },
  {
    title: "Table Installation",
    summary:
      "Create simple tables or complex data tables and grids using the provided low-level components. You can also try using the DataTable renderer which will extract some of the boilerplate out of the way for you.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/table/installation",
  },
  {
    title: "Table SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/table package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/table/sassdoc",
  },
  {
    title: "Tabs API",
    summary: "The component API for the @react-md/tabs package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/tabs/api",
  },
  {
    title: "Tabs Changelog",
    summary:
      "Tabs were completely re-written for the v2 release to help fix the missing accessibility issues from v1. The API was changed a lot to hopefully make working with tabs a bit easier by no longer doing weird things under the hood like cloning props into each tab and content.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/tabs/changelog",
  },
  {
    title: "Tabs Demos",
    summary:
      "Demos using the @react-md/tabs's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/tabs/demos",
    pathname: "/packages/tabs/demos",
  },
  {
    title: "Tabs Demo - Basic Usage",
    summary:
      "As stated above, you'll want to use the TabsManager, Tabs, TabPanels, and TabPanel components to render your general tab layout. For each tab within the tabs list, you'll need to have a matching TabPanel in the TabsPanel component.",
    type: "demo",
    pageUrl: "/packages/tabs/demos#basic-usage-title",
    pathname: "/packages/tabs/demos#basic-usage-title",
  },
  {
    title: "Tabs Demo - Simple Two Page Tab",
    summary:
      "Even though you'll normally use the tab components together, you don't actually need to use them all within the same component. You can move the Tabs into a custom header with the AppBar or even move the content into separate components to render complex data. The only requirement still is that the TabPanels must only have children of TabPanel.",
    type: "demo",
    pageUrl: "/packages/tabs/demos#simple-two-page-tab-title",
    pathname: "/packages/tabs/demos#simple-two-page-tab-title",
  },
  {
    title: "Tabs Demo - Persistent Tabs",
    summary:
      "One of the downsides about the default behavior for tabs is that when a tab is not currently active, it will be removed from the DOM. This means that if your component fetches data or has local state, it will be reset once the tab becomes inactive. This means that if you want to maintain state between the tabs, you'll need to move the state up above the TabPanels component and pass it down to your panels instead.",
    type: "demo",
    pageUrl: "/packages/tabs/demos#persistent-tabs-title",
    pathname: "/packages/tabs/demos#persistent-tabs-title",
  },
  {
    title: "Tabs Demo - Configurable Tabs",
    summary:
      "Unlike most of the components within react-md, tabs actually done have their own theme. This is really because tabs are generally rendered in AppBars or inline with other content on the page. If you want to apply your own theme, it's as simple as adding a background-color and optionally updating the indicator's background color of the primary theme color is not visible on the new background.",
    type: "demo",
    pageUrl: "/packages/tabs/demos#configurable-tabs-title",
    pathname: "/packages/tabs/demos#configurable-tabs-title",
  },
  {
    title: "Tabs Demo - Swipeable Tabs",
    summary:
      "Creating swipeable tabs are not build into the library at this point since swipe behavior is pretty opinionated and hard to add a reasonable default. That being said, you can use a library like react-swipeable along with the @react-md/tabs package to get your desired swipe behavior.",
    type: "demo",
    pageUrl: "/packages/tabs/demos#swipeable-tabs-title",
    pathname: "/packages/tabs/demos#swipeable-tabs-title",
  },
  {
    title: "Tabs Installation",
    summary:
      "Create an accessible tabs component that allows you to dynamically switch between different views.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/tabs/installation",
  },
  {
    title: "Tabs SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/tabs package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/tabs/sassdoc",
  },
  {
    title: "Theme Changelog",
    summary:
      "This package is new for the v2 release, but replaces and expands upon the existing theming and color system in v1. Starting with v2, the theme has built-in support for automatically attempting to fix color contrast ratios.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/theme/changelog",
  },
  {
    title: "Theme Demos",
    summary:
      "Demos using the @react-md/theme's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/theme/demos",
    pathname: "/packages/theme/demos",
  },
  {
    title: "Theme Demo - Simple Example",
    summary:
      "This example will show how you can use the provided mixins to update the theme for some custom components. The @react-md/theme package exports some useful Sass functions and mixins for using and modifying your theme:",
    type: "demo",
    pageUrl: "/packages/theme/demos#simple-example-title",
    pathname: "/packages/theme/demos#simple-example-title",
  },
  {
    title: "Theme Installation",
    summary:
      "This package is used for creating a color theme within react-md. It also exposes some utility Components and mixins for updating the theme at runtime through CSS Variables.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/theme/installation",
  },
  {
    title: "Theme SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/theme package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/theme/sassdoc",
  },
  {
    title: "Tooltip API",
    summary: "The component API for the @react-md/tooltip package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/tooltip/api",
  },
  {
    title: "Tooltip Changelog",
    summary:
      'Tooltips were completely re-written for the v2 release to help fix the missing accessibility issues from v1. One of the most "exciting" things that was added during the re-write is that tooltips will now automatically determine the "best" location to render itself within the viewport instead of manually needing to change the position yourself! Woo hoo!',
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/tooltip/changelog",
  },
  {
    title: "Tooltip Demos",
    summary:
      "Demos using the @react-md/tooltip's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/tooltip/demos",
    pathname: "/packages/tooltip/demos",
  },
  {
    title: "Tooltip Demo - Simple Examples",
    summary:
      "Tooltips are used to help add additional information to users when an element is hovered, keyboard focused, or long-touched and are generally used alongside icon buttons. The tooltips within react-md have been developed to follow the tooltip role even though it is still a work in progress. This means that the id prop will be required for the tooltip's container element as well as the tooltip so that an aria-describedby attribute can be correctly applied.",
    type: "demo",
    pageUrl: "/packages/tooltip/demos#simple-examples-title",
    pathname: "/packages/tooltip/demos#simple-examples-title",
  },
  {
    title: "Tooltip Demo - Auto Positioning Tooltips",
    summary:
      "When using a tooltip, you can set the position manually by providing a position prop. One of the downsides to this is that if the container element is near the edge of the viewport and the tooltip is too big, the tooltip will not fit in the page! This is where auto positioning tooltips come in.",
    type: "demo",
    pageUrl: "/packages/tooltip/demos#auto-positioning-tooltips-title",
    pathname: "/packages/tooltip/demos#auto-positioning-tooltips-title",
  },
  {
    title: "Tooltip Demo - Dense Tooltips",
    summary:
      "Tooltips can also use a dense spec which will shrink the amount of padding and the font-size. This is actually enabled for the entire documentation site by default, but it can be used in two different ways:",
    type: "demo",
    pageUrl: "/packages/tooltip/demos#dense-tooltips-title",
    pathname: "/packages/tooltip/demos#dense-tooltips-title",
  },
  {
    title: "Tooltip Demo - Large Tooltips",
    summary:
      "Tooltips will automatically have a max-width applied to them of 15rem by default. This value can always be updated by changing the\n$rmd-tooltip-max-width value or using the rmd-tooltip-update-var mixin.",
    type: "demo",
    pageUrl: "/packages/tooltip/demos#large-tooltips-title",
    pathname: "/packages/tooltip/demos#large-tooltips-title",
  },
  {
    title: "Tooltip Demo - Hover Mode",
    summary:
      'Tooltips can also be updated to have a "hover mode" so that subsequent tooltips are shown immediately instead of requiring the default delay. After no tooltips have been shown via mouse for a few seconds, the "hover mode" will be disabled and the initial hover delay will be used again. This feature is actually enabled throughout the app but disabled for these demos to help show the default tooltip behavior.',
    type: "demo",
    pageUrl: "/packages/tooltip/demos#hover-mode-title",
    pathname: "/packages/tooltip/demos#hover-mode-title",
  },
  {
    title: "Tooltip Demo - Common Patterns",
    summary:
      "Since tooltips are normally used with buttons, you will probably want to create a new Button component in your app that will automatically apply a tooltip if the tooltip prop is provided. Check out the example below with TooltippedButton component. You can apply this pattern to any other common component in your app to have tooltips when needed.",
    type: "demo",
    pageUrl: "/packages/tooltip/demos#common-patterns-title",
    pathname: "/packages/tooltip/demos#common-patterns-title",
  },
  {
    title: "Tooltip Demo - Advanced API and Gotchas",
    summary:
      "All the examples above might have seen like \"magic\" for how the tooltip events are added to the child component. The way the tooltip works is that it clones the child element and injects the required accessibility props and event handlers into it for convenience. This means that if your component doesn't accept the required event handlers and pass it down to a DOM node or the DOM node is not focusable, the tooltip won't work!",
    type: "demo",
    pageUrl: "/packages/tooltip/demos#advanced-api-and-gotchas-title",
    pathname: "/packages/tooltip/demos#advanced-api-and-gotchas-title",
  },
  {
    title: "Tooltip Installation",
    summary:
      "Create accessible tooltips to add additional descriptions to buttons, links, or any other element. The tooltips will automatically attempt to position themselves within the viewport and adjust as needed.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/tooltip/installation",
  },
  {
    title: "Tooltip SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/tooltip package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/tooltip/sassdoc",
  },
  {
    title: "Transition API",
    summary: "The component API for the @react-md/transition package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/transition/api",
  },
  {
    title: "Transition Changelog",
    summary:
      "Every transition was re-written in this release so it is a pretty big breaking change. The main differences are upgrading to transition API as well as shortening most of the transitions throughout react-md.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/transition/changelog",
  },
  {
    title: "Transition Demos",
    summary:
      "Demos using the @react-md/transition's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/transition/demos",
    pathname: "/packages/transition/demos",
  },
  {
    title: "Transition Demo - Cross Fade Examples",
    summary:
      "The CrossFade component is great to use for full page transitions such as route changes or animating new parts of the page into view since the transition is triggered when it is mounted. A general recommendation for using this component is to mount it near the root of your main layout surrounding the main content and set the key to be the current pathname.",
    type: "demo",
    pageUrl: "/packages/transition/demos#cross-fade-examples-title",
    pathname: "/packages/transition/demos#cross-fade-examples-title",
  },
  {
    title: "Transition Demo - Cross Fade Hook Example",
    summary:
      "One of the downsides to the CrossFade component is that the transition is triggered once the component mounts which means the only way to trigger new animations is by changing the key for this component. Since it isn't always ideal to have to re-mount the child component to trigger the transition, this package also exports a useCrossFade hook to implement this transition.",
    type: "demo",
    pageUrl: "/packages/transition/demos#cross-fade-hook-example-title",
    pathname: "/packages/transition/demos#cross-fade-hook-example-title",
  },
  {
    title: "Transition Demo - Simple Collapse Example",
    summary:
      "The Collapse component is used to transition a child element in and out of view by animating it's max-height. This means that the child must either be an HTMLElement or a component that forwards the ref to an HTMLElement and applies the style, className, and hidden props to an HTMLElement.",
    type: "demo",
    pageUrl: "/packages/transition/demos#simple-collapse-example-title",
    pathname: "/packages/transition/demos#simple-collapse-example-title",
  },
  {
    title: "Transition Demo - Configurable Collapse Example",
    summary:
      "The collapse transition can also be configured with a couple of options:",
    type: "demo",
    pageUrl: "/packages/transition/demos#configurable-collapse-example-title",
    pathname: "/packages/transition/demos#configurable-collapse-example-title",
  },
  {
    title: "Transition Demo - Scale Transition Example",
    summary:
      "Another built-in transition is a simple scale transition that can either be",
    type: "demo",
    pageUrl: "/packages/transition/demos#scale-transition-example-title",
    pathname: "/packages/transition/demos#scale-transition-example-title",
  },
  {
    title: "Transition Demo - Use CSS Transition",
    summary:
      "If none of the existing components above match your use-case, you can try out the useCSSTransition hook which is basically a hook version of the CSSTransition component from react-transition-group. The only real difference between the react-transition-group is how the styles get applied and that using a string classNames will use BEM as the naming convention.",
    type: "demo",
    pageUrl: "/packages/transition/demos#use-css-transition-title",
    pathname: "/packages/transition/demos#use-css-transition-title",
  },
  {
    title: "Transition Demo - Fixed Positioning Example",
    summary:
      "This package also exports a pretty awesome hook: useFixedPositioning that ties in directly with the react-transition-group API so that you can position a fixed element to another element within the page ensuring that it can fit within the viewport. Some great existing examples of this component are the @react-md/menu and\n@react-md/tooltip packages since they use this hook behind the scenes position themselves automatically.",
    type: "demo",
    pageUrl: "/packages/transition/demos#fixed-positioning-example-title",
    pathname: "/packages/transition/demos#fixed-positioning-example-title",
  },
  {
    title: "Transition Installation",
    summary:
      "Create simple CSS transitions using the provided transition hooks and components utilizing the default transition timing functions. This package also provides a collapse transition, scaling transition, vertical only scaling transition, and a new page transition named cross fade.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/transition/installation",
  },
  {
    title: "Transition SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/transition package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/transition/sassdoc",
  },
  {
    title: "Tree API",
    summary: "The component API for the @react-md/tree package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/tree/api",
  },
  {
    title: "Tree Changelog",
    summary:
      "The tree package is completely new for the v2 release with the closest counterpart being the nestedItems from the ListItem component from v1. This package creates an accessible tree widget with selection, expansion, and keyboard functionality with the provided components and hooks.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/tree/changelog",
  },
  {
    title: "Tree Demos",
    summary:
      "Demos using the @react-md/tree's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/tree/demos",
    pathname: "/packages/tree/demos",
  },
  {
    title: "Tree Demo - Single Select Tree",
    summary:
      "One of the most common forms of a tree is a single selection tree that only allows one item to be selected at a time. This example will render a very simple folder tree and show how items are linked together and rendered within the tree along with an example of using the useTreeItemSelection and useTreeItemExpansion hooks.",
    type: "demo",
    pageUrl: "/packages/tree/demos#single-select-tree-title",
    pathname: "/packages/tree/demos#single-select-tree-title",
  },
  {
    title: "Tree Demo - Multi Select Tree",
    summary:
      "To create a multi-selectable tree, all that is required is to enable the multiSelect argument on the useTreeItemSelection hook. Now multi tree items will be selectable and the additional keyboard shortcuts for selecting items will be enabled.",
    type: "demo",
    pageUrl: "/packages/tree/demos#multi-select-tree-title",
    pathname: "/packages/tree/demos#multi-select-tree-title",
  },
  {
    title: "Tree Demo - Customizing Tree Items",
    summary:
      "Now that you've learned a bit about how to use the Tree component to render simple trees, let's look at how we can customize how each item is rendered with the getItemProps prop on the Tree.",
    type: "demo",
    pageUrl: "/packages/tree/demos#customizing-tree-items-title",
    pathname: "/packages/tree/demos#customizing-tree-items-title",
  },
  {
    title: "Tree Installation",
    summary:
      "Create accessible tree widgets following the tree view specifications using the material design styles and fairly customizable renderers and styles and reasonable defaults.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/tree/installation",
  },
  {
    title: "Tree SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/tree package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/tree/sassdoc",
  },
  {
    title: "Typography API",
    summary: "The component API for the @react-md/typography package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/typography/api",
  },
  {
    title: "Typography Changelog",
    summary:
      "The typography package is kind of new for the v2 release since there weren't any components beforehand for typography. This package exports three components: Text, TextContainer, and SrOnly. The Text component can be used to render any of the typography styles. The TextContainer component is used to create a centered block of text that uses the recommended line-width for legibility on different device sizes. Finally, the SrOnly component allows for text to only be visible to screen readers.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/typography/changelog",
  },
  {
    title: "Typography Demos",
    summary:
      "Demos using the @react-md/typography's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/typography/demos",
    pathname: "/packages/typography/demos",
  },
  {
    title: "Typography Demo - Text Examples",
    summary:
      "There are 13 different typography styles provided by react-md and the material design specifications. You can use the Text component exported from this package to apply a specific style or use the rmd-typoraphy mixin within SCSS files.",
    type: "demo",
    pageUrl: "/packages/typography/demos#text-examples-title",
    pathname: "/packages/typography/demos#text-examples-title",
  },
  {
    title: "Typography Demo - Text Container Examples",
    summary:
      "The TextContainer is a simple component that can be used to center and apply a max-width to children content (normally text). The line width can be configured with the $rmd-typography-mobile-max-line-length,\n$rmd-typography-desktop-max-line-width,\n$rmd-typography-text-container-breakpoint SCSS variables.",
    type: "demo",
    pageUrl: "/packages/typography/demos#text-container-examples-title",
    pathname: "/packages/typography/demos#text-container-examples-title",
  },
  {
    title: "Typography Installation",
    summary:
      "This package is used to include typography into your application. There are 13 different font styles included with reasonable defaults, but they can also easily be updated with custom values.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/typography/installation",
  },
  {
    title: "Typography SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/typography package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/typography/sassdoc",
  },
  {
    title: "Utils API",
    summary: "The component API for the @react-md/utils package.",
    type: "api",
    pageUrl: "/packages/[id]/api",
    pathname: "/packages/utils/api",
  },
  {
    title: "Utils Changelog",
    summary:
      "This package is pretty new for react-md, but might be seen as a replacement for the old grid, helpers, and utils.",
    type: "changelog",
    pageUrl: "/packages/[id]/changelog",
    pathname: "/packages/utils/changelog",
  },
  {
    title: "Utils Demos",
    summary:
      "Demos using the @react-md/utils's exported components, hooks, and utils.",
    type: "demos",
    pageUrl: "/packages/utils/demos",
    pathname: "/packages/utils/demos",
  },
  {
    title: "Utils Demo - App Size Listener Example",
    summary:
      "The AppSizeListener component is used to determine the current application size based on media queries. You normally want to add this component near the root of your app and then use the useAppSize hook to determine the current app size within child components.",
    type: "demo",
    pageUrl: "/packages/utils/demos#app-size-listener-example-title",
    pathname: "/packages/utils/demos#app-size-listener-example-title",
  },
  {
    title: "Utils Demo - Media Query Components",
    summary:
      "This package also exports some helper components that allow you to render specific parts only when the AppSize matches specific devices. Since I want to try to keep the app size minimal, the default helper components are:",
    type: "demo",
    pageUrl: "/packages/utils/demos#media-query-components-title",
    pathname: "/packages/utils/demos#media-query-components-title",
  },
  {
    title: "Utils Demo - Resize Listener Example",
    summary:
      "This package also exports a ResizeListener component that will listen to entire window resize events while mounted. The resize event callback will be throttled for extra performance as well as delegating the event using the\n@react-md/utils delegateEvent helper. This is extremely useful when you need to track specific pixel updates instead of breakpoint changes.",
    type: "demo",
    pageUrl: "/packages/utils/demos#resize-listener-example-title",
    pathname: "/packages/utils/demos#resize-listener-example-title",
  },
  {
    title: "Utils Demo - Resize Observer Example",
    summary:
      "The ResizeObserver is useful when you want to watch a specific element resizing when it can't be handled just by an entire page resize listener.",
    type: "demo",
    pageUrl: "/packages/utils/demos#resize-observer-example-title",
    pathname: "/packages/utils/demos#resize-observer-example-title",
  },
  {
    title: "Utils Demo - Material Grid Example",
    summary:
      "The grid system in material design is a bit confusing if you are coming from another CSS grid system like the bootstrap grid system since the number of columns changes depending on the viewport size. The grid system will have:",
    type: "demo",
    pageUrl: "/packages/utils/demos#material-grid-example-title",
    pathname: "/packages/utils/demos#material-grid-example-title",
  },
  {
    title: "Utils Demo - Simple Grid List",
    summary:
      "Most grid systems define a static number of columns that should appear on each row and have each cell have a percentage width based on how many columns they should span. One of the most well-known ones is the bootstrap grid system that defines a 12 column grid system. This is nice for a lot of cases, but it is a bit restrictive since you'll need to test every single viewport width to ensure that each cell shows up nicely and add additional breakpoints to increase cell width as needed. What if you just want to say:",
    type: "demo",
    pageUrl: "/packages/utils/demos#simple-grid-list-title",
    pathname: "/packages/utils/demos#simple-grid-list-title",
  },
  {
    title: "Utils Installation",
    summary:
      "This package is for providing reusable accessibility hooks, components, and utilities, a base css reset and other utility mixins, as well as general layout and app size components and hooks. This package will be used by every other scoped package within react-md, and has an extremely useful mixin for only generating styles for packages that have been installed.",
    type: "guide",
    pageUrl: "/packages/[id]/installation",
    pathname: "/packages/utils/installation",
  },
  {
    title: "Utils SassDoc",
    summary:
      "Documentation for all the SCSS variables, functions, and mixins for the @react-md/utils package.",
    type: "sassdoc",
    pageUrl: "/packages/[id]/sassdoc",
    pathname: "/packages/utils/sassdoc",
  },
];

export default metadata;
