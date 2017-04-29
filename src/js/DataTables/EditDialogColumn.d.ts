import * as React from 'react';
import { Props, IdPropType } from '../index';
import { InjectedTooltipProps } from '../Tooltips';
import { SharedTextFieldProps } from '../TextFields';
import { SharedLayoverProps, LayoverPositions } from '../Helpers/Layover';

export interface EditDialogColumnProps extends SharedLayoverProps, InjectedTooltipProps, SharedTextFieldProps {
  dialogId?: IdPropType;
  layoverStyle?: React.CSSProperties;
  layoverClassName?: string;
  dialogStyle?: React.CSSProperties;
  dialogClassName?: string;
  dialogContentStyle?: React.CSSProperties;
  dialogContentClassName?: string;
  textFieldStyle?: React.CSSProperties;
  textFieldClassName?: string;
  inline?: boolean;
  defaultValue?: number | string;
  onChange?: (value: number | string, event: React.FormEvent<HTMLElement>) => void;
  large?: boolean;
  title?: React.ReactNode;
  inlineIconChildren?: React.ReactNode;
  inlineIconClassName?: string;
  noIcon?: boolean;
  onOkClick?: (value: number | string, event: React.MouseEvent<HTMLElement>) => void;
  okLabel?: React.ReactNode;
  okPrimary?: boolean;
  okSecondary?: boolean;
  onCancelClick?: (value: number | string, event: React.MouseEvent<HTMLElement>) => void;
  cancelLabel?: React.ReactNode;
  cancelPrimary?: boolean;
  cancelSecondary?: boolean;
  okOnOutsideClick?: boolean;
  onOutsideClick?: (event: React.MouseEvent<HTMLElement>) => void;
  closeOnOutsideClick?: boolean;
  animationPosition?: LayoverPositions;
  header?: boolean;
  cellIndex?: number;

  /**
   * @deprecated
   */
  enforceMinWidth?: boolean;

  /**
   * @deprecated
   */
  scrollThreshold?: number;

  /**
   * @deprecated
   */
  transitionDuration?: number;
}

declare const EditDialogColumn: React.ComponentClass<EditDialogColumnProps>;
export default EditDialogColumn;
