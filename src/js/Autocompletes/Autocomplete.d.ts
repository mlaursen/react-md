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
  filter?: (data: DataType, filterText: string | number, dataLabel?: string) => Array<string>;
  fullWidth?: boolean;
  inline?: boolean;
  findInlineSuggestion?: (data: DataType, value: string | number, dataLabel?: string) => string | number;
  autocompleteWithLabel?: boolean;
  onAutocomplete?: (suggestion: string | number, suggestionIndex: number, matches: DataType) => void;
  onChange?: (value: string, event: React.FormEvent<HTMLFormElement>) => void;
  clearOnAutocomplete?: boolean;
  onMenuOpen?: Function;
  onMenuClose?: Function;
  autoComplete?: OnOffType;
  position?: LayoverPositions;
  simplifiedMenu?: boolean;
}

interface AutocompleteComponent extends React.ComponentClass<AutocompleteProps> {
  Positions: LayoverPositions;
  HorizontalAnchors: HorizontalAnchors;
  VerticalAnchors: VerticalAnchors;
  caseInsensitiveFilter(data: DataType, filterText: string | number, dataLabel?: string): Array<string>;
  fuzzyFilter(data: DataType, filterText: string | number, dataLabel?: string): Array<string>;
  findIgnoreCase(data: DataType, filterText: string, dataLabel?: string): string;
}

declare const Autocomplete: AutocompleteComponent;
export default Autocomplete;
