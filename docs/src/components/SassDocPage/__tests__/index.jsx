/* eslint-disable max-len */
/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';
import { mount } from 'enzyme';
import { PureSassDocPage } from '../';

const TYPOGRAPHY_SASSDOC = {
  functions: [{
    code: "@function get-font-suffix($font-weight) {\n  $font-weights: (\n    $md-font-light: '-Light',\n    $md-font-regular: '-Regular',\n    $md-font-medium: '-Medium',\n    $md-font-bold: '-Bold',\n  );\n\n  $suffix: map-get($font-weights, $font-weight);\n  @if not $suffix {\n    @warn \"The given font weight '#{$font-weight}' is not one of the four material design weights.\";\n  }\n\n  @return $suffix;\n}",
    description: 'Converts a font weight into the google font suffix.\n\n',
    name: 'get-font-suffix',
    oneLineCode: '@function get-font-suffix($font-weight) { \u2026 }',
    path: 'https://github.com/mlaursen/react-md/blob/release/1.1.x/src/scss/_typography.scss',
    requires: [
      {
        name: 'md-font-light',
        ref: '/customization/typography?tab=1#variable-md-font-light',
        type: 'Variable',
      },
      {
        name: 'md-font-regular',
        ref: '/customization/typography?tab=1#variable-md-font-regular',
        type: 'Variable',
      },
      {
        name: 'md-font-medium',
        ref: '/customization/typography?tab=1#variable-md-font-medium',
        type: 'Variable',
      },
      {
        name: 'md-font-bold',
        ref: '/customization/typography?tab=1#variable-md-font-bold',
        type: 'Variable',
      },
    ],
    returns: {
      description: 'the font suffix',
      type: 'String',
    },
    see: [],
    type: 'function',
    usedBy: [
      {
        name: 'host-google-font',
        ref: '/customization/typography?tab=1#mixin-host-google-font',
        type: 'Mixin',
      },
    ],
  }],
  mixins: [{
    code: "@mixin react-md-typography($light-theme: $md-light-theme, $include-media: $md-media-included, $extend-html-tags: $md-typography-extended, $include-text-container: $md-typography-include-text-container, $include-utilities: $md-typography-include-utilities) {\n  $md-text-color: get-color('text', $light-theme);\n  $md-secondary-text-color: get-color('secondary', $light-theme);\n  $md-hint-text-color: get-color('hint', $light-theme);\n  $md-disabled-text-color: get-color('disabled', $light-theme);\n\n  @if $include-media {\n    @include react-md-typography-media($extend-html-tags);\n  }\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n    // scss-lint:disable ColorVariable\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    transition-timing-function: $md-transition-standard;\n  }\n\n  html {\n    background: if($light-theme, $md-light-theme-background-color, $md-dark-theme-background-color);\n    font-size: #{$md-font-size-base}px;\n    min-width: $md-html-min-width;\n  }\n\n  body {\n    font-family: $md-font-family;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-weight: $md-font-regular;\n    line-height: $md-line-height;\n    text-rendering: optimizeLegibility;\n  }\n\n  %md-headline,\n  %md-title,\n  %md-subheading-2,\n  %md-subheading-1,\n  %md-body-2,\n  %md-body-1 {\n    color: $md-text-color;\n  }\n\n  %md-display-4,\n  %md-display-3,\n  %md-display-2,\n  %md-display-1,\n  %md-caption {\n    color: $md-secondary-text-color;\n  }\n\n  @if $extend-html-tags {\n    h1,\n    h2,\n    h3,\n    h4,\n    h5,\n    h6,\n    p,\n    button,\n    input,\n    textarea,\n    html {\n      font-family: $md-font-family;\n    }\n\n    h1 {\n      @extend %md-display-1;\n    }\n\n    h2 {\n      @extend %md-headline;\n    }\n\n    h3 {\n      @extend %md-title;\n    }\n\n    h4 {\n      @extend %md-subheading-2;\n    }\n\n    h5 {\n      @extend %md-subheading-1;\n    }\n\n    h6 {\n      @extend %md-body-2;\n    }\n\n    p {\n      @extend %md-body-1;\n    }\n\n    caption {\n      @extend %md-caption;\n    }\n  }\n\n  .md-display-1 {\n    @extend %md-display-1;\n  }\n\n  .md-display-2 {\n    @extend %md-display-2;\n  }\n\n  .md-display-3 {\n    @extend %md-display-3;\n  }\n\n  .md-display-4 {\n    @extend %md-display-4;\n  }\n\n  .md-headline {\n    @extend %md-headline;\n  }\n\n  .md-title {\n    @extend %md-title;\n  }\n\n  .md-subheading-1 {\n    @extend %md-subheading-1;\n  }\n\n  .md-subheading-2 {\n    @extend %md-subheading-2;\n  }\n\n  .md-body-1 {\n    @extend %md-body-1;\n  }\n\n  .md-body-2 {\n    @extend %md-body-2;\n  }\n\n  .md-caption {\n    @extend %md-caption;\n  }\n\n  @if $include-utilities {\n    @include react-md-typography-utilities;\n  }\n\n  @if $include-text-container {\n    @include react-md-typography-text-container;\n  }\n}",
    description: 'This includes the css for simple typography in react-md. It will\nupdate all items to use `box-sizing: border-box`, set the font\nfamily, set the line-height, text-rendering, and create the base\nclass names for the typography. If the `$extend-html-tags` is true,\nthe `h1` - `h6`, `p`, and `caption` tags will be updated with the\ncorresponding css class name.\n\n',
    name: 'react-md-typography',
    oneLineCode: '@mixin react-md-typography($light-theme: $md-light-theme, $include-media: $md-media-included, $extend-html-tags: $md-typography-extended, $include-text-container: $md-typography-include-text-container, $include-utilities: $md-typography-include-utilities) { \u2026 }',
    path: 'https://github.com/mlaursen/react-md/blob/release/1.1.x/src/scss/_typography.scss',
    requires: [
      {
        name: 'react-md-typography-media',
        ref: '/customization/typography?tab=1#mixin-react-md-typography-media',
        type: 'Mixin',
      },
      {
        name: 'react-md-typography-utilities',
        ref: '/customization/typography?tab=1#mixin-react-md-typography-utilities',
        type: 'Mixin',
      },
      {
        name: 'react-md-typography-text-container',
        ref: '/customization/typography?tab=1#mixin-react-md-typography-text-container',
        type: 'Mixin',
      },
      {
        name: 'get-color',
        ref: '/customization/colors?tab=1#function-get-color',
        type: 'Function',
      },
      {
        name: 'md-display-1',
        ref: '/customization/typography?tab=1#placeholder-md-display-1',
        type: 'Placeholder',
      },
      {
        name: 'md-headline',
        ref: '/customization/typography?tab=1#placeholder-md-headline',
        type: 'Placeholder',
      },
      {
        name: 'md-title',
        ref: '/customization/typography?tab=1#placeholder-md-title',
        type: 'Placeholder',
      },
      {
        name: 'md-subheading-2',
        ref: '/customization/typography?tab=1#placeholder-md-subheading-2',
        type: 'Placeholder',
      },
      {
        name: 'md-subheading-1',
        ref: '/customization/typography?tab=1#placeholder-md-subheading-1',
        type: 'Placeholder',
      },
      {
        name: 'md-body-2',
        ref: '/customization/typography?tab=1#placeholder-md-body-2',
        type: 'Placeholder',
      },
      {
        name: 'md-body-1',
        ref: '/customization/typography?tab=1#placeholder-md-body-1',
        type: 'Placeholder',
      },
      {
        name: 'md-caption',
        ref: '/customization/typography?tab=1#placeholder-md-caption',
        type: 'Placeholder',
      },
      {
        name: 'md-display-2',
        ref: '/customization/typography?tab=1#placeholder-md-display-2',
        type: 'Placeholder',
      },
      {
        name: 'md-display-3',
        ref: '/customization/typography?tab=1#placeholder-md-display-3',
        type: 'Placeholder',
      },
      {
        name: 'md-display-4',
        ref: '/customization/typography?tab=1#placeholder-md-display-4',
        type: 'Placeholder',
      },
      {
        name: 'md-transition-standard',
        ref: '/sassdoc/#transitions-variable-md-transition-standard',
        type: 'Variable',
      },
      {
        name: 'md-light-theme-background-color',
        ref: '/customization/colors?tab=1#variable-md-light-theme-background-color',
        type: 'Variable',
      },
      {
        name: 'md-dark-theme-background-color',
        ref: '/customization/colors?tab=1#variable-md-dark-theme-background-color',
        type: 'Variable',
      },
      {
        name: 'md-font-size-base',
        ref: '/customization/typography?tab=1#variable-md-font-size-base',
        type: 'Variable',
      },
      {
        name: 'md-html-min-width',
        ref: '/customization/typography?tab=1#variable-md-html-min-width',
        type: 'Variable',
      },
      {
        name: 'md-font-family',
        ref: '/customization/typography?tab=1#variable-md-font-family',
        type: 'Variable',
      },
      {
        name: 'md-font-regular',
        ref: '/customization/typography?tab=1#variable-md-font-regular',
        type: 'Variable',
      },
      {
        name: 'md-line-height',
        ref: '/customization/typography?tab=1#variable-md-line-height',
        type: 'Variable',
      },
    ],
    see: [],
    type: 'mixin',
    usedBy: [
      {
        name: 'react-md-everything',
        ref: '/sassdoc/#base, themes-mixin-react-md-everything',
        type: 'Mixin',
      },
    ],
  }],
  placeholders: [{
    code: '%md-tracking--10 {\n  letter-spacing: -.1px;\n}',
    description: 'A placeholder for styling a class with the material design tracking of -10.\n',
    name: 'md-tracking--10',
    oneLineCode: '%md-tracking--10 { \u2026 }',
    path: 'https://github.com/mlaursen/react-md/blob/release/1.1.x/src/scss/_typography.scss',
    see: [],
    type: 'placeholder',
    usedBy: [
      {
        name: 'md-display-4',
        ref: '/customization/typography?tab=1#placeholder-md-display-4',
        type: 'Placeholder',
      },
    ],
  }],
  variables: [{
    code: '$md-typography-extended: true !default;',
    description: 'Boolean if the typography should extend the base html tags as well.\n',
    name: 'md-typography-extended',
    oneLineCode: '$md-typography-extended: true !default;',
    path: 'https://github.com/mlaursen/react-md/blob/release/1.1.x/src/scss/_typography.scss',
    see: [],
    type: 'variable',
    usedBy: [],
    variableType: 'Boolean',
  }],
};

describe('PureSassDocPage', () => {
  it('should render correctly when there is no sassdoc', () => {
    let tree = createRouterSnapshot(<PureSassDocPage sassdoc={null} sassdocRequest={jest.fn()} desktop toolbarTitle="Test" />);
    expect(tree).toMatchSnapshot();

    tree = createRouterSnapshot(<PureSassDocPage sassdoc={null} sassdocRequest={jest.fn()} desktop={false} toolbarTitle="Test" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when there is a sassdoc', () => {
    let tree = createRouterSnapshot(
      <PureSassDocPage
        desktop
        sassdoc={TYPOGRAPHY_SASSDOC}
        sassdocRequest={jest.fn()}
        toolbarTitle="Test"
      />
    );
    expect(tree).toMatchSnapshot();

    tree = createRouterSnapshot(
      <PureSassDocPage
        desktop={false}
        sassdoc={TYPOGRAPHY_SASSDOC}
        sassdocRequest={jest.fn()}
        toolbarTitle="Test"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('should correctly call the sassdocRequest on mount', () => {
    const sassdocRequest = jest.fn();
    mount(<PureSassDocPage sassdoc={null} sassdocRequest={sassdocRequest} desktop toolbarTitle="Test" />);
    expect(sassdocRequest).toBeCalled();
  });
});
