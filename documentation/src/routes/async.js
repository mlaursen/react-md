/* eslint-disable import/prefer-default-export */
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
