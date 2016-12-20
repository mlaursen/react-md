import * as React from 'react';
import ReactMD from '../index';

type OnOffType = 'on' | 'off';

interface AutocompleteProps extends ReactMD.Props {
  textFieldStyle?: React.CSSProperies;
  textFieldClassName?: string;
  inputStyle?: React.CSSProperies;
  inputClassName?: string;
  listStyle?: React.CSSProperies;
  listClassName?: string;
  disabled?: boolean;
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  dataLabel: string;
  dataValue: string;
  deleteKeys?: string | Array<string>;
  data: Array<React.ReactElement> | Array<string> | Array<number>; // Array<shape?>
  filter?: Function;
  block?: boolean;
  fullWidth?: boolean;
  inline?: boolean;
  findInlineSuggestion?: Function;
  onAutocomplete?: Function;
  clearOnAutocomplete?: boolean;
  onMenuOpen?: Function;
  onMenuClose?: Function;
  autoComplete?: OnOffType;
}

export default class Autocomplete extends React.Component<AutocompleteProps, {}> { }
