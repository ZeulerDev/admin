function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-DMTI_nPw.js","assets/index-D3QfJGEc.js","assets/index-BwGgfx4E.css","assets/leaflet-BjOtgE_7.js","assets/leaflet-D-6_-wuJ.css","assets/Polygon-nXjBfOxY.js","assets/Marker-N-B07l9-.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{R as Te,f as Ee,r as s,y as Ie,A as r,j as e,h as ze,L as _e,m as M}from"./index-D3QfJGEc.js";import{a as C}from"./axios-Cm0UX6qg.js";import{E as Be}from"./leaflet.draw-DsaA9ksw.js";import{L as oe,M as Re,T as Fe,P as Ue}from"./leaflet-BjOtgE_7.js";import{B as k}from"./config-HOLfLxHr.js";import{m as Ve,a as $e,b as Ge}from"./marker-shadow-ClvVsAuX.js";import{b as He,a as p}from"./CContainer-SkiLYL4n.js";import{C as J,a as K,b as Q,d as X,e as f}from"./DefaultLayout-D1JUfsyf.js";import{C as ee}from"./CNavbar-DrnOaIAd.js";import{C as Oe,a as We,b as N,c as u,d as Ye,e as d}from"./CTable-0Zi6KOL_.js";import{c as Ze}from"./cil-pencil-m516yCOw.js";import{c as qe}from"./cil-trash-CBbKHhHb.js";import{C as Je,a as te}from"./CPaginationItem-WVPg8jye.js";import{C as v,a as T,b as E,c as I}from"./CModalTitle-CePgAe4s.js";import{c as Ke}from"./cil-info-CmGCY32x.js";import{P as ae,F as Qe}from"./Polygon-nXjBfOxY.js";import{C as se}from"./CModalFooter-DGyoVEvF.js";import{C as Xe}from"./CFormInput-kbUX0XsV.js";import"./index-B81hxpGb.js";import"./CFormLabel-WCNlfVmk.js";const et=Te.lazy(()=>Ee(()=>import("./index-DMTI_nPw.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(b=>({default:b.Marker})));delete oe.Icon.Default.prototype._getIconUrl;oe.Icon.Default.mergeOptions({iconRetinaUrl:Ve,iconUrl:$e,shadowUrl:Ge});const kt=()=>{const b=s.useRef(null),[{user:h,token:c},l]=Ie(),[z,le]=s.useState([]),[_,B]=s.useState(""),[x,R]=s.useState(0),[re,F]=s.useState("All Cities"),[ie,U]=s.useState(!1),[ne,V]=s.useState(!0),[ce,P]=s.useState(!1),[de,w]=s.useState(!1),[pe,ue]=s.useState([]),[A,he]=s.useState("Napoli"),[$,me]=s.useState([]),[S,ge]=s.useState([]),[D,L]=s.useState(""),[y,G]=s.useState(""),[fe,H]=s.useState(""),[O,j]=s.useState(!1),[xe,ye]=s.useState(!1),[W,je]=s.useState([]),[Ce,Y]=s.useState([]);s.useEffect(()=>{h&&c&&m(0)},[_,h]);const m=t=>{U(!0),C.get(k+`pickups/areas/${t}?city=${_}`,{headers:{Authorization:`Bearer ${c}`}}).then(a=>{if(a.status===200){le(a.data);const o=a.data.map(g=>g.geometry.coordinates),n=ke(o);je(n),U(!1),a.data.length<20?V(!0):a.data.length>19&&V(!1)}else a.status===500&&l({type:r,payload:{status:!0,title:"Market Loading error",message:a.data.message}})}).catch(a=>{console.error("Error: ",a)})};function ke(t){return t.map(a=>a.map(o=>o.map(n=>({lng:n[0],lat:n[1]}))))}const be=()=>{const t=x+20;R(t),m(t)},Pe=()=>{const t=x-20;console.log(t),R(t),m(t)},i=t=>{t==="all"?(B(""),F("All Cities")):(B(t),F(t),he(t))},we=(t,a,o)=>{P(!0),o==="Milano"?(Y([45.4666507,9.1823022]),i("Milano")):o==="Napoli"&&(Y([40.85631,14.24641]),i("Napoli"));const n=Ae(t);me(n),L(a)};function Ae(t){return t.map(a=>a.map(o=>({lng:o[0],lat:o[1]})))}const Se=(t,a)=>{w(!0),L(t),H(a),console.log(a)};s.useEffect(()=>{h&&c&&C.get(k+`assistant/markets/groups/locations/pickup/${A}`,{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?ue(t.data):t.status===500&&l({type:r,payload:{status:!0,title:"Market Group loading error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},[h,A]);const De=t=>{const a=t.layer;console.log("layer",a._latlngs);const o=a._latlngs.map(n=>{const g=n.map(q=>[q.lng,q.lat]);return g.push(g[0]),g});console.log(o),ge(o)},Z=t=>{if(t){let a={};S&&(a={area:S}),y&&(a={name:y}),console.log(a,t),h&&c&&C.put(k+"pickup/area/update/"+t,a,{headers:{Authorization:`Bearer ${c}`}}).then(o=>{o.status===200?(l({type:r,payload:{status:!0,title:"Pickup Area Update",message:"Pick up area update Success",color:"success"}}),L(""),G(""),m(0),P(!1),w(!1),H("")):o.status===204?l({type:r,payload:{status:!0,title:"Pick up area update  error",message:o.data.message,color:"danger"}}):o.status===500&&l({type:r,payload:{status:!0,title:"Pick up area update  error",message:o.data.message,color:"danger"}})}).catch(o=>{console.error("Error:",o)})}else alert("Please Check the Fields!")},Le=()=>{S==""?l({type:r,payload:{status:!0,title:"Alert",message:"Please select the area",color:"danger"}}):Z(D)},Me=()=>{y==""&&D==""?l({type:r,payload:{status:!0,title:"Alert",message:"Please Name",color:"danger"}}):Z(D)},Ne=t=>{j(!O),ye(t)},ve=t=>{console.log(t),C.delete(k+"pickup/area/delete/"+t,{headers:{Authorization:`Bearer ${c}`}}).then(a=>{a.status===200?(l({type:r,payload:{status:!0,title:"Pickup Area Delete",message:"Pick up area deleted Successfully",color:"success"}}),j(!1),m(0)):a.status===204?l({type:r,payload:{status:!0,title:"Pickup Area Delete",message:a.data.message,color:"warning"}}):a.status===500&&l({type:r,payload:{status:!0,title:"Pickup Area Delete",message:a.data.message,color:"warning"}})}).catch(a=>{console.error("Error:",a)})};return e.jsxs(He,{children:[e.jsx(J,{style:{marginLeft:"75.5%"},color:"secondary",children:"Filter by"}),e.jsxs(K,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(Q,{style:{color:"white"},children:re}),e.jsxs(X,{children:[e.jsx(f,{onClick:()=>i("all"),children:"All"}),e.jsx(f,{onClick:()=>i("Milano"),children:"Milano"}),e.jsx(f,{onClick:()=>i("Napoli"),children:"Napoli"})]})]}),e.jsx(ee,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),ie?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(ze,{style:{marginTop:"15%"}})}):e.jsxs(Oe,{children:[e.jsx(We,{children:e.jsxs(N,{children:[e.jsx(u,{scope:"col",children:"#"}),e.jsx(u,{scope:"col",children:"Name"}),e.jsx(u,{scope:"col",children:"Type"}),e.jsx(u,{scope:"col",children:"City"}),e.jsx(u,{scope:"col",children:"View"}),e.jsx(u,{scope:"col",children:"Action"})]})}),e.jsx(Ye,{children:z.length===0?e.jsx(N,{children:e.jsx(d,{colSpan:"6",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):z.map((t,a)=>e.jsxs(N,{children:[e.jsx(d,{children:x+a+1}),e.jsxs(d,{children:[e.jsx("span",{children:t.name}),e.jsx(_e,{to:"",children:e.jsx(M,{style:{marginLeft:20,float:"right"},icon:Ze,size:"sm",onClick:()=>Se(t._id,t.name)})})]}),e.jsx(d,{children:t.geometry.type}),e.jsx(d,{children:t.city}),e.jsx(d,{children:e.jsx(p,{size:"sm",style:{backgroundColor:"#ff4d4d",color:"white"},variant:"outline",onClick:()=>we(t.geometry.coordinates,t._id,t.city),children:"View map"})}),e.jsx(d,{children:e.jsx(p,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>Ne(t._id),children:e.jsx(M,{icon:qe,size:"lg",style:{color:"white"}})})})]},a))})]}),e.jsxs(Je,{"aria-label":"Page navigation example",children:[e.jsx(te,{disabled:x<=0,onClick:Pe,children:"Previous"}),e.jsx(te,{disabled:ne===!0,onClick:be,children:"Next"})]}),e.jsxs(v,{alignment:"center",visible:ce,scrollable:!0,size:"xl",onClose:()=>{P(!1),i("all")},children:[e.jsx(T,{closeButton:!0,children:e.jsx(E,{children:"Map View"})}),e.jsxs(I,{children:[e.jsx(J,{style:{marginLeft:"81.5%"},color:"secondary",children:"Filter by"}),e.jsxs(K,{style:{marginLeft:"2%",width:"10%",backgroundColor:"#ff4d4d"},children:[e.jsx(Q,{style:{color:"white"},children:A}),e.jsxs(X,{children:[e.jsx(f,{onClick:()=>i("Milano"),children:"Milano"}),e.jsx(f,{onClick:()=>i("Napoli"),children:"Napoli"})]})]}),e.jsx(ee,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),e.jsxs(Re,{dragging:!0,center:Ce,zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(Fe,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.jsxs(s.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:[pe.map((t,a)=>e.jsx(et,{position:[t.lat,t.lng],children:e.jsx(Ue,{children:e.jsxs("div",{children:[e.jsx(M,{icon:Ke,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:t.address})]})})},a)),$.length>0&&e.jsx(ae,{strokeColor:"yellow",strokeWidth:2,fillColor:"red",positions:$}),W.length>0&&e.jsx(ae,{positions:W}),e.jsx(Qe,{ref:b,children:e.jsx(Be,{position:"topright",onCreated:De,draw:{polygon:!0,circle:!0,polyline:!0,marker:!1,circlemarker:!1}})})]})]})]}),e.jsx(se,{children:e.jsx(p,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>Le(),children:"Save updated area"})})]}),e.jsxs(v,{alignment:"center",visible:de,scrollable:!0,size:"sm",onClose:()=>w(!1),children:[e.jsx(T,{closeButton:!0,children:e.jsx(E,{children:"Change Name"})}),e.jsxs(I,{children:[e.jsx("a",{children:"Enter New Name"}),e.jsx("br",{}),e.jsx(Xe,{type:"text",placeholder:fe,value:y,onChange:t=>G(t.target.value)})]}),e.jsx(se,{children:e.jsx(p,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>Me(),children:"Save changes"})})]}),e.jsxs(v,{alignment:"center",visible:O,scrollable:!0,size:"sm",onClose:()=>j(!1),children:[e.jsx(T,{closeButton:!1,children:e.jsx(E,{children:"Confirmation"})}),e.jsxs(I,{children:[e.jsx("a",{children:"Are you sure you want to delete this pickup area?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(p,{onClick:()=>ve(xe),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(p,{onClick:()=>j(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{kt as default};