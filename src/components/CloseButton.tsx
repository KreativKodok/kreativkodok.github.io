import React from "react";

interface Props {
  setSelection: (selection: string) => void;
}

export default function CloseButton({ setSelection }: Props) {
  return (
    <div className="row fixed-top justify-content-end">
      <div className="col-1 p-0">
        <button
          type="button"
          className="btn-close position-absolute end-0 top-0 btn-close-white me-5 mt-4"
          aria-label="Close"
          onClick={() => setSelection("")}
        ></button>
      </div>
    </div>
  );
}
