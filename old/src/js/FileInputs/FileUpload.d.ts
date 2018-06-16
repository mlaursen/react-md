import { FileReaderTypes, FileInputProps } from './FileInput';

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

export interface FileUploadComponent extends React.ComponentClass<FileUploadProps> {
  abort(file: string | File): void;
}

declare const FileUpload: FileUploadComponent;
export default FileUpload;
