/* eslint-disable max-len */
/* eslint-env jest */
import React from 'react';
import { createRouterSnapshot } from 'utils/testing';

import ExpandableSource from '../';

const ONE_LINE_CODE = '$md-primary-color: $md-red-500;';
const CODE = `@mixin react-md-buttons(
  $primary-color: $md-primary-color,
  $secondary-color: $md-secondary-color,
  $light-theme: $md-light-theme,
  $include-media: $md-media-included,
  $include-flat: $md-btn-include-flat,
  $include-raised: $md-btn-include-raised,
  $include-icon: $md-btn-include-icon,
  $include-floating: $md-btn-include-floating,
  $include-dense-icons: $md-font-icon-include-dense
) {
  // scss-lint:disable QualifyingElement
  a.md-btn {
    text-decoration: none;
  }

  .md-btn {
    background: transparent;
    border: 0;
    position: relative;
    transition-duration: $md-transition-time;
    transition-property: background, color;

    // Prevents click event from firing when clicking a child
    &[disabled] * {
      pointer-events: none;
    }

    &:focus {
      outline-style: none;
    }

    .md-icon {
      color: inherit;
    }

    .md-icon-separator {
      height: 100%;
    }

    .md-icon-text {
      @extend %md-font-medium;
    }
  }

  .md-btn--hover {
    background: if($light-theme, $md-btn-light-theme-hover-color, $md-btn-dark-theme-hover-color);
  }

  .md-btn--color-primary-active {
    background: rgba($primary-color, .12);
  }

  .md-btn--color-secondary-active {
    background: rgba($secondary-color, .12);
  }

  @if $include-flat or $include-raised {
    .md-btn--text {
      border-radius: $md-btn-text-border-radius;
      font-size: $md-btn-text-font-size;
      font-weight: $md-font-medium;
      height: $md-btn-text-height;
      min-width: $md-btn-min-width;
      padding: $md-btn-tb-padding $md-btn-lr-padding;
      text-transform: uppercase;
    }
  }

  @if $include-raised or $include-floating {
    .md-btn--raised {
      @include md-box-shadow(1);

      transition: background $md-transition-time, box-shadow $md-transition-time * 2, color $md-transition-time;
    }

    .md-btn--raised-disabled {
      background: get-color('divider', $light-theme);
    }

    .md-btn--raised-pressed {
      @include md-box-shadow(2);
    }
  }

  @if $include-icon or $include-floating {
    .md-btn--icon {
      border-radius: $md-btn-icon-border-radius;
      color: get-color('icon', $light-theme);
      height: $md-btn-icon-size;
      padding: $md-btn-icon-padding;
      width: $md-btn-icon-size;
    }
  }

  @if $include-floating {
    .md-btn--floating {
      @include md-box-shadow(2);

      height: $md-btn-floating-size;
      padding: ($md-btn-floating-size - $md-font-icon-size) / 2;
      transition-property: background, box-shadow, color;
      width: $md-btn-floating-size;
    }

    .md-btn--floating-pressed {
      @include md-box-shadow(4);
    }

    .md-btn--floating-mini {
      height: $md-btn-floating-mini-size;
      padding: ($md-btn-floating-mini-size - $md-font-icon-size) / 2;
      width: $md-btn-floating-mini-size;
    }

    .md-btn--fixed {
      position: fixed;
      z-index: $md-btn-fixed-z-index;
    }

    @if $md-btn-floating-margin != null {
      @include react-md-button-fixed-positions($md-btn-floating-margin);
    }
  }

  @if $include-media {
    @include react-md-buttons-media($include-flat, $include-raised, $include-icon, $include-floating, $include-dense-icons);
  }
}`;

const CODE_LINE = '@mixin react-md-buttons($primary-color: $md-primary-color, $secondary-color: $md-secondary-color, $light-theme: $md-light-theme, $include-media: $md-media-included, $include-flat: $md-btn-include-flat, $include-raised: $md-btn-include-raised, $include-icon: $md-btn-include-icon, $include-floating: $md-btn-include-floating, $include-dense-icons: $md-font-icon-include-dense) { ... }';

describe('ExpandableSource', () => {
  it('should render correctly while collapsed', () => {
    const tree1 = createRouterSnapshot(<ExpandableSource code={ONE_LINE_CODE} oneLineCode={ONE_LINE_CODE} />);
    expect(tree1).toMatchSnapshot();

    const tree2 = createRouterSnapshot(<ExpandableSource code={CODE} oneLineCode={CODE_LINE} />);
    expect(tree2).toMatchSnapshot();
  });

  it('should render correctly when not collapsed', () => {
    const tree = createRouterSnapshot(<ExpandableSource code={CODE} oneLineCode={CODE_LINE} defaultCollapsed={false} />);
    expect(tree).toMatchSnapshot();
  });
});
