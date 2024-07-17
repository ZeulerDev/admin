import{r as a,y as _e,l as Ue,A as o,j as e,L as je,h as Ye,m as Ce}from"./index-BQX274Hu.js";import{a as f}from"./axios-Cm0UX6qg.js";/* empty css               */import{B as g}from"./config-HOLfLxHr.js";import{b as qe,a as u}from"./CContainer-CurIo0GZ.js";import{d as ye,C as L,a as N,b as B,c as m}from"./DefaultLayout-BjtSIjCa.js";import{C as Je}from"./CNavbar-BTTMa5Sp.js";import{C as p}from"./CFormInput-GV_Un9Yl.js";import{C as Ke,a as Qe,b as ve,c as i,d as We,e as n}from"./CTable-B0oZK1ko.js";import{c as Xe}from"./cil-pencil-m516yCOw.js";import{c as Ze}from"./cil-trash-CBbKHhHb.js";import{C as I,a as M,b as z,c as T}from"./CModalTitle-Dg8Faq2v.js";import{C as h}from"./CCol-D7qv0C_1.js";import{C as Oe}from"./CFormSelect-D1fFG-wq.js";import"./CFormLabel-BN6ilVRB.js";const xt=()=>{const[G,j]=a.useState(!1),[V,C]=a.useState(!1),[{user:b,token:c},l]=_e(),[D,k]=a.useState([]),[be,P]=a.useState(!1),[R,$]=a.useState(""),[F,H]=a.useState(""),[_,U]=a.useState(""),[y,De]=a.useState(""),[S,Y]=a.useState(!1),[q,J]=a.useState("");Ue();const[ke,Se]=a.useState(!1),[we,K]=a.useState("All Cities"),[Ae,Q]=a.useState("All Market Groups"),[Ee,W]=a.useState("All Chains"),[Le,Ne]=a.useState([]),[Be,Ie]=a.useState([]),[X,w]=a.useState(!1),[d,Me]=a.useState([]),[Z,O]=a.useState(),[ee,te]=a.useState(),[se,ae]=a.useState(),[le,re]=a.useState(),[oe,ie]=a.useState(),[A,ne]=a.useState(),[ce,de]=a.useState(),[ue,he]=a.useState(),[ze,Te]=a.useState();a.useEffect(()=>{Ge(),Ve()},[]);const Ge=()=>{c&&f.get(g+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?Ne(t.data):t.status===500&&l({type:o,payload:{status:!0,title:"Market Group Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},Ve=()=>{c&&f.get(g+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?(Ie(t.data),Se(!1)):t.status===500&&l({type:o,payload:{status:!0,title:"Chain Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})};a.useEffect(()=>{pe()},[R,F,_,y,ke]);const pe=()=>{if(b&&c){P(!0);let t=g+`assistant/riders/:skip?city=${R}&group=${F}&chain=${_}`;y&&(t+=`&code=${y}`),f.get(t,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(k(s.data),P(!1)):s.status===500&&l({type:o,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)})}},E=t=>{t==="all"?($(""),K("All Cities")):($(t),K(t))},me=(t,s)=>{t==="all"?(H(""),Q("All Market Groups")):(H(t),Q(s))},xe=(t,s)=>{t==="all"?(U(""),W("All Chains")):(U(t),W(s))},fe=(t,s)=>{j(!G),Y(s),J(t)},Pe=()=>{const t={status:S};console.log(S),console.log(q,t),b&&c&&f.patch(g+"assistant/rider/status/"+q,t,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{if(s.status===200){console.log("updated",s.data),j(!1),Y(""),J("");const r=s.data,x=D.map(v=>v.id===r.id?r:v);k([...x]),l({type:o,payload:{status:!0,title:"Driver status update",message:"Driver status updated successfully",color:"success"}})}else s.status===203?l({type:o,payload:{status:!0,title:"Driver status update error",message:s.data.message}}):s.status===204?l({type:o,payload:{status:!0,title:"Driver status update error",message:s.data.message}}):s.status===500&&l({type:o,payload:{status:!0,title:"Driver status update error",message:s.data.message}})}).catch(s=>{console.error(s)})},Re=t=>{w(!X),Me(t),O(t.name),te(t.surname),ae(t.email),re(t.contact),ie(t.iban),ne(t.city),he(t.address),de(t.vat)},$e=()=>{if(Z&&ee&&se&&le&&oe&&A&&ce&&ue){const t={name:Z,surname:ee,email:se,contact:le,iban:oe,city:A,vat:ce,address:ue},s=d.id;c&&b&&c&&f.patch(g+"assistant/rider/update/"+s,t,{headers:{Authorization:`Bearer ${c}`}}).then(r=>{if(r.status===200){w(!1);const x=r.data,v=D.map(ge=>ge.id===x.id?x:ge);k([...v]),l({type:o,payload:{status:!0,title:"Driver update",message:"Driver updated successfully",color:"success"}})}else r.status===203?l({type:o,payload:{status:!0,title:"Driver update error",message:r.data.message,color:"warning"}}):r.status===204?(console.log(r.message),l({type:o,payload:{status:!0,title:"Driver update error",message:"Email Already include",color:"warning"}})):r.status===500&&l({type:o,payload:{status:!0,title:"Driver update error",message:r.data.message,color:"warning"}})}).catch(r=>{console.error("Error:",r)})}else l({type:o,payload:{status:!0,title:"Error!",message:"Picker update error, Please Check the input fields",color:"warning"}})},Fe=t=>{C(!V),Te(t)},He=t=>{f.delete(g+"assistant/rider/delete/"+t,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(l({type:o,payload:{status:!0,title:"Driver Delete",message:"Driver deleted successfully",color:"success"}}),C(!1),pe()):s.status===404?l({type:o,payload:{status:!0,title:"Driver remove error",message:s.data.message}}):s.status===500&&l({type:o,payload:{status:!0,title:"Driver remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})};return e.jsxs(qe,{children:[e.jsx(je,{to:"/driver/adddriver",className:"picker-link",children:e.jsx(u,{style:{marginLeft:"0%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:"Add Driver"})}),e.jsx(ye,{style:{marginLeft:"20%"},color:"secondary",children:"Filter by"}),e.jsxs(L,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(N,{style:{color:"white"},children:we}),e.jsxs(B,{children:[e.jsx(m,{onClick:()=>E("all"),children:"All"}),e.jsx(m,{onClick:()=>E("Milan"),children:"Milan"}),e.jsx(m,{onClick:()=>E("Napoli"),children:"Napoli"})]})]}),e.jsxs(L,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(N,{style:{color:"white"},children:Ee}),e.jsxs(B,{children:[e.jsx(m,{onClick:()=>xe("all"),children:"All"}),Be.map((t,s)=>e.jsx(m,{onClick:()=>xe(t.id,t.name),children:t.name},s))]})]}),e.jsxs(L,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(N,{style:{color:"white"},children:Ae}),e.jsxs(B,{children:[e.jsx(m,{onClick:()=>me("all"),children:"All"}),Le.map((t,s)=>e.jsx(m,{onClick:()=>me(t._id,t.name),children:t.name},s))]})]}),e.jsx(Je,{className:"bg-body-tertiary",children:e.jsx(p,{type:"text",placeholder:"Search by Driver ID",style:{width:450,marginLeft:"0%"},value:y,onChange:t=>De(t.target.value)})}),be?e.jsx(Ye,{}):e.jsxs(Ke,{children:[e.jsx(Qe,{children:e.jsxs(ve,{children:[e.jsx(i,{scope:"col",children:"#"}),e.jsx(i,{scope:"col",children:"Id"}),e.jsx(i,{scope:"col",children:"First Name"}),e.jsx(i,{scope:"col",children:"Last Name"}),e.jsx(i,{scope:"col",children:"Email"}),e.jsx(i,{scope:"col",children:"Phone"}),e.jsx(i,{scope:"col",children:"Country"}),e.jsx(i,{scope:"col",children:"Employee ID"}),e.jsx(i,{scope:"col",children:"Language"}),e.jsx(i,{scope:"col",children:"Group"}),e.jsx(i,{scope:"col",children:"Edit"}),e.jsx(i,{scope:"col",children:"Edit Status"}),e.jsx(i,{scope:"col",children:"Action"})]})}),e.jsx(We,{children:D.map((t,s)=>e.jsxs(ve,{children:[e.jsx(n,{children:s+1}),e.jsx(n,{children:t.code}),e.jsx(n,{children:t.name}),e.jsx(n,{children:t.surname}),e.jsx(n,{children:t.email}),e.jsx(n,{children:t.contact}),e.jsx(n,{children:t.country==="it"||t.country==="Italy"?"Italy":t.country}),e.jsx(n,{children:t.employeeId?t.employeeId:e.jsx(ye,{color:"warning",children:"Not Provide"})}),e.jsx(n,{children:t.language==="en"?"English":t.language==="it"?"Italy":t.language==="es"?"Spanish":t.language}),e.jsx(n,{children:t.groups.map((r,x)=>e.jsx("div",{children:r.name},x))}),e.jsx(n,{children:e.jsx(je,{children:e.jsx(Ce,{icon:Xe,size:"xl",onClick:()=>Re(t)})})}),e.jsx(n,{children:t.activate?e.jsx(u,{size:"sm",onClick:()=>fe(t.id,!1),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Deactivate"}):e.jsx(u,{size:"sm",onClick:()=>fe(t.id,!0),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Activate"})}),e.jsx(n,{children:e.jsx(u,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>Fe(t.id),children:e.jsx(Ce,{icon:Ze,size:"lg",style:{color:"white"}})})})]},s))})]}),e.jsxs(I,{alignment:"center",visible:V,scrollable:!0,size:"sm",onClose:()=>C(!1),children:[e.jsx(M,{closeButton:!1,children:e.jsx(z,{children:"Confirmation"})}),e.jsxs(T,{children:[e.jsx("a",{children:"Are you sure you want to delete this driver?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(u,{onClick:()=>He(ze),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(u,{onClick:()=>C(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(I,{alignment:"center",visible:G,scrollable:!0,size:"sm",onClose:()=>j(!1),children:[e.jsx(M,{closeButton:!1,children:e.jsx(z,{children:"Confirmation"})}),e.jsxs(T,{children:[e.jsxs("a",{children:["Are you sure you want to ",S?"activate":"deactivate"," this driver?"]}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(u,{onClick:()=>Pe(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(u,{onClick:()=>j(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(I,{visible:X,scrollable:!0,size:"lg",onClose:()=>w(!1),children:[e.jsx(M,{closeButton:!0,children:e.jsx(z,{children:"Edit Driver Information"})}),e.jsx(T,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(h,{md:6,children:e.jsx(p,{id:"name",label:"Firt Name",defaultValue:d.name,onChange:t=>O(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"surname",label:"LastName",defaultValue:d.surname,onChange:t=>te(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"address",label:"Address",defaultValue:d.address,onChange:t=>he(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"email",label:"Email",defaultValue:d.email,onChange:t=>ae(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"phone",label:"Contact Number",defaultValue:d.contact,onChange:t=>re(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"iban",label:"IBAN",defaultValue:d.iban,onChange:t=>ie(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"vat",label:"Vat",defaultValue:d.vat,onChange:t=>de(t.target.value)})}),e.jsx(h,{md:6,children:e.jsxs(Oe,{id:"inputState",label:"City",value:A,onChange:t=>ne(t.target.value),children:[e.jsx("option",{children:d.city}),e.jsx("option",{children:"Milano"}),e.jsx("option",{children:"Napoli"})]})}),e.jsx(h,{xs:12,children:e.jsx(u,{style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>$e(),children:"Update Rider"})})]})})]})]})};export{xt as default};
