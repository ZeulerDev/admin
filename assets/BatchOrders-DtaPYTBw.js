import{r as o,y as K,D as W,A as h,j as e,i as f,L as N,m as D}from"./index-BWkgGQRa.js";import{a as C}from"./axios-Cm0UX6qg.js";import{B as y}from"./config-HOLfLxHr.js";import{b as X}from"./CContainer-n_XM2trt.js";import{C as Z}from"./CNavbar-BwlLOQyI.js";import{C as F,a as S,b as j,c as t,d as w,e as l}from"./CTable-Bb3Q9-5y.js";import{d as L,e as ee}from"./DefaultLayout-C-k2K-WS.js";import{c as se}from"./cil-info-CmGCY32x.js";import{C as k,a as M,b as V,c as A}from"./CModalTitle-CZnaKMAX.js";import{C as ae}from"./CCardImage-sA2yhBku.js";import{C as z}from"./CModalFooter-BT_4nXdn.js";import{C as I}from"./CRow-wG5hGiWu.js";import{C as c}from"./CFormLabel-CoAYXVYV.js";import{C as i}from"./CCol-CAExLm0H.js";import{C as n}from"./CFormInput-DvjVNdkB.js";const Ce=()=>{var E,v,B;const[g,b]=o.useState(!1),[R,T]=o.useState(!1),[{user:m,token:d},x]=K(),[H,$]=o.useState([]),[P,O]=o.useState(!1),{id:Y}=W(),[p,u]=o.useState(!1),[r,_]=o.useState([]),[q,Q]=o.useState([]);o.useEffect(()=>{m&&d&&U(Y)},[m,d]);const U=a=>{O(!0),C.get(y+"assistant/batch/orders/"+a,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(console.log("done",s.data),$(s.data),O(!1)):s.status===203?x({type:h,payload:{status:!0,title:"Batch markets loading error",message:s.data.message}}):s.status===204?x({type:h,payload:{status:!0,title:"Batch markets loading error",message:s.data.message}}):s.status===500&&x({type:h,payload:{status:!0,title:"Batch markets loading error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})},G=a=>{b(!g),console.log(a),d&&m&&(u(!0),C.get(y+"assistant/grocery/order/"+a,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(Q(s.data),u(!1)):s.status===500&&x({type:h,payload:{status:!0,title:"Order details view error",message:s.data.message}})}).catch(s=>{console.error("Order details view error:",s)}))},J=a=>{T(!p),console.log(a),d&&m&&(u(!0),C.get(y+"assistant/grocery/customer/"+a,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(_(s.data),u(!1)):s.status===500&&x({type:h,payload:{status:!0,title:"Order details view error",message:s.data.message}})}).catch(s=>{console.error("Order details view error:",s)}))};return e.jsxs(X,{children:[e.jsx(Z,{className:"bg-body-tertiary"}),P?e.jsx(f,{}):e.jsxs(F,{children:[e.jsx(S,{children:e.jsxs(j,{children:[e.jsx(t,{scope:"col",children:"No"}),e.jsx(t,{scope:"col",children:"Status"}),e.jsx(t,{scope:"col",children:"Address"}),e.jsx(t,{scope:"col",children:"Delivery Fee"}),e.jsx(t,{scope:"col",children:"Slot"}),e.jsx(t,{scope:"col",children:"Date"}),e.jsx(t,{scope:"col",children:"Total"}),e.jsx(t,{scope:"col",children:"Markup"}),e.jsx(t,{scope:"col",children:"Orders"}),e.jsx(t,{scope:"col",children:"Info"})]})}),e.jsx(w,{children:(E=H.orders)==null?void 0:E.map((a,s)=>e.jsxs(j,{children:[e.jsx(l,{children:a.no}),e.jsx(l,{children:e.jsx(L,{style:{width:80},color:"info",children:a.status})}),e.jsx(l,{children:a.address}),e.jsx(l,{children:a.deliveryFee}),e.jsx(l,{children:a.slot}),e.jsx(l,{children:a.date}),e.jsx(l,{children:a.total}),e.jsx(l,{children:a.markup}),e.jsx(l,{children:e.jsx(N,{children:e.jsx(D,{icon:se,size:"xl",onClick:()=>G(a.id)})})}),e.jsx(l,{children:e.jsx(N,{children:e.jsx(D,{icon:ee,size:"xl",onClick:()=>J(a.id)})})})]},s))})]}),e.jsxs(k,{visible:g,scrollable:!0,size:"xl",onClose:()=>b(!1),children:[e.jsx(M,{closeButton:!0,children:e.jsx(V,{children:"Customer Order List Information"})}),e.jsx(A,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:p?e.jsx(f,{}):e.jsxs(F,{children:[e.jsx(S,{children:e.jsxs(j,{children:[e.jsx(t,{scope:"col",children:"#"}),e.jsx(t,{scope:"col",children:"Name"}),e.jsx(t,{scope:"col",children:"Price"}),e.jsx(t,{scope:"col",children:"Qty"}),e.jsx(t,{scope:"col",children:"Measure"}),e.jsx(t,{scope:"col",children:"Market"}),e.jsx(t,{scope:"col",children:"Status"})]})}),e.jsx(w,{children:(v=q.items)==null?void 0:v.map((a,s)=>e.jsxs(j,{children:[e.jsx(t,{scope:"row",children:e.jsx(ae,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+a.photo})}),e.jsx(l,{children:a.name}),e.jsx(l,{children:a.price}),e.jsx(l,{children:a.qty}),e.jsx(l,{children:a.measure}),e.jsxs(l,{children:[a.chain," - ",a.market]}),e.jsx(l,{children:e.jsx(L,{style:{width:80},color:"info",children:a.status})})]},s))})]})}),e.jsx(z,{})]}),e.jsxs(k,{visible:R,scrollable:!0,size:"lg",onClose:()=>T(!1),children:[e.jsx(M,{closeButton:!0,children:e.jsx(V,{children:"Customer Information"})}),e.jsx(A,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:p?e.jsx(f,{}):e.jsxs("div",{children:[e.jsxs(I,{className:"mb-3",children:[e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.name,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Address"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:(B=r.address)==null?void 0:B.name,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.email,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.contact,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Language"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.language==="en"?"English":r.language,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Country"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.country==="en"?"English":r.country,readOnly:!0,plainText:!0})})]}),e.jsxs(I,{className:"mb-3",children:[e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Latitude"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.lat,readOnly:!0,plainText:!0})}),e.jsx(c,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Longitude"}),e.jsx(i,{sm:10,children:e.jsx(n,{type:"text",defaultValue:r.lng,readOnly:!0,plainText:!0})})]})]})}),e.jsx(z,{})]})]})};export{Ce as default};
