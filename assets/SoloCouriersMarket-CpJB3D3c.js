import{y as U,l as G,r,B as J,A as c,j as e,h as x,L as B,m as M}from"./index-Dr2bAMPU.js";import{a as S}from"./axios-Cm0UX6qg.js";import{B as T}from"./config-HOLfLxHr.js";import{b as K}from"./CContainer-u87GNtez.js";import{C as W}from"./CNavbar-B7PVcNkl.js";import{C as j,a as m,b as n,c as a,d as u,e as t}from"./CTable-Bfn_R52F.js";import{c as X,C as v}from"./DefaultLayout-B2Nh7q8u.js";import{C as D,a as I,b as L,c as O}from"./CModalTitle-DKRx84Yh.js";import{c as Z}from"./cil-info-CmGCY32x.js";import{C as A}from"./CModalFooter-op4IeWM8.js";import{C as ee}from"./CCardImage-CGnGRqbq.js";const je=()=>{var k;const[{user:p,token:d},i]=U();G();const[f,E]=r.useState([]),[w,h]=r.useState(!1),[z,g]=r.useState(!1),{id:N}=J(),[F,H]=r.useState([]),[R,C]=r.useState(!1),[P,y]=r.useState(!1),[V,b]=r.useState([]),[Y,se]=r.useState(!1);r.useEffect(()=>{const s=setTimeout(()=>{i({type:c,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),h(!1)},2e4);return p&&d&&_(N,s),()=>{clearTimeout(s)}},[p,d]);const _=(s,l)=>{h(!0),S.get(T+"assistant/solo/courier/markets/"+s,{headers:{Authorization:`Bearer ${d}`}}).then(o=>{o.status===200?(console.log(o.data),E(o.data),h(!1),clearTimeout(l)):o.status===203?i({type:c,payload:{status:!0,title:"Batch markets loading error",message:o.data.message}}):o.status===204?i({type:c,payload:{status:!0,title:"Batch markets loading error",message:o.data.message}}):o.status===500&&i({type:c,payload:{status:!0,title:"Batch markets loading error",message:o.data.message}})}).catch(o=>{console.error("Error:",o)})},$=s=>{C(!0),console.log(s),q()},q=s=>{g(!0),S.get(T+"assistant/solo/couriers/market/orders/670d25c339b74a4f1462d5fd",{headers:{Authorization:`Bearer ${d}`}}).then(l=>{l.status===200?(H(l.data),g(!1)):l.status===203?i({type:c,payload:{status:!0,title:"Batch markets loading error",message:l.data.message}}):l.status===204?i({type:c,payload:{status:!0,title:"Batch markets loading error",message:l.data.message}}):l.status===500&&i({type:c,payload:{status:!0,title:"Batch markets loading error",message:l.data.message}})}).catch(l=>{console.error("Error:",l)})},Q=s=>{y(!0),b(s)};return e.jsxs(K,{children:[e.jsx(W,{className:"bg-body-tertiary"}),w?e.jsx(x,{}):e.jsxs(j,{children:[e.jsx(m,{children:e.jsxs(n,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"Chain Name"}),e.jsx(a,{scope:"col",children:"Address"}),e.jsx(a,{scope:"col",children:"Orders"})]})}),e.jsx(u,{children:(k=f.markets)==null?void 0:k.map((s,l)=>e.jsxs(n,{children:[e.jsx(t,{children:l+1}),e.jsx(t,{children:s.chain}),e.jsx(t,{children:s.address}),e.jsx(t,{children:e.jsx(B,{children:e.jsx(M,{onClick:()=>{$(f.id)},icon:X,size:"xl"})})})]},l))})]}),e.jsxs(D,{visible:R,scrollable:!0,size:"xl",onClose:()=>C(!1),children:[e.jsx(I,{closeButton:!0,children:e.jsx(L,{children:"Market Order List Information"})}),e.jsx(O,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:z?e.jsx(x,{}):e.jsxs(j,{children:[e.jsx(m,{children:e.jsxs(n,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"No"}),e.jsx(a,{scope:"col",children:"Status"}),e.jsx(a,{scope:"col",children:"Address"}),e.jsx(a,{scope:"col",children:"Delivery Fee"}),e.jsx(a,{scope:"col",children:"Slot"}),e.jsx(a,{scope:"col",children:"Date"}),e.jsx(a,{scope:"col",children:"Total"}),e.jsx(a,{scope:"col",children:"Markup"}),e.jsx(a,{scope:"col",children:"Order Items"})]})}),e.jsx(u,{children:F.map((s,l)=>e.jsxs(n,{children:[e.jsx(t,{children:l+1}),e.jsx(t,{children:s.no}),e.jsx(t,{children:e.jsx(v,{style:{width:80},color:"info",children:s.status})}),e.jsx(t,{children:s.address}),e.jsx(t,{children:((s==null?void 0:s.deliveryFee)??0).toFixed(2)}),e.jsx(t,{children:s.slot}),e.jsx(t,{children:s.date}),e.jsx(t,{children:((s==null?void 0:s.total)??0).toFixed(2)}),e.jsx(t,{children:s.markup}),e.jsx(t,{children:e.jsx(B,{children:e.jsx(M,{icon:Z,size:"xl",onClick:()=>{Q(s.items)}})})})]},l))})]})}),e.jsx(A,{})]}),e.jsxs(D,{visible:P,scrollable:!0,size:"xl",onClose:()=>{b([]),y(!1)},children:[e.jsx(I,{closeButton:!0,children:e.jsx(L,{children:"Order Products List Information"})}),e.jsx(O,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:Y?e.jsx(x,{}):e.jsxs(j,{children:[e.jsx(m,{children:e.jsxs(n,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"Photo"}),e.jsx(a,{scope:"col",children:"Name"}),e.jsx(a,{scope:"col",children:"Price"}),e.jsx(a,{scope:"col",children:"Qty"}),e.jsx(a,{scope:"col",children:"Measure"}),e.jsx(a,{scope:"col",children:"Market"}),e.jsx(a,{scope:"col",children:"Status"})]})}),e.jsx(u,{children:V.map((s,l)=>e.jsxs(n,{children:[e.jsx(t,{children:l+1}),e.jsx(t,{children:e.jsx(ee,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.photo})}),e.jsx(t,{children:s.name}),e.jsx(t,{children:s.price}),e.jsx(t,{children:s.qty}),e.jsx(t,{children:s.measure}),e.jsxs(t,{children:[s.chain," - ",s.market]}),e.jsx(t,{children:e.jsx(v,{style:{width:80},color:"info",children:s.status})})]},l))})]})}),e.jsx(A,{})]})]})};export{je as default};
