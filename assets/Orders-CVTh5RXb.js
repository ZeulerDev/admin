import{r as o,y as ce,l as ie,A as j,j as e,i as D,L,m as P}from"./index-D7hMCpfZ.js";import{a as T}from"./axios-Cm0UX6qg.js";import{D as ne,f as B}from"./rsuite-DH0veDx1.js";import{B as E}from"./config-HOLfLxHr.js";import{b as de,a as I}from"./CContainer-CtIWBirN.js";import{C as xe}from"./CNavbar-CF5s_Yu1.js";import{C as V,a as A,b as p,c as a,d as z,e as l}from"./CTable-DPgvjQZA.js";import{e as R,d as he}from"./DefaultLayout-jgAbWox0.js";import{c as me}from"./cil-info-CmGCY32x.js";import{C as ue,a as H}from"./CPaginationItem-CiG5vpd2.js";import{C as $,a as Y,b as _,c as q}from"./CModalTitle-CcgDWxHa.js";import{C as je}from"./CCardImage-CJaveh01.js";import{C as Q}from"./CModalFooter-DyfW6scl.js";import{C as U}from"./CRow-CssFVCFd.js";import{C as i}from"./CFormLabel-COYWKIaa.js";import{C as n}from"./CCol-DHGwoefR.js";import{C as d}from"./CFormInput-C_rKCNW0.js";import"./inheritsLoose-CkMbdMht.js";import"./index-C3tVjjOm.js";const Be=()=>{var F,w;const[O,f]=o.useState(!1),[G,C]=o.useState(!1),[{user:h,token:x},m]=ce();ie();const[J,K]=o.useState([]),[c,W]=o.useState([]),[X,v]=o.useState(!1),[y,u]=o.useState(!1),[Z,ee]=o.useState([]),[N,S]=o.useState([]),[g,M]=o.useState(0),[se,k]=o.useState(!0);o.useEffect(()=>{h&&x&&b(0)},[h,x,N]);const b=(s,t)=>{v(!0),T.get(E+"assistant/grocery/orders/"+s+"?date="+N,{headers:{Authorization:`Bearer ${x}`}}).then(r=>{r.status===200?(K(r.data),v(!1),r.data.length<50?(k(!0),console.log("ok")):r.data.length>49&&k(!1)):r.status===204?m({type:j,payload:{status:!0,title:"Orders loading error",message:r.data.message}}):r.status===500&&m({type:j,payload:{status:!0,title:"Orders loading error",message:r.data.message}})}).catch(r=>{console.error("Error:",r)})},ae=()=>{const s=g+50;M(s),b(s)},te=()=>{const s=g-50;console.log(s),M(s),b(s)},le=s=>{f(!O),console.log(s),x&&h&&(u(!0),T.get(E+"assistant/grocery/order/"+s,{headers:{Authorization:`Bearer ${x}`}}).then(t=>{t.status===200?(ee(t.data),u(!1)):t.status===500&&m({type:j,payload:{status:!0,title:"Order details view error",message:t.data.message}})}).catch(t=>{console.error("Order details view error:",t)}))},re=s=>{C(!y),console.log(s),x&&h&&(u(!0),T.get(E+"assistant/grocery/customer/"+s,{headers:{Authorization:`Bearer ${x}`}}).then(t=>{t.status===200?(W(t.data),u(!1)):t.status===500&&m({type:j,payload:{status:!0,title:"Order details view error",message:t.data.message}})}).catch(t=>{console.error("Order details view error:",t)}))},oe=s=>{if(s){const t=B(s[0],"yyyy-MM-dd"),r=B(s[1],"yyyy-MM-dd");S([t,r])}else S([])};return e.jsxs(de,{children:[e.jsx(xe,{className:"bg-body-tertiary",children:e.jsx(ne,{style:{marginLeft:15},format:"yyyy/MM/dd",onChange:oe})}),X?e.jsx(D,{}):e.jsxs(V,{children:[e.jsx(A,{children:e.jsxs(p,{children:[e.jsx(a,{scope:"col",children:"No"}),e.jsx(a,{scope:"col",children:"Customer"}),e.jsx(a,{scope:"col",children:"Status"}),e.jsx(a,{scope:"col",children:"Address"}),e.jsx(a,{scope:"col",children:"Delivery Fee"}),e.jsx(a,{scope:"col",children:"Slot"}),e.jsx(a,{scope:"col",children:"Date"}),e.jsx(a,{scope:"col",children:"Total"}),e.jsx(a,{scope:"col",children:"Markup"}),e.jsx(a,{scope:"col",children:"Orders"}),e.jsx(a,{scope:"col",children:"Info"})]})}),e.jsx(z,{children:J.map(s=>e.jsxs(p,{children:[e.jsx(l,{children:s.no}),e.jsx(l,{children:s.customer}),e.jsx(l,{children:e.jsx(R,{style:{width:80},color:"info",children:s.status})}),e.jsx(l,{children:s.address}),e.jsx(l,{children:s.deliveryFee}),e.jsx(l,{children:s.slot}),e.jsx(l,{children:s.date}),e.jsx(l,{children:s.total}),e.jsx(l,{children:s.markup}),e.jsx(l,{children:e.jsx(L,{children:e.jsx(P,{icon:me,size:"xl",onClick:()=>le(s.id)})})}),e.jsx(l,{children:e.jsx(L,{children:e.jsx(P,{icon:he,size:"xl",onClick:()=>re(s.id)})})})]},s.id))})]}),e.jsxs(ue,{"aria-label":"Page navigation example",children:[e.jsx(H,{disabled:g<=0,onClick:te,children:"Previous"}),e.jsx(H,{disabled:se===!0,onClick:ae,children:"Next"})]}),e.jsxs($,{visible:O,scrollable:!0,size:"xl",onClose:()=>f(!1),children:[e.jsx(Y,{closeButton:!0,children:e.jsx(_,{children:"Customer Information"})}),e.jsx(q,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:y?e.jsx(D,{}):e.jsxs(V,{children:[e.jsx(A,{children:e.jsxs(p,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"Name"}),e.jsx(a,{scope:"col",children:"Price"}),e.jsx(a,{scope:"col",children:"Qty"}),e.jsx(a,{scope:"col",children:"Measure"}),e.jsx(a,{scope:"col",children:"Market"}),e.jsx(a,{scope:"col",children:"Status"})]})}),e.jsx(z,{children:(F=Z.items)==null?void 0:F.map((s,t)=>e.jsxs(p,{children:[e.jsx(a,{scope:"row",children:e.jsx(je,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.photo})}),e.jsx(l,{children:s.name}),e.jsx(l,{children:s.price}),e.jsx(l,{children:s.qty}),e.jsx(l,{children:s.measure}),e.jsxs(l,{children:[s.chain," - ",s.market]}),e.jsx(l,{children:e.jsx(R,{style:{width:80},color:"info",children:s.status})})]},t))})]})}),e.jsx(Q,{children:e.jsx(I,{color:"secondary",onClick:()=>f(!1),children:"Close"})})]}),e.jsxs($,{visible:G,scrollable:!0,size:"lg",onClose:()=>C(!1),children:[e.jsx(Y,{closeButton:!0,children:e.jsx(_,{children:"Customer Information"})}),e.jsx(q,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:y?e.jsx(D,{}):e.jsxs("div",{children:[e.jsxs(U,{className:"mb-3",children:[e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.name,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Address"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:(w=c.address)==null?void 0:w.name,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.email,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.contact,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Language"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.language==="en"?"English":c.language,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Country"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.country==="en"?"English":c.country,readOnly:!0,plainText:!0})})]}),e.jsxs(U,{className:"mb-3",children:[e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Latitude"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.lat,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Longitude"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.lng,readOnly:!0,plainText:!0})})]})]})}),e.jsx(Q,{children:e.jsx(I,{color:"secondary",onClick:()=>C(!1),children:"Close"})})]})]})};export{Be as default};
