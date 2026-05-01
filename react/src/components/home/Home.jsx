import { useState, useEffect, useRef } from "react";

// ─── CONFIG ───────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const apiFetch = (path, opts = {}) =>
  fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  }).then((r) => r.json());

// ─── HOOKS ────────────────────────────────────────────────
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/products/?featured=true")
      .then(setProducts)
      .catch(() =>
        setProducts([
          { id: 1, name: "Modelo Alpha", price: "89.00", badge: "Nuevo", brand: "Tu Marca" },
          { id: 2, name: "Modelo Beta", price: "72.00", original_price: "90.00", badge: "−20%", brand: "Tu Marca" },
          { id: 3, name: "Modelo Gamma", price: "120.00", brand: "Tu Marca" },
          { id: 4, name: "Modelo Delta", price: "195.00", badge: "Exclusivo", brand: "Tu Marca" },
        ])
      )
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    // console.log('Fetching repos from GitHub...');
    fetch('https://api.github.com/users/jgravalo/repos')
      .then(r => {
        // // console.log('Response status:', r.status);
        return r.json();
      })
      .then(data => {
        // console.log('Raw data received:', data);
        const filtered = data.filter(r => !gitignore.includes(r.name));
        // console.log('Filtered repos (not in gitignore):', filtered);
        setRepos(filtered);
      })
      .catch(error => {
        // console.error('Error fetching repos:', error);
        setRepos([]);
      })
      .finally(() => {
        // console.log('Fetch completed');
        setLoading(false);
      });
  }, []);
  // console.log("Repos loaded:", repos);
  return { repos, loading };
}

// ─── COMPONENTS ───────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-tag">Open to Work</div>
        <h1 className="hero-title">
          Development
          that <em>transforms</em><br />
          your space
        </h1>
        <p className="hero-desc">
          Each piece, a statement of intent. Young craftsmanship with a contemporary vision.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">See projects</a>
          <a href="#about-me" className="btn-ghost">About me</a>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Diseño Español", "Envío Gratis +50€", "20.000 Unidades en Stock", "Devolución 30 Días", "Pago Seguro"];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i}>{t}<span className="sep"> ✦ </span></span>
        ))}
      </div>
    </div>
  );
}

const skills = [
  { num: "01", name: "BACK END", langs: ["c", "cpp", "python", "django", "nodejs", "java"] },
  { num: "02", name: "FRONT END", langs: ["js", "ts", "react", "bootstrap", "html", "css"] },
  { num: "03", name: "DEVOPS", langs: ["git", "docker", "postgresql", "mysql", "sqlite", "nginx"] },
];

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section-header reveal">
        <div>
          <div className="section-label">Skills</div>
          <h2 className="section-title">My <em>Stack</em></h2>
        </div>
        <a href="#" className="view-all">See all</a>
      </div>
      <div className="skills-grid">
        {skills.map((c, i) => (
          <div key={c.num} className={`skill-card reveal${i > 0 ? ` reveal-delay-${i}` : ""}`}>
            <div className="img-placeholder">
              <div className="skill-icons-grid">
                {c.langs.map((lang) => (
                  <img key={lang} className="img-skill" src={`https://skillicons.dev/icons?i=${lang}`} alt={lang} />
                ))}
              </div>
            </div>
            <div className="skill-overlay">
              <div className="skill-num">{c.num}</div>
              <div className="skill-name">{c.name}</div>
              <a href="#" className="skill-link">Discover</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RepoCard({ repo }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="repo-card reveal">
      <div className="repo-header">
        <h3 className="repo-title">{repo.name}</h3>
        <div className="repo-stats">
          {repo.stargazers_count > 0 && (
            <span className="repo-stat">
              <span className="stat-icon">⭐</span>
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="repo-stat">
              <span className="stat-icon">🍴</span>
              {repo.forks_count}
            </span>
          )}
        </div>
      </div>

      <p className="repo-description">
        {repo.description || "No description available"}
      </p>

      <div className="repo-footer">
        {repo.language && (
          <span className="repo-language">
            <span className="language-dot" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
            {repo.language}
          </span>
        )}
        <span className="repo-updated">
          Updated {formatDate(repo.updated_at)}
        </span>
      </div>

      <div className="repo-actions">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-link"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

// Helper function for language colors
function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Vue: '#2c3e50',
    React: '#61dafb'
  };
  return colors[language] || '#586069';
}

function Projects({ onAdd }) {
  const { repos, loading } = useRepos();
  const [showAll, setShowAll] = useState(false);
  const initialCount = 8;

  const displayedRepos = showAll ? repos : repos.slice(0, initialCount);
  const hasMore = repos.length > initialCount;

  return (
    <section className="projects" id="projects">
      <div className="section-header reveal">
        <div>
          <div className="section-label">Projects</div>
          <h2 className="section-title">My <em>Work</em></h2>
        </div>
        <a href="https://github.com/jgravalo" target="_blank" rel="noopener noreferrer" className="view-all">Ver en GitHub</a>
      </div>
      <div className="projects-grid">
        {loading
          ? Array(4).fill(null).map((_, i) => (
              <div key={i} className="repo-card skeleton reveal" />
            ))
          : displayedRepos.map((r) => <RepoCard key={r.id} repo={r} />)
        }
      </div>
      {hasMore && !loading && (
        <div className="projects-footer">
          <button
            onClick={() => setShowAll(!showAll)}
            className="show-more-btn"
          >
            {showAll ? 'Mostrar menos' : `Mostrar más (${repos.length - initialCount})`}
          </button>
        </div>
      )}
    </section>
  );
}

function StripCta() {
  return (
    <div className="strip-cta reveal">
      <div className="strip-cta-text">
        <div className="strip-cta-label">Oferta limitada</div>
        <h3 className="strip-cta-title">
          25% de descuento<br />en toda la <em>colección</em>
        </h3>
      </div>
      <a href="#" className="btn-primary">Aprovechar ahora</a>
    </div>
  );
}

function Founders() {
  return (
    <section className="founders" id="about-me">
      <div className="founders-grid">
        <div className="founders-visual reveal">
          <div className="founders-img-main">
            <img src="https://github.com/jgravalo.png" alt="Founders" />
            {/* <span>👤</span> */}
          </div>
          <div className="founders-accent"><span>✦</span></div>
        </div>
        <div className="founders-text reveal reveal-delay-1">
          <div className="section-label" style={{ marginBottom: 24 }}>About me</div>
          <blockquote className="founders-quote">
            {/* "Construimos esto porque creemos que el <em>diseño de calidad</em> no debería ser un lujo." */}
            "I built this because I believe that <em>quality design</em> shouldn't be a luxury."
          </blockquote>
          <p className="founders-body">
            {/* Somos dos fundadores con una visión clara: traer al mercado productos excepcionales a un precio justo.
            Cada decisión, desde el diseño hasta la logística, la tomamos juntos con total transparencia y convicción. */}
            I'm a developer with a clear vision: to bring exceptional products to market at a fair price. Every decision, from design to logistics, I make together with full transparency and conviction.
          </p>
          <div className="founders-names">
            {[["Jesús Alberto Grávalos Olivier", "Software & AI Developer"]/* , ["Fundador 2", "Co-founder & Tecnología"] */].map(([name, role]) => (
              <div key={name}>
                <div className="founder-name">{name}</div>
                <div className="founder-role">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    if (!email) return;
    try {
      await apiFetch("/newsletter/subscribe/", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("ok"); // fallback graceful
    }
  };

  return (
    <section className="contact reveal" id="contact">
      <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Contact</div>
      <h2 className="contact-title">Primero en <em>enterarte</em></h2>
      <p className="contact-sub">Lanzamientos, ofertas exclusivas y novedades. Sin spam.</p>
      {status === "ok" ? (
        <p style={{ color: "var(--accent)", fontFamily: "var(--font-body)", marginTop: 24 }}>
          ¡Suscrito correctamente! ✦
        </p>
      ) : (
        <div className="contact-form">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button onClick={handleSubmit}>Suscribirse</button>
        </div>
      )}
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────
export default function Home({ onAdd }) {
  useReveal();

  return (
    <>
      <Hero />
      {/* <Marquee /> */}
      <Founders />
      <Skills />
      <Projects onAdd={onAdd} />
      {/* <StripCta /> */}
      {/* <Contact /> */}
    </>
  );
}
