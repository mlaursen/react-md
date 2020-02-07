import React, { FC, useState, Fragment } from "react";
import { Text } from "@react-md/typography";
import { Chip } from "@react-md/chip";
import { bem } from "@react-md/utils";

import "./FilterChips.scss";
import { CheckSVGIcon } from "@react-md/material-icons";

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
    <Fragment>
      <Text type="headline-4" className={styles("header")}>
        Choose amenities
      </Text>
      <div className={styles()}>
        {amenities.map(amenity => {
          const selected = selectedAmenities.includes(amenity);

          return (
            <Chip
              key={amenity}
              state={selected}
              className={styles("chip")}
              onClick={() =>
                setSelected(prevSelected => {
                  if (prevSelected.includes(amenity)) {
                    return prevSelected.filter(am => am !== amenity);
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
    </Fragment>
  );
};

export default FilterChips;
