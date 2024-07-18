const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CVWxa9pL.js","assets/index-eVF03vmO.js","assets/index-Bi_wmZ_L.css","assets/leaflet-CMzrV2k9.js","assets/leaflet-D-6_-wuJ.css","assets/FeatureGroup-lZkqmUak.js","assets/Marker-BjzeoEXT.js","assets/Polygon-Cs-S113Y.js"])))=>i.map(i=>d[i]);
import{R as B,f as L,r as o,x as N,l as $,z as l,j as e,m as I}from"./index-eVF03vmO.js";import{L as w,M as G,T as P,P as U}from"./leaflet-CMzrV2k9.js";import{m as H,a as O,b as V}from"./marker-shadow-ClvVsAuX.js";import{a as p}from"./axios-B4uVmeYG.js";import{B as u}from"./config-HOLfLxHr.js";import{b as F,a as j}from"./CContainer-C1oeA7kP.js";import{C as W}from"./CNavbar-BdfoZl9G.js";import{C as Y,a as Z,b as q,c as M}from"./DefaultLayout-C3vwYFSh.js";import{c as J}from"./cil-info-CmGCY32x.js";import{C as K,a as Q,b as X,c as ee}from"./CModalTitle-aa6PqSjO.js";import{C as ae,a as se,b,c as h,d as te,e as m}from"./CTable-vBbhEe3m.js";import{C as re}from"./CModalFooter-CnphZc4h.js";const oe=B.lazy(()=>L(()=>import("./index-CVWxa9pL.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])).then(n=>({default:n.Marker})));delete w.Icon.Default.prototype._getIconUrl;w.Icon.Default.mergeOptions({iconRetinaUrl:H,iconUrl:O,shadowUrl:V});const Ce=()=>{const[n,c]=o.useState(!1),[{user:d,token:i},r]=N(),[g,x]=o.useState("Napoli"),[v,C]=o.useState("Napoli"),[A,S]=o.useState([]),[T,_]=o.useState([]),[f,R]=o.useState();$();const y=(a,t)=>{c(!n),R(t),p.get(u+`market/groups/fetch/0?city=${a}`,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?_(s.data):s.status===500&&r({type:l,payload:{status:!0,title:"City loading error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})},k=a=>{a==="all"?(x(""),C("Napoli")):(x(a),C(a))};o.useEffect(()=>{d&&i&&p.get(u+`assistant/markets/groups/locations/delivery/${g}`,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{a.status===200?S(a.data):a.status===500&&r({type:l,payload:{status:!0,title:"Market Group loading error",message:a.data.message}})}).catch(a=>{console.error("Error:",a)})},[d,g]);const E=(a,t)=>{a&&t&&d&&i&&(console.log("one"),p.put(u+`market/groups/assign/${t}/${a}`,{},{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(c(!1),r({type:l,payload:{status:!0,title:"Market Assign",message:"New Market Assign Successfully",color:"success"}})):s.status===204?r({type:l,payload:{status:!0,title:"Market Assign error",message:s.data.message}}):s.status===500&&r({type:l,payload:{status:!0,title:"Market Assign error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)}))},D=(a,t)=>{a&&t&&d&&i&&p.put(u+`market/groups/remove/${t}/${a}`,{},{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(c(!1),r({type:l,payload:{status:!0,title:"Market Remove",message:"Market removed Successfully",color:"success"}})):s.status===204?r({type:l,payload:{status:!0,title:"Market Remove error",message:s.data.message}}):s.status===500&&r({type:l,payload:{status:!0,title:"Market Remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})};return e.jsxs(F,{children:[e.jsx(W,{className:"bg-body-tertiary",children:e.jsxs(Y,{style:{marginLeft:"90%",width:"17%",marginRight:"5px",backgroundColor:"#ff4d4d"},children:[e.jsx(Z,{style:{color:"white"},children:v}),e.jsxs(q,{children:[e.jsx(M,{onClick:()=>k("Napoli"),children:"Napoli"}),e.jsx(M,{onClick:()=>k("Milano"),children:"Milano"})]})]})}),e.jsxs(G,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(P,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.jsx(o.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:A.map((a,t)=>e.jsx(oe,{position:[a.lat,a.lng],onClick:()=>y(a.city,a._id),children:e.jsx(U,{children:e.jsxs("div",{onClick:()=>y(a.city,a._id),children:[e.jsx(I,{icon:J,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:a.address})]})})},t))})]}),e.jsxs(K,{visible:n,scrollable:!0,size:"xl",onClose:()=>c(!1),children:[e.jsx(Q,{closeButton:!0,children:e.jsx(X,{children:"Map Information"})}),e.jsx(ee,{style:{overflowY:"auto",maxHeight:"70vh"},children:e.jsxs(ae,{children:[e.jsx(se,{children:e.jsxs(b,{children:[e.jsx(h,{scope:"col",children:"#"}),e.jsx(h,{scope:"col",children:"Name"}),e.jsx(h,{scope:"col",children:"Market"}),e.jsx(h,{scope:"col",children:"Action"})]})}),e.jsx(te,{children:T.map((a,t)=>e.jsxs(b,{children:[e.jsx(m,{children:t+1}),e.jsx(m,{children:a.name}),e.jsx(m,{children:a.markets.map((s,z)=>e.jsxs("div",{children:[s.chain.name," - ",s.address," "]},z))}),e.jsx(m,{children:a.markets.some(s=>s.id===f)?e.jsx(j,{style:{backgroundColor:"#ff4d4d",width:"90px",color:"white"},onClick:()=>D(f,a._id),children:"Remove"}):e.jsx(j,{style:{backgroundColor:"#ff4d4d",width:"90px",color:"white"},onClick:()=>E(f,a._id),children:"Assign"})})]},t))})]})}),e.jsx(re,{})]})]})};export{Ce as default};
