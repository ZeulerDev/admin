import{r,y as B,A as p,j as e,m as L}from"./index-D4rV_uL3.js";import{F as P,E as R}from"./leaflet.draw-Dy2vpmwc.js";import{M as T,T as v,a as z,P as D}from"./leaflet-Dm9MWjXf.js";import{a as x}from"./axios-Cm0UX6qg.js";import{B as y}from"./config-HOLfLxHr.js";import{b as F,a as j}from"./CContainer-DEqxUE8K.js";import{C as G}from"./CNavbar-DTojsqYe.js";import{C as I,a as _,b as $,c as k}from"./DefaultLayout-l9DhwevO.js";import{c as H}from"./cil-info-CmGCY32x.js";import{C as O,a as U,b as V,c as W}from"./CModalTitle-Dg6uhly4.js";import{C as Z}from"./CFormInput-CItUBkdw.js";import{C as q}from"./CModalFooter-YQgfiPnt.js";import"./index-IlO0mmLI.js";import"./CFormLabel-qY_9YLUa.js";function ce(){const M=r.useRef(null),[{user:i,token:s},l]=B(),[n,d]=r.useState("Napoli"),[u,m]=r.useState("Napoli"),[b,S]=r.useState([]),[c,h]=r.useState(""),[E,o]=r.useState(!1),[f,w]=r.useState([]),A=t=>{const a=t.layerType,C=t.layer;console.log(a),console.log("layer",C._latlngs),o(!0),w(C._latlngs)},N=()=>{if(o(!1),n&&c&&f){const t={area:f,name:c,city:u};console.log(t),i&&s&&x.post(y+"pickup/area/create",t,{headers:{Authorization:`Bearer ${s}`}}).then(a=>{a.status===200?(l({type:p,payload:{status:!0,title:"Pickup Area Registration",message:"Pick up area registration Success",color:"success"}}),h("")):a.status===500&&l({type:p,payload:{status:!0,title:"Pick up area registration  error",message:a.data.message,color:"danger"}})}).catch(a=>{console.error("Error:",a)})}else alert("Please Check the Fields!")},g=t=>{t==="all"?(d(""),m("Napoli")):(d(t),m(t))};return r.useEffect(()=>{i&&s&&x.get(y+`assistant/markets/groups/locations/pickup/${n}`,{headers:{Authorization:`Bearer ${s}`}}).then(t=>{t.status===200?S(t.data):t.status===500&&l({type:p,payload:{status:!0,title:"Market Group loading error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},[i,n]),e.jsxs(F,{children:[e.jsx(G,{className:"bg-body-tertiary",children:e.jsxs(I,{style:{marginLeft:"90%",width:"10%",marginRight:"5px",backgroundColor:"#ff4d4d"},children:[e.jsx(_,{children:u}),e.jsxs($,{children:[e.jsx(k,{onClick:()=>g("Napoli"),children:"Napoli"}),e.jsx(k,{onClick:()=>g("Milano"),children:"Milano"})]})]})}),e.jsxs(T,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(v,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),b.map((t,a)=>e.jsx(z,{position:[t.lat,t.lng],children:e.jsx(D,{children:e.jsxs("div",{children:[e.jsx(L,{icon:H,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:t.address})]})})},a)),e.jsx(P,{ref:M,children:e.jsx(R,{position:"topright",onCreated:A,draw:{polygon:!0,circle:!0,polyline:!1,marker:!1,circlemarker:!1}})})]}),e.jsxs(O,{alignment:"center",visible:E,scrollable:!0,size:"sm",onClose:()=>o(!1),children:[e.jsx(U,{closeButton:!0,children:e.jsx(V,{children:"Confirmation"})}),e.jsxs(W,{children:[e.jsx("a",{children:"Enter name for selected area"}),e.jsx("br",{}),e.jsx(Z,{type:"text",value:c,onChange:t=>h(t.target.value)})]}),e.jsxs(q,{children:[e.jsx(j,{color:"secondary",onClick:()=>o(!1),children:"Close"}),e.jsx(j,{color:"primary",onClick:()=>N(),children:"Save area"})]})]})]})}export{ce as default};