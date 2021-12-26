console.log("www.aungmyokyaw.com");
var gBackgroundImg = "";
function setWidthAndHeight() {
  var amkElement = document.getElementById("amk");
  var overlay = document.getElementById("overlay");
  amkElement.style.height = window.innerHeight + "px";
  amkElement.style.width = window.innerWidth + "px";
  overlay.style.height = window.innerHeight + "px";
  overlay.style.width = window.innerWidth + "px";
}

function backgroundImgUrlGen() {
  var backgroundImgWidth = window.innerWidth;
  var backgroundImgHeight = window.innerHeight;
  var backgroundImgUrl =
    "https://picsum.photos/" +
    backgroundImgWidth +
    "/" +
    backgroundImgHeight +
    ".jpg?random=" +
    Math.floor(Math.random() * 1e3);
  return backgroundImgUrl;
}

function setBackground(setNow) {
  if (!setNow && !gBackgroundImg) {
    gBackgroundImg = backgroundImgUrlGen();
    checkBackgroundImageIsLoaded(gBackgroundImg);
    return false;
  }
  setWidthAndHeight();
  var amkElement = document.getElementById("amk");
  amkElement.style.backgroundImage = "url(" + gBackgroundImg + ")";
  gBackgroundImg = "";
}
function checkBackgroundImageIsLoaded(srcUrl) {
  var backgroundImageElement = document.getElementById("backgroundImageLoader");
  backgroundImageElement.src = srcUrl;
  backgroundImageElement.onload = function () {
    if (backgroundImageElement.complete) {
      setBackground(true);
    }
  };
}
setWidthAndHeight();
window.setInterval(setBackground, 8000, false);
window.addEventListener("resize", setWidthAndHeight);
