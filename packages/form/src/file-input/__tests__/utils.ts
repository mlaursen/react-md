import {
  FileAccessError,
  FileExtensionError,
  FileSizeError,
  FileUploadStats,
  GenericFileError,
  getFileParser,
  getSplitFileUploads,
  isFileAccessError,
  isFileExtensionError,
  isGenericFileError,
  validateFiles,
} from "../utils";

function createFile(name: string, bytes: number): File {
  const content = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i += 1) {
    content[i] = 32 + i;
  }

  return new File([content.buffer], name);
}

const file = new File(["pretend-bytes"], "file1.txt");
const png = new File([""], "file.png");
const apng = new File([""], "file.apng");
const avif = new File([""], "file.avif");
const tiff = new File([""], "file.tiff");
const gif = new File([""], "file.gif");
const gifv = new File([""], "file.gifv");
const jpg = new File([""], "file.jpg");
const jpeg = new File([""], "file.jpeg");
const mp3 = new File([""], "file.mp3");
const wav = new File([""], "file.wav");
const ogg = new File([""], "file.ogg");
const m4p = new File([""], "file.m4p");
const flac = new File([""], "file.flac");
const mkv = new File([""], "file.mkv");
const mpeg = new File([""], "file.mpeg");
const mpg = new File([""], "file.mpg");
const mov = new File([""], "file.mov");
const avi = new File([""], "file.avi");
const flv = new File([""], "file.flv");
const webm = new File([""], "file.webm");
const mp4 = new File([""], "file.mp4");
const js = new File([""], "file.js");
const jsx = new File([""], "file.jsx");
const ts = new File([""], "file.ts");
const tsx = new File([""], "file.tsx");
const json = new File([""], "file.json");
const lock = new File([""], "file.lock");
const hbs = new File([""], "file.hbs");
const yml = new File([""], "file.yml");
const yaml = new File([""], "file.yaml");
const log = new File([""], "file.log");
const txt = new File([""], "file.txt");
const md = new File([""], "file.md");

const MEDIA_LIKE_FILES = [
  png,
  apng,
  avif,
  tiff,
  gif,
  gifv,
  jpg,
  jpeg,
  mp3,
  wav,
  ogg,
  m4p,
  flac,
  mkv,
  mpeg,
  mpg,
  mov,
  avi,
  flv,
  webm,
  mp4,
] as const;
const TEXT_LIKE_FILES = [
  js,
  jsx,
  ts,
  tsx,
  json,
  lock,
  hbs,
  yml,
  yaml,
  log,
  txt,
  md,
] as const;

describe("isGenericFileError", () => {
  it("should return true for instances of GenericFileError", () => {
    expect(isGenericFileError(new GenericFileError([file]))).toBe(true);
    expect(isGenericFileError(new FileAccessError())).toBe(false);
  });
});

describe("isFileAccessError", () => {
  it("should return true for instances of FileAccessError", () => {
    expect(isFileAccessError(new FileAccessError())).toBe(true);
    expect(isFileAccessError(new GenericFileError([file]))).toBe(false);
  });
});

describe("isFileExtensionError", () => {
  it("should return true for instances of FileExtensionError", () => {
    expect(isFileExtensionError(new FileExtensionError([file], ["png"]))).toBe(
      true
    );
    expect(isFileExtensionError(new GenericFileError([file]))).toBe(false);
  });
});

describe("getFileParser", () => {
  it("should have reasonable defaults for known file extensions", () => {
    MEDIA_LIKE_FILES.forEach((file) => {
      expect(getFileParser(file)).toBe("readAsDataURL");
    });
    TEXT_LIKE_FILES.forEach((file) => {
      expect(getFileParser(file)).toBe("readAsText");
    });

    expect(getFileParser(new File([""], "file.jar"))).toBe("readAsArrayBuffer");
    expect(getFileParser(new File([""], "file.tar"))).toBe("readAsArrayBuffer");
    expect(getFileParser(new File([""], "file.zip"))).toBe("readAsArrayBuffer");
  });
});

describe("validateFiles", () => {
  it("should prevent both maxFileSize and totalFileSize errors", () => {
    const file1 = createFile("file1.txt", 1024);
    const file2 = createFile("file2.txt", 2048);
    const file3 = createFile("file3.txt", 1000);
    const result1 = validateFiles([file1, file2], {
      maxFiles: -1,
      extensions: [],
      minFileSize: -1,
      maxFileSize: 1024,
      totalBytes: 0,
      totalFiles: 0,
      totalFileSize: 1024,
    });

    const result2 = validateFiles([file1, file3], {
      maxFiles: -1,
      extensions: [],
      minFileSize: -1,
      maxFileSize: 1024,
      totalBytes: 0,
      totalFiles: 0,
      totalFileSize: 2000,
    });

    expect(result1).toEqual({
      pending: [file1],
      errors: [new FileSizeError([file2], "max", 1024)],
    });
    expect(result2).toEqual({
      pending: [file1],
      errors: [new FileSizeError([file3], "total", 2000)],
    });
  });
});

describe("getSplitFileUploads", () => {
  it("should correctly split the file upload stats", () => {
    const file1 = createFile("file1.txt", 1024);
    const file2 = createFile("file2.txt", 2048);
    const file3 = createFile("file3.txt", 1000);
    const pending: FileUploadStats[] = [
      {
        key: "pending-key",
        status: "pending",
        file: file1,
        progress: 0,
      },
    ];
    const uploading: FileUploadStats[] = [
      {
        key: "uploading-key",
        status: "uploading",
        file: file2,
        progress: 10,
      },
    ];
    const complete: FileUploadStats[] = [
      {
        key: "complete-key",
        status: "complete",
        file: file3,
        result: "fake-contents",
        progress: 100,
      },
    ];

    expect(
      getSplitFileUploads([...pending, ...complete, ...uploading])
    ).toEqual({
      pending,
      uploading,
      complete,
    });
  });
});
