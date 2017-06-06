/* eslint-disable global-require */
import syncComponent from 'utils/syncComponent';

export const Home = syncComponent('Home', require('components/Home'));
export const NotFound = syncComponent('NotFound', require('components/NotFound'));
export const GettingStarted = syncComponent('GettingStarted', require('components/GettingStarted'));
export const Colors = syncComponent('Colors', require('components/Customization/Colors'));
export const Themes = syncComponent('Themes', require('components/Customization/Themes'));
export const Typography = syncComponent('Typography', require('components/Customization/Typography'));
export const MediaQueries = syncComponent('MediaQueries', require('components/Customization/MediaQueries'));
export const MinimizingBundle = syncComponent('MinimizingBundle', require('components/Customization/MinimizingBundle'));
export const WhatsNew = syncComponent('WhatsNew', require('components/DiscoverMore/WhatsNew'));
export const UpgradeV030 = syncComponent('UpgradeV030', require('components/DiscoverMore/UpgradeGuides/v0.3.0'));
export const UpgradeV100 = syncComponent('UpgradeV100', require('components/DiscoverMore/UpgradeGuides/v1.0.0'));
export const UpgradeV110 = syncComponent('UpgradeV110', require('components/DiscoverMore/UpgradeGuides/v1.1.0'));
export const Showcases = syncComponent('Showcases', require('components/DiscoverMore/Showcases'));
export const Community = syncComponent('Community', require('components/DiscoverMore/Community'));
export const Contributing = syncComponent('Contributing', require('components/DiscoverMore/Contributing'));

// components
export const Autocompletes = syncComponent('Autocompletes', require('components/Components/autocompletes'));
