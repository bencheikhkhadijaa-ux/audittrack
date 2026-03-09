import { useState, useEffect } from "react";

const useBreakpoint = () => {
  const [bp, setBp] = useState(() => {
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  });
  useEffect(() => {
    const fn = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
};

const C = {
  bg: "#F0F2F7", surface: "#FFFFFF", surfaceAlt: "#F7F8FC", border: "#E2E6F0",
  navy: "#0B1E4A", blue: "#1B4FD8", blueLight: "#EBF0FF", teal: "#0D9488",
  text: "#0B1E4A", textMid: "#4A5578", textSoft: "#8B95B0",
  green: "#059669", orange: "#D97706", red: "#DC2626", purple: "#7C3AED",
  shadow: "0 1px 3px rgba(11,30,74,0.08)",
};

const RISK = {
  "Critique": { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
  "Eleve":    { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  "Moyen":    { bg: "#FFFBEB", color: "#92400E", border: "#FDE68A" },
  "Faible":   { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
};
const RISK_LABELS = {
  "Critique": "Critique", "Eleve": "Eleve", "Moyen": "Moyen", "Faible": "Faible",
};
const STATUS = {
  "En cours":  { bg: "#EBF0FF", color: "#1B4FD8", border: "#BFCFFF" },
  "Planifiee": { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
  "Cloturee":  { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  "Suspendue": { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
};
const STATUS_LABELS = {
  "En cours": "En cours", "Planifiee": "Planifiee", "Cloturee": "Cloturee", "Suspendue": "Suspendue",
};
const APPRO = {
  "Non soumis": { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
  "En attente": { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  "Approuve":   { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  "Rejete":     { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
};
const APPRO_LABELS = {
  "Non soumis": "Non soumis", "En attente": "En attente", "Approuve": "Approuve", "Rejete": "Rejete",
};

const MISSIONS = [
  { id: 1, ref: "MIS-2025-001", title: "Audit Risques Operationnels", type: "Interne", statut: "En cours", entite: "Hyundai Morocco", domaine: "Operations", chef: "Khalid Mansouri", risque: "Eleve", appro: "En attente", lancement: "01/01/2025", echeance: "20/03/2025", avancement: 68 },
  { id: 2, ref: "MIS-2025-002", title: "Conformite KYC - Global Lease", type: "Reglementaire", statut: "Planifiee", entite: "Global Lease", domaine: "Conformite", chef: "Nadia Chraibi", risque: "Critique", appro: "Non soumis", lancement: "15/01/2025", echeance: "30/04/2025", avancement: 0 },
  { id: 3, ref: "MIS-2025-003", title: "Audit SI - Genesis Electric", type: "Thematique", statut: "Cloturee", entite: "Genesis Electric", domaine: "SI", chef: "Rachid Amrani", risque: "Moyen", appro: "Approuve", lancement: "10/11/2024", echeance: "10/02/2025", avancement: 100 },
  { id: 4, ref: "MIS-2025-004", title: "Audit Credit - Global Occaz", type: "Interne", statut: "Suspendue", entite: "Global Occaz", domaine: "Credit", chef: "Khalid Mansouri", risque: "Eleve", appro: "Rejete", lancement: "05/02/2025", echeance: "30/03/2025", avancement: 35 },
  { id: 5, ref: "MIS-2025-005", title: "Controle Interne RH - Changan", type: "Interne", statut: "En cours", entite: "Changan Morocco", domaine: "RH", chef: "Nadia Chraibi", risque: "Faible", appro: "Approuve", lancement: "01/03/2025", echeance: "15/04/2025", avancement: 42 },
];

const fallbackCfg = { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" };

function Badge({ label, cfg, small }) {
  const s = cfg || fallbackCfg;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: small ? 3 : 5,
      padding: small ? "2px 7px" : "3px 10px", borderRadius: 20,
      fontSize: small ? 10 : 12, fontWeight: 600,
      background: s.bg, color: s.color, border: "1px solid " + s.border,
      whiteSpace: "nowrap", fontFamily: "'DM Sans',sans-serif",
    }}>
      <span style={{ width: small ? 4 : 5, height: small ? 4 : 5, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function ProgressBar({ value }) {
  const barColor = value === 100 ? "#059669" : value > 70 ? "#1B4FD8" : value > 40 ? "#D97706" : "#DC2626";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 5, borderRadius: 3, background: "#E2E6F0", overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 3, width: value + "%", background: barColor }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 600, color: C.textMid, minWidth: 24, fontFamily: "'DM Mono',monospace" }}>{value}%</span>
    </div>
  );
}

function Btn({ children, variant, onClick, small, full }) {
  const v = variant || "primary";
  const styles = {
    primary:   { bg: C.blue,        color: "#fff",    border: "1.5px solid " + C.blue },
    secondary: { bg: "#fff",        color: C.blue,    border: "1.5px solid " + C.blue },
    ghost:     { bg: "transparent", color: C.textMid, border: "1.5px solid " + C.border },
  };
  const st = styles[v];
  return (
    <button onClick={onClick} style={{
      padding: small ? "6px 12px" : "9px 18px", borderRadius: 8,
      border: st.border, background: st.bg, color: st.color,
      fontSize: small ? 12 : 13.5, fontWeight: 600,
      fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
      width: full ? "100%" : "auto",
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    }}>
      {children}
    </button>
  );
}

function FieldLabel({ children, required }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: C.textMid, marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
      {children}
      {required && <span style={{ color: C.red, marginLeft: 2 }}>*</span>}
    </div>
  );
}

function Input({ placeholder, value, type }) {
  return (
    <input
      defaultValue={value} type={type || "text"} placeholder={placeholder}
      style={{ width: "100%", padding: "9px 11px", borderRadius: 8, border: "1.5px solid " + C.border, fontSize: 13, color: C.text, background: C.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }}
      onFocus={e => { e.target.style.borderColor = C.blue; }}
      onBlur={e => { e.target.style.borderColor = C.border; }}
    />
  );
}

function Select({ options, defaultVal }) {
  return (
    <select defaultValue={defaultVal} style={{ width: "100%", padding: "9px 30px 9px 11px", borderRadius: 8, border: "1.5px solid " + C.border, fontSize: 13, color: C.text, background: C.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", appearance: "none", boxSizing: "border-box" }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

function Textarea({ placeholder, rows }) {
  return (
    <textarea
      placeholder={placeholder} rows={rows || 3}
      style={{ width: "100%", padding: "9px 11px", borderRadius: 8, border: "1.5px solid " + C.border, fontSize: 13, color: C.text, background: C.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5 }}
      onFocus={e => { e.target.style.borderColor = C.blue; }}
      onBlur={e => { e.target.style.borderColor = C.border; }}
    />
  );
}

function TopBar({ title, subtitle, actions, bp, onMenuClick }) {
  return (
    <div style={{ padding: bp === "mobile" ? "12px 16px" : "14px 24px", background: C.surface, borderBottom: "1px solid " + C.border, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 5, boxShadow: C.shadow, gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {bp === "mobile" && (
          <div onClick={onMenuClick} style={{ fontSize: 20, color: C.navy, cursor: "pointer", flexShrink: 0 }}>
            &#9776;
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: bp === "mobile" ? 15 : 18, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans',sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title}
          </div>
          {subtitle && bp !== "mobile" && (
            <div style={{ fontSize: 11.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginTop: 1 }}>{subtitle}</div>
          )}
        </div>
      </div>
      {actions && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>{actions}</div>
      )}
    </div>
  );
}

function KpiCard({ label, value, sub, color, icon }) {
  return (
    <div style={{ background: C.surface, borderRadius: 12, padding: "16px 14px", boxShadow: C.shadow, border: "1px solid " + C.border, borderTop: "3px solid " + color, position: "relative", overflow: "hidden", flex: 1, minWidth: 0 }}>
      <div style={{ position: "absolute", top: 12, right: 12, fontSize: 18, color: color, opacity: 0.15, fontWeight: 900 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: color, fontFamily: "'DM Mono',monospace", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 5, fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
      <div style={{ fontSize: 10, color: C.textSoft, marginTop: 2, fontFamily: "'DM Sans',sans-serif" }}>{sub}</div>
    </div>
  );
}

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
                {item.badge && (
                  <span style={{ marginLeft: "auto", background: "rgba(27,79,216,0.4)", color: "#7BA7FF", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10 }}>{item.badge}</span>
                )}
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

function DashboardScreen({ setScreen, bp }) {
  const kpiData = [
    { label: "Total Missions",    value: 5, sub: "Actives + planifiees", color: C.blue,   icon: "=" },
    { label: "En Cours",          value: 2, sub: "57% avancement moy.", color: C.teal,   icon: ">" },
    { label: "En Retard",         value: 2, sub: "Depassement echeance", color: C.red,    icon: "!" },
    { label: "En Attente Appro.", value: 1, sub: "Approbation requise",  color: C.orange, icon: "?" },
    { label: "Cloturees",         value: 1, sub: "Exercice 2025",        color: C.green,  icon: "v" },
  ];

  const topBarActions = bp !== "mobile" ? (
    <Btn variant="secondary" onClick={() => setScreen("new")} small={true}>+ Nouvelle mission</Btn>
  ) : null;

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg, paddingBottom: bp === "mobile" ? 72 : 0 }}>
      <TopBar title="Tableau de Bord" subtitle="BAG Group" bp={bp} actions={topBarActions} />
      <div style={{ padding: bp === "mobile" ? "14px" : "20px 24px" }}>

        {/* KPIs */}
        {bp === "mobile" ? (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <KpiCard label="Total"      value={5} sub="Missions"     color={C.blue}   icon="=" />
              <KpiCard label="En cours"   value={2} sub="Actives"      color={C.teal}   icon=">" />
              <KpiCard label="Retard"     value={2} sub="Depassement"  color={C.red}    icon="!" />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <KpiCard label="Approbation" value={1} sub="En attente"   color={C.orange} icon="?" />
              <KpiCard label="Cloturees"   value={1} sub="Exercice 2025" color={C.green}  icon="v" />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {kpiData.map((k, i) => <KpiCard key={i} label={k.label} value={k.value} sub={k.sub} color={k.color} icon={k.icon} />)}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: bp === "desktop" ? "1fr 300px" : "1fr", gap: 16 }}>
          {/* Mission table */}
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
                      <Badge label={STATUS_LABELS[m.statut] || m.statut} cfg={STATUS[m.statut] || fallbackCfg} small={true} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Badge label={RISK_LABELS[m.risque] || m.risque} cfg={RISK[m.risque] || fallbackCfg} small={true} />
                      <div style={{ flex: 1 }}><ProgressBar value={m.avancement} /></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                  <thead>
                    <tr style={{ background: C.surfaceAlt }}>
                      {(bp === "desktop" ? ["Ref", "Mission / Entite", "Statut", "Risque", "Echeance", "Avancement"] : ["Mission", "Statut", "Risque", "Avancement"]).map(h => (
                        <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans',sans-serif", borderBottom: "1px solid " + C.border, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MISSIONS.map((m, i) => (
                      <tr key={m.id} style={{ borderBottom: "1px solid " + C.border, background: i % 2 === 0 ? C.surface : C.surfaceAlt, cursor: "pointer" }}
                        onClick={() => setScreen("detail")}
                        onMouseEnter={e => { e.currentTarget.style.background = C.blueLight; }}
                        onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? C.surface : C.surfaceAlt; }}>
                        {bp === "desktop" && <td style={{ padding: "10px 12px", fontFamily: "'DM Mono',monospace", fontSize: 10.5, color: C.blue, fontWeight: 600, whiteSpace: "nowrap" }}>{m.ref}</td>}
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: 600, fontSize: 12.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{m.title}</div>
                          <div style={{ fontSize: 10.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{m.entite}</div>
                        </td>
                        <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}><Badge label={STATUS_LABELS[m.statut] || m.statut} cfg={STATUS[m.statut] || fallbackCfg} small={true} /></td>
                        <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}><Badge label={RISK_LABELS[m.risque] || m.risque} cfg={RISK[m.risque] || fallbackCfg} small={true} /></td>
                        {bp === "desktop" && <td style={{ padding: "10px 12px", fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.textMid, whiteSpace: "nowrap" }}>{m.echeance}</td>}
                        <td style={{ padding: "10px 12px", minWidth: 100 }}><ProgressBar value={m.avancement} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right panel desktop */}
          {bp === "desktop" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "14px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Distribution des risques</div>
                {[["Critique", 1, "#DC2626"], ["Eleve", 2, "#D97706"], ["Moyen", 1, "#92400E"], ["Faible", 1, "#059669"]].map(([label, count, color]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: C.textMid, fontFamily: "'DM Sans',sans-serif", flex: 1 }}>{label}</span>
                    <div style={{ flex: 2, height: 5, borderRadius: 3, background: C.border, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 3, width: (count / 5 * 100) + "%", background: color }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.textMid, fontFamily: "'DM Mono',monospace", minWidth: 14 }}>{count}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "14px 16px", flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Activite recente</div>
                {[
                  { icon: "v", color: C.green,  text: "MIS-2025-003 approuvee", time: "Il y a 2h" },
                  { icon: "!", color: C.orange, text: "MIS-2025-001 en retard",  time: "Il y a 5h" },
                  { icon: "+", color: C.blue,   text: "MIS-2025-005 creee",      time: "Hier 09:00" },
                  { icon: "x", color: C.red,    text: "MIS-2025-004 rejetee",    time: "Il y a 2j" },
                ].map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "7px 0", borderBottom: i < 3 ? "1px solid " + C.border : "none" }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: a.color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: a.color }}>{a.icon}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{a.text}</div>
                      <div style={{ fontSize: 10, color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tablet below */}
          {bp === "tablet" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "14px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 10 }}>Risques</div>
                {[["Critique", 1, "#DC2626"], ["Eleve", 2, "#D97706"], ["Moyen", 1, "#92400E"], ["Faible", 1, "#059669"]].map(([label, count, color]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                    <span style={{ fontSize: 11.5, color: C.textMid, flex: 1, fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
                    <div style={{ flex: 2, height: 5, borderRadius: 3, background: C.border, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 3, width: (count / 5 * 100) + "%", background: color }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.textMid, fontFamily: "'DM Mono',monospace", minWidth: 14 }}>{count}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "14px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 10 }}>Activite recente</div>
                {[
                  { icon: "v", color: C.green,  text: "MIS-2025-003 approuvee", time: "Il y a 2h" },
                  { icon: "!", color: C.orange, text: "MIS-2025-001 en retard",  time: "Il y a 5h" },
                  { icon: "+", color: C.blue,   text: "MIS-2025-005 creee",      time: "Hier 09:00" },
                ].map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: i < 2 ? "1px solid " + C.border : "none" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 5, background: a.color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: a.color }}>{a.icon}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 11.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{a.text}</div>
                      <div style={{ fontSize: 10, color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {bp === "mobile" && (
          <button onClick={() => setScreen("new")} style={{ position: "fixed", bottom: 76, right: 20, width: 52, height: 52, borderRadius: "50%", background: C.blue, border: "none", color: "#fff", fontSize: 24, cursor: "pointer", boxShadow: "0 4px 16px rgba(27,79,216,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 30 }}>+</button>
        )}
      </div>
    </div>
  );
}

function MissionsScreen({ setScreen, bp }) {
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const filtered = MISSIONS.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.ref.includes(search);
    const matchStatut = filterStatut === "Tous" || m.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  const topBarActions = bp !== "mobile" ? <Btn onClick={() => setScreen("new")} small={true}>+ Nouvelle</Btn> : null;

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg, paddingBottom: bp === "mobile" ? 72 : 0 }}>
      <TopBar title="Missions d'Audit" subtitle={MISSIONS.length + " missions"} bp={bp} actions={topBarActions} />
      <div style={{ padding: bp === "mobile" ? "12px" : "18px 24px" }}>
        <div style={{ background: C.surface, borderRadius: 10, padding: "10px 14px", marginBottom: 14, boxShadow: C.shadow, border: "1px solid " + C.border, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 150, position: "relative" }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
              style={{ width: "100%", padding: "7px 10px", borderRadius: 7, border: "1.5px solid " + C.border, fontSize: 12.5, color: C.text, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }}
              onFocus={e => { e.target.style.borderColor = C.blue; }}
              onBlur={e => { e.target.style.borderColor = C.border; }}
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
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                  <Badge label={STATUS_LABELS[m.statut] || m.statut} cfg={STATUS[m.statut] || fallbackCfg} small={true} />
                  <Badge label={RISK_LABELS[m.risque] || m.risque} cfg={RISK[m.risque] || fallbackCfg} small={true} />
                  <Badge label={APPRO_LABELS[m.appro] || m.appro} cfg={APPRO[m.appro] || fallbackCfg} small={true} />
                </div>
                <ProgressBar value={m.avancement} />
                <div style={{ fontSize: 10.5, color: C.textSoft, fontFamily: "'DM Mono',monospace", marginTop: 6 }}>Echeance : {m.echeance}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: C.surface, borderRadius: 12, boxShadow: C.shadow, border: "1px solid " + C.border, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                <thead>
                  <tr style={{ background: C.surfaceAlt, borderBottom: "2px solid " + C.border }}>
                    {(bp === "desktop" ? ["Reference", "Mission / Entite", "Type", "Statut", "Risque", "Approbation", "Echeance", "Avancement"] : ["Mission / Entite", "Statut", "Risque", "Approbation", "Avancement"]).map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <tr key={m.id} style={{ borderBottom: "1px solid " + C.border, background: i % 2 === 0 ? C.surface : C.surfaceAlt, cursor: "pointer" }}
                      onClick={() => setScreen("detail")}
                      onMouseEnter={e => { e.currentTarget.style.background = C.blueLight; }}
                      onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? C.surface : C.surfaceAlt; }}>
                      {bp === "desktop" && <td style={{ padding: "11px 12px", fontFamily: "'DM Mono',monospace", fontSize: 10.5, color: C.blue, fontWeight: 600, whiteSpace: "nowrap" }}>{m.ref}</td>}
                      <td style={{ padding: "11px 12px" }}>
                        <div style={{ fontWeight: 600, fontSize: 12.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{m.title}</div>
                        <div style={{ fontSize: 10.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif", marginTop: 1 }}>{m.entite} - {m.chef}</div>
                      </td>
                      {bp === "desktop" && <td style={{ padding: "11px 12px", fontSize: 12, color: C.textMid, fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>{m.type}</td>}
                      <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}><Badge label={STATUS_LABELS[m.statut] || m.statut} cfg={STATUS[m.statut] || fallbackCfg} small={true} /></td>
                      <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}><Badge label={RISK_LABELS[m.risque] || m.risque} cfg={RISK[m.risque] || fallbackCfg} small={true} /></td>
                      <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}><Badge label={APPRO_LABELS[m.appro] || m.appro} cfg={APPRO[m.appro] || fallbackCfg} small={true} /></td>
                      {bp === "desktop" && <td style={{ padding: "11px 12px", fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.textMid, whiteSpace: "nowrap" }}>{m.echeance}</td>}
                      <td style={{ padding: "11px 12px", minWidth: 90 }}><ProgressBar value={m.avancement} /></td>
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

function NewMissionScreen({ setScreen, bp }) {
  const [files, setFiles] = useState([]);

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

  const cancelBtn = <Btn variant="ghost" onClick={() => setScreen("missions")} small={true}>Annuler</Btn>;
  const saveBtn = bp !== "mobile" ? <Btn onClick={() => setScreen("missions")} small={true}>Enregistrer</Btn> : null;

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg, paddingBottom: bp === "mobile" ? 72 : 0 }}>
      <TopBar title="Nouvelle Mission" subtitle="Creer une mission d'audit" bp={bp} actions={
        <div style={{ display: "flex", gap: 8 }}>
          {cancelBtn}
          {saveBtn}
        </div>
      } />
      <div style={{ padding: bp === "mobile" ? "12px" : "18px 24px", maxWidth: 800, margin: "0 auto" }}>

        <Section num="1" title="Informations generales">
          <div style={{ marginBottom: 12 }}>
            <FieldLabel required={true}>Titre de la mission</FieldLabel>
            <Input placeholder="Ex : Audit Risques Operationnels" />
          </div>
          <div style={{ marginBottom: 12 }}>
            <FieldLabel>Description</FieldLabel>
            <Textarea placeholder="Objectif et perimetre..." rows={3} />
          </div>
          <Row>
            <div><FieldLabel required={true}>Type de mission</FieldLabel><Select options={["Selectionner...", "Interne", "Externe", "Reglementaire", "Thematique"]} /></div>
            <div><FieldLabel required={true}>Statut</FieldLabel><Select options={["Planifiee", "En cours", "Suspendue", "Cloturee"]} defaultVal="Planifiee" /></div>
          </Row>
        </Section>

        <Section num="2" title="Planification et Perimetre">
          <Row>
            <div><FieldLabel required={true}>Date de lancement</FieldLabel><Input type="date" value="2025-03-01" /></div>
            <div><FieldLabel required={true}>Date d'echeance</FieldLabel><Input type="date" value="2025-04-30" /></div>
          </Row>
          <Row>
            <div><FieldLabel required={true}>Entite auditee</FieldLabel><Select options={["Selectionner...", "Hyundai Morocco", "Global Lease", "Global Occaz", "Genesis Electric", "Changan Morocco"]} /></div>
            <div><FieldLabel required={true}>Domaine d'audit</FieldLabel><Select options={["Selectionner...", "Credit", "Conformite", "SI", "RH", "Finance", "Operations"]} /></div>
          </Row>
        </Section>

        <Section num="3" title="Equipe de la mission">
          <Row>
            <div><FieldLabel required={true}>Chef de mission</FieldLabel><Input placeholder="Rechercher..." value="Khalid Mansouri" /></div>
            <div><FieldLabel>Responsable entite</FieldLabel><Input placeholder="Rechercher..." /></div>
          </Row>
        </Section>

        <Section num="4" title="Risque et Approbation">
          <Row>
            <div><FieldLabel required={true}>Niveau de risque</FieldLabel><Select options={["Selectionner...", "Faible", "Moyen", "Eleve", "Critique"]} /></div>
            <div><FieldLabel>Statut approbation</FieldLabel><Select options={["Non soumis", "En attente", "Approuve", "Rejete"]} defaultVal="Non soumis" /></div>
          </Row>
        </Section>

        <Section num="5" title="Pieces jointes">
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); setFiles(p => [...p, ...Array.from(e.dataTransfer.files).map(f => f.name)]); }}
            onClick={() => setFiles(p => [...p, "Rapport_Audit_2025.pdf"])}
            style={{ border: "2px dashed " + C.border, borderRadius: 9, padding: "24px", textAlign: "center", cursor: "pointer", background: C.surfaceAlt, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>Glissez-deposez vos fichiers</div>
            <div style={{ fontSize: 11, color: C.textSoft, marginTop: 3, fontFamily: "'DM Sans',sans-serif" }}>ou cliquez pour parcourir - PDF, Word, Excel - Max 10 Mo</div>
          </div>
          {files.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: C.surfaceAlt, borderRadius: 7, border: "1px solid " + C.border, marginBottom: 6 }}>
              <span style={{ flex: 1, fontSize: 12.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{f}</span>
              <span onClick={() => setFiles(p => p.filter((_, j) => j !== i))} style={{ fontSize: 16, color: C.textSoft, cursor: "pointer" }}>x</span>
            </div>
          ))}
        </Section>

        <div style={{ display: "flex", flexDirection: bp === "mobile" ? "column" : "row", justifyContent: "flex-end", gap: 10, paddingBottom: bp === "mobile" ? 16 : 32 }}>
          <Btn variant="ghost" onClick={() => setScreen("missions")} full={bp === "mobile"}>Annuler</Btn>
          <Btn variant="secondary" full={bp === "mobile"}>Enregistrer brouillon</Btn>
          <Btn onClick={() => setScreen("missions")} full={bp === "mobile"}>Enregistrer</Btn>
        </div>
      </div>
    </div>
  );
}

function DetailScreen({ setScreen, bp }) {
  const m = MISSIONS[0];
  const [tab, setTab] = useState("apercu");
  const tabs = [["apercu", "Apercu"], ["constats", "Constats (3)"], ["documents", "Documents"], ["approbation", "Approbation"]];

  const modifyBtn = bp !== "mobile" ? <Btn variant="secondary" small={true}>Modifier</Btn> : null;

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg, paddingBottom: bp === "mobile" ? 72 : 0 }}>
      <TopBar
        title={m.title}
        subtitle={m.entite + " - " + m.chef}
        bp={bp}
        actions={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Badge label={STATUS_LABELS[m.statut] || m.statut} cfg={STATUS[m.statut] || fallbackCfg} small={bp === "mobile"} />
            {modifyBtn}
          </div>
        }
      />
      <div style={{ padding: bp === "mobile" ? "12px" : "18px 24px" }}>

        {bp === "mobile" && (
          <div style={{ background: C.surface, borderRadius: 10, padding: "12px 14px", marginBottom: 12, boxShadow: C.shadow, border: "1px solid " + C.border }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.blue, fontWeight: 600, marginBottom: 3 }}>{m.ref}</div>
            <div style={{ fontSize: 11.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{m.entite} - Chef : {m.chef}</div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: bp === "mobile" ? "repeat(3,1fr)" : "repeat(6,1fr)", gap: 10, marginBottom: 14 }}>
          {[
            { label: "Avancement", value: m.avancement + "%", color: C.blue },
            { label: "Risque",     value: RISK_LABELS[m.risque] || m.risque, color: (RISK[m.risque] || fallbackCfg).color },
            { label: "Approbation", value: bp === "mobile" ? "N/S" : (APPRO_LABELS[m.appro] || m.appro), color: (APPRO[m.appro] || fallbackCfg).color },
            ...(bp !== "mobile" ? [
              { label: "Lancement", value: m.lancement, color: C.textMid },
              { label: "Echeance",  value: m.echeance,  color: C.red },
              { label: "Domaine",   value: m.domaine,   color: C.teal },
            ] : []),
          ].map((s, i) => (
            <div key={i} style={{ background: C.surface, borderRadius: 9, padding: "10px", boxShadow: C.shadow, border: "1px solid " + C.border, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'DM Sans',sans-serif", marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: bp === "mobile" ? 11 : 13, fontWeight: 700, color: s.color, fontFamily: "'DM Mono',monospace" }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: C.surface, borderRadius: 9, padding: "12px 16px", marginBottom: 14, boxShadow: C.shadow, border: "1px solid " + C.border, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.textMid, fontFamily: "'DM Sans',sans-serif", minWidth: 70 }}>Avancement</span>
          <div style={{ flex: 1, height: 7, borderRadius: 4, background: C.border, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, width: m.avancement + "%", background: "linear-gradient(90deg," + C.blue + "," + C.teal + ")" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.blue, fontFamily: "'DM Mono',monospace", minWidth: 36 }}>{m.avancement}%</span>
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 14, borderBottom: "2px solid " + C.border, overflowX: "auto" }}>
          {tabs.map(([id, label]) => (
            <div key={id} onClick={() => setTab(id)} style={{ padding: bp === "mobile" ? "8px 12px" : "9px 16px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: bp === "mobile" ? 12 : 13, fontWeight: tab === id ? 700 : 500, color: tab === id ? C.blue : C.textMid, borderBottom: tab === id ? "2px solid " + C.blue : "2px solid transparent", marginBottom: -2, whiteSpace: "nowrap" }}>
              {label}
            </div>
          ))}
        </div>

        {tab === "apercu" && (
          <div style={{ display: "grid", gridTemplateColumns: bp === "desktop" ? "1fr 280px" : "1fr", gap: 14 }}>
            <div style={{ background: C.surface, borderRadius: 10, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "16px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 14 }}>Informations</div>
              <div style={{ display: "grid", gridTemplateColumns: bp === "mobile" ? "1fr" : "1fr 1fr", gap: "10px 20px" }}>
                {[["Reference", m.ref], ["Type", m.type], ["Entite", m.entite], ["Domaine", m.domaine], ["Lancement", m.lancement], ["Echeance", m.echeance], ["Chef de mission", m.chef], ["Niveau risque", RISK_LABELS[m.risque] || m.risque]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'DM Sans',sans-serif", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 12.5, color: C.navy, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid " + C.border }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'DM Sans',sans-serif", marginBottom: 5 }}>Description</div>
                <div style={{ fontSize: 12.5, color: C.textMid, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>
                  Audit des risques operationnels lies aux processus de vente, gestion des stocks et service apres-vente. Perimetre : ensemble des showrooms Hyundai Morocco.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: C.surface, borderRadius: 10, boxShadow: C.shadow, border: "1px solid " + C.border, padding: "14px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif", marginBottom: 12 }}>Workflow approbation</div>
                {[
                  { level: "N1", label: "Chef mission", person: "K. Mansouri", statut: "Approuve",  color: C.green },
                  { level: "N2", label: "Dir. Audit",   person: "M. Berrada",  statut: "En attente", color: C.orange },
                  { level: "N3", label: "DG",           person: "---",         statut: "Bloque",    color: C.textSoft },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < 2 ? "1px solid " + C.border : "none" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", border: "2px solid " + s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: s.color, fontFamily: "'DM Mono',monospace" }}>{s.level}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{s.label}</div>
                      <div style={{ fontSize: 10.5, color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{s.person}</div>
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: s.color, fontFamily: "'DM Sans',sans-serif" }}>{s.statut}</span>
                  </div>
                ))}
              </div>
              <Btn variant="secondary" full={true} onClick={() => setScreen("new")}>Modifier la mission</Btn>
            </div>
          </div>
        )}

        {tab === "constats" && (
          <div style={{ background: C.surface, borderRadius: 10, boxShadow: C.shadow, border: "1px solid " + C.border, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>Constats (3)</span>
              <Btn small={true}>+ Nouveau constat</Btn>
            </div>
            {[
              { ref: "CON-001", desc: "Absence de segregation des taches dans l'approbation des commandes", crit: "Critique", statut: "Ouvert" },
              { ref: "CON-002", desc: "Documentation insuffisante des procedures de controle interne",       crit: "Eleve",   statut: "En cours" },
              { ref: "CON-003", desc: "Retards recurrents dans la cloture mensuelle des comptes",            crit: "Moyen",   statut: "Leve" },
            ].map((con, i) => {
              const statutCfg = con.statut === "Ouvert" ? { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" } : con.statut === "En cours" ? { bg: "#EBF0FF", color: "#1B4FD8", border: "#BFCFFF" } : { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" };
              return (
                <div key={i} style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border, display: "flex", flexDirection: bp === "mobile" ? "column" : "row", gap: 10, alignItems: bp === "mobile" ? "flex-start" : "center" }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10.5, color: C.textSoft, minWidth: 60 }}>{con.ref}</span>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 12.5, color: C.navy, fontFamily: "'DM Sans',sans-serif" }}>{con.desc}</div></div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <Badge label={RISK_LABELS[con.crit] || con.crit} cfg={RISK[con.crit] || fallbackCfg} small={true} />
                    <Badge label={con.statut} cfg={statutCfg} small={true} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const bp = useBreakpoint();
  const [screen, setScreen] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const screens = {
    dashboard: <DashboardScreen setScreen={setScreen} bp={bp} />,
    missions:  <MissionsScreen  setScreen={setScreen} bp={bp} />,
    new:       <NewMissionScreen setScreen={setScreen} bp={bp} />,
    detail:    <DetailScreen    setScreen={setScreen} bp={bp} />,
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F0F2F7; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F0F2F7; }
        ::-webkit-scrollbar-thumb { background: #C5CBE0; border-radius: 3px; }
      `}</style>

      {bp === "mobile" && (
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} active={screen} setScreen={setScreen} />
      )}

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {bp !== "mobile" && (
          <Sidebar active={screen} setScreen={setScreen} collapsed={collapsed} setCollapsed={setCollapsed} bp={bp} />
        )}
        <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
          {screens[screen]}
        </div>
      </div>

      {bp === "mobile" && (
        <BottomNav active={screen} setScreen={setScreen} />
      )}
    </div>
  );
}
