import { Card, CardContent } from "@react-md/card";
import {
  Button,
  Slide,
  SlideContainer,
  Typography,
  useCarousel,
} from "@react-md/core";
import ChevronLeftIcon from "@react-md/material-icons/ChevronLeftIcon";
import ChevronRightIcon from "@react-md/material-icons/ChevronRightIcon";
import PauseIcon from "@react-md/material-icons/PauseIcon";
import PlayArrowIcon from "@react-md/material-icons/PlayArrowIcon";
import { Tab, TabList } from "@react-md/tabs";
import { visualMedia, VisualMediaOverlay } from "@react-md/visual-media";
import type { ReactElement } from "react";
import { useId } from "react";
import styles from "./AccessibleCarouselExample.module.scss";

interface CarouselSlide {
  src: string;
  title: string;
  subtitle: string;
}

const slides: readonly CarouselSlide[] = [
  {
    src: "https://picsum.photos/640/360?image=803",
    title: "Slide 1 Title",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    src: "https://picsum.photos/640/360?image=852",
    title: "Slide 2 Title",
    subtitle: "Phasellus accumsan auctor neque, eu dignissim ex.",
  },
  {
    src: "https://picsum.photos/640/360?image=902",
    title: "Slide 3 Title",
    subtitle: "Etiam vitae nisl ex. Maecenas ut elit risus.",
  },
];

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/carousel/}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/example-index/carousel/carousel-2-tablist.html}
 */
export function AccessibleCarouselExample(): ReactElement {
  const {
    paused,
    direction,
    activeIndex,
    increment,
    decrement,
    togglePaused,
    setActiveIndex,
  } = useCarousel({ totalSlides: slides.length });
  const id = useId();
  const carouselId = useId();

  return (
    <Card fullWidth className={styles.card}>
      <CardContent
        aria-label="Highlighted nature shots"
        aria-roledescription="carousel"
        id={id}
        role="region"
      >
        <SlideContainer
          aria-live="off"
          id={carouselId}
          direction={direction}
          className={styles.container}
        >
          {slides.map(({ src, title, subtitle }, index) => (
            <Slide
              aria-label={`Slide ${index + 1} of ${slides.length + 1}`}
              aria-roledescription="slide"
              id={`${carouselId}-${index + 1}`}
              role="group"
              key={title}
              active={activeIndex === index}
              timeout={500}
              className={styles.slide}
            >
              <img
                src={src}
                alt=""
                className={visualMedia({
                  scaleToContainer: true,
                })}
              />
              <VisualMediaOverlay position="bottom" className={styles.overlay}>
                <Typography margin="none" type="headline-4" align="center">
                  {title}
                </Typography>
                <Typography margin="none" type="headline-6" align="center">
                  {subtitle}
                </Typography>
              </VisualMediaOverlay>
            </Slide>
          ))}
          <Button
            aria-label="Previous"
            disabled={activeIndex === 0}
            className={styles.control}
            buttonType="icon"
            onClick={decrement}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            aria-label="Next"
            disabled={activeIndex === slides.length - 1}
            buttonType="icon"
            className={styles.control}
            onClick={increment}
          >
            <ChevronRightIcon />
          </Button>
          <div className={styles.indicators}>
            <Button
              aria-label="Pause"
              aria-pressed={paused}
              buttonType="icon"
              onClick={togglePaused}
            >
              {paused ? <PlayArrowIcon /> : <PauseIcon />}
            </Button>
            <TabList
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              className={styles.tablist}
            >
              {slides.map(({ title }, index) => (
                <Tab
                  key={title}
                  aria-label={`Slide ${index + 1}`}
                  aria-controls={`${carouselId}-${index + 1}`}
                  active={activeIndex === index}
                  className={styles.indicator}
                />
              ))}
            </TabList>
          </div>
        </SlideContainer>
      </CardContent>
    </Card>
  );
}
