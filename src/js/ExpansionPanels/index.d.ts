import * as React from 'react';
import { Props } from '../index';

import { ButtonTypes } from '../Buttons';

export interface ExpansionPanelProps extends Props {
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
  contentStyle?: React.CSSProperties;
  contentClassName: string;
  label: React.ReactNode;
  secondaryLabel?: React.ReactNode;
  expandedSecondaryLabel?: React.ReactNode;
  component?: Function | string;
  expanded?: boolean;
  defaultExpanded?: boolean;
  expandIconChildren?: React.ReactNode;
  expandIconClassName?: string;
  focused?: boolean;
  columnWidths?: Array<number>;
  onExpandToggle?: (expanded: boolean) => void;
  onSave?: (event: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (event: React.MouseEvent<HTMLElement>) => void;
  closeOnSave?: boolean;
  closeOnCancel?: boolean;
  saveType?: ButtonTypes;
  saveLabel?: string;
  savePrimary?: boolean;
  saveSecondary?: boolean;
  cancelType?: ButtonTypes;
  cancelLabel?: string;
  cancelPrimary?: boolean;
  cancelSecondary?: boolean;
  tabIndex?: number;
  children?: React.ReactNode;
  animateContent?: boolean;
}

export interface ExpansionListProps extends Props {
  component?: Function | string;
  children?: React.ReactNode;
  animateContent?: boolean;
}

export default class ExpansionPanel extends React.Component<ExpansionPanelProps, {}> { }
export { ExpansionPanel };
export class ExpansionList extends React.Component<ExpansionListProps, {}> { }
