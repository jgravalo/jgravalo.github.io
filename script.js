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