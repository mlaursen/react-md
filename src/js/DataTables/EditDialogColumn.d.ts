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
  inlineIcon?: React.ReactElement<any>;
  defaultValue?: number | string;
  onChange?: (value: number | string, event: React.FormEvent<HTMLElement>) => void;
  large?: boolean;
  title?: React.ReactNode;
  onOkClick?: (value: number | string, event: React.MouseEvent<HTMLElement>) => void;
  okLabel?: React.ReactNode;
  okPrimary?: boolean;
  okSecondary?: boolean;
  okProps?: Object;
  onCancelClick?: (value: number | string, event: React.MouseEvent<HTMLElement>) => void;
  cancelLabel?: React.ReactNode;
  cancelPrimary?: boolean;
  cancelSecondary?: boolean;
  cancelProps?: Object;
  okOnOutsideClick?: boolean;
  onOutsideClick?: (event: React.MouseEvent<HTMLElement>) => void;
  closeOnOutsideClick?: boolean;
  animationPosition?: LayoverPositions;
  header?: boolean;
  cellIndex?: number;
  simplifiedDialog?: boolean;
  visibleOnFocus?: boolean;
  defaultVisible?: boolean;

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

  /**
   * @deprecated
   */
  inlineIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  inlineIconClassName?: string;

  /**
   * @deprecated
   */
  noIcon?: boolean;
}

declare const EditDialogColumn: React.ComponentClass<EditDialogColumnProps>;
export default EditDialogColumn;
