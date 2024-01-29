import { useState } from "react";
import Menu from "./components/Menu";
import Gutter from "./components/Gutter";
import LogoComp from "./components/LogoComp";
import ThumbnailGrid from "./components/ThumbnailGrid";

import siteData from "./assets/siteData.json";
import EntryComp from "./components/EntryComp";
import FilterGrid from "./components/FilterGrid";
import CloseButton from "./components/CloseButton";
import Introduction from "./components/Introduction";

function App() {
  const [selection, setSelection] = useState("");
  const [showBio, setShowBio] = useState(false);
  const [showWorks, setShowWorks] = useState(true);

  document.body.style.backgroundColor = "black";
  document.body.style.overflowX = "hidden";

  let categoriesHolder: string[] = new Array();

  siteData.entries.forEach((item) => {
    item.categories.forEach((category) => {
      if (!categoriesHolder.includes(category) && category) {
        categoriesHolder.push(category);
      }
    });
  });

  categoriesHolder.sort((a, b) => a.localeCompare(b));

  const [allCategories, setAllCategories] = useState(
    Object.assign([], categoriesHolder) as string[]
  );
  const [activeCategories, setActiveCategories] = useState(
    Object.assign([], categoriesHolder) as string[]
  );

  function handleSelection(sel: string) {
    setSelection(sel);
    setActiveCategories([]);
    setShowBio(false);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <div className="container-fluid w-100 p-0">
        <div className="row p-0 justify-content-center">
          {!selection && !showBio ? (
            <div className="col-12 p-0">
              <LogoComp />
              <div className="row text-center">
                <FilterGrid
                  allCategories={allCategories}
                  activeCategories={activeCategories}
                  setActiveCategories={setActiveCategories}
                />
              </div>
              <div className="row p-0">
                <ThumbnailGrid
                  entries={siteData.entries
                    .sort((a, b) => (a.year >= b.year ? -1 : 1))
                    .filter((entry) =>
                      entry.categories.some((cat) =>
                        activeCategories[0]
                          ? activeCategories.includes(cat)
                          : allCategories.includes(cat)
                      )
                    )}
                  setSelection={handleSelection}
                />
              </div>
              <Gutter />
            </div>
          ) : (
            <div className="col-12 col-md-12 col-lg-6 p-0">
              {showBio ? (
                <>
                  <Introduction />
                  <Gutter />
                </>
              ) : (
                <>
                  <EntryComp title={selection} setSelection={setSelection} />
                  <Gutter />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <Menu
        showBio={!showBio}
        showWorks={(selection ? true : false) || showBio}
        onWorksSelect={() => {
          setSelection("");
          setShowBio(false);
          window.scrollTo(0, 0);
        }}
        onBioSelect={() => {
          setShowBio(true);
          window.scrollTo(0, 0);
        }}
      />
      {selection || showBio ? (
        <CloseButton setSelection={handleSelection} />
      ) : null}
    </>
  );
}

export default App;
