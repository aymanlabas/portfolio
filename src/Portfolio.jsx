import { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { defaultData } from "./data";
import {
  Aurora, Noise, Particles, ClickSpark, SplitText, ShinyText, GradientText,
  BlurText, DecryptedText, RotatingText, CountUp, TiltedCard, Magnet, StarBorder,
  CircularText, Marquee, Reveal, SpotlightCard, Dock
} from "./components/reactbits";

const lines = s => (s || "").split("\n").filter(Boolean);

const LANG_MAP = {
  "Arabic (native)": "Arabic",
  "English B2": "English",
  "French B1": "French",
  "German A1": "German",
};
const LANG_LEVEL = {
  "Arabic (native)": "Native",
  "English B2": "B2",
  "French B1": "B1",
  "German A1": "A1",
};

const SKILL_ICONS = {
  "Languages": "💻",
  "Web & Mobile": "🌐",
  "Databases": "🗄️",
  "DevOps & Tools": "⚙️",
};

// Devicon CDN base
const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
// Simple Icons CDN for brands that Devicon renders poorly (especially dark ones)
const SI = "https://cdn.simpleicons.org";

const TECH_ICONS = {
  // Languages
  "PHP": `${DI}/php/php-plain.svg`,
  "Python": `${DI}/python/python-original.svg`,
  "C++": `${DI}/cplusplus/cplusplus-original.svg`,
  "JavaScript": `${DI}/javascript/javascript-original.svg`,
  "Java": `${DI}/java/java-original.svg`,
  // Web & Mobile — Laravel uses Simple Icons for correct brand red
  "Laravel": `${SI}/laravel/FF2D20`,
  "React.js": `${DI}/react/react-original.svg`,
  "Spring Boot": `${DI}/spring/spring-original.svg`,
  "React Native": `${DI}/react/react-original.svg`,
  "HTML": `${DI}/html5/html5-original.svg`,
  "CSS": `${DI}/css3/css3-original.svg`,
  "Firebase": `${DI}/firebase/firebase-plain.svg`,
  "Next.js": `${SI}/nextdotjs/ffffff`,
  "Material UI": `${DI}/materialui/materialui-original.svg`,
  "Bootstrap": `${DI}/bootstrap/bootstrap-original.svg`,
  // Databases
  "MySQL": `${DI}/mysql/mysql-original.svg`,
  "PostgreSQL": `${DI}/postgresql/postgresql-original.svg`,
  "MongoDB": `${DI}/mongodb/mongodb-original.svg`,
  "Oracle": `${DI}/oracle/oracle-original.svg`,
  "SQL Server": `${SI}/microsoftsqlserver/ffffff`,
  "PL/SQL": `${DI}/oracle/oracle-original.svg`,
  // DevOps & Tools
  "Linux": `${DI}/linux/linux-original.svg`,
  "Docker": `${DI}/docker/docker-original.svg`,
  "Git": `${DI}/git/git-original.svg`,
  "GitHub": `${SI}/github/ffffff`,
  "GitLab": `${DI}/gitlab/gitlab-original.svg`,
  "Jira": `${DI}/jira/jira-original.svg`,
};

function Sec({ id, t, children }) {
  return (
    <section id={id}>
      <Reveal>
        <h2><GradientText>{t}</GradientText></h2>
      </Reveal>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [d, setD] = useState(defaultData);
  const [sent, setSent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!db) return;
    getDoc(doc(db, "portfolio", "main"))
      .then(s => s.exists() && setD({ ...defaultData, ...s.data() }))
      .catch(() => { });
  }, []);

  const send = async e => {
    e.preventDefault();
    setLoading(true);
    setSent("");
    const f = new FormData(e.target);
    const name = f.get("name")?.trim();
    const email = f.get("email")?.trim();
    const message = f.get("message")?.trim();

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || d.telegramBotToken;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || d.telegramChatId;

    let telegramSent = false;
    let firestoreSaved = false;

    // 1. Send via Telegram Bot API
    if (botToken && chatId) {
      try {
        const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const text = `📬 <b>Nouveau message sur ton Portfolio !</b>\n\n` +
          `👤 <b>Nom :</b> ${esc(name)}\n` +
          `📧 <b>Email :</b> ${esc(email)}\n\n` +
          `💬 <b>Message :</b>\n${esc(message)}`;

        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: "HTML"
          })
        });
        const resData = await res.json();
        if (resData.ok) {
          telegramSent = true;
        } else {
          console.error("Telegram API error:", resData);
        }
      } catch (err) {
        console.error("Telegram fetch error:", err);
      }
    }

    // 2. Also save to Firestore if configured
    if (db) {
      try {
        await addDoc(collection(db, "messages"), {
          name, email, message, createdAt: serverTimestamp()
        });
        firestoreSaved = true;
      } catch (err) {
        console.error("Firestore save error:", err);
      }
    }

    if (telegramSent || firestoreSaved) {
      setSent("✓ Message envoyé avec succès — merci ! Je vous répondrai très bientôt.");
      e.target.reset();
    } else if (!botToken || !chatId) {
      setSent("⚠ Telegram n'est pas encore configuré. Renseignez votre Bot Token & Chat ID ou écrivez-moi par email.");
    } else {
      setSent("⚠ Erreur lors de l'envoi sur Telegram. Veuillez vérifier votre Token/Chat ID.");
    }
    setLoading(false);
  };

  // Flatten all skill items, strip entries with no logo (Agile, Scrum)
  const NO_LOGO = new Set(["Agile", "Scrum"]);
  const techItems = d.skills
    .flatMap(s => s.items.split(",").map(x => x.trim()))
    .filter(name => Boolean(name) && !NO_LOGO.has(name))
    .map(name => ({ name, src: TECH_ICONS[name] || null }))
    // deduplicate by name
    .filter((item, idx, arr) => arr.findIndex(t => t.name === item.name) === idx);

  const stats = [
    [d.experiences.length, "Experiences"],
    [d.projects.length, "Projects"],
    [d.certificates.length, "Certificates"],
    [techItems.length, "Technologies"],
  ];

  // parse languages string into array
  const langs = (d.languages || "").split("·").map(l => l.trim()).filter(Boolean);

  return (
    <>
      {/* ── Fixed bg layers ── */}
      <div className="bg"><Aurora /></div>
      <Particles />
      <Noise />
      <ClickSpark />

      {/* ── Nav ── */}
      <nav>
        <b>AL</b>
        {["home", "about", "experience", "projects", "skills", "education", "contact"].map(s =>
          <a key={s} href={"#" + s}>{s}</a>
        )}
      </nav>

      {/* ── Dock ── */}
      <Dock items={[
        ["home", "🏠"], ["about", "👤"], ["experience", "💼"], ["projects", "🚀"],
        ["skills", "⚡"], ["education", "🎓"], ["contact", "✉️"]
      ]} />

      {/* ══════════ HERO ══════════ */}
      <section className="hero" id="home">
        <div className="hl">
          <ShinyText text="👋 Hello, I'm" />
          <SplitText text={d.name} className="big" />

          <h2 className="role">
            <RotatingText words={[
              "Full Stack Developer",
              "DevOps Enthusiast",
              "PFE Intern · Feb 2027"
            ]} />
          </h2>

          <BlurText text={d.bio} className="lead" />

          <p className="avail">
            <DecryptedText text={d.availability} />
          </p>

          <div className="row">
            <Magnet>
              <StarBorder href="#contact">Hire me for my PFE</StarBorder>
            </Magnet>
            <Magnet>
              <a className="btn ghost" href={d.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            </Magnet>
            <Magnet>
              <a className="btn ghost" href={d.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </Magnet>
          </div>
        </div>

        <div className="hr">
          <TiltedCard src={d.photo || "/ayman.jpg"} alt={d.name} />
          <CircularText text="FULL STACK • PFE 2027 • OPEN TO WORK • " />
        </div>
      </section>

      {/* ── Tech Marquee ── */}
      <Marquee items={techItems} />

      {/* ── Stats ── */}
      <main>
        <div className="stats">
          {stats.map(([n, l]) => (
            <Reveal key={l}>
              <div>
                <b><CountUp to={n} />+</b>
                <span>{l}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ══════════ ABOUT ══════════ */}
        <Sec id="about" t="About Me">
          <Reveal>
            <div className="about-grid">
              <div>
                <p className="about-text">{d.bio}</p>
              </div>
              <div className="lang-card">
                <h4>Languages</h4>
                {langs.map((l, i) => {
                  const key = Object.keys(LANG_MAP).find(k => l.startsWith(k.split(" ")[0])) || l;
                  const label = key.split(" ")[0];
                  const level = l.includes("native") ? "Native" : l.match(/[A-C][12]/)?.[0] || "—";
                  return (
                    <div className="lang-item" key={i}>
                      <span>{label}</span>
                      <span className="lang-badge">{level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Sec>

        {/* ══════════ EXPERIENCE ══════════ */}
        <Sec id="experience" t="Experience">
          {d.experiences.map((x, i) => (
            <Reveal key={i} delay={i * 100}>
              <SpotlightCard className="card" spotlightColor="rgba(93,255,160,.1)">
                <div className="exp-header">
                  <span className="exp-role">{x.role}</span>
                  <span className="exp-company">{x.company}</span>
                  <span className="exp-period">📅 {x.period}</span>
                </div>
                <ul>{lines(x.description).map((l, j) => <li key={j}>{l}</li>)}</ul>
                <small className="tech">{x.tech}</small>
              </SpotlightCard>
            </Reveal>
          ))}
        </Sec>

        {/* ══════════ PROJECTS ══════════ */}
        <Sec id="projects" t="Projects">
          <div className="grid">
            {d.projects.map((x, i) => (
              <Reveal key={i} delay={i * 80}>
                <SpotlightCard className="card" spotlightColor="rgba(124,92,252,.2)" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.12rem', marginBottom: '.35rem' }}>{x.title}</h3>
                    <p className="muted" style={{ marginTop: '.4rem', fontSize: '.9rem', lineHeight: '1.65' }}>{x.description}</p>
                  </div>
                  <div style={{ marginTop: '1.1rem' }}>
                    <small className="tech" style={{ display: 'block', marginBottom: '.8rem' }}>{x.tech}</small>
                    <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                      {x.link && (
                        <a className="proj-link" href={x.link} target="_blank" rel="noreferrer">
                          <span>📦</span> GitHub ↗
                        </a>
                      )}
                      {x.demo && (
                        <a className="proj-demo-link" href={x.demo} target="_blank" rel="noreferrer">
                          <span>⚡</span> Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Sec>

        {/* ══════════ SKILLS ══════════ */}
        <Sec id="skills" t="Skills & Technologies">
          <div className="skills-grid">
            {d.skills.map((x, i) => (
              <Reveal key={i} delay={i * 80}>
                <SpotlightCard className="card skill-card" spotlightColor="rgba(56,212,232,.12)">
                  <div className="skill-label">
                    <div className="skill-icon">{SKILL_ICONS[x.label] || "🔧"}</div>
                    <h3>{x.label}</h3>
                  </div>
                  <div className="tech-logo-grid">
                    {x.items.split(",").map(s => {
                      const name = s.trim();
                      const src = TECH_ICONS[name];
                      return src ? (
                        <div className="tech-logo-item" key={name} title={name}>
                          <div className="tech-logo-wrap">
                            <img src={src} alt={name} loading="lazy" />
                          </div>
                          <span>{name}</span>
                        </div>
                      ) : (
                        <div className="tech-logo-item tech-logo-fallback" key={name} title={name}>
                          <div className="tech-logo-wrap tech-logo-text">{name[0]}</div>
                          <span>{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Sec>

        {/* ══════════ EDUCATION ══════════ */}
        <Sec id="education" t="Education & Certificates">
          <Reveal>
            <div className="grid" style={{ marginBottom: '2rem' }}>
              {d.education.map((x, i) => (
                <SpotlightCard className="card edu-item" key={i} spotlightColor="rgba(93,255,160,.1)">
                  <span className="edu-degree">{x.degree}</span>
                  <span className="edu-school">{x.school}</span>
                  <span className="edu-period">📅 {x.period}</span>
                </SpotlightCard>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <span>📜</span> Licenses & Certifications
                </h3>
                <span style={{ fontSize: '.82rem', fontFamily: 'var(--mono)', color: 'var(--txt3)' }}>
                  {d.certificates.length} credentials
                </span>
              </div>
              <div className="certs-grid">
                {d.certificates.map((c, i) => {
                  const cert = typeof c === "string" ? { name: c } : c;
                  return (
                    <div className="cert-card" key={i}>
                      <div className="cert-card-header">
                        {cert.issuerLogo ? (
                          <div className="cert-logo-wrap">
                            <img
                              src={cert.issuerLogo}
                              alt={cert.issuer || cert.name}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                if (e.currentTarget.parentElement) {
                                  e.currentTarget.parentElement.innerHTML = "🏅";
                                  e.currentTarget.parentElement.classList.add("cert-logo-fallback");
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="cert-logo-wrap cert-logo-fallback">🏅</div>
                        )}
                        <div className="cert-meta">
                          <h4 className="cert-name">{cert.name}</h4>
                          {cert.issuer && <span className="cert-issuer">{cert.issuer}</span>}
                          {cert.date && <span className="cert-date">📅 Issued {cert.date}</span>}
                        </div>
                      </div>

                      {(cert.credentialId || cert.credentialUrl) && (
                        <div className="cert-footer">
                          {cert.credentialId && (
                            <span className="cert-id" title={`Credential ID: ${cert.credentialId}`}>
                              ID: {cert.credentialId}
                            </span>
                          )}
                          {cert.credentialUrl && (
                            <a
                              className="cert-verify-btn"
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Show credential ↗
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Sec>

        {/* ══════════ CONTACT ══════════ */}
        <Sec id="contact" t="Let's Work Together">
          <Reveal>
            <div className="contact-layout">
              <div className="contact-info">
                <p className="muted" style={{ fontSize: '.95rem', lineHeight: '1.7', marginBottom: '.5rem' }}>
                  I'm currently looking for a PFE internship (4–6 months from February 2027). Feel free to reach out!
                </p>
                <a className="contact-link" href={"mailto:" + d.email}>
                  <span className="contact-icon">📧</span> {d.email}
                </a>
                <a className="contact-link" href={"tel:" + d.phone}>
                  <span className="contact-icon">📱</span> {d.phone}
                </a>
                <div className="contact-link">
                  <span className="contact-icon">📍</span> {d.location}
                </div>
                <a className="contact-link" href={d.github} target="_blank" rel="noreferrer">
                  <span className="contact-icon">🐙</span> GitHub
                </a>
                <a className="contact-link" href={d.linkedin} target="_blank" rel="noreferrer">
                  <span className="contact-icon">💼</span> LinkedIn
                </a>
              </div>

              <form onSubmit={send}>
                <div className="form-row">
                  <input name="name" placeholder="Your name" required />
                  <input name="email" type="email" placeholder="Your email" required />
                </div>
                <textarea name="message" placeholder="Your message..." rows="5" required />
                <button className="btn" type="submit" disabled={loading}>
                  {loading ? "Sending…" : "Send Message ✉️"}
                </button>
                {sent && <p className={sent.startsWith("⚠") ? "err" : "sent-msg"}>{sent}</p>}
              </form>
            </div>
          </Reveal>
        </Sec>
      </main>

      <footer>
        © {new Date().getFullYear()} {d.name} · Built with React & ❤️ ·{" "}
        <a href="#/admin">Admin</a>
      </footer>
    </>
  );
}
