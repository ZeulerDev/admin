import{r as t,y as M,A as d,j as e,i as N}from"./index-BWkgGQRa.js";import{a as T}from"./axios-Cm0UX6qg.js";import{B as A}from"./config-HOLfLxHr.js";import{b as z,a as j}from"./CContainer-n_XM2trt.js";import{C as L}from"./CNavbar-BwlLOQyI.js";import{C as V}from"./CFormInput-DvjVNdkB.js";import{C as R,a as H,b as D,c as r,d as F,e as o}from"./CTable-Bb3Q9-5y.js";import{d as i}from"./DefaultLayout-C-k2K-WS.js";import{C as Q,a as U,b as Y,c as _}from"./CModalTitle-CZnaKMAX.js";import{C as $}from"./CModalFooter-BT_4nXdn.js";import"./CFormLabel-CoAYXVYV.js";const ae=()=>{const[g,u]=t.useState(!1),[{user:f,token:n},l]=M(),[p,C]=t.useState([]),[w,m]=t.useState(!1),[E,I]=t.useState(""),[v,y]=t.useState(""),[x,S]=t.useState("");t.useEffect(()=>{f&&n&&(m(!0),T.get(A+"assistant/vat/riders/00?search="+x,{headers:{Authorization:`Bearer ${n}`}}).then(s=>{s.status===200?(C(s.data),m(!1),console.log("done")):s.status===204?l({type:d,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}}):s.status===500&&l({type:d,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)}))},[x]);const b=(s,a=null)=>{u(!g),I(s),a!==null?y(a):console.log("VAT DID not provided"),console.log(s)},B=()=>{const s={vat:v};f&&n&&T.patch(A+"assistant/rider/vat/"+E,s,{headers:{Authorization:`Bearer ${n}`}}).then(a=>{if(a.status===200){console.log("updated"),u(!1);const c=a.data,h=p.find(k=>k.id===c.id);h&&(h.vat=c.vat),C([...p]),l({type:d,payload:{status:!0,title:"Driver VAT Id ",message:"VAT Id updated successfully"}})}else a.status===203?(console.log("203"),l({type:d,payload:{status:!0,title:"Driver VAT Id error",message:a.data.message}})):a.status===204?(console.log("204"),l({type:d,payload:{status:!0,title:"Driver VAT Id error",message:a.data.message}})):a.status===500&&l({type:d,payload:{status:!0,title:"Driver VAT Id update error",message:a.data.message}})}).catch(a=>{console.error(a)})};return e.jsxs(z,{children:[e.jsx(L,{className:"bg-body-tertiary",children:e.jsx(V,{type:"text",placeholder:"Search",style:{width:450,marginLeft:"0%"},value:x,onChange:s=>S(s.target.value)})}),w?e.jsx(N,{}):e.jsxs(R,{children:[e.jsx(H,{children:e.jsxs(D,{children:[e.jsx(r,{scope:"col",children:"Name"}),e.jsx(r,{scope:"col",children:"City"}),e.jsx(r,{scope:"col",children:"Vat"}),e.jsx(r,{scope:"col",children:"Activate"}),e.jsx(r,{scope:"col",children:"Disabled"}),e.jsx(r,{scope:"col",children:"Groups"}),e.jsx(r,{scope:"col"})]})}),e.jsx(F,{children:p.map((s,a)=>e.jsxs(D,{children:[e.jsx(o,{children:s.name}),e.jsx(o,{children:s.city}),e.jsx(o,{children:s.vat?s.vat:e.jsx(i,{color:"warning",children:"Null"})}),e.jsx(o,{children:s.activate?e.jsx(i,{color:"success",children:"Yes"}):e.jsx(i,{color:"warning",children:"No"})}),e.jsx(o,{children:s.disabled?e.jsx(i,{color:"success",children:"No"}):e.jsx(i,{color:"warning",children:"Yes"})}),e.jsx(o,{children:s.groups.map((c,h)=>e.jsx("div",{children:c.name},h))}),e.jsx(o,{children:s.vat===""?e.jsx(j,{size:"sm",style:{backgroundColor:"#ff4d4d",width:70,color:"white"},onClick:()=>b(s.id,s.vat),children:"Insert "}):e.jsx(j,{size:"sm",style:{backgroundColor:"#ff4d4d",width:70,color:"white"},onClick:()=>b(s.id,s.vat),children:"Edit "})})]},a))})]}),e.jsxs(Q,{alignment:"center",visible:g,scrollable:!0,size:"sm",onClose:()=>u(!1),children:[e.jsx(U,{closeButton:!0,children:e.jsx(Y,{children:"Confirmation"})}),e.jsxs(_,{children:[e.jsx("a",{children:"Enter Driver's VAT id here"}),e.jsx("br",{}),e.jsx(V,{type:"text",placeholder:"Vat id",value:v,onChange:s=>y(s.target.value)})]}),e.jsx($,{children:e.jsx(j,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>B(),children:"Save changes"})})]})]})};export{ae as default};
