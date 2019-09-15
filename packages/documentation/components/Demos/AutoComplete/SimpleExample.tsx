import React, { FC } from "react";
import { AutoComplete } from "@react-md/autocomplete";

// import people from "constants/people";
import states from "constants/states";
import "./SimpleExample.scss";

// const data = people.slice();
const data = states.slice();

const SimpleExample: FC = () => {
  return (
    <div className="autocomplete-grid">
      <AutoComplete
        id="autocomplete-1"
        label="Autocomplete"
        data={data}
        labelKey="name"
        valueKey="name"
        placeholder="Search..."
        filter="case-insensitive"
      />
      <AutoComplete
        id="autocomplete-2"
        label="Autocomplete"
        data={data}
        labelKey="name"
        valueKey="name"
        placeholder="Search..."
        filter="fuzzy"
      />
      <AutoComplete
        id="autocomplete-3"
        label="Autocomplete"
        data={data}
        filter="none"
        valueKey="name"
        labelKey="name"
        placeholder="Search..."
      />
    </div>
  );
};

export default SimpleExample;
