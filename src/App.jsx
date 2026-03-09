import { useState, useEffect } from "react";

// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────
const useBreakpoint = () => {
  const [bp, setBp] = useState(() => {
    const w = window.innerWidth;
    return w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  });
  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg:"#F0F2F7", surface:"#FFFFFF", surfaceAlt:"#F7F8FC", border:"#E2E6F0",
  navy:"#0B1E4A", navyMid:"#1A3570", blue:"#1B4FD8", blueLight:"#EBF0FF",
  teal:"#0D9488", text:"#0B1E4A", textMid:"#4A5578", textSoft:"#8B95B0",
  green:"#059669", greenBg:"#ECFDF5", orange:"#D97706", orangeBg:"#FFFBEB",
  red:"#DC2626", redBg:"#FEF2F2", purple:"#7C3AED",
  shadow:"0 1px 3px rgba(11,30,74,0.08),0 1px 2px rgba(11,30,74,0.04)",
  shadowMd:"0 4px 12px rgba(11,30,74,0.10),0 2px 6px rgba(11,30,74,0.06)",
};

const RISK = {
  "Critique":{bg:"#FEF2F2",color:"#DC2626",border:"#FECACA"},
  "Élevé":   {bg:"#FFFBEB",color:"#D97706",border:"#FDE68A"},
  "Moyen":   {bg:"#FFFBEB",color:"#92400E",border:"#FDE68A"},
  "Faible":  {bg:"#ECFDF5",color:"#059669",border:"#A7F3D0"},
};
const STATUS = {
  "En cours": {bg:"#EBF0FF",color:"#1B4FD8",border:"#BFCFFF"},
  "Planifiée":{bg:"#F5F3FF",color:"#7C3AED",border:"#DDD6FE"},
  "Clôturée": {bg:"#ECFDF5",color:"#059669",border:"#A7F3D0"},
  "Suspendue":{bg:"#FFFBEB",color:"#D97706",border:"#FDE68A"},
};
const APPRO = {
  "Non soumis":{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"},
  "En attente":{bg:"#FFFBEB",color:"#D97706",border:"#FDE68A"},
  "Approuvé": {bg:"#ECFDF5",color:"#059669",border:"#A7F3D0"},
  "Rejeté":   {bg:"#FEF2F2",color:"#DC2626",border:"#FECACA"},
};

const MISSIONS = [
  {id:1,ref:"MIS-2025-001",title:"Audit Risques Opérationnels",type:"Interne",statut:"En cours",entite:"Hyundai Morocco",domaine:"Opérations",chef:"Khalid Mansouri",risque:"Élevé",appro:"En attente",lancement:"01/01/2025",echeance:"20/03/2025",avancement:68},
  {id:2,ref:"MIS-2025-002",title:"Conformité KYC — Global Lease",type:"Réglementaire",statut:"Planifiée",entite:"Global Lease",domaine:"Conformité",chef:"Nadia Chraibi",risque:"Critique",appro:"Non soumis",lancement:"15/01/2025",echeance:"30/04/2025",avancement:0},
  {id:3,ref:"MIS-2025-003",title:"Audit SI — Genesis Electric",type:"Thématique",statut:"Clôturée",entite:"Genesis Electric",domaine:"SI",chef:"Rachid Amrani",risque:"Moyen",appro:"Approuvé",lancement:"10/11/2024",echeance:"10/02/2025",avancement:100},
  {id:4,ref:"MIS-2025-004",title:"Audit Crédit — Global Occaz",type:"Interne",statut:"Suspendue",entite:"Global Occaz",domaine:"Crédit",chef:"Khalid Mansouri",risque:"Élevé",appro:"Rejeté",lancement:"05/02/2025",echeance:"30/03/2025",avancement:35},
  {id:5,ref:"MIS-2025-005",title:"Contrôle Interne RH — Changan",type:"Interne",statut:"En cours",entite:"Changan Morocco",domaine:"RH",chef:"Nadia Chraibi",risque:"Faible",appro:"Approuvé",lancement:"01/03/2025",echeance:"15/04/2025",avancement:42},
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Badge = ({label,cfg,small})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:small?3:5,padding:small?"2px 7px":"3px 10px",borderRadius:20,fontSize:small?10:12,fontWeight:600,background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.border}`,whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>
    <span style={{width:small?4:5,height:small?4:5,borderRadius:"50%",background:cfg.color,flexShrink:0}}/>
    {label}
  </span>
);

const ProgressBar = ({value})=>(
  <div style={{display:"flex",alignItems:"center",gap:6}}>
    <div style={{flex:1,height:5,borderRadius:3,background:"#E2E6F0",overflow:"hidden"}}>
      <div style={{height:"100%",borderRadius:3,width:`${value}%`,background:value===100?"#059669":value>70?"#1B4FD8":value>40?"#D97706":"#DC2626",transition:"width 0.6s"}}/>
    </div>
    <span style={{fontSize:10,fontWeight:600,color:T.textMid,minWidth:24,fontFamily:"'DM Mono',monospace"}}>{value}%</span>
  </div>
);

const Btn=({children,variant="primary",onClick,small,full})=>{
  const s={primary:{bg:T.blue,color:"#fff",border:`1.5px solid ${T.blue}`},secondary:{bg:"#fff",color:T.blue,border:`1.5px solid ${T.blue}`},ghost:{bg:"transparent",color:T.textMid,border:`1.5px solid ${T.border}`}};
  const st=s[variant];
  return <button onClick={onClick} style={{padding:small?"6px 12px":"9px 18px",borderRadius:8,border:st.border,background:st.bg,color:st.color,fontSize:small?12:13.5,fontWeight:600,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",width:full?"100%":"auto",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,transition:"opacity 0.15s"}}>{children}</button>;
};

const Label=({children,required})=>(
  <div style={{fontSize:11,fontWeight:700,color:T.textMid,marginBottom:5,letterSpacing:"0.04em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>
    {children}{required&&<span style={{color:T.red,marginLeft:2}}>*</span>}
  </div>
);

const Input=({placeholder,value,type="text"})=>(
  <input defaultValue={value} type={type} placeholder={placeholder} style={{width:"100%",padding:"9px 11px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,color:T.text,background:T.surface,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box"}}
    onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.border}/>
);

const Select=({options,defaultVal})=>(
  <select defaultValue={defaultVal} style={{width:"100%",padding:"9px 32px 9px 11px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,color:T.text,background:T.surface,fontFamily:"'DM Sans',sans-serif",outline:"none",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%238B95B0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"calc(100% - 10px) center",boxSizing:"border-box"}}>
    {options.map(o=><option key={o}>{o}</option>)}
  </select>
);

const Textarea=({placeholder,rows=3})=>(
  <textarea placeholder={placeholder} rows={rows} style={{width:"100%",padding:"9px 11px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,color:T.text,background:T.surface,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical",boxSizing:"border-box",lineHeight:1.5}}
    onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.border}/>
);

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────
const BottomNav=({active,setScreen})=>{
  const items=[
    {id:"dashboard",icon:"⊞",label:"Dashboard"},
    {id:"missions",icon:"≡",label:"Missions"},
    {id:"new",icon:"+",label:"Nouveau"},
    {id:"detail",icon:"◎",label:"Détail"},
  ];
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,height:60,background:T.navy,display:"flex",zIndex:100,boxShadow:"0 -2px 12px rgba(0,0,0,0.2)"}}>
      {items.map(item=>{
        const isActive=active===item.id;
        return (
          <div key={item.id} onClick={()=>setScreen(item.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,cursor:"pointer",background:isActive?"rgba(27,79,216,0.25)":"transparent",borderTop:isActive?`2px solid ${T.blue}`:"2px solid transparent"}}>
            <span style={{fontSize:18,color:isActive?"#7BA7FF":"rgba(255,255,255,0.45)"}}>{item.icon}</span>
            <span style={{fontSize:9,fontWeight:600,color:isActive?"#fff":"rgba(255,255,255,0.45)",fontFamily:"'DM Sans',sans-serif"}}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar=({active,setScreen,collapsed,setCollapsed,bp})=>{
  const w=collapsed?64:220;
  const navItems=[
    {id:"dashboard",icon:"⊞",label:"Tableau de bord"},
    {id:"missions",icon:"≡",label:"Missions",badge:5},
    {id:"new",icon:"+",label:"Nouvelle mission"},
    {id:"detail",icon:"◎",label:"Détail mission"},
  ];
  return (
    <div style={{width:w,minWidth:w,height:"100vh",background:T.navy,display:"flex",flexDirection:"column",position:"sticky",top:0,transition:"width 0.25s",overflow:"hidden",zIndex:10}}>
      <div style={{padding:"20px 14px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10,justifyContent:collapsed?"center":"flex-start"}}>
        <div style={{width:34,height:34,borderRadius:8,background:T.blue,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{color:"#fff",fontWeight:900,fontSize:16,fontFamily:"'DM Sans',sans-serif"}}>A</span>
        </div>
        {!collapsed&&(
          <div>
            <div style={{color:"#fff",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif",lineHeight:1.2}}>AuditTrack</div>
            <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.08em",textTransform:"uppercase"}}>BAG Group</div>
          </div>
        )}
        {bp==="desktop"&&(
          <div onClick={()=>setCollapsed(!collapsed)} style={{marginLeft:"auto",cursor:"pointer",color:"rgba(255,255,255,0.4)",fontSize:16,flexShrink:0}}>
            {collapsed?"›":"‹"}
          </div>
        )}
      </div>
      <nav style={{flex:1,padding:"10px 8px"}}>
        {!collapsed&&<div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase",padding:"6px 8px",fontFamily:"'DM Sans',sans-serif"}}>Navigation</div>}
        {navItems.map(item=>{
          const isActive=active===item.id;
          return (
            <div key={item.id} onClick={()=>setScreen(item.id)} style={{display:"flex",alignItems:"center",gap:collapsed?0:10,padding:collapsed?"10px 0":"8px 10px",borderRadius:8,marginBottom:2,cursor:"pointer",justifyContent:collapsed?"center":"flex-start",background:isActive?"rgba(27,79,216,0.25)":"transparent",border:isActive?"1px solid rgba(27,79,216,0.5)":"1px solid transparent"}}>
              <span style={{fontSize:16,color:isActive?"#7BA7FF":"rgba(255,255,255,0.45)",width:20,textAlign:"center",flexShrink:0}}>{item.icon}</span>
              {!collapsed&&<span style={{fontSize:13,fontWeight:isActive?600:400,color:isActive?"#fff":"rgba(255,255,255,0.55)",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>{item.label}</span>}
              {!collapsed&&item.badge&&<span style={{marginLeft:"auto",background:"rgba(27,79,216,0.4)",color:"#7BA7FF",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:10,fontFamily:"'DM Mono',monospace"}}>{item.badge}</span>}
            </div>
          );
        })}
      </nav>
      <div style={{padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10,justifyContent:collapsed?"center":"flex-start"}}>
        <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#1B4FD8,#0D9488)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{color:"#fff",fontWeight:700,fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>MB</span>
        </div>
        {!collapsed&&(
          <div style={{minWidth:0}}>
            <div style={{color:"#fff",fontWeight:600,fontSize:12,fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>M. Berrada</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>Directeur Audit</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
const TopBar=({title,subtitle,actions,bp,onMenuClick})=>(
  <div style={{padding:bp==="mobile"?"12px 16px":"14px 24px",background:T.surface,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:5,boxShadow:T.shadow,gap:12}}>
    <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>
      {bp==="mobile"&&(
        <div onClick={onMenuClick} style={{fontSize:20,color:T.navy,cursor:"pointer",flexShrink:0}}>☰</div>
      )}
      <div style={{minWidth:0}}>
        <div style={{fontSize:bp==="mobile"?15:18,fontWeight:700,color:T.navy,fontFamily:"'DM Sans',sans-serif",whiteSpace:bp==="mobile"?"nowrap":"normal",overflow:"hidden",textOverflow:"ellipsis"}}>{title}</div>
        {subtitle&&bp!=="mobile"&&<div style={{fontSize:11.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{subtitle}</div>}
      </div>
    </div>
    {actions&&<div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>{actions}</div>}
  </div>
);

// ─── MOBILE DRAWER ────────────────────────────────────────────────────────────
const MobileDrawer=({open,onClose,active,setScreen})=>{
  const items=[
    {id:"dashboard",icon:"⊞",label:"Tableau de bord"},
    {id:"missions",icon:"≡",label:"Missions",badge:5},
    {id:"new",icon:"+",label:"Nouvelle mission"},
    {id:"detail",icon:"◎",label:"Détail mission"},
  ];
  return (
    <>
      {open&&<div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:40}}/>}
      <div style={{position:"fixed",left:0,top:0,bottom:0,width:260,background:T.navy,zIndex:50,transform:open?"translateX(0)":"translateX(-100%)",transition:"transform 0.25s",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"20px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:8,background:T.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:"#fff",fontWeight:900,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>A</span>
            </div>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>AuditTrack</div>
              <div style={{color:"rgba(255,255,255,0.35)",fontSize:9,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:"0.08em"}}>BAG Group</div>
            </div>
          </div>
          <span onClick={onClose} style={{color:"rgba(255,255,255,0.5)",fontSize:20,cursor:"pointer"}}>×</span>
        </div>
        <nav style={{flex:1,padding:"10px 10px"}}>
          {items.map(item=>{
            const isActive=active===item.id;
            return (
              <div key={item.id} onClick={()=>{setScreen(item.id);onClose();}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,marginBottom:3,cursor:"pointer",background:isActive?"rgba(27,79,216,0.25)":"transparent",border:isActive?"1px solid rgba(27,79,216,0.5)":"1px solid transparent"}}>
                <span style={{fontSize:16,color:isActive?"#7BA7FF":"rgba(255,255,255,0.45)",width:20,textAlign:"center"}}>{item.icon}</span>
                <span style={{fontSize:13.5,fontWeight:isActive?600:400,color:isActive?"#fff":"rgba(255,255,255,0.55)",fontFamily:"'DM Sans',sans-serif"}}>{item.label}</span>
                {item.badge&&<span style={{marginLeft:"auto",background:"rgba(27,79,216,0.4)",color:"#7BA7FF",fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:10}}>{item.badge}</span>}
              </div>
            );
          })}
        </nav>
        <div style={{padding:"14px 16px",borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#1B4FD8,#0D9488)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"#fff",fontWeight:700,fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>MB</span>
          </div>
          <div>
            <div style={{color:"#fff",fontWeight:600,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>M. Berrada</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>Directeur Audit</div>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
const KpiCard=({label,value,sub,color,icon})=>(
  <div style={{background:T.surface,borderRadius:12,padding:"16px 14px",boxShadow:T.shadow,border:`1px solid ${T.border}`,borderTop:`3px solid ${color}`,position:"relative",overflow:"hidden",flex:1,minWidth:0}}>
    <div style={{position:"absolute",top:12,right:12,fontSize:18,color,opacity:0.15,fontWeight:900}}>{icon}</div>
    <div style={{fontSize:28,fontWeight:800,color,fontFamily:"'DM Mono',monospace",lineHeight:1}}>{value}</div>
    <div style={{fontSize:10,fontWeight:700,color:T.textMid,textTransform:"uppercase",letterSpacing:"0.05em",marginTop:5,fontFamily:"'DM Sans',sans-serif"}}>{label}</div>
    <div style={{fontSize:10,color:T.textSoft,marginTop:2,fontFamily:"'DM Sans',sans-serif"}}>{sub}</div>
  </div>
);

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const DashboardScreen=({setScreen,bp})=>(
  <div style={{flex:1,overflow:"auto",background:T.bg,paddingBottom:bp==="mobile"?72:0}}>
    <TopBar title="Tableau de Bord" subtitle="Vendredi 6 mars 2025 · BAG Group" bp={bp}
      actions={bp!=="mobile"&&<Btn variant="secondary" onClick={()=>setScreen("new")} small>+ Nouvelle mission</Btn>}
    />
    <div style={{padding:bp==="mobile"?"14px":"20px 24px"}}>
      {/* KPIs */}
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:bp==="mobile"?"wrap":"nowrap"}}>
        {bp==="mobile"?(
          <>
            <div style={{display:"flex",gap:10,width:"100%"}}>
              <KpiCard label="Total" value={5} sub="Missions" color={T.blue} icon="≡"/>
              <KpiCard label="En cours" value={2} sub="Actives" color="#0D9488" icon="▷"/>
              <KpiCard label="Retard" value={2} sub="Dépassement" color={T.red} icon="⚠"/>
            </div>
            <div style={{display:"flex",gap:10,width:"100%"}}>
              <KpiCard label="Approbation" value={1} sub="En attente" color={T.orange} icon="◈"/>
              <KpiCard label="Clôturées" value={1} sub="Exercice 2025" color={T.green} icon="✓"/>
            </div>
          </>
        ):(
          [{label:"Total Missions",value:5,sub:"Actives + planifiées",color:T.blue,icon:"≡"},{label:"En Cours",value:2,sub:"57% avancement moy.",color:"#0D9488",icon:"▷"},{label:"En Retard",value:2,sub:"Dépassement échéance",color:T.red,icon:"⚠"},{label:"En Attente Appro.",value:1,sub:"Approbation requise",color:T.orange,icon:"◈"},{label:"Clôturées",value:1,sub:"Exercice 2025",color:T.green,icon:"✓"}].map((k,i)=><KpiCard key={i} {...k}/>)
        )}
      </div>

      <div style={{display:"grid",gridTemplateColumns:bp==="desktop"?"1fr 300px":"1fr",gap:16}}>
        {/* Table */}
        <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:14,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Missions récentes</span>
            <span onClick={()=>setScreen("missions")} style={{fontSize:12,color:T.blue,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>Voir tout →</span>
          </div>
          {bp==="mobile"?(
            <div>
              {MISSIONS.map((m,i)=>(
                <div key={m.id} onClick={()=>setScreen("detail")} style={{padding:"12px 16px",borderBottom:i<MISSIONS.length-1?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                    <div><div style={{fontWeight:600,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{m.title}</div><div style={{fontSize:11,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{m.ref} · {m.entite}</div></div>
                    <Badge label={m.statut} cfg={STATUS[m.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                    <Badge label={m.risque} cfg={RISK[m.risque]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
                    <div style={{flex:1}}><ProgressBar value={m.avancement}/></div>
                    <span style={{fontSize:10,color:T.textSoft,fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap"}}>{m.echeance}</span>
                  </div>
                </div>
              ))}
            </div>
          ):(
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:bp==="tablet"?500:600}}>
                <thead>
                  <tr style={{background:T.surfaceAlt}}>
                    {(bp==="tablet"?["Mission","Statut","Risque","Avancement"]:["Référence","Mission / Entité","Statut","Risque","Échéance","Avancement"]).map(h=>(
                      <th key={h} style={{padding:"9px 12px",textAlign:"left",fontSize:10,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.05em",fontFamily:"'DM Sans',sans-serif",borderBottom:`1px solid ${T.border}`,whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MISSIONS.map((m,i)=>(
                    <tr key={m.id} style={{borderBottom:`1px solid ${T.border}`,background:i%2===0?T.surface:T.surfaceAlt,cursor:"pointer"}} onClick={()=>setScreen("detail")}
                      onMouseEnter={e=>e.currentTarget.style.background=T.blueLight} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?T.surface:T.surfaceAlt}>
                      {bp==="desktop"&&<td style={{padding:"10px 12px",fontFamily:"'DM Mono',monospace",fontSize:10.5,color:T.blue,fontWeight:600,whiteSpace:"nowrap"}}>{m.ref}</td>}
                      <td style={{padding:"10px 12px"}}><div style={{fontWeight:600,fontSize:12.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{m.title}</div><div style={{fontSize:10.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>{m.entite}</div></td>
                      <td style={{padding:"10px 12px",whiteSpace:"nowrap"}}><Badge label={m.statut} cfg={STATUS[m.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                      <td style={{padding:"10px 12px",whiteSpace:"nowrap"}}><Badge label={m.risque} cfg={RISK[m.risque]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                      {bp==="desktop"&&<td style={{padding:"10px 12px",fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textMid,whiteSpace:"nowrap"}}>{m.echeance}</td>}
                      <td style={{padding:"10px 12px",minWidth:100}}><ProgressBar value={m.avancement}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right panel — desktop only */}
        {bp==="desktop"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"14px 16px"}}>
              <div style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>Distribution des risques</div>
              {[["Critique",1,"#DC2626"],["Élevé",2,"#D97706"],["Moyen",1,"#92400E"],["Faible",1,"#059669"]].map(([label,count,color])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:color,flexShrink:0}}/>
                  <span style={{fontSize:12,color:T.textMid,fontFamily:"'DM Sans',sans-serif",flex:1}}>{label}</span>
                  <div style={{flex:2,height:5,borderRadius:3,background:T.border,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,width:`${count/5*100}%`,background:color}}/></div>
                  <span style={{fontSize:10,fontWeight:700,color:T.textMid,fontFamily:"'DM Mono',monospace",minWidth:14}}>{count}</span>
                </div>
              ))}
            </div>
            <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"14px 16px",flex:1}}>
              <div style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>Activité récente</div>
              {[{icon:"✓",color:T.green,text:"MIS-2025-003 approuvée",time:"Il y a 2h"},{icon:"⚠",color:T.orange,text:"MIS-2025-001 en retard",time:"Il y a 5h"},{icon:"+",color:T.blue,text:"MIS-2025-005 créée",time:"Hier 09:00"},{icon:"✗",color:T.red,text:"MIS-2025-004 rejetée",time:"Il y a 2j"}].map((a,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderBottom:i<3?`1px solid ${T.border}`:"none"}}>
                  <div style={{width:24,height:24,borderRadius:6,background:a.color+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:10,fontWeight:700,color:a.color}}>{a.icon}</span></div>
                  <div><div style={{fontSize:12,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{a.text}</div><div style={{fontSize:10,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>{a.time}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tablet: risk + activity side by side */}
        {bp==="tablet"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"14px 16px"}}>
              <div style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>Risques</div>
              {[["Critique",1,"#DC2626"],["Élevé",2,"#D97706"],["Moyen",1,"#92400E"],["Faible",1,"#059669"]].map(([label,count,color])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:color}}/>
                  <span style={{fontSize:11.5,color:T.textMid,flex:1,fontFamily:"'DM Sans',sans-serif"}}>{label}</span>
                  <div style={{flex:2,height:5,borderRadius:3,background:T.border,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,width:`${count/5*100}%`,background:color}}/></div>
                  <span style={{fontSize:10,fontWeight:700,color:T.textMid,fontFamily:"'DM Mono',monospace",minWidth:14}}>{count}</span>
                </div>
              ))}
            </div>
            <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"14px 16px"}}>
              <div style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>Activité récente</div>
              {[{icon:"✓",color:T.green,text:"MIS-2025-003 approuvée",time:"Il y a 2h"},{icon:"⚠",color:T.orange,text:"MIS-2025-001 en retard",time:"Il y a 5h"},{icon:"+",color:T.blue,text:"MIS-2025-005 créée",time:"Hier 09:00"}].map((a,i)=>(
                <div key={i} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:i<2?`1px solid ${T.border}`:"none"}}>
                  <div style={{width:22,height:22,borderRadius:5,background:a.color+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:9,fontWeight:700,color:a.color}}>{a.icon}</span></div>
                  <div><div style={{fontSize:11.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{a.text}</div><div style={{fontSize:10,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>{a.time}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {bp==="mobile"&&(
        <button onClick={()=>setScreen("new")} style={{position:"fixed",bottom:76,right:20,width:52,height:52,borderRadius:"50%",background:T.blue,border:"none",color:"#fff",fontSize:24,cursor:"pointer",boxShadow:"0 4px 16px rgba(27,79,216,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:30}}>+</button>
      )}
    </div>
  </div>
);

// ─── MISSIONS SCREEN ──────────────────────────────────────────────────────────
const MissionsScreen=({setScreen,bp})=>{
  const [search,setSearch]=useState("");
  const [filterStatut,setFilterStatut]=useState("Tous");
  const filtered=MISSIONS.filter(m=>(m.title.toLowerCase().includes(search.toLowerCase())||m.ref.includes(search))&&(filterStatut==="Tous"||m.statut===filterStatut));
  return (
    <div style={{flex:1,overflow:"auto",background:T.bg,paddingBottom:bp==="mobile"?72:0}}>
      <TopBar title="Missions d'Audit" subtitle={`${MISSIONS.length} missions`} bp={bp} actions={bp!=="mobile"&&<Btn onClick={()=>setScreen("new")} small>+ Nouvelle</Btn>}/>
      <div style={{padding:bp==="mobile"?"12px":"18px 24px"}}>
        <div style={{background:T.surface,borderRadius:10,padding:"10px 14px",marginBottom:14,boxShadow:T.shadow,border:`1px solid ${T.border}`,display:"flex",gap:8,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:150,position:"relative"}}>
            <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:T.textSoft,fontSize:13}}>⌕</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher..." style={{width:"100%",padding:"7px 10px 7px 28px",borderRadius:7,border:`1.5px solid ${T.border}`,fontSize:12.5,color:T.text,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.border}/>
          </div>
          <select value={filterStatut} onChange={e=>setFilterStatut(e.target.value)} style={{padding:"7px 28px 7px 10px",borderRadius:7,border:`1.5px solid ${T.border}`,fontSize:12.5,color:T.text,background:T.surface,fontFamily:"'DM Sans',sans-serif",outline:"none",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B95B0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"calc(100% - 8px) center"}}>
            {["Tous","En cours","Planifiée","Clôturée","Suspendue"].map(s=><option key={s}>{s}</option>)}
          </select>
          <span style={{fontSize:11,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",alignSelf:"center",whiteSpace:"nowrap"}}>{filtered.length} résultat(s)</span>
        </div>

        {bp==="mobile"?(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {filtered.map(m=>(
              <div key={m.id} onClick={()=>setScreen("detail")} style={{background:T.surface,borderRadius:10,padding:"14px",boxShadow:T.shadow,border:`1px solid ${T.border}`,cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div><div style={{fontWeight:700,fontSize:13.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{m.title}</div><div style={{fontSize:11,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{m.ref} · {m.entite}</div></div>
                  <span style={{color:T.textSoft,fontSize:16,marginLeft:8}}>›</span>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                  <Badge label={m.statut} cfg={STATUS[m.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
                  <Badge label={m.risque} cfg={RISK[m.risque]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
                  <Badge label={m.appro} cfg={APPRO[m.appro]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
                </div>
                <ProgressBar value={m.avancement}/>
                <div style={{fontSize:10.5,color:T.textSoft,fontFamily:"'DM Mono',monospace",marginTop:6}}>Échéance : {m.echeance}</div>
              </div>
            ))}
          </div>
        ):(
          <div style={{background:T.surface,borderRadius:12,boxShadow:T.shadow,border:`1px solid ${T.border}`,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
                <thead>
                  <tr style={{background:T.surfaceAlt,borderBottom:`2px solid ${T.border}`}}>
                    {(bp==="tablet"?["Mission / Entité","Statut","Risque","Approbation","Avancement"]:["Référence","Mission / Entité","Type","Statut","Risque","Approbation","Échéance","Avancement"]).map(h=>(
                      <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:10,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.05em",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m,i)=>(
                    <tr key={m.id} style={{borderBottom:`1px solid ${T.border}`,background:i%2===0?T.surface:T.surfaceAlt,cursor:"pointer"}} onClick={()=>setScreen("detail")} onMouseEnter={e=>e.currentTarget.style.background=T.blueLight} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?T.surface:T.surfaceAlt}>
                      {bp==="desktop"&&<td style={{padding:"11px 12px",fontFamily:"'DM Mono',monospace",fontSize:10.5,color:T.blue,fontWeight:600,whiteSpace:"nowrap"}}>{m.ref}</td>}
                      <td style={{padding:"11px 12px"}}><div style={{fontWeight:600,fontSize:12.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{m.title}</div><div style={{fontSize:10.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif",marginTop:1}}>{m.entite} · {m.chef}</div></td>
                      {bp==="desktop"&&<td style={{padding:"11px 12px",fontSize:12,color:T.textMid,fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>{m.type}</td>}
                      <td style={{padding:"11px 12px",whiteSpace:"nowrap"}}><Badge label={m.statut} cfg={STATUS[m.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                      <td style={{padding:"11px 12px",whiteSpace:"nowrap"}}><Badge label={m.risque} cfg={RISK[m.risque]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                      <td style={{padding:"11px 12px",whiteSpace:"nowrap"}}><Badge label={m.appro} cfg={APPRO[m.appro]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/></td>
                      {bp==="desktop"&&<td style={{padding:"11px 12px",fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textMid,whiteSpace:"nowrap"}}>{m.echeance}</td>}
                      <td style={{padding:"11px 12px",minWidth:90}}><ProgressBar value={m.avancement}/></td>
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
};

// ─── NEW MISSION SCREEN ───────────────────────────────────────────────────────
const NewMissionScreen=({setScreen,bp})=>{
  const [files,setFiles]=useState([]);
  const Section=({num,title,children})=>(
    <div style={{background:T.surface,borderRadius:10,boxShadow:T.shadow,border:`1px solid ${T.border}`,marginBottom:14,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`,background:T.surfaceAlt,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:24,height:24,borderRadius:6,background:T.blueLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:11,color:T.blue,fontWeight:700}}>{num}</span></div>
        <span style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{title}</span>
      </div>
      <div style={{padding:"16px"}}>{children}</div>
    </div>
  );
  const Row=({children,cols=2})=>(
    <div style={{display:"grid",gridTemplateColumns:bp==="mobile"?"1fr":`repeat(${cols},1fr)`,gap:12,marginBottom:12}}>{children}</div>
  );
  return (
    <div style={{flex:1,overflow:"auto",background:T.bg,paddingBottom:bp==="mobile"?72:0}}>
      <TopBar title="Nouvelle Mission" subtitle="Créer une mission d'audit" bp={bp} actions={<><Btn variant="ghost" onClick={()=>setScreen("missions")} small>Annuler</Btn>{bp!=="mobile"&&<Btn onClick={()=>setScreen("missions")} small>✓ Enregistrer</Btn></>}/>
      <div style={{padding:bp==="mobile"?"12px":"18px 24px",maxWidth:800,margin:"0 auto"}}>
        <Section num="1" title="Informations générales">
          <div style={{marginBottom:12}}><Label required>Titre de la mission</Label><Input placeholder="Ex : Audit Risques Opérationnels"/></div>
          <div style={{marginBottom:12}}><Label>Description</Label><Textarea placeholder="Objectif et périmètre..." rows={3}/></div>
          <Row><div><Label required>Type de mission</Label><Select options={["Sélectionner...","Interne","Externe","Réglementaire","Thématique"]}/></div><div><Label required>Statut</Label><Select options={["Planifiée","En cours","Suspendue","Clôturée"]} defaultVal="Planifiée"/></div></Row>
        </Section>
        <Section num="2" title="Planification & Périmètre">
          <Row><div><Label required>Date de lancement</Label><Input type="date" value="2025-03-01"/></div><div><Label required>Date d'échéance</Label><Input type="date" value="2025-04-30"/></div></Row>
          <Row><div><Label required>Entité auditée</Label><Select options={["Sélectionner...","Hyundai Morocco","Global Lease","Global Occaz","Genesis Electric","Changan Morocco"]}/></div><div><Label required>Domaine d'audit</Label><Select options={["Sélectionner...","Crédit","Conformité","SI","RH","Finance","Opérations"]}/></div></Row>
        </Section>
        <Section num="3" title="Équipe de la mission">
          <Row><div><Label required>Chef de mission</Label><Input placeholder="Rechercher..." value="Khalid Mansouri"/></div><div><Label>Responsable entité</Label><Input placeholder="Rechercher..."/></div></Row>
          <div><Label>Équipe d'audit</Label>
            <div style={{border:`1.5px solid ${T.border}`,borderRadius:8,padding:"7px 10px",minHeight:40,display:"flex",flexWrap:"wrap",gap:5,alignItems:"center",background:T.surface}}>
              {["K. Mansouri","N. Chraibi"].map(p=>(
                <span key={p} style={{display:"inline-flex",alignItems:"center",gap:4,background:T.blueLight,color:T.blue,borderRadius:20,padding:"2px 9px",fontSize:11.5,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>{p} <span style={{cursor:"pointer",opacity:0.6,fontSize:13}}>×</span></span>
              ))}
              <input placeholder="+ Ajouter..." style={{border:"none",outline:"none",fontSize:12,color:T.text,fontFamily:"'DM Sans',sans-serif",minWidth:80,flex:1}}/>
            </div>
          </div>
        </Section>
        <Section num="4" title="Risque & Approbation">
          <Row><div><Label required>Niveau de risque</Label><Select options={["Sélectionner...","Faible","Moyen","Élevé","Critique"]}/></div><div><Label>Statut approbation</Label><Select options={["Non soumis","En attente","Approuvé","Rejeté"]} defaultVal="Non soumis"/></div></Row>
        </Section>
        <Section num="5" title="Pièces jointes">
          <div onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();setFiles(p=>[...p,...Array.from(e.dataTransfer.files).map(f=>f.name)]);}}
            style={{border:`2px dashed ${T.border}`,borderRadius:9,padding:"24px",textAlign:"center",cursor:"pointer",background:T.surfaceAlt,marginBottom:12}}
            onClick={()=>setFiles(p=>[...p,"Rapport_Audit_2025.pdf"])}>
            <div style={{fontSize:24,marginBottom:6,opacity:0.4}}>⬆</div>
            <div style={{fontSize:13,fontWeight:600,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Glissez-déposez vos fichiers</div>
            <div style={{fontSize:11,color:T.textSoft,marginTop:3,fontFamily:"'DM Sans',sans-serif"}}>ou cliquez · PDF, Word, Excel · Max 10 Mo</div>
          </div>
          {files.map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:T.surfaceAlt,borderRadius:7,border:`1px solid ${T.border}`,marginBottom:6}}>
              <span style={{fontSize:14,color:T.blue}}>📄</span>
              <span style={{flex:1,fontSize:12.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{f}</span>
              <span onClick={()=>setFiles(p=>p.filter((_,j)=>j!==i))} style={{fontSize:16,color:T.textSoft,cursor:"pointer"}}>×</span>
            </div>
          ))}
        </Section>
        <div style={{display:"flex",flexDirection:bp==="mobile"?"column":"row",justifyContent:"flex-end",gap:10,paddingBottom:bp==="mobile"?16:32}}>
          <Btn variant="ghost" onClick={()=>setScreen("missions")} full={bp==="mobile"}>Annuler</Btn>
          <Btn variant="secondary" full={bp==="mobile"}>Enregistrer brouillon</Btn>
          <Btn onClick={()=>setScreen("missions")} full={bp==="mobile"}>✓ Enregistrer</Btn>
        </div>
      </div>
    </div>
  );
};

// ─── DETAIL SCREEN ────────────────────────────────────────────────────────────
const DetailScreen=({setScreen,bp})=>{
  const m=MISSIONS[0];
  const [tab,setTab]=useState("apercu");
  return (
    <div style={{flex:1,overflow:"auto",background:T.bg,paddingBottom:bp==="mobile"?72:0}}>
      <TopBar title={m.title} subtitle={`${m.entite} · ${m.chef}`} bp={bp}
        actions={<><Badge label={m.statut} cfg={STATUS[m.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small={bp==="mobile"}/>{bp!=="mobile"&&<Btn variant="secondary" small>✎ Modifier</Btn>}</>}
      />
      <div style={{padding:bp==="mobile"?"12px":"18px 24px"}}>
        {bp==="mobile"&&<div style={{background:T.surface,borderRadius:10,padding:"12px 14px",marginBottom:12,boxShadow:T.shadow,border:`1px solid ${T.border}`}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.blue,fontWeight:600,marginBottom:3}}>{m.ref}</div><div style={{fontSize:11.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>{m.entite} · Chef : {m.chef}</div></div>}
        <div style={{display:"grid",gridTemplateColumns:bp==="mobile"?"repeat(3,1fr)":"repeat(6,1fr)",gap:10,marginBottom:14}}>
          {[{label:"Avancement",value:`${m.avancement}%`,color:T.blue},{label:"Risque",value:m.risque,color:RISK[m.risque]?.color||T.textMid},{label:"Approbation",value:bp==="mobile"?"N/S":m.appro,color:APPRO[m.appro]?.color||T.textMid},...(bp!=="mobile"?[{label:"Lancement",value:m.lancement,color:T.textMid},{label:"Échéance",value:m.echeance,color:T.red},{label:"Domaine",value:m.domaine,color:T.teal}]:[])].map((s,i)=>(
            <div key={i} style={{background:T.surface,borderRadius:9,padding:"10px",boxShadow:T.shadow,border:`1px solid ${T.border}`,textAlign:"center"}}>
              <div style={{fontSize:9,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.04em",fontFamily:"'DM Sans',sans-serif",marginBottom:3}}>{s.label}</div>
              <div style={{fontSize:bp==="mobile"?11:13,fontWeight:700,color:s.color,fontFamily:"'DM Mono',monospace"}}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{background:T.surface,borderRadius:9,padding:"12px 16px",marginBottom:14,boxShadow:T.shadow,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:11,fontWeight:600,color:T.textMid,fontFamily:"'DM Sans',sans-serif",minWidth:70}}>Avancement</span>
          <div style={{flex:1,height:7,borderRadius:4,background:T.border,overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,width:`${m.avancement}%`,background:`linear-gradient(90deg,${T.blue},${T.teal})`}}/></div>
          <span style={{fontSize:13,fontWeight:700,color:T.blue,fontFamily:"'DM Mono',monospace",minWidth:36}}>{m.avancement}%</span>
        </div>
        <div style={{display:"flex",gap:0,marginBottom:14,borderBottom:`2px solid ${T.border}`,overflowX:"auto"}}>
          {[["apercu","Aperçu"],["constats","Constats (3)"],["documents","Documents"],["approbation","Approbation"]].map(([id,label])=>(
            <div key={id} onClick={()=>setTab(id)} style={{padding:bp==="mobile"?"8px 12px":"9px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:bp==="mobile"?12:13,fontWeight:tab===id?700:500,color:tab===id?T.blue:T.textMid,borderBottom:tab===id?`2px solid ${T.blue}`:"2px solid transparent",marginBottom:-2,transition:"all 0.15s",whiteSpace:"nowrap"}}>{label}</div>
          ))}
        </div>
        {tab==="apercu"&&(
          <div style={{display:"grid",gridTemplateColumns:bp==="desktop"?"1fr 280px":"1fr",gap:14}}>
            <div style={{background:T.surface,borderRadius:10,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"16px"}}>
              <div style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>Informations</div>
              <div style={{display:"grid",gridTemplateColumns:bp==="mobile"?"1fr":"1fr 1fr",gap:"10px 20px"}}>
                {[["Référence",m.ref],["Type",m.type],["Entité",m.entite],["Domaine",m.domaine],["Lancement",m.lancement],["Échéance",m.echeance],["Chef de mission",m.chef],["Niveau risque",m.risque]].map(([k,v])=>(
                  <div key={k}><div style={{fontSize:10,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.04em",fontFamily:"'DM Sans',sans-serif",marginBottom:2}}>{k}</div><div style={{fontSize:12.5,color:T.navy,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{v}</div></div>
                ))}
              </div>
              <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${T.border}`}}>
                <div style={{fontSize:10,fontWeight:700,color:T.textSoft,textTransform:"uppercase",letterSpacing:"0.04em",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>Description</div>
                <div style={{fontSize:12.5,color:T.textMid,fontFamily:"'DM Sans',sans-serif",lineHeight:1.6}}>Audit des risques opérationnels liés aux processus de vente, gestion des stocks et service après-vente. Périmètre : ensemble des showrooms Hyundai Morocco.</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{background:T.surface,borderRadius:10,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"14px"}}>
                <div style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:12}}>Workflow approbation</div>
                {[{level:"N1",label:"Chef mission",person:"K. Mansouri",statut:"Approuvé",color:T.green},{level:"N2",label:"Dir. Audit",person:"M. Berrada",statut:"En attente",color:T.orange},{level:"N3",label:"DG",person:"—",statut:"Bloqué",color:T.textSoft}].map((s,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:i<2?`1px solid ${T.border}`:"none"}}>
                    <div style={{width:26,height:26,borderRadius:"50%",border:`2px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:9,fontWeight:700,color:s.color,fontFamily:"'DM Mono',monospace"}}>{s.level}</span></div>
                    <div style={{flex:1}}><div style={{fontSize:11.5,fontWeight:600,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{s.label}</div><div style={{fontSize:10.5,color:T.textSoft,fontFamily:"'DM Sans',sans-serif"}}>{s.person}</div></div>
                    <span style={{fontSize:10.5,fontWeight:700,color:s.color,fontFamily:"'DM Sans',sans-serif"}}>{s.statut}</span>
                  </div>
                ))}
              </div>
              <div style={{background:T.surface,borderRadius:10,boxShadow:T.shadow,border:`1px solid ${T.border}`,padding:"14px"}}>
                <div style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif",marginBottom:10}}>Pièces jointes (2)</div>
                {["Lettre_Mission_001.pdf","Programme_Travail.docx"].map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 0",borderBottom:i<1?`1px solid ${T.border}`:"none"}}>
                    <span style={{fontSize:13,color:T.blue}}>📄</span>
                    <span style={{flex:1,fontSize:12,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{f}</span>
                    <span style={{fontSize:11,color:T.blue,cursor:"pointer",fontWeight:600}}>↓</span>
                  </div>
                ))}
              </div>
              <Btn variant="secondary" full onClick={()=>setScreen("new")}>✎ Modifier la mission</Btn>
            </div>
          </div>
        )}
        {tab==="constats"&&(
          <div style={{background:T.surface,borderRadius:10,boxShadow:T.shadow,border:`1px solid ${T.border}`,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:700,fontSize:13,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>Constats (3)</span>
              <Btn small>+ Nouveau constat</Btn>
            </div>
            {[{ref:"CON-001",desc:"Absence de ségrégation des tâches dans l'approbation des commandes",crit:"Critique",statut:"Ouvert"},{ref:"CON-002",desc:"Documentation insuffisante des procédures de contrôle interne",crit:"Élevé",statut:"En cours"},{ref:"CON-003",desc:"Retards récurrents dans la clôture mensuelle des comptes",crit:"Moyen",statut:"Levé"}].map((c,i)=>(
              <div key={i} style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",flexDirection:bp==="mobile"?"column":"row",gap:10,alignItems:bp==="mobile"?"flex-start":"center"}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:10.5,color:T.textSoft,minWidth:60}}>{c.ref}</span>
                <div style={{flex:1}}><div style={{fontSize:12.5,color:T.navy,fontFamily:"'DM Sans',sans-serif"}}>{c.desc}</div></div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <Badge label={c.crit} cfg={RISK[c.crit]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
                  <Badge label={c.statut} cfg={{Ouvert:{bg:"#FEF2F2",color:"#DC2626",border:"#FECACA"},"En cours":{bg:"#EBF0FF",color:"#1B4FD8",border:"#BFCFFF"},Levé:{bg:"#ECFDF5",color:"#059669",border:"#A7F3D0"}}[c.statut]||{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}} small/>
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
export default function App(){
  const bp=useBreakpoint();
  const [screen,setScreen]=useState("dashboard");
  const [collapsed,setCollapsed]=useState(false);
  const [drawerOpen,setDrawerOpen]=useState(false);
  const screens={
    dashboard:<DashboardScreen setScreen={setScreen} bp={bp}/>,
    missions: <MissionsScreen setScreen={setScreen} bp={bp}/>,
    new:      <NewMissionScreen setScreen={setScreen} bp={bp}/>,
    detail:   <DetailScreen setScreen={setScreen} bp={bp}/>,
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:${T.bg};}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:${T.bg};}
        ::-webkit-scrollbar-thumb{background:#C5CBE0;border-radius:3px;}
        input::placeholder,textarea::placeholder{color:${T.textSoft};}
      `}</style>
      {bp==="mobile"&&<MobileDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} active={screen} setScreen={setScreen}/>}
      <div style={{display:"flex",height:"100vh",overflow:"hidden"}}>
        {bp!=="mobile"&&<Sidebar active={screen} setScreen={setScreen} collapsed={collapsed} setCollapsed={setCollapsed} bp={bp}/>}
        <div style={{flex:1,overflow:"auto",display:"flex",flexDirection:"column"}}>
          {screens[screen]}
        </div>
      </div>
      {bp==="mobile"&&<BottomNav active={screen} setScreen={setScreen}/>}
    </>
  );
}
