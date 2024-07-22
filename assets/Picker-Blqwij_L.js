import{r as a,y as He,A as r,j as e,L as ge,h as _e,m as je}from"./index-Cmo8jOUG.js";import{a as x}from"./axios-Cm0UX6qg.js";/* empty css               */import{B as f}from"./config-HOLfLxHr.js";import{b as Ue,a as u}from"./CContainer-D7fLRyZt.js";import{d as Ye,C as v,a as A,b as E,c as m}from"./DefaultLayout-CcL3hFND.js";import{C as qe}from"./CNavbar-15em09iB.js";import{C as p}from"./CFormInput-C1iM2HIO.js";import{C as Je,a as Ke,b as Ce,c as i,d as Qe,e as n}from"./CTable-CC7vKO1g.js";import{c as We}from"./cil-pencil-m516yCOw.js";import{c as Xe}from"./cil-trash-CBbKHhHb.js";import{C as D,a as L,b as B,c as M}from"./CModalTitle-C6NN_sbf.js";import{C as h}from"./CCol-B7RSY0v1.js";import{C as Ze}from"./CFormSelect-DP_TgmHO.js";import"./CFormLabel-Ds_mHWoR.js";const mt=()=>{const[N,j]=a.useState(!1),[T,C]=a.useState(!1),[{user:k,token:c},l]=He(),[z,I]=a.useState([]),[ye,V]=a.useState(!1),[G,$]=a.useState(""),[R,F]=a.useState(""),[H,_]=a.useState(""),[y,ke]=a.useState(""),[U,Y]=a.useState(!1),[q,J]=a.useState(""),[be,K]=a.useState(!1),[Se,Q]=a.useState("All Cities"),[we,W]=a.useState("All Market Groups"),[Pe,X]=a.useState("All Chains"),[ve,Ae]=a.useState([]),[Ee,De]=a.useState([]),[Z,b]=a.useState(!1),[d,Le]=a.useState([]),[O,ee]=a.useState(),[te,se]=a.useState(),[ae,le]=a.useState(),[re,oe]=a.useState(),[ie,ne]=a.useState(),[S,ce]=a.useState(),[Be,de]=a.useState(),[ue,he]=a.useState(),[Me,Ne]=a.useState();a.useEffect(()=>{Te(),ze()},[]);const Te=()=>{c&&x.get(f+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?Ae(t.data):t.status===500&&l({type:r,payload:{status:!0,title:"Market Group Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},ze=()=>{c&&x.get(f+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?De(t.data):t.status===500&&l({type:r,payload:{status:!0,title:"Chain Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})};a.useEffect(()=>{w()},[G,R,H,y,be]);const w=()=>{if(k&&c){V(!0);let t=f+`assistant/shoppers/:skip?city=${G}&group=${R}&chain=${H}`;y&&(t+=`&code=${y}`),x.get(t,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(I(s.data),V(!1),K(!1)):s.status===500&&l({type:r,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)})}},P=t=>{t==="all"?($(""),Q("All Cities")):($(t),Q(t))},pe=(t,s)=>{t==="all"?(F(""),W("All Market Groups")):(F(t),W(s))},me=(t,s)=>{t==="all"?(_(""),X("All Chains")):(_(t),X(s))},xe=(t,s)=>{j(!N),Y(s),J(t)},Ie=()=>{const t={status:U};console.log(q,t),k&&c&&x.patch(f+"assistant/shopper/status/"+q,t,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(console.log("updated"),j(!1),Y(""),J(""),K(!0),l({type:r,payload:{status:!0,title:"Picker status update",message:"Picker status updated successfully",color:"success"}})):s.status===203?l({type:r,payload:{status:!0,title:"Picker status update error",message:s.data.message}}):s.status===204?l({type:r,payload:{status:!0,title:"Picker status update error",message:s.data.message}}):s.status===500&&l({type:r,payload:{status:!0,title:"Picker status update error",message:s.data.message}})}).catch(s=>{console.error(s)})},Ve=t=>{b(!Z),Le(t),ee(t.name),se(t.surname),le(t.email),oe(t.contact),ne(t.iban),ce(t.city),he(t.address),de(t.vat)},Ge=()=>{if(O&&te&&ae&&re&&ie&&S&&ue){const t={name:O,surname:te,email:ae,contact:re,iban:ie,city:S,vat:Be,address:ue},s=d.id;c&&k&&c&&x.patch(f+"assistant/shopper/update/"+s,t,{headers:{Authorization:`Bearer ${c}`}}).then(o=>{if(o.status===200){console.log(o.data),b(!1);const g=o.data,Fe=z.map(fe=>fe.id===g.id?(console.log("update obj"),g):fe);I([...Fe]),w(),l({type:r,payload:{status:!0,title:"Picker update",message:"Picker updated successfully",color:"success"}})}else o.status===203?l({type:r,payload:{status:!0,title:"Picker update error",message:"Email already exists",color:"warning"}}):o.status===204?l({type:r,payload:{status:!0,title:"Picker update error",message:o.data.message,color:"warning"}}):o.status===404?l({type:r,payload:{status:!0,title:"Picker update error",message:"Missing required fields",color:"warning"}}):o.status===500&&l({type:r,payload:{status:!0,title:"Picker update error",message:o.data.message,color:"warning"}})}).catch(o=>{console.error("Error:",o)})}else l({type:r,payload:{status:!0,title:"Error!",message:"Picker update error, Please Check the input fields",color:"warning"}})},$e=t=>{C(!T),Ne(t)},Re=t=>{x.delete(f+"assistant/shopper/delete/"+t,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(l({type:r,payload:{status:!0,title:"Picker Delete",message:"Picker deleted successfully",color:"success"}}),C(!1),w()):s.status===404?l({type:r,payload:{status:!0,title:"Picker remove error",message:s.data.message}}):s.status===500&&l({type:r,payload:{status:!0,title:"Picker remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})};return e.jsxs(Ue,{children:[e.jsx(ge,{to:"/picker/addpicker",className:"picker-link",children:e.jsx(u,{style:{marginLeft:"0%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:"Add Picker"})}),e.jsx(Ye,{style:{marginLeft:"20%"},color:"secondary",children:"Filter by"}),e.jsxs(v,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(A,{style:{color:"white"},children:Se}),e.jsxs(E,{children:[e.jsx(m,{onClick:()=>P("all"),children:"All"}),e.jsx(m,{onClick:()=>P("Milan"),children:"Milan"}),e.jsx(m,{onClick:()=>P("Napoli"),children:"Napoli"})]})]}),e.jsxs(v,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(A,{style:{color:"white"},children:Pe}),e.jsxs(E,{children:[e.jsx(m,{onClick:()=>me("all"),children:"All"}),Ee.map((t,s)=>e.jsx(m,{onClick:()=>me(t.id,t.name),children:t.name},s))]})]}),e.jsxs(v,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(A,{style:{color:"white"},children:we}),e.jsxs(E,{children:[e.jsx(m,{onClick:()=>pe("all"),children:"All"}),ve.map((t,s)=>e.jsx(m,{onClick:()=>pe(t._id,t.name),children:t.name},s))]})]}),e.jsx(qe,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:e.jsx(p,{type:"text",placeholder:"Search by Picker ID",className:"picker-input",value:y,style:{width:450,marginLeft:"0%"},onChange:t=>ke(t.target.value)})}),ye?e.jsx(_e,{}):e.jsxs(Je,{children:[e.jsx(Ke,{children:e.jsxs(Ce,{children:[e.jsx(i,{scope:"col",children:"#"}),e.jsx(i,{scope:"col",children:"Id"}),e.jsx(i,{scope:"col",children:"First Name"}),e.jsx(i,{scope:"col",children:"Last Name"}),e.jsx(i,{scope:"col",children:"Email"}),e.jsx(i,{scope:"col",children:"Phone"}),e.jsx(i,{scope:"col",children:"Country"}),e.jsx(i,{scope:"col",children:"City"}),e.jsx(i,{scope:"col",children:"Language"}),e.jsx(i,{scope:"col",children:"Market"}),e.jsx(i,{scope:"col",children:"Edit"}),e.jsx(i,{scope:"col",children:"Edit Status"}),e.jsx(i,{scope:"col",children:"Action"})]})}),e.jsx(Qe,{children:z.map((t,s)=>{var o,g;return e.jsxs(Ce,{children:[e.jsx(n,{children:s+1}),e.jsx(n,{children:t.code}),e.jsx(n,{children:t.name}),e.jsx(n,{children:t.surname}),e.jsx(n,{children:t.email}),e.jsx(n,{children:t.contact}),e.jsx(n,{children:t.country==="it"||t.country==="Italy"?"Italy":t.country}),e.jsx(n,{children:t.city}),e.jsx(n,{children:t.language==="en"?"English":t.language==="it"?"Italy":t.language==="es"?"Spanish":t.language}),e.jsxs(n,{children:[(g=(o=t.market)==null?void 0:o.chain)==null?void 0:g.name," - ",t.market.address]}),e.jsx(n,{children:e.jsx(ge,{children:e.jsx(je,{icon:We,size:"xl",onClick:()=>Ve(t)})})}),e.jsx(n,{children:t.activate?e.jsx(u,{size:"sm",onClick:()=>xe(t.id,!1),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Deactivate"}):e.jsx(u,{size:"sm",onClick:()=>xe(t.id,!0),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Activate"})}),e.jsx(n,{children:e.jsx(u,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>$e(t.id),children:e.jsx(je,{icon:Xe,size:"lg",style:{color:"white"}})})})]},s)})})]}),e.jsxs(D,{alignment:"center",visible:T,scrollable:!0,size:"sm",onClose:()=>C(!1),children:[e.jsx(L,{closeButton:!1,children:e.jsx(B,{children:"Confirmation"})}),e.jsxs(M,{children:[e.jsx("a",{children:"Are you sure you want to delete this picker?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(u,{onClick:()=>Re(Me),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(u,{onClick:()=>C(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(D,{alignment:"center",visible:N,scrollable:!0,size:"sm",onClose:()=>j(!1),children:[e.jsx(L,{closeButton:!1,children:e.jsx(B,{children:"Confirmation"})}),e.jsxs(M,{children:[e.jsxs("a",{children:["Are you sure you want to ",U?"activate":"deactivate"," this picker?"]}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(u,{onClick:()=>Ie(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(u,{onClick:()=>j(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(D,{visible:Z,scrollable:!0,size:"lg",onClose:()=>b(!1),children:[e.jsx(L,{closeButton:!0,children:e.jsx(B,{children:"Edit Picker Information"})}),e.jsx(M,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(h,{md:6,children:e.jsx(p,{id:"name",label:"Firt Name",defaultValue:d.name,onChange:t=>ee(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"surname",label:"LastName",defaultValue:d.surname,onChange:t=>se(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"address",label:"Address",defaultValue:d.address,onChange:t=>he(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"email",label:"Email",defaultValue:d.email,onChange:t=>le(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"phone",label:"Contact Number",defaultValue:d.contact,onChange:t=>oe(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"iban",label:"IBAN",defaultValue:d.iban,onChange:t=>ne(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"vat",label:"Vat",defaultValue:d.vat,onChange:t=>de(t.target.value)})}),e.jsx(h,{md:6,children:e.jsxs(Ze,{id:"inputState",label:"City",value:S,onChange:t=>ce(t.target.value),children:[e.jsx("option",{children:d.city}),e.jsx("option",{children:"Milano"}),e.jsx("option",{children:"Napoli"})]})}),e.jsx(h,{xs:12,children:e.jsx(u,{type:"submit",style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>Ge(),children:"Update Picker"})})]})})]})]})};export{mt as default};
