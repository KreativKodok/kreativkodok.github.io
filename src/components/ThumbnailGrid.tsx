import React from "react";
import ThumbnailCell from "./ThumbnailCell";

interface Props {
  entries: { title: string }[];
  setSelection: (selection: string) => void;
}

function ThumbnailGrid({ entries, setSelection }: Props) {
  return (
    <>
      {entries.map((entry, index, arr) => (
        <ThumbnailCell
          key={entry.title}
          title={entry.title}
          setSelection={setSelection}
        />
      ))}
    </>
  );
}

export default ThumbnailGrid;
