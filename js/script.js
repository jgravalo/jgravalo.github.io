// github repos
const username = "jgravalo";
const gitignore = [
    "jgravalo.github.io",
    "jgravalo",
    "42Cursus",

    "Libft",
    "ft_printf",
    "Get_next_line",
    "CPP0-4",
    "CPP5-9",
  ];
let m = new Map();
m.set("webserv", ["NGINX", "Python", "PHP"]);
m.set("Inception", ["NGINX", "MySQL", "Wordpress"]);
m.set("ft_transcendence", ["Javascript", "PostgreSQL", "NGINX", "Docker", "Redis"]);
m.set("Task-Management-System", ["PostgreSQL", "Docker", "Redis"]);
m.set("Email-Miner-LLM", ["MySQL", "Docker"]);
m.set("Mini-Pokedex", ["React", "NodeJS"]);

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
            <p>${repo.description || "No description"}</p>
          </div>
          <div>
            <div class="languages">
              <span style="border-color: rainbow;">${repo.language}</span>
            </div>
            <div class="project-card-2">
              <a href="${repo.html_url}" target="_blank">See on GitHub</a>
            </div>
          </div>
        `;
        if (m.has(repo.name)) {
          console.log("card = ", card);
          language = card.querySelector(".languages");
          console.log("language = ", language);
          m.get(repo.name).forEach((item, i) => {
            const span = document.createElement("span");
            span.textContent = `${item}`;
            console.log("span = ", span);
            language.appendChild(span);
          });
        }
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
