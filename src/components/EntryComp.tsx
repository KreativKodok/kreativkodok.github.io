import React from "react";

import siteData from "../assets/siteData.json";

interface Props {
  title: string;
  setSelection: (selection: string) => void;
}

function EntryComp({ title, setSelection }: Props) {
  let entryData = siteData.entries.filter((item) => item.title === title)[0];

  return (
    <>
      <div className="card border-0">
        {entryData.images[0] ? (
          <>
            <img
              src={entryData.images[0]}
              className="card-img rounded-0"
              alt=""
            />
            <div className="card-img-overlay">
              <p className="card-text display-4 mt-5 ms-5 text-light">
                <span className="bg-black px-3 pt-0 pb-2">
                  <strong>{entryData.title}</strong>
                </span>
              </p>
              <small
                className="card-text mt-5 ms-5 text-light"
                style={{ fontSize: "1.2rem" }}
              >
                <span className="bg-black px-3 pt-0 pb-1">
                  {` (${entryData.year})`}
                </span>
              </small>
            </div>
          </>
        ) : null}
        {(entryData.longBody && entryData.longBody !== "") ||
        (entryData.shortBody && entryData.shortBody !== "") ? (
          <div className="card-body">
            {!entryData.images[0] ? (
              <>
                <h5 className="card-title display-4">{entryData.title}</h5>
                <small
                  style={{ fontSize: "1rem" }}
                >{` (${entryData.year})`}</small>
              </>
            ) : null}
            {entryData.shortBody && entryData.shortBody !== "" ? (
              <p className="card-text lead">{entryData.shortBody}</p>
            ) : null}
            {entryData.affiliates[0].title ? (
              <>
                <p className="card-text lead">{"In collaboration with:"}</p>
                {entryData.affiliates.map((item) => (
                  <a href={item.link} className="card-link" target="_blank">
                    {item.title}
                  </a>
                ))}
              </>
            ) : null}
            {entryData.longBody && entryData.longBody !== "" ? (
              <p className="card-text">{entryData.longBody}</p>
            ) : null}
          </div>
        ) : (
          <br />
        )}

        {entryData.videos[0]
          ? entryData.videos.map((item) => (
              <div className="ratio ratio-16x9">
                <iframe
                  width="560"
                  height="315"
                  src={item.replace("watch?v=", "embed/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ))
          : null}

        {entryData.images.length > 1
          ? entryData.images
              .slice(1)
              .map((item) => (
                <img
                  src={item}
                  key={item}
                  className="card-img rounded-0 pt-3"
                  alt=""
                />
              ))
          : null}
        <div className="card-footer mb-6">
          <small className="text-body-secondary">
            <i>{entryData.categories.join(", ")}</i>
          </small>
        </div>
      </div>
    </>
  );
}

export default EntryComp;
