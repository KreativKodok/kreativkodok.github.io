import React, { useState } from "react";
import FilterCell from "./FilterCell";

interface Props {
  allCategories: string[];
  activeCategories: string[];
  setActiveCategories: (categories: string[]) => void;
}

function FilterGrid({
  allCategories,
  activeCategories,
  setActiveCategories,
}: Props) {
  const [firstRun, setFirstRun] = useState(true);
  return (
    <>
      {allCategories.map((item) => (
        <FilterCell
          category={item}
          onToggleCategory={(category) => {
            if (firstRun) {
              setFirstRun(false);
              let holder: string[] = [];
              holder.push(category);
              setActiveCategories(holder);
              return;
            }
            console.log(activeCategories);
            if (!activeCategories.includes(category)) {
              let copy = [...activeCategories];
              copy.push(category);
              setActiveCategories(copy);
            } else {
              let copy = [...activeCategories];
              copy.splice(copy.indexOf(category), 1);
              setActiveCategories(copy);
            }
          }}
          key={item}
        />
      ))}
    </>
  );
}

export default FilterGrid;
