#!/usr/bin/env node
'use strict'; // eslint-disable-line strict

const fs = require('fs-extra');
const path = require('path');
const pluralize = require('pluralize');
const replace = require('replace');
const docgen = require('react-docgen');

const reactMD = path.resolve(process.cwd(), '..', 'src', 'js');

const docgens = {};

[
  'Autocompletes/Autocomplete',
  'Avatars/Avatar',
  'BottomNavigations/BottomNavigation',
  'Buttons/Button',
  'Cards/Card',
  'Cards/CardActionOverlay',
  'Cards/CardActions',
  'Cards/CardMedia',
  // 'Cards/CardExpander',
  'Cards/CardText',
  'Cards/CardTitle',
  'Chips/Chip',
  'DataTables/DataTable',
  'DataTables/TableBody',
  'DataTables/TableColumn',
  'DataTables/TableHeader',
  'DataTables/TableRow',
  'DataTables/EditDialogColumn',
  'Dialogs/DialogContainer',
  'Dividers/Divider',
  'ExpansionPanels/ExpansionPanel',
  'ExpansionPanels/ExpansionList',
  'FABTransitions/SpeedDial',
  'FileInputs/FileInput',
  'FileInputs/FileUpload',
  'FontIcons/FontIcon',
  'Inks/Ink',
  'Helpers/AccessibleFakeButton',
  'Helpers/FocusContainer',
  'Helpers/IconSeparator',
  'Lists/List',
  'Lists/ListItem',
  // 'Lists/ListItemControl',
  'Menus/Menu',
  'Menus/MenuButton',
  'NavigationDrawers/NavigationDrawer',
  'Papers/Paper',
  'Pickers/DatePickerContainer',
  'Pickers/TimePickerContainer',
  'Progress/CircularProgress',
  'Progress/LinearProgress',
  'SelectFields/SelectField',
  'SelectionControls/SelectionControl',
  'SelectionControls/SelectionControlGroup',
  'SelectionControls/Checkbox',
  'SelectionControls/Radio',
  'SelectionControls/Switch',
  'Sidebars/Sidebar',
  'Sliders/Slider',
  'Snackbars/Snackbar',
  'Subheaders/Subheader',
  'Tabs/Tab',
  'Tabs/Tabs',
  'TextFields/TextField',
  'Toolbars/Toolbar',
  'Tooltips/Tooltip',
].forEach(filePath => {
  const component = filePath.substring(filePath.indexOf('/') + 1, filePath.length);
  const sourceFolder = filePath.substring(0, filePath.indexOf('/'));
  let folder = sourceFolder.split(/(?=[A-Z]+[^A-Z])/)
    .reduce((prev, curr) => {
      const prefix = curr.length === 1 || !prev ? '' : '-';
      return prev + prefix + curr.toLowerCase();
    }, '');

  if (component.match('Picker')) {
    folder = 'pickers/' + component.replace('PickerContainer', '').toLowerCase();
  } else if (folder === 'progress') {
    folder += '/' + component.replace('Progress', '').toLowerCase();
  } else if (component.match(/Checkbox|Switch|Radio/)) {
    folder += '/' + pluralize(component).toLowerCase();
  } else if (folder.match(/helpers/)) {
    folder += '/' + pluralize(component).split(/(?=[A-Z])/).join('-').toLowerCase();
  }

  let file = component;
  let temp, regex;
  if (file.match(/Ink|Tooltip/)) {
    temp = component;
    file = `inject${component}`;
    regex = /ComposedComponent => /;
  } else if (file.match(/Picker/)) {
    temp = '.' + component.replace('Container', '');
    regex = /DateTimeFormat: DateTimeFormat,/;
  }

  if (temp) {
    const from = path.resolve(reactMD, sourceFolder, file + '.js');
    if (temp.match(/Ink/)) {
      temp = `_${temp}`;
    }

    temp = path.resolve(reactMD, sourceFolder, temp + '.js');
    fs.copySync(from, temp);

    if (regex) {
      replace({
        regex,
        replacement: '',
        paths: [temp],
        silent: true,
      });
    }
  }

  const rawFile = fs.readFileSync(path.resolve(reactMD, sourceFolder, temp || file + '.js'));
  try {
    const generated = docgen.parse(rawFile, docgen.resolver.findAllComponentDefinitions)[0];
    generated.source = `src/js/${sourceFolder}/${file}.js`;
    generated.component = component.replace(/(?=Focus)Container/, '');
    generated.methods = generated.methods.filter(method => method.name.charAt(0) !== '_');
    Object.keys(generated.props).forEach(key => {
      if (key.charAt(0) === '_' || generated.props[key].description.match(/@access private/)) {
        delete generated.props[key];
      }
    });


    docgens[folder] = docgens[folder] || {
      name: generated.component.replace('Group', ''),
      docgens: [],
    };

    docgens[folder].docgens.push(generated);
  } catch (e) {
    console.log('e:', e);
    console.log('Failed to parse: ', file);
  }

  if (temp) {
    fs.unlinkSync(temp);
  }
});

Object.keys(docgens).forEach(folder => {
  const docgen = docgens[folder];
  fs.outputFile(
    path.resolve(process.cwd(), 'src', 'docgens', docgen.name + 'Docgen.json'),
    JSON.stringify(docgen.docgens)
  );
});
