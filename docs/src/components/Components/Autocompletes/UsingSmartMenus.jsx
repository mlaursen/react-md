import React from 'react';
import Autocomplete from 'react-md/lib/Autocompletes';
import { programmingLanguages as sampleData } from 'constants/sampleData';

const UsingSmartMenus = () => (
  <Autocomplete
    id="smart-menu-programming-languages"
    label="Programming languages"
    placeholder="Javascript"
    data={sampleData}
    simplifiedMenu={false}
  />
);
export default UsingSmartMenus;
