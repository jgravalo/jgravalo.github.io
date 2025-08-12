// github repos
const username = "jgravalo";
const gitignore = [
    "jgravalo.github.io",
    "jgravalo",
    "42Cursus",

    "ft_printf",
    "Libft",
    "Get_next_line",
    "CPP_modules_2",
  ];

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      const container = document.getElementById('github-projects');
      repos
        .filter(repo => !gitignore.includes(repo.name))
        .forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
          <div>
            <h3>${repo.name}</h3>
	    <span>${repo.language}</span>
            <p>${repo.description || "No description"}</p>
          </div>
          <div class="project-card-2">
            <a href="${repo.html_url}" target="_blank">See on GitHub</a>
            <!--
            <div>
              <i class="far fa-star"></i>
              <span>${repo.stargazers_count}</span>
            </div>
            <span>${repo.language}</span>
            -->
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar los repositorios:", error);
    });

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

  prevBtn.addEventListener("click", () => {
    const len = slider.querySelector(".slide").clientWidth + 
      parseInt(getComputedStyle(slider.querySelector(".slide")).marginRight);
    if (slide.scrollLeft < len) {
      slide.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    /* console.log("prev = ", -len); */
    slide.scrollBy({ left: -len, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    const len = slider.querySelector(".slide").clientWidth + 
      parseInt(getComputedStyle(slider.querySelector(".slide")).marginRight);
    if (slide.scrollLeft + slide.clientWidth >= slide.scrollWidth - len) {
      slide.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    /* console.log("next = ", len); */
    slide.scrollBy({ left: len, behavior: "smooth" });
  });
}