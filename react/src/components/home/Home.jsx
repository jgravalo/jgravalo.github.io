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

  useEffect(() => {
    fetch('https://api.github.com/users/jgravalo/repos')
      .then(r => r.json())
      .then(data => setRepos(data.filter(r => !r.fork)))
      .catch(() => setRepos([]))
      .finally(() => setLoading(false));
  }, []);
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
          Diseño<br />
          que <em>transforma</em><br />
          tu espacio
        </h1>
        <p className="hero-desc">
          Cada pieza, una declaración de intenciones. Craftsmanship español con visión contemporánea.
        </p>
        <div className="hero-cta">
          <a href="#products" className="btn-primary">Ver Colección</a>
          <a href="#about" className="btn-ghost">Nuestra historia</a>
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

const collections = [
  { num: "01", name: "SUN COLLECTION", icon: "🏺" },
  { num: "02", name: "OPTICAL COLLECTION", icon: "◆" },
  { num: "03", name: "CAPSULE 01", icon: "◉" },
];

function Collections() {
  return (
    <section className="collections">
      <div className="section-header reveal">
        <div>
          <div className="section-label">Explorar</div>
          <h2 className="section-title">Nuestras <em>Colecciones</em></h2>
        </div>
        <a href="#" className="view-all">Ver todo</a>
      </div>
      <div className="collections-grid">
        {collections.map((c, i) => (
          <div key={c.num} className={`collection-card reveal${i > 0 ? ` reveal-delay-${i}` : ""}`}>
            <div className="img-placeholder">
              <span className="img-icon" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                {c.icon}
              </span>
            </div>
            <div className="collection-overlay">
              <div className="collection-num">{c.num}</div>
              <div className="collection-name">{c.name}</div>
              <a href="#" className="collection-link">Descubrir</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RepoCard({ repo }) {
  return (
    <div className="product-card reveal">
      <div className="product-img-wrap">
        <div className="product-placeholder">
          <span className="product-placeholder-icon">📁</span>
        </div>
        {repo.language && <div className="product-badge">{repo.language}</div>}
      </div>
      <div className="product-info">
        <div className="product-brand">GitHub</div>
        <div className="product-name">{repo.name}</div>
        <div className="product-price">
          <strong>{repo.stargazers_count} ⭐</strong>
        </div>
      </div>
    </div>
  );
}

function Projects({ onAdd }) {
  const { repos, loading } = useRepos();

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
              <div key={i} className="product-card skeleton reveal" />
            ))
          : repos.slice(0, 8).map((r) => <RepoCard key={r.id} repo={r} />)
        }
      </div>
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
      <div className="section-label" style={{ justifyContent: "center", marginBottom: 16 }}>Newsletter</div>
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
      <Collections />
      <Projects onAdd={onAdd} />
      {/* <StripCta /> */}
      <Founders />
      <Contact />
    </>
  );
}
