import{r as l,y as ie,l as ne,A as n,j as e,h as G,L as b,m as v}from"./index-yStlV239.js";import{a as S}from"./axios-Cm0UX6qg.js";import{B as p}from"./config-HOLfLxHr.js";import{b as de,a as ue}from"./CContainer-DhkLMVU5.js";import{C as he}from"./CNavbar-DO7GSnGJ.js";import{C as u}from"./CFormInput-DWOaSip4.js";import{C as Q,a as U,b as j,c as t,d as Z,e as r}from"./CTable-BohCcCUg.js";import{C as me}from"./CCardImage-Dhg_1Ogo.js";import{c as xe}from"./cil-pencil-m516yCOw.js";import{c as pe}from"./cil-info-CmGCY32x.js";import{C as je,a as _}from"./CPaginationItem-BzOrz1h2.js";import{C as Y,a as q,b as J,c as K}from"./CModalTitle-BlY3Ysnn.js";import{C as Ce}from"./CModalFooter-BE_b0pLY.js";import{C as h}from"./CCol-DwptgYpr.js";import"./CFormLabel-CiFYDw8K.js";import"./DefaultLayout-CZyVa7B9.js";var ge=["512 512","<rect width='288' height='32' x='112' y='152' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='288' height='32' x='112' y='240' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='152' height='32' x='112' y='328' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M480,48H32V464H480ZM448,432H64V80H448Z' class='ci-primary'/>"];const He=()=>{const[E,w]=l.useState(!1),[{user:C,token:c},i]=ie();ne();const[N,P]=l.useState([]),[W,X]=l.useState([]),[I,m]=l.useState(!1),[x,B]=l.useState(0),[T,g]=l.useState(!1),[d,O]=l.useState([]),[k,A]=l.useState(),[z,D]=l.useState(),[H,L]=l.useState(),[V,M]=l.useState(),[f,ee]=l.useState(""),[se,R]=l.useState(!0);l.useEffect(()=>{C&&c&&y(0)},[C,c,f]);const y=(s,o)=>{m(!0),S.get(p+"assistant/customers/"+s+"?email="+f,{headers:{Authorization:`Bearer ${c}`}}).then(a=>{console.log(a.status),a.status===200?(P(a.data),m(!1),console.log(p),a.data.length<50?(R(!0),console.log("ok")):a.data.length>49&&R(!1)):a.status===500&&i({type:n,payload:{status:!0,title:"Customers loading error",message:a.data.message}})}).catch(a=>{console.error("Error:",a)})},ae=()=>{const s=x+50;B(s),y(s)},te=()=>{const s=x-50;console.log(s),B(s),y(s)},re=s=>{w(!E),c&&(m(!0),S.get(p+"assistant/addresses/customer/"+s,{headers:{Authorization:`Bearer ${c}`}}).then(o=>{o.status===200?(X(o.data),m(!1)):o.status===500&&i({type:n,payload:{status:!0,title:"Customers address error",message:o.data.message}})}).catch(o=>{console.error("Customers address:",o)}))},oe=s=>{console.log(s),g(!T),O(s),A(s.name),D(s.surname),L(s.email),M(s.contact)},le=()=>{if(k&&z&&H&&V){const s={name:k,surname:z,email:H,contact:V},o=d.id;c&&C&&c&&S.patch(p+"assistant/customers/update/"+o,s,{headers:{Authorization:`Bearer ${c}`}}).then(a=>{if(a.status===200){g(!1);const F=a.data,ce=N.map($=>$.id===F.id?F:$);P([...ce])}else a.status===203?i({type:n,payload:{status:!0,title:"Customer update error",message:a.data.message,color:"warning"}}):a.status===204?i({type:n,payload:{status:!0,title:"Customer update error",message:a.data.message,color:"warning"}}):a.status===500&&i({type:n,payload:{status:!0,title:"Customer update error",message:a.data.message,color:"warning"}})}).catch(a=>{console.error("Error:",a)})}else i({type:n,payload:{status:!0,title:"Error!",message:"Customer update error, Please Check the input fields",color:"warning"}})};return e.jsxs(de,{children:[e.jsx(he,{className:"bg-body-tertiary",children:e.jsx(u,{type:"text",placeholder:"Search by customer email",style:{width:450,marginLeft:"0%"},value:f,onChange:s=>ee(s.target.value)})}),I?e.jsx(G,{}):e.jsxs(Q,{children:[e.jsx(U,{children:e.jsxs(j,{children:[e.jsx(t,{scope:"col",children:"#"}),e.jsx(t,{scope:"col",children:"Photo"}),e.jsx(t,{scope:"col",children:"Name"}),e.jsx(t,{scope:"col",children:"Surname"}),e.jsx(t,{scope:"col",children:"email"}),e.jsx(t,{scope:"col",children:"Contact"}),e.jsx(t,{scope:"col",children:"Country"}),e.jsx(t,{scope:"col",children:"Language"}),e.jsx(t,{scope:"col",children:"Edit"}),e.jsx(t,{scope:"col",children:"Address"}),e.jsx(t,{scope:"col",children:"Grocery"})]})}),e.jsx(Z,{children:N.map((s,o)=>e.jsxs(j,{children:[e.jsx(r,{children:x+o+1}),e.jsx(t,{scope:"row",children:e.jsx(me,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.photo})}),e.jsx(r,{children:s.name}),e.jsx(r,{children:s.surname}),e.jsx(r,{children:s.email}),e.jsx(r,{children:s.contact}),e.jsx(r,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(r,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language}),e.jsx(r,{children:e.jsx(b,{children:e.jsx(v,{icon:xe,size:"xl",onClick:()=>oe(s)})})}),e.jsx(r,{children:e.jsx(b,{children:e.jsx(v,{icon:pe,size:"xl",onClick:()=>re(s.id)})})}),e.jsx(r,{children:e.jsx(b,{to:`/customers/list/${s.id}`,children:e.jsx(v,{icon:ge,size:"xl"})})})]},o))})]}),e.jsxs(je,{"aria-label":"Page navigation example",children:[e.jsx(_,{disabled:x<=0,onClick:te,children:"Previous"}),e.jsx(_,{disabled:se===!0,onClick:ae,children:"Next"})]}),e.jsxs(Y,{visible:E,scrollable:!0,size:"xl",onClose:()=>w(!1),children:[e.jsx(q,{closeButton:!0,children:e.jsx(J,{children:"Order Grocery List"})}),e.jsx(K,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:I?e.jsx(G,{}):e.jsxs(Q,{children:[e.jsx(U,{children:e.jsxs(j,{children:[e.jsx(t,{scope:"col",children:"#"}),e.jsx(t,{scope:"col",children:"Name"}),e.jsx(t,{scope:"col",children:"Intercom"}),e.jsx(t,{scope:"col",children:"Flat"}),e.jsx(t,{scope:"col",children:"Street"}),e.jsx(t,{scope:"col",children:"House Number"})]})}),e.jsx(Z,{children:W.map((s,o)=>e.jsxs(j,{children:[e.jsx(r,{scope:"row",children:o+1}),e.jsx(r,{children:s.name}),e.jsx(r,{children:s.intercom}),e.jsx(r,{children:s.flat}),e.jsx(r,{children:s.street}),e.jsx(r,{children:s.houseNumber})]},o))})]})}),e.jsx(Ce,{})]}),e.jsxs(Y,{visible:T,scrollable:!0,size:"lg",onClose:()=>g(!1),children:[e.jsx(q,{closeButton:!0,children:e.jsx(J,{children:"Edit Customer Information"})}),e.jsx(K,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(h,{md:6,children:e.jsx(u,{id:"name",label:"Firt Name",defaultValue:d.name,onChange:s=>A(s.target.value)})}),e.jsx(h,{md:6,children:e.jsx(u,{id:"surname",label:"LastName",defaultValue:d.surname,onChange:s=>D(s.target.value)})}),e.jsx(h,{md:6,children:e.jsx(u,{id:"email",label:"Email",defaultValue:d.email,onChange:s=>L(s.target.value)})}),e.jsx(h,{md:6,children:e.jsx(u,{id:"phone",label:"Contact Number",defaultValue:d.contact,onChange:s=>M(s.target.value)})}),e.jsx(h,{xs:12,children:e.jsx(ue,{type:"submit",style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>le(),children:"Update Customer"})})]})})]})]})};export{He as default};