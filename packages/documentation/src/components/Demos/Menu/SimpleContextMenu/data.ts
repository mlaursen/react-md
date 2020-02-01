import createIdGenerator from "utils/createIdGenerator";

export interface DriveContent {
  id: string;
  name: string;
  owner: string;
  lastModified: string;
}

export interface DriveFolder extends DriveContent {
  type: "folder";
}

export interface DriveMedia extends DriveContent {
  size: number;
}

export interface DriveImage extends DriveMedia {
  type: "image";
}

export interface DriveVideo extends DriveMedia {
  type: "video";
}

export type DriveContentItem = DriveFolder | DriveImage | DriveVideo;

export const uuid = createIdGenerator("drive-content");

export const createFolder = (
  name: string,
  lastModified: Date
): DriveFolder => ({
  id: uuid(),
  type: "folder",
  owner: "me",
  name,
  lastModified: lastModified.toISOString(),
});

export const createMedia = (
  name: string,
  lastModified: Date,
  size: number,
  type: "image" | "video"
): DriveImage | DriveVideo => ({
  id: uuid(),
  name,
  size,
  type,
  owner: "me",
  lastModified: lastModified.toISOString(),
});

export const contents: DriveContentItem[] = [
  createFolder("Documents", new Date(2020, 0, 3, 8)),
  createFolder("My Pictures", new Date(2019, 11, 29)),
  createMedia("Amazing Picture.jpg", new Date(2019, 11, 29), 32423, "image"),
  createMedia("Look_at_This.png", new Date(2019, 11, 20, 3, 2), 2343, "image"),
  createMedia("Some band live.mov", new Date(2019, 11, 29), 90823490, "video"),
  createMedia("My Movie.mp4", new Date(2019, 11, 29), 90823490, "video"),
];
