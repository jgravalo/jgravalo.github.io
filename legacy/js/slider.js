
// slider

/* const slider = document.getElementById("skill-slider"); */
const sliders = document.querySelectorAll(".slider-container");

for (const slider of sliders) {
  const slide = slider.querySelector(".slider");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  /* console.log("slider = ", slider);
  console.log("prevBtn = ", prevBtn);
  console.log("nextBtn = ", nextBtn); */

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const len = slider.querySelector(".slide").clientWidth + 
      16  /* 16px is the marginRight */;
      /* parseInt(getComputedStyle(slider.querySelector(".slide")).marginRight); */
    console.log("marginRight = ", parseInt(getComputedStyle(slider.querySelector(".slide")).marginRight));
    console.log("slide.scrollLeft = ", slide.scrollLeft, " < len = ", len);
    if (slide.scrollLeft < len) {
      slide.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    /* console.log("prev = ", -len); */
    slide.scrollBy({ left: -len, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const len = slider.querySelector(".slide").clientWidth + 
      16  /* 16px is the marginRight */;
      /* parseInt(getComputedStyle(slider.querySelector(".slide")).marginRight); */
    console.log("marginRight = ", parseInt(getComputedStyle(slider.querySelector(".slide")).marginRight));
    console.log("slide.scrollLeft = ", slide.scrollLeft, "+ slide.clientWidth = ", slide.clientWidth,
      " >= slide.scrollWidth = ", slide.scrollWidth, " - len = ", len);
    if (slide.scrollLeft + slide.clientWidth >= slide.scrollWidth - len + 16) {
      slide.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    /* console.log("next = ", len); */
    slide.scrollBy({ left: len, behavior: "smooth" });
  });
}
