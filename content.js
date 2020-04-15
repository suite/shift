console.log("[shift] Loaded script.");

const loadColors = img => {
  img = img.split('url("')[1].split('"')[0];
  console.log("[shift] Loading colors with img:", img);

  let x = document.createElement("IMG");
  x.setAttribute("src", img);
  x.setAttribute("width", "230");
  x.setAttribute("height", "230");

  const colorThief = new ColorThief();

  x.addEventListener("load", function() {
    let colorPalette = colorThief.getPalette(x);

    let mainColor = rgbToHex(
      colorPalette[0][0],
      colorPalette[0][1],
      colorPalette[0][2]
    );

    let accentOne = rgbToHex(
      colorPalette[1][0],
      colorPalette[1][1],
      colorPalette[1][2]
    );

    /* Change button colors */
    changeColor("now-playing-bar-container", mainColor, true);

    changeColor("control-button", accentOne);

    /* Change color of playbar */
    changeColor(
      "progress-bar__bg",
      rgbToHex(colorPalette[2][0], colorPalette[2][1], colorPalette[2][2]),
      true
    );

    changeColor(
      "progress-bar__fg",
      rgbToHex(colorPalette[3][0], colorPalette[3][1], colorPalette[3][2]),
      true
    );

    /* Change color of title, artists, and play button */
    document.getElementsByClassName(
      "control-button--circled"
    )[0].style.border = `1px solid ${accentOne}`;

    document.getElementsByClassName(
      "control-button--circled"
    )[0].style.borderRadius = "500px";

    let spans = document
      .querySelector(".now-playing-bar")
      .getElementsByTagName("span");

    for (let span of spans) {
      span.style.color = accentOne;
      if (span.getElementsByTagName("a").length > 0) {
        span.getElementsByTagName("a")[0].style.color = accentOne;
      }
    }

    let playbackClock = document.getElementsByClassName(
      "playback-bar__progress-time"
    );
    for (let clock of playbackClock) {
      clock.style.color = accentOne;
    }
  });
};

const changeColor = (className, color, bg) => {
  console.log(`[shift] Changing ${className} to ${color}.`);
  var elements = document.getElementsByClassName(className);
  for (var i in elements) {
    if (elements.hasOwnProperty(i)) {
      if (bg) {
        elements[i]["style"]["background-color"] = color;
      } else {
        elements[i]["style"]["color"] = color;
      }
    }
  }
};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

let spotifyPic = "";
this.setInterval(() => {
  let coverArtImage = document.getElementsByClassName("cover-art-image");
  if (coverArtImage.length > 0) {
    let currImg = coverArtImage[0]["style"]["backgroundImage"];
    if (currImg) {
      if (spotifyPic != currImg) {
        loadColors(currImg);
        spotifyPic = currImg;
      }
    } else {
      console.log("[shift] Waiting for image...");
    }
  }
}, 100);
