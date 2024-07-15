import{r as t,y as I,A as i,j as e,i as M}from"./index-D7hMCpfZ.js";import{a as E}from"./axios-Cm0UX6qg.js";import{b as N,a as x}from"./CContainer-CtIWBirN.js";import{C as P}from"./CNavbar-CF5s_Yu1.js";import{C as S}from"./CFormInput-C_rKCNW0.js";import{C as z,a as L,b as T,c as o,d as R,e as r}from"./CTable-DPgvjQZA.js";import{e as d}from"./DefaultLayout-jgAbWox0.js";import{C as H,a as U,b as _,c as F}from"./CModalTitle-CcgDWxHa.js";import{C as Q}from"./CModalFooter-DyfW6scl.js";import"./CFormLabel-COYWKIaa.js";const ee=()=>{const[C,h]=t.useState(!1),[{user:f,token:u},l]=I(),[j,m]=t.useState([]),[A,y]=t.useState(!1),[w,B]=t.useState(""),[b,v]=t.useState(""),[g,V]=t.useState("");t.useEffect(()=>{f&&u&&(y(!0),E.get(BASE_URL+"assistant/vat/shoppers/00?search="+g,{headers:{Authorization:`Bearer ${u}`}}).then(s=>{s.status===200?(m(s.data),y(!1),console.log("done")):s.status===204?l({type:i,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}}):s.status===500&&l({type:i,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)}))},[g]);const k=(s,a=null)=>{h(!C),B(s),a!==null?v(a):console.log("VAT PID not provided"),console.log(s)},D=()=>{const s={vat:b};f&&u&&E.patch(BASE_URL+"assistant/shopper/vat/"+w,s,{headers:{Authorization:`Bearer ${u}`}}).then(a=>{if(a.status===200){console.log("updated"),h(!1);const c=a.data,n=j.find(p=>p.id===c.id);n&&(n.vat=c.vat),m([...j])}else a.status===203?(console.log("203"),l({type:i,payload:{status:!0,title:"Picker Disabled status error",message:a.data.message}})):a.status===204?(console.log("204"),l({type:i,payload:{status:!0,title:"Picker Disabled status error",message:a.data.message}})):a.status===500&&l({type:i,payload:{status:!0,title:"Picker Disabled status update error",message:a.data.message}})}).catch(a=>{console.error(a)})};return e.jsxs(N,{children:[e.jsx(P,{className:"bg-body-tertiary",children:e.jsx(S,{type:"text",placeholder:"Search",style:{width:450,marginLeft:"2%"},value:g,onChange:s=>V(s.target.value)})}),A?e.jsx(M,{}):e.jsxs(z,{children:[e.jsx(L,{children:e.jsxs(T,{children:[e.jsx(o,{scope:"col",children:"Name"}),e.jsx(o,{scope:"col",children:"City"}),e.jsx(o,{scope:"col",children:"Vat"}),e.jsx(o,{scope:"col",children:"Activate"}),e.jsx(o,{scope:"col",children:"Disabled"}),e.jsx(o,{scope:"col",children:"market"}),e.jsx(o,{scope:"col"})]})}),e.jsx(R,{children:j.map((s,a)=>{var c,n,p;return e.jsxs(T,{children:[e.jsx(r,{children:s.name}),e.jsx(r,{children:s.city}),e.jsx(r,{children:s.vat?s.vat:e.jsx(d,{color:"warning",children:"Null"})}),e.jsx(r,{children:s.activate?e.jsx(d,{color:"success",children:"Yes"}):e.jsx(d,{color:"warning",children:"No"})}),e.jsx(r,{children:s.disabled?e.jsx(d,{color:"success",children:"No"}):e.jsx(d,{color:"warning",children:"Yes"})}),e.jsxs(r,{children:[(n=(c=s.market)==null?void 0:c.chain)==null?void 0:n.name," - ",(p=s.market)==null?void 0:p.address]}),e.jsx(r,{children:s.vat===""?e.jsx(x,{size:"sm",style:{backgroundColor:"#ff4d4d",width:70},onClick:()=>k(s.id,s.vat),children:"Insert "}):e.jsx(x,{size:"sm",style:{backgroundColor:"#ff4d4d",width:70},onClick:()=>k(s.id,s.vat),children:"Edit "})})]},a)})})]}),e.jsxs(H,{alignment:"center",visible:C,scrollable:!0,size:"sm",onClose:()=>h(!1),children:[e.jsx(U,{closeButton:!0,children:e.jsx(_,{children:"Confirmation"})}),e.jsxs(F,{children:[e.jsx("a",{children:"Enter Picker's VAT id here"}),e.jsx("br",{}),e.jsx(S,{type:"text",placeholder:"Vat id",value:b,onChange:s=>v(s.target.value)})]}),e.jsxs(Q,{children:[e.jsx(x,{color:"secondary",onClick:()=>h(!1),children:"Close"}),e.jsx(x,{color:"primary",onClick:()=>D(),children:"Save changes"})]})]})]})};export{ee as default};