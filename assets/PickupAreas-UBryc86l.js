import{r as t,x as ke,z as r,j as e,h as be,L as Pe,m as M}from"./index-eVF03vmO.js";import{a as j}from"./axios-B4uVmeYG.js";import{E as we}from"./leaflet.draw-6Dx7E1lL.js";import{M as Se,T as Me,P as Ae}from"./leaflet-CMzrV2k9.js";import{B as y}from"./config-HOLfLxHr.js";import{b as De,a as n}from"./CContainer-C1oeA7kP.js";import{d as G,C as q,a as H,b as U,c as m}from"./DefaultLayout-C3vwYFSh.js";import{C as O}from"./CNavbar-BdfoZl9G.js";import{C as Ne,a as ve,b as W,c,d as Te,e as d}from"./CTable-vBbhEe3m.js";import{c as Le}from"./cil-pencil-m516yCOw.js";import{c as ze}from"./cil-trash-CBbKHhHb.js";import{C as Ee,a as Y}from"./CPaginationItem-BAluaCWs.js";import{C as A,a as D,b as N,c as v}from"./CModalTitle-aa6PqSjO.js";import{M as Be}from"./Marker-BjzeoEXT.js";import{c as Re}from"./cil-info-CmGCY32x.js";import{P as Ie}from"./Polygon-Cs-S113Y.js";import{F as Fe}from"./FeatureGroup-lZkqmUak.js";import{C as Z}from"./CModalFooter-CnphZc4h.js";import{C as _e}from"./CFormInput-C8oOCsJg.js";import"./index-BCTeE-PZ.js";import"./CFormLabel-DRQeNtLX.js";const is=()=>{const J=t.useRef(null),[{user:p,token:l},o]=ke(),[K,Q]=t.useState([]),[T,L]=t.useState(""),[g,z]=t.useState(0),[X,E]=t.useState("All Cities"),[ee,B]=t.useState(!1),[se,R]=t.useState(!0),[ae,C]=t.useState(!1),[te,k]=t.useState(!1),[oe,re]=t.useState([]),[b,le]=t.useState("Napoli"),[I,ie]=t.useState([]),[P,ne]=t.useState([]),[w,S]=t.useState(""),[f,F]=t.useState(""),[ce,_]=t.useState(""),[$,x]=t.useState(!1),[de,pe]=t.useState(!1);t.useEffect(()=>{p&&l&&u(0)},[T,p]);const u=s=>{B(!0),j.get(y+`pickups/areas/${s}?city=${T}`,{headers:{Authorization:`Bearer ${l}`}}).then(a=>{a.status===200?(Q(a.data),B(!1),a.data.length<20?R(!0):a.data.length>19&&R(!1)):a.status===500&&o({type:r,payload:{status:!0,title:"Market Loading error",message:a.data.message}})}).catch(a=>{console.error("Error: ",a),a.response?(console.error("Response data:",a.response.data),console.error("Response status:",a.response.status),console.error("Response headers:",a.response.headers)):a.request?console.error("Request data:",a.request):console.error("Error message:",a.message)})},ue=()=>{const s=g+20;z(s),u(s)},he=()=>{const s=g-20;console.log(s),z(s),u(s)},h=s=>{s==="all"?(L(""),E("All Cities")):(L(s),E(s),le(s))},me=(s,a)=>{C(!0),ie(s),S(a),console.log(s)},ge=(s,a)=>{k(!0),S(s),_(a),console.log(a)};t.useEffect(()=>{p&&l&&j.get(y+`assistant/markets/groups/locations/pickup/${b}`,{headers:{Authorization:`Bearer ${l}`}}).then(s=>{s.status===200?re(s.data):s.status===500&&o({type:r,payload:{status:!0,title:"Market Group loading error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})},[p,b]);const fe=s=>{const a=s.layer;console.log("layer",a._latlngs),ne(a._latlngs)},V=s=>{if(s){let a={};P&&(a={area:P}),f&&(a={name:f}),console.log(a,s),p&&l&&j.put(y+"pickup/area/update/"+s,a,{headers:{Authorization:`Bearer ${l}`}}).then(i=>{i.status===200?(o({type:r,payload:{status:!0,title:"Pickup Area Update",message:"Pick up area update Success",color:"success"}}),S(""),F(""),u(0),C(!1),k(!1),_("")):i.status===204?o({type:r,payload:{status:!0,title:"Pick up area update  error",message:i.data.message,color:"danger"}}):i.status===500&&o({type:r,payload:{status:!0,title:"Pick up area update  error",message:i.data.message,color:"danger"}})}).catch(i=>{console.error("Error:",i)})}else alert("Please Check the Fields!")},xe=()=>{P==""?o({type:r,payload:{status:!0,title:"Alert",message:"Please select the area",color:"danger"}}):V(w)},je=()=>{f==""&&w==""?o({type:r,payload:{status:!0,title:"Alert",message:"Please Name",color:"danger"}}):V(w)},ye=s=>{x(!$),pe(s)},Ce=s=>{console.log(s),j.delete(y+"pickup/area/delete/"+s,{headers:{Authorization:`Bearer ${l}`}}).then(a=>{a.status===200?(o({type:r,payload:{status:!0,title:"Pickup Area Delete",message:"Pick up area deleted Successfully",color:"success"}}),x(!1),u(0)):a.status===204?o({type:r,payload:{status:!0,title:"Pickup Area Delete",message:a.data.message,color:"warning"}}):a.status===500&&o({type:r,payload:{status:!0,title:"Pickup Area Delete",message:a.data.message,color:"warning"}})}).catch(a=>{console.error("Error:",a)})};return e.jsxs(De,{children:[e.jsx(G,{style:{marginLeft:"75.5%"},color:"secondary",children:"Filter by"}),e.jsxs(q,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(H,{style:{color:"white"},children:X}),e.jsxs(U,{children:[e.jsx(m,{onClick:()=>h("all"),children:"All"}),e.jsx(m,{onClick:()=>h("Milano"),children:"Milano"}),e.jsx(m,{onClick:()=>h("Napoli"),children:"Napoli"})]})]}),e.jsx(O,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),ee?e.jsx(be,{}):e.jsxs(Ne,{children:[e.jsx(ve,{children:e.jsxs(W,{children:[e.jsx(c,{scope:"col",children:"#"}),e.jsx(c,{scope:"col",children:"Name"}),e.jsx(c,{scope:"col",children:"Type"}),e.jsx(c,{scope:"col",children:"City"}),e.jsx(c,{scope:"col",children:"View"}),e.jsx(c,{scope:"col",children:"Action"})]})}),e.jsx(Te,{children:K.map((s,a)=>e.jsxs(W,{children:[e.jsx(d,{children:g+a+1}),e.jsxs(d,{children:[e.jsx("span",{children:s.name}),e.jsx(Pe,{to:"",children:e.jsx(M,{style:{marginLeft:20,float:"right"},icon:Le,size:"sm",onClick:()=>ge(s._id,s.name)})})]}),e.jsx(d,{children:s.geometry.type}),e.jsx(d,{children:s.city}),e.jsx(d,{children:e.jsx(n,{size:"sm",style:{backgroundColor:"#ff4d4d",color:"white"},variant:"outline",onClick:()=>me(s.geometry.coordinate,s._id),children:"View map"})}),e.jsx(d,{children:e.jsx(n,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>ye(s._id),children:e.jsx(M,{icon:ze,size:"lg",style:{color:"white"}})})})]},a))})]}),e.jsxs(Ee,{"aria-label":"Page navigation example",children:[e.jsx(Y,{disabled:g<=0,onClick:he,children:"Previous"}),e.jsx(Y,{disabled:se===!0,onClick:ue,children:"Next"})]}),e.jsxs(A,{alignment:"center",visible:ae,scrollable:!0,size:"xl",onClose:()=>C(!1),children:[e.jsx(D,{closeButton:!0,children:e.jsx(N,{children:"Map View"})}),e.jsxs(v,{children:[e.jsx(G,{style:{marginLeft:"81.5%"},color:"secondary",children:"Filter by"}),e.jsxs(q,{style:{marginLeft:"2%",width:"10%",backgroundColor:"#ff4d4d"},children:[e.jsx(H,{style:{color:"white"},children:b}),e.jsxs(U,{children:[e.jsx(m,{onClick:()=>h("Milano"),children:"Milano"}),e.jsx(m,{onClick:()=>h("Napoli"),children:"Napoli"})]})]}),e.jsx(O,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),e.jsxs(Se,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(Me,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),oe.map((s,a)=>e.jsx(Be,{position:[s.lat,s.lng],children:e.jsx(Ae,{children:e.jsxs("div",{children:[e.jsx(M,{icon:Re,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:s.address})]})})},a)),I.length>0&&e.jsx(Ie,{positions:I}),e.jsx(Fe,{ref:J,children:e.jsx(we,{position:"topright",onCreated:fe,draw:{polygon:!0,circle:!0,polyline:!0,marker:!1,circlemarker:!1}})})]})]}),e.jsx(Z,{children:e.jsx(n,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>xe(),children:"Save updated area"})})]}),e.jsxs(A,{alignment:"center",visible:te,scrollable:!0,size:"sm",onClose:()=>k(!1),children:[e.jsx(D,{closeButton:!0,children:e.jsx(N,{children:"Change Name"})}),e.jsxs(v,{children:[e.jsx("a",{children:"Enter New Name"}),e.jsx("br",{}),e.jsx(_e,{type:"text",placeholder:ce,value:f,onChange:s=>F(s.target.value)})]}),e.jsx(Z,{children:e.jsx(n,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>je(),children:"Save changes"})})]}),e.jsxs(A,{alignment:"center",visible:$,scrollable:!0,size:"sm",onClose:()=>x(!1),children:[e.jsx(D,{closeButton:!1,children:e.jsx(N,{children:"Confirmation"})}),e.jsxs(v,{children:[e.jsx("a",{children:"Are you sure you want to delete this pickup area?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(n,{onClick:()=>Ce(de),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(n,{onClick:()=>x(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{is as default};
