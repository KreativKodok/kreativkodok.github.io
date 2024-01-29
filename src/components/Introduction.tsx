import React from "react";

import siteData from "../assets/siteData.json";

function Introduction() {
  return (
    <div className="row justify-content-center p-0">
      {" "}
      <div className="col p-0">
        <div className="card border-0 rounded-0 rounded-bottom">
          <img
            src={siteData.intro.profileImage}
            className="card-img rounded-0"
            alt=""
          />
          <div className="card-body">
            <div className="card-text font-monospace">
              <p>
                <strong>{"Halák László András "}</strong>{" "}
                <i>{"(kreatívkodok) "}</i>
                {siteData.intro.hu}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
