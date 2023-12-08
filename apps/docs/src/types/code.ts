export interface RunnableCodePreviewOptions {
  card?: boolean;
  phone?: boolean;
}

export interface RunnableCodePreviewContainerOptions {
  transparent?: boolean;
}

export interface CodeJsxProps
  extends RunnableCodePreviewOptions,
    RunnableCodePreviewContainerOptions {
  preview?: boolean;
  editable?: boolean;
  fileName?: string;
}
