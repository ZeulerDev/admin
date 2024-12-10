const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BR2IiZPA.js","assets/index-Dy30eiM6.js","assets/index-Bi_wmZ_L.css","assets/leaflet-BRGqcjvZ.js","assets/leaflet-D-6_-wuJ.css","assets/Polygon-NxAE8Gha.js","assets/Marker-tv-yRz60.js"])))=>i.map(i=>d[i]);
import{R as _,f as b,A as E,r as a,x as z,z as m,j as e,m as A}from"./index-Dy30eiM6.js";import{L as i,M as L,T as v,P as u}from"./leaflet-BRGqcjvZ.js";import{m as P,a as R,b as U}from"./marker-shadow-ClvVsAuX.js";import{a as h}from"./axios-B4uVmeYG.js";import{B as g}from"./config-HOLfLxHr.js";import{b as D}from"./CContainer-PswvU4of.js";import{C as T}from"./CNavbar-DSEUJjHx.js";import{c as G}from"./cil-info-CmGCY32x.js";const f=_.lazy(()=>b(()=>import("./index-BR2IiZPA.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(o=>({default:o.Marker})));delete i.Icon.Default.prototype._getIconUrl;i.Icon.Default.mergeOptions({iconRetinaUrl:P,iconUrl:R,shadowUrl:U});const K=()=>{const{id:o}=E(),[x,k]=a.useState(!1),[{user:c,token:s},l]=z(),[j,B]=a.useState("Napoli");a.useState("Napoli");const[y,C]=a.useState([]),[N,S]=a.useState([]),[$,w]=a.useState(),[p,I]=a.useState({lat:"",lng:""});a.useEffect(()=>{console.log("id",o)});const d=(t,n)=>{k(!x),w(n),h.get(g+`market/groups/fetch/0?city=${t}`,{headers:{Authorization:`Bearer ${s}`}}).then(r=>{r.status===200?S(r.data):r.status===500&&l({type:m,payload:{status:!0,title:"City loading error",message:r.data.message}})}).catch(r=>{console.error("Error:",r)})};a.useEffect(()=>{c&&s&&h.get(g+`assistant/markets/groups/locations/${o}`,{headers:{Authorization:`Bearer ${s}`}}).then(t=>{t.status===200?(C(t.data.data),I({lat:t.data.center.lat,lng:t.data.center.lng}),console.log("center point",t.data.center)):t.status===500&&l({type:m,payload:{status:!0,title:"Market Group loading error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},[c,j]);const M=new i.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});return e.jsxs(D,{children:[e.jsx(T,{className:"bg-body-tertiary"}),e.jsxs(L,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(v,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.jsxs(a.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:[e.jsx(f,{position:[p.lat,p.lng],icon:M,children:e.jsx(u,{children:e.jsx("div",{onClick:()=>{},children:e.jsx("span",{children:"Center Point"})})})}),y.map((t,n)=>e.jsx(f,{position:[t.lat,t.lng],onClick:()=>d(t.city,t._id),children:e.jsx(u,{children:e.jsxs("div",{onClick:()=>d(t.city,t._id),children:[e.jsx(A,{icon:G,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:t.address})]})})},n))]})]})]})};export{K as default};