import{r as a,y as He,A as r,j as e,L as je,h as _e,m as Ce}from"./index-CJhmNy2g.js";import{a as x}from"./axios-Cm0UX6qg.js";/* empty css               */import{B as f}from"./config-HOLfLxHr.js";import{b as Ue,a as u}from"./CContainer-DiSFBEfd.js";import{d as Ye,C as P,a as v,b as A,c as m}from"./DefaultLayout-CAwAg_Gg.js";import{C as qe}from"./CNavbar-EvOJOPJz.js";import{C as p}from"./CFormInput-BrBU0AXX.js";import{C as Je,a as Ke,b as ye,c as n,d as Qe,e as c}from"./CTable-5XNdRfB0.js";import{c as We}from"./cil-pencil-m516yCOw.js";import{c as Xe}from"./cil-trash-CBbKHhHb.js";import{C as E,a as D,b as L,c as B}from"./CModalTitle-DRU8BoUK.js";import{C as h}from"./CCol-Bkp8ZlQW.js";import{C as Ze}from"./CFormSelect-BHNjUEeu.js";import"./CFormLabel-D0xhR0jf.js";const mt=()=>{const[N,j]=a.useState(!1),[M,C]=a.useState(!1),[{user:k,token:i},l]=He(),[z,I]=a.useState([]),[ke,T]=a.useState(!1),[V,G]=a.useState(""),[$,R]=a.useState(""),[F,H]=a.useState(""),[y,be]=a.useState(""),[_,U]=a.useState(!1),[Y,q]=a.useState(""),[Se,J]=a.useState(!1),[we,K]=a.useState("All Cities"),[Pe,Q]=a.useState("All Market Groups"),[ve,W]=a.useState("All Chains"),[Ae,Ee]=a.useState([]),[De,Le]=a.useState([]),[X,b]=a.useState(!1),[d,Be]=a.useState([]),[Z,O]=a.useState(),[ee,te]=a.useState(),[se,ae]=a.useState(),[le,re]=a.useState(),[oe,ie]=a.useState(),[S,ne]=a.useState(),[ce,de]=a.useState(),[ue,he]=a.useState(),[Ne,Me]=a.useState();a.useEffect(()=>{ze(),Ie()},[]);const ze=()=>{i&&x.get(f+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?Ee(t.data):t.status===500&&l({type:r,payload:{status:!0,title:"Market Group Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},Ie=()=>{i&&x.get(f+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?Le(t.data):t.status===500&&l({type:r,payload:{status:!0,title:"Chain Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})};a.useEffect(()=>{pe()},[V,$,F,y,Se]);const pe=()=>{if(k&&i){T(!0);let t=f+`assistant/shoppers/:skip?city=${V}&group=${$}&chain=${F}`;y&&(t+=`&code=${y}`),x.get(t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(I(s.data),T(!1),J(!1)):s.status===500&&l({type:r,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)})}},w=t=>{t==="all"?(G(""),K("All Cities")):(G(t),K(t))},me=(t,s)=>{t==="all"?(R(""),Q("All Market Groups")):(R(t),Q(s))},xe=(t,s)=>{t==="all"?(H(""),W("All Chains")):(H(t),W(s))},fe=(t,s)=>{j(!N),U(s),q(t)},Te=()=>{const t={status:_};console.log(Y,t),k&&i&&x.patch(f+"assistant/shopper/status/"+Y,t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(console.log("updated"),j(!1),U(""),q(""),J(!0),l({type:r,payload:{status:!0,title:"Picker status update",message:"Picker status updated successfully",color:"success"}})):s.status===203?l({type:r,payload:{status:!0,title:"Picker status update error",message:s.data.message}}):s.status===204?l({type:r,payload:{status:!0,title:"Picker status update error",message:s.data.message}}):s.status===500&&l({type:r,payload:{status:!0,title:"Picker status update error",message:s.data.message}})}).catch(s=>{console.error(s)})},Ve=t=>{b(!X),Be(t),O(t.name),te(t.surname),ae(t.email),re(t.contact),ie(t.iban),ne(t.city),he(t.address),de(t.vat)},Ge=()=>{if(Z&&ee&&se&&le&&oe&&S&&ce&&ue){const t={name:Z,surname:ee,email:se,contact:le,iban:oe,city:S,vat:ce,address:ue},s=d.id;i&&k&&i&&x.patch(f+"assistant/shopper/update/"+s,t,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{if(o.status===200){console.log(o.data),b(!1);const g=o.data,Fe=z.map(ge=>ge.id===g.id?(console.log("update obj"),g):ge);I([...Fe]),l({type:r,payload:{status:!0,title:"Picker update",message:"Picker updated successfully",color:"success"}})}else o.status===203?l({type:r,payload:{status:!0,title:"Picker update error",message:o.data.message,color:"warning"}}):o.status===204?l({type:r,payload:{status:!0,title:"Picker update error",message:o.data.message,color:"warning"}}):o.status===500&&l({type:r,payload:{status:!0,title:"Picker update error",message:o.data.message,color:"warning"}})}).catch(o=>{console.error("Error:",o)})}else l({type:r,payload:{status:!0,title:"Error!",message:"Picker update error, Please Check the input fields",color:"warning"}})},$e=t=>{C(!M),Me(t)},Re=t=>{x.delete(f+"assistant/shopper/delete/"+t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(l({type:r,payload:{status:!0,title:"Picker Delete",message:"Picker deleted successfully",color:"success"}}),C(!1),pe()):s.status===404?l({type:r,payload:{status:!0,title:"Picker remove error",message:s.data.message}}):s.status===500&&l({type:r,payload:{status:!0,title:"Picker remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})};return e.jsxs(Ue,{children:[e.jsx(je,{to:"/picker/addpicker",className:"picker-link",children:e.jsx(u,{style:{marginLeft:"0%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:"Add Picker"})}),e.jsx(Ye,{style:{marginLeft:"20%"},color:"secondary",children:"Filter by"}),e.jsxs(P,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(v,{style:{color:"white"},children:we}),e.jsxs(A,{children:[e.jsx(m,{onClick:()=>w("all"),children:"All"}),e.jsx(m,{onClick:()=>w("Milan"),children:"Milan"}),e.jsx(m,{onClick:()=>w("Napoli"),children:"Napoli"})]})]}),e.jsxs(P,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(v,{style:{color:"white"},children:ve}),e.jsxs(A,{children:[e.jsx(m,{onClick:()=>xe("all"),children:"All"}),De.map((t,s)=>e.jsx(m,{onClick:()=>xe(t.id,t.name),children:t.name},s))]})]}),e.jsxs(P,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(v,{style:{color:"white"},children:Pe}),e.jsxs(A,{children:[e.jsx(m,{onClick:()=>me("all"),children:"All"}),Ae.map((t,s)=>e.jsx(m,{onClick:()=>me(t._id,t.name),children:t.name},s))]})]}),e.jsx(qe,{className:"bg-body-tertiary",children:e.jsx(p,{type:"text",placeholder:"Search by Picker ID",className:"picker-input",value:y,style:{width:450,marginLeft:"0%"},onChange:t=>be(t.target.value)})}),ke?e.jsx(_e,{}):e.jsxs(Je,{children:[e.jsx(Ke,{children:e.jsxs(ye,{children:[e.jsx(n,{scope:"col",children:"Id"}),e.jsx(n,{scope:"col",children:"First Name"}),e.jsx(n,{scope:"col",children:"Last Name"}),e.jsx(n,{scope:"col",children:"Email"}),e.jsx(n,{scope:"col",children:"Phone"}),e.jsx(n,{scope:"col",children:"Country"}),e.jsx(n,{scope:"col",children:"City"}),e.jsx(n,{scope:"col",children:"Language"}),e.jsx(n,{scope:"col",children:"Market"}),e.jsx(n,{scope:"col",children:"Edit"}),e.jsx(n,{scope:"col",children:"Edit Status"}),e.jsx(n,{scope:"col",children:"Action"})]})}),e.jsx(Qe,{children:z.map((t,s)=>{var o,g;return e.jsxs(ye,{children:[e.jsx(c,{children:t.code}),e.jsx(c,{children:t.name}),e.jsx(c,{children:t.surname}),e.jsx(c,{children:t.email}),e.jsx(c,{children:t.contact}),e.jsx(c,{children:t.country==="it"||t.country==="Italy"?"Italy":t.country}),e.jsx(c,{children:t.city}),e.jsx(c,{children:t.language==="en"?"English":t.language==="it"?"Italy":t.language==="es"?"Spanish":t.language}),e.jsxs(c,{children:[(g=(o=t.market)==null?void 0:o.chain)==null?void 0:g.name," - ",t.market.address]}),e.jsx(c,{children:e.jsx(je,{children:e.jsx(Ce,{icon:We,size:"xl",onClick:()=>Ve(t)})})}),e.jsx(c,{children:t.activate?e.jsx(u,{size:"sm",onClick:()=>fe(t.id,!1),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Deactivate"}):e.jsx(u,{size:"sm",onClick:()=>fe(t.id,!0),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Activate"})}),e.jsx(c,{children:e.jsx(u,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>$e(t.id),children:e.jsx(Ce,{icon:Xe,size:"lg",style:{color:"white"}})})})]},s)})})]}),e.jsxs(E,{alignment:"center",visible:M,scrollable:!0,size:"sm",onClose:()=>C(!1),children:[e.jsx(D,{closeButton:!1,children:e.jsx(L,{children:"Confirmation"})}),e.jsxs(B,{children:[e.jsx("a",{children:"Are you sure you want to delete this picker?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(u,{onClick:()=>Re(Ne),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(u,{onClick:()=>C(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(E,{alignment:"center",visible:N,scrollable:!0,size:"sm",onClose:()=>j(!1),children:[e.jsx(D,{closeButton:!1,children:e.jsx(L,{children:"Confirmation"})}),e.jsxs(B,{children:[e.jsxs("a",{children:["Are you sure you want to ",_?"activate":"deactivate"," this picker?"]}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(u,{onClick:()=>Te(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(u,{onClick:()=>j(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(E,{visible:X,scrollable:!0,size:"lg",onClose:()=>b(!1),children:[e.jsx(D,{closeButton:!0,children:e.jsx(L,{children:"Edit Picker Information"})}),e.jsx(B,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(h,{md:6,children:e.jsx(p,{id:"name",label:"Firt Name",defaultValue:d.name,onChange:t=>O(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"surname",label:"LastName",defaultValue:d.surname,onChange:t=>te(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"address",label:"Address",defaultValue:d.address,onChange:t=>he(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"email",label:"Email",defaultValue:d.email,onChange:t=>ae(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"phone",label:"Contact Number",defaultValue:d.contact,onChange:t=>re(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"iban",label:"IBAN",defaultValue:d.iban,onChange:t=>ie(t.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"vat",label:"Vat",defaultValue:d.vat,onChange:t=>de(t.target.value)})}),e.jsx(h,{md:6,children:e.jsxs(Ze,{id:"inputState",label:"City",value:S,onChange:t=>ne(t.target.value),children:[e.jsx("option",{children:d.city}),e.jsx("option",{children:"Milano"}),e.jsx("option",{children:"Napoli"})]})}),e.jsx(h,{xs:12,children:e.jsx(u,{type:"submit",style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>Ge(),children:"Update Picker"})})]})})]})]})};export{mt as default};
