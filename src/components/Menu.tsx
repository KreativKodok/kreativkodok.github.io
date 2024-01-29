function scramble(text: string, shift: number) {
  let returnText = "";
  text
    .split("")
    .forEach(
      (x) => (returnText += String.fromCharCode(x.charCodeAt(0) + shift))
    );
  return returnText;
}

interface Props {
  showWorks: boolean;
  onWorksSelect: () => void;
  showBio: boolean;
  onBioSelect: () => void;
}

function Contacts({ showBio, showWorks, onBioSelect, onWorksSelect }: Props) {
  return (
    <div
      className="btn-group fixed-bottom font-monospace btn-outline-light rounded-0 border-0 font-monospace bg-black"
      role="group"
      aria-label="Basic outlined example"
    >
      {showWorks ? (
        <button
          type="button"
          onClick={() => onWorksSelect()}
          className="btn btn-lg btn-outline-light rounded-0 border-0"
        >
          works
        </button>
      ) : null}
      {showBio ? (
        <button
          type="button"
          onClick={() => onBioSelect()}
          className="btn btn-lg btn-outline-light rounded-0 border-0"
        >
          bio
        </button>
      ) : null}
      <button
        type="button"
        onClick={() =>
          window.open(
            scramble("o{{wzA66mhjlivvr5jvt6slqzp", -7),
            "_blank",
            "noreferrer"
          )
        }
        formTarget="_blank"
        className="btn btn-lg btn-outline-light rounded-0 border-0"
      >
        facebook
      </button>
      <button
        type="button"
        onClick={() =>
          window.open(
            scramble("thps{vAhukyhz5shzsv5ohshrGnthps5jvt", -7) +
              `?subject=${"Kapcsolat"}`,
            "_blank",
            "noreferrer"
          )
        }
        formTarget="_blank"
        className="btn btn-lg btn-outline-light rounded-0 border-0"
      >
        {scramble("hukyhz5shzsv5ohshrGnthps5jvt", -7)}
      </button>
      <button
        type="button"
        onClick={() =>
          window.open(
            scramble("o{{wzA66puz{hnyht5jvt6rylh{p}rvkvr", -7),
            "_blank",
            "noreferrer"
          )
        }
        formTarget="_blank"
        className="btn btn-lg btn-outline-light rounded-0 border-0"
      >
        instagram
      </button>
    </div>
  );
}

export default Contacts;
