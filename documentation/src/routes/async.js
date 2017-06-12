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

// components
export const Autocompletes = asyncComponent(() => import(/* webpackChunkName: Autocompletes */ 'components/Components/autocompletes'));
