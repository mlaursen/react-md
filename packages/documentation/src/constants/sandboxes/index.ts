/** this is a generated file from `dev-utils sandbox` */
import { IFiles } from "codesandbox-import-utils/lib/api/define";

const resolve = (importer: Promise<any>) =>
  importer.then(content => content.default as IFiles);

export type GetSandbox = () => Promise<IFiles>;
export type PackageName =
  | "Alert"
  | "AppBar"
  | "AutoComplete"
  | "Avatar"
  | "Badge"
  | "Button"
  | "Card"
  | "Chip"
  | "Dialog"
  | "Divider"
  | "Elevation"
  | "Form"
  | "Icon"
  | "Link"
  | "List"
  | "MaterialIcons"
  | "Media"
  | "Menu"
  | "Overlay"
  | "Portal"
  | "Progress"
  | "Sheet"
  | "States"
  | "Table"
  | "Theme"
  | "Tooltip"
  | "Transition"
  | "Tree"
  | "Typography"
  | "Utils";
export type Sandboxes = Record<PackageName, Record<string, GetSandbox>>;

const sandboxes: Sandboxes = {
  Alert: {
    HandlingDuplicatedMessages: () =>
      resolve(import("./Alert-HandlingDuplicatedMessages.json")),
    SimpleMessageQueue: () =>
      resolve(import("./Alert-SimpleMessageQueue.json")),
    UpdatingMessagePriority: () =>
      resolve(import("./Alert-UpdatingMessagePriority.json")),
  },
  AppBar: {
    AnimatingAppBar: () => resolve(import("./AppBar-AnimatingAppBar.json")),
    AutoDense: () => resolve(import("./AppBar-AutoDense.json")),
    DifferentSizes: () => resolve(import("./AppBar-DifferentSizes.json")),
    FixedWithOffset: () => resolve(import("./AppBar-FixedWithOffset.json")),
    SimpleUsage: () => resolve(import("./AppBar-SimpleUsage.json")),
  },
  AutoComplete: {
    HighlightMatches: () =>
      resolve(import("./AutoComplete-HighlightMatches.json")),
    SimpleExample: () => resolve(import("./AutoComplete-SimpleExample.json")),
    UsingObjectDataSets: () =>
      resolve(import("./AutoComplete-UsingObjectDataSets.json")),
  },
  Avatar: {
    ColorExamples: () => resolve(import("./Avatar-ColorExamples.json")),
    SimpleUsage: () => resolve(import("./Avatar-SimpleUsage.json")),
  },
  Badge: {
    CustomizingBadges: () => resolve(import("./Badge-CustomizingBadges.json")),
    SimpleExamples: () => resolve(import("./Badge-SimpleExamples.json")),
    ThemedBadges: () => resolve(import("./Badge-ThemedBadges.json")),
    WithTooltips: () => resolve(import("./Badge-WithTooltips.json")),
  },
  Button: {
    ContainedButtons: () => resolve(import("./Button-ContainedButtons.json")),
    CustomButtonTheme: () => resolve(import("./Button-CustomButtonTheme.json")),
    IconButtons: () => resolve(import("./Button-IconButtons.json")),
    OutlinedButtons: () => resolve(import("./Button-OutlinedButtons.json")),
    TextButtons: () => resolve(import("./Button-TextButtons.json")),
    TextButtonsWithIcons: () =>
      resolve(import("./Button-TextButtonsWithIcons.json")),
  },
  Card: {
    ExpandableCards: () => resolve(import("./Card-ExpandableCards.json")),
    SimpleExample: () => resolve(import("./Card-SimpleExample.json")),
    WithActions: () => resolve(import("./Card-WithActions.json")),
    WithMedia: () => resolve(import("./Card-WithMedia.json")),
  },
  Chip: {
    ExpandableChips: () => resolve(import("./Chip-ExpandableChips.json")),
    SimpleChips: () => resolve(import("./Chip-SimpleChips.json")),
  },
  Dialog: {
    AlertDialogsAndModals: () =>
      resolve(import("./Dialog-AlertDialogsAndModals.json")),
    FixedDialogExample: () =>
      resolve(import("./Dialog-FixedDialogExample.json")),
    FullPageExample: () => resolve(import("./Dialog-FullPageExample.json")),
    NestedDialogs: () => resolve(import("./Dialog-NestedDialogs.json")),
    SimpleExample: () => resolve(import("./Dialog-SimpleExample.json")),
    SimpleListExample: () => resolve(import("./Dialog-SimpleListExample.json")),
  },
  Divider: {
    HorizontalDividers: () =>
      resolve(import("./Divider-HorizontalDividers.json")),
    VerticalDividers: () => resolve(import("./Divider-VerticalDividers.json")),
    WithinLists: () => resolve(import("./Divider-WithinLists.json")),
  },
  Elevation: {
    AllElevations: () => resolve(import("./Elevation-AllElevations.json")),
    AnimatingElevation: () =>
      resolve(import("./Elevation-AnimatingElevation.json")),
  },
  Form: {
    AsyncSwitchExample: () => resolve(import("./Form-AsyncSwitchExample.json")),
    CheckboxAndRadioExamples: () =>
      resolve(import("./Form-CheckboxAndRadioExamples.json")),
    CustomCheckboxes: () => resolve(import("./Form-CustomCheckboxes.json")),
    CustomizingSelectOptions: () =>
      resolve(import("./Form-CustomizingSelectOptions.json")),
    ExampleForm: () => resolve(import("./Form-ExampleForm.json")),
    FileInputExample: () => resolve(import("./Form-FileInputExample.json")),
    IndeterminateCheckboxes: () =>
      resolve(import("./Form-IndeterminateCheckboxes.json")),
    NativeSelectExample: () =>
      resolve(import("./Form-NativeSelectExample.json")),
    SelectExample: () => resolve(import("./Form-SelectExample.json")),
    SwitchExamples: () => resolve(import("./Form-SwitchExamples.json")),
    TextAreaExample: () => resolve(import("./Form-TextAreaExample.json")),
    TextFieldExample: () => resolve(import("./Form-TextFieldExample.json")),
    TextFieldTypes: () => resolve(import("./Form-TextFieldTypes.json")),
  },
  Icon: {
    IconSpacing: () => resolve(import("./Icon-IconSpacing.json")),
    SimpleExamples: () => resolve(import("./Icon-SimpleExamples.json")),
  },
  Link: {
    MaliciousTarget: () => resolve(import("./Link-MaliciousTarget.json")),
    SimpleExamples: () => resolve(import("./Link-SimpleExamples.json")),
    ThirdPartyRoutingLibraries: () =>
      resolve(import("./Link-ThirdPartyRoutingLibraries.json")),
    WithButtonStyles: () => resolve(import("./Link-WithButtonStyles.json")),
    WithIcons: () => resolve(import("./Link-WithIcons.json")),
  },
  List: {
    NonInteractable: () => resolve(import("./List-NonInteractable.json")),
    SingleLineExamples: () => resolve(import("./List-SingleLineExamples.json")),
    ThreeLineExamples: () => resolve(import("./List-ThreeLineExamples.json")),
    TwoLineExamples: () => resolve(import("./List-TwoLineExamples.json")),
  },
  MaterialIcons: {
    AllIcons: () => resolve(import("./MaterialIcons-AllIcons.json")),
    SimpleExamples: () =>
      resolve(import("./MaterialIcons-SimpleExamples.json")),
  },
  Media: {
    ForcedAspectRatio: () => resolve(import("./Media-ForcedAspectRatio.json")),
    SimpleResponsiveMedia: () =>
      resolve(import("./Media-SimpleResponsiveMedia.json")),
    WithOverlay: () => resolve(import("./Media-WithOverlay.json")),
  },
  Menu: {
    AccessibilityExample: () =>
      resolve(import("./Menu-AccessibilityExample.json")),
    AddingEventHandlers: () =>
      resolve(import("./Menu-AddingEventHandlers.json")),
    CustomRenderers: () => resolve(import("./Menu-CustomRenderers.json")),
    FixingOverflowIssues: () =>
      resolve(import("./Menu-FixingOverflowIssues.json")),
    HorizontalMenu: () => resolve(import("./Menu-HorizontalMenu.json")),
    MenuPositioning: () => resolve(import("./Menu-MenuPositioning.json")),
    NestedDropdownMenus: () =>
      resolve(import("./Menu-NestedDropdownMenus.json")),
    SimpleExamples: () => resolve(import("./Menu-SimpleExamples.json")),
  },
  Overlay: {
    CustomTheme: () => resolve(import("./Overlay-CustomTheme.json")),
    FixingOverflowIssues: () =>
      resolve(import("./Overlay-FixingOverflowIssues.json")),
    SimpleExample: () => resolve(import("./Overlay-SimpleExample.json")),
  },
  Portal: {
    CustomPortalContainer: () =>
      resolve(import("./Portal-CustomPortalContainer.json")),
    SimpleExample: () => resolve(import("./Portal-SimpleExample.json")),
  },
  Progress: {
    SimpleDeterminateExamples: () =>
      resolve(import("./Progress-SimpleDeterminateExamples.json")),
    SimpleIndeterminateExamples: () =>
      resolve(import("./Progress-SimpleIndeterminateExamples.json")),
    WithinButtons: () => resolve(import("./Progress-WithinButtons.json")),
    WithSuspense: () => resolve(import("./Progress-WithSuspense.json")),
  },
  Sheet: {
    MobileActionSheet: () => resolve(import("./Sheet-MobileActionSheet.json")),
    PositionExamples: () => resolve(import("./Sheet-PositionExamples.json")),
    SheetSizing: () => resolve(import("./Sheet-SheetSizing.json")),
  },
  States: {
    CustomComponent: () => resolve(import("./States-CustomComponent.json")),
    CustomInteractions: () =>
      resolve(import("./States-CustomInteractions.json")),
    DisablingRippleEffect: () =>
      resolve(import("./States-DisablingRippleEffect.json")),
    SetupExample: () => resolve(import("./States-SetupExample.json")),
  },
  Table: {
    BaseStyles: () => resolve(import("./Table-BaseStyles.json")),
    ResponsiveTables: () => resolve(import("./Table-ResponsiveTables.json")),
    SimpleExamples: () => resolve(import("./Table-SimpleExamples.json")),
  },
  Theme: {
    SimpleExample: () => resolve(import("./Theme-SimpleExample.json")),
  },
  Tooltip: {
    AdvancedAPIAndGotchas: () =>
      resolve(import("./Tooltip-AdvancedAPIAndGotchas.json")),
    AutoPositioningTooltips: () =>
      resolve(import("./Tooltip-AutoPositioningTooltips.json")),
    CommonPatterns: () => resolve(import("./Tooltip-CommonPatterns.json")),
    DenseTooltips: () => resolve(import("./Tooltip-DenseTooltips.json")),
    HoverMode: () => resolve(import("./Tooltip-HoverMode.json")),
    LargeTooltips: () => resolve(import("./Tooltip-LargeTooltips.json")),
    SimpleExamples: () => resolve(import("./Tooltip-SimpleExamples.json")),
  },
  Transition: {
    CollapseExamples: () =>
      resolve(import("./Transition-CollapseExamples.json")),
    CrossFadeExamples: () =>
      resolve(import("./Transition-CrossFadeExamples.json")),
    FixedPositioningExample: () =>
      resolve(import("./Transition-FixedPositioningExample.json")),
  },
  Tree: {
    CustomizingTreeItems: () =>
      resolve(import("./Tree-CustomizingTreeItems.json")),
    MultiSelectTree: () => resolve(import("./Tree-MultiSelectTree.json")),
    SingleSelectTree: () => resolve(import("./Tree-SingleSelectTree.json")),
  },
  Typography: {
    TextContainerExamples: () =>
      resolve(import("./Typography-TextContainerExamples.json")),
    TextExamples: () => resolve(import("./Typography-TextExamples.json")),
  },
  Utils: {
    AppSizeListenerExample: () =>
      resolve(import("./Utils-AppSizeListenerExample.json")),
    MaterialGridExample: () =>
      resolve(import("./Utils-MaterialGridExample.json")),
    MediaQueryComponents: () =>
      resolve(import("./Utils-MediaQueryComponents.json")),
    ResizeListenerExample: () =>
      resolve(import("./Utils-ResizeListenerExample.json")),
    ResizeObserverExample: () =>
      resolve(import("./Utils-ResizeObserverExample.json")),
    SimpleGridList: () => resolve(import("./Utils-SimpleGridList.json")),
  },
};

export default sandboxes;
