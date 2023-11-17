export interface RunnableCodePreviewOptions {
  card?: boolean;
  phone?: boolean;
}

export interface CodeJsxProps extends RunnableCodePreviewOptions {
  preview?: boolean;
  editable?: boolean;
  fileName?: string;
}
