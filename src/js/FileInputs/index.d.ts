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

type ReadAs = (fileType: string, file: File, fileReader: FileReader) => void;

export interface FileUploadProps extends FileInputProps {
  maxSize?: number;
  readAs?: FileReaderTypes | ReadAs;
  onSizeError?: (errorFiles: Array<File>) => void;
  onAbort?: (file: File, event: Event) => void;
  onError?: (file: File, error: Error, event: Event) => void;
  onLoadStart?: (file: File, event: Event) => void;
  onLoadEnd?: (file: File, event: Event) => void;
  onLoad?: (file: File, result: string | ArrayBuffer, event: Event) => void;
  onProgress?: (file: File, progress: number, event: Event) => void;
}

export default class FileInput extends React.Component<FileInputProps, {}> { }
export { FileInput };
export class FileUpload extends React.Component<FileUploadProps, {}> {
  abort(file: string | File): void;
}
