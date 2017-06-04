import asyncComponent from 'utils/asyncComponent';

export const Home = asyncComponent(() => System.import('components/Home'));
export const NotFound = asyncComponent(() => System.import('components/NotFound'));
export const Prerequisites = asyncComponent(() => System.import('components/GettingStarted/Prerequisites'));
export const Installation = asyncComponent(() => System.import('components/GettingStarted/Installation'));
export const Colors = asyncComponent(() => System.import('components/Customization/Colors'));
export const Themes = asyncComponent(() => System.import('components/Customization/Themes'));
export const Typography = asyncComponent(() => System.import('components/Customization/Typography'));
export const MediaQueries = asyncComponent(() => System.import('components/Customization/MediaQueries'));
export const MinimizingBundle = asyncComponent(() => System.import('components/Customization/MinimizingBundle'));
export const WhatsNew = asyncComponent(() => System.import('components/DiscoverMore/WhatsNew'));
export const UpgradeV030 = asyncComponent(() => System.import('components/DiscoverMore/UpgradeGuides/v0.3.0'));
export const UpgradeV100 = asyncComponent(() => System.import('components/DiscoverMore/UpgradeGuides/v1.0.0'));
export const UpgradeV110 = asyncComponent(() => System.import('components/DiscoverMore/UpgradeGuides/v1.1.0'));
export const Showcases = asyncComponent(() => System.import('components/DiscoverMore/Showcases'));
export const Community = asyncComponent(() => System.import('components/DiscoverMore/Community'));
export const Contributing = asyncComponent(() => System.import('components/DiscoverMore/Contributing'));
export const ExamplesPage = asyncComponent(() => System.import('components/ExamplesPage'));
