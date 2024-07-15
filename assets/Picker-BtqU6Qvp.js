import{r as s,x as Te,z as c,j as a,L as de,i as ze,m as Ge}from"./index-B2mJY6nk.js";import{a as C}from"./axios-B4uVmeYG.js";/* empty css               */import{b as Ve,a as m}from"./CContainer-HxaQKhHw.js";import{C as Le}from"./CNavbar-C6aw6t1r.js";import{C as h}from"./CFormInput-DIFYjtpM.js";import{C as S,a as v,b as P,c as p}from"./DefaultLayout-CXJ534N4.js";import{C as $e,a as Fe,b as ue,c as o,d as He,e as n}from"./CTable-D7t5m_Bv.js";import{c as Re}from"./cil-pencil-m516yCOw.js";import{C as he,a as pe,b as me,c as xe}from"./CModalTitle-CJnjKzOP.js";import{C as u}from"./CCol-DExom2-S.js";import{C as _e}from"./CFormSelect-C4GzYggR.js";import{C as Ue}from"./CModalFooter-DI0RJn1I.js";import"./CFormLabel-BMh_f0jF.js";const ra=()=>{const[A,f]=s.useState(!1),[{user:y,token:r},i]=Te(),[E,w]=s.useState([]),[Ce,D]=s.useState(!1),[N,M]=s.useState(""),[B,I]=s.useState(""),[T,z]=s.useState(""),[j,je]=s.useState(""),[G,V]=s.useState(!1),[L,$]=s.useState(""),[ge,F]=s.useState(!1),[fe,H]=s.useState("All Cities"),[ye,R]=s.useState("All Market Groups"),[ke,_]=s.useState("All Chains"),[be,Se]=s.useState([]),[ve,Pe]=s.useState([]),[U,g]=s.useState(!1),[d,Ae]=s.useState([]),[Y,q]=s.useState(),[J,K]=s.useState(),[Q,W]=s.useState(),[X,Z]=s.useState(),[O,ee]=s.useState(),[k,ae]=s.useState(),[te,se]=s.useState(),[le,re]=s.useState();s.useEffect(()=>{Ee(),we()},[]);const Ee=()=>{r&&C.get("http://localhost:8003/market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${r}`}}).then(e=>{e.status===200?Se(e.data):e.status===500&&i({type:c,payload:{status:!0,title:"Market Group Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},we=()=>{r&&C.get("http://localhost:8003/assistant/market/chains/all",{headers:{Authorization:`Bearer ${r}`}}).then(e=>{e.status===200?Pe(e.data):e.status===500&&i({type:c,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})};s.useEffect(()=>{De()},[N,B,T,j,ge]);const De=()=>{if(y&&r){D(!0);let e=`http://localhost:8003/assistant/shoppers/:skip?city=${N}&group=${B}&chain=${T}`;j&&(e+=`&code=${j}`),C.get(e,{headers:{Authorization:`Bearer ${r}`}}).then(t=>{t.status===200?(w(t.data),D(!1),F(!1)):t.status===500&&i({type:c,payload:{status:!0,title:"Error",message:t.data.message,color:"warning"}})}).catch(t=>{console.error("Error:",t)})}},b=e=>{e==="all"?(M(""),H("All Cities")):(M(e),H(e))},oe=(e,t)=>{e==="all"?(I(""),R("All Market Groups")):(I(e),R(t))},ne=(e,t)=>{e==="all"?(z(""),_("All Chains")):(z(e),_(t))},ie=(e,t)=>{f(!A),V(t),$(e)},Ne=()=>{const e={status:G};console.log(L,e),y&&r&&C.patch("http://localhost:8003/assistant/shopper/status/"+L,e,{headers:{Authorization:`Bearer ${r}`}}).then(t=>{t.status===200?(console.log("updated"),f(!1),V(""),$(""),F(!0)):t.status===203?i({type:c,payload:{status:!0,title:"Picker status update error",message:t.data.message}}):t.status===204?i({type:c,payload:{status:!0,title:"Picker status update error",message:t.data.message}}):t.status===500&&i({type:c,payload:{status:!0,title:"Picker status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},Me=e=>{g(!U),Ae(e),q(e.name),K(e.surname),W(e.email),Z(e.contact),ee(e.iban),ae(e.city),re(e.address),se(e.vat)},Be=()=>{if(Y&&J&&Q&&X&&O&&k&&te&&le){const e={name:Y,surname:J,email:Q,contact:X,iban:O,city:k,vat:te,address:le},t=d.id;r&&y&&r&&C.patch("http://localhost:8003/assistant/shopper/update/"+t,e,{headers:{Authorization:`Bearer ${r}`}}).then(l=>{if(l.status===200){console.log(l.data),g(!1);const x=l.data,Ie=E.map(ce=>ce.id===x.id?(console.log("update obj"),x):ce);w([...Ie])}else l.status===203?i({type:c,payload:{status:!0,title:"Picker update error",message:l.data.message,color:"warning"}}):l.status===204?i({type:c,payload:{status:!0,title:"Picker update error",message:l.data.message,color:"warning"}}):l.status===500&&i({type:c,payload:{status:!0,title:"Picker update error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else i({type:c,payload:{status:!0,title:"Error!",message:"Picker update error, Please Check the input fields",color:"warning"}})};return a.jsxs(Ve,{children:[a.jsxs(Le,{className:"bg-body-tertiary picker-navbar",children:[a.jsx(h,{type:"text",placeholder:"Search by Picker ID",className:"picker-input",value:j,onChange:e=>je(e.target.value)}),a.jsx(de,{to:"/picker/addpicker",className:"picker-link",children:a.jsx(m,{type:"submit",color:"success",variant:"outline",className:"picker-button",children:"Add Picker"})}),a.jsxs(S,{className:"picker-dropdown",style:{backgroundColor:"#ff4d4d"},children:[a.jsx(v,{children:fe}),a.jsxs(P,{children:[a.jsx(p,{onClick:()=>b("all"),children:"All"}),a.jsx(p,{onClick:()=>b("Milan"),children:"Milan"}),a.jsx(p,{onClick:()=>b("Napoli"),children:"Napoli"})]})]}),a.jsxs(S,{className:"picker-dropdown",style:{backgroundColor:"#ff4d4d"},children:[a.jsx(v,{children:ke}),a.jsxs(P,{children:[a.jsx(p,{onClick:()=>ne("all"),children:"All"}),ve.map((e,t)=>a.jsx(p,{onClick:()=>ne(e.id,e.name),children:e.name},t))]})]}),a.jsxs(S,{className:"picker-dropdown",style:{backgroundColor:"#ff4d4d"},children:[a.jsx(v,{children:ye}),a.jsxs(P,{children:[a.jsx(p,{onClick:()=>oe("all"),children:"All"}),be.map((e,t)=>a.jsx(p,{onClick:()=>oe(e._id,e.name),children:e.name},t))]})]})]}),Ce?a.jsx(ze,{}):a.jsxs($e,{children:[a.jsx(Fe,{children:a.jsxs(ue,{children:[a.jsx(o,{scope:"col",children:"Id"}),a.jsx(o,{scope:"col",children:"First Name"}),a.jsx(o,{scope:"col",children:"Last Name"}),a.jsx(o,{scope:"col",children:"Email"}),a.jsx(o,{scope:"col",children:"Phone"}),a.jsx(o,{scope:"col",children:"Country"}),a.jsx(o,{scope:"col",children:"City"}),a.jsx(o,{scope:"col",children:"Language"}),a.jsx(o,{scope:"col",children:"Market"}),a.jsx(o,{scope:"col",children:"Edit"}),a.jsx(o,{scope:"col",children:"Status"})]})}),a.jsx(He,{children:E.map((e,t)=>{var l,x;return a.jsxs(ue,{children:[a.jsx(n,{children:e.code}),a.jsx(n,{children:e.name}),a.jsx(n,{children:e.surname}),a.jsx(n,{children:e.email}),a.jsx(n,{children:e.contact}),a.jsx(n,{children:e.country==="it"||e.country==="Italy"?"Italy":e.country}),a.jsx(n,{children:e.city}),a.jsx(n,{children:e.language==="en"?"English":e.language==="it"?"Italy":e.language==="es"?"Spanish":e.language}),a.jsxs(n,{children:[(x=(l=e.market)==null?void 0:l.chain)==null?void 0:x.name," - ",e.market.address]}),a.jsx(n,{children:a.jsx(de,{children:a.jsx(Ge,{icon:Re,size:"xl",onClick:()=>Me(e)})})}),a.jsx(n,{children:e.activate?a.jsx(m,{size:"sm",onClick:()=>ie(e.id,!1),style:{backgroundColor:"#ff4d4d",width:90},children:"Deactivate"}):a.jsx(m,{size:"sm",onClick:()=>ie(e.id,!0),style:{backgroundColor:"#ff4d4d",width:90},children:"Activate"})})]},t)})})]}),a.jsxs(he,{alignment:"center",visible:A,scrollable:!0,size:"sm",onClose:()=>f(!1),children:[a.jsx(pe,{closeButton:!0,children:a.jsx(me,{children:"Confirmation"})}),a.jsxs(xe,{children:[a.jsxs("a",{children:["Are you sure you want to ",G?"activate":"deactivate"," this user?"]}),a.jsx("br",{}),a.jsx(m,{onClick:()=>Ne(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]}),a.jsxs(he,{visible:U,scrollable:!0,size:"lg",onClose:()=>g(!1),children:[a.jsx(pe,{closeButton:!0,children:a.jsx(me,{children:"Edit Picker Information"})}),a.jsx(xe,{children:a.jsxs("div",{className:"row g-3",children:[a.jsx(u,{md:6,children:a.jsx(h,{id:"name",label:"Firt Name",defaultValue:d.name,onChange:e=>q(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"surname",label:"LastName",defaultValue:d.surname,onChange:e=>K(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"address",label:"Address",defaultValue:d.address,onChange:e=>re(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"email",label:"Email",defaultValue:d.email,onChange:e=>W(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"phone",label:"Contact Number",defaultValue:d.contact,onChange:e=>Z(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"iban",label:"IBAN",defaultValue:d.iban,onChange:e=>ee(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"vat",label:"Vat",defaultValue:d.vat,onChange:e=>se(e.target.value)})}),a.jsx(u,{md:6,children:a.jsxs(_e,{id:"inputState",label:"City",value:k,onChange:e=>ae(e.target.value),children:[a.jsx("option",{children:d.city}),a.jsx("option",{children:"Milano"}),a.jsx("option",{children:"Napoli"})]})}),a.jsx(u,{xs:12,children:a.jsx(m,{color:"warning",type:"submit",style:{marginBottom:"3%",width:"200px"},onClick:()=>Be(),children:"Update Picker"})})]})}),a.jsx(Ue,{children:a.jsx(m,{color:"secondary",onClick:()=>g(!1),children:"Close"})})]})]})};export{ra as default};
