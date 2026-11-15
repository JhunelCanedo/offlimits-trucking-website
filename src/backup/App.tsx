import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check,
  ClipboardCheck, FileCheck2, Menu, MapPin, ShieldCheck, Truck,
  Navigation, RadioTower, Building2, Package, Clock3, Handshake,
  X, Send, Mail, Phone, MessageCircle, Facebook, Instagram, Route, Gauge, ChartNoAxesCombined, ScanLine, BatteryCharging, Moon, ShieldAlert, Search, ShieldX
} from "lucide-react";

const services = [
  { n: "01", title: "Corporate Trucking", desc: "Transportation support for companies that need a dependable partner in their day-to-day operations.", icon: Building2 },
  { n: "02", title: "Dedicated Transportation", desc: "A dedicated vehicle arrangement for recurring routes and defined business requirements.", icon: Truck },
  { n: "03", title: "Logistics Subcontracting", desc: "A partnership-minded approach for logistics providers seeking additional transportation support.", icon: Handshake },
  { n: "04", title: "Cargo Transportation", desc: "Careful, accountable movement of commercial goods based on agreed trip requirements.", icon: Package },
  { n: "05", title: "On-Demand Trucking", desc: "Transportation support for specific business requirements and scheduled movements.", icon: Clock3 }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } }
};

function SectionLabel({ children }: { children: string }) {
  return <div className="section-label"><span />{children}</div>;
}


function VerificationPage() {
  const [fullName, setFullName] = useState("");
  const [checked, setChecked] = useState(false);
  const submittedName = fullName.trim();
  return (
    <div className="ol-verify-page">
      <style>{`
        .ol-verify-page{min-height:100vh;background:#101010;color:#fff;font-family:inherit;padding:28px clamp(22px,6vw,90px) 65px}
        .ol-verify-head{display:flex;justify-content:space-between;align-items:center;gap:20px;border-bottom:1px solid #333;padding-bottom:25px}
        .ol-verify-head .brand{color:#fff;text-decoration:none}
        .ol-verify-home{font-size:12px;color:#ddd;text-decoration:none;letter-spacing:.08em}
        .ol-verify-body{max-width:760px;margin:85px auto 0}
        .ol-verify-eyebrow{font-size:11px;letter-spacing:.25em;color:#aaa;text-transform:uppercase}
        .ol-verify-body h1{font-size:clamp(42px,7vw,82px);line-height:1.04;letter-spacing:-.055em;margin:22px 0 25px}
        .ol-verify-intro{color:#aaa;max-width:540px;font-size:15px;line-height:1.8}
        .ol-verify-card{margin-top:45px;border:1px solid #404040;background:#171717;padding:clamp(22px,5vw,44px)}
        .ol-verify-card label{display:block;color:#bbb;font-size:11px;letter-spacing:.15em;margin-bottom:14px;text-transform:uppercase}
        .ol-verify-form{display:flex;gap:10px}
        .ol-verify-form input{flex:1;min-width:0;background:#fff;color:#111;border:0;padding:16px;font-size:15px;outline-offset:3px}
        .ol-verify-form button{border:1px solid #fff;background:#fff;color:#111;padding:15px 22px;cursor:pointer;font-size:12px;font-weight:700;letter-spacing:.06em}
        .ol-verify-result{margin-top:25px;border-top:1px solid #444;padding-top:25px}
        .ol-verify-status{display:flex;gap:13px;align-items:flex-start}
        .ol-verify-status strong{font-size:18px}
        .ol-verify-status p{font-size:13px;line-height:1.7;color:#bbb;margin:8px 0}
        .ol-verify-note{margin-top:30px;font-size:12px;color:#888;line-height:1.8}
        .ol-verify-foot{max-width:760px;margin:80px auto 0;border-top:1px solid #333;padding-top:25px;color:#888;font-size:11px;letter-spacing:.08em}
        @media(max-width:520px){.ol-verify-form{flex-direction:column}.ol-verify-body{margin-top:65px}}
      `}</style>
      <header className="ol-verify-head">
        <a className="brand" href="/" aria-label="OFFLIMITS home"><span className="brand-mark">O<span>/</span>L</span><span className="brand-name">OFFLIMITS<small>TRUCKING SERVICES</small></span></a>
        <a className="ol-verify-home" href="/">← BACK TO WEBSITE</a>
      </header>
      <main className="ol-verify-body">
        <div className="ol-verify-eyebrow">OFFLIMITS / CREDENTIAL SERVICES</div>
        <h1>Identity<br/>verification.</h1>
        <p className="ol-verify-intro">A dedicated space for checking credentials issued by OFFLIMITS TRUCKING SERVICES. Enter the full name shown on the company ID to request a credential lookup.</p>
        <section className="ol-verify-card" aria-label="Credential lookup">
          <div className="ol-verify-eyebrow" style={{marginBottom:22}}>01 / CREDENTIAL LOOKUP</div>
          <form onSubmit={e=>{e.preventDefault();setChecked(true);}}>
            <label htmlFor="ol-full-name">Full name</label>
            <div className="ol-verify-form">
              <input id="ol-full-name" required autoComplete="name" value={fullName} onChange={e=>{setFullName(e.target.value);setChecked(false);}} placeholder="Enter full name as printed on the ID"/>
              <button type="submit">SEARCH NAME ↗</button>
            </div>
          </form>
          {checked && <div className="ol-verify-result" role="status">
            <div className="ol-verify-status"><ShieldX size={25}/><div><strong>Verification not available</strong><p>No verified credential information can currently be returned for {submittedName}. The OFFLIMITS credential database is not yet connected. This result does not establish whether an ID is valid or invalid.</p></div></div>
          </div>}
          <p className="ol-verify-note">DEVELOPMENT PREVIEW — This page does not currently validate identities or issue verification results. A secure server-side credential registry and unique QR credential tokens are required before public launch. Names alone are not proof of identity.</p>
        </section>
      </main>
      <footer className="ol-verify-foot">© {new Date().getFullYear()} OFFLIMITS TRUCKING SERVICES · ALAMINOS, LAGUNA, PHILIPPINES</footer>
    </div>
  );
}

function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/verify") return <VerificationPage />;
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "", contact: "", email: "", phone: "", service: "",
    origin: "", destination: "", cargo: "", schedule: ""
  });

  const nav = [
    ["Story", "#story"], ["Services", "#services"], ["Fleet", "#fleet"],
    ["Standards", "#standards"], ["Technology", "#technology"], ["Contact", "#contact"]
  ];

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="header">
        <a className="brand" href="#home" aria-label="OFFLIMITS home">
          <span className="brand-mark">O<span>/</span>L</span>
          <span className="brand-name">OFFLIMITS<small>TRUCKING SERVICES</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#contact">Let's talk <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16}/></a>)}
      </nav>}

      <main>
        <section className="hero" id="home">
          <div className="hero-image" role="img" aria-label="Commercial utility truck on an open highway">
            <div className="hero-image-shade" />
          </div>
          <div className="hero-content">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="eyebrow light"><span className="eyebrow-line" /> ALAMINOS, LAGUNA · PHILIPPINES</div>
              <h1>Moving<br/><em>businesses</em><br/>forward.</h1>
              <p className="hero-sub">Transportation without limits.</p>
              <p className="hero-copy">A transportation partner built on reliability, accountability, and commitment.</p>
              <div className="hero-actions">
                <a className="button button-light" href="#services">Explore our services <ArrowDownRight size={17}/></a>
                <a className="text-link light-link" href="#story">Discover OFFLIMITS <ArrowRight size={16}/></a>
              </div>
            </motion.div>
          </div>
          <div className="hero-bottom">
            <span>01 / 08 — THE OFFLIMITS STORY</span>
            <span>BUILT TO MOVE BUSINESS</span>
          </div>
          <div className="hero-vertical">OFFLIMITS TRUCKING SERVICES</div>
        </section>

        <section className="intro section-pad" id="story">
          <div className="intro-left">
            <SectionLabel>01 — OUR STORY</SectionLabel>
            <h2>More than moving cargo.<br/><span>Moving business forward.</span></h2>
          </div>
          <div className="intro-right">
            <p className="lead">We believe reliable transportation is built on more than a vehicle. It takes responsibility, clear communication, and respect for every commitment.</p>
            <p>OFFLIMITS TRUCKING SERVICES is an emerging transportation company based in Alaminos, Laguna. We are building our business around dependable service, thoughtful operations, and long-term partnerships with companies and logistics providers.</p>
            <p>Our journey starts with one vehicle and a clear ambition: to grow responsibly while delivering the standards our partners deserve.</p>
            <a className="text-link dark-link" href="#standards">What we stand for <ArrowUpRight size={16}/></a>
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-bg" />
          <div className="manifesto-inner">
            <SectionLabel>OUR COMMITMENT</SectionLabel>
            <h2>Every journey<br/>deserves <em>accountability.</em></h2>
            <p>We aim to be the transportation partner businesses can plan with, communicate with, and grow with.</p>
          </div>
          <span className="manifesto-index">O/L — 001</span>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-heading">
            <div><SectionLabel>02 — WHAT WE DO</SectionLabel><h2>Transportation<br/><span>solutions.</span></h2></div>
            <p>Practical transportation support shaped around business requirements and partnership opportunities.</p>
          </div>
          <div className="service-list">
            {services.map((service) => {
              const Icon = service.icon;
              return <motion.article className="service-row" key={service.n} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
                <span className="service-number">{service.n}</span>
                <div className="service-icon"><Icon size={22} strokeWidth={1.5}/></div>
                <div className="service-copy"><h3>{service.title}</h3><p>{service.desc}</p></div>
                <ArrowUpRight className="service-arrow" size={20}/>
              </motion.article>;
            })}
          </div>
        </section>

        <section className="fleet" id="fleet">
          <div className="fleet-photo" role="img" aria-label="Actual OFFLIMITS Toyota Tamaraw FX diesel manual fleet vehicle">
            <span className="photo-note">OFFLIMITS FLEET · ACTUAL VEHICLE PHOTO</span>
          </div>
          <div className="fleet-content">
            <SectionLabel>03 — OUR FIRST FLEET VEHICLE</SectionLabel>
            <p className="fleet-kicker">A strong start. A bigger vision.</p>
            <h2>One fleet.<br/><em>One standard.</em></h2>
            <div className="fleet-model">2027 <span>TOYOTA</span><br/>TAMARAW FX</div>
            <p className="fleet-desc">Our first fleet vehicle represents the beginning of our transportation journey. Supported by GPS tracking and the stated vehicle authorization and insurance arrangements, it is part of our commitment to responsible operations.</p>
            <div className="fleet-details" aria-label="Toyota Tamaraw vehicle specifications">
              <div><span>Vehicle classification</span><strong>FX / Utility Van</strong></div>
              <div><span>Fuel / transmission</span><strong>Diesel / Manual</strong></div>
              <div><span>Gross vehicle weight</span><strong>2,790 kg (GVW)</strong></div>
              <div><span>Cargo payload</span><strong>Confirm per vehicle configuration</strong></div>
            </div>
            <p className="fleet-capacity-note">GVW is the total permitted vehicle weight, not cargo payload. Load capacity and cargo dimensions are confirmed before booking.</p>
            <div className="fleet-specs">
              <div><Navigation size={17}/><span>GPS tracking, live monitoring &amp; geofencing</span></div>
              <div><ShieldCheck size={17}/><span>Vehicle protection arrangements</span></div>
              <div><FileCheck2 size={17}/><span>LTFRB Provisional Authority</span></div>
            </div>
            <a className="fleet-quote-link" href="#contact">Request a quote <ArrowUpRight size={16}/></a>
            <p className="fleet-footnote">Additional vehicles are part of our future growth plan and are not represented as currently available fleet units.</p>
          </div>
        </section>

        <section className="standards section-pad" id="standards">
          <div className="section-heading">
            <div><SectionLabel>04 — TRUST & COMPLIANCE</SectionLabel><h2>Standards behind<br/><span>every journey.</span></h2></div>
            <p>We take the foundations of a responsible transportation business seriously: registration, driver qualifications, vehicle authorization, and insurance.</p>
          </div>
          <div className="credential-grid">
            <article className="credential-card">
              <div className="credential-top"><Building2/><span>01 / BUSINESS</span></div>
              <h3>Business<br/>registration</h3>
              <ul><li><Check/> DTI registered</li><li><Check/> BIR registered</li><li><Check/> Business Permit — Alaminos, Laguna</li></ul>
            </article>
            <article className="credential-card">
              <div className="credential-top"><ClipboardCheck/><span>02 / DRIVER</span></div>
              <h3>Driver<br/>qualification</h3>
              <ul><li><Check/> Professional Driver's License</li><li><Check/> Personal Accident Insurance</li></ul>
            </article>
            <article className="credential-card">
              <div className="credential-top"><ShieldCheck/><span>03 / VEHICLE & CARGO</span></div>
              <h3>Protection &<br/>authorization</h3>
              <ul><li><Check/> LTFRB Provisional Authority</li><li><Check/> Inland Marine Insurance</li><li><Check/> GPS tracking system</li></ul>
            </article>
          </div>
          <p className="fine-print">Credential descriptions are provided for general information. Specific authorizations and insurance coverage remain subject to the applicable documents, policy terms, cargo, route, and operating conditions.</p>
        </section>

        <section className="technology ol-gps" id="technology">
          <style>{`
            .technology.ol-gps{align-items:stretch}
            .ol-gps .tech-visual{isolation:isolate;min-height:690px}
            .ol-gps .radar{animation:olRadarBreath 5s ease-in-out infinite}
            .ol-gps .radar-two{animation-delay:-2.5s}
            .ol-gps .tech-center{box-shadow:0 0 0 12px #ffffff08,0 0 35px #ffffff0c;animation:olGpsFloat 5s ease-in-out infinite}
            .ol-gps .tech-beam{position:absolute;width:430px;height:430px;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg,transparent 285deg,#ffffff19 332deg,transparent 360deg);animation:olGpsSweep 8s linear infinite;z-index:0;pointer-events:none}
            .ol-gps .tech-route{position:absolute;width:min(74%,410px);height:auto;inset:0;margin:auto;overflow:visible;opacity:.8;pointer-events:none}
            .ol-gps .tech-route path{stroke-dasharray:8 11;animation:olRouteTravel 18s linear infinite}
            .ol-gps .tech-route circle{filter:drop-shadow(0 0 5px #fff)}
            .ol-gps .tech-status span{animation:olStatusBlink 2s ease-in-out infinite}
            .ol-gps .tech-copy{padding-top:80px;padding-bottom:80px}
            .ol-gps .gps-feature-list{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:26px}
            .ol-gps .gps-feature{display:flex;align-items:flex-start;gap:11px;padding:15px 12px;border:1px solid #e8e8e8;background:#fafafa;transition:background .25s,border-color .25s,transform .25s}
            .ol-gps .gps-feature:hover{background:#f0f0f0;border-color:#c6c6c6;transform:translateY(-3px)}
            .ol-gps .gps-feature svg{width:18px;height:18px;flex:none;color:#333;margin-top:1px}
            .ol-gps .gps-feature strong{display:block;font-size:11px;line-height:1.5;letter-spacing:-.1px;color:#171717}
            .ol-gps .gps-feature small{display:block;font-size:10px;line-height:1.6;color:#777;margin-top:4px}
            .ol-gps .gps-kicker{font-size:9px;letter-spacing:1.8px;color:#777;text-transform:uppercase;margin-top:20px}
            @keyframes olGpsSweep{to{transform:rotate(360deg)}}
            @keyframes olRadarBreath{0%,100%{opacity:.7;transform:scale(.98)}50%{opacity:1;transform:scale(1.04)}}
            @keyframes olGpsFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
            @keyframes olRouteTravel{to{stroke-dashoffset:-380}}
            @keyframes olStatusBlink{0%,100%{opacity:1}50%{opacity:.25}}
            @media(max-width:1150px){.ol-gps .gps-feature-list{grid-template-columns:1fr}}
            @media(max-width:760px){.ol-gps .tech-visual{min-height:390px}.ol-gps .tech-beam{width:340px;height:340px}.ol-gps .gps-feature-list{grid-template-columns:1fr 1fr}.ol-gps .tech-copy{padding-top:75px;padding-bottom:75px}}
            @media(max-width:470px){.ol-gps .gps-feature-list{grid-template-columns:1fr}}
            @media(prefers-reduced-motion:reduce){.ol-gps .radar,.ol-gps .tech-center,.ol-gps .tech-beam,.ol-gps .tech-route path,.ol-gps .tech-status span{animation:none!important}.ol-gps .gps-feature:hover{transform:none}}
          `}</style>
          <div className="tech-visual">
            <div className="radar radar-one"/><div className="radar radar-two"/>
            <div className="tech-beam" aria-hidden="true"/>
            <svg className="tech-route" viewBox="0 0 420 420" fill="none" aria-hidden="true">
              <path d="M58 292 C105 275 100 160 173 172 S268 278 358 122" stroke="#bdbdbd" strokeWidth="1.8"/>
              <circle cx="58" cy="292" r="4" fill="#fff"/>
              <circle cx="358" cy="122" r="4" fill="#fff"/>
            </svg>
            <div className="tech-center"><RadioTower size={34}/><span>GPS</span></div>
            <div className="tech-coordinate">GPS / FLEET INTELLIGENCE<br/>INTERNAL MONITORING</div>
            <div className="tech-status"><span/> GPS-SUPPORTED OPERATIONS</div>
          </div>
          <div className="tech-copy">
            <SectionLabel>05 — TECHNOLOGY</SectionLabel>
            <h2>Visibility.<br/><em>With purpose.</em></h2>
            <p className="lead">Smarter fleet oversight, built into every journey.</p>
            <p>Our GPS-enabled vehicle supports more informed transportation operations through route visibility, driving alerts, trip reporting, and vehicle security monitoring.</p>
            <div className="gps-kicker">GPS MONITORING CAPABILITIES</div>
            <div className="gps-feature-list">
              {[
                {icon:Route,title:"Route History & Playback",desc:"Review past journeys and retrace recorded routes."},
                {icon:Gauge,title:"Overspeed Alerts",desc:"Receive notifications when configured speed thresholds are exceeded."},
                {icon:ChartNoAxesCombined,title:"Mileage & Trip Reports",desc:"Review distance traveled, trip activity, and vehicle usage."},
                {icon:ScanLine,title:"Geofencing Alerts",desc:"Get notified when the vehicle exits a designated area."},
                {icon:BatteryCharging,title:"Built-in Battery Backup",desc:"Supports GPS operation when external vehicle power is interrupted."},
                {icon:Moon,title:"Power-Saving Sleep Mode",desc:"Helps conserve power during periods of inactivity."},
                {icon:ShieldAlert,title:"Anti-Tamper Alerts",desc:"Provides alerts when the tracking device is disturbed or disconnected."}
              ].map(({icon:Icon,title,desc},index)=>(
                <motion.div className="gps-feature" key={title} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.15}} transition={{duration:0.4,delay:Math.min(index*0.055,0.3)}}>
                  <Icon aria-hidden="true"/><div><strong>{title}</strong><small>{desc}</small></div>
                </motion.div>
              ))}
            </div>
            <p className="fine-print">GPS features support internal fleet monitoring. Alert delivery, route history, and backup operation depend on device configuration, network coverage, and power conditions. Client-facing tracking access is not currently offered.</p>
          </div>
        </section>

        <section className="growth section-pad" id="growth">
          <SectionLabel>06 — THE ROAD AHEAD</SectionLabel>
          <div className="growth-layout">
            <h2>Starting with one.<br/><em>Building beyond.</em></h2>
            <div><p className="lead">Our ambition is bigger than our first vehicle.</p><p>We plan to expand our fleet as the business develops and as the right partnerships and operational opportunities come together. Growth, for us, means building capacity responsibly—without compromising the standards we set from the beginning.</p><a className="text-link dark-link" href="#contact">Build with us <ArrowUpRight size={16}/></a></div>
          </div>
          <div className="growth-line"><span>01</span><div/><span>THE FIRST VEHICLE</span><div className="dashed"/><span className="muted">NEXT CHAPTERS AHEAD</span></div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-top">
            <div><SectionLabel>07 — START A CONVERSATION</SectionLabel><h2>Let's move your<br/><em>business forward.</em></h2></div>
            <p>Tell us what your transportation requirements look like. We welcome corporate inquiries, logistics partnerships, and quotation requests.</p>
          </div>
          <div className="contact-layout">
            <div className="contact-aside">
              <div className="contact-detail"><span>LOCATION</span><p><MapPin size={17}/> Alaminos, Laguna, Philippines</p></div>
              <div className="contact-detail"><span>DIRECT CONTACT</span>
                <p><Mail size={17}/><a href="mailto:jcanedo0628@gmail.com">jcanedo0628@gmail.com</a></p>
                <p><Phone size={17}/><a href="tel:+639565073324">+63 956 5073 324</a></p>
                <p><MessageCircle size={17}/><a href="https://wa.me/639565073324" target="_blank" rel="noopener noreferrer">WhatsApp · Message us <ArrowUpRight size={13}/></a></p>
                <p><MessageCircle size={17}/><a href="viber://chat?number=%2B639565073324">Viber · Message us <ArrowUpRight size={13}/></a></p>
              </div>
              <div className="contact-detail"><span>SOCIAL MEDIA</span>
                <p><Facebook size={17}/> Facebook · Link coming soon</p>
                <p><Instagram size={17}/> Instagram · Link coming soon</p>
              </div>
              <div className="contact-note">For corporate inquiries and transportation requirements, reach us through email, phone, WhatsApp, or Viber. Social media links will be added once confirmed.</div>
            </div>
            <div className="form-wrap">
              {submitted ? <div className="form-success"><div className="success-icon"><Check/></div><h3>Inquiry details captured.</h3><p>This is a front-end demonstration only. No message has been sent. Connect the form to your chosen email or CRM service before publishing.</p><button className="button button-dark" onClick={() => setSubmitted(false)}>Submit another inquiry <ArrowRight size={16}/></button></div> :
                <form onSubmit={handleSubmit}>
                  <div className="form-title"><span>REQUEST A QUOTATION</span><span>ALL FIELDS MARKED * ARE REQUIRED</span></div>
                  <div className="form-grid">
                    <label>Company name *<input required value={form.company} onChange={e=>update("company",e.target.value)} placeholder="Your company"/></label>
                    <label>Contact person *<input required value={form.contact} onChange={e=>update("contact",e.target.value)} placeholder="Full name"/></label>
                    <label>Email address *<input required type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="name@company.com"/></label>
                    <label>Phone number<input value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="+63"/></label>
                    <label className="full">Service required *<select required value={form.service} onChange={e=>update("service",e.target.value)}><option value="">Select a service</option>{services.map(s=><option key={s.n}>{s.title}</option>)}</select></label>
                    <label>Origin *<input required value={form.origin} onChange={e=>update("origin",e.target.value)} placeholder="Pickup location"/></label>
                    <label>Destination *<input required value={form.destination} onChange={e=>update("destination",e.target.value)} placeholder="Delivery location"/></label>
                    <label className="full">Cargo details *<textarea required rows={3} value={form.cargo} onChange={e=>update("cargo",e.target.value)} placeholder="Cargo type, estimated weight, dimensions, handling requirements..."/></label>
                    <label className="full">Preferred schedule<input value={form.schedule} onChange={e=>update("schedule",e.target.value)} placeholder="Preferred date / recurring schedule"/></label>
                  </div>
                  <div className="form-bottom"><p>Submitting this demo form does not transmit your information.</p><button className="button button-dark" type="submit">Review inquiry <Send size={15}/></button></div>
                </form>
              }
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">O<span>/</span>L</span><span className="brand-name">OFFLIMITS<small>TRUCKING SERVICES</small></span></a>
        <p>Moving Businesses Forward. Beyond Limits.</p>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} OFFLIMITS TRUCKING SERVICES</span><span>ALAMINOS, LAGUNA · PHILIPPINES</span><a href="/verify">VERIFY ID ↗</a><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </div>
  );
}

export default App;