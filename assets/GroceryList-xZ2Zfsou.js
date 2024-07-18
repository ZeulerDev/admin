import{r as o,x as Z,z as D,j as e,h as u,m as i,L as E}from"./index-VLvploq_.js";import{a as ee}from"./axios-B4uVmeYG.js";import{B as se}from"./config-HOLfLxHr.js";import{b as ae,a as le}from"./CContainer-DGhrB3Nd.js";import{C as te}from"./CNavbar-C7lUiyIE.js";import{C as I,a as N,b as n,c as a,d as z,e as l}from"./CTable-DnT301m8.js";import{c as M}from"./cil-info-CmGCY32x.js";import{e as B}from"./DefaultLayout-42LXLbA0.js";import{C as oe,a as F}from"./CPaginationItem-CM0f5lQ4.js";import{C as R,a as w,b as A,c as H}from"./CModalTitle-C4EsN1e8.js";import{C as re}from"./CCardImage-VAoVrW_Z.js";import{C as V}from"./CModalFooter-BfL2maMs.js";import{C as ce}from"./CRow-BV5oaT4f.js";import{C as p}from"./CFormLabel-BDnC816j.js";import{C}from"./CCol-C1_f1D92.js";import{C as f}from"./CFormInput-CePgEGe_.js";const Le=()=>{const[g,y]=o.useState(!1),[G,d]=o.useState(!1),[{user:b,token:x},v]=Z(),[O,Y]=o.useState([]);o.useState([]);const[_,S]=o.useState(!1),[h,ie]=o.useState(!1);o.useState([]);const[m,q]=o.useState([]),[Q,U]=o.useState([]),[c,T]=o.useState(0),[$,L]=o.useState(!0);o.useEffect(()=>{b&&x&&j(0)},[b,x]);const j=(s,r)=>{S(!0),ee.get(se+"assistant/grocery/list/"+s,{headers:{Authorization:`Bearer ${x}`}}).then(t=>{t.status===200?(Y(t.data),S(!1),t.data.length<50?(L(!0),console.log("ok")):t.data.length>49&&L(!1)):t.status===204?v({type:D,payload:{status:!0,title:"Grocery List loading error",message:t.data.message}}):t.status===500&&v({type:D,payload:{status:!0,title:"Grocery List loading error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},J=()=>{console.log(c);const s=c+50;T(s),j(s)},K=()=>{const s=c-50;console.log(s),T(s),j(s)},W=s=>{y(!g),U(s)},X=s=>{d(!h),q(s)};return e.jsxs(ae,{children:[e.jsx(te,{className:"bg-body-tertiary"}),_?e.jsx(u,{}):e.jsxs(I,{children:[e.jsx(N,{children:e.jsxs(n,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"Name"}),e.jsx(a,{scope:"col",children:"Date"}),e.jsx(a,{scope:"col",children:"Type"}),e.jsx(a,{scope:"col",children:"Address"}),e.jsx(a,{scope:"col",children:"Items"}),e.jsx(a,{scope:"col",children:"Customer"})]})}),e.jsx(z,{children:O.map((s,r)=>e.jsxs(n,{children:[e.jsx(l,{children:c+r+1}),e.jsx(l,{children:s.name?s.name:""}),e.jsx(l,{children:s.data}),e.jsx(l,{children:s.type}),e.jsx(l,{children:s.address}),e.jsx(l,{children:s.items===null?e.jsx(i,{icon:M,size:"xl"}):e.jsx(E,{children:e.jsx(i,{icon:M,size:"xl",onClick:()=>W(s.items)})})}),e.jsx(l,{children:s.customer===null?e.jsx(i,{icon:B,size:"xl"}):e.jsx(E,{children:e.jsx(i,{icon:B,size:"xl",onClick:()=>X(s.customer)})})})]},r))})]}),e.jsxs(oe,{"aria-label":"Page navigation example",children:[e.jsx(F,{disabled:c<=0,onClick:K,children:"Previous"}),e.jsx(F,{disabled:$===!0,onClick:J,children:"Next"})]}),e.jsxs(R,{visible:g,scrollable:!0,size:"xl",onClose:()=>y(!1),children:[e.jsx(w,{closeButton:!0,children:e.jsx(A,{children:"Customer Order List Information"})}),e.jsx(H,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:h?e.jsx(u,{}):e.jsxs(I,{children:[e.jsx(N,{children:e.jsxs(n,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"Photo"}),e.jsx(a,{scope:"col",children:"Name"}),e.jsx(a,{scope:"col",children:"Price"}),e.jsx(a,{scope:"col",children:"Saving"}),e.jsx(a,{scope:"col",children:"Qty"}),e.jsx(a,{scope:"col",children:"Measure"}),e.jsx(a,{scope:"col",children:"Market"})]})}),e.jsx(z,{children:Q.map((s,r)=>{var t,P,k;return e.jsxs(n,{children:[e.jsx(l,{children:r+1}),e.jsx(a,{children:e.jsx(re,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.photo})}),e.jsx(l,{children:s.name}),e.jsx(l,{children:s.price}),e.jsx(l,{children:s.saving?s.saving.toFixed(2):null}),e.jsx(l,{children:s.qty}),e.jsx(l,{children:s.um}),e.jsxs(l,{children:[(P=(t=s.market)==null?void 0:t.chain)==null?void 0:P.name," - ",(k=s.market)==null?void 0:k.address]})]},r)})})]})}),e.jsx(V,{})]}),e.jsxs(R,{visible:G,scrollable:!0,size:"lg",onClose:()=>d(!1),children:[e.jsx(w,{closeButton:!0,children:e.jsx(A,{children:"Customer Information"})}),e.jsx(H,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:h?e.jsx(u,{}):e.jsx("div",{children:e.jsxs(ce,{className:"mb-3",children:[e.jsx(p,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(C,{sm:10,children:e.jsx(f,{type:"text",defaultValue:m.name,readOnly:!0,plainText:!0})}),e.jsx(p,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(C,{sm:10,children:e.jsx(f,{type:"text",defaultValue:m.email,readOnly:!0,plainText:!0})}),e.jsx(p,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(C,{sm:10,children:e.jsx(f,{type:"text",defaultValue:m.contact,readOnly:!0,plainText:!0})})]})})}),e.jsx(V,{children:e.jsx(le,{color:"secondary",onClick:()=>d(!1),children:"Close"})})]})]})};export{Le as default};