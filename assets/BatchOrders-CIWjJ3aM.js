import{r as o,y as W,D as X,A as x,j as e,i as y,L as N,m as k}from"./index-CaYaFnV6.js";import{a as g}from"./axios-Cm0UX6qg.js";import{B as b}from"./config-HOLfLxHr.js";import{b as Z,a as D}from"./CContainer-B9Em2jPq.js";import{C as ee}from"./CNavbar-DMXNcqxD.js";import{C as F,a as S,b as j,c as l,d as w,e as t}from"./CTable-DeWYaT23.js";import{e as L,d as se}from"./DefaultLayout-DweglOhE.js";import{c as ae}from"./cil-info-CmGCY32x.js";import{C as M,a as V,b as A,c as z}from"./CModalTitle-CZ-yS-Uo.js";import{C as le}from"./CCardImage-DNr393dM.js";import{C as I}from"./CModalFooter-BhhGa6wx.js";import{C as R}from"./CRow-BCqlNs0D.js";import{C as c}from"./CFormLabel-BvO9-jTj.js";import{C as i}from"./CCol-C4R6OYwi.js";import{C as n}from"./CFormInput-D1r-Nez5.js";const ye=()=>{var O,B,v;const[T,p]=o.useState(!1),[H,f]=o.useState(!1),[{user:m,token:d},h]=W(),[$,P]=o.useState([]),[Y,E]=o.useState(!1),{id:_}=X(),[C,u]=o.useState(!1),[r,q]=o.useState([]),[Q,U]=o.useState([]);o.useEffect(()=>{m&&d&&G(_)},[m,d]);const G=a=>{E(!0),g.get(b+"assistant/batch/orders/"+a,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(console.log("done",s.data),P(s.data),E(!1)):s.status===203?h({type:x,payload:{status:!0,title:"Batch markets loading error",message:s.data.message}}):s.status===204?h({type:x,payload:{status:!0,title:"Batch markets loading error",message:s.data.message}}):s.status===500&&h({type:x,payload:{status:!0,title:"Batch markets loading error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})},J=a=>{p(!T),console.log(a),d&&m&&(u(!0),g.get(b+"assistant/grocery/order/"+a,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(U(s.data),u(!1)):s.status===500&&h({type:x,payload:{status:!0,title:"Order details view error",message:s.data.message}})}).catch(s=>{console.error("Order details view error:",s)}))},K=a=>{f(!C),console.log(a),d&&m&&(u(!0),g.get(b+"assistant/grocery/customer/"+a,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(q(s.data),u(!1)):s.status===500&&h({type:x,payload:{status:!0,title:"Order details view error",message:s.data.message}})}).catch(s=>{console.error("Order details view error:",s)}))};return e.jsxs(Z,{children:[e.jsx(ee,{className:"bg-body-tertiary"}),Y?e.jsx(y,{}):e.jsxs(F,{children:[e.jsx(S,{children:e.jsxs(j,{children:[e.jsx(l,{scope:"col",children:"No"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"Address"}),e.jsx(l,{scope:"col",children:"Delivery Fee"}),e.jsx(l,{scope:"col",children:"Slot"}),e.jsx(l,{scope:"col",children:"Date"}),e.jsx(l,{scope:"col",children:"Total"}),e.jsx(l,{scope:"col",children:"Markup"}),e.jsx(l,{scope:"col",children:"Orders"}),e.jsx(l,{scope:"col",children:"Info"})]})}),e.jsx(w,{children:(O=$.orders)==null?void 0:O.map((a,s)=>e.jsxs(j,{children:[e.jsx(t,{children:a.no}),e.jsx(t,{children:e.jsx(L,{style:{width:80},color:"info",children:a.status})}),e.jsx(t,{children:a.address}),e.jsx(t,{children:a.deliveryFee}),e.jsx(t,{children:a.slot}),e.jsx(t,{children:a.date}),e.jsx(t,{children:a.total}),e.jsx(t,{children:a.markup}),e.jsx(t,{children:e.jsx(N,{children:e.jsx(k,{icon:ae,size:"xl",onClick:()=>J(a.id)})})}),e.jsx(t,{children:e.jsx(N,{children:e.jsx(k,{icon:se,size:"xl",onClick:()=>K(a.id)})})})]},s))})]}),e.jsxs(M,{visible:T,scrollable:!0,size:"xl",onClose:()=>p(!1),children:[e.jsx(V,{closeButton:!0,children:e.jsx(A,{children:"Customer Information"})}),e.jsx(z,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:C?e.jsx(y,{}):e.jsxs(F,{children:[e.jsx(S,{children:e.jsxs(j,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"Name"}),e.jsx(l,{scope:"col",children:"Price"}),e.jsx(l,{scope:"col",children:"Qty"}),e.jsx(l,{scope:"col",children:"Measure"}),e.jsx(l,{scope:"col",children:"Market"}),e.jsx(l,{scope:"col",children:"Status"})]})}),e.jsx(w,{children:(B=Q.items)==null?void 0:B.map((a,s)=>e.jsxs(j,{children:[e.jsx(l,{scope:"row",children:e.jsx(le,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+a.photo})}),e.jsx(t,{children:a.name}),e.jsx(t,{children:a.price}),e.jsx(t,{children:a.qty}),e.jsx(t,{children:a.measure}),e.jsxs(t,{children:[a.chain," - ",a.market]}),e.jsx(t,{children:e.jsx(L,{style:{width:80},color:"info",children:a.status})})]},s))})]})}),e.jsx(I,{children:e.jsx(D,{color:"secondary",onClick:()=>p(!1),children:"Close"})})]}),e.jsxs(M,{visible:H,scrollable:!0,size:"lg",onClose:()=>f(!1),children:[e.jsx(V,{closeButton:!0,children:e.jsx(A,{children:"Customer Information"})}),e.jsx(z,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:C?e.jsx(y,{}):e.jsxs("div",{children:[e.jsxs(R,{className:"mb-3",children:[e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.name,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Address"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:(v=r.address)==null?void 0:v.name,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.email,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.contact,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Language"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.language==="en"?"English":r.language,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Country"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.country==="en"?"English":r.country,readOnly:!0,plainText:!0})})]}),e.jsxs(R,{className:"mb-3",children:[e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Latitude"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.lat,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Longitude"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.lng,readOnly:!0,plainText:!0})})]})]})}),e.jsx(I,{children:e.jsx(D,{color:"secondary",onClick:()=>f(!1),children:"Close"})})]})]})};export{ye as default};