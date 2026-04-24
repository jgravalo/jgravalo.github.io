import { useState, useEffect, useRef } from 'react'
import logo_hoz from './assets/roundten_logo_blanco_hoz.png'
import logo_ver from './assets/roundten_logo_blanco_ver.png'
import logo_bl from './assets/logo_blanco.jpg'
import logo from './assets/logo.png'
import './App.css';
import './components/home/Home.css';
import Home from './components/home/Home';
import Shop from './components/shop/Shop.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadProduct from './components/admin/loadProduct.jsx';
import ErrorBoundary from './components/ErrorBoundary';

// ─── HOOKS ────────────────────────────────────────────────
function useCart() {
  const [items, setItems] = useState([]);

  const add = (product) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);

  return { items, add, count, total };
}

// ─── COMPONENTS ───────────────────────────────────────────

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rx = useRef(0), ry = useRef(0);
  const mx = useRef(0), my = useRef(0);

  useEffect(() => {
    const move = (e) => { mx.current = e.clientX; my.current = e.clientY; };
    document.addEventListener("mousemove", move);
    let raf;
    const anim = () => {
      if (dotRef.current) { dotRef.current.style.left = mx.current + "px"; dotRef.current.style.top = my.current + "px"; }
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = rx.current + "px"; ringRef.current.style.top = ry.current + "px"; }
      raf = requestAnimationFrame(anim);
    };
    anim();
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

function Nav({ cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav id="nav" className={scrolled ? "scrolled" : ""}>
      <a href="#" className="nav-logo">
        {/* <img id='logo-bl' src={logo_bl} alt="Tu Marca" width={70}/> */}
        <span className='nav-logo-symbol'>JG</span>
        <div className="nav-logo-separator"></div>
        <span className="nav-logo-text">JESUS GRAVALOS</span>
        {/* <img id='logo-hoz' src={logo_hoz} alt="Tu Marca" /> */}
        <span className="nav-logo-desc">DEVELOPER</span>
      </a>
      <ul className="nav-links">
        {["Collections", "Projects", "About me", "Contact"].map((l) => (
          <li key={l}><a href={`#${l.toLowerCase().replace(" ", "-")}`}>{l}</a></li>
        ))}
      </ul>
      <div className="nav-actions">
        <button>Search</button>
        <button className="cart-btn">Carrito ({cartCount})</button>
      </div>
    </nav>
  );
}

function Footer() {
  const cols = [
    { title: "Tienda", links: ["Colecciones", "Novedades", "Ofertas", "Bestsellers"] },
    { title: "Información", links: ["Sobre Nosotros", "Envíos", "Devoluciones", "FAQ"] },
    { title: "Legal", links: ["Privacidad", "Términos de uso", "Cookies", "Contacto"] },
  ];
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">Tu Marca</div>
          <p className="footer-brand-desc">Diseño español con alma propia. Cada producto pensado para durar y para destacar.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="footer-col-title">{c.title}</div>
            <ul className="footer-links">
              {c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className='footer-logo'>
          {/* <img src={logo_ver} alt="Tu Marca" /> */}
          <span className="nav-logo-text">JESUS GRAVALOS</span>
          <span className="nav-logo-desc">DEVELOPER</span>
        </div>
        <div className="footer-socials">
          {[
            { name: "LinkedIn", href: "https://linkedin.com/in/jgravalo" },
            { name: "Github", href: "https://github.com/jgravalo" },
            { name: "Gmail", href: "mailto:jesus.gravalos@outlook.com" },
            /* { name: "Instagram", href: "https://instagram.com/jesusgr.___" } */
          ].map((s) => <a key={s.name} href={s.href}>{s.name}</a>)}
        </div>
        <div className="footer-copy">© 2026 Tu Marca · Hecho en España</div>
      </div>
    </footer>
  );
}

export default function App() {
  const { items, add, count, total } = useCart();

  return (
    <Router>
      {/* <style>{CSS}</style> */}
      <Cursor />
      <Nav cartCount={count} />
      <Routes>
        <Route path="/" element={<ErrorBoundary><Home onAdd={add} /></ErrorBoundary>} />
        <Route path="/load-product" element={<LoadProduct />} />
        <Route path="/shop" element={<Shop />} />
        {/* ruta de juego: /sala/nombre */}
        {/* <Route path="/:room/:player" element={<Game />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}
