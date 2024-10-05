import{r as a,y as Oe,l as es,A as o,j as e,L as ve,h as ss,m as we}from"./index-B08OXeWv.js";import{a as g}from"./axios-Cm0UX6qg.js";/* empty css               */import{B as f}from"./config-HOLfLxHr.js";import{b as ts,a as h}from"./CContainer-Bcycrjrg.js";import{C as be,a as V,b as G,c as $,d as x}from"./DefaultLayout-ZVM7TRL_.js";import{C as as}from"./CNavbar-CI1ooECg.js";import{C as p}from"./CFormInput-BdPiiS44.js";import{C as rs,a as ls,b as De,c as n,d as os,e as d}from"./CTable-isbk2Vch.js";import{c as is}from"./cil-pencil-m516yCOw.js";import{c as ns}from"./cil-trash-CBbKHhHb.js";import{C as k,a as S,b as E,c as P}from"./CModalTitle-BEzJ5tl5.js";import{C as c}from"./CCol-Ch6GpG3I.js";import{C as ds}from"./CModalFooter-CT0DeHo_.js";import{C as cs}from"./CFormSelect-DJZLYiOh.js";import"./CFormLabel-SAczgcRM.js";const Es=()=>{const[F,C]=a.useState(!1),[U,v]=a.useState(!1),[{user:w,token:i},l]=Oe(),[A,T]=a.useState([]),[ke,B]=a.useState(!1),[H,_]=a.useState(""),[Y,q]=a.useState(""),[J,K]=a.useState(""),[m,Se]=a.useState(""),[Ee,Q]=a.useState(m),[L,W]=a.useState(!1),[X,Z]=a.useState("");es();const[Pe,Ae]=a.useState(!1),[Te,O]=a.useState("All Cities"),[Be,ee]=a.useState("All Market Groups"),[Le,se]=a.useState("All Chains"),[Ne,Me]=a.useState([]),[ze,Ie]=a.useState([]),[te,y]=a.useState(!1),[u,Re]=a.useState([]),[ae,re]=a.useState(),[le,oe]=a.useState(),[ie,ne]=a.useState(),[de,ce]=a.useState(),[ue,he]=a.useState(),[N,pe]=a.useState(),[Ve,me]=a.useState(),[ge,fe]=a.useState(),[Ge,$e]=a.useState(),[b,Fe]=a.useState(""),[M,Ue]=a.useState(""),[He,z]=a.useState(!1);a.useEffect(()=>{_e(),Ye()},[]);const _e=()=>{i&&g.get(f+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?Me(s.data):s.status===500&&l({type:o,payload:{status:!0,title:"Market Group Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},Ye=()=>{i&&g.get(f+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(Ie(s.data),Ae(!1)):s.status===500&&l({type:o,payload:{status:!0,title:"Chain Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})};a.useEffect(()=>{const s=setTimeout(()=>{l({type:o,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),B(!1)},2e4);return I(s),()=>{clearTimeout(s)}},[H,Y,J,Ee,Pe]),a.useEffect(()=>{const s=setTimeout(()=>{(m.length>=3||m.length===0)&&Q(m)},500);return()=>{clearTimeout(s)}},[m]);const I=s=>{if(w&&i){B(!0);let t=f+`assistant/riders/0?city=${H}&group=${Y}&chain=${J}&code=${m}`;g.get(t,{headers:{Authorization:`Bearer ${i}`}}).then(r=>{r.status===200?(T(r.data),B(!1),clearTimeout(s)):r.status===500&&l({type:o,payload:{status:!0,title:"Error",message:r.data.message,color:"warning"}})}).catch(r=>{console.error("Error:",r)})}},R=s=>{s==="all"?(_(""),O("All Cities")):(_(s),O(s))},xe=(s,t)=>{s==="all"?(q(""),ee("All Market Groups")):(q(s),ee(t))},je=(s,t)=>{s==="all"?(K(""),se("All Chains")):(K(s),se(t))},ye=(s,t)=>{C(!F),W(t),Z(s)},qe=()=>{const s={status:L};console.log(L),console.log(X,s),w&&i&&g.patch(f+"assistant/rider/status/"+X,s,{headers:{Authorization:`Bearer ${i}`}}).then(t=>{if(t.status===200){console.log("updated",t.data),C(!1),W(""),Z("");const r=t.data,j=A.map(D=>D.id===r.id?r:D);T([...j]),l({type:o,payload:{status:!0,title:"Driver status update",message:"Driver status updated successfully",color:"success"}})}else t.status===203?l({type:o,payload:{status:!0,title:"Driver status update error",message:t.data.message}}):t.status===204?l({type:o,payload:{status:!0,title:"Driver status update error",message:t.data.message}}):t.status===500&&l({type:o,payload:{status:!0,title:"Driver status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},Je=s=>{y(!te),Re(s),re(s.name),oe(s.surname),ne(s.email),ce(s.contact),he(s.iban),pe(s.city),fe(s.address),me(s.vat)},Ke=()=>{if(ae&&le&&ie&&de&&ue&&N&&ge){const s={name:ae,surname:le,email:ie,contact:de,iban:ue,city:N,vat:Ve,address:ge},t=u.id;i&&w&&i&&g.patch(f+"assistant/rider/update/"+t,s,{headers:{Authorization:`Bearer ${i}`}}).then(r=>{if(r.status===200){y(!1);const j=r.data,D=A.map(Ce=>Ce.id===j.id?j:Ce);T([...D]),I(),l({type:o,payload:{status:!0,title:"Driver update",message:"Driver updated successfully",color:"success"}})}else r.status===203?l({type:o,payload:{status:!0,title:"Driver update error",message:"Email already exist",color:"warning"}}):r.status===204?(console.log(r.message),l({type:o,payload:{status:!0,title:"Driver update error",message:"Something is missing",color:"warning"}})):r.status===404?(console.log(r.message),l({type:o,payload:{status:!0,title:"Driver update error",message:"Driver not found",color:"warning"}})):r.status===500&&l({type:o,payload:{status:!0,title:"Driver update error",message:r.data.message,color:"warning"}})}).catch(r=>{console.error("Error:",r)})}else l({type:o,payload:{status:!0,title:"Error!",message:"Picker update error, Please Check the input fields",color:"warning"}})},Qe=s=>{v(!U),$e(s)},We=s=>{g.delete(f+"assistant/rider/delete/"+s,{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?(l({type:o,payload:{status:!0,title:"Driver Delete",message:"Driver deleted successfully",color:"success"}}),v(!1),I()):t.status===404?l({type:o,payload:{status:!0,title:"Driver remove error",message:t.data.message}}):t.status===500&&l({type:o,payload:{status:!0,title:"Driver remove error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},Xe=()=>{y(!1),z(!0)},Ze=s=>{if(b===""||M==="")l({type:o,payload:{status:!0,title:"Password update error",message:"Check the input fields",color:"warning"}});else if(b===M){const t={passcode:b};console.log(t,s),w&&i&&g.patch(f+"assistant/rider/update/"+s,t,{headers:{Authorization:`Bearer ${i}`}}).then(r=>{r.status===200?(z(!1),l({type:o,payload:{status:!0,title:"Password update",message:"Password updated successfully",color:"success"}}),y(!0)):r.status===204?l({type:o,payload:{status:!0,title:"Password update error",message:r.data.message}}):r.status===404?l({type:o,payload:{status:!0,title:"Password update error",message:r.data.message}}):r.status===500&&l({type:o,payload:{status:!0,title:"Password update error",message:r.data.message}})}).catch(r=>{console.error(r)})}else l(b!==M?{type:o,payload:{status:!0,title:"Password update error",message:"Password does not match",color:"warning"}}:{type:o,payload:{status:!0,title:"Password update error",message:"Password update error or check the input fields",color:"warning"}})};return e.jsxs(ts,{children:[e.jsx(ve,{to:"/driver/adddriver",className:"picker-link",children:e.jsx(h,{style:{marginLeft:"0%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:"Add Driver"})}),e.jsx(be,{style:{marginLeft:"20%"},color:"secondary",children:"Filter by"}),e.jsxs(V,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(G,{style:{color:"white"},children:Te}),e.jsxs($,{children:[e.jsx(x,{onClick:()=>R("all"),children:"All"}),e.jsx(x,{onClick:()=>R("Milan"),children:"Milan"}),e.jsx(x,{onClick:()=>R("Napoli"),children:"Napoli"})]})]}),e.jsxs(V,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(G,{style:{color:"white"},children:Le}),e.jsxs($,{children:[e.jsx(x,{onClick:()=>je("all"),children:"All"}),ze.map((s,t)=>e.jsx(x,{onClick:()=>je(s.id,s.name),children:s.name},t))]})]}),e.jsxs(V,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(G,{style:{color:"white"},children:Be}),e.jsxs($,{children:[e.jsx(x,{onClick:()=>xe("all"),children:"All"}),Ne.map((s,t)=>e.jsx(x,{onClick:()=>xe(s._id,s.name),children:s.name},t))]})]}),e.jsx(as,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:e.jsx(p,{type:"text",placeholder:"Search by Driver id, name, surname, email and contact",style:{width:450,marginLeft:"0%"},value:m,onChange:s=>Se(s.target.value)})}),ke?e.jsx(ss,{}):e.jsxs(rs,{children:[e.jsx(ls,{children:e.jsxs(De,{children:[e.jsx(n,{scope:"col",children:"#"}),e.jsx(n,{scope:"col",children:"Id"}),e.jsx(n,{scope:"col",children:"First Name"}),e.jsx(n,{scope:"col",children:"Last Name"}),e.jsx(n,{scope:"col",children:"Email"}),e.jsx(n,{scope:"col",children:"Phone"}),e.jsx(n,{scope:"col",children:"City"}),e.jsx(n,{scope:"col",children:"Country"}),e.jsx(n,{scope:"col",children:"Employee ID"}),e.jsx(n,{scope:"col",children:"Language"}),e.jsx(n,{scope:"col",children:"Group"}),e.jsx(n,{scope:"col",children:"Edit"}),e.jsx(n,{scope:"col",children:"Edit Status"}),e.jsx(n,{scope:"col",children:"Action"})]})}),e.jsx(os,{children:A.map((s,t)=>e.jsxs(De,{children:[e.jsx(d,{children:t+1}),e.jsx(d,{children:s.code}),e.jsx(d,{children:s.name}),e.jsx(d,{children:s.surname}),e.jsx(d,{children:s.email}),e.jsx(d,{children:s.contact}),e.jsx(d,{children:s.city}),e.jsx(d,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(d,{children:s.employeeId?s.employeeId:e.jsx(be,{color:"warning",children:"Not Provide"})}),e.jsx(d,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language==="es"?"Spanish":s.language}),e.jsx(d,{children:s.groups.map((r,j)=>e.jsx("div",{children:r.name},j))}),e.jsx(d,{children:e.jsx(ve,{children:e.jsx(we,{icon:is,size:"xl",onClick:()=>Je(s)})})}),e.jsx(d,{children:s.activate?e.jsx(h,{size:"sm",onClick:()=>ye(s.id,!1),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Deactivate"}):e.jsx(h,{size:"sm",onClick:()=>ye(s.id,!0),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Activate"})}),e.jsx(d,{children:e.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>Qe(s.id),children:e.jsx(we,{icon:ns,size:"lg",style:{color:"white"}})})})]},t))})]}),e.jsxs(k,{alignment:"center",visible:He,scrollable:!0,size:"sm",onClose:()=>z(!1),children:[e.jsx(S,{closeButton:!0,children:e.jsx(E,{children:"Update Password"})}),e.jsxs(P,{children:[e.jsx(c,{md:12,children:e.jsx(p,{id:"password",label:"Enter New Password",type:"password",onChange:s=>Fe(s.target.value)})}),e.jsx("br",{}),e.jsx(c,{md:12,children:e.jsx(p,{id:"repassword",label:"Re Enter Password",type:"password",onChange:s=>Ue(s.target.value)})})]}),e.jsx(ds,{children:e.jsx(h,{type:"submit",style:{marginBottom:"3%",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{Ze(u.id)},children:"Update"})})]}),e.jsxs(k,{alignment:"center",visible:U,scrollable:!0,size:"sm",onClose:()=>v(!1),children:[e.jsx(S,{closeButton:!1,children:e.jsx(E,{children:"Confirmation"})}),e.jsxs(P,{children:[e.jsx("a",{children:"Are you sure you want to delete this driver?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(h,{onClick:()=>We(Ge),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(h,{onClick:()=>v(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(k,{alignment:"center",visible:F,scrollable:!0,size:"sm",onClose:()=>C(!1),children:[e.jsx(S,{closeButton:!1,children:e.jsx(E,{children:"Confirmation"})}),e.jsxs(P,{children:[e.jsxs("a",{children:["Are you sure you want to ",L?"activate":"deactivate"," this driver?"]}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(h,{onClick:()=>qe(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(h,{onClick:()=>C(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(k,{visible:te,scrollable:!0,size:"lg",onClose:()=>y(!1),children:[e.jsx(S,{closeButton:!0,children:e.jsx(E,{children:"Edit Driver Information"})}),e.jsx(P,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(c,{md:6,children:e.jsx(p,{id:"name",label:"Firt Name",defaultValue:u.name,onChange:s=>re(s.target.value)})}),e.jsx(c,{md:6,children:e.jsx(p,{id:"surname",label:"LastName",defaultValue:u.surname,onChange:s=>oe(s.target.value)})}),e.jsx(c,{md:6,children:e.jsx(p,{id:"address",label:"Address",defaultValue:u.address,onChange:s=>fe(s.target.value)})}),e.jsx(c,{md:6,children:e.jsx(p,{id:"email",label:"Email",defaultValue:u.email,onChange:s=>ne(s.target.value)})}),e.jsx(c,{md:6,children:e.jsx(p,{id:"phone",label:"Contact Number",defaultValue:u.contact,onChange:s=>ce(s.target.value)})}),e.jsx(c,{md:6,children:e.jsx(p,{id:"iban",label:"IBAN",defaultValue:u.iban,onChange:s=>he(s.target.value)})}),e.jsx(c,{md:6,children:e.jsx(p,{id:"vat",label:"Vat",defaultValue:u.vat,onChange:s=>me(s.target.value)})}),e.jsx(c,{md:6,children:e.jsxs(cs,{id:"inputState",label:"City",value:N,onChange:s=>pe(s.target.value),children:[e.jsx("option",{children:u.city}),e.jsx("option",{children:"Milano"}),e.jsx("option",{children:"Napoli"})]})}),e.jsx(c,{xs:6,children:e.jsx(h,{style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>Ke(),children:"Update Rider"})}),e.jsx(c,{xs:6,children:e.jsx("span",{style:{fontSize:15,color:"red",cursor:"pointer",marginLeft:"64%",marginTop:"10%"},onClick:()=>Xe(),children:"Change Password"})})]})})]})]})};export{Es as default};
