/* eslint-disable max-len */
import asyncComponent from 'utils/asyncComponent';

export const Home = asyncComponent(() => import(/* webpackChunkName: Home */ 'components/Home'));
export const NotFound = asyncComponent(() => import(/* webpackChunkName: NotFound */ 'components/NotFound'));
export const GettingStarted = asyncComponent(() => import(/* webpackChunkName: GettingStarted */ 'components/GettingStarted'));
export const Colors = asyncComponent(() => import(/* webpackChunkName: Colors */ 'components/Customization/Colors'));
export const Themes = asyncComponent(() => import(/* webpackChunkName: Themes */ 'components/Customization/Themes'));
export const Typography = asyncComponent(() => import(/* webpackChunkName: Typography */ 'components/Customization/Typography'));
export const MediaQueries = asyncComponent(() => import(/* webpackChunkName: MediaQueries */ 'components/Customization/MediaQueries'));
export const MinimizingBundle = asyncComponent(() => import(/* webpackChunkName: MinimizingBundle */ 'components/Customization/MinimizingBundle'));
export const WhatsNew = asyncComponent(() => import(/* webpackChunkName: WhatsNew */ 'components/DiscoverMore/WhatsNew'));
export const UpgradeV030 = asyncComponent(() => import(/* webpackChunkName: UpgradeV030 */ 'components/DiscoverMore/UpgradeGuides/v0.3.0'));
export const UpgradeV100 = asyncComponent(() => import(/* webpackChunkName: UpgradeV100 */ 'components/DiscoverMore/UpgradeGuides/v1.0.0'));
export const UpgradeV110 = asyncComponent(() => import(/* webpackChunkName: UpgradeV110 */ 'components/DiscoverMore/UpgradeGuides/v1.1.0'));
export const Showcases = asyncComponent(() => import(/* webpackChunkName: Showcases */ 'components/DiscoverMore/Showcases'));
export const Community = asyncComponent(() => import(/* webpackChunkName: Community */ 'components/DiscoverMore/Community'));
export const Contributing = asyncComponent(() => import(/* webpackChunkName: Contributing */ 'components/DiscoverMore/Contributing'));

export const SassDocPage = asyncComponent(() => import(/* webpackChunkName: SassDocPage */ 'components/SassDocPage'));
export const PropTypesPage = asyncComponent(() => import(/* webpackChunkName: PropTypesPage */ 'components/PropTypesPage'));

// routing examples
export const BottomNavigationRouting = asyncComponent(() => import(/* webpackChunkName: BottomNavigationRouting */ 'components/Components/bottom-navigations/RoutingExample'));
export const DrawerRouting = asyncComponent(() => import(/* webpackChunkName: DrawerRouting */ 'components/Components/drawers/RoutingExample'));
export const NavigationDrawerRouting = asyncComponent(() => import(/* webpackChunkName: NavigationDrawerRouting */ 'components/Components/navigation-drawers/RoutingExample'));

// components
export const Autocompletes = asyncComponent(() => import(/* webpackChunkName: Autocompletes */ 'components/Components/autocompletes'));
export const Avatars = asyncComponent(() => import(/* webpackChunkName: Avatars */ 'components/Components/avatars'));
export const Badges = asyncComponent(() => import(/* webpackChunkName: Badges */ 'components/Components/badges'));
export const BottomNavigations = asyncComponent(() => import(/* webpackChunkName: BottomNavigations */ 'components/Components/bottom-navigations'));
export const Buttons = asyncComponent(() => import(/* webpackChunkName: Buttons */ 'components/Components/buttons'));
export const Cards = asyncComponent(() => import(/* webpackChunkName: Cards */ 'components/Components/cards'));
export const Chips = asyncComponent(() => import(/* webpackChunkName: Chips */ 'components/Components/chips'));
export const DataTables = asyncComponent(() => import(/* webpackChunkName: DataTables */ 'components/Components/data-tables'));
export const Dialogs = asyncComponent(() => import(/* webpackChunkName: Dialogs */ 'components/Components/dialogs'));
export const Dividers = asyncComponent(() => import(/* webpackChunkName: Dividers */ 'components/Components/dividers'));
export const Drawers = asyncComponent(() => import(/* webpackChunkName: Drawers */ 'components/Components/drawers'));
export const ExpansionPanels = asyncComponent(() => import(/* webpackChunkName: ExpansionPanels */ 'components/Components/expansion-panels'));
export const FileInputs = asyncComponent(() => import(/* webpackChunkName: FileInputs */ 'components/Components/file-inputs'));
export const FontIcons = asyncComponent(() => import(/* webpackChunkName: FontIcons */ 'components/Components/font-icons'));
export const AccessibleFakeButtons = asyncComponent(() => import(/* webpackChunkName: AccessibleFakeButtons */ 'components/Components/helpers/accessible-fake-buttons'));
export const Collapses = asyncComponent(() => import(/* webpackChunkName: Collapses */ 'components/Components/helpers/collapses'));
export const FocusContainers = asyncComponent(() => import(/* webpackChunkName: FocusContainers */ 'components/Components/helpers/focus-containers'));
export const IconSeparators = asyncComponent(() => import(/* webpackChunkName: IconSeparators */ 'components/Components/helpers/icon-separators'));
export const Layovers = asyncComponent(() => import(/* webpackChunkName: Layovers */ 'components/Components/helpers/layovers'));
export const Portals = asyncComponent(() => import(/* webpackChunkName: Portals */ 'components/Components/helpers/portals'));
export const Inks = asyncComponent(() => import(/* webpackChunkName: Inks */ 'components/Components/inks'));
export const Lists = asyncComponent(() => import(/* webpackChunkName: Lists */ 'components/Components/lists'));
export const Media = asyncComponent(() => import(/* webpackChunkName: Media */ 'components/Components/media'));
export const Menus = asyncComponent(() => import(/* webpackChunkName: Menus */ 'components/Components/menus'));
export const NavigationDrawers = asyncComponent(() => import(/* webpackChunkName: NavigationDrawers */ 'components/Components/navigation-drawers'));
export const Papers = asyncComponent(() => import(/* webpackChunkName: Papers */ 'components/Components/papers'));
export const DatePickers = asyncComponent(() => import(/* webpackChunkName: DatePickers */ 'components/Components/pickers/date'));
export const TimePickers = asyncComponent(() => import(/* webpackChunkName: TimePickers */ 'components/Components/pickers/time'));
export const CircularProgress = asyncComponent(() => import(/* webpackChunkName: CircularProgress */ 'components/Components/progress/circular'));
export const LinearProgress = asyncComponent(() => import(/* webpackChunkName: LinearProgress */ 'components/Components/progress/linear'));
export const SelectFields = asyncComponent(() => import(/* webpackChunkName: SelectFields */ 'components/Components/select-fields'));
export const SelectionControls = asyncComponent(() => import(/* webpackChunkName: SelectionControls */ 'components/Components/selection-controls'));
export const Sliders = asyncComponent(() => import(/* webpackChunkName: Sliders */ 'components/Components/sliders'));
export const Snackbars = asyncComponent(() => import(/* webpackChunkName: Snackbars */ 'components/Components/snackbars'));
export const Subheaders = asyncComponent(() => import(/* webpackChunkName: Subheaders */ 'components/Components/subheaders'));
export const Tabs = asyncComponent(() => import(/* webpackChunkName: Tabs */ 'components/Components/tabs'));
export const TextFields = asyncComponent(() => import(/* webpackChunkName: TextFields */ 'components/Components/text-fields'));
export const Toolbars = asyncComponent(() => import(/* webpackChunkName: Toolbars */ 'components/Components/toolbars'));
export const Tooltips = asyncComponent(() => import(/* webpackChunkName: Tooltips */ 'components/Components/tooltips'));
