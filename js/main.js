window.addEventListener("load", () => {
  document.querySelector(".loading").classList.add("flex");
  document.querySelector(".loading").classList.add("hidden");
  scrollPrecentage();
});

//scroll Progress
let scrollProgress = document.getElementById("progress");
let topBtn = document.querySelector("#progress-value i");
function scrollPrecentage() {
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  scrollProgress.style.background = `conic-gradient(#e70634 ${scrollValue}%, #2b2f38 ${scrollValue}%)`;
}

window.addEventListener("scroll", () => {
  scrollPrecentage();
  if (window.scrollY > 300) {
    topBtn.classList.add("text-red-600");
    topBtn.classList.remove("text-transparent");
    topBtn.onclick = () => window.scrollTo({ top: 0 });
  } else {
    topBtn.classList.add("text-transparent");
  }
});

//menu
let toggleIcon = document.querySelector(".toggle-icon");
let menu = document.querySelector(".menu");
toggleIcon.onclick = () => {
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
  toggleIcon.classList.toggle("active");
  if (window.pageYOffset > 97) {
    toggleIcon.classList.toggle("open");
  }
};

//nav
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 97) {
    toggleIcon.classList.remove("relative");
    toggleIcon.classList.add("fixed");
    toggleIcon.classList.add("open");
  } else {
    toggleIcon.classList.remove("fixed");
    toggleIcon.classList.remove("open");
    toggleIcon.classList.add("relative");
  }
  if (menu.classList.contains("flex")) {
    toggleIcon.classList.remove("open");
  } else {
    if (window.pageYOffset > 97) {
      toggleIcon.classList.add("open");
    }
  }
});

// play video
let openVideo = document.querySelector(".play-btn span");
let videoContainer = document.querySelector(".play-movie");
let video = document.querySelector(".play-movie video");

let close = document.querySelector(".close-video");

openVideo.onclick = () => {
  videoContainer.classList.remove("hidden");
  videoContainer.classList.add("flex");
  video.play();
  toggleIcon.style.zIndex = "1";
};

close.onclick = () => {
  videoContainer.classList.add("hidden");
  videoContainer.classList.remove("flex");
  video.pause();
  toggleIcon.style.zIndex = "20";
};

//screen shots
let screenContainer = document.querySelector(".ss-container");
let screens = document.querySelectorAll(".ss-container img");

screens.forEach((ele) => {
  ele.onclick = () => {
    let screenHolder = document.createElement("div");
    let screen = document.createElement("img");
    let close = document.createElement("span");
    screen.src = ele.src;
    close.appendChild(document.createTextNode("X"));
    screenHolder.appendChild(close);
    screenHolder.appendChild(screen);
    screenContainer.appendChild(screenHolder);
    close.className =
      "absolute  right-16 font-bold top-16 text-red-600 text-2xl hover:scale-110 cursor-pointer transition";
    screen.className = "w-4/5";
    screenHolder.className =
      "fade fixed w-full h-full top-0 left-0 items-center justify-center bg-neutral-950 bg-opacity-60 z-50 flex";

    close.onclick = () => close.parentElement.remove();
  };
});
