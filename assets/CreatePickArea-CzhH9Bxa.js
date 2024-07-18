const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CtuYWLb3.js","assets/index-BBbqW4X4.js","assets/index-Bi_wmZ_L.css","assets/TileLayer-CThe58Vv.js","assets/leaflet-Dzxcyavu.js","assets/leaflet-D-6_-wuJ.css","assets/FeatureGroup-CHIZHXIe.js","assets/Polygon-stkDv_En.js"])))=>i.map(i=>d[i]);
import{R as I,f as L,r,x as v,z as d,j as e,m as D}from"./index-BBbqW4X4.js";import{E as P}from"./leaflet.draw-DIsHNBLh.js";import{L as b}from"./leaflet-Dzxcyavu.js";import{a as y}from"./axios-B4uVmeYG.js";import{B as j}from"./config-HOLfLxHr.js";import{m as z,a as A,b as N}from"./marker-shadow-ClvVsAuX.js";import{b as T,a as B}from"./CContainer-DET1f65e.js";import{C as F}from"./CNavbar-jLob1g1W.js";import{C as G,a as U,b as O,c as k}from"./DefaultLayout-BRBoVGVY.js";import{M as $,T as V,P as H}from"./TileLayer-CThe58Vv.js";import{c as W}from"./cil-info-CmGCY32x.js";import{F as Z}from"./FeatureGroup-CHIZHXIe.js";import{C as q,a as J,b as K,c as Q}from"./CModalTitle-BE31g4S7.js";import{C as X}from"./CFormInput-fvgvZ2ht.js";import{C as Y}from"./CModalFooter-B6ga4qV3.js";import"./index-DS4EO2gR.js";import"./CFormLabel-CP8lOhvI.js";const ee=I.lazy(()=>L(()=>import("./index-CtuYWLb3.js"),__vite__mapDeps([0,1,2,3,4,5,6,7])).then(s=>({default:s.Marker})));delete b.Icon.Default.prototype._getIconUrl;b.Icon.Default.mergeOptions({iconRetinaUrl:z,iconUrl:A,shadowUrl:N});function Ce(){const s=r.useRef(null),[{user:i,token:o},l]=v(),[n,m]=r.useState("Napoli"),[u,f]=r.useState("Napoli"),[M,S]=r.useState([]),[c,h]=r.useState(""),[w,p]=r.useState(!1),[g,E]=r.useState([]),_=t=>{const a=t.layerType,C=t.layer;console.log(a),console.log("layer",C._latlngs),p(!0),E(C._latlngs)},R=()=>{if(p(!1),n&&c&&g){const t={area:g,name:c,city:u};console.log(t),i&&o&&y.post(j+"pickup/area/create",t,{headers:{Authorization:`Bearer ${o}`}}).then(a=>{a.status===200?(l({type:d,payload:{status:!0,title:"Pickup Area Registration",message:"Pick up area registration Success",color:"success"}}),h("")):a.status===500&&l({type:d,payload:{status:!0,title:"Pick up area registration  error",message:a.data.message,color:"danger"}})}).catch(a=>{console.error("Error:",a)})}else alert("Please Check the Fields!")},x=t=>{t==="all"?(m(""),f("Napoli")):(m(t),f(t))};return r.useEffect(()=>{i&&o&&y.get(j+`assistant/markets/groups/locations/pickup/${n}`,{headers:{Authorization:`Bearer ${o}`}}).then(t=>{t.status===200?S(t.data):t.status===500&&l({type:d,payload:{status:!0,title:"Market Group loading error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},[i,n]),e.jsxs(T,{children:[e.jsx(F,{className:"bg-body-tertiary",children:e.jsxs(G,{style:{marginLeft:"90%",width:"10%",marginRight:"5px",backgroundColor:"#ff4d4d"},children:[e.jsx(U,{children:u}),e.jsxs(O,{children:[e.jsx(k,{onClick:()=>x("Napoli"),children:"Napoli"}),e.jsx(k,{onClick:()=>x("Milano"),children:"Milano"})]})]})}),e.jsxs($,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(V,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.jsxs(r.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:[M.map((t,a)=>e.jsx(ee,{position:[t.lat,t.lng],children:e.jsx(H,{children:e.jsxs("div",{children:[e.jsx(D,{icon:W,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:t.address})]})})},a)),e.jsx(Z,{ref:s,children:e.jsx(P,{position:"topright",onCreated:_,draw:{polygon:!0,circle:!0,polyline:!1,marker:!1,circlemarker:!1}})})]})]}),e.jsxs(q,{alignment:"center",visible:w,scrollable:!0,size:"sm",onClose:()=>p(!1),children:[e.jsx(J,{closeButton:!0,children:e.jsx(K,{children:"Confirmation"})}),e.jsxs(Q,{children:[e.jsx("a",{children:"Enter name for selected area"}),e.jsx("br",{}),e.jsx(X,{type:"text",value:c,onChange:t=>h(t.target.value)})]}),e.jsx(Y,{children:e.jsx(B,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>R(),children:"Save area"})})]})]})}export{Ce as default};
