/* eslint-disable max-len */
import asyncComponent from 'utils/asyncComponent';

export const Home = asyncComponent(() => import(/* webpackChunkName: Home */ 'components/Home'));
export const NotFound = asyncComponent(() => import(/* webpackChunkName: NotFound */ 'components/NotFound'));
export const GettingStarted = asyncComponent(() => import(/* webpackChunkName: GettingStarted */ 'components/GettingStarted'));
export const Colors = asyncComponent(() => import(/* webpackChunkName: Colors */ 'components/Customization/Colors'));
export const Themes = asyncComponent(() => import(/* webpackChunkName: Themes */ 'components/Customization/Themes'));
export const ThemeBuilder = asyncComponent(() => import(/* webpackChunkName: ThemeBuilder */ 'components/Customization/ThemeBuilder'));
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
export const Testing = asyncComponent(() => import(/* webpackChunkName: Testing */ 'components/DiscoverMore/Testing'));

export const SassDocPage = asyncComponent(() => import(/* webpackChunkName: SassDocPage */ 'components/SassDocPage'));
export const PropTypesPage = asyncComponent(() => import(/* webpackChunkName: PropTypesPage */ 'components/PropTypesPage'));

// routing examples
export const BottomNavigationRouting = asyncComponent(() => import(/* webpackChunkName: BottomNavigationRouting */ 'components/Components/BottomNavigations/RoutingExample'));
export const DrawerRouting = asyncComponent(() => import(/* webpackChunkName: DrawerRouting */ 'components/Components/Drawers/RoutingExample'));
export const NavigationDrawerRouting = asyncComponent(() => import(/* webpackChunkName: NavigationDrawerRouting */ 'components/Components/NavigationDrawers/RoutingExample'));

// components
export const Autocompletes = asyncComponent(() => import(/* webpackChunkName: Autocompletes */ 'components/Components/Autocompletes'));
export const Avatars = asyncComponent(() => import(/* webpackChunkName: Avatars */ 'components/Components/Avatars'));
export const Badges = asyncComponent(() => import(/* webpackChunkName: Badges */ 'components/Components/Badges'));
export const BottomNavigations = asyncComponent(() => import(/* webpackChunkName: BottomNavigations */ 'components/Components/BottomNavigations'));
export const Buttons = asyncComponent(() => import(/* webpackChunkName: Buttons */ 'components/Components/Buttons'));
export const Cards = asyncComponent(() => import(/* webpackChunkName: Cards */ 'components/Components/Cards'));
export const Chips = asyncComponent(() => import(/* webpackChunkName: Chips */ 'components/Components/Chips'));
export const DataTables = asyncComponent(() => import(/* webpackChunkName: DataTables */ 'components/Components/DataTables'));
export const Dialogs = asyncComponent(() => import(/* webpackChunkName: Dialogs */ 'components/Components/Dialogs'));
export const Dividers = asyncComponent(() => import(/* webpackChunkName: Dividers */ 'components/Components/Dividers'));
export const Drawers = asyncComponent(() => import(/* webpackChunkName: Drawers */ 'components/Components/Drawers'));
export const ExpansionPanels = asyncComponent(() => import(/* webpackChunkName: ExpansionPanels */ 'components/Components/ExpansionPanels'));
export const FileInputs = asyncComponent(() => import(/* webpackChunkName: FileInputs */ 'components/Components/FileInputs'));
export const FontIcons = asyncComponent(() => import(/* webpackChunkName: FontIcons */ 'components/Components/FontIcons'));
export const Grids = asyncComponent(() => import(/* webpackChunkName: Grids */ 'components/Components/Grids'));
export const AccessibleFakeButtons = asyncComponent(() => import(/* webpackChunkName: AccessibleFakeButtons */ 'components/Components/Helpers/AccessibleFakeButtons'));
export const Collapses = asyncComponent(() => import(/* webpackChunkName: Collapses */ 'components/Components/Helpers/Collapses'));
export const FocusContainers = asyncComponent(() => import(/* webpackChunkName: FocusContainers */ 'components/Components/Helpers/FocusContainers'));
export const IconSeparators = asyncComponent(() => import(/* webpackChunkName: IconSeparators */ 'components/Components/Helpers/IconSeparators'));
export const Layovers = asyncComponent(() => import(/* webpackChunkName: Layovers */ 'components/Components/Helpers/Layovers'));
export const Portals = asyncComponent(() => import(/* webpackChunkName: Portals */ 'components/Components/Helpers/Portals'));
export const Inks = asyncComponent(() => import(/* webpackChunkName: Inks */ 'components/Components/Inks'));
export const Lists = asyncComponent(() => import(/* webpackChunkName: Lists */ 'components/Components/Lists'));
export const Media = asyncComponent(() => import(/* webpackChunkName: Media */ 'components/Components/Media'));
export const Menus = asyncComponent(() => import(/* webpackChunkName: Menus */ 'components/Components/Menus'));
export const NavigationDrawers = asyncComponent(() => import(/* webpackChunkName: NavigationDrawers */ 'components/Components/NavigationDrawers'));
export const Papers = asyncComponent(() => import(/* webpackChunkName: Papers */ 'components/Components/Papers'));
export const DatePickers = asyncComponent(() => import(/* webpackChunkName: DatePickers */ 'components/Components/Pickers/Date'));
export const TimePickers = asyncComponent(() => import(/* webpackChunkName: TimePickers */ 'components/Components/Pickers/Time'));
export const CircularProgress = asyncComponent(() => import(/* webpackChunkName: CircularProgress */ 'components/Components/Progress/Circular'));
export const LinearProgress = asyncComponent(() => import(/* webpackChunkName: LinearProgress */ 'components/Components/Progress/Linear'));
export const SelectFields = asyncComponent(() => import(/* webpackChunkName: SelectFields */ 'components/Components/SelectFields'));
export const SelectionControls = asyncComponent(() => import(/* webpackChunkName: SelectionControls */ 'components/Components/SelectionControls'));
export const Sliders = asyncComponent(() => import(/* webpackChunkName: Sliders */ 'components/Components/Sliders'));
export const Snackbars = asyncComponent(() => import(/* webpackChunkName: Snackbars */ 'components/Components/Snackbars'));
export const Subheaders = asyncComponent(() => import(/* webpackChunkName: Subheaders */ 'components/Components/Subheaders'));
export const SVGIcons = asyncComponent(() => import(/* webpackChunkName: SVGIcons */ 'components/Components/SVGIcons'));
export const Tabs = asyncComponent(() => import(/* webpackChunkName: Tabs */ 'components/Components/Tabs'));
export const TextFields = asyncComponent(() => import(/* webpackChunkName: TextFields */ 'components/Components/TextFields'));
export const Toolbars = asyncComponent(() => import(/* webpackChunkName: Toolbars */ 'components/Components/Toolbars'));
export const Tooltips = asyncComponent(() => import(/* webpackChunkName: Tooltips */ 'components/Components/Tooltips'));
