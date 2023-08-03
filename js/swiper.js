//Swiper

let swiper = document.querySelector(".swiper-wrapper");
let swiperSlide = [...swiper.children];

let slideWidth = swiper.querySelector(".swiper-slide").offsetWidth;
let sliderRows = document.querySelectorAll(".swiper .row");

sliderRows.forEach((ele) => {
  ele.onclick = () => {
    swiper.scrollLeft += ele.classList.contains("left")
      ? -slideWidth - 12
      : slideWidth + 12;
  };
});

let isDragging = false,
  startX,
  scrollLeft,
  timeOut;

function dragStart(e) {
  isDragging = true;
  swiper.classList.add("dragging");
  startX = e.pageX;
  scrollLeft = swiper.scrollLeft;
}
function dragging(e) {
  if (!isDragging) return;
  swiper.scrollLeft = scrollLeft - (e.pageX - startX);
  e.preventDefault();
}

function dragStop() {
  isDragging = false;
  swiper.classList.remove("dragging");
}

let cardPerV = Math.round(swiper.offsetWidth / slideWidth);

function addSlide() {
  swiperSlide
    .slice(-cardPerV)
    .reverse()
    .forEach((ele) => {
      swiper.insertAdjacentHTML("afterbegin", ele.outerHTML);
    });

  swiperSlide.slice(0, cardPerV).forEach((ele) => {
    swiper.insertAdjacentHTML("beforeend", ele.outerHTML);
  });
}
addSlide();
function infinteLoop() {
  if (swiper.scrollLeft == 0) {
    console.log("0");
    swiper.classList.add("scroll-auto");
    swiper.classList.remove("scroll-smooth");
    swiper.scrollLeft =
      swiper.scrollWidth - 2 * swiper.offsetWidth - slideWidth - 42;
    swiper.classList.remove("scroll-auto");
    swiper.classList.add("scroll-smooth");
  } else if (
    Math.ceil(swiper.scrollLeft) ==
    swiper.scrollWidth - swiper.offsetWidth
  ) {
    swiper.classList.add("scroll-auto");
    swiper.classList.remove("scroll-smooth");
    swiper.scrollLeft = swiper.offsetWidth + slideWidth + 42;
    swiper.classList.remove("scroll-auto");
    swiper.classList.add("scroll-smooth");
  }
  clearInterval(timeOut);
  if (!swiper.matches(":hover")) autoPlay();
}

function autoPlay() {
  timeOut = setInterval(() => (swiper.scrollLeft += slideWidth + 12), 2000);
}
autoPlay();
swiper.addEventListener("mouseup", dragStop);
swiper.addEventListener("scroll", infinteLoop);
swiper.addEventListener("mousedown", dragStart);
swiper.addEventListener("mousemove", dragging);
swiper.addEventListener("mouseenter", () => clearInterval(timeOut));
swiper.addEventListener("mouseleave", autoPlay);
