import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg:       "#F0F2F7",
  surface:  "#FFFFFF",
  surfaceAlt:"#F7F8FC",
  border:   "#E2E6F0",
  navy:     "#0B1E4A",
  navyMid:  "#1A3570",
  blue:     "#1B4FD8",
  blueHov:  "#1640B0",
  blueLight:"#EBF0FF",
  teal:     "#0D9488",
  text:     "#0B1E4A",
  textMid:  "#4A5578",
  textSoft: "#8B95B0",
  green:    "#059669",
  greenBg:  "#ECFDF5",
  orange:   "#D97706",
  orangeBg: "#FFFBEB",
  red:      "#DC2626",
  redBg:    "#FEF2F2",
  purple:   "#7C3AED",
  purpleBg: "#F5F3FF",
  shadow:   "0 1px 3px rgba(11,30,74,0.08), 0 1px 2px rgba(11,30,74,0.04)",
  shadowMd: "0 4px 12px rgba(11,30,74,0.10), 0 2px 6px rgba(11,30,74,0.06)",
  shadowLg: "0 12px 32px rgba(11,30,74,0.12), 0 4px 12px rgba(11,30,74,0.08)",
};

// ─── RISK CONFIG ─────────────────────────────────────────────────────────────
const RISK = {
  "Critique": { bg:"#FEF2F2", color:"#DC2626", border:"#FECACA", dot:"#DC2626" },
  "Élevé":    { bg:"#FFFBEB", color:"#D97706", border:"#FDE68A", dot:"#D97706" },
  "Moyen":    { bg:"#FFFBEB", color:"#92400E", border:"#FDE68A", dot:"#D97706" },
  "Faible":   { bg:"#ECFDF5", color:"#059669", border:"#A7F3D0", dot:"#059669" },
};
const STATUS = {
  "En cours":  { bg:"#EBF0FF", color:"#1B4FD8", border:"#BFCFFF" },
  "Planifiée": { bg:"#F5F3FF", color:"#7C3AED", border:"#DDD6FE" },
  "Clôturée":  { bg:"#ECFDF5", color:"#059669", border:"#A7F3D0" },
  "Suspendue": { bg:"#FFFBEB", color:"#D97706", border:"#FDE68A" },
};
const APPRO = {
  "Non soumis":  { bg:"#F3F4F6", color:"#6B7280", border:"#E5E7EB" },
  "En attente":  { bg:"#FFFBEB", color:"#D97706", border:"#FDE68A" },
  "Approuvé":    { bg:"#ECFDF5", color:"#059669", border:"#A7F3D0" },
  "Rejeté":      { bg:"#FEF2F2", color:"#DC2626", border:"#FECACA" },
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MISSIONS = [
  { id:1, ref:"MIS-2025-001", title:"Audit Risques Opérationnels", type:"Interne", statut:"En cours", entite:"Hyundai Morocco", domaine:"Opérations", chef:"Khalid Mansouri", risque:"Élevé", appro:"En attente", lancement:"01/01/2025", echeance:"20/03/2025", avancement:68 },
  { id:2, ref:"MIS-2025-002", title:"Conformité KYC — Global Lease", type:"Réglementaire", statut:"Planifiée", entite:"Global Lease", domaine:"Conformité", chef:"Nadia Chraibi", risque:"Critique", appro:"Non soumis", lancement:"15/01/2025", echeance:"30/04/2025", avancement:0 },
  { id:3, ref:"MIS-2025-003", title:"Audit SI — Genesis Electric", type:"Thématique", statut:"Clôturée", entite:"Genesis Electric", domaine:"SI", chef:"Rachid Amrani", risque:"Moyen", appro:"Approuvé", lancement:"10/11/2024", echeance:"10/02/2025", avancement:100 },
  { id:4, ref:"MIS-2025-004", title:"Audit Crédit — Global Occaz", type:"Interne", statut:"Suspendue", entite:"Global Occaz", domaine:"Crédit", chef:"Khalid Mansouri", risque:"Élevé", appro:"Rejeté", lancement:"05/02/2025", echeance:"30/03/2025", avancement:35 },
  { id:5, ref:"MIS-2025-005", title:"Contrôle Interne RH — Changan", type:"Interne", statut:"En cours", entite:"Changan Morocco", domaine:"RH", chef:"Nadia Chraibi", risque:"Faible", appro:"Approuvé", lancement:"01/03/2025", echeance:"15/04/2025", avancement:42 },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const Badge = ({ label, cfg, small }) => (
  <span style={{
    display:"inline-flex", alignItems:"center", gap:small?4:5,
    padding:small?"2px 8px":"3px 10px",
    borderRadius:20, fontSize:small?11:12, fontWeight:600, letterSpacing:"0.02em",
    background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`,
    fontFamily:"'DM Sans', sans-serif", whiteSpace:"nowrap",
  }}>
    <span style={{width:small?5:6,height:small?5:6,borderRadius:"50%",background:cfg.color,flexShrink:0}}/>
    {label}
  </span>
);

const ProgressBar = ({ value, color }) => (
  <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{flex:1,height:5,borderRadius:3,background:"#E2E6F0",overflow:"hidden"}}>
      <div style={{height:"100%",borderRadius:3,width:`${value}%`,
        background: value===100?"#059669": value>70?"#1B4FD8": value>40?"#D97706":"#DC2626",
        transition:"width 0.6s ease"}}/>
    </div>
    <span style={{fontSize:11,fontWeight:600,color:T.textMid,minWidth:28,fontFamily:"'DM Mono',monospace"}}>{value}%</span>
  </div>
);

const Label = ({ children, required }) => (
  <div style={{fontSize:12,fontWeight:600,color:T.textMid,marginBottom:6,letterSpacing:"0.04em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>
    {children}{required&&<span style={{color:T.red,marginLeft:3}}>*</span>}
  </div>
);

const Input = ({ placeholder, value, type="text", readOnly }) => (
  <input readOnly={readOnly} defaultValue={value} type={type} placeholder={placeholder} style={{
    width:"100%", padding:"9px 12px", borderRadius:8, border:`1.5px solid ${T.border}`,
    fontSize:13.5, color:T.text, background:readOnly?"#F7F8FC":T.surface,
    fontFamily:"'DM Sans',sans-serif", outline:"none", boxSizing:"border-box",
    transition:"border-color 0.15s",
  }}
  onFocus={e=>!readOnly&&(e.target.style.borderColor=T.blue)}
  onBlur={e=>e.target.style.borderColor=T.border}
  />
);

const Select = ({ options, defaultVal }) => (
  <select defaultValue={defaultVal} style={{
    width:"100%", padding:"9px 12px", borderRadius:8, border:`1.5px solid ${T.border}`,
    fontSize:13.5, color:T.text, background:T.surface, fontFamily:"'DM Sans',sans-serif",
    outline:"none", appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238B95B0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat:"no-repeat", backgroundPosition:"calc(100% - 12px) center", paddingRight:36,
    boxSizing:"border-box",
  }}>
    {options.map(o=><option key={o}>{o}</option>)}
  </select>
);

const Textarea = ({ placeholder, rows=3 }) => (
  <textarea placeholder={placeholder} rows={rows} style={{
    width:"100%", padding:"9px 12px", borderRadius:8, border:`1.5px solid ${T.border}`,
    fontSize:13.5, color:T.text, background:T.surface, fontFamily:"'DM Sans',sans-serif",
    outline:"none", resize:"vertical", boxSizing:"border-box", lineHeight:1.5,
  }}
  onFocus={e=>e.target.style.borderColor=T.blue}
  onBlur={e=>e.target.style.borderColor=T.border}
  />
);

const Btn = ({ children, variant="primary", onClick, small }) => {
  const styles = {
    primary: { bg:T.blue, color:"#fff", border:`1.5px solid ${T.blue}` },
    secondary: { bg:"#fff", color:T.blue, border:`1.5px solid ${T.blue}` },
    ghost: { bg:"transparent", color:T.textMid, border:`1.5px solid ${T.border}` },
    danger: { bg:T.red, color:"#fff", border:`1.5px solid ${T.red}` },
  };
  const s = styles[variant];
  return (
    <button onClick={onClick} style={{
      padding:small?"6px 14px":"9px 20px", borderRadius:8, border:s.border,
      background:s.bg, color:s.color, fontSize:small?12:13.5, fontWeight:600,
      fontFamily:"'DM Sans',sans-serif", cursor:"pointer", letterSpacing:"0.01em",
      transition:"all 0.15s", display:"inline-flex", alignItems:"center", gap:6,
    }}>{children}</button>
  );
};

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const navItems = [
  { id:"dashboard", icon:"⊞", label:"Tableau de bord" },
  { id:"missions",  icon:"≡",  label:"Missions" },
  { id:"new",       icon:"+",  label:"Nouvelle mission" },
  { id:"detail",    icon:"◎",  label:"Détail mission" },
];

const Sidebar = ({ active, setScreen }) => (
  <div style={{
    width:220, minWidth:220, height:"100vh", background:T.navy,
    display:"flex", flexDirection:"column", position:"sticky", top:0,
    boxShadow:"2px 0 12px rgba(0,0,0,0.15)", zIndex:10,
  }}>
    {/* Logo */}
    <div style={{padding:"24px 20px 20px", borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:34,height:34,borderRadius:8,background:T.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{color:"#fff",fontWeight:900,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>A</span>
        </div>
        <div>
          <div style={{color:"#fff",fontWeight:700,fontSize:14.5,fontFamily:"'DM Sans',sans-serif",lineHeight:1.2}}>AuditTrack</div>
          <div style={{color:"rgba(255,255,255,0.4)",fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.06em",textTransform:"uppercase"}}>BAG Group</div>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav style={{flex:1,padding:"12px 10px"}}>
      <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase",padding:"8px 10px 6px",fontFamily:"'DM Sans',sans-serif"}}>Navigation</div>
      {navItems.map(item=>{
        const isActive = active===item.id;
        return (
          <div key={item.id} onClick={()=>setScreen(item.id)} style={{
            display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
            borderRadius:8, marginBottom:2, cursor:"pointer",
            background:isActive?"rgba(27,79,216,0.25)":"transparent",
            border:isActive?`1px solid rgba(27,79,216,0.5)`:"1px solid transparent",
            transition:"all 0.15s",
          }}>
            <span style={{fontSize:16,color:isActive?"#7BA7FF":"rgba(255,255,255,0.45)",width:20,textAlign:"center"}}>{item.icon}</span>
            <span style={{fontSize:13,fontWeight:isActive?600:400,color:isActive?"#fff":"rgba(255,255,255,0.55)",fontFamily:"'DM Sans',sans-serif"}}>{item.label}</span>
            {item.id==="missions"&&<span style={{marginLeft:"auto",background:"rgba(27,79,216,0.4)",color:"#7BA7FF",fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:10,fontFamily:"'DM Mono',monospace"}}>5</span>}
          </div>
        );
      })}

      <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase",padding:"16px 10px 6px",fontFamily:"'DM Sans',sans-serif"}}>Référentiels</div>
      {["Entités","Utilisateurs","Paramètres"].map(item=>(
        <div key={item} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,marginBottom:2,cursor:"pointer",opacity:0.5}}>
          <span style={{fontSize:14,color:"rgba(255,255,255,0.4)",width:20,textAlign:"center"}}>○</span>
          <span style={{fontSize:13,color:"rgba(255,255,255,0.5)",fontFamily:"'DM Sans',sans-serif"}}>{item}</span>
        </div>
      ))}
    </nav>

    {/* User */}
    <div style={{padding:"14px 16px",borderTop:`1px solid rgba(255,255,255,0.08)`,display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#1B4FD8,#0D9488)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <span style={{color:"#fff",fontWeight:700,fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>MB</span>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:"#fff",fontWeight:600,fontSize:12.5,fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>M. Berrada</div>
        <div style={{color:"rgba(255,255,255,0.4)",fontSize:10.5,fontFamily:"'DM Sans',sans-serif"}}>Directeur Audit</div>
      </div>
    </div>
  </div>
);

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
const TopBar = ({ title, subtitle, actions }) => (
  <div style={{
    padding:"16px 28px", background:T.surface, borderBottom:`1px solid ${T.border}`,
    display:"flex", alignItems:"center", justifyContent:"space-between",
    boxShadow:T.shadow, position:"sticky", top:0, zIndex:5,
  }}>
    <div>
      <div style={{fontSize:18,fontWeight:700,color:T.navy,fontFamily:"'DM Sans',sans-serif",lineHeight:1.2}}>{title}</div>
      {subtitle&&<div style={{fontSize:12.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{subtitle}</div>}
    </div>
    {actions&&<div style={{display:"flex",gap:10,alignItems:"center"}}>{actions}</div>}
  </div>
);

// ─── SCREEN: DASHBOARD ───────────────────────────────────────────────────────
const kpis = [
  { label:"Total missions", value:5, sub:"Actives + planifiées", color:T.blue, icon:"≡" },
  { label:"En cours", value:2, sub:"57% avancement moy.", color:"#0D9488", icon:"▷" },
  { label:"En retard", value:2, sub:"Dépassement échéance", color:T.red, icon:"⚠" },
  { label:"En attente appro.", value:1, sub:"Approbation requise", color:T.orange, icon:"◈" },
  { label:"Clôturées", value:1, sub:"Exercice 2025", color:T.green, icon:"✓" },
];

const DashboardScreen = ({ setScreen }) => (
  <div style={{flex:1,overflow:"auto",background:T.bg}}>
    <TopBar title="Tableau de Bord — Audit" subtitle={`Vendredi 6 mars 2025 · BAG Group`}
      actions={<><Btn variant="secondary" onClick={()=>setScreen("new")} small>+ Nouvelle mission</Btn></>}
    />
    <div style={{padding:"24px 28px"}}>

      {/* KPI Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:24}}>
        {kpis.map((k,i)=>(
          <div key={i} style={{background:T.surface,borderRadius:12,padding:"18px 16px",boxShadow:T.shadow,border:`1px solid ${T.border}`,borderTop:`3px solid ${k.color}`,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:14,right:14,fontSize:20,color:k.color,opacity:0.2,fontWeight:900}}>{k.icon}</div>
            <div style={{fontSize:32,fontWeight:800,color:k.color,fontFamily:"'DM Mono',monospace",lineHeight:1}}>{k.value}</div>
            <div style={{fontSize:11,fontWeight:700,color:T.textMid,textTransform:"uppercase",letterSpacing:"0.06em",marginTop:6,fontFamily:"'DM Sans',sans-serif"}}>{k.label}</div>
            <div style={{fontSize:11,color:T.textSoft,marginTop:3,fontFamily:"'DM Sans',sans-serif"}}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20}}>
        {/* Recent missions table */}
        <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,overflow:"hidden"}}>
          <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:14,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Missions récentes</span>
            <span onClick={()=>setScreen("missions")} style={{fontSize:12,color:T.blue,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>Voir tout →</span>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:T.surfaceAlt}}>
                {["Référence","Mission","Statut","Risque","Échéance","Avancement"].map(h=>(
                  <th key={h} style={{padding:"9px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.06em",fontFamily:"'DM Sans',sans-serif",borderBottom:`1px solid ${T.border}`}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MISSIONS.map((m,i)=>(
                <tr key={m.id} style={{borderBottom:`1px solid ${T.border}`,background:i%2===0?T.surface:T.surfaceAlt,cursor:"pointer"}}
                  onClick={()=>setScreen("detail")}>
                  <td style={{padding:"10px 14px",fontFamily:"'DM Mono',monospace",fontSize:11.5,color:T.textMid,fontWeight:600}}>{m.ref}</td>
                  <td style={{padding:"10px 14px"}}>
                    <div style={{fontWeight:600,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{m.title}</div>
                    <div style={{fontSize:11,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>{m.entite}</div>
                  </td>
                  <td style={{padding:"10px 14px"}}><Badge label={m.statut} cfg={STATUS[m.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                  <td style={{padding:"10px 14px"}}><Badge label={m.risque} cfg={RISK[m.risque]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                  <td style={{padding:"10px 14px",fontFamily:"'DM Mono',monospace",fontSize:11.5,color:T.textMid}}>{m.echeance}</td>
                  <td style={{padding:"10px 14px",minWidth:120}}><ProgressBar value={m.avancement}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right panel */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Risk distribution */}
          <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"16px 18px"}}>
            <div style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>Distribution des risques</div>
            {[["Critique",1,"#DC2626"],["Élevé",2,"#D97706"],["Moyen",1,"#92400E"],["Faible",1,"#059669"]].map(([label,count,color])=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0}}/>
                <span style={{fontSize:12.5,color:T.textMid,fontFamily:"'DM Sans',sans-serif",flex:1}}>{label}</span>
                <div style={{flex:2,height:6,borderRadius:3,background:T.border,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:3,width:`${count/5*100}%`,background:color}}/>
                </div>
                <span style={{fontSize:11,fontWeight:700,color:T.textMid,fontFamily:"'DM Mono',monospace",minWidth:16}}>{count}</span>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"16px 18px",flex:1}}>
            <div style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>Activité récente</div>
            {[
              { icon:"✓", color:T.green, text:"MIS-2025-003 approuvée", time:"Il y a 2h" },
              { icon:"⚠", color:T.orange, text:"MIS-2025-001 en retard", time:"Il y a 5h" },
              { icon:"+", color:T.blue, text:"MIS-2025-005 créée", time:"Hier 09:00" },
              { icon:"✗", color:T.red, text:"MIS-2025-004 rejetée", time:"Il y a 2j" },
            ].map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0",borderBottom:i<3?`1px solid ${T.border}`:"none"}}>
                <div style={{width:26,height:26,borderRadius:6,background:a.color+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                  <span style={{fontSize:11,fontWeight:700,color:a.color}}>{a.icon}</span>
                </div>
                <div>
                  <div style={{fontSize:12.5,color:T.navy,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{a.text}</div>
                  <div style={{fontSize:11,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── SCREEN: LISTE MISSIONS ───────────────────────────────────────────────────
const MissionsScreen = ({ setScreen }) => {
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [filterRisque, setFilterRisque] = useState("Tous");

  const filtered = MISSIONS.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.ref.includes(search);
    const matchStatut = filterStatut==="Tous" || m.statut===filterStatut;
    const matchRisque = filterRisque==="Tous" || m.risque===filterRisque;
    return matchSearch && matchStatut && matchRisque;
  });

  return (
    <div style={{flex:1,overflow:"auto",background:T.bg}}>
      <TopBar title="Missions d'Audit" subtitle={`${MISSIONS.length} missions au total`}
        actions={<Btn onClick={()=>setScreen("new")}>+ Nouvelle mission</Btn>}
      />
      <div style={{padding:"20px 28px"}}>
        {/* Filters bar */}
        <div style={{background:T.surface,borderRadius:12,padding:"14px 18px",marginBottom:18,boxShadow:T.shadow,border:`1px solid ${T.border}`,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          {/* Search */}
          <div style={{flex:1,minWidth:200,position:"relative"}}>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.textSoft,fontSize:14}}>⌕</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher par titre ou référence..."
              style={{width:"100%",padding:"8px 12px 8px 32px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,color:T.text,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.border}
            />
          </div>
          <select value={filterStatut} onChange={e=>setFilterStatut(e.target.value)}
            style={{padding:"8px 32px 8px 12px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,color:T.text,background:T.surface,fontFamily:"'DM Sans',sans-serif",outline:"none",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%238B95B0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"calc(100% - 10px) center"}}>
            {["Tous","En cours","Planifiée","Clôturée","Suspendue"].map(s=><option key={s}>{s}</option>)}
          </select>
          <select value={filterRisque} onChange={e=>setFilterRisque(e.target.value)}
            style={{padding:"8px 32px 8px 12px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,color:T.text,background:T.surface,fontFamily:"'DM Sans',sans-serif",outline:"none",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%238B95B0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"calc(100% - 10px) center"}}>
            {["Tous","Critique","Élevé","Moyen","Faible"].map(s=><option key={s}>{s}</option>)}
          </select>
          <span style={{fontSize:12,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>{filtered.length} résultat(s)</span>
        </div>

        {/* Table */}
        <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:T.surfaceAlt,borderBottom:`2px solid ${T.border}`}}>
                {["Référence","Mission / Entité","Type","Statut","Risque","Approbation","Échéance","Avancement",""].map(h=>(
                  <th key={h} style={{padding:"11px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.06em",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m,i)=>(
                <tr key={m.id} style={{borderBottom:`1px solid ${T.border}`,background:i%2===0?T.surface:T.surfaceAlt,cursor:"pointer",transition:"background 0.1s"}}
                  onClick={()=>setScreen("detail")}
                  onMouseEnter={e=>e.currentTarget.style.background=T.blueLight}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===0?T.surface:T.surfaceAlt}>
                  <td style={{padding:"12px 14px",fontFamily:"'DM Mono',monospace",fontSize:11.5,color:T.blue,fontWeight:600}}>{m.ref}</td>
                  <td style={{padding:"12px 14px"}}>
                    <div style={{fontWeight:600,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{m.title}</div>
                    <div style={{fontSize:11.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{m.entite} · {m.chef}</div>
                  </td>
                  <td style={{padding:"12px 14px",fontSize:12.5,color:T.textMid,fontFamily:"'DM Sans',sans-serif"}}>{m.type}</td>
                  <td style={{padding:"12px 14px"}}><Badge label={m.statut} cfg={STATUS[m.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                  <td style={{padding:"12px 14px"}}><Badge label={m.risque} cfg={RISK[m.risque]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                  <td style={{padding:"12px 14px"}}><Badge label={m.appro} cfg={APPRO[m.appro]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                  <td style={{padding:"12px 14px",fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMid}}>{m.echeance}</td>
                  <td style={{padding:"12px 14px",minWidth:120}}><ProgressBar value={m.avancement}/></td>
                  <td style={{padding:"12px 14px",textAlign:"center"}}>
                    <span style={{fontSize:16,color:T.textSoft,cursor:"pointer"}}>›</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0&&(
            <div style={{padding:"48px",textAlign:"center",color:T.textSoft,fontFamily:"'DM Sans',sans-serif",fontSize:13.5}}>
              Aucune mission ne correspond aux filtres sélectionnés.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN: NOUVELLE MISSION ────────────────────────────────────────────────
const NewMissionScreen = ({ setScreen }) => {
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);

  return (
    <div style={{flex:1,overflow:"auto",background:T.bg}}>
      <TopBar title="Nouvelle Mission d'Audit" subtitle="Renseignez les informations de la mission"
        actions={<><Btn variant="ghost" onClick={()=>setScreen("missions")} small>Annuler</Btn><Btn onClick={()=>setScreen("missions")}>✓ Enregistrer</Btn></>}
      />
      <div style={{padding:"24px 28px",maxWidth:900,margin:"0 auto"}}>

        {/* Section 1 — Informations générales */}
        <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,marginBottom:18,overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,background:T.surfaceAlt,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:6,background:T.blueLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:12,color:T.blue,fontWeight:700}}>1</span>
            </div>
            <span style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Informations générales</span>
          </div>
          <div style={{padding:"20px"}}>
            <div style={{marginBottom:16}}>
              <Label required>Titre de la mission</Label>
              <Input placeholder="Ex : Audit Risques Opérationnels — Hyundai Morocco"/>
            </div>
            <div style={{marginBottom:16}}>
              <Label>Description</Label>
              <Textarea placeholder="Décrivez l'objectif et le périmètre de la mission d'audit..." rows={3}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <Label required>Type de mission</Label>
                <Select options={["Sélectionner...","Interne","Externe","Réglementaire","Thématique"]}/>
              </div>
              <div>
                <Label required>Statut</Label>
                <Select options={["Planifiée","En cours","Suspendue","Clôturée"]} defaultVal="Planifiée"/>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 — Planification */}
        <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,marginBottom:18,overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,background:T.surfaceAlt,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:6,background:T.blueLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:12,color:T.blue,fontWeight:700}}>2</span>
            </div>
            <span style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Planification & Périmètre</span>
          </div>
          <div style={{padding:"20px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div>
                <Label required>Date de lancement</Label>
                <Input type="date" value="2025-03-01"/>
              </div>
              <div>
                <Label required>Date d'échéance</Label>
                <Input type="date" value="2025-04-30"/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <Label required>Entité auditée</Label>
                <Select options={["Sélectionner...","Hyundai Morocco","Global Lease","Global Occaz","Genesis Electric","Changan Morocco"]}/>
              </div>
              <div>
                <Label required>Domaine d'audit</Label>
                <Select options={["Sélectionner...","Crédit","Conformité","SI","RH","Finance","Opérations","Réglementaire"]}/>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 — Équipe */}
        <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,marginBottom:18,overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,background:T.surfaceAlt,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:6,background:T.blueLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:12,color:T.blue,fontWeight:700}}>3</span>
            </div>
            <span style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Équipe de la mission</span>
          </div>
          <div style={{padding:"20px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div>
                <Label required>Chef de mission</Label>
                <Input placeholder="Rechercher une personne..." value="Khalid Mansouri"/>
              </div>
              <div>
                <Label>Responsable entité</Label>
                <Input placeholder="Rechercher une personne..."/>
              </div>
            </div>
            <div>
              <Label>Équipe d'audit</Label>
              <div style={{border:`1.5px solid ${T.border}`,borderRadius:8,padding:"8px 10px",minHeight:44,display:"flex",flexWrap:"wrap",gap:6,alignItems:"center",background:T.surface}}>
                {["K. Mansouri","N. Chraibi","R. Amrani"].map(p=>(
                  <span key={p} style={{display:"inline-flex",alignItems:"center",gap:5,background:T.blueLight,color:T.blue,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>
                    {p} <span style={{cursor:"pointer",opacity:0.6}}>×</span>
                  </span>
                ))}
                <input placeholder="+ Ajouter..." style={{border:"none",outline:"none",fontSize:12.5,color:T.text,fontFamily:"'DM Sans',sans-serif",minWidth:80,flex:1}}/>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 — Risque & Approbation */}
        <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,marginBottom:18,overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,background:T.surfaceAlt,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:6,background:T.blueLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:12,color:T.blue,fontWeight:700}}>4</span>
            </div>
            <span style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Risque & Approbation</span>
          </div>
          <div style={{padding:"20px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <Label required>Niveau de risque</Label>
                <Select options={["Sélectionner...","Faible","Moyen","Élevé","Critique"]}/>
              </div>
              <div>
                <Label>Statut approbation</Label>
                <Select options={["Non soumis","En attente","Approuvé","Rejeté"]} defaultVal="Non soumis"/>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 — Pièces jointes */}
        <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,marginBottom:24,overflow:"hidden"}}>
          <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,background:T.surfaceAlt,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:6,background:T.blueLight,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:12,color:T.blue,fontWeight:700}}>5</span>
            </div>
            <span style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Pièces jointes</span>
            <span style={{fontSize:11.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",marginLeft:4}}>Stockage automatique dans le site SharePoint de votre département</span>
          </div>
          <div style={{padding:"20px"}}>
            {/* Drop zone */}
            <div
              onDragOver={e=>{e.preventDefault();setDrag(true)}}
              onDragLeave={()=>setDrag(false)}
              onDrop={e=>{e.preventDefault();setDrag(false);const f=Array.from(e.dataTransfer.files);setFiles(prev=>[...prev,...f.map(x=>x.name)]);}}
              style={{
                border:`2px dashed ${drag?T.blue:T.border}`,borderRadius:10,padding:"32px",
                textAlign:"center",cursor:"pointer",background:drag?T.blueLight:T.surfaceAlt,
                transition:"all 0.2s",marginBottom:14,
              }}
              onClick={()=>setFiles(prev=>[...prev,"Rapport_Audit_2025.pdf","Lettre_Mission.docx"])}
            >
              <div style={{fontSize:28,marginBottom:8,opacity:0.5}}>⬆</div>
              <div style={{fontSize:13.5,fontWeight:600,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Glissez-déposez vos fichiers ici</div>
              <div style={{fontSize:12,color:T.textSoft,marginTop:4,fontFamily:"'DM Sans',sans-serif"}}>ou cliquez pour parcourir · PDF, Word, Excel, images · Max 10 Mo par fichier</div>
            </div>
            {/* File list */}
            {files.length>0&&(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {files.map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:T.surfaceAlt,borderRadius:8,border:`1px solid ${T.border}`}}>
                    <span style={{fontSize:16,color:T.blue}}>📄</span>
                    <span style={{flex:1,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{f}</span>
                    <span style={{fontSize:11,color:T.textSoft,fontFamily:"'DM Mono',monospace"}}>125 Ko</span>
                    <span onClick={()=>setFiles(prev=>prev.filter((_,j)=>j!==i))} style={{fontSize:16,color:T.textSoft,cursor:"pointer",marginLeft:4}}>×</span>
                  </div>
                ))}
              </div>
            )}
            {files.length===0&&(
              <div style={{fontSize:12,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",textAlign:"center"}}>Aucune pièce jointe pour l'instant</div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,paddingBottom:32}}>
          <Btn variant="ghost" onClick={()=>setScreen("missions")}>Annuler</Btn>
          <Btn variant="secondary">Enregistrer en brouillon</Btn>
          <Btn onClick={()=>setScreen("missions")}>✓ Enregistrer la mission</Btn>
        </div>
      </div>
    </div>
  );
};

// ─── SCREEN: DÉTAIL MISSION ──────────────────────────────────────────────────
const DetailScreen = ({ setScreen }) => {
  const m = MISSIONS[0];
  const [activeTab, setActiveTab] = useState("apercu");

  return (
    <div style={{flex:1,overflow:"auto",background:T.bg}}>
      <TopBar
        title={<span>{m.title} <span style={{fontSize:13,fontWeight:500,color:T.textSoft,fontFamily:"'DM Mono',monospace",marginLeft:8}}>{m.ref}</span></span>}
        subtitle={`${m.entite} · Chef : ${m.chef}`}
        actions={<>
          <Badge label={m.statut} cfg={STATUS[m.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}}/>
          <Btn variant="secondary" small onClick={()=>setScreen("new")}>✎ Modifier</Btn>
          <Btn small>↑ Soumettre approbation</Btn>
        </>}
      />
      <div style={{padding:"20px 28px"}}>

        {/* Header stats strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
          {[
            {label:"Avancement",value:`${m.avancement}%`,color:T.blue},
            {label:"Risque",value:m.risque,color:RISK[m.risque]?.color||T.textMid},
            {label:"Approbation",value:m.appro,color:APPRO[m.appro]?.color||T.textMid},
            {label:"Lancement",value:m.lancement,color:T.textMid},
            {label:"Échéance",value:m.echeance,color:T.red},
            {label:"Domaine",value:m.domaine,color:T.teal},
          ].map((s,i)=>(
            <div key={i} style={{background:T.surface,borderRadius:10,padding:"12px 14px",boxShadow:T.shadow,border:`1px solid ${T.border}`,textAlign:"center"}}>
              <div style={{fontSize:11,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.05em",fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>{s.label}</div>
              <div style={{fontSize:14,fontWeight:700,color:s.color,fontFamily:"'DM Mono',monospace"}}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{background:T.surface,borderRadius:10,padding:"14px 18px",marginBottom:18,boxShadow:T.shadow,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:16}}>
          <span style={{fontSize:12.5,fontWeight:600,color:T.textMid,fontFamily:"'DM Sans',sans-serif",minWidth:80}}>Avancement</span>
          <div style={{flex:1,height:8,borderRadius:4,background:T.border,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:4,width:`${m.avancement}%`,background:`linear-gradient(90deg,${T.blue},${T.teal})`,transition:"width 0.6s ease"}}/>
          </div>
          <span style={{fontSize:14,fontWeight:700,color:T.blue,fontFamily:"'DM Mono',monospace",minWidth:40}}>{m.avancement}%</span>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:2,marginBottom:18,borderBottom:`2px solid ${T.border}`}}>
          {[["apercu","Aperçu"],["constats","Constats (3)"],["documents","Documents (2)"],["approbation","Approbation"],["historique","Historique"]].map(([id,label])=>(
            <div key={id} onClick={()=>setActiveTab(id)} style={{
              padding:"10px 18px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
              fontSize:13.5,fontWeight:activeTab===id?700:500,
              color:activeTab===id?T.blue:T.textMid,
              borderBottom:activeTab===id?`2px solid ${T.blue}`:"2px solid transparent",
              marginBottom:-2,transition:"all 0.15s",
            }}>{label}</div>
          ))}
        </div>

        {activeTab==="apercu"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:18}}>
            {/* Info card */}
            <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"20px 22px"}}>
              <div style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>Informations de la mission</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 24px"}}>
                {[
                  ["Référence",m.ref],["Type",m.type],["Entité auditée",m.entite],["Domaine",m.domaine],
                  ["Date lancement",m.lancement],["Date échéance",m.echeance],["Chef de mission",m.chef],["Équipe audit","K. Mansouri, N. Chraibi"],
                  ["Responsable entité","A. Filali"],["Niveau risque",m.risque],
                ].map(([k,v])=>(
                  <div key={k}>
                    <div style={{fontSize:11,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.05em",fontFamily:"'DM Sans',sans-serif",marginBottom:2}}>{k}</div>
                    <div style={{fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${T.border}`}}>
                <div style={{fontSize:11,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.05em",fontFamily:"'DM Sans',sans-serif",marginBottom:6}}>Description</div>
                <div style={{fontSize:13,color:T.textMid,fontFamily:"'DM Sans',sans-serif",lineHeight:1.6}}>Audit des risques opérationnels liés aux processus de vente, gestion des stocks et service après-vente. Périmètre : ensemble des showrooms Hyundai Morocco.</div>
              </div>
            </div>

            {/* Workflow approbation */}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"18px"}}>
                <div style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>Workflow d'approbation</div>
                {[
                  {level:"N1",label:"Chef de mission",person:"K. Mansouri",statut:"Approuvé",color:T.green},
                  {level:"N2",label:"Directeur Audit",person:"M. Berrada",statut:"En attente",color:T.orange},
                  {level:"N3",label:"Directeur Général",person:"—",statut:"Bloqué",color:T.textSoft},
                ].map((step,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<2?`1px solid ${T.border}`:"none"}}>
                    <div style={{width:28,height:28,borderRadius:"50%",border:`2px solid ${step.color}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:10,fontWeight:700,color:step.color,fontFamily:"'DM Mono',monospace"}}>{step.level}</span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{step.label}</div>
                      <div style={{fontSize:11,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>{step.person}</div>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:step.color,fontFamily:"'DM Sans',sans-serif"}}>{step.statut}</span>
                  </div>
                ))}
              </div>

              {/* Pièces jointes */}
              <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"18px"}}>
                <div style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>Pièces jointes (2)</div>
                {["Lettre_Mission_001.pdf","Programme_Travail.docx"].map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:i<1?`1px solid ${T.border}`:"none"}}>
                    <span style={{fontSize:14,color:T.blue}}>📄</span>
                    <span style={{flex:1,fontSize:12.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{f}</span>
                    <span style={{fontSize:11,color:T.blue,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>↓</span>
                  </div>
                ))}
                <div style={{marginTop:12}}>
                  <Btn variant="ghost" small>+ Ajouter une PJ</Btn>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab==="constats"&&(
          <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Constats d'audit (3)</span>
              <Btn small>+ Nouveau constat</Btn>
            </div>
            {[
              {ref:"CON-001",desc:"Absence de ségrégation des tâches dans le processus d'approbation des commandes",crit:"Critique",statut:"Ouvert",resp:"A. Filali"},
              {ref:"CON-002",desc:"Documentation insuffisante des procédures de contrôle interne",crit:"Élevé",statut:"En cours",resp:"K. Tazi"},
              {ref:"CON-003",desc:"Retards récurrents dans la clôture mensuelle des comptes",crit:"Moyen",statut:"Levé",resp:"M. Alami"},
            ].map((c,i)=>(
              <div key={i} style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:14,alignItems:"flex-start"}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:11.5,color:T.textSoft,minWidth:70,marginTop:2}}>{c.ref}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>{c.desc}</div>
                  <div style={{fontSize:11.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>Responsable : {c.resp}</div>
                </div>
                <div style={{display:"flex",gap:8,flexShrink:0,alignItems:"center"}}>
                  <Badge label={c.crit} cfg={RISK[c.crit]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
                  <Badge label={c.statut} cfg={{
                    "Ouvert":{bg:"#FEF2F2",color:"#DC2626",border:"#FECACA"},
                    "En cours":{bg:"#EBF0FF",color:"#1B4FD8",border:"#BFCFFF"},
                    "Levé":{bg:"#ECFDF5",color:"#059669",border:"#A7F3D0"},
                  }[c.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("dashboard");

  const screens = {
    dashboard: <DashboardScreen setScreen={setScreen}/>,
    missions:  <MissionsScreen setScreen={setScreen}/>,
    new:       <NewMissionScreen setScreen={setScreen}/>,
    detail:    <DetailScreen setScreen={setScreen}/>,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:${T.bg};}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:${T.bg};}
        ::-webkit-scrollbar-thumb{background:#C5CBE0;border-radius:3px;}
        input::placeholder,textarea::placeholder{color:${T.textSoft};}
        select option{font-family:'DM Sans',sans-serif;}
      `}</style>
      <div style={{display:"flex",height:"100vh",overflow:"hidden",fontFamily:"'DM Sans',sans-serif"}}>
        <Sidebar active={screen} setScreen={setScreen}/>
        <div style={{flex:1,overflow:"auto",display:"flex",flexDirection:"column"}}>
          {screens[screen]}
        </div>
      </div>
    </>
  );
}
