import * as React from 'react';

export interface BaseProps {
  style?: React.CSSProperties;
  className?: string;
  onMouseUp?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onDrag?: (event: React.MouseEvent) => void;
  onDragEnd?: (event: React.MouseEvent) => void;
  onDragEnter?: (event: React.MouseEvent) => void;
  onDragExit?: (event: React.MouseEvent) => void;
  onDragLeave?: (event: React.MouseEvent) => void;
  onDragOver?: (event: React.MouseEvent) => void;
  onDragStart?: (event: React.MouseEvent) => void;
  onDrop?: (event: React.MouseEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  onMouseOut?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  onTouchCancel?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

export interface Props extends BaseProps {
  onClick?: (event: React.MouseEvent) => void;
}

export type IdPropType = number | string;
