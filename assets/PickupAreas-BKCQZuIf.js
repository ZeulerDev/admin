import{r as s,x as he,z as n,j as e,i as me,L as ge,m as I}from"./index-B2mJY6nk.js";import{a as S}from"./axios-B4uVmeYG.js";import{F as xe,E as Ce}from"./leaflet.draw-jCPjRGht.js";import{c as fe,l as je,b as ye,e as ke,M as be,T as Pe,a as Me,P as Se}from"./leaflet-Bk0WgoHF.js";import{b as Ne,a as d}from"./CContainer-HxaQKhHw.js";import{C as $}from"./CNavbar-C6aw6t1r.js";import{C as F,a as G,b as R,c as p}from"./DefaultLayout-CXJ534N4.js";import{C as we,a as De,b as V,c as C,d as ve,e as f}from"./CTable-D7t5m_Bv.js";import{c as Ae}from"./cil-pencil-m516yCOw.js";import{C as Ee,a as _}from"./CPaginationItem-DTZe_mIK.js";import{C as H,a as O,b as U,c as W}from"./CModalTitle-CJnjKzOP.js";import{c as Te}from"./cil-info-CmGCY32x.js";import{C as Z}from"./CModalFooter-DI0RJn1I.js";import{C as Le}from"./CFormInput-DIFYjtpM.js";import"./index-Ehv-8t3_.js";import"./CFormLabel-BMh_f0jF.js";const ze=fe(function({positions:i,...l},r){const u=new je.Polygon(i,l);return ye(u,ke(r,{overlayContainer:u}))},function(i,l,r){l.positions!==r.positions&&i.setLatLngs(l.positions)}),Qe=()=>{const j=s.useRef(null),[{user:i,token:l},r]=he(),[u,q]=s.useState([]),[N,w]=s.useState(""),[y,D]=s.useState(0),[J,v]=s.useState("All Cities"),[K,A]=s.useState(!1),[Q,E]=s.useState(!0),[X,h]=s.useState(!1),[Y,m]=s.useState(!1),[ee,ae]=s.useState([]),[k,se]=s.useState("Napoli"),[T,te]=s.useState([]),[b,oe]=s.useState([]),[P,M]=s.useState(""),[g,L]=s.useState(""),[le,z]=s.useState("");s.useEffect(()=>{i&&l&&x(0)},[N,i]);const x=(a,t)=>{A(!0),S.get(`http://localhost:8003/pickups/areas/${a}?city=${N}`,{headers:{Authorization:`Bearer ${l}`}}).then(o=>{o.status===200?(q(o.data),A(!1),o.data.length<20?(E(!0),console.log("ok")):o.data.length>19&&E(!1)):o.status===500&&r({type:n,payload:{status:!0,title:"Market Loading error",message:o.data.message}})}).catch(o=>{console.error("Error: ",o)})},re=()=>{const a=y+20;D(a),x(a)},ie=()=>{const a=y-20;console.log(a),D(a),x(a)},c=a=>{a==="all"?(w(""),v("All Cities")):(w(a),v(a),se(a))},ne=(a,t)=>{h(!0),te(a),M(t),console.log(a)},ce=(a,t)=>{m(!0),M(a),z(t),console.log(t)};s.useEffect(()=>{i&&l&&S.get(`http://localhost:8003/assistant/markets/groups/locations/pickup/${k}`,{headers:{Authorization:`Bearer ${l}`}}).then(a=>{a.status===200?ae(a.data):a.status===500&&r({type:n,payload:{status:!0,title:"Market Group loading error",message:a.data.message}})}).catch(a=>{console.error("Error:",a)})},[i,k]);const de=a=>{const t=a.layer;console.log("layer",t._latlngs),oe(t._latlngs)},B=a=>{if(a){let t={};b&&(t={area:b}),g&&(t={name:g}),console.log(t,a),i&&l&&S.put("http://localhost:8003/pickup/area/update/"+a,t,{headers:{Authorization:`Bearer ${l}`}}).then(o=>{o.status===200?(r({type:n,payload:{status:!0,title:"Pickup Area Update",message:"Pick up area update Success",color:"success"}}),M(""),L(""),x(0),h(!1),m(!1),z("")):o.status===204?r({type:n,payload:{status:!0,title:"Pick up area update  error",message:o.data.message,color:"danger"}}):o.status===500&&r({type:n,payload:{status:!0,title:"Pick up area update  error",message:o.data.message,color:"danger"}})}).catch(o=>{console.error("Error:",o)})}else alert("Please Check the Fields!")},pe=()=>{b==""?r({type:n,payload:{status:!0,title:"Alert",message:"Please select the area",color:"danger"}}):B(P)},ue=()=>{g==""&&P==""?r({type:n,payload:{status:!0,title:"Alert",message:"Please Name",color:"danger"}}):B(P)};return e.jsxs(Ne,{children:[e.jsx($,{className:"bg-body-tertiary",children:e.jsxs(F,{style:{marginLeft:"85%",width:"13%",backgroundColor:"#ff4d4d"},children:[e.jsx(G,{children:J}),e.jsxs(R,{children:[e.jsx(p,{onClick:()=>c("all"),children:"All"}),e.jsx(p,{onClick:()=>c("Milano"),children:"Milano"}),e.jsx(p,{onClick:()=>c("Napoli"),children:"Napoli"})]})]})}),K?e.jsx(me,{}):e.jsxs(we,{children:[e.jsx(De,{children:e.jsxs(V,{children:[e.jsx(C,{scope:"col",children:"Name"}),e.jsx(C,{scope:"col",children:"Type"}),e.jsx(C,{scope:"col",children:"City"}),e.jsx(C,{scope:"col",children:"View"})]})}),e.jsx(ve,{children:u.map((a,t)=>e.jsxs(V,{children:[e.jsxs(f,{children:[a.name," ",e.jsx(ge,{to:"",children:e.jsx(I,{icon:Ae,size:"sm",onClick:()=>ce(a._id,a.name)})})," "]}),e.jsx(f,{children:a.geometry.type}),e.jsx(f,{children:a.city}),e.jsx(f,{children:e.jsx(d,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>ne(a.geometry.coordinate,a._id),children:"View map"})})]},t))})]}),e.jsxs(Ee,{"aria-label":"Page navigation example",children:[e.jsx(_,{disabled:y<=0,onClick:ie,children:"Previous"}),e.jsx(_,{disabled:Q===!0,onClick:re,children:"Next"})]}),e.jsxs(H,{alignment:"center",visible:X,scrollable:!0,size:"xl",onClose:()=>h(!1),children:[e.jsx(O,{closeButton:!0,children:e.jsx(U,{children:"Map View"})}),e.jsx($,{className:"bg-body-tertiary",children:e.jsxs(F,{style:{marginLeft:"65%",width:"10%",backgroundColor:"#ff4d4d"},children:[e.jsx(G,{children:k}),e.jsxs(R,{children:[e.jsx(p,{onClick:()=>c("Milano"),children:"Milano"}),e.jsx(p,{onClick:()=>c("Napoli"),children:"Napoli"})]})]})}),e.jsx(W,{children:e.jsxs(be,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(Pe,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),ee.map((a,t)=>e.jsx(Me,{position:[a.lat,a.lng],children:e.jsx(Se,{children:e.jsxs("div",{children:[e.jsx(I,{icon:Te,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:a.address})]})})},t)),T.length>0&&e.jsx(ze,{positions:T}),e.jsx(xe,{ref:j,children:e.jsx(Ce,{position:"topright",onCreated:de,draw:{polygon:!0,circle:!0,polyline:!0,marker:!1,circlemarker:!1}})})]})}),e.jsxs(Z,{children:[e.jsx(d,{color:"secondary",onClick:()=>h(!1),children:"Close"}),e.jsx(d,{color:"primary",onClick:()=>pe(),children:"Save updated area"})]})]}),e.jsxs(H,{alignment:"center",visible:Y,scrollable:!0,size:"sm",onClose:()=>m(!1),children:[e.jsx(O,{closeButton:!0,children:e.jsx(U,{children:"Change Name"})}),e.jsxs(W,{children:[e.jsx("a",{children:"Enter New Name"}),e.jsx("br",{}),e.jsx(Le,{type:"text",placeholder:le,value:g,onChange:a=>L(a.target.value)})]}),e.jsxs(Z,{children:[e.jsx(d,{color:"secondary",onClick:()=>m(!1),children:"Close"}),e.jsx(d,{color:"primary",onClick:()=>ue(),children:"Save changes"})]})]})]})};export{Qe as default};
