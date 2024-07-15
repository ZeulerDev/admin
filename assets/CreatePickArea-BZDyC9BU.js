import{r as s,x as z,z as p,j as e,m as P}from"./index-B2mJY6nk.js";import{F as T,E as v}from"./leaflet.draw-jCPjRGht.js";import{M as A,T as D,a as L,P as R}from"./leaflet-Bk0WgoHF.js";import{a as x}from"./axios-B4uVmeYG.js";import{b as B,a as y}from"./CContainer-HxaQKhHw.js";import{C as F}from"./CNavbar-C6aw6t1r.js";import{C as G,a as I,b as _,c as j}from"./DefaultLayout-CXJ534N4.js";import{c as $}from"./cil-info-CmGCY32x.js";import{C as H,a as O,b as V,c as W}from"./CModalTitle-CJnjKzOP.js";import{C as Z}from"./CFormInput-DIFYjtpM.js";import{C as q}from"./CModalFooter-DI0RJn1I.js";import"./index-Ehv-8t3_.js";import"./CFormLabel-BMh_f0jF.js";function ie(){const k=s.useRef(null),[{user:l,token:r},i]=z(),[n,d]=s.useState("Napoli"),[u,m]=s.useState("Napoli"),[M,b]=s.useState([]),[c,h]=s.useState(""),[S,o]=s.useState(!1),[f,w]=s.useState([]),E=t=>{const a=t.layerType,C=t.layer;console.log(a),console.log("layer",C._latlngs),o(!0),w(C._latlngs)},N=()=>{if(o(!1),n&&c&&f){const t={area:f,name:c,city:u};console.log(t),l&&r&&x.post("http://localhost:8003/pickup/area/create",t,{headers:{Authorization:`Bearer ${r}`}}).then(a=>{a.status===200?(i({type:p,payload:{status:!0,title:"Pickup Area Registration",message:"Pick up area registration Success",color:"success"}}),h("")):a.status===500&&i({type:p,payload:{status:!0,title:"Pick up area registration  error",message:a.data.message,color:"danger"}})}).catch(a=>{console.error("Error:",a)})}else alert("Please Check the Fields!")},g=t=>{t==="all"?(d(""),m("Napoli")):(d(t),m(t))};return s.useEffect(()=>{l&&r&&x.get(`http://localhost:8003/assistant/markets/groups/locations/pickup/${n}`,{headers:{Authorization:`Bearer ${r}`}}).then(t=>{t.status===200?b(t.data):t.status===500&&i({type:p,payload:{status:!0,title:"Market Group loading error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},[l,n]),e.jsxs(B,{children:[e.jsx(F,{className:"bg-body-tertiary",children:e.jsxs(G,{style:{marginLeft:"90%",width:"10%",marginRight:"5px",backgroundColor:"#ff4d4d"},children:[e.jsx(I,{children:u}),e.jsxs(_,{children:[e.jsx(j,{onClick:()=>g("Napoli"),children:"Napoli"}),e.jsx(j,{onClick:()=>g("Milano"),children:"Milano"})]})]})}),e.jsxs(A,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(D,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),M.map((t,a)=>e.jsx(L,{position:[t.lat,t.lng],children:e.jsx(R,{children:e.jsxs("div",{children:[e.jsx(P,{icon:$,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:t.address})]})})},a)),e.jsx(T,{ref:k,children:e.jsx(v,{position:"topright",onCreated:E,draw:{polygon:!0,circle:!0,polyline:!1,marker:!1,circlemarker:!1}})})]}),e.jsxs(H,{alignment:"center",visible:S,scrollable:!0,size:"sm",onClose:()=>o(!1),children:[e.jsx(O,{closeButton:!0,children:e.jsx(V,{children:"Confirmation"})}),e.jsxs(W,{children:[e.jsx("a",{children:"Enter name for selected area"}),e.jsx("br",{}),e.jsx(Z,{type:"text",value:c,onChange:t=>h(t.target.value)})]}),e.jsxs(q,{children:[e.jsx(y,{color:"secondary",onClick:()=>o(!1),children:"Close"}),e.jsx(y,{color:"primary",onClick:()=>N(),children:"Save area"})]})]})]})}export{ie as default};
