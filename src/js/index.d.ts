import * as React from 'react';

export interface BaseProps {
  style?: React.CSSProperties;
  className?: string;
  onMouseUp?: (event: Event) => void;
  onMouseEnter?: (event: Event) => void;
  onMoueLeave?: (event: Event) => void;
  onMouseDown?: (event: Event) => void;
  onContextMenu?: (event: Event) => void;
  onDoubleClick?: (event: Event) => void;
  onDrag?: (event: Event) => void;
  onDragEnd?: (event: Event) => void;
  onDragEnter?: (event: Event) => void;
  onDragExit?: (event: Event) => void;
  onDragLeave?: (event: Event) => void;
  onDragOver?: (event: Event) => void;
  onDragStart?: (event: Event) => void;
  onDrop?: (event: Event) => void;
  onMouseMove?: (event: Event) => void;
  onMouseOut?: (event: Event) => void;
  onMouseOver?: (event: Event) => void;
  onTouchCancel?: (event: Event) => void;
  onTouchEnd?: (event: Event) => void;
  onTouchMove?: (event: Event) => void;
  onTouchStart?: (event: Event) => void;
  onKeyDown?: (event: Event) => void;
  onKeyUp?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  onBlur?: (event: Event) => void;
}

export interface Props extends BaseProps {
  onClick?: (event: Event) => void;
}
