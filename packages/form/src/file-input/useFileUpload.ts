import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { nanoid } from "nanoid";
import { omit } from "@react-md/utils";

import {
  CompletedFileUploadStats,
  getFileParser as defaultGetFileParser,
  FileAccessError,
  FileReaderResult,
  FileUploadHandlers,
  FileUploadStats,
  FileValidationError,
  FilesValidator,
  GetFileParser,
  ProcessingFileUploadStats,
  validateFiles as defaultValidateFiles,
  FileValidationOptions,
} from "./utils";

/**
 *
 * @typeParam CustomError - An optional error type that gets returned from the
 * {@link FilesValidator}.
 * @remarks \@since 2.9.0
 */
export interface FileUploadState<CustomError = never> {
  /**
   * All the files that have been validated and are either:
   * - pending upload
   * - uploading
   * - complete
   *
   * Each key in this object is the {@link BaseFileUploadStats.key} generated
   * once the upload starts pending.
   */
  stats: Record<string, FileUploadStats>;

  /**
   * A list of validation errors that have occurred before starting the upload
   * process.
   *
   * @see {@link FileAccessError}
   * @see {@link TooManyFilesError}
   * @see {@link FileValidationError}
   */
  errors: readonly FileValidationError<CustomError>[];
}

/**
 *
 * @typeParam CustomError - An optional error type that gets returned from the
 * {@link FilesValidator}.
 * @remarks \@since 2.9.0
 * @internal
 */
export interface FileUploadHookState<CustomError = never>
  extends FileUploadState<CustomError> {
  /**
   * All the current readers used for uploading files to the browser.
   *
   * Note: Once an upload has completed, the reader will be removed.
   */
  readers: Record<string, FileReader>;
}

/**
 *
 * @typeParam E - An optional HTMLElement type that is used for the
 * {@link FileUploadHandlers}.
 * @typeParam CustomError - An optional error type that gets returned from the
 * {@link FilesValidator}.
 * @remarks \@since 2.9.0
 */
export interface FileUploadOptions<E extends HTMLElement, CustomError = never>
  extends FileUploadHandlers<E>,
    FileValidationOptions {
  /**
   * Setting this value to a number greater than `0` will update the browser
   * upload process to queue the uploads in chunks instead of all at once. This
   * can help prevent the browser from freezing if dealing with large files that
   * are being converted to data urls.
   *
   * @defaultValue `-1`
   */
  concurrency?: number;

  /** {@inheritDoc FilesValidator} */
  validateFiles?: FilesValidator<CustomError>;
  /** {@inheritDoc GetFileParser} */
  getFileParser?: GetFileParser;
}

/** @internal */
type Action<E = never> =
  | {
      type: "queue";
      errors: readonly FileValidationError<E>[];
      files: readonly File[];
    }
  | { type: "reset" }
  | { type: "remove"; files: readonly string[] }
  | { type: "start"; key: string; reader: FileReader }
  | { type: "progress"; key: string; progress: number }
  | { type: "complete"; key: string; result: FileReaderResult }
  | { type: "clearErrors" };

/** @remarks \@since 2.9.0 */
export interface FileUploadActions {
  /**
   * Reset everything related to uploads ensuring that all file readers have
   * been aborted.
   */
  reset(): void;

  /**
   * Removes all the errors that exist in state without cancelling any of the
   * uploads already in progress.
   */
  clearErrors(): void;

  /**
   * This function is used to cancel pending and uploading files or removing
   * completed files.
   *
   * @param keyOrKeys - A single or list of {@link BaseFileUploadStats.key} to
   * remove from state.
   */
  remove(keyOrKeys: string | readonly string[]): void;
}

/**
 *
 * @typeParam E - An optional HTMLElement type that is used for the
 * {@link FileUploadHandlers}.
 * @typeParam CustomError - An optional error type that gets returned from the
 * {@link FilesValidator}.
 * @remarks \@since 2.9.0
 */
export interface FileUploadHookReturnValue<
  E extends HTMLElement = HTMLElement,
  CustomError = never
> extends FileUploadActions,
    Required<FileUploadHandlers<E>> {
  /** {@inheritDoc FileUploadState.errors} */
  errors: readonly FileValidationError<CustomError>[];

  /**
   * A list of all the {@link FileUploadStats}.
   *
   * @see {@link getSplitFileUploads} for separating by status
   */
  stats: readonly FileUploadStats[];

  /**
   * The total number of bytes for all the files that exist in the
   * {@link stats} list.
   */
  totalBytes: number;

  /**
   * The total number of files in the {@link stats} list.
   */
  totalFiles: number;

  /**
   * An `accept` string that can be passed to the {@link FileInput} component
   * when the {@link FileValidationOptions.extensions} list has been provided to
   * limit which files the OS will _attempt_ to allow access to.
   *
   * @example
   * Simple example
   * ```ts
   * const extensions = ['pdf', 'docx', 'ppt'];
   * const { accept } = useFileUpload({ extensions, ...others });
   *
   * expect(accept).toBe("*.pdf,*.docx,*.ppt")
   * ```
   *
   * @defaultValue `"*"`
   */
  accept: string;
}

/** @internal */
const DEFAULT_EXTENSIONS = [] as const;

/**
 * This hook is generally used to upload files **to the browser** in different
 * formats to be previewed `<img>`, `<video>`, `<embed>`, etc tags. However, it
 * can also be used to upload the files as an `ArrayBuffer` and then uploaded to
 * a server.
 *
 * Note: If using the `aws-sdk` to upload files directly to S3, **do not use
 * this hook** since it uses its own upload process.
 *
 * @typeParam E - An optional HTMLElement type that is used for the
 * {@link FileUploadHandlers}.
 * @typeParam CustomError - An optional error type that gets returned from the
 * {@link FilesValidator}.
 * @param options - All the {@link FileUploadOptions}
 * @returns the {@link FileUploadHookReturnValue}
 * @remarks \@since 2.9.0
 */
export function useFileUpload<E extends HTMLElement, CustomError = never>({
  maxFiles = -1,
  extensions = DEFAULT_EXTENSIONS,
  minFileSize = -1,
  maxFileSize = -1,
  totalFileSize = -1,
  concurrency = -1,
  onDrop: propOnDrop,
  onChange: propOnChange,
  validateFiles = defaultValidateFiles,
  getFileParser = defaultGetFileParser,
}: FileUploadOptions<E, CustomError> = {}): FileUploadHookReturnValue<
  E,
  CustomError
> {
  const [state, dispatch] = useReducer(
    function reducer(
      state: FileUploadHookState<CustomError>,
      action: Action<CustomError>
    ) {
      switch (action.type) {
        case "reset":
          return {
            stats: {},
            errors: [],
            readers: {},
          };
        case "remove":
          return {
            ...state,
            stats: omit(state.stats, action.files),
          };
        case "queue":
          return {
            ...state,
            stats: {
              ...state.stats,
              ...action.files.reduce<Record<string, ProcessingFileUploadStats>>(
                (files, file) => {
                  const key = nanoid();
                  files[key] = {
                    key,
                    file,
                    progress: 0,
                    status: "pending",
                  };

                  return files;
                },
                {}
              ),
            },
            errors: [...state.errors, ...action.errors],
          };
        case "start": {
          const { key, reader } = action;
          /* istanbul ignore next */
          if (!state.stats[key]) {
            throw new Error(`Missing file with key "${key}"`);
          }

          const fileStats: ProcessingFileUploadStats = {
            key,
            file: state.stats[key].file,
            progress: 0,
            status: "uploading",
          };

          return {
            ...state,
            readers: {
              ...state.readers,
              [key]: reader,
            },
            stats: {
              ...state.stats,
              [key]: fileStats,
            },
          };
        }
        case "progress": {
          const { key, progress } = action;
          /* istanbul ignore next */
          if (!state.stats[key]) {
            throw new Error(`Missing file with key "${key}"`);
          }

          return {
            ...state,
            stats: {
              ...state.stats,
              [key]: {
                ...state.stats[key],
                progress,
              },
            },
          };
        }
        case "complete": {
          const { key, result } = action;
          /* istanbul ignore next */
          if (!state.stats[key]) {
            throw new Error(`Missing file with key "${key}"`);
          }

          const file: CompletedFileUploadStats = {
            key,
            file: state.stats[key].file,
            status: "complete",
            result,
            progress: 100,
          };
          const { [key]: _reader, ...readers } = state.readers;

          return {
            ...state,
            readers,
            stats: {
              ...state.stats,
              [key]: file,
            },
          };
        }
        case "clearErrors":
          return { ...state, errors: [] };
        default:
          /* istanbul ignore next */
          return state;
      }
    },
    {
      stats: {},
      errors: [],
      readers: {},
    }
  );
  const { stats, errors, readers } = state;

  const statsList = Object.values(stats);
  const totalFiles = statsList.length;
  const totalBytes = statsList.reduce(
    (result, { file: { size } }) => result + size,
    0
  );
  const queueFiles = useCallback(
    (files: readonly File[]) => {
      const { pending, errors } = validateFiles(files, {
        maxFiles,
        extensions,
        minFileSize,
        maxFileSize,
        totalBytes,
        totalFiles,
        totalFileSize,
      });

      dispatch({ type: "queue", errors, files: pending });
    },
    [
      validateFiles,
      maxFiles,
      extensions,
      minFileSize,
      maxFileSize,
      totalBytes,
      totalFiles,
      totalFileSize,
    ]
  );
  const onDrop = useCallback(
    (event: DragEvent<E>) => {
      propOnDrop?.(event);
      event.preventDefault();
      event.stopPropagation();

      try {
        const files = event.dataTransfer.files;
        if (files) {
          queueFiles(Array.from(files));
        }
      } catch (e) {
        dispatch({
          type: "queue",
          files: [],
          errors: [new FileAccessError(e)],
        });
      }
    },
    [queueFiles, propOnDrop]
  );
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      propOnChange?.(event);
      try {
        const files = event.currentTarget.files;
        if (files) {
          queueFiles(Array.from(files));
        } else {
          throw new Error();
        }
      } catch (e) {
        dispatch({
          type: "queue",
          files: [],
          errors: [new FileAccessError(e)],
        });
      }
    },
    [queueFiles, propOnChange]
  );

  const remove = useCallback(
    (keyOrKeys: string | readonly string[]) => {
      const files = typeof keyOrKeys === "string" ? [keyOrKeys] : keyOrKeys;
      files.forEach((fileKey) => {
        readers[fileKey]?.abort();
      });

      dispatch({ type: "remove", files });
    },
    [readers]
  );
  const reset = useCallback(() => {
    Object.values(readers).forEach((reader) => {
      reader.abort();
    });

    dispatch({ type: "reset" });
  }, [readers]);
  const clearErrors = useCallback(() => {
    dispatch({ type: "clearErrors" });
  }, []);
  const start = useCallback((key: string, reader: FileReader) => {
    dispatch({ type: "start", key, reader });
  }, []);
  const complete = useCallback(
    (key: string, result: FileReaderResult = null) => {
      dispatch({ type: "complete", key, result });
    },
    []
  );
  const createProgressEventHandler = useCallback(
    (key: string) => (event: ProgressEvent) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded * 100) / event.total);
        dispatch({ type: "progress", key, progress: percentage });
      }
    },
    []
  );

  useEffect(() => {
    const pending: ProcessingFileUploadStats[] = [];
    const uploading: ProcessingFileUploadStats[] = [];
    Object.values(stats).forEach((file) => {
      if (file.status === "pending") {
        pending.push(file);
      } else if (file.status === "uploading") {
        uploading.push(file);
      }
    });

    const lastIndex =
      concurrency === -1
        ? pending.length
        : Math.max(0, concurrency - uploading.length);
    const queue = pending.slice(0, lastIndex);
    if (!queue.length) {
      return;
    }

    queue.forEach((stats) => {
      const { key, file } = stats;
      const reader = new FileReader();

      // using `addEventListener` instead of directly setting to
      // `reader.progress`/`reader.load` so it's easier to test
      reader.addEventListener("progress", createProgressEventHandler(key));
      reader.addEventListener("load", () => {
        complete(key, reader.result);
      });

      start(key, reader);
      const parser = getFileParser(file);
      /* istanbul ignore next */
      if (
        process.env.NODE_ENV !== "production" &&
        ![
          "readAsText",
          "readAsDataURL",
          "readAsArrayBuffer",
          "readAsBinaryString",
        ].includes(parser)
      ) {
        throw new Error("Invalid file reader parser");
      }

      reader[parser](file);
    });
  }, [
    concurrency,
    stats,
    getFileParser,
    createProgressEventHandler,
    start,
    complete,
  ]);

  let accept = "";
  if (extensions.length) {
    accept = extensions.reduce((s, ext) => `${s ? `${s},` : ""}.${ext}`, "");
  }

  return {
    stats: statsList,
    errors,
    accept,
    totalBytes,
    totalFiles,
    onDrop,
    onChange,
    reset,
    remove,
    clearErrors,
  };
}
