function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DdsiLd_7.js","assets/index-BzWpTyRP.js","assets/index-BwGgfx4E.css","assets/leaflet-CXg664FR.js","assets/leaflet-D-6_-wuJ.css","assets/Polygon-B4A5u2lj.js","assets/Marker-BZB6Ii-k.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{R as N,f as $,r as o,y as F,A as c,j as e,m as G}from"./index-BzWpTyRP.js";import{E as U}from"./leaflet.draw-BGXVhz5P.js";import{L as w,M as O,T as V,P as H}from"./leaflet-CXg664FR.js";import{a as h}from"./axios-Cm0UX6qg.js";import{B as y}from"./config-HOLfLxHr.js";import{m as W,a as Z,b as q}from"./marker-shadow-ClvVsAuX.js";import{b as J,a as K}from"./CContainer-BohUAxSl.js";import{C as Q}from"./CNavbar-u7Q3iHwm.js";import{a as X,b as Y,d as ee,e as E}from"./DefaultLayout-Blmcm6y8.js";import{c as ae}from"./cil-info-CmGCY32x.js";import{P as te,F as oe}from"./Polygon-B4A5u2lj.js";import{C as re,a as se,b as ne,c as le}from"./CModalTitle-BEoCtNfZ.js";import{C as ie}from"./CFormInput-ztrVIr0j.js";import{C as ce}from"./CModalFooter-COP8gJvv.js";import"./index-Bt1R0HA-.js";import"./CFormLabel-BSwA839n.js";const pe=N.lazy(()=>$(()=>import("./index-DdsiLd_7.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(p=>({default:p.Marker})));delete w.Icon.Default.prototype._getIconUrl;w.Icon.Default.mergeOptions({iconRetinaUrl:W,iconUrl:Z,shadowUrl:q});function we(){const p=o.useRef(null),[{user:l,token:n},i]=F(),[d,C]=o.useState("Napoli"),[x,j]=o.useState("Napoli"),[D,P]=o.useState([]),[u,k]=o.useState(""),[_,m]=o.useState(!1),[M,v]=o.useState([]),[S,b]=o.useState([]);o.useState(!1);const[R,de]=o.useState(""),I=a=>{const t=a.layerType,r=a.layer;console.log(t),console.log("layer",r._latlngs),m(!0),console.log("area",r);const s=r._latlngs.map(f=>{const g=f.map(A=>[A.lng,A.lat]);return g.push(g[0]),g});console.log(s),v(s)},T=()=>{if(m(!1),d&&u&&M){const a={area:M,name:u,city:x};console.log(a),l&&n&&h.post(y+"pickup/area/create",a,{headers:{Authorization:`Bearer ${n}`}}).then(t=>{t.status===200?(i({type:c,payload:{status:!0,title:"Pickup Area Registration",message:"Pick up area registration Success",color:"success"}}),k("")):t.status===500&&i({type:c,payload:{status:!0,title:"Pick up area registration  error",message:t.data.message,color:"danger"}})}).catch(t=>{console.error("Error:",t)})}else alert("Please Check the Fields!")},L=a=>{a==="all"?(C(""),j("Napoli")):(C(a),j(a))};o.useEffect(()=>{l&&n&&h.get(y+`assistant/markets/groups/locations/pickup/${d}`,{headers:{Authorization:`Bearer ${n}`}}).then(a=>{a.status===200?P(a.data):a.status===500&&i({type:c,payload:{status:!0,title:"Market Group loading error",message:a.data.message}})}).catch(a=>{console.error("Error:",a)})},[l,d]),o.useEffect(()=>{l&&n&&z(0)},[]);const z=a=>{h.get(y+`pickups/areas/${a}?city=${R}`,{headers:{Authorization:`Bearer ${n}`}}).then(t=>{if(t.status===200)if(console.log("pickup areas",t.data),t.data.length>0){const r=t.data.map(f=>f.geometry.coordinates);console.log("location",r);const s=B(r);console.log("Convert location",s),b(s)}else b([]);else t.status===500&&i({type:c,payload:{status:!0,title:"Market Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})};function B(a){return a.map(t=>t.map(r=>r.map(s=>({lng:s[0],lat:s[1]}))))}return e.jsxs(J,{children:[e.jsx(Q,{className:"bg-body-tertiary",children:e.jsxs(X,{style:{marginLeft:"90%",width:"10%",marginRight:"5px",backgroundColor:"#ff4d4d"},children:[e.jsx(Y,{children:x}),e.jsxs(ee,{children:[e.jsx(E,{onClick:()=>L("Napoli"),children:"Napoli"}),e.jsx(E,{onClick:()=>L("Milano"),children:"Milano"})]})]})}),e.jsxs(O,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(V,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.jsxs(o.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:[D.map((a,t)=>e.jsx(pe,{position:[a.lat,a.lng],children:e.jsx(H,{children:e.jsxs("div",{children:[e.jsx(G,{icon:ae,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:a.address})]})})},t)),S.length>0&&e.jsx(te,{positions:S}),e.jsx(oe,{ref:p,children:e.jsx(U,{position:"topright",onCreated:I,draw:{polygon:!0,circle:!0,polyline:!1,marker:!1,circlemarker:!1}})})]})]}),e.jsxs(re,{alignment:"center",visible:_,scrollable:!0,size:"sm",onClose:()=>m(!1),children:[e.jsx(se,{closeButton:!0,children:e.jsx(ne,{children:"Confirmation"})}),e.jsxs(le,{children:[e.jsx("a",{children:"Enter name for selected area"}),e.jsx("br",{}),e.jsx(ie,{type:"text",value:u,onChange:a=>k(a.target.value)})]}),e.jsx(ce,{children:e.jsx(K,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>T(),children:"Save area"})})]})]})}export{we as default};
