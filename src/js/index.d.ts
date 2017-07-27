import * as React from 'react';

export interface BaseProps {
  style?: React.CSSProperties;
  className?: string;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onDrag?: (event: React.MouseEvent<HTMLElement>) => void;
  onDragEnd?: (event: React.MouseEvent<HTMLElement>) => void;
  onDragEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onDragExit?: (event: React.MouseEvent<HTMLElement>) => void;
  onDragLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onDragOver?: (event: React.MouseEvent<HTMLElement>) => void;
  onDragStart?: (event: React.MouseEvent<HTMLElement>) => void;
  onDrop?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseMove?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseOut?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
  onTouchCancel?: (event: React.TouchEvent<HTMLElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
  onTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

export interface Props extends BaseProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export type IdPropType = number | string;
