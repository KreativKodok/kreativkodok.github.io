import React, { useState } from "react";
import siteData from "../assets/siteData.json";

interface Props {
  title: string;
  setSelection: (selection: string) => void;
}

function ThumbnailCell({ title, setSelection }: Props) {
  const [showTitle, setShowTitle] = useState(false);
  let entryData = siteData.entries.filter((item) => item.title === title)[0];

  return (
    <button
      type="button"
      className="card btn p-0 rounded-0 border-0 col-6 col-sm-6 col-lg-3"
      onPointerEnter={() => setShowTitle(true)}
      onPointerLeave={() => setShowTitle(false)}
      onClick={() => setSelection(title)}
    >
      <img
        src={entryData.images[0] ? entryData.images[0] : "src/media/null.png"}
        className="card-img square rounded-0"
        alt=""
      />
      <div className="card-img-overlay">
        {showTitle ? (
          <div className="position-absolute top-50 start-50 translate-middle">
            <h5
              className="card-title font-monospace text-light bg-black px-2 pb-1 my-0"
              style={{ fontSize: "2.5vw" }}
            >
              {title}
              <br />
              <small>{entryData.year}</small>
            </h5>
          </div>
        ) : null}
      </div>
    </button>
  );
}

export default ThumbnailCell;
