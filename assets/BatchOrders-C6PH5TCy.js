import{r as c,y as W,D as X,A as m,j as e,h as y,L as N,m as F}from"./index-C5Bwpkvq.js";import{a as C}from"./axios-Cm0UX6qg.js";import{B as b}from"./config-HOLfLxHr.js";import{b as Z}from"./CContainer-C1WIjXH1.js";import{C as ee}from"./CNavbar-BSl6MFMs.js";import{C as L,a as S,b as p,c as t,d as w,e as l}from"./CTable-DFNtBtEq.js";import{d as k,e as se}from"./DefaultLayout-C-xguh5Y.js";import{c as ae}from"./cil-info-CmGCY32x.js";import{C as M,a as V,b as A,c as z}from"./CModalTitle-D6Hg3qg_.js";import{C as te}from"./CCardImage-hP7BPIm1.js";import{C as I}from"./CModalFooter-C5wvQAvz.js";import{C as R}from"./CRow-BZLTZqzm.js";import{C as i}from"./CFormLabel-Cogh2aXj.js";import{C as n}from"./CCol-O325NQfN.js";import{C as d}from"./CFormInput-B7GuH3nF.js";const ye=()=>{var v,B,D;const[T,O]=c.useState(!1),[H,E]=c.useState(!1),[{user:u,token:h},x]=W(),[P,$]=c.useState([]),[Y,f]=c.useState(!1),{id:_}=X(),[g,j]=c.useState(!1),[o,q]=c.useState([]),[Q,U]=c.useState([]);c.useEffect(()=>{const s=setTimeout(()=>{x({type:m,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),f(!1)},2e4);return u&&h&&G(_,s),()=>{clearTimeout(s)}},[u,h]);const G=(s,a)=>{f(!0),C.get(b+"assistant/batch/orders/"+s,{headers:{Authorization:`Bearer ${h}`}}).then(r=>{r.status===200?(console.log("done",r.data),$(r.data),f(!1),clearTimeout(a)):r.status===203?x({type:m,payload:{status:!0,title:"Batch markets loading error",message:r.data.message}}):r.status===204?x({type:m,payload:{status:!0,title:"Batch markets loading error",message:r.data.message}}):r.status===500&&x({type:m,payload:{status:!0,title:"Batch markets loading error",message:r.data.message}})}).catch(r=>{console.error("Error:",r)})},J=s=>{O(!T),console.log(s),h&&u&&(j(!0),C.get(b+"assistant/grocery/order/"+s,{headers:{Authorization:`Bearer ${h}`}}).then(a=>{a.status===200?(U(a.data),j(!1)):a.status===500&&x({type:m,payload:{status:!0,title:"Order details view error",message:a.data.message}})}).catch(a=>{console.error("Order details view error:",a)}))},K=s=>{E(!g),console.log(s),h&&u&&(j(!0),C.get(b+"assistant/grocery/customer/"+s,{headers:{Authorization:`Bearer ${h}`}}).then(a=>{a.status===200?(q(a.data),j(!1)):a.status===500&&x({type:m,payload:{status:!0,title:"Order details view error",message:a.data.message}})}).catch(a=>{console.error("Order details view error:",a)}))};return e.jsxs(Z,{children:[e.jsx(ee,{className:"bg-body-tertiary"}),Y?e.jsx(y,{}):e.jsxs(L,{children:[e.jsx(S,{children:e.jsxs(p,{children:[e.jsx(t,{scope:"col",children:"#"}),e.jsx(t,{scope:"col",children:"No"}),e.jsx(t,{scope:"col",children:"Status"}),e.jsx(t,{scope:"col",children:"Address"}),e.jsx(t,{scope:"col",children:"Delivery Fee"}),e.jsx(t,{scope:"col",children:"Slot"}),e.jsx(t,{scope:"col",children:"Date"}),e.jsx(t,{scope:"col",children:"Total"}),e.jsx(t,{scope:"col",children:"Markup"}),e.jsx(t,{scope:"col",children:"Orders"}),e.jsx(t,{scope:"col",children:"Info"})]})}),e.jsx(w,{children:(v=P.orders)==null?void 0:v.map((s,a)=>e.jsxs(p,{children:[e.jsx(l,{children:a+1}),e.jsx(l,{children:s.no}),e.jsx(l,{children:e.jsx(k,{style:{width:80},color:"info",children:s.status})}),e.jsx(l,{children:s.address}),e.jsx(l,{children:s.deliveryFee}),e.jsx(l,{children:s.slot}),e.jsx(l,{children:s.date}),e.jsx(l,{children:s.total}),e.jsx(l,{children:s.markup}),e.jsx(l,{children:e.jsx(N,{children:e.jsx(F,{icon:ae,size:"xl",onClick:()=>J(s.id)})})}),e.jsx(l,{children:e.jsx(N,{children:e.jsx(F,{icon:se,size:"xl",onClick:()=>K(s.id)})})})]},a))})]}),e.jsxs(M,{visible:T,scrollable:!0,size:"xl",onClose:()=>O(!1),children:[e.jsx(V,{closeButton:!0,children:e.jsx(A,{children:"Customer Order List Information"})}),e.jsx(z,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:g?e.jsx(y,{}):e.jsxs(L,{children:[e.jsx(S,{children:e.jsxs(p,{children:[e.jsx(t,{scope:"col",children:"#"}),e.jsx(t,{scope:"col",children:"Photo"}),e.jsx(t,{scope:"col",children:"Name"}),e.jsx(t,{scope:"col",children:"Price"}),e.jsx(t,{scope:"col",children:"Qty"}),e.jsx(t,{scope:"col",children:"Measure"}),e.jsx(t,{scope:"col",children:"Market"}),e.jsx(t,{scope:"col",children:"Status"})]})}),e.jsx(w,{children:(B=Q.items)==null?void 0:B.map((s,a)=>e.jsxs(p,{children:[e.jsx(l,{children:a+1}),e.jsx(l,{children:e.jsx(te,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.photo})}),e.jsx(l,{children:s.name}),e.jsx(l,{children:s.price}),e.jsx(l,{children:s.qty}),e.jsx(l,{children:s.measure}),e.jsxs(l,{children:[s.chain," - ",s.market]}),e.jsx(l,{children:e.jsx(k,{style:{width:80},color:"info",children:s.status})})]},a))})]})}),e.jsx(I,{})]}),e.jsxs(M,{visible:H,scrollable:!0,size:"lg",onClose:()=>E(!1),children:[e.jsx(V,{closeButton:!0,children:e.jsx(A,{children:"Customer Information"})}),e.jsx(z,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:g?e.jsx(y,{}):e.jsxs("div",{children:[e.jsxs(R,{className:"mb-3",children:[e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:o.name,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Address"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:(D=o.address)==null?void 0:D.name,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:o.email,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:o.contact,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Language"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:o.language==="en"?"English":o.language,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Country"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:o.country==="en"?"English":o.country,readOnly:!0,plainText:!0})})]}),e.jsxs(R,{className:"mb-3",children:[e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Latitude"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:o.lat,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Longitude"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:o.lng,readOnly:!0,plainText:!0})})]})]})}),e.jsx(I,{})]})]})};export{ye as default};
