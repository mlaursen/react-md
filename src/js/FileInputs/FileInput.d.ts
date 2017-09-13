import * as React from 'react';
import { Props, IdPropType } from '../index';

export type FileReaderTypes = 'DataURL' | 'ArrayBuffer' | 'Text';

export interface FileInputProps extends Props {
  id: IdPropType;
  name?: IdPropType;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  primary?: boolean;
  secondary?: boolean;
  flat?: boolean;
  accept?: string;
  multiple?: boolean;
  label?: React.ReactNode;
  icon?: React.ReactElement<any>;
  iconBefore?: boolean;
  onChange: (files: File | Array<File> | null) => void;
  disabled?: boolean;
  swapTheming?: boolean;
  allowDuplicates?: boolean;

  /**
   * @deprecated
   */
  iconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  iconClassName?: string;
}

declare const FileInput: React.ComponentClass<FileInputProps>;
export default FileInput;
