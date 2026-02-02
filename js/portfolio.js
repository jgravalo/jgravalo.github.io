// github repos
const username = "jgravalo";
const gitignore = [
    "jgravalo.github.io",
    "jgravalo",
    "42Cursus",
    "react-portfolio",


    "Libft",
    "ft_printf",
    "Get_next_line",
    "CPP0-4",
    "CPP5-9",
    "Push_swap",
  ];
let m = new Map();
m.set("webserv", ["NGINX", "Python", "PHP"]);
m.set("Inception", ["NGINX", "MySQL", "Wordpress"]);
m.set("ft_transcendence", ["PostgreSQL", "NGINX", "Redis"]);
m.set("Task-Management-System", ["PostgreSQL", "Redis"]);
m.set("Mini-Pokedex", ["React", "NodeJS"]);
m.set("HydroData_Frontend", ["React", "NodeJS"]);
m.set("HydroData_Backend", ["Spring", "Spring Boot"]);

const container = document.getElementById('github-projects');

async function loadPortfolio() {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    
    // 1. Manejo del error 403 (Límite excedido)
    if (res.status === 403) {
      container.innerHTML = "<p>Límite de API alcanzado. Intenta de nuevo en una hora.</p>";
      return;
    }

    const repos = await res.json();

    // 2. Validación de seguridad (¿Es un array?)
    if (!Array.isArray(repos)) {
      console.error("La respuesta no es una lista válida:", repos);
      return;
    }

    // 3. Filtros (Ocultar específicos y quitar forks)
    const ocultar = ["repo-ejercicio-1", "test-web"];
    const filteredRepos = repos.filter(repo => /* !repo.fork &&  */!gitignore.includes(repo.name));

    container.innerHTML = ""; // Limpiar cargando...

    // 4. Obtener lenguajes e insertar en el HTML
    for (const repo of filteredRepos) {
      // Pedimos los lenguajes de este repo específico
      const langRes = await fetch(repo.languages_url);
      const langsData = await langRes.json();
      const languages = Object.keys(langsData); // Array de strings ["JS", "CSS"]

      // Crear el HTML de la card
      const card = document.createElement("div");
      card.classList.add('project-card');
          card.innerHTML = `
            <div>
              <h3>${repo.name}</h3>
              <p>${repo.description || "No description"}</p>
            </div>
            <div>
              <div class="languages">
                ${languages.map(lang => `<span style="border-color: rainbow;">${lang}</span>`).join("")}
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
    }

  } catch (error) {
    console.error("Error fatal:", error);
    container.innerHTML = "<p>Hubo un error al conectar con GitHub.</p>";
  }
}

loadPortfolio();
