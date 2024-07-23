import{r,y as ge,l as je,A as d,j as e,h as Z,L as w,m as E}from"./index-DAsP9voM.js";import{a as T}from"./axios-Cm0UX6qg.js";import{B as C}from"./config-HOLfLxHr.js";import{b as Ce,a as fe}from"./CContainer-CNWVNE3j.js";import{C as ye}from"./CNavbar-ll-tvqBp.js";import{C as h}from"./CFormInput-DnKel7m3.js";import{C as Y,a as q,b as f,c as o,d as J,e as l}from"./CTable-DPdXPM9f.js";import{C as be}from"./CCardImage-Mnc8MyEA.js";import{c as Se}from"./cil-pencil-m516yCOw.js";import{c as ve}from"./cil-info-CmGCY32x.js";import{C as Pe,a as I}from"./CPaginationItem-B4Olwi_8.js";import{C as K,a as W,b as X,c as O}from"./CModalTitle-Dzz95ONy.js";import{C as Ne}from"./CModalFooter-CssSBCca.js";import{C as m}from"./CCol-u8lcIiop.js";import"./CFormLabel-LzdqjwNr.js";import"./DefaultLayout-C20riYYY.js";var we=["512 512","<rect width='288' height='32' x='112' y='152' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='288' height='32' x='112' y='240' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='152' height='32' x='112' y='328' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M480,48H32V464H480ZM448,432H64V80H448Z' class='ci-primary'/>"];const Ge=()=>{const[M,k]=r.useState(!1),[{user:y,token:c},n]=ge();je();const[B,D]=r.useState([]),[ee,se]=r.useState([]),[te,L]=r.useState(!1),[ae,b]=r.useState(!1),[x,S]=r.useState(0),[A,v]=r.useState(!1),[u,re]=r.useState([]),[z,H]=r.useState(),[V,R]=r.useState(),[F,_]=r.useState(),[$,G]=r.useState(),[P,oe]=r.useState(""),[le,Q]=r.useState(!0),[ie,ce]=r.useState(0);r.useState(0);const[p,N]=r.useState(1);r.useEffect(()=>{const s=setTimeout(()=>{n({type:d,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),b(!1)},2e4);return y&&c&&g(0,s),()=>{clearTimeout(s)}},[y,c,P]);const g=(s,t)=>{b(!0),T.get(C+"assistant/customers/"+s+"?email="+P,{headers:{Authorization:`Bearer ${c}`}}).then(a=>{a.status===200?(D(a.data.list),ce(a.data.count),b(!1),clearTimeout(t),console.log(C),a.data.list.length<50?(Q(!0),console.log("ok")):a.data.list.length>49&&Q(!1)):a.status===500&&n({type:d,payload:{status:!0,title:"Customers loading error",message:a.data.message}})}).catch(a=>{console.error("Error:",a)})},ne=()=>{N(p+1);const s=x+50;S(s),g(s,!0)},de=()=>{N(p-1);const s=x-50;console.log(s),S(s),g(s,!1)},ue=s=>{k(!M),c&&(L(!0),T.get(C+"assistant/addresses/customer/"+s,{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?(console.log(t.data),se(t.data),L(!1)):t.status===500&&n({type:d,payload:{status:!0,title:"Customers address error",message:t.data.message}})}).catch(t=>{console.error("Customers address:",t)}))},he=s=>{console.log(s),v(!A),re(s),H(s.name),R(s.surname),_(s.email),G(s.contact)},me=()=>{if(z&&V&&F&&$){const s={name:z,surname:V,email:F,contact:$},t=u.id;c&&y&&c&&T.patch(C+"assistant/customers/update/"+t,s,{headers:{Authorization:`Bearer ${c}`}}).then(a=>{if(a.status===200){v(!1);const j=a.data,U=B.map(i=>i.id===j.id?j:i);D([...U])}else a.status===203?n({type:d,payload:{status:!0,title:"Customer update error",message:a.data.message,color:"warning"}}):a.status===204?n({type:d,payload:{status:!0,title:"Customer update error",message:a.data.message,color:"warning"}}):a.status===500&&n({type:d,payload:{status:!0,title:"Customer update error",message:a.data.message,color:"warning"}})}).catch(a=>{console.error("Error:",a)})}else n({type:d,payload:{status:!0,title:"Error!",message:"Customer update error, Please Check the input fields",color:"warning"}})},xe=s=>{N(s);const t=(s-1)*50;S(t),g(t,!0)},pe=()=>{const s=Math.ceil(ie/50),t=[];for(let i=1;i<=s;i++)t.push(i);const a=Math.max(p-2,1),j=Math.min(a+4,s);return t.slice(a-1,j).map(i=>e.jsx(I,{active:p===i,onClick:()=>xe(i),children:i},i))};return e.jsxs(Ce,{children:[e.jsx(ye,{className:"bg-body-tertiary",children:e.jsx(h,{type:"text",placeholder:"Search by customer email",style:{width:450,marginLeft:"0%"},value:P,onChange:s=>oe(s.target.value)})}),ae?e.jsx(Z,{}):e.jsxs(Y,{children:[e.jsx(q,{children:e.jsxs(f,{children:[e.jsx(o,{scope:"col",children:"#"}),e.jsx(o,{scope:"col",children:"Photo"}),e.jsx(o,{scope:"col",children:"Name"}),e.jsx(o,{scope:"col",children:"Surname"}),e.jsx(o,{scope:"col",children:"email"}),e.jsx(o,{scope:"col",children:"Contact"}),e.jsx(o,{scope:"col",children:"Country"}),e.jsx(o,{scope:"col",children:"Language"}),e.jsx(o,{scope:"col",children:"Edit"}),e.jsx(o,{scope:"col",children:"Address"}),e.jsx(o,{scope:"col",children:"Grocery"})]})}),e.jsx(J,{children:B.map((s,t)=>e.jsxs(f,{children:[e.jsx(l,{children:x+t+1}),e.jsx(o,{scope:"row",children:e.jsx(be,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.photo})}),e.jsx(l,{children:s.name}),e.jsx(l,{children:s.surname}),e.jsx(l,{children:s.email}),e.jsx(l,{children:s.contact}),e.jsx(l,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(l,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language}),e.jsx(l,{children:e.jsx(w,{children:e.jsx(E,{icon:Se,size:"xl",onClick:()=>he(s)})})}),e.jsx(l,{children:e.jsx(w,{children:e.jsx(E,{icon:ve,size:"xl",onClick:()=>ue(s._id)})})}),e.jsx(l,{children:e.jsx(w,{to:`/customers/list/${s._id}`,children:e.jsx(E,{icon:we,size:"xl"})})})]},t))})]}),e.jsxs(Pe,{"aria-label":"Page navigation example",children:[e.jsx(I,{disabled:x<=0,onClick:de,children:"Previous"}),pe(),e.jsx(I,{disabled:le===!0,onClick:ne,children:"Next"})]}),e.jsxs(K,{visible:M,scrollable:!0,size:"xl",onClose:()=>k(!1),children:[e.jsx(W,{closeButton:!0,children:e.jsx(X,{children:"Order Grocery List"})}),e.jsx(O,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:te?e.jsx(Z,{}):e.jsxs(Y,{children:[e.jsx(q,{children:e.jsxs(f,{children:[e.jsx(o,{scope:"col",children:"#"}),e.jsx(o,{scope:"col",children:"Name"}),e.jsx(o,{scope:"col",children:"Intercom"}),e.jsx(o,{scope:"col",children:"Flat"}),e.jsx(o,{scope:"col",children:"Street"}),e.jsx(o,{scope:"col",children:"House Number"})]})}),e.jsx(J,{children:ee.map((s,t)=>e.jsxs(f,{children:[e.jsx(l,{scope:"row",children:t+1}),e.jsx(l,{children:s.name}),e.jsx(l,{children:s.intercom}),e.jsx(l,{children:s.flat}),e.jsx(l,{children:s.street}),e.jsx(l,{children:s.houseNumber})]},t))})]})}),e.jsx(Ne,{})]}),e.jsxs(K,{visible:A,scrollable:!0,size:"lg",onClose:()=>v(!1),children:[e.jsx(W,{closeButton:!0,children:e.jsx(X,{children:"Edit Customer Information"})}),e.jsx(O,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(m,{md:6,children:e.jsx(h,{id:"name",label:"Firt Name",defaultValue:u.name,onChange:s=>H(s.target.value)})}),e.jsx(m,{md:6,children:e.jsx(h,{id:"surname",label:"LastName",defaultValue:u.surname,onChange:s=>R(s.target.value)})}),e.jsx(m,{md:6,children:e.jsx(h,{id:"email",label:"Email",defaultValue:u.email,onChange:s=>_(s.target.value)})}),e.jsx(m,{md:6,children:e.jsx(h,{id:"phone",label:"Contact Number",defaultValue:u.contact,onChange:s=>G(s.target.value)})}),e.jsx(m,{xs:12,children:e.jsx(fe,{type:"submit",style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>me(),children:"Update Customer"})})]})})]})]})};export{Ge as default};
