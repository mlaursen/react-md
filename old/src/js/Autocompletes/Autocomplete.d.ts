import * as React from 'react';
import { Props, IdPropType } from '../index';
import {
  LayoverPositions,
  HorizontalAnchors,
  VerticalAnchors,
} from '../Helpers/Layover'
import { BaseMenuProps } from '../Menus'

type OnOffType = 'on' | 'off';

type DataType = Array<React.ReactElement<any> | string | number | { [dataLabel: string]: string | number }>;

export interface AutocompleteProps extends BaseMenuProps {
  menuId?: IdPropType;
  textFieldStyle?: React.CSSProperties;
  textFieldClassName?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  inlineSuggestionStyle?: React.CSSProperties;
  inlineSuggestionPadding?: number;
  inlineSuggestionClassName?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  dataLabel?: string;
  dataValue?: string;
  deleteKeys?: string | Array<string>;
  data: DataType;
  total?: number;
  offset?: number;
  filter?: null | ((data: DataType, filterText: string | number, dataLabel?: string) => Array<string>);
  inline?: boolean;
  findInlineSuggestion?: (data: DataType, value: string | number, dataLabel?: string) => string | number;
  autocompleteWithLabel?: boolean;
  onAutocomplete?: (suggestion: string | number, suggestionIndex: number, matches: DataType) => void;
  onChange?: (value: string, event: React.FormEvent<HTMLFormElement>) => void;
  clearOnAutocomplete?: boolean;
  focusInputOnAutocomplete?: boolean;
  onMenuOpen?: Function;
  onMenuClose?: Function;
  autoComplete?: OnOffType;
  position?: LayoverPositions;
  simplifiedMenu?: boolean;
  toolbar?: boolean;
  customSize?: string;
  inlineIndicator?: React.ReactElement<any>;
  helpText?: string;
  helpOnFocus?: boolean;
  error?: boolean;
}

interface AutocompleteComponent extends React.ComponentClass<AutocompleteProps> {
  Positions: {
    TOP_LEFT: 'tl',
    TOP_RIGHT: 'tr',
    BOTTOM_LEFT: 'bl',
    BOTTOM_RIGHT: 'br',
    BELOW: 'below'
  };
  VerticalAnchors: {
    TOP: 'top',
    CENTER: 'center',
    OVERLAP: 'overlap',
    BOTTOM: 'bottom'
  };
  HorizontalAnchors: {
    LEFT: 'left',
    INNER_LEFT: 'inner left',
    CENTER: 'center',
    RIGHT: 'right',
    INNER_RIGHT: 'inner right'
  };
  caseInsensitiveFilter(data: DataType, filterText: string | number, dataLabel?: string): Array<string>;
  fuzzyFilter(data: DataType, filterText: string | number, dataLabel?: string): Array<string>;
  findIgnoreCase(data: DataType, filterText: string, dataLabel?: string): string;
}

declare const Autocomplete: AutocompleteComponent;
export default Autocomplete;
