import React from "react";
import TextRoll from "./TextRoll";

function LogoComp() {
  const logoTexts = [
    "Creative Coding",
    "Physical Computing",
    "Interactive",
    "Augmented Reality",
    "Installation",
    "Virtual Reality",
    "Immersive",
    "Extended Reality",
    "Edutainment",
    "Rapid Prototyping",
    "Media Design",
    "Multimedia",
    "New Media",
    "Collaboration",
    "Projection Mapping",
  ];

  //  const logoTexts = ["Kreatívkodok", "Creative Coding"];
  return (
    <div className="row p-0" style={{ height: "60vh" }}>
      <TextRoll key="TextRoll" texts={logoTexts} />{" "}
    </div>
  );
}

export default LogoComp;
