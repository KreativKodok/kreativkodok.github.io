import React from "react";

interface Props {
  category: string;
  onToggleCategory: (category: string) => void;
}

function FilterCell({ category, onToggleCategory }: Props) {
  return (
    <div className="col">
      <div className="container">
        <input
          type="checkbox"
          className="btn-check"
          id={`btncheck-${category.replace(/\s/g, "-")}`}
          autoComplete="off"
          onChange={(event) => {
            onToggleCategory(category);
          }}
        />
        <label
          className="btn btn-lg btn-outline-light rounded-0 border-0 font-monospace"
          htmlFor={`btncheck-${category.replace(/\s/g, "-")}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {category}
        </label>
      </div>
    </div>
  );
}

export default FilterCell;
