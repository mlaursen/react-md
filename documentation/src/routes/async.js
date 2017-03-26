/* eslint-disable import/prefer-default-export */
import asyncComponent from 'utils/asyncComponent';


export const Home = asyncComponent(() => System.import('components/Home'));
