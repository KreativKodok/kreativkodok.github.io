/*
kreatívkodok
kreatív kódok
creative coding
game design
edutainment
interactive
installation



*/

let words = [
  "creative coding",
  "game design",
  "media design",
  "edutainment",
  "interactive",
  "installation",
  "new media art",
  "physical computing",
  "virtual reality",
  "augmented reality"
];
let table = " .,_-+!?0123456789aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz";
let source;
let result;

let t = 0.0;
let setpoint = 1.0;

let prev = 0;

let maxLength;

let flipText;

let mouseOver = false;
let mouseWasOver = false;

let rerollInterval = 2;
let rerollCountdown = rerollInterval;

let artistName = "kreatívkodok";

let canvas;

function setup() {
  canvas = createCanvas(min(window.innerWidth, 800), window.innerHeight*.8);
  //canvas.parent('#titlesketch');

  frameRate(60);

  maxLength = artistName.length;
  words.forEach((word) => {
    if (word.length > maxLength) {
      maxLength = word.length;
    }
  });

  words.forEach((word, index, array) => {
    array[index] = word.spacePad(maxLength);
  });
  artistName = artistName.spacePad(maxLength);

  let blank = "";
  for (let i = 0; i < maxLength; i++) {
    blank += table.charAt(int(random(table.length)));
  }

  flipText = new FlipText(blank);
  flipText.setText(artistName);

  textFont("Roboto Mono");
  textAlign(CENTER, CENTER);
  textSize(60);
}

let prevNow = 0;
function draw() {
  let now = millis();
  let dt = (now - prevNow) / 1000.0;
  prevNow = now;

  clear();
  translate(width / 2, height / 2);
  flipText.display();

  wasMouseOver = mouseOver;
  mouseOver = dist(mouseX, mouseY, width / 2, height / 2) < 100;

  if (mouseOver) {
    if (wasMouseOver) {
      flipText.setText(artistName);
      //flipText.setInterval(0.01);
    }
  } else if (flipText.ready()) {
    rerollCountdown -= dt;
    if (rerollCountdown < 0) {
      rerollCountdown = rerollInterval;
      randomizeText();
    }
  }
}

function randomizeText() {
  let currentIndex = words.indexOf(flipText.getText());
  let offset = int(random(1, min(3, words.length - 2)));
  let nextIndex = (currentIndex + offset) % words.length;

  let nextText = words[nextIndex];
  console.log("From " + flipText.getText() + " to " + nextText);
  flipText.setText(nextText);
  //flipText.setInterval(0.035);
}

String.prototype.spacePad = function (len) {
  let w = this.slice();

  if (w.length < len) {
    w = w.padStart(w.length + (len - w.length) / 2, " ");
  }
  if (w.length < len) {
    w = w.padEnd(len, " ");
  }

  return w;
};

class FlipText {
  constructor(txt) {
    this.intermediate = txt.slice();
    this.target = txt.slice();
    this.interval = 0.035;
    this.lastUpdate = 0;
  }

  setInterval(itv){
    this.interval = itv;
  }
  
  setText(txt) {
    this.target = txt.slice();
    this.intermediate = this.intermediate.padEnd(
      max(this.intermediate.length, this.target.length),
      " "
    );
    this.target = this.target.padEnd(
      max(this.intermediate.length, this.target.length),
      " "
    );
  }
  getText() {
    return this.intermediate;
  }

  ready() {
    return this.intermediate == this.target;
  }

  display() {
    let now = millis();
    let fuzz = 8;
    if (now - this.lastUpdate > this.interval * 1000) {
      for (let i = 0; i < this.target.length; ) {
        if (this.intermediate.charAt(i) == this.target.charAt(i)) {
          i++;
        } else {
          let currentIndex = table.indexOf(this.intermediate.charAt(i));
          let targetIndex = table.indexOf(this.target.charAt(i));
          let nextChar = "";
          if (currentIndex < targetIndex) {
            nextChar = table.charAt(currentIndex + 1);
          } else {
            nextChar = table.charAt(currentIndex - 1);
          }
          this.intermediate = this.intermediate.replaceAt(i, nextChar);
          if (fuzz > 0) {
            fuzz--;
            i++;
          } else {
            break;
          }
        }
      }
      this.lastUpdate = now;
    }
    
    if(this.intermediate === artistName){
      fill(255,0,0);
    } else {
      fill(0);
    }
    text(this.intermediate, 0, 0);
  }
}

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};
