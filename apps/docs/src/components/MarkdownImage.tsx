import { objectFit } from "@react-md/core/objectFit";
import Image, { type ImageProps, type StaticImageData } from "next/image.js";
import Link from "next/link.js";
import { type ReactElement } from "react";

export interface MarkdownImageProps extends Omit<ImageProps, "src"> {
  src: ImageProps["src"] | Promise<{ default: StaticImageData }>;
}

export async function MarkdownImage(
  props: Readonly<MarkdownImageProps>
): Promise<ReactElement> {
  const { src: propSrc, ...remaining } = props;
  const src = await Promise.resolve(propSrc).then((result) =>
    typeof result === "string" || !("default" in result)
      ? result
      : result.default
  );
  return (
    <Link href={typeof src === "string" ? src : src.src} target="_blank">
      <Image {...remaining} src={src} className={objectFit({ inline: true })} />
    </Link>
  );
}
