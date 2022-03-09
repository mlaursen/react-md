import type { ReactElement } from "react";
import { useState } from "react";
import { Chip } from "@react-md/chip";
import { Typography } from "@react-md/typography";

import styles from "./FilterChips.module.scss";

const amenities = [
  "Elevator",
  "Washer / Dryer",
  "Fireplace",
  "Wheelchair Access",
  "Dogs ok",
  "Cats ok",
];

export default function FilterChips(): ReactElement {
  const [selectedAmenities, setSelected] = useState<string[]>([]);
  return (
    <>
      <Typography type="headline-5" className={styles.header}>
        Choose amenities
      </Typography>
      <div className={styles.container}>
        {amenities.map((amenity) => {
          const selected = selectedAmenities.includes(amenity);

          return (
            <Chip
              key={amenity}
              selected={selected}
              className={styles.chip}
              onClick={() =>
                setSelected((prevSelected) => {
                  if (prevSelected.includes(amenity)) {
                    return prevSelected.filter((am) => am !== amenity);
                  }

                  return [...prevSelected, amenity];
                })
              }
            >
              {amenity}
            </Chip>
          );
        })}
      </div>
    </>
  );
}
