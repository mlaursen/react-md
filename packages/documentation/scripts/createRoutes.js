const fs = require('fs-extra');
const path = require('path');
const nodeGlob = require('glob');
const { promisify } = require('util');
const prettier = require('prettier');

const glob = promisify(nodeGlob);

const upperFirst = s => s.substring(0, 1).toUpperCase() + s.substring(1);
const toTitle = s => {
  switch (s) {
    case 'css-variables':
      return 'CSS Variables';
    case 'using-create-react-app':
      return 'Using create-react-app';
    default:
      return s
        .split('-')
        .map(upperFirst)
        .join(' ');
  }
};

const getChildren = route => toTitle(route.split('/').reverse()[0] || 'Home');
const getParentId = route => route.substring(0, route.lastIndexOf('/')) || null;

const INDEXES = {
  '': 0,
  'getting-started': 1,
  customization: 2,
  'divider-1': 3,
  references: 4,
  react: 5,
  'material-design': 6,
};

const getIndex = route => {
  const name = route.substring(route.lastIndexOf('/') + 1).trim();
  if (typeof INDEXES[name] === 'number') {
    return INDEXES[name];
  }

  const parentId = getParentId(route);
  if (typeof INDEXES[parentId] !== 'number') {
    INDEXES[parentId] = parentId === 'ROOT' ? 0 : -1;
  }

  return ++INDEXES[parentId];
};

const toJSX = s =>
  s.replace(/"(<[A-Z][A-z]+ \/>)"/g, '$1').replace(/"(<.+Logo .+ \/>)"/g, '$1');
const toIconImport = s => s.substring(1, s.indexOf(' '));
const ICONS = {
  '/': '<HomeSVGIcon />',
  '/getting-started': '<InfoOutlineSVGIcon />',
  '/customization': '<ColorLensSVGIcon />',
};

const createTreeItem = (route, container = false) => ({
  index: getIndex(route),
  parentId: getParentId(route),
  itemId: route,
  href: container ? undefined : route,
  children: getChildren(route),
  leftIcon: ICONS[route],
});

(async function() {
  const pages = await glob('pages/**/*.tsx');
  const routes = pages
    .filter(p => !/[A-Z]/.test(p))
    .map(p => {
      const updated = p
        .replace(/^pages/, '')
        .replace(/\.tsx$/, '')
        .replace(/\/?index$/, '/');

      return updated || '/';
    });

  const tree = routes.reduce((all, route) => {
    all[route] = createTreeItem(route);
    const { parentId } = all[route];
    if (parentId && !all[parentId]) {
      all[parentId] = createTreeItem(parentId, true);
    }

    return all;
  }, {});

  // External links and subheader
  tree['divider-1'] = {
    index: INDEXES['divider-1'],
    parentId: null,
    itemId: 'divider-1',
    divider: true,
  };
  tree.references = {
    index: INDEXES['references'],
    parentId: null,
    itemId: 'references',
    children: 'References',
    subheader: true,
  };
  tree.react = {
    index: INDEXES['react'],
    parentId: null,
    itemId: 'react',
    children: 'React',
    href: 'https://reactjs.org/',
    target: '_blank',
    leftIcon: "<ReactLogo className='rmd-icon rmd-icon--svg react-logo' />",
  };
  tree['material-design'] = {
    index: INDEXES['material-design'],
    parentId: null,
    itemId: 'material-design',
    children: 'Material Design',
    href: 'https://material.io/design/',
    target: '_blank',
    leftIcon:
      "<MaterialDesignLogo className='rmd-icon rmd-icon--svg materail-design-logo' />",
  };

  const constants = path.join(process.cwd(), 'constants');
  const routesFile = path.join(constants, 'routes.ts');
  const routesTreeFile = path.join(constants, 'routesTree.tsx');
  const config = await prettier.resolveConfig(routesFile);
  config.parser = config.parser || 'typescript';

  const routesContent = prettier.format(
    `/* this is an auto-generated file */
export default ${JSON.stringify(routes)};
`,
    config
  );

  const icons = Object.values(ICONS)
    .map(toIconImport)
    .join(', ');

  const routesTreeContent = prettier.format(
    `/* this is an auto-generated file */
import React, { ReactNode } from "react";
import { Avatar } from "@react-md/avatar";
import { ${icons} } from "@react-md/material-icons";
import { IFlattenedTree } from "@react-md/tree";

import { Component as ReactLogo } from 'svgs/reactLogo.svg';
import { Component as GoogleLogo } from 'svgs/googleLogo.svg';
import { Component as MaterialDesignLogo } from 'svgs/materialDesignLogo.svg';

export type RouteLink = {
  children: ReactNode;
  target?: string;
  href?: string;
  leftIcon?: ReactNode;
}

export type RouteSubheader = RouteLink & {
  subheader: true;
}

export type RouteDivider = { divider: true };
export type RoutesTreeData = ((RouteLink | RouteSubheader) | RouteDivider) & { index: number; };
export type RoutesTree = IFlattenedTree<RoutesTreeData>;

const tree: RoutesTree = ${toJSX(JSON.stringify(tree, null, 2))};

export default tree;
`,
    config
  );

  console.log(`Creating the following routes files:
 - ${routesFile}
 - ${routesTreeFile}
`);
  fs.writeFileSync(routesFile, routesContent, 'utf8');
  fs.writeFileSync(routesTreeFile, routesTreeContent, 'utf8');
})();
