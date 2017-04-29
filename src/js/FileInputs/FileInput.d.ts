import * as React from 'react';
import { Props, IdPropType } from '../index';

export type FileReaderTypes = 'DataURL' | 'ArrayBuffer' | 'Text';

export interface FileInputProps extends Props {
  id: IdPropType;
  primary?: boolean;
  secondary?: boolean;
  flat?: boolean;
  accept?: string;
  multiple?: boolean;
  label?: React.ReactNode;
  iconBefore?: boolean;
  iconChildren?: React.ReactNode;
  iconClassName?: string;
  onChange: (files: File | Array<File> | null) => void;
  disabled?: boolean;
}

declare const FileInput: React.ComponentClass<FileInputProps>;
export default FileInput;
