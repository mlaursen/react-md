// THIS FILE WAS GENERATED BY A SCRIPT AND SHOULD NOT BE UPDATED MANUALLY
import "server-only";
import { type FakeScssModule } from "../utils/fakeScssModules.js";

export const SCSS_MODULES: Record<string, FakeScssModule> = {
  "src/app/components/avatar/AvatarBorders.module.scss": {
    css: ".AvatarBorders_box__QXZhd {\n  --rmd-avatar-border-color: currentcolor;\n}\n\n.AvatarBorders_red__QXZhd {\n  --rmd-avatar-border-color: #b71c1c;\n}",
    scss: '@use "everything";\n\n.box {\n  @include everything.avatar-set-var(border-color, currentcolor);\n}\n\n.red {\n  @include everything.avatar-set-var(border-color, everything.$red-900);\n}\n',
    baseName: "AvatarBorders",
    fileName: "AvatarBorders.module.scss",
  },
  "src/app/components/avatar/CustomAvatarColors.module.scss": {
    css: ".CustomAvatarColors_avatar1__Q3Vzd {\n  --rmd-avatar-background-color: #000;\n  --rmd-avatar-color: #f44336;\n}\n\n.CustomAvatarColors_avatar2__Q3Vzd {\n  background-color: #fff0b2;\n  color: #000;\n}",
    scss: '@use "everything";\n\n.avatar1 {\n  @include everything.avatar-set-var(background-color, everything.$black);\n  @include everything.avatar-set-var(color, everything.$red-500);\n}\n\n.avatar2 {\n  background-color: everything.$orange-100;\n  color: everything.$black;\n}\n',
    baseName: "CustomAvatarColors",
    fileName: "CustomAvatarColors.module.scss",
  },
  "src/app/components/badge/BadgePositionExample.module.scss": {
    css: ".BadgePositionExample_offset__QmFkZ {\n  --rmd-badge-offset: -1em;\n}\n\n.BadgePositionExample_offsetTop__QmFkZ {\n  --rmd-badge-offset-top: -1em;\n}\n\n.BadgePositionExample_offsetRight__QmFkZ {\n  --rmd-badge-offset-right: -1em;\n}",
    scss: '@use "everything";\n\n.offset {\n  @include everything.badge-set-var(offset, -1em);\n}\n\n.offsetTop {\n  @include everything.badge-set-var(offset-top, -1em);\n}\n\n.offsetRight {\n  @include everything.badge-set-var(offset-right, -1em);\n}\n',
    baseName: "BadgePositionExample",
    fileName: "BadgePositionExample.module.scss",
  },
  "src/app/components/carousel/CarouselExample.module.scss": {
    css: ".CarouselExample_card__Q2Fyb {\n  --rmd-button-color: #fff;\n  max-width: 42rem;\n}\n\n.CarouselExample_container__Q2Fyb {\n  position: relative;\n}\n\n.CarouselExample_control__Q2Fyb {\n  border-radius: 0;\n  bottom: 0;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  width: 5rem;\n}\n.CarouselExample_control__Q2Fyb:nth-of-type(2) {\n  right: 0;\n}\n\n.CarouselExample_slide__Q2Fyb {\n  --rmd-slide-duration: 0.5s;\n  height: 22.5rem;\n  overflow: hidden;\n}\n\n.CarouselExample_overlay__Q2Fyb {\n  padding-bottom: 4rem;\n}\n\n.CarouselExample_indicators__Q2Fyb {\n  align-items: center;\n  bottom: 0;\n  display: flex;\n  gap: 0.25rem;\n  justify-content: center;\n  left: 0;\n  padding: 1rem;\n  padding-bottom: 0.25rem;\n  position: absolute;\n  right: 0;\n}\n\n.CarouselExample_tablist__Q2Fyb {\n  gap: 0.25rem;\n  width: auto;\n}\n\n.CarouselExample_indicator__Q2Fyb {\n  background-color: rgba(255, 255, 255, 0.54);\n  height: 0.75rem;\n  min-width: 3rem;\n  width: 3rem;\n}\n.CarouselExample_indicator__Q2Fyb[aria-selected=true] {\n  background-color: #fff;\n}",
    scss: '@use "everything";\n\n.card {\n  @include everything.button-set-var(color, everything.$white);\n\n  max-width: 42rem;\n}\n\n.container {\n  position: relative;\n}\n\n.control {\n  border-radius: 0;\n  bottom: 0;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  width: 5rem;\n\n  &:nth-of-type(2) {\n    right: 0;\n  }\n}\n\n.slide {\n  @include everything.transition-set-var(slide-duration, 0.5s);\n\n  height: 22.5rem;\n  overflow: hidden;\n}\n\n.overlay {\n  padding-bottom: 4rem;\n}\n\n.indicators {\n  align-items: center;\n  bottom: 0;\n  display: flex;\n  gap: 0.25rem;\n  justify-content: center;\n  left: 0;\n  padding: 1rem;\n  padding-bottom: 0.25rem;\n  position: absolute;\n  right: 0;\n}\n\n.tablist {\n  gap: 0.25rem;\n  width: auto;\n}\n\n.indicator {\n  background-color: rgba(everything.$white, 0.54);\n  height: 0.75rem;\n  min-width: 3rem;\n  width: 3rem;\n\n  &[aria-selected="true"] {\n    background-color: everything.$white;\n  }\n}\n',
    baseName: "CarouselExample",
    fileName: "CarouselExample.module.scss",
  },
  "src/app/components/dialog/CustomTransitionExample.module.scss": {
    css: ".CustomTransitionExample_enter__Q3Vzd {\n  opacity: 0;\n}\n\n.CustomTransitionExample_enterActive__Q3Vzd {\n  opacity: 1;\n  transition: opacity 0.2s cubic-bezier(0, 0, 0.2, 1);\n}\n\n.CustomTransitionExample_exit__Q3Vzd {\n  opacity: 1;\n}\n\n.CustomTransitionExample_exitActive__Q3Vzd {\n  opacity: 0;\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 1, 1);\n}\n\n.CustomTransitionExample_dialog__Q3Vzd {\n  width: 30rem;\n}",
    scss: '@use "everything";\n\n.enter {\n  opacity: 0;\n}\n\n.enterActive {\n  opacity: 1;\n  transition: opacity everything.$enter-duration\n    everything.$deceleration-timing-function;\n}\n\n.exit {\n  opacity: 1;\n}\n\n.exitActive {\n  opacity: 0;\n  transition: opacity everything.$enter-duration\n    everything.$acceleration-timing-function;\n}\n\n.dialog {\n  width: 30rem;\n}\n',
    baseName: "CustomTransitionExample",
    fileName: "CustomTransitionExample.module.scss",
  },
  "src/app/components/divider/CustomizingDivider.module.scss": {
    css: ".CustomizingDivider_container__Q3Vzd {\n  --rmd-divider-size: 0.0625rem;\n  --rmd-divider-spacing: 0.25rem auto;\n  --rmd-divider-color: #ffb74d;\n}",
    scss: '@use "everything";\n\n.container {\n  // these two are the default values\n  @include everything.divider-set-var(size, everything.$divider-size);\n  @include everything.divider-set-var(spacing, everything.$divider-spacing);\n\n  @include everything.divider-set-var(color, everything.$orange-300);\n}\n',
    baseName: "CustomizingDivider",
    fileName: "CustomizingDivider.module.scss",
  },
  "src/app/components/divider/InsetDivider.module.scss": {
    css: ".InsetDivider_list__SW5zZ {\n  max-width: 30rem;\n}",
    scss: '@use "everything";\n\n.list {\n  // @include everything.divider-set-var(inset, 4rem);\n\n  max-width: 30rem;\n}\n',
    baseName: "InsetDivider",
    fileName: "InsetDivider.module.scss",
  },
  "src/app/components/divider/VerticalDivider.module.scss": {
    css: ".VerticalDivider_container__VmVyd {\n  --rmd-divider-vertical-size: 0.125rem;\n  --rmd-divider-vertical-spacing: auto 0.25rem;\n  --rmd-divider-max-size: 100%;\n}",
    scss: '@use "everything";\n\n.container {\n  // just to show the defaults\n  @include everything.divider-set-var(\n    vertical-size,\n    everything.$divider-vertical-size\n  );\n  @include everything.divider-set-var(\n    vertical-spacing,\n    everything.$divider-vertical-spacing\n  );\n  @include everything.divider-set-var(max-size, everything.$divider-max-size);\n}\n',
    baseName: "VerticalDivider",
    fileName: "VerticalDivider.module.scss",
  },
  "src/app/components/icon-rotator/CustomRotationExample.module.scss": {
    css: ".CustomRotationExample_container__Q3Vzd {\n  --rmd-icon-rotate-from: 33deg;\n  --rmd-icon-rotate-to: 103deg;\n}",
    scss: '@use "everything";\n\n.container {\n  @include everything.icon-set-var(rotate-from, 33deg);\n  @include everything.icon-set-var(rotate-to, 103deg);\n}\n',
    baseName: "CustomRotationExample",
    fileName: "CustomRotationExample.module.scss",
  },
  "src/app/components/list/AddingSecondaryTextExample.module.scss": {
    css: ".AddingSecondaryTextExample_container__QWRka {\n  max-width: 15rem;\n}",
    scss: ".container {\n  max-width: 15rem;\n}\n",
    baseName: "AddingSecondaryTextExample",
    fileName: "AddingSecondaryTextExample.module.scss",
  },
  "src/app/components/list/MultipleLinesOfSecondaryTextExample.module.scss": {
    css: ".MultipleLinesOfSecondaryTextExample_container__TXVsd {\n  max-width: 15rem;\n}",
    scss: ".container {\n  max-width: 15rem;\n}\n",
    baseName: "MultipleLinesOfSecondaryTextExample",
    fileName: "MultipleLinesOfSecondaryTextExample.module.scss",
  },
  "src/app/components/skeleton-placeholder/ConfiguringTheHeightExample.module.scss":
    {
      css: ".ConfiguringTheHeightExample_container__Q29uZ {\n  --rmd-skeleton-placeholder-height: 3rem;\n}",
      scss: '@use "everything";\n\n.container {\n  @include everything.transition-set-var(skeleton-placeholder-height, 3rem);\n}\n',
      baseName: "ConfiguringTheHeightExample",
      fileName: "ConfiguringTheHeightExample.module.scss",
    },
  "src/app/components/skeleton-placeholder/ReplacingContentExample.module.scss":
    {
      css: ".ReplacingContentExample_container__UmVwb {\n  border: var(--rmd-divider-size) solid var(--rmd-divider-color);\n  max-width: 40rem;\n  padding: 1rem;\n}\n\n.ReplacingContentExample_content__UmVwb {\n  overflow: hidden;\n}",
      scss: '@use "everything";\n\n.container {\n  @include everything.divider-border-style;\n\n  max-width: 40rem;\n  padding: 1rem;\n}\n\n.content {\n  overflow: hidden;\n}\n',
      baseName: "ReplacingContentExample",
      fileName: "ReplacingContentExample.module.scss",
    },
  "src/app/components/slider/CustomizingSliderMarks.module.scss": {
    css: ".CustomizingSliderMarks_form__Q3Vzd {\n  --rmd-box-gap: 3rem;\n  --rmd-slider-vertical-size: 25rem;\n}",
    scss: '@use "everything";\n\n.form {\n  @include everything.box-set-var(gap, 3rem);\n  @include everything.form-set-var(slider-vertical-size, 25rem);\n}\n',
    baseName: "CustomizingSliderMarks",
    fileName: "CustomizingSliderMarks.module.scss",
  },
  "src/app/components/slider/LinkedWithATextField.module.scss": {
    css: ".LinkedWithATextField_slider__TGlua {\n  align-items: flex-start;\n}\n\n.LinkedWithATextField_container__TGlua {\n  width: 15rem;\n}\n\n.LinkedWithATextField_label__TGlua {\n  line-height: var(--rmd-slider-size);\n}",
    scss: '@use "everything";\n\n.slider {\n  align-items: flex-start;\n}\n\n.container {\n  width: 15rem;\n}\n\n.label {\n  @include everything.form-use-var(line-height, slider-size);\n}\n',
    baseName: "LinkedWithATextField",
    fileName: "LinkedWithATextField.module.scss",
  },
  "src/app/components/slider/SliderMarks.module.scss": {
    css: ".SliderMarks_form__U2xpZ {\n  --rmd-box-gap: 3rem;\n  --rmd-slider-vertical-size: 25rem;\n}",
    scss: '@use "everything";\n\n.form {\n  @include everything.box-set-var(gap, 3rem);\n  @include everything.form-set-var(slider-vertical-size, 25rem);\n}\n',
    baseName: "SliderMarks",
    fileName: "SliderMarks.module.scss",
  },
  "src/app/components/snackbar/MultipleVisibleToastsExample.module.scss": {
    css: ".MultipleVisibleToastsExample_toast__TXVsd {\n  position: relative;\n  transform-origin: right;\n}\n[dir=rtl] .MultipleVisibleToastsExample_toast__TXVsd {\n  transform-origin: left;\n}\n\n.MultipleVisibleToastsExample_progress__TXVsd {\n  --rmd-progress-color: var(--rmd-secondary-color);\n  background-color: #fff;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n}\n\n@keyframes countdown {\n  0% {\n    width: 100%;\n  }\n  100% {\n    width: 0%;\n  }\n}\n.MultipleVisibleToastsExample_countdown__TXVsd {\n  will-change: width;\n}\n.MultipleVisibleToastsExample_countdown__TXVsd::before {\n  animation: none;\n}\n.MultipleVisibleToastsExample_countdown__TXVsd::after {\n  animation: 5s linear 0.2s countdown;\n}\n.rmd-toast--paused  .MultipleVisibleToastsExample_countdown__TXVsd::after {\n  animation-play-state: paused;\n}",
    scss: '@use "everything";\n\n.toast {\n  @include everything.rtl {\n    transform-origin: left;\n  }\n\n  position: relative;\n  transform-origin: right;\n}\n\n.progress {\n  @include everything.progress-set-var(\n    color,\n    everything.theme-get-var(secondary-color)\n  );\n\n  background-color: everything.$white;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n}\n\n@keyframes countdown {\n  0% {\n    width: 100%;\n  }\n\n  100% {\n    width: 0%;\n  }\n}\n\n.countdown {\n  will-change: width;\n\n  &::before {\n    animation: none;\n  }\n\n  &::after {\n    animation: 5s linear everything.$scale-transition-enter-duration countdown;\n  }\n\n  :global(.rmd-toast--paused) :local &::after {\n    animation-play-state: paused;\n  }\n}\n',
    baseName: "MultipleVisibleToastsExample",
    fileName: "MultipleVisibleToastsExample.module.scss",
  },
  "src/app/components/snackbar/ToastPriorityExample.module.scss": {
    css: ".ToastPriorityExample_form__VG9hc {\n  max-width: 30rem;\n}\n\n.ToastPriorityExample_code__VG9hc {\n  height: 100%;\n}\n\n.ToastPriorityExample_block__VG9hc {\n  height: 30rem;\n  overflow: auto;\n}",
    scss: ".form {\n  max-width: 30rem;\n}\n\n.code {\n  height: 100%;\n}\n\n.block {\n  height: 30rem;\n  overflow: auto;\n}\n",
    baseName: "ToastPriorityExample",
    fileName: "ToastPriorityExample.module.scss",
  },
  "src/app/components/switch/SwitchWithCircularProgress.module.scss": {
    css: ".SwitchWithCircularProgress_pending__U3dpd {\n  --rmd-switch-ball-background-color: #f2f2f2;\n}",
    scss: '@use "everything";\n\n.pending {\n  // set the background color to the inactive color so that the circular\n  // progress bar will be visible while checked\n  @include everything.form-set-var(\n    switch-ball-background-color,\n    everything.$form-switch-ball-background-color\n  );\n}\n',
    baseName: "SwitchWithCircularProgress",
    fileName: "SwitchWithCircularProgress.module.scss",
  },
  "src/app/components/table/ContainerBasedStickyTableExample.module.scss": {
    css: ".ContainerBasedStickyTableExample_container__Q29ud {\n  max-height: 20rem;\n}",
    scss: ".container {\n  max-height: 20rem;\n}\n",
    baseName: "ContainerBasedStickyTableExample",
    fileName: "ContainerBasedStickyTableExample.module.scss",
  },
  "src/app/components/table/DisableStickyActiveStylesExample.module.scss": {
    css: ".DisableStickyActiveStylesExample_container__RGlzY {\n  max-height: 20rem;\n}",
    scss: ".container {\n  max-height: 20rem;\n}\n",
    baseName: "DisableStickyActiveStylesExample",
    fileName: "DisableStickyActiveStylesExample.module.scss",
  },
  "src/app/components/table/ScrollableTableExample.module.scss": {
    css: ".ScrollableTableExample_container__U2Nyb {\n  max-height: 20rem;\n}",
    scss: ".container {\n  max-height: 20rem;\n}\n",
    baseName: "ScrollableTableExample",
    fileName: "ScrollableTableExample.module.scss",
  },
  "src/app/components/table/StickyActiveStylesExample.module.scss": {
    css: ".StickyActiveStylesExample_container__U3RpY {\n  max-height: 20rem;\n}\n\n.StickyActiveStylesExample_active__U3RpY {\n  --rmd-table-cell-color: currentcolor;\n}",
    scss: '@use "everything";\n\n.container {\n  max-height: 20rem;\n}\n\n.active {\n  @include everything.table-set-var(cell-color, currentcolor);\n}\n',
    baseName: "StickyActiveStylesExample",
    fileName: "StickyActiveStylesExample.module.scss",
  },
  "src/app/components/table/StickyColumnsExample.module.scss": {
    css: ".StickyColumnsExample_container__U3RpY {\n  max-height: 25rem;\n}\n\n.StickyColumnsExample_sticky__U3RpY {\n  --rmd-table-sticky-cell: 4rem;\n}",
    scss: '@use "everything";\n\n.container {\n  max-height: 25rem;\n}\n\n.sticky {\n  // if you don\'t need auto-RTL support, you could just set the `left` value\n  // instead of using the mixin and updating the css variable\n  // @include everything.table-set-var(sticky-cell, 4rem);\n  @include everything.table-set-var(\n    sticky-cell,\n    calc(\n      everything.$table-cell-input-toggle-horizontal-padding * 2 +\n        everything.$form-input-toggle-normal-size * 2\n    )\n  );\n}\n',
    baseName: "StickyColumnsExample",
    fileName: "StickyColumnsExample.module.scss",
  },
  "src/app/components/table/UpdatingSelectedRowColorExample.module.scss": {
    css: ".UpdatingSelectedRowColorExample_selected__VXBkY {\n  --rmd-table-cell-color: currentcolor;\n}\n .mouse-mode  .UpdatingSelectedRowColorExample_selected__VXBkY:hover {\n  background-color: color-mix(in srgb, var(--rmd-primary-color) 80%, var(--rmd-on-primary-color));\n}",
    scss: '@use "everything";\n\n.selected {\n  @include everything.mouse-only(true) {\n    &:hover {\n      background-color: color-mix(\n        in srgb,\n        everything.theme-get-var(primary-color) 80%,\n        everything.theme-get-var(on-primary-color)\n      );\n    }\n  }\n\n  @include everything.table-set-var(cell-color, currentcolor);\n}\n',
    baseName: "UpdatingSelectedRowColorExample",
    fileName: "UpdatingSelectedRowColorExample.module.scss",
  },
  "src/app/components/table/ViewportBasedStickyTableExample.module.scss": {
    css: ".ViewportBasedStickyTableExample_container__Vmlld {\n  --rmd-table-sticky-header: var(--rmd-layout-header-height);\n}",
    scss: '@use "everything";\n\n.container {\n  @include everything.table-set-var(\n    sticky-header,\n    everything.layout-get-var(header-height)\n  );\n}\n',
    baseName: "ViewportBasedStickyTableExample",
    fileName: "ViewportBasedStickyTableExample.module.scss",
  },
  "src/app/components/tabs/VerticalTabsExample.module.scss": {
    css: ".VerticalTabsExample_container__VmVyd {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: min-content 1fr;\n}",
    scss: ".container {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: min-content 1fr;\n}\n",
    baseName: "VerticalTabsExample",
    fileName: "VerticalTabsExample.module.scss",
  },
  "src/app/components/text-container/SimpleExample.module.scss": {
    css: "",
    scss: '@use "everything";\n\n.container {\n  // these are the defaults. uncomment and change the values to see how the demo\n  // changes\n  // @include everything.typography-set-var(\n  //   line-length,\n  //   everything.$text-line-length\n  // );\n  // @include everything.typography-set-var(\n  //   text-container-padding,\n  //   everything.$text-container-padding\n  // );\n}\n',
    baseName: "SimpleExample",
    fileName: "SimpleExample.module.scss",
  },
  "src/app/components/text-field/NonIconAddons.module.scss": {
    css: ".NonIconAddons_avatarField__Tm9uS {\n  --rmd-text-field-padding-left: calc(var(--rmd-avatar-size) + 1.5rem);\n  --rmd-text-field-padding-right: calc(var(--rmd-avatar-size) + 1rem);\n}\n\n.NonIconAddons_buttonField__Tm9uS {\n  --rmd-text-field-padding-right: 4rem;\n}",
    scss: '@use "everything";\n\n.avatarField {\n  @include everything.form-set-var(\n    text-field-padding-left,\n    calc(everything.avatar-get-var(size) + 1.5rem)\n  );\n  @include everything.form-set-var(\n    text-field-padding-right,\n    calc(everything.avatar-get-var(size) + 1rem)\n  );\n}\n\n.buttonField {\n  @include everything.form-set-var(text-field-padding-right, 4rem);\n}\n',
    baseName: "NonIconAddons",
    fileName: "NonIconAddons.module.scss",
  },
  "src/app/components/text-icon-spacing/CustomizingSpacingExample.module.scss":
    {
      css: ".CustomizingSpacingExample_container__Q3Vzd {\n  --rmd-icon-spacing: 1rem;\n  align-items: center;\n  display: flex;\n}",
      scss: '@use "everything";\n\n.container {\n  @include everything.icon-set-var(spacing, 1rem);\n\n  align-items: center;\n  display: flex;\n}\n',
      baseName: "CustomizingSpacingExample",
      fileName: "CustomizingSpacingExample.module.scss",
    },
  "src/app/components/tooltip/CustomTooltipExample.module.scss": {
    css: ".CustomTooltipExample_container__Q3Vzd {\n  height: 3em;\n  position: relative;\n  width: 3em;\n}\n\n.CustomTooltipExample_tooltip__Q3Vzd {\n  left: 50%;\n  position: absolute;\n  top: calc(100% + var(--rmd-tooltip-spacing));\n  transform: translateX(-50%);\n}",
    scss: '@use "everything";\n\n.container {\n  height: 3em;\n  position: relative;\n  width: 3em;\n}\n\n.tooltip {\n  left: 50%;\n  position: absolute;\n  top: calc(100% + everything.tooltip-get-var(spacing));\n  transform: translateX(-50%);\n}\n',
    baseName: "CustomTooltipExample",
    fileName: "CustomTooltipExample.module.scss",
  },
  "src/app/components/tooltip/ProgressbarTooltipExample.module.scss": {
    css: ".ProgressbarTooltipExample_container__UHJvZ {\n  position: relative;\n}\n\n.ProgressbarTooltipExample_tooltip__UHJvZ {\n  left: var(--offset, 0%);\n  position: absolute;\n  top: calc(100% + 1em);\n  transform: translateX(-50%);\n  transition: left 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s;\n  will-change: left, right;\n}\n[dir=rtl] .ProgressbarTooltipExample_tooltip__UHJvZ {\n  left: auto;\n  right: var(--offset, 0%);\n}",
    scss: '@use "everything";\n\n.container {\n  position: relative;\n}\n\n.tooltip {\n  @include everything.auto-rtl(left, var(--offset, 0%));\n\n  position: absolute;\n  top: calc(100% + 1em);\n  transform: translateX(-50%);\n  transition:\n    left everything.$linear-duration everything.$linear-timing-function,\n    background-color 0.3s;\n  will-change: left, right;\n}\n',
    baseName: "ProgressbarTooltipExample",
    fileName: "ProgressbarTooltipExample.module.scss",
  },
  "src/app/components/typography/CustomizingTypographyExample.module.scss": {
    css: ".CustomizingTypographyExample_container__Q3Vzd  .rmd-typography {\n  font-family: Arial, Verdana, Tahoma, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin: 1.25em 0 0.5em;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--headline-1 {\n  font-size: 3rem;\n  line-height: 6rem;\n  font-weight: 300;\n  letter-spacing: -0.015625em;\n  margin: 0 0 1em;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--headline-2 {\n  font-size: 2.875rem;\n  line-height: 3.75rem;\n  font-weight: 300;\n  letter-spacing: -0.0083333333em;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--headline-3 {\n  font-size: 2.825rem;\n  line-height: 3.125rem;\n  font-weight: 400;\n  letter-spacing: normal;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--headline-4 {\n  font-size: 2.125rem;\n  line-height: 2.5rem;\n  font-weight: 400;\n  letter-spacing: 0.0073529412em;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--headline-5 {\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: 400;\n  letter-spacing: normal;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--headline-6 {\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.0125em;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--subtitle-1 {\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.009375em;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--subtitle-2 {\n  font-size: 0.875rem;\n  line-height: 1.375rem;\n  font-weight: 500;\n  letter-spacing: 0.0071428571em;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--body-1 {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  font-weight: 400;\n  letter-spacing: 0.0357142857em;\n  margin: 1em 0;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--body-2 {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.0178571429em;\n  margin: 1em 0;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--caption {\n  font-size: 0.75rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.0333333333em;\n}\n.CustomizingTypographyExample_container__Q3Vzd  .rmd-typography--overline {\n  font-size: 0.75rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.1666666667em;\n}",
    scss: '@use "sass:string";\n@use "@react-md/core" with (\n  $font-family: string.unquote("Arial, Verdana, Tahoma, sans-serif"),\n  // these are the default font weights\n  $font-weight-thin: 100,\n  $font-weight-light: 300,\n  $font-weight-regular: 400,\n  $font-weight-medium: 500,\n  $font-weight-bold: 700,\n  $font-weight-semi-bold: 800,\n  $font-weight-black: 900,\n  $base-custom-font-styles: (\n    // applies to all `.rmd-typography` classes\n    // values will be overridden by the `-custom-styles`\n    margin: 1.25em 0 0.5em,\n  ),\n  $headline-1-custom-styles: (\n    font-size: 3rem,\n    margin: 0 0 1em,\n  ),\n  $headline-2-custom-styles: (\n    font-size: 2.875rem,\n  ),\n  $headline-3-custom-styles: (\n    font-size: 2.825rem,\n  ),\n  $headline-4-custom-styles: (),\n  $headline-5-custom-styles: (),\n  $headline-6-custom-styles: (),\n  $subtitle-1-custom-styles: (),\n  $subtitle-2-custom-styles: (),\n  $body-1-custom-styles: (\n    margin: 1em 0,\n  ),\n  $body-2-custom-styles: (\n    margin: 1em 0,\n  ),\n  $caption-custom-styles: (),\n  $overline-custom-styles: ()\n);\n\n// this is only required for this demo. In your application, this should just be the normal:\n// @include core.styles;\n.container {\n  :global {\n    @include core.typography-base-styles;\n  }\n}\n',
    baseName: "CustomizingTypographyExample",
    fileName: "CustomizingTypographyExample.module.scss",
  },
};
