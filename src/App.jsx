import { useState, useEffect } from "react";

// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────
const useBreakpoint = () => {
  const [bp, setBp] = useState(() => {
    const w = window.innerWidth;
    return w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  });
  useEffect(() => {
    const fn = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
};

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#F0F2F7", surface: "#FFFFFF", surfaceAlt: "#F7F8FC", border: "#E2E6F0",
  navy: "#0B1E4A", blue: "#1B4FD8", blueLight: "#EBF0FF", teal: "#0D9488",
  text: "#0B1E4A", textMid: "#4A5578", textSoft: "#8B95B0",
  green: "#059669", orange: "#D97706", red: "#DC2626",
  shadow: "0 1px 3px rgba(11,30,74,0.08)",
};

const RISK = {
  "Critique": { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
  "Eleve":    { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  "Moyen":    { bg: "#FFFBEB", color: "#92400E", border: "#FDE68A" },
  "Faible":   { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
};
const STATUS = {
  "En cours":  { bg: "#EBF0FF", color: "#1B4FD8", border: "#BFCFFF" },
  "Planifiee": { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
  "Cloturee":  { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  "Suspendue": { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
};
const APPRO = {
  "Non soumis": { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
  "En attente": { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  "Approuve":   { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  "Rejete":     { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
};
const fallback = { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" };

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MISSIONS = [
  { id: 1, ref: "MIS-2025-001", title: "Audit Risques Operationnels", type: "Interne",       statut: "En cours",  entite: "Hyundai Morocco",  domaine: "Operations", chef: "Khalid Mansouri", risque: "Eleve",    appro: "En attente", lancement: "01/01/2025", echeance: "20/03/2025", description: "Audit des risques operationnels lies aux processus de vente, gestion des stocks et service apres-vente. Perimetre : ensemble des showrooms Hyundai Morocco.", pj: ["Lettre_Mission_001.pdf", "Programme_Travail.docx", "Grille_Risques.xlsx"] },
  { id: 2, ref: "MIS-2025-002", title: "Conformite KYC - Global Lease", type: "Reglementaire", statut: "Planifiee", entite: "Global Lease",     domaine: "Conformite", chef: "Nadia Chraibi",   risque: "Critique", appro: "Non soumis", lancement: "15/01/2025", echeance: "30/04/2025", description: "Verification de la conformite aux exigences KYC reglementaires pour les contrats de leasing. Controle des procedures d'identification clients.", pj: ["Lettre_Mission_002.pdf"] },
  { id: 3, ref: "MIS-2025-003", title: "Audit SI - Genesis Electric",   type: "Thematique",   statut: "Cloturee",  entite: "Genesis Electric", domaine: "SI",         chef: "Rachid Amrani",  risque: "Moyen",    appro: "Approuve",   lancement: "10/11/2024", echeance: "10/02/2025", description: "Audit du systeme d'information de Genesis Electric : securite des acces, sauvegardes, continuite d'activite.", pj: ["Rapport_Final_SI.pdf", "Annexes_Techniques.docx"] },
  { id: 4, ref: "MIS-2025-004", title: "Audit Credit - Global Occaz",   type: "Interne",       statut: "Suspendue", entite: "Global Occaz",     domaine: "Credit",     chef: "Khalid Mansouri", risque: "Eleve",    appro: "Rejete",     lancement: "05/02/2025", echeance: "30/03/2025", description: "Evaluation du processus d'octroi de credit pour les vehicules d'occasion. Analyse des dossiers clients et conformite des procedures.", pj: ["Lettre_Mission_004.pdf", "Dossiers_Echantillon.xlsx"] },
  { id: 5, ref: "MIS-2025-005", title: "Controle Interne RH - Changan", type: "Interne",       statut: "En cours",  entite: "Changan Morocco",  domaine: "RH",         chef: "Nadia Chraibi",  risque: "Faible",   appro: "Approuve",   lancement: "01/03/2025", echeance: "15/04/2025", description: "Controle des processus RH : recrutement, paie, evaluation des performances. Verification de la conformite aux procedures internes BAG Group.", pj: ["Lettre_Mission_005.pdf"] },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Badge({ label, cfg, small }) {
  const s = cfg || fallback;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: small ? 3 : 5, padding: small ? "2px 7px" : "3px 10px", borderRadius: 20, fontSize: small ? 10 : 12, fontWeight: 600, background: s.bg, color: s.color, border: "1px solid " + s.border, whiteSpace: "nowrap", fontFamily: "'DM Sans',sans-serif" }}>
      <span style={{ width: small ? 4 : 5, height: small ? 4 : 5, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function Btn({ children, variant, onClick, small, full }) {
  const v = variant || "primary";
  const map = {
    primary:   { bg: C.blue,        color: "#fff",    border: "1.5px solid " + C.blue },
    secondary: { bg: "#fff",        color: C.blue,    border: "1.5px solid " + C.blue },
    ghost:     { bg: "transparent", color: C.textMid, border: "1.5px solid " + C.border },
  };
  const st = map[v];
  return (
    <button onClick={onClick} style={{ padding: small ? "6px 12px" : "9px 18px", borderRadius: 8, border: st.border, background: st.bg, color: st.color, fontSize: small ? 12 : 13.5, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: "pointer", width: full ? "100%" : "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
      {children}
    </button>
  );
}

function FieldLabel({ children, required }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: C.textMid, marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
      {children}{required && <span style={{ color: C.red, marginLeft: 2 }}>*</span>}
    </div>
  );
}

function Input({ placeholder, value, type, onChange }) {
  return (
    <input defaultValue={value} type={type || "text"} placeholder={placeholder} onChange={onChange}
      style={{ width: "100%", padding: "9px 11px", borderRadius: 8, border: "1.5px solid " + C.border, fontSize: 13, color: C.text, background: C.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }}
      onFocus={e => e.target.style.borderColor = C.blue}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function ControlledInput({ value, type, onChange }) {
  return (
    <input value={value} type={type || "text"} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", padding: "9px 11px", borderRadius: 8, border: "1.5px solid " + C.border, fontSize: 13, color: C.text, background: C.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }}
      onFocus={e => e.target.style.borderColor = C.blue}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function ControlledSelect({ value, options, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", padding: "9px 30px 9px 11px", borderRadius: 8, border: "1.5px solid " + C.border, fontSize: 13, color: C.text, background: C.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", appearance: "none", boxSizing: "border-box" }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

function ControlledTextarea({ value, onChange, rows }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows || 3}
      style={{ width: "100%", padding: "9px 11px", borderRadius: 8, border: "1.5px solid " + C.border, fontSize: 13, color: C.text, background: C.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5 }}
      onFocus={e => e.target.style.borderColor = C.blue}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function TopBar({ title, subtitle, actions, bp, onMenuClick }) {
  return (
    <div style={{ padding: bp === "mobile" ? "12px 16px" : "14px 24px", background: C.surface, borderBottom: "1px solid " + C.border, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 5, boxShadow: C.shadow, gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {bp === "mobile" && <div onClick={onMenuClick} style={{ fontSize: 20, color: C.navy, cursor: "pointer", flexShrink: 0 }}>&#9776;</div>}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: bp === "mobile" ? 15 : 18, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans',sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
          {subtitle && bp !== "mobile" && <div style={{ fontSize: 11.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      {actions && <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

function KpiCard({ label, value, sub, color, icon }) {
  return (
    <div style={{ background: C.surface, borderRadius: 12, padding: "16px 14px", boxShadow: C.shadow, border: "1px solid " + C.border, borderTop: "3px solid " + color, position: "relative", overflow: "hidden", flex: 1, minWidth: 0 }}>
      <div style={{ position: "absolute", top: 12, right: 12, fontSize: 18, color, opacity: 0.15, fontWeight: 900 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: "'DM Mono',monospace", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 5, fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
      <div style={{ fontSize: 10, color: C.textSoft, marginTop: 2, fontFamily: "'DM Sans',sans-serif" }}>{sub}</div>
    </div>
  );
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function BottomNav({ active, setScreen }) {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "missions",  label: "Missions" },
    { id: "new",       label: "Nouveau" },
    { id: "detail",    label: "Detail" },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 60, background: C.navy, display: "flex", zIndex: 100, boxShadow: "0 -2px 12px rgba(0,0,0,0.2)" }}>
      {items.map(item => {
        const isActive = active === item.id;
        return (
          <div key={item.id} onClick={() => setScreen(item.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, cursor: "pointer", background: isActive ? "rgba(27,79,216,0.25)" : "transparent", borderTop: isActive ? "2px solid " + C.blue : "2px solid transparent" }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: isActive ? "#fff" : "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Sidebar({ active, setScreen, collapsed, setCollapsed, bp }) {
  const w = collapsed ? 64 : 220;
  const navItems = [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "missions",  label: "Missions", badge: 5 },
    { id: "new",       label: "Nouvelle mission" },
    { id: "detail",    label: "Detail mission" },
  ];
  return (
    <div style={{ width: w, minWidth: w, height: "100vh", background: C.navy, display: "flex", flexDirection: "column", position: "sticky", top: 0, transition: "width 0.25s", overflow: "hidden", zIndex: 10 }}>
      <div style={{ padding: "20px 14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 16, fontFamily: "'DM Sans',sans-serif" }}>A</span>
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.2 }}>AuditTrack</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>BAG Group</div>
          </div>
        )}
        {bp === "desktop" && (
          <div onClick={() => setCollapsed(!collapsed)} style={{ marginLeft: "auto", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 16, flexShrink: 0 }}>
            {collapsed ? ">" : "<"}
          </div>
        )}
      </div>
      <nav style={{ flex: 1, padding: "10px 8px" }}>
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <div key={item.id} onClick={() => setScreen(item.id)} style={{ display: "flex", alignItems: "center", gap: collapsed ? 0 : 10, padding: collapsed ? "10px 0" : "8px 10px", borderRadius: 8, marginBottom: 2, cursor: "pointer", justifyContent: collapsed ? "center" : "flex-start", background: isActive ? "rgba(27,79,216,0.25)" : "transparent", border: isActive ? "1px solid rgba(27,79,216,0.5)" : "1px solid transparent" }}>
              <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "rgba(255,255,255,0.55)", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>
                {!collapsed && item.label}
                {collapsed && item.id.charAt(0).toUpperCase()}
              </span>
              {!collapsed && item.badge && (
                <span style={{ marginLeft: "auto", background: "rgba(27,79,216,0.4)", color: "#7BA7FF", fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 10, fontFamily: "'DM Mono',monospace" }}>{item.badge}</span>
              )}
            </div>
          );
        })}
      </nav>
      <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#1B4FD8,#0D9488)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 11, fontFamily: "'DM Sans',sans-serif" }}>MB</span>
        </div>
        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 12, fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>M. Berrada</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "'DM Sans',sans-serif" }}>Directeur Audit</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileDrawer({ open, onClose, active, setScreen }) {
  const items = [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "missions",  label: "Missions", badge: 5 },
    { id: "new",       label: "Nouvelle mission" },
    { id: "detail",    label: "Detail mission" },
  ];
  return (
    <div>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} />}
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 260, background: C.navy, zIndex: 50, transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.25s", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 15, fontFamily: "'DM Sans',sans-serif" }}>A</span>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans',sans-serif" }}>AuditTrack</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, fontFamily: "'DM Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>BAG Group</div>
            </div>
          </div>
          <span onClick={onClose} style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, cursor: "pointer" }}>x</span>
        </div>
        <nav style={{ flex: 1, padding: "10px 10px" }}>
          {items.map(item => {
            const isActive = active === item.id;
            return (
              <div key={item.id} onClick={() => { setScreen(item.id); onClose(); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, marginBottom: 3, cursor: "pointer", background: isActive ? "rgba(27,79,216,0.25)" : "transparent", border: isActive ? "1px solid rgba(27,79,216,0.5)" : "1px solid transparent" }}>
                <span style={{ fontSize: 13.5, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "rgba(255,255,255,0.55)", fontFamily: "'DM Sans',sans-serif" }}>{item.label}</span>
                {item.badge && <span style={{ marginLeft: "auto", background: "rgba(27,79,216,0.4)", color: "#7BA7FF", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10 }}>{item.badge}</span>}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#1B4FD8,#0D9488)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 12, fontFamily: "'DM Sans',sans-serif" }}>MB</span>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans',sans-serif" }}>M. Berrada</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "'DM Sans',sans-serif" }}>Directeur Audit</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
// Modifications : suppression colonne Avancement du tableau, suppression icones activites, suppression Distribution des risques
function DashboardScreen({ setScreen, bp }) {
  const kpiData = [
    { label: "Total Missions",    value: 5, sub: "Actives + planifiees", color: C.blue,   icon: "=" },
    { label: "En Cours",          value: 2, sub: "Missions actives",     color: C.teal,   icon: ">" },
    { label: "En Retard",         value: 2, sub: "Depassement echeance", color: C.red,    icon: "!" },
    { label: "En Attente Appro.", value: 1, sub: "Approbation requise",  color: C.orange, icon: "?" },
    { label: "Cloturees",         value: 1, sub: "Exercice 2025",        color: C.green,  icon: "v" },
  ];

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg, paddingBottom: bp === "mobile" ? 72 : 0 }}>
      <TopBar title="Tableau de Bord" subtitle="BAG Group" bp={bp}
        actions={bp !== "mobile" ? <Btn variant="secondary" onClick={() => setScreen("new")} small={true}>+ Nouvelle mission</Btn> : null}
      />
      <div style={{ padding: bp === "mobile" ? "14px" : "20px 24px" }}>

        {/* KPIs */}
        {bp === "mobile" ? (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <KpiCard label="Total"      value={5} sub="Missions"      color={C.blue}   icon="=" />
              <KpiCard label="En cours"   value={2} sub="Actives"       color={C.teal}   icon=">" />
              <KpiCard label="Retard"     value={2} sub="Depassement"   color={C.red}    icon="!" />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <KpiCard label="Approbation" value={1} sub="En attente"    color={C.orange} icon="?" />
              <KpiCard label="Cloturees"   value={1} sub="Exercice 2025" color={C.green}  icon="v" />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {kpiData.map((k, i) => <KpiCard key={i} {...k} />)}
          </div>
        )}

        {/* Main grid — pas de panneau droit (distribution risques supprimee) */}
        <div style={{ display: "grid", gridTemplateColumns: bp === "desktop" ? "1fr 280px" : "1fr", gap: 16 }}>

          {/* Missions table */}
          <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid " + C.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>Missions recentes</span>
              <span onClick={() => setScreen("missions")} style={{ fontSize: 12, color: C.blue, cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Voir tout</span>
            </div>

            {bp === "mobile" ? (
              <div>
                {MISSIONS.map((m, i) => (
                  <div key={m.id} onClick={() => setScreen("detail")} style={{ padding: "12px 16px", borderBottom: i < MISSIONS.length - 1 ? "1px solid " + C.border : "none", cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{m.title}</div>
                        <div style={{ fontSize: 11, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginTop: 1 }}>{m.ref}</div>
                      </div>
                      <Badge label={m.statut} cfg={STATUS[m.statut] || fallback} small={true} />
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Badge label={m.risque} cfg={RISK[m.risque] || fallback} small={true} />
                      <span style={{ fontSize: 10.5, color: C.textSoft, fontFamily: "'DM Mono',monospace", alignSelf: "center" }}>{m.echeance}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Table — sans colonne Avancement */
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
                  <thead>
                    <tr style={{ background: C.surfaceAlt }}>
                      {(bp === "desktop"
                        ? ["Ref", "Mission / Entite", "Statut", "Risque", "Echeance"]
                        : ["Mission", "Statut", "Risque"]
                      ).map(h => (
                        <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans',sans-serif", borderBottom: "1px solid " + C.border, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MISSIONS.map((m, i) => (
                      <tr key={m.id} style={{ borderBottom: "1px solid " + C.border, background: i % 2 === 0 ? C.surface : C.surfaceAlt, cursor: "pointer" }}
                        onClick={() => setScreen("detail")}
                        onMouseEnter={e => e.currentTarget.style.background = C.blueLight}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.surface : C.surfaceAlt}>
                        {bp === "desktop" && <td style={{ padding: "10px 12px", fontFamily: "'DM Mono',monospace", fontSize: 10.5, color: C.blue, fontWeight: 600, whiteSpace: "nowrap" }}>{m.ref}</td>}
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: 600, fontSize: 12.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{m.title}</div>
                          <div style={{ fontSize: 10.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{m.entite}</div>
                        </td>
                        <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}><Badge label={m.statut} cfg={STATUS[m.statut] || fallback} small={true} /></td>
                        <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}><Badge label={m.risque} cfg={RISK[m.risque] || fallback} small={true} /></td>
                        {bp === "desktop" && <td style={{ padding: "10px 12px", fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.textMid, whiteSpace: "nowrap" }}>{m.echeance}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Activite recente — sans icones, desktop only */}
          {bp === "desktop" && (
            <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "14px 16px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Activite recente</div>
              {[
                { color: C.green,  text: "MIS-2025-003 approuvee", time: "Il y a 2h",  statut: "Approuve" },
                { color: C.orange, text: "MIS-2025-001 en retard",  time: "Il y a 5h",  statut: "Retard" },
                { color: C.blue,   text: "MIS-2025-005 creee",      time: "Hier 09:00", statut: "Nouvelle" },
                { color: C.red,    text: "MIS-2025-004 rejetee",    time: "Il y a 2j",  statut: "Rejete" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: i < 3 ? "1px solid " + C.border : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, flexShrink: 0, marginTop: 4 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: C.navy, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>{a.text}</div>
                    <div style={{ fontSize: 10, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tablet: activite recente en dessous */}
        {bp === "tablet" && (
          <div style={{ marginTop: 16, background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "14px 16px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 10 }}>Activite recente</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              {[
                { color: C.green,  text: "MIS-2025-003 approuvee", time: "Il y a 2h" },
                { color: C.orange, text: "MIS-2025-001 en retard",  time: "Il y a 5h" },
                { color: C.blue,   text: "MIS-2025-005 creee",      time: "Hier 09:00" },
                { color: C.red,    text: "MIS-2025-004 rejetee",    time: "Il y a 2j" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid " + C.border }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{a.text}</div>
                    <div style={{ fontSize: 10, color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bp === "mobile" && (
          <button onClick={() => setScreen("new")} style={{ position: "fixed", bottom: 76, right: 20, width: 52, height: 52, borderRadius: "50%", background: C.blue, border: "none", color: "#fff", fontSize: 24, cursor: "pointer", boxShadow: "0 4px 16px rgba(27,79,216,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 30 }}>+</button>
        )}
      </div>
    </div>
  );
}

// ─── MISSIONS LIST ────────────────────────────────────────────────────────────
function MissionsScreen({ setScreen, bp }) {
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const filtered = MISSIONS.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.ref.includes(search);
    const matchStatut = filterStatut === "Tous" || m.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg, paddingBottom: bp === "mobile" ? 72 : 0 }}>
      <TopBar title="Missions d'Audit" subtitle={MISSIONS.length + " missions"} bp={bp}
        actions={bp !== "mobile" ? <Btn onClick={() => setScreen("new")} small={true}>+ Nouvelle</Btn> : null}
      />
      <div style={{ padding: bp === "mobile" ? "12px" : "18px 24px" }}>
        <div style={{ background: C.surface, borderRadius: 10, padding: "10px 14px", marginBottom: 14, boxShadow: C.shadow, border: "1px solid " + C.border, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 150 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
              style={{ width: "100%", padding: "7px 10px", borderRadius: 7, border: "1.5px solid " + C.border, fontSize: 12.5, color: C.text, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = C.blue}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>
          <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)} style={{ padding: "7px 10px", borderRadius: 7, border: "1.5px solid " + C.border, fontSize: 12.5, color: C.text, background: C.surface, fontFamily: "'DM Sans',sans-serif", outline: "none" }}>
            {["Tous", "En cours", "Planifiee", "Cloturee", "Suspendue"].map(s => <option key={s}>{s}</option>)}
          </select>
          <span style={{ fontSize: 11, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", alignSelf: "center", whiteSpace: "nowrap" }}>{filtered.length} resultat(s)</span>
        </div>

        {bp === "mobile" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map(m => (
              <div key={m.id} onClick={() => setScreen("detail")} style={{ background: C.surface, borderRadius: 10, padding: "14px", boxShadow: C.shadow, border: "1px solid " + C.border, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{m.title}</div>
                    <div style={{ fontSize: 11, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{m.ref} - {m.entite}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                  <Badge label={m.statut} cfg={STATUS[m.statut] || fallback} small={true} />
                  <Badge label={m.risque} cfg={RISK[m.risque] || fallback} small={true} />
                  <Badge label={m.appro} cfg={APPRO[m.appro] || fallback} small={true} />
                </div>
                <div style={{ fontSize: 10.5, color: C.textSoft, fontFamily: "'DM Mono',monospace" }}>Echeance : {m.echeance}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                <thead>
                  <tr style={{ background: C.surfaceAlt, borderBottom: "2px solid " + C.border }}>
                    {(bp === "desktop"
                      ? ["Reference", "Mission / Entite", "Type", "Statut", "Risque", "Approbation", "Echeance"]
                      : ["Mission / Entite", "Statut", "Risque", "Approbation"]
                    ).map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <tr key={m.id} style={{ borderBottom: "1px solid " + C.border, background: i % 2 === 0 ? C.surface : C.surfaceAlt, cursor: "pointer" }}
                      onClick={() => setScreen("detail")}
                      onMouseEnter={e => e.currentTarget.style.background = C.blueLight}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.surface : C.surfaceAlt}>
                      {bp === "desktop" && <td style={{ padding: "11px 12px", fontFamily: "'DM Mono',monospace", fontSize: 10.5, color: C.blue, fontWeight: 600, whiteSpace: "nowrap" }}>{m.ref}</td>}
                      <td style={{ padding: "11px 12px" }}>
                        <div style={{ fontWeight: 600, fontSize: 12.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{m.title}</div>
                        <div style={{ fontSize: 10.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginTop: 1 }}>{m.entite} - {m.chef}</div>
                      </td>
                      {bp === "desktop" && <td style={{ padding: "11px 12px", fontSize: 12, color: C.textMid, fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>{m.type}</td>}
                      <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}><Badge label={m.statut} cfg={STATUS[m.statut] || fallback} small={true} /></td>
                      <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}><Badge label={m.risque} cfg={RISK[m.risque] || fallback} small={true} /></td>
                      <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}><Badge label={m.appro} cfg={APPRO[m.appro] || fallback} small={true} /></td>
                      {bp === "desktop" && <td style={{ padding: "11px 12px", fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.textMid, whiteSpace: "nowrap" }}>{m.echeance}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MISSION FORM (Nouvelle + Modifier) ───────────────────────────────────────
// mode="new" | mode="edit", mission=null | MissionObject
function MissionForm({ setScreen, bp, mode, mission }) {
  const isEdit = mode === "edit";
  const init = isEdit && mission ? {
    title: mission.title, description: mission.description, type: mission.type,
    statut: mission.statut, lancement: mission.lancement, echeance: mission.echeance,
    entite: mission.entite, domaine: mission.domaine, chef: mission.chef,
    risque: mission.risque, appro: mission.appro,
  } : {
    title: "", description: "", type: "Selectionner...", statut: "Planifiee",
    lancement: "", echeance: "", entite: "Selectionner...", domaine: "Selectionner...",
    chef: "", risque: "Selectionner...", appro: "Non soumis",
  };

  const [form, setForm] = useState(init);
  const [files, setFiles] = useState(isEdit && mission ? mission.pj : []);

  function set(key) { return val => setForm(f => ({ ...f, [key]: val })); }

  function Section({ num, title, children }) {
    return (
      <div style={{ background: C.surface, borderRadius: 10, boxShadow: C.shadow, border: "1px solid " + C.border, marginBottom: 14, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border, background: C.surfaceAlt, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: C.blue, fontWeight: 700 }}>{num}</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{title}</span>
        </div>
        <div style={{ padding: "16px" }}>{children}</div>
      </div>
    );
  }

  function Row({ children }) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: bp === "mobile" ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {children}
      </div>
    );
  }

  const backScreen = isEdit ? "detail" : "missions";

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg, paddingBottom: bp === "mobile" ? 72 : 0 }}>
      <TopBar
        title={isEdit ? "Modifier la mission" : "Nouvelle Mission"}
        subtitle={isEdit ? (mission ? mission.ref + " - " + mission.entite : "") : "Creer une mission d'audit"}
        bp={bp}
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="ghost" onClick={() => setScreen(backScreen)} small={true}>Annuler</Btn>
            {bp !== "mobile" && <Btn onClick={() => setScreen(backScreen)} small={true}>&#10003; Enregistrer</Btn>}
          </div>
        }
      />
      <div style={{ padding: bp === "mobile" ? "12px" : "18px 24px", maxWidth: 800, margin: "0 auto" }}>

        <Section num="1" title="Informations generales">
          <div style={{ marginBottom: 12 }}>
            <FieldLabel required={true}>Titre de la mission</FieldLabel>
            <ControlledInput value={form.title} onChange={set("title")} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <FieldLabel>Description</FieldLabel>
            <ControlledTextarea value={form.description} onChange={set("description")} rows={3} />
          </div>
          <Row>
            <div>
              <FieldLabel required={true}>Type de mission</FieldLabel>
              <ControlledSelect value={form.type} onChange={set("type")} options={["Selectionner...", "Interne", "Externe", "Reglementaire", "Thematique"]} />
            </div>
            <div>
              <FieldLabel required={true}>Statut</FieldLabel>
              <ControlledSelect value={form.statut} onChange={set("statut")} options={["Planifiee", "En cours", "Suspendue", "Cloturee"]} />
            </div>
          </Row>
        </Section>

        <Section num="2" title="Planification et Perimetre">
          <Row>
            <div>
              <FieldLabel required={true}>Date de lancement</FieldLabel>
              <ControlledInput value={form.lancement} onChange={set("lancement")} type="text" />
            </div>
            <div>
              <FieldLabel required={true}>Date d'echeance</FieldLabel>
              <ControlledInput value={form.echeance} onChange={set("echeance")} type="text" />
            </div>
          </Row>
          <Row>
            <div>
              <FieldLabel required={true}>Entite auditee</FieldLabel>
              <ControlledSelect value={form.entite} onChange={set("entite")} options={["Selectionner...", "Hyundai Morocco", "Global Lease", "Global Occaz", "Genesis Electric", "Changan Morocco"]} />
            </div>
            <div>
              <FieldLabel required={true}>Domaine d'audit</FieldLabel>
              <ControlledSelect value={form.domaine} onChange={set("domaine")} options={["Selectionner...", "Credit", "Conformite", "SI", "RH", "Finance", "Operations"]} />
            </div>
          </Row>
        </Section>

        <Section num="3" title="Equipe de la mission">
          <Row>
            <div>
              <FieldLabel required={true}>Chef de mission</FieldLabel>
              <ControlledInput value={form.chef} onChange={set("chef")} />
            </div>
            <div>
              <FieldLabel>Responsable entite</FieldLabel>
              <ControlledInput value="" onChange={() => {}} />
            </div>
          </Row>
        </Section>

        <Section num="4" title="Risque et Approbation">
          <Row>
            <div>
              <FieldLabel required={true}>Niveau de risque</FieldLabel>
              <ControlledSelect value={form.risque} onChange={set("risque")} options={["Selectionner...", "Faible", "Moyen", "Eleve", "Critique"]} />
            </div>
            <div>
              <FieldLabel>Statut approbation</FieldLabel>
              <ControlledSelect value={form.appro} onChange={set("appro")} options={["Non soumis", "En attente", "Approuve", "Rejete"]} />
            </div>
          </Row>
        </Section>

        <Section num="5" title="Pieces jointes">
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); setFiles(p => [...p, ...Array.from(e.dataTransfer.files).map(f => f.name)]); }}
            onClick={() => setFiles(p => [...p, "Nouveau_Document_" + (p.length + 1) + ".pdf"])}
            style={{ border: "2px dashed " + C.border, borderRadius: 9, padding: "24px", textAlign: "center", cursor: "pointer", background: C.surfaceAlt, marginBottom: 12 }}>
            <div style={{ fontSize: 22, marginBottom: 6, color: C.textSoft }}>&#8679;</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>Glissez-deposez vos fichiers</div>
            <div style={{ fontSize: 11, color: C.textSoft, marginTop: 3, fontFamily: "'DM Sans',sans-serif" }}>ou cliquez pour parcourir - PDF, Word, Excel - Max 10 Mo</div>
          </div>
          {files.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: C.surfaceAlt, borderRadius: 8, border: "1px solid " + C.border, marginBottom: 6 }}>
              <span style={{ fontSize: 16, color: C.blue }}>&#128196;</span>
              <span style={{ flex: 1, fontSize: 12.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{f}</span>
              <span onClick={e => { e.stopPropagation(); setFiles(p => p.filter((_, j) => j !== i)); }} style={{ fontSize: 16, color: C.textSoft, cursor: "pointer", lineHeight: 1 }}>&#215;</span>
            </div>
          ))}
        </Section>

        {/* Boutons — sans "Enregistrer brouillon" */}
        <div style={{ display: "flex", flexDirection: bp === "mobile" ? "column" : "row", justifyContent: "flex-end", gap: 10, paddingBottom: bp === "mobile" ? 16 : 32 }}>
          <Btn variant="ghost" onClick={() => setScreen(backScreen)} full={bp === "mobile"}>Annuler</Btn>
          <Btn onClick={() => setScreen(backScreen)} full={bp === "mobile"}>&#10003; Enregistrer</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL SCREEN ────────────────────────────────────────────────────────────
// Modifications : suppression section Avancement, suppression Workflow approbation,
// suppression tabs Constats/Documents/Approbation, bouton Modifier -> EditScreen, PJ visibles
function DetailScreen({ setScreen, bp, selectedMission }) {
  const m = selectedMission || MISSIONS[0];

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg, paddingBottom: bp === "mobile" ? 72 : 0 }}>
      <TopBar
        title={m.title}
        subtitle={m.entite + " - " + m.chef}
        bp={bp}
        actions={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Badge label={m.statut} cfg={STATUS[m.statut] || fallback} small={bp === "mobile"} />
            <Btn variant="secondary" small={true} onClick={() => setScreen("edit")}>
              &#9998; Modifier
            </Btn>
          </div>
        }
      />
      <div style={{ padding: bp === "mobile" ? "12px" : "18px 24px" }}>

        {/* Ref card mobile */}
        {bp === "mobile" && (
          <div style={{ background: C.surface, borderRadius: 10, padding: "12px 14px", marginBottom: 12, boxShadow: C.shadow, border: "1px solid " + C.border }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.blue, fontWeight: 600, marginBottom: 3 }}>{m.ref}</div>
            <div style={{ fontSize: 11.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{m.entite} - Chef : {m.chef}</div>
          </div>
        )}

        {/* Metrics strip — sans Avancement */}
        <div style={{ display: "grid", gridTemplateColumns: bp === "mobile" ? "repeat(2,1fr)" : "repeat(5,1fr)", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Risque",      value: m.risque,   color: (RISK[m.risque] || fallback).color },
            { label: "Approbation", value: m.appro,    color: (APPRO[m.appro] || fallback).color },
            { label: "Lancement",   value: m.lancement, color: C.textMid },
            { label: "Echeance",    value: m.echeance,  color: C.red },
            { label: "Domaine",     value: m.domaine,   color: C.teal },
          ].map((s, i) => (
            <div key={i} style={{ background: C.surface, borderRadius: 9, padding: "10px 12px", boxShadow: C.shadow, border: "1px solid " + C.border, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'DM Sans',sans-serif", marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: bp === "mobile" ? 11 : 13, fontWeight: 700, color: s.color, fontFamily: "'DM Mono',monospace" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Main content — single "Apercu" tab, pas de tabs Constats/Documents/Approbation */}
        <div style={{ display: "grid", gridTemplateColumns: bp === "desktop" ? "1fr 300px" : "1fr", gap: 16 }}>

          {/* Informations */}
          <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "18px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid " + C.border }}>
              Informations de la mission
            </div>
            <div style={{ display: "grid", gridTemplateColumns: bp === "mobile" ? "1fr" : "1fr 1fr", gap: "14px 28px" }}>
              {[
                ["Reference",      m.ref],
                ["Type",           m.type],
                ["Entite auditee", m.entite],
                ["Domaine",        m.domaine],
                ["Date lancement", m.lancement],
                ["Date echeance",  m.echeance],
                ["Chef de mission", m.chef],
                ["Niveau de risque", m.risque],
                ["Statut approbation", m.appro],
                ["Statut mission",   m.statut],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans',sans-serif", marginBottom: 3 }}>{k}</div>
                  <div style={{ fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid " + C.border }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans',sans-serif", marginBottom: 6 }}>Description</div>
              <div style={{ fontSize: 13, color: C.textMid, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7 }}>{m.description}</div>
            </div>
          </div>

          {/* Right column: PJ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "16px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid " + C.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Pieces jointes</span>
                <span style={{ fontSize: 11, color: C.textSoft, fontWeight: 400, fontFamily: "'DM Sans',sans-serif" }}>{m.pj.length} fichier(s)</span>
              </div>
              {m.pj.length === 0 ? (
                <div style={{ fontSize: 12, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", textAlign: "center", padding: "16px 0" }}>Aucune piece jointe</div>
              ) : (
                m.pj.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < m.pj.length - 1 ? "1px solid " + C.border : "none" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: C.navy, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f}</div>
                    </div>
                    <span style={{ fontSize: 14, color: C.blue, cursor: "pointer", flexShrink: 0 }}>&#8595;</span>
                  </div>
                ))
              )}
            </div>

            {/* Badges statuts */}
            <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "16px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Statuts</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.textMid, fontFamily: "'DM Sans',sans-serif" }}>Mission</span>
                  <Badge label={m.statut} cfg={STATUS[m.statut] || fallback} small={true} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.textMid, fontFamily: "'DM Sans',sans-serif" }}>Risque</span>
                  <Badge label={m.risque} cfg={RISK[m.risque] || fallback} small={true} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: C.textMid, fontFamily: "'DM Sans',sans-serif" }}>Approbation</span>
                  <Badge label={m.appro} cfg={APPRO[m.appro] || fallback} small={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const bp = useBreakpoint();
  const [screen, setScreen] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMission] = useState(MISSIONS[0]);

  function renderScreen() {
    switch (screen) {
      case "dashboard": return <DashboardScreen setScreen={setScreen} bp={bp} />;
      case "missions":  return <MissionsScreen  setScreen={setScreen} bp={bp} />;
      case "new":       return <MissionForm setScreen={setScreen} bp={bp} mode="new" mission={null} />;
      case "edit":      return <MissionForm setScreen={setScreen} bp={bp} mode="edit" mission={selectedMission} />;
      case "detail":    return <DetailScreen setScreen={setScreen} bp={bp} selectedMission={selectedMission} />;
      default:          return <DashboardScreen setScreen={setScreen} bp={bp} />;
    }
  }

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F0F2F7; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F0F2F7; }
        ::-webkit-scrollbar-thumb { background: #C5CBE0; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: #8B95B0; }
      `}</style>

      {bp === "mobile" && (
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} active={screen} setScreen={setScreen} />
      )}

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {bp !== "mobile" && (
          <Sidebar active={screen} setScreen={setScreen} collapsed={collapsed} setCollapsed={setCollapsed} bp={bp} />
        )}
        <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
          {renderScreen()}
        </div>
      </div>

      {bp === "mobile" && <BottomNav active={screen} setScreen={setScreen} />}
    </div>
  );
}
