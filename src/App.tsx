import { useEffect, useRef, useState } from "react";
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


// Location map only. Pins identify city-level locations, not exact business addresses.
function LocationsMap() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any = null;
    let cancelled = false;
    const w = window as any;

    const initialize = () => {
      if (cancelled || !mapElement.current || !w.L) return;
      map = w.L.map(mapElement.current, { scrollWheelZoom: false }).setView([14.14, 121.13], 10);
      w.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);
      const points: Array<[number, number, string]> = [
        [14.2117, 121.1653, "<strong>Calamba City, Laguna</strong><br/>Vehicle Operations"],
        [14.0635, 121.2464, "<strong>Alaminos, Laguna</strong><br/>Business Administration"]
      ];
      points.forEach(([lat, lng, description]) => {
        w.L.marker([lat, lng]).addTo(map).bindPopup(description);
      });
      map.fitBounds(points.map(([lat, lng]) => [lat, lng]), { padding: [40, 40] });
    };

    if (!document.getElementById("ol-leaflet-css")) {
      const link = document.createElement("link");
      link.id = "ol-leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (w.L) {
      initialize();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.onload = initialize;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, []);

  return <div ref={mapElement} className="ol-locations-map" role="region" aria-label="Interactive map of Calamba and Alaminos, Laguna" />;
}

function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/verify") return <VerificationPage />;
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [form, setForm] = useState({
    company: "", contact: "", email: "", phone: "", service: "",
    origin: "", destination: "", cargo: "", schedule: "", message: "", documentLink: ""
  });

  const isGeneralInquiry = form.service === "Business Partnership / Collaboration" || form.service === "Others / General Inquiry";

  const nav = [
    ["Story", "#story"], ["Services", "#services"], ["Fleet", "#fleet"],
    ["Standards", "#standards"], ["Technology", "#technology"], ["Locations", "#locations"], ["Contact", "#contact"]
  ];

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const validContactName = (value: string) => /^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,79}$/u.test(value.trim());
  const validPhone = (value: string) => !value.trim() || (/^\+?[0-9() -]+$/.test(value.trim()) && (value.match(/\d/g) || []).length >= 7 && (value.match(/\d/g) || []).length <= 15);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    if (!validContactName(form.contact)) {
      setSendError("Please enter a valid contact name using letters, spaces, apostrophes, or hyphens.");
      return;
    }
    if (!validPhone(form.phone)) {
      setSendError("Please enter a valid phone number (7–15 digits), or leave it blank.");
      return;
    }
    if (form.documentLink.trim()) {
      try {
        const url = new URL(form.documentLink.trim());
        if (url.protocol !== "https:") throw new Error("Invalid protocol");
      } catch {
        setSendError("Please enter a valid HTTPS document-sharing link, or leave the field blank.");
        return;
      }
    }
    setSending(true);
    setSendError("");
    try {
      const inquiryDetails = isGeneralInquiry
        ? { message: form.message }
        : { origin: form.origin, destination: form.destination, cargo: form.cargo, schedule: form.schedule };
      const response = await fetch("https://formspree.io/f/moedeaol", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          company: form.company,
          contact: form.contact,
          email: form.email,
          phone: form.phone,
          service: form.service,
          ...inquiryDetails,
          ...(form.documentLink.trim() ? { document_link: form.documentLink.trim() } : {}),
          _subject: `OFFLIMITS inquiry: ${form.service}`,
          _replyto: form.email
        })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const reason = data?.errors?.[0]?.message;
        throw new Error(typeof reason === "string" ? reason : "Submission could not be completed.");
      }
      setSubmitted(true);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : "Unable to send your inquiry. Please try again.");
    } finally {
      setSending(false);
    }
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
            <p>From documented business credentials to qualified drivers and a well-maintained vehicle, we build confidence through responsible operations.</p>
          </div>
          <div className="credential-grid">
            <article className="credential-card ol-standard-card">
              <div className="credential-top"><Building2/><span>01 / BUSINESS STANDARDS</span></div>
              <h3>Business Legitimacy<br/>&amp; Corporate Readiness</h3>
              <p className="ol-standard-intro">Built on proper registration, responsible operations, and professional client coordination.</p>
              <ul>
                <li><Check/> DTI Business Name Registration</li>
                <li><Check/> BIR Certificate of Registration</li>
                <li><Check/> Local Business Permit — Alaminos, Laguna</li>
              </ul>
              <details className="ol-standard-details">
                <summary>View Business Standards <ArrowDownRight size={15}/></summary>
                <ul>
                  <li><Check/> LTFRB Provisional Authority</li>
                  <li><Check/> Documented Business Credentials</li>
                  <li><Check/> Professional Client Coordination</li>
                </ul>
              </details>
            </article>
            <article className="credential-card ol-standard-card">
              <div className="credential-top"><ClipboardCheck/><span>02 / DRIVER STANDARDS</span></div>
              <h3>Driver Qualification<br/>&amp; Safety</h3>
              <p className="ol-standard-intro">Screened, qualified, and safety-focused drivers who meet OFFLIMITS requirements before deployment.</p>
              <ul>
                <li><Check/> Valid Professional Driver's License</li>
                <li><Check/> NBI / Police Background Clearance</li>
                <li><Check/> Medical Fitness &amp; Drug Testing</li>
              </ul>
              <details className="ol-standard-details">
                <summary>View Driver Standards <ArrowDownRight size={15}/></summary>
                <ul>
                  <li><Check/> Practical Driving Skills Assessment</li>
                  <li><Check/> Road Safety Orientation</li>
                  <li><Check/> Cargo Handling Awareness</li>
                  <li><Check/> Company Driver Identification</li>
                  <li><Check/> Personal Accident Insurance</li>
                  <li><Check/> Professional Conduct Standards</li>
                </ul>
              </details>
            </article>
            <article className="credential-card ol-standard-card">
              <div className="credential-top"><ShieldCheck/><span>03 / VEHICLE STANDARDS</span></div>
              <h3>Vehicle Reliability<br/>&amp; Protection</h3>
              <p className="ol-standard-intro">A brand-new Toyota Tamaraw supported by preventive maintenance and GPS-enabled fleet oversight.</p>
              <ul>
                <li><Check/> Brand-New Toyota Tamaraw FX</li>
                <li><Check/> Initial 1,000 km PMS Completed</li>
                <li><Check/> GPS Tracking &amp; Geofencing</li>
              </ul>
              <details className="ol-standard-details">
                <summary>View Vehicle Standards <ArrowDownRight size={15}/></summary>
                <ul>
                  <li><Check/> Preventive Maintenance Commitment</li>
                  <li><Check/> Vehicle Condition &amp; Safety Checks</li>
                  <li><Check/> Route Visibility &amp; Trip History</li>
                  <li><Check/> LTFRB Provisional Authority</li>
                  <li><Check/> Inland Marine Insurance</li>
                </ul>
              </details>
            </article>
          </div>
          <p className="fine-print">Documents, driver clearances, vehicle authorization, and insurance coverage are subject to their respective validity periods, applicable terms, and operating conditions. A new vehicle and regular maintenance reduce certain risks but do not guarantee uninterrupted service.</p>
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

        <section className="ol-locations section-pad" id="locations">
          <div className="section-heading">
            <div><SectionLabel>OUR LOCATIONS</SectionLabel><h2>Rooted in Laguna.<br/><span>Ready to move.</span></h2></div>
            <p>Strategically positioned in Laguna to support efficient transportation coordination and business operations.</p>
          </div>
          <div className="ol-locations-layout">
            <LocationsMap />
            <div className="ol-locations-list">
              <div className="ol-location-item"><span>01 / VEHICLE OPERATIONS</span><h3>Calamba City</h3><p>Laguna, Philippines</p><small>Vehicle Operations</small></div>
              <div className="ol-location-item"><span>02 / BUSINESS ADMINISTRATION</span><h3>Alaminos</h3><p>Laguna, Philippines</p><small>Business Administration</small></div>
              <p className="ol-location-disclaimer">Map markers indicate general city locations. For transportation inquiries and coordination, please contact our team.</p>
            </div>
          </div>
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
              {submitted ? <div className="form-success"><div className="success-icon"><Check/></div><h3>Inquiry submitted successfully.</h3><p>Thank you for contacting OFFLIMITS. Your inquiry has been received by our submission service. We will review your message and get back to you as soon as possible.</p><button className="button button-dark" onClick={() => setSubmitted(false)}>Submit another inquiry <ArrowRight size={16}/></button></div> :
                <form onSubmit={handleSubmit}>
                  <div className="form-title"><span>{isGeneralInquiry ? "BUSINESS INQUIRY" : "REQUEST A QUOTATION"}</span><span>ALL FIELDS MARKED * ARE REQUIRED</span></div>
                  <div className="form-grid">
                    <label>Company name *<input required maxLength={120} value={form.company} onChange={e=>update("company",e.target.value)} placeholder="Your company"/></label>
                    <label>Contact person *<input required minLength={2} maxLength={80} pattern="[^0-9<>]+" title="Use letters, spaces, apostrophes, periods or hyphens; no numbers." value={form.contact} onChange={e=>update("contact",e.target.value.replace(/[0-9<>]/g, ""))} placeholder="Full name"/></label>
                    <label>Email address *<input required type="email" maxLength={254} value={form.email} onChange={e=>update("email",e.target.value)} placeholder="name@company.com"/></label>
                    <label>Phone number<input type="tel" inputMode="tel" maxLength={24} pattern="[+0-9() -]*" title="Use digits and phone formatting only (e.g. +63 956 507 3324)." value={form.phone} onChange={e=>update("phone",e.target.value.replace(/[^0-9+() -]/g, ""))} placeholder="+63"/></label>
                    <label className="full">Service required *<select required value={form.service} onChange={e=>update("service",e.target.value)}><option value="">Select a service</option>{services.map(s=><option key={s.n}>{s.title}</option>)}<option value="Business Partnership / Collaboration">Business Partnership / Collaboration</option><option value="Others / General Inquiry">Others / General Inquiry</option></select></label>
                    {isGeneralInquiry ? (
                      <label className="full">{form.service === "Business Partnership / Collaboration" ? "Partnership Details *" : "Tell Us About Your Inquiry *"}
                        <textarea required rows={5} maxLength={3000} value={form.message} onChange={e=>update("message",e.target.value)}
                          placeholder={form.service === "Business Partnership / Collaboration" ? "Tell us about your company and the partnership opportunity you would like to explore." : "How can OFFLIMITS assist you?"}/>
                      </label>
                    ) : (
                      <>
                        <label>Origin *<input required maxLength={160} value={form.origin} onChange={e=>update("origin",e.target.value)} placeholder="Pickup location"/></label>
                        <label>Destination *<input required maxLength={160} value={form.destination} onChange={e=>update("destination",e.target.value)} placeholder="Delivery location"/></label>
                        <label className="full">Cargo details *<textarea required rows={3} maxLength={3000} value={form.cargo} onChange={e=>update("cargo",e.target.value)} placeholder="Cargo type, estimated weight, dimensions, handling requirements..."/></label>
                        <label className="full">Preferred date
                          <input type="date" min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)}
                            value={form.schedule} onChange={e=>update("schedule",e.target.value)}
                            onKeyDown={e=>{ if (e.key !== "Tab" && e.key !== "Shift") e.preventDefault(); }}
                            onPaste={e=>e.preventDefault()}
                            onClick={e=>{ try { e.currentTarget.showPicker?.(); } catch { /* Native date control remains usable. */ } }}
                            aria-label="Choose preferred date from calendar" />
                        </label>
                      </>
                    )}
                    <label className="full">Proposal / Document Link (optional)
                      <input type="url" inputMode="url" maxLength={1000}
                        value={form.documentLink} onChange={e=>update("documentLink",e.target.value)}
                        placeholder="https://drive.google.com/..."
                        pattern="https://.+" title="Enter an HTTPS document-sharing link" />
                      <small style={{ display: "block", marginTop: 6, lineHeight: 1.6, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                        Share a Google Drive, OneDrive, or Dropbox link. Please grant our team viewing access and avoid including sensitive personal information.
                      </small>
                    </label>
                  </div>
                  <div className="form-bottom"><p>Your inquiry will be sent through Formspree.</p><button className="button button-dark" type="submit" disabled={sending}>{sending ? "Sending..." : "Send inquiry"} <Send size={15}/></button></div>
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