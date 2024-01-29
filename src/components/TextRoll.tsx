import React, { useEffect, useState } from "react";

interface Props {
  texts: string[];
}

let wordMaxLength = 0;

function TextRoll({ texts }: Props) {
  /*
  const [sourceText, setSourceText] = useState("áéiűCreative Coding");
  const [targetText, setTargetText] = useState("Kreatívkodok");
  */

  texts.forEach(
    (item) =>
      (wordMaxLength =
        item.length > wordMaxLength ? item.length : wordMaxLength)
  );

  const [sourceText, setSourceText] = useState("Creative Coding");
  const [targetText, setTargetText] = useState("Kreatívkodok");
  let rate = 25;

  const [blendedText, updateBlendedText] = useState(
    BlendText(sourceText, targetText, 0)
  );

  const [targetIndex, updateTargetIndex] = useState(0);

  const [waitTimer, setWaitTimer] = useState(-1);
  const [updateTimer, setUpdateTimer] = useState(-1);

  const [isNameDisplayed, setIsNameDisplayed] = useState(false);

  useEffect(() => {
    if (updateTimer < 0) {
      setUpdateTimer(
        setTimeout(() => {
          let holder = BlendText(blendedText, targetText, 4);
          setIsNameDisplayed(
            holder === blendedText && targetText === "Kreatívkodok"
          );
          if (holder === blendedText) {
            //console.log("Blend complete");

            if (waitTimer < 0) {
              //console.log("Starting reset timer");
              setWaitTimer(
                setTimeout(
                  () => {
                    setSourceText(blendedText);
                    let indexHolder =
                      (targetIndex + 1 + Math.floor(Math.random() * 3)) %
                      texts.length;
                    setTargetText(texts[indexHolder]);
                    updateTargetIndex(indexHolder);
                    //console.log("Reset timer done");
                    setWaitTimer(-1);
                  },

                  holder === blendedText && targetText === "Kreatívkodok"
                    ? 4500
                    : 1500
                )
              );
            }
          } else {
            //console.log("Blend in progress");
          }
          updateBlendedText(holder);
          setUpdateTimer(-1);
        }, rate)
      );
    }
  }, [targetText, sourceText, blendedText, waitTimer, updateTimer]);

  return (
    <div
      className="text-light font-monospace text-center"
      style={{
        fontSize: "5vw",
        whiteSpace: "preserve",
        textWrap: "nowrap",
      }}
    >
      <p
        className="position-relative m-auto"
        onPointerEnter={() => {
          if (targetText !== "Kreatívkodok") {
            setTargetText("Kreatívkodok");
            if (waitTimer >= 0) clearTimeout(waitTimer);
            setWaitTimer(-1);
          }
        }}
        style={{ top: "37%" }}
      >
        {isNameDisplayed ? (
          <strong style={{ pointerEvents: "none" }} className="text-warning">
            {blendedText}
          </strong>
        ) : (
          <>{blendedText}</>
        )}
      </p>
    </div>
  );
}

const lookup =
  " .,_-+!?0123456789aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyzAÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ";

function PadAround(text: string, pad: string, length: number) {
  if (text.length >= length) return text;

  return text
    .padStart(text.length + Math.floor((length - text.length) / 2), pad)
    .padEnd(length, pad);
}

function BlendText(source: string, target: string, changeBudget: number) {
  //let maxLength = Math.max(source.length, target.length, 10);
  let maxLength = wordMaxLength;
  let minLength = Math.min(source.length, target.length);
  let diff = maxLength - minLength;

  /*
  source = source.padStart(minLength + Math.floor(diff / 2), padChar);
  source = source.padEnd(maxLength, padChar);

  target = target.padStart(minLength + Math.floor(diff / 2), padChar);
  target = target.padEnd(maxLength, padChar);
  */
  source = PadAround(source, " ", maxLength);
  target = PadAround(target, " ", maxLength);

  for (let i = 0; i < maxLength; i++) {
    let sourceIndex = Math.max(0, lookup.indexOf(source.charAt(i)));
    let targetIndex = Math.max(0, lookup.indexOf(target.charAt(i)));

    let step =
      sourceIndex > targetIndex ? -1 : sourceIndex < targetIndex ? 1 : 0;

    if (step != 0 && changeBudget > 0) {
      /*
      let availableCharIndex = source.indexOf(target.charAt(i), i + 1);

      if (availableCharIndex > i) {
        let precedingCharIndex = availableCharIndex - 1;
        source =
          source.slice(0, precedingCharIndex) +
          source.charAt(availableCharIndex) +
          source.charAt(precedingCharIndex) +
          source.slice(availableCharIndex + 1, source.length);
      }*/

      let newIndex = sourceIndex + step;
      source =
        source.slice(0, i) +
        lookup.charAt(newIndex) +
        source.slice(i + 1, source.length);
      changeBudget--;
    }
    if (changeBudget <= 0) {
      break;
    }
  }
  return source;
}

export default TextRoll;
