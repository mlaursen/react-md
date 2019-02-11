import React, { useState, FunctionComponent } from "react";
import { Text, TextContainer } from "@react-md/typography";
import { useEventListener, useAppSize } from "@react-md/utils";

// export interface IAppSize {
//   [key: string]: boolean;
//   isPhone: boolean;
//   isTablet: boolean;
//   isDesktop: boolean;
//   isPortraitPhone: boolean;
//   isLandscapePhone: boolean;
//   isPortraitTablet: boolean;
//   isLandscapeTablet: boolean;
//   isDesktopPhone: boolean;
//   isDesktopTablet: boolean;
// }

// function getCurrentAppSize(): IAppSize {
//   const tabletMinWidth = 768;
//   const desktopMinWidth = 1025;
//   const phoneMedia = `screen and (max-width: ${tabletMinWidth - 1}px)`;
//   // tslint:disable-next-line:max-line-length
//   const tabletMedia = `screen and (min-width: ${tabletMinWidth}px) and (max-width: ${desktopMinWidth - 1}px)`; // prettier-ignore
//   const desktopMedia = `screen and (min-width: ${desktopMinWidth}px)`;

//   const matchesTablet = window.matchMedia(tabletMedia).matches;

//   const portrait = window.innerHeight > window.innerWidth;
//   const isDesktop = window.matchMedia(desktopMedia).matches;
//   const isTablet = !isDesktop && matchesTablet;
//   const isPhone = !isDesktop && !isTablet;
//   const isPortraitPhone = isPhone && portrait;
//   const isLandscapePhone = isPhone && !portrait;
//   const isPortraitTablet = isTablet && portrait;
//   const isLandscapeTablet = isTablet && !portrait;
//   const isDesktopPhone = isDesktop && window.matchMedia(phoneMedia).matches;
//   const isDesktopTablet = isDesktop && matchesTablet;
//   return {
//     isPhone,
//     isTablet,
//     isDesktop,
//     isPortraitPhone,
//     isLandscapePhone,
//     isPortraitTablet,
//     isLandscapeTablet,
//     isDesktopPhone,
//     isDesktopTablet,
//   };
// }

// function updateAppSize(oldSize: IAppSize, setSize: (size: IAppSize) => void) {
//   const nextSize = getCurrentAppSize();
//   if (Object.keys(oldSize).some(key => oldSize[key] !== nextSize[key])) {
//     setSize(nextSize);
//   }
// }

const AppSize: FunctionComponent = () => {
  const appSize = useAppSize();
  // const [appSize, setSize] = useState<IAppSize>(getCurrentAppSize());
  // useEventListener("resize", () => setSize(getCurrentAppSize()));

  return (
    <TextContainer>
      <Text type="headline-3">App Size</Text>
      <Text type="body-1" component="div">
        <pre>{JSON.stringify(appSize, null, 2)}</pre>
      </Text>
    </TextContainer>
  );
};

export default AppSize;
