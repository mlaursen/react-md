/** this is a generated file from `dev-utils sandbox` */
import { IFiles } from "codesandbox-import-utils/lib/api/define";

const resolve = (importer: Promise<any>) =>
  importer.then((content) => content.default as IFiles);

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
  | "ExpansionPanel"
  | "Form"
  | "Icon"
  | "Layout"
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
  | "Tabs"
  | "Theme"
  | "Tooltip"
  | "Transition"
  | "Tree"
  | "Typography"
  | "Utils";
export type Sandboxes = Record<PackageName, Record<string, GetSandbox>>;

const sandboxes: Sandboxes = {
  Alert: {
    "HandlingDuplicatedMessages-js": () =>
      resolve(import("./Alert-HandlingDuplicatedMessages-js.json")),
    HandlingDuplicatedMessages: () =>
      resolve(import("./Alert-HandlingDuplicatedMessages.json")),
    "SimpleMessageQueue-js": () =>
      resolve(import("./Alert-SimpleMessageQueue-js.json")),
    SimpleMessageQueue: () =>
      resolve(import("./Alert-SimpleMessageQueue.json")),
    "UpdatingMessagePriority-js": () =>
      resolve(import("./Alert-UpdatingMessagePriority-js.json")),
    UpdatingMessagePriority: () =>
      resolve(import("./Alert-UpdatingMessagePriority.json")),
  },
  AppBar: {
    "AnimatingAppBar-js": () =>
      resolve(import("./AppBar-AnimatingAppBar-js.json")),
    AnimatingAppBar: () => resolve(import("./AppBar-AnimatingAppBar.json")),
    "AutoDense-js": () => resolve(import("./AppBar-AutoDense-js.json")),
    AutoDense: () => resolve(import("./AppBar-AutoDense.json")),
    "DifferentSizes-js": () =>
      resolve(import("./AppBar-DifferentSizes-js.json")),
    DifferentSizes: () => resolve(import("./AppBar-DifferentSizes.json")),
    "FixedWithOffset-js": () =>
      resolve(import("./AppBar-FixedWithOffset-js.json")),
    FixedWithOffset: () => resolve(import("./AppBar-FixedWithOffset.json")),
    "SimpleUsage-js": () => resolve(import("./AppBar-SimpleUsage-js.json")),
    SimpleUsage: () => resolve(import("./AppBar-SimpleUsage.json")),
  },
  AutoComplete: {
    "HighlightMatches-js": () =>
      resolve(import("./AutoComplete-HighlightMatches-js.json")),
    HighlightMatches: () =>
      resolve(import("./AutoComplete-HighlightMatches.json")),
    "SimpleExample-js": () =>
      resolve(import("./AutoComplete-SimpleExample-js.json")),
    SimpleExample: () => resolve(import("./AutoComplete-SimpleExample.json")),
    "UsingObjectDataSets-js": () =>
      resolve(import("./AutoComplete-UsingObjectDataSets-js.json")),
    UsingObjectDataSets: () =>
      resolve(import("./AutoComplete-UsingObjectDataSets.json")),
  },
  Avatar: {
    "ColorExamples-js": () => resolve(import("./Avatar-ColorExamples-js.json")),
    ColorExamples: () => resolve(import("./Avatar-ColorExamples.json")),
    "SimpleUsage-js": () => resolve(import("./Avatar-SimpleUsage-js.json")),
    SimpleUsage: () => resolve(import("./Avatar-SimpleUsage.json")),
  },
  Badge: {
    "CustomizingBadges-js": () =>
      resolve(import("./Badge-CustomizingBadges-js.json")),
    CustomizingBadges: () => resolve(import("./Badge-CustomizingBadges.json")),
    "SimpleExamples-js": () =>
      resolve(import("./Badge-SimpleExamples-js.json")),
    SimpleExamples: () => resolve(import("./Badge-SimpleExamples.json")),
    "ThemedBadges-js": () => resolve(import("./Badge-ThemedBadges-js.json")),
    ThemedBadges: () => resolve(import("./Badge-ThemedBadges.json")),
    "WithTooltips-js": () => resolve(import("./Badge-WithTooltips-js.json")),
    WithTooltips: () => resolve(import("./Badge-WithTooltips.json")),
  },
  Button: {
    "ButtonWithCircularProgress-js": () =>
      resolve(import("./Button-ButtonWithCircularProgress-js.json")),
    ButtonWithCircularProgress: () =>
      resolve(import("./Button-ButtonWithCircularProgress.json")),
    "ContainedButtons-js": () =>
      resolve(import("./Button-ContainedButtons-js.json")),
    ContainedButtons: () => resolve(import("./Button-ContainedButtons.json")),
    "CustomButtonTheme-js": () =>
      resolve(import("./Button-CustomButtonTheme-js.json")),
    CustomButtonTheme: () => resolve(import("./Button-CustomButtonTheme.json")),
    "FloatingActionButtons-js": () =>
      resolve(import("./Button-FloatingActionButtons-js.json")),
    FloatingActionButtons: () =>
      resolve(import("./Button-FloatingActionButtons.json")),
    "IconButtons-js": () => resolve(import("./Button-IconButtons-js.json")),
    IconButtons: () => resolve(import("./Button-IconButtons.json")),
    "OutlinedButtons-js": () =>
      resolve(import("./Button-OutlinedButtons-js.json")),
    OutlinedButtons: () => resolve(import("./Button-OutlinedButtons.json")),
    "TextButtons-js": () => resolve(import("./Button-TextButtons-js.json")),
    TextButtons: () => resolve(import("./Button-TextButtons.json")),
    "TextButtonsWithIcons-js": () =>
      resolve(import("./Button-TextButtonsWithIcons-js.json")),
    TextButtonsWithIcons: () =>
      resolve(import("./Button-TextButtonsWithIcons.json")),
  },
  Card: {
    "ExpandableCards-js": () =>
      resolve(import("./Card-ExpandableCards-js.json")),
    ExpandableCards: () => resolve(import("./Card-ExpandableCards.json")),
    "SimpleExample-js": () => resolve(import("./Card-SimpleExample-js.json")),
    SimpleExample: () => resolve(import("./Card-SimpleExample.json")),
    "WithActions-js": () => resolve(import("./Card-WithActions-js.json")),
    WithActions: () => resolve(import("./Card-WithActions.json")),
    "WithMedia-js": () => resolve(import("./Card-WithMedia-js.json")),
    WithMedia: () => resolve(import("./Card-WithMedia.json")),
  },
  Chip: {
    "ActionChips-js": () => resolve(import("./Chip-ActionChips-js.json")),
    ActionChips: () => resolve(import("./Chip-ActionChips.json")),
    "ChoiceChips-js": () => resolve(import("./Chip-ChoiceChips-js.json")),
    ChoiceChips: () => resolve(import("./Chip-ChoiceChips.json")),
    "FilterChips-js": () => resolve(import("./Chip-FilterChips-js.json")),
    FilterChips: () => resolve(import("./Chip-FilterChips.json")),
    "InputChips-js": () => resolve(import("./Chip-InputChips-js.json")),
    InputChips: () => resolve(import("./Chip-InputChips.json")),
    "SimpleChips-js": () => resolve(import("./Chip-SimpleChips-js.json")),
    SimpleChips: () => resolve(import("./Chip-SimpleChips.json")),
  },
  Dialog: {
    "AlertDialogsAndModals-js": () =>
      resolve(import("./Dialog-AlertDialogsAndModals-js.json")),
    AlertDialogsAndModals: () =>
      resolve(import("./Dialog-AlertDialogsAndModals.json")),
    "FixedDialogExample-js": () =>
      resolve(import("./Dialog-FixedDialogExample-js.json")),
    FixedDialogExample: () =>
      resolve(import("./Dialog-FixedDialogExample.json")),
    "FullPageExample-js": () =>
      resolve(import("./Dialog-FullPageExample-js.json")),
    FullPageExample: () => resolve(import("./Dialog-FullPageExample.json")),
    "NestedDialogs-js": () => resolve(import("./Dialog-NestedDialogs-js.json")),
    NestedDialogs: () => resolve(import("./Dialog-NestedDialogs.json")),
    "SimpleExample-js": () => resolve(import("./Dialog-SimpleExample-js.json")),
    SimpleExample: () => resolve(import("./Dialog-SimpleExample.json")),
    "SimpleListExample-js": () =>
      resolve(import("./Dialog-SimpleListExample-js.json")),
    SimpleListExample: () => resolve(import("./Dialog-SimpleListExample.json")),
  },
  Divider: {
    "HorizontalDividers-js": () =>
      resolve(import("./Divider-HorizontalDividers-js.json")),
    HorizontalDividers: () =>
      resolve(import("./Divider-HorizontalDividers.json")),
    "VerticalDividers-js": () =>
      resolve(import("./Divider-VerticalDividers-js.json")),
    VerticalDividers: () => resolve(import("./Divider-VerticalDividers.json")),
    "WithinLists-js": () => resolve(import("./Divider-WithinLists-js.json")),
    WithinLists: () => resolve(import("./Divider-WithinLists.json")),
  },
  Elevation: {
    "AllElevations-js": () =>
      resolve(import("./Elevation-AllElevations-js.json")),
    AllElevations: () => resolve(import("./Elevation-AllElevations.json")),
    "AnimatingElevation-js": () =>
      resolve(import("./Elevation-AnimatingElevation-js.json")),
    AnimatingElevation: () =>
      resolve(import("./Elevation-AnimatingElevation.json")),
  },
  ExpansionPanel: {
    "ConfiguringUsePanelsBehavior-js": () =>
      resolve(import("./ExpansionPanel-ConfiguringUsePanelsBehavior-js.json")),
    ConfiguringUsePanelsBehavior: () =>
      resolve(import("./ExpansionPanel-ConfiguringUsePanelsBehavior.json")),
    "SimpleExample-js": () =>
      resolve(import("./ExpansionPanel-SimpleExample-js.json")),
    SimpleExample: () => resolve(import("./ExpansionPanel-SimpleExample.json")),
    "SinglePanel-js": () =>
      resolve(import("./ExpansionPanel-SinglePanel-js.json")),
    SinglePanel: () => resolve(import("./ExpansionPanel-SinglePanel.json")),
  },
  Form: {
    "AsyncSwitchExample-js": () =>
      resolve(import("./Form-AsyncSwitchExample-js.json")),
    AsyncSwitchExample: () => resolve(import("./Form-AsyncSwitchExample.json")),
    "CheckboxAndRadioExamples-js": () =>
      resolve(import("./Form-CheckboxAndRadioExamples-js.json")),
    CheckboxAndRadioExamples: () =>
      resolve(import("./Form-CheckboxAndRadioExamples.json")),
    "CustomCheckboxes-js": () =>
      resolve(import("./Form-CustomCheckboxes-js.json")),
    CustomCheckboxes: () => resolve(import("./Form-CustomCheckboxes.json")),
    "CustomizingSelectOptions-js": () =>
      resolve(import("./Form-CustomizingSelectOptions-js.json")),
    CustomizingSelectOptions: () =>
      resolve(import("./Form-CustomizingSelectOptions.json")),
    "ExampleForm-js": () => resolve(import("./Form-ExampleForm-js.json")),
    ExampleForm: () => resolve(import("./Form-ExampleForm.json")),
    "FileInputExample-js": () =>
      resolve(import("./Form-FileInputExample-js.json")),
    FileInputExample: () => resolve(import("./Form-FileInputExample.json")),
    "IndeterminateCheckboxes-js": () =>
      resolve(import("./Form-IndeterminateCheckboxes-js.json")),
    IndeterminateCheckboxes: () =>
      resolve(import("./Form-IndeterminateCheckboxes.json")),
    "NativeSelectExample-js": () =>
      resolve(import("./Form-NativeSelectExample-js.json")),
    NativeSelectExample: () =>
      resolve(import("./Form-NativeSelectExample.json")),
    "SelectExample-js": () => resolve(import("./Form-SelectExample-js.json")),
    SelectExample: () => resolve(import("./Form-SelectExample.json")),
    "SimpleHelpAndErrorMessages-js": () =>
      resolve(import("./Form-SimpleHelpAndErrorMessages-js.json")),
    SimpleHelpAndErrorMessages: () =>
      resolve(import("./Form-SimpleHelpAndErrorMessages.json")),
    "SwitchExamples-js": () => resolve(import("./Form-SwitchExamples-js.json")),
    SwitchExamples: () => resolve(import("./Form-SwitchExamples.json")),
    "TextAreaExample-js": () =>
      resolve(import("./Form-TextAreaExample-js.json")),
    TextAreaExample: () => resolve(import("./Form-TextAreaExample.json")),
    "TextFieldExample-js": () =>
      resolve(import("./Form-TextFieldExample-js.json")),
    TextFieldExample: () => resolve(import("./Form-TextFieldExample.json")),
    "TextFieldTypes-js": () => resolve(import("./Form-TextFieldTypes-js.json")),
    TextFieldTypes: () => resolve(import("./Form-TextFieldTypes.json")),
    "WithReactHookForm-js": () =>
      resolve(import("./Form-WithReactHookForm-js.json")),
    WithReactHookForm: () => resolve(import("./Form-WithReactHookForm.json")),
  },
  Icon: {
    "IconSpacing-js": () => resolve(import("./Icon-IconSpacing-js.json")),
    IconSpacing: () => resolve(import("./Icon-IconSpacing.json")),
    "OverridingDefaultIcons-js": () =>
      resolve(import("./Icon-OverridingDefaultIcons-js.json")),
    OverridingDefaultIcons: () =>
      resolve(import("./Icon-OverridingDefaultIcons.json")),
    "SimpleExamples-js": () => resolve(import("./Icon-SimpleExamples-js.json")),
    SimpleExamples: () => resolve(import("./Icon-SimpleExamples.json")),
  },
  Layout: {
    "ConfigurableLayout-js": () =>
      resolve(import("./Layout-ConfigurableLayout-js.json")),
    ConfigurableLayout: () =>
      resolve(import("./Layout-ConfigurableLayout.json")),
  },
  Link: {
    "MaliciousTarget-js": () =>
      resolve(import("./Link-MaliciousTarget-js.json")),
    MaliciousTarget: () => resolve(import("./Link-MaliciousTarget.json")),
    "SimpleExamples-js": () => resolve(import("./Link-SimpleExamples-js.json")),
    SimpleExamples: () => resolve(import("./Link-SimpleExamples.json")),
    "ThirdPartyRoutingLibraries-js": () =>
      resolve(import("./Link-ThirdPartyRoutingLibraries-js.json")),
    ThirdPartyRoutingLibraries: () =>
      resolve(import("./Link-ThirdPartyRoutingLibraries.json")),
    "WithButtonStyles-js": () =>
      resolve(import("./Link-WithButtonStyles-js.json")),
    WithButtonStyles: () => resolve(import("./Link-WithButtonStyles.json")),
    "WithIcons-js": () => resolve(import("./Link-WithIcons-js.json")),
    WithIcons: () => resolve(import("./Link-WithIcons.json")),
  },
  List: {
    "NonInteractable-js": () =>
      resolve(import("./List-NonInteractable-js.json")),
    NonInteractable: () => resolve(import("./List-NonInteractable.json")),
    "SingleLineExamples-js": () =>
      resolve(import("./List-SingleLineExamples-js.json")),
    SingleLineExamples: () => resolve(import("./List-SingleLineExamples.json")),
    "ThreeLineExamples-js": () =>
      resolve(import("./List-ThreeLineExamples-js.json")),
    ThreeLineExamples: () => resolve(import("./List-ThreeLineExamples.json")),
    "TwoLineExamples-js": () =>
      resolve(import("./List-TwoLineExamples-js.json")),
    TwoLineExamples: () => resolve(import("./List-TwoLineExamples.json")),
  },
  MaterialIcons: {
    "AllIcons-js": () => resolve(import("./MaterialIcons-AllIcons-js.json")),
    AllIcons: () => resolve(import("./MaterialIcons-AllIcons.json")),
    "SimpleExamples-js": () =>
      resolve(import("./MaterialIcons-SimpleExamples-js.json")),
    SimpleExamples: () =>
      resolve(import("./MaterialIcons-SimpleExamples.json")),
  },
  Media: {
    "ForcedAspectRatio-js": () =>
      resolve(import("./Media-ForcedAspectRatio-js.json")),
    ForcedAspectRatio: () => resolve(import("./Media-ForcedAspectRatio.json")),
    "SimpleResponsiveMedia-js": () =>
      resolve(import("./Media-SimpleResponsiveMedia-js.json")),
    SimpleResponsiveMedia: () =>
      resolve(import("./Media-SimpleResponsiveMedia.json")),
    "WithOverlay-js": () => resolve(import("./Media-WithOverlay-js.json")),
    WithOverlay: () => resolve(import("./Media-WithOverlay.json")),
  },
  Menu: {
    "AccessibilityExample-js": () =>
      resolve(import("./Menu-AccessibilityExample-js.json")),
    AccessibilityExample: () =>
      resolve(import("./Menu-AccessibilityExample.json")),
    "AddingEventHandlers-js": () =>
      resolve(import("./Menu-AddingEventHandlers-js.json")),
    AddingEventHandlers: () =>
      resolve(import("./Menu-AddingEventHandlers.json")),
    "CustomRenderers-js": () =>
      resolve(import("./Menu-CustomRenderers-js.json")),
    CustomRenderers: () => resolve(import("./Menu-CustomRenderers.json")),
    "FixingOverflowIssues-js": () =>
      resolve(import("./Menu-FixingOverflowIssues-js.json")),
    FixingOverflowIssues: () =>
      resolve(import("./Menu-FixingOverflowIssues.json")),
    "HorizontalMenu-js": () => resolve(import("./Menu-HorizontalMenu-js.json")),
    HorizontalMenu: () => resolve(import("./Menu-HorizontalMenu.json")),
    "MenuPositioning-js": () =>
      resolve(import("./Menu-MenuPositioning-js.json")),
    MenuPositioning: () => resolve(import("./Menu-MenuPositioning.json")),
    "NestedDropdownMenus-js": () =>
      resolve(import("./Menu-NestedDropdownMenus-js.json")),
    NestedDropdownMenus: () =>
      resolve(import("./Menu-NestedDropdownMenus.json")),
    "SimpleContextMenu-js": () =>
      resolve(import("./Menu-SimpleContextMenu-js.json")),
    SimpleContextMenu: () => resolve(import("./Menu-SimpleContextMenu.json")),
    "SimpleExamples-js": () => resolve(import("./Menu-SimpleExamples-js.json")),
    SimpleExamples: () => resolve(import("./Menu-SimpleExamples.json")),
  },
  Overlay: {
    "CustomTheme-js": () => resolve(import("./Overlay-CustomTheme-js.json")),
    CustomTheme: () => resolve(import("./Overlay-CustomTheme.json")),
    "FixingOverflowIssues-js": () =>
      resolve(import("./Overlay-FixingOverflowIssues-js.json")),
    FixingOverflowIssues: () =>
      resolve(import("./Overlay-FixingOverflowIssues.json")),
    "SimpleExample-js": () =>
      resolve(import("./Overlay-SimpleExample-js.json")),
    SimpleExample: () => resolve(import("./Overlay-SimpleExample.json")),
  },
  Portal: {
    "CustomPortalContainer-js": () =>
      resolve(import("./Portal-CustomPortalContainer-js.json")),
    CustomPortalContainer: () =>
      resolve(import("./Portal-CustomPortalContainer.json")),
    "SimpleExample-js": () => resolve(import("./Portal-SimpleExample-js.json")),
    SimpleExample: () => resolve(import("./Portal-SimpleExample.json")),
  },
  Progress: {
    "SimpleDeterminateExamples-js": () =>
      resolve(import("./Progress-SimpleDeterminateExamples-js.json")),
    SimpleDeterminateExamples: () =>
      resolve(import("./Progress-SimpleDeterminateExamples.json")),
    "SimpleIndeterminateExamples-js": () =>
      resolve(import("./Progress-SimpleIndeterminateExamples-js.json")),
    SimpleIndeterminateExamples: () =>
      resolve(import("./Progress-SimpleIndeterminateExamples.json")),
    "SmallCircularProgress-js": () =>
      resolve(import("./Progress-SmallCircularProgress-js.json")),
    SmallCircularProgress: () =>
      resolve(import("./Progress-SmallCircularProgress.json")),
    "WithinButtons-js": () =>
      resolve(import("./Progress-WithinButtons-js.json")),
    WithinButtons: () => resolve(import("./Progress-WithinButtons.json")),
    "WithSuspense-js": () => resolve(import("./Progress-WithSuspense-js.json")),
    WithSuspense: () => resolve(import("./Progress-WithSuspense.json")),
  },
  Sheet: {
    "MobileActionSheet-js": () =>
      resolve(import("./Sheet-MobileActionSheet-js.json")),
    MobileActionSheet: () => resolve(import("./Sheet-MobileActionSheet.json")),
    "PositionExamples-js": () =>
      resolve(import("./Sheet-PositionExamples-js.json")),
    PositionExamples: () => resolve(import("./Sheet-PositionExamples.json")),
    "SheetSizing-js": () => resolve(import("./Sheet-SheetSizing-js.json")),
    SheetSizing: () => resolve(import("./Sheet-SheetSizing.json")),
  },
  States: {
    "CustomComponent-js": () =>
      resolve(import("./States-CustomComponent-js.json")),
    CustomComponent: () => resolve(import("./States-CustomComponent.json")),
    "CustomInteractions-js": () =>
      resolve(import("./States-CustomInteractions-js.json")),
    CustomInteractions: () =>
      resolve(import("./States-CustomInteractions.json")),
    "DisablingRippleEffect-js": () =>
      resolve(import("./States-DisablingRippleEffect-js.json")),
    DisablingRippleEffect: () =>
      resolve(import("./States-DisablingRippleEffect.json")),
    "SetupExample-js": () => resolve(import("./States-SetupExample-js.json")),
    SetupExample: () => resolve(import("./States-SetupExample.json")),
  },
  Table: {
    "DefaultStyles-js": () => resolve(import("./Table-DefaultStyles-js.json")),
    DefaultStyles: () => resolve(import("./Table-DefaultStyles.json")),
    "DefaultStylesConfigurable-js": () =>
      resolve(import("./Table-DefaultStylesConfigurable-js.json")),
    DefaultStylesConfigurable: () =>
      resolve(import("./Table-DefaultStylesConfigurable.json")),
    "SelectableRows-js": () =>
      resolve(import("./Table-SelectableRows-js.json")),
    SelectableRows: () => resolve(import("./Table-SelectableRows.json")),
    "SortableColumns-js": () =>
      resolve(import("./Table-SortableColumns-js.json")),
    SortableColumns: () => resolve(import("./Table-SortableColumns.json")),
    "StickyColumnsPart1-js": () =>
      resolve(import("./Table-StickyColumnsPart1-js.json")),
    StickyColumnsPart1: () =>
      resolve(import("./Table-StickyColumnsPart1.json")),
    "StickyColumnsPart2-js": () =>
      resolve(import("./Table-StickyColumnsPart2-js.json")),
    StickyColumnsPart2: () =>
      resolve(import("./Table-StickyColumnsPart2.json")),
    "StickyColumnsPart3-js": () =>
      resolve(import("./Table-StickyColumnsPart3-js.json")),
    StickyColumnsPart3: () =>
      resolve(import("./Table-StickyColumnsPart3.json")),
    "StickyColumnsPart4-js": () =>
      resolve(import("./Table-StickyColumnsPart4-js.json")),
    StickyColumnsPart4: () =>
      resolve(import("./Table-StickyColumnsPart4.json")),
  },
  Tabs: {
    "BasicUsage-js": () => resolve(import("./Tabs-BasicUsage-js.json")),
    BasicUsage: () => resolve(import("./Tabs-BasicUsage.json")),
    "ConfigurableTabs-js": () =>
      resolve(import("./Tabs-ConfigurableTabs-js.json")),
    ConfigurableTabs: () => resolve(import("./Tabs-ConfigurableTabs.json")),
    "PersistentTabs-js": () => resolve(import("./Tabs-PersistentTabs-js.json")),
    PersistentTabs: () => resolve(import("./Tabs-PersistentTabs.json")),
    "SimpleTwoPageTab-js": () =>
      resolve(import("./Tabs-SimpleTwoPageTab-js.json")),
    SimpleTwoPageTab: () => resolve(import("./Tabs-SimpleTwoPageTab.json")),
    "SwipeableTabs-js": () => resolve(import("./Tabs-SwipeableTabs-js.json")),
    SwipeableTabs: () => resolve(import("./Tabs-SwipeableTabs.json")),
  },
  Theme: {
    "SimpleExample-js": () => resolve(import("./Theme-SimpleExample-js.json")),
    SimpleExample: () => resolve(import("./Theme-SimpleExample.json")),
  },
  Tooltip: {
    "AdvancedAPIAndGotchas-js": () =>
      resolve(import("./Tooltip-AdvancedAPIAndGotchas-js.json")),
    AdvancedAPIAndGotchas: () =>
      resolve(import("./Tooltip-AdvancedAPIAndGotchas.json")),
    "AutoPositioningTooltips-js": () =>
      resolve(import("./Tooltip-AutoPositioningTooltips-js.json")),
    AutoPositioningTooltips: () =>
      resolve(import("./Tooltip-AutoPositioningTooltips.json")),
    "CommonPatterns-js": () =>
      resolve(import("./Tooltip-CommonPatterns-js.json")),
    CommonPatterns: () => resolve(import("./Tooltip-CommonPatterns.json")),
    "DenseTooltips-js": () =>
      resolve(import("./Tooltip-DenseTooltips-js.json")),
    DenseTooltips: () => resolve(import("./Tooltip-DenseTooltips.json")),
    "HoverMode-js": () => resolve(import("./Tooltip-HoverMode-js.json")),
    HoverMode: () => resolve(import("./Tooltip-HoverMode.json")),
    "LargeTooltips-js": () =>
      resolve(import("./Tooltip-LargeTooltips-js.json")),
    LargeTooltips: () => resolve(import("./Tooltip-LargeTooltips.json")),
    "SimpleExamples-js": () =>
      resolve(import("./Tooltip-SimpleExamples-js.json")),
    SimpleExamples: () => resolve(import("./Tooltip-SimpleExamples.json")),
  },
  Transition: {
    "ConfigurableCollapseExample-js": () =>
      resolve(import("./Transition-ConfigurableCollapseExample-js.json")),
    ConfigurableCollapseExample: () =>
      resolve(import("./Transition-ConfigurableCollapseExample.json")),
    "CrossFadeExamples-js": () =>
      resolve(import("./Transition-CrossFadeExamples-js.json")),
    CrossFadeExamples: () =>
      resolve(import("./Transition-CrossFadeExamples.json")),
    "CrossFadeHookExample-js": () =>
      resolve(import("./Transition-CrossFadeHookExample-js.json")),
    CrossFadeHookExample: () =>
      resolve(import("./Transition-CrossFadeHookExample.json")),
    "FixedPositioningExample-js": () =>
      resolve(import("./Transition-FixedPositioningExample-js.json")),
    FixedPositioningExample: () =>
      resolve(import("./Transition-FixedPositioningExample.json")),
    "ScaleTransitionExample-js": () =>
      resolve(import("./Transition-ScaleTransitionExample-js.json")),
    ScaleTransitionExample: () =>
      resolve(import("./Transition-ScaleTransitionExample.json")),
    "SimpleCollapseExample-js": () =>
      resolve(import("./Transition-SimpleCollapseExample-js.json")),
    SimpleCollapseExample: () =>
      resolve(import("./Transition-SimpleCollapseExample.json")),
    "UseCSSTransition-js": () =>
      resolve(import("./Transition-UseCSSTransition-js.json")),
    UseCSSTransition: () =>
      resolve(import("./Transition-UseCSSTransition.json")),
  },
  Tree: {
    "CustomizingTreeItems-js": () =>
      resolve(import("./Tree-CustomizingTreeItems-js.json")),
    CustomizingTreeItems: () =>
      resolve(import("./Tree-CustomizingTreeItems.json")),
    "MultiSelectTree-js": () =>
      resolve(import("./Tree-MultiSelectTree-js.json")),
    MultiSelectTree: () => resolve(import("./Tree-MultiSelectTree.json")),
    "SingleSelectTree-js": () =>
      resolve(import("./Tree-SingleSelectTree-js.json")),
    SingleSelectTree: () => resolve(import("./Tree-SingleSelectTree.json")),
  },
  Typography: {
    "TextContainerExamples-js": () =>
      resolve(import("./Typography-TextContainerExamples-js.json")),
    TextContainerExamples: () =>
      resolve(import("./Typography-TextContainerExamples.json")),
    "TextExamples-js": () =>
      resolve(import("./Typography-TextExamples-js.json")),
    TextExamples: () => resolve(import("./Typography-TextExamples.json")),
  },
  Utils: {
    "AppSizeListenerExample-js": () =>
      resolve(import("./Utils-AppSizeListenerExample-js.json")),
    AppSizeListenerExample: () =>
      resolve(import("./Utils-AppSizeListenerExample.json")),
    "GridListSize-js": () => resolve(import("./Utils-GridListSize-js.json")),
    GridListSize: () => resolve(import("./Utils-GridListSize.json")),
    "MaterialGridExample-js": () =>
      resolve(import("./Utils-MaterialGridExample-js.json")),
    MaterialGridExample: () =>
      resolve(import("./Utils-MaterialGridExample.json")),
    "MediaQueryComponents-js": () =>
      resolve(import("./Utils-MediaQueryComponents-js.json")),
    MediaQueryComponents: () =>
      resolve(import("./Utils-MediaQueryComponents.json")),
    "ResizeListenerExample-js": () =>
      resolve(import("./Utils-ResizeListenerExample-js.json")),
    ResizeListenerExample: () =>
      resolve(import("./Utils-ResizeListenerExample.json")),
    "ResizeObserverExample-js": () =>
      resolve(import("./Utils-ResizeObserverExample-js.json")),
    ResizeObserverExample: () =>
      resolve(import("./Utils-ResizeObserverExample.json")),
    "SimpleGridList-js": () =>
      resolve(import("./Utils-SimpleGridList-js.json")),
    SimpleGridList: () => resolve(import("./Utils-SimpleGridList.json")),
  },
};

export default sandboxes;
