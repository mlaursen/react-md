import React, { FC, useState } from "react";
import { Chip } from "@react-md/chip";
import { Text } from "@react-md/typography";
import { bem } from "@react-md/utils";

import "./FilterChips.scss";

const amenities = [
  "Elevator",
  "Washer / Dryer",
  "Fireplace",
  "Wheelchair Access",
  "Dogs ok",
  "Cats ok",
];

const styles = bem("filter-chips");

const FilterChips: FC = () => {
  const [selectedAmenities, setSelected] = useState<string[]>([]);
  return (
    <>
      <Text type="headline-5" className={styles("header")}>
        Choose amenities
      </Text>
      <div className={styles()}>
        {amenities.map((amenity) => {
          const selected = selectedAmenities.includes(amenity);

          return (
            <Chip
              key={amenity}
              selected={selected}
              className={styles("chip")}
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
};

export default FilterChips;
