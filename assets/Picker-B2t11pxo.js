import{r as t,y as Ge,A as c,j as a,L as ue,i as Ve,m as ze}from"./index-D7hMCpfZ.js";import{a as C}from"./axios-Cm0UX6qg.js";/* empty css               */import{B as j}from"./config-HOLfLxHr.js";import{b as Le,a as m}from"./CContainer-CtIWBirN.js";import{C as $e}from"./CNavbar-CF5s_Yu1.js";import{C as h}from"./CFormInput-C_rKCNW0.js";import{C as v,a as A,b as P,c as p}from"./DefaultLayout-jgAbWox0.js";import{C as Fe,a as Re,b as he,c as o,d as He,e as n}from"./CTable-DPgvjQZA.js";import{c as _e}from"./cil-pencil-m516yCOw.js";import{C as pe,a as me,b as xe,c as Ce}from"./CModalTitle-CcgDWxHa.js";import{C as u}from"./CCol-DHGwoefR.js";import{C as Ue}from"./CFormSelect-BR_0Pbon.js";import{C as Ye}from"./CModalFooter-DyfW6scl.js";import"./CFormLabel-COYWKIaa.js";const na=()=>{const[E,y]=t.useState(!1),[{user:k,token:r},i]=Ge(),[w,D]=t.useState([]),[je,N]=t.useState(!1),[M,B]=t.useState(""),[I,T]=t.useState(""),[G,V]=t.useState(""),[g,ge]=t.useState(""),[z,L]=t.useState(!1),[$,F]=t.useState(""),[fe,R]=t.useState(!1),[ye,H]=t.useState("All Cities"),[ke,_]=t.useState("All Market Groups"),[be,U]=t.useState("All Chains"),[Se,ve]=t.useState([]),[Ae,Pe]=t.useState([]),[Y,f]=t.useState(!1),[d,Ee]=t.useState([]),[q,J]=t.useState(),[K,Q]=t.useState(),[W,X]=t.useState(),[Z,O]=t.useState(),[ee,ae]=t.useState(),[b,se]=t.useState(),[te,le]=t.useState(),[re,oe]=t.useState();t.useEffect(()=>{we(),De()},[]);const we=()=>{r&&C.get(j+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${r}`}}).then(e=>{e.status===200?ve(e.data):e.status===500&&i({type:c,payload:{status:!0,title:"Market Group Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},De=()=>{r&&C.get(j+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${r}`}}).then(e=>{e.status===200?Pe(e.data):e.status===500&&i({type:c,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})};t.useEffect(()=>{Ne()},[M,I,G,g,fe]);const Ne=()=>{if(k&&r){N(!0);let e=j+`assistant/shoppers/:skip?city=${M}&group=${I}&chain=${G}`;g&&(e+=`&code=${g}`),C.get(e,{headers:{Authorization:`Bearer ${r}`}}).then(s=>{s.status===200?(D(s.data),N(!1),R(!1)):s.status===500&&i({type:c,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)})}},S=e=>{e==="all"?(B(""),H("All Cities")):(B(e),H(e))},ne=(e,s)=>{e==="all"?(T(""),_("All Market Groups")):(T(e),_(s))},ie=(e,s)=>{e==="all"?(V(""),U("All Chains")):(V(e),U(s))},ce=(e,s)=>{y(!E),L(s),F(e)},Me=()=>{const e={status:z};console.log($,e),k&&r&&C.patch(j+"assistant/shopper/status/"+$,e,{headers:{Authorization:`Bearer ${r}`}}).then(s=>{s.status===200?(console.log("updated"),y(!1),L(""),F(""),R(!0)):s.status===203?i({type:c,payload:{status:!0,title:"Picker status update error",message:s.data.message}}):s.status===204?i({type:c,payload:{status:!0,title:"Picker status update error",message:s.data.message}}):s.status===500&&i({type:c,payload:{status:!0,title:"Picker status update error",message:s.data.message}})}).catch(s=>{console.error(s)})},Be=e=>{f(!Y),Ee(e),J(e.name),Q(e.surname),X(e.email),O(e.contact),ae(e.iban),se(e.city),oe(e.address),le(e.vat)},Ie=()=>{if(q&&K&&W&&Z&&ee&&b&&te&&re){const e={name:q,surname:K,email:W,contact:Z,iban:ee,city:b,vat:te,address:re},s=d.id;r&&k&&r&&C.patch(j+"assistant/shopper/update/"+s,e,{headers:{Authorization:`Bearer ${r}`}}).then(l=>{if(l.status===200){console.log(l.data),f(!1);const x=l.data,Te=w.map(de=>de.id===x.id?(console.log("update obj"),x):de);D([...Te])}else l.status===203?i({type:c,payload:{status:!0,title:"Picker update error",message:l.data.message,color:"warning"}}):l.status===204?i({type:c,payload:{status:!0,title:"Picker update error",message:l.data.message,color:"warning"}}):l.status===500&&i({type:c,payload:{status:!0,title:"Picker update error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else i({type:c,payload:{status:!0,title:"Error!",message:"Picker update error, Please Check the input fields",color:"warning"}})};return a.jsxs(Le,{children:[a.jsxs($e,{className:"bg-body-tertiary picker-navbar",children:[a.jsx(h,{type:"text",placeholder:"Search by Picker ID",className:"picker-input",value:g,onChange:e=>ge(e.target.value)}),a.jsx(ue,{to:"/picker/addpicker",className:"picker-link",children:a.jsx(m,{type:"submit",color:"success",variant:"outline",className:"picker-button",children:"Add Picker"})}),a.jsxs(v,{className:"picker-dropdown",style:{backgroundColor:"#ff4d4d"},children:[a.jsx(A,{children:ye}),a.jsxs(P,{children:[a.jsx(p,{onClick:()=>S("all"),children:"All"}),a.jsx(p,{onClick:()=>S("Milan"),children:"Milan"}),a.jsx(p,{onClick:()=>S("Napoli"),children:"Napoli"})]})]}),a.jsxs(v,{className:"picker-dropdown",style:{backgroundColor:"#ff4d4d"},children:[a.jsx(A,{children:be}),a.jsxs(P,{children:[a.jsx(p,{onClick:()=>ie("all"),children:"All"}),Ae.map((e,s)=>a.jsx(p,{onClick:()=>ie(e.id,e.name),children:e.name},s))]})]}),a.jsxs(v,{className:"picker-dropdown",style:{backgroundColor:"#ff4d4d"},children:[a.jsx(A,{children:ke}),a.jsxs(P,{children:[a.jsx(p,{onClick:()=>ne("all"),children:"All"}),Se.map((e,s)=>a.jsx(p,{onClick:()=>ne(e._id,e.name),children:e.name},s))]})]})]}),je?a.jsx(Ve,{}):a.jsxs(Fe,{children:[a.jsx(Re,{children:a.jsxs(he,{children:[a.jsx(o,{scope:"col",children:"Id"}),a.jsx(o,{scope:"col",children:"First Name"}),a.jsx(o,{scope:"col",children:"Last Name"}),a.jsx(o,{scope:"col",children:"Email"}),a.jsx(o,{scope:"col",children:"Phone"}),a.jsx(o,{scope:"col",children:"Country"}),a.jsx(o,{scope:"col",children:"City"}),a.jsx(o,{scope:"col",children:"Language"}),a.jsx(o,{scope:"col",children:"Market"}),a.jsx(o,{scope:"col",children:"Edit"}),a.jsx(o,{scope:"col",children:"Status"})]})}),a.jsx(He,{children:w.map((e,s)=>{var l,x;return a.jsxs(he,{children:[a.jsx(n,{children:e.code}),a.jsx(n,{children:e.name}),a.jsx(n,{children:e.surname}),a.jsx(n,{children:e.email}),a.jsx(n,{children:e.contact}),a.jsx(n,{children:e.country==="it"||e.country==="Italy"?"Italy":e.country}),a.jsx(n,{children:e.city}),a.jsx(n,{children:e.language==="en"?"English":e.language==="it"?"Italy":e.language==="es"?"Spanish":e.language}),a.jsxs(n,{children:[(x=(l=e.market)==null?void 0:l.chain)==null?void 0:x.name," - ",e.market.address]}),a.jsx(n,{children:a.jsx(ue,{children:a.jsx(ze,{icon:_e,size:"xl",onClick:()=>Be(e)})})}),a.jsx(n,{children:e.activate?a.jsx(m,{size:"sm",onClick:()=>ce(e.id,!1),style:{backgroundColor:"#ff4d4d",width:90},children:"Deactivate"}):a.jsx(m,{size:"sm",onClick:()=>ce(e.id,!0),style:{backgroundColor:"#ff4d4d",width:90},children:"Activate"})})]},s)})})]}),a.jsxs(pe,{alignment:"center",visible:E,scrollable:!0,size:"sm",onClose:()=>y(!1),children:[a.jsx(me,{closeButton:!0,children:a.jsx(xe,{children:"Confirmation"})}),a.jsxs(Ce,{children:[a.jsxs("a",{children:["Are you sure you want to ",z?"activate":"deactivate"," this user?"]}),a.jsx("br",{}),a.jsx(m,{onClick:()=>Me(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]}),a.jsxs(pe,{visible:Y,scrollable:!0,size:"lg",onClose:()=>f(!1),children:[a.jsx(me,{closeButton:!0,children:a.jsx(xe,{children:"Edit Picker Information"})}),a.jsx(Ce,{children:a.jsxs("div",{className:"row g-3",children:[a.jsx(u,{md:6,children:a.jsx(h,{id:"name",label:"Firt Name",defaultValue:d.name,onChange:e=>J(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"surname",label:"LastName",defaultValue:d.surname,onChange:e=>Q(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"address",label:"Address",defaultValue:d.address,onChange:e=>oe(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"email",label:"Email",defaultValue:d.email,onChange:e=>X(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"phone",label:"Contact Number",defaultValue:d.contact,onChange:e=>O(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"iban",label:"IBAN",defaultValue:d.iban,onChange:e=>ae(e.target.value)})}),a.jsx(u,{md:6,children:a.jsx(h,{id:"vat",label:"Vat",defaultValue:d.vat,onChange:e=>le(e.target.value)})}),a.jsx(u,{md:6,children:a.jsxs(Ue,{id:"inputState",label:"City",value:b,onChange:e=>se(e.target.value),children:[a.jsx("option",{children:d.city}),a.jsx("option",{children:"Milano"}),a.jsx("option",{children:"Napoli"})]})}),a.jsx(u,{xs:12,children:a.jsx(m,{color:"warning",type:"submit",style:{marginBottom:"3%",width:"200px"},onClick:()=>Ie(),children:"Update Picker"})})]})}),a.jsx(Ye,{children:a.jsx(m,{color:"secondary",onClick:()=>f(!1),children:"Close"})})]})]})};export{na as default};
