import{D as A,y as D,r as t,A as j,j as s,h as p}from"./index-Cmo8jOUG.js";import{a as u}from"./axios-Cm0UX6qg.js";import{B as C}from"./config-HOLfLxHr.js";import{b as P,a as O}from"./CContainer-D7fLRyZt.js";import{C as k}from"./CNavbar-15em09iB.js";import{C as m,a as f,b as c,c as a,d as g,e as r}from"./CTable-CC7vKO1g.js";import{C as z,a as L,b as H,c as N}from"./CModalTitle-C6NN_sbf.js";import{C as R}from"./CCardImage-CVyhqt8j.js";import{C as I}from"./CModalFooter-tE8B90GT.js";import"./DefaultLayout-CcL3hFND.js";const K=()=>{const{id:b}=A(),[{token:l},d]=D(),[y,T]=t.useState([]),[S,i]=t.useState(!1),[M,v]=t.useState([]);t.useState([]);const[B,n]=t.useState(!1),[h,x]=t.useState(!1);t.useEffect(()=>{l&&(i(!0),u.get(C+"assistant/list/customer/"+b,{headers:{Authorization:`Bearer ${l}`}}).then(e=>{e.status===200?(T(e.data),i(!1)):e.status===500&&d({type:j,payload:{status:!0,title:"Orders loading error",message:e.data.message}})}).catch(e=>{console.error("Error:",e)}))},[]);const E=e=>{l&&(n(!0),u.get(C+"assistant/products/list/"+e,{headers:{Authorization:`Bearer ${l}`}}).then(o=>{o.status===200?(v(o.data.products),n(!1)):o.status===500&&d({type:j,payload:{status:!0,title:"Order product loading error error",message:o.data.message}})}).catch(o=>{console.error("Error:",o)}))},w=e=>{x(!h),E(e)};return s.jsxs(P,{children:[s.jsx(k,{className:"bg-body-tertiary"}),S?s.jsx(p,{}):s.jsxs(m,{children:[s.jsx(f,{children:s.jsxs(c,{children:[s.jsx(a,{scope:"col",children:"#"}),s.jsx(a,{scope:"col",children:"Name"}),s.jsx(a,{scope:"col",children:"Total"}),s.jsx(a,{scope:"col",children:"Date"}),s.jsx(a,{scope:"col",children:"Saving"}),s.jsx(a,{scope:"col",children:"Address"}),s.jsx(a,{scope:"col",children:"Products"})]})}),s.jsx(g,{children:y.map((e,o)=>s.jsxs(c,{children:[s.jsx(r,{children:o+1}),s.jsx(r,{scope:"row",children:e.name}),s.jsx(r,{children:e.total}),s.jsx(r,{children:e.date}),s.jsx(r,{children:e.saving}),s.jsx(r,{children:e.address.address}),s.jsx(r,{children:s.jsx(O,{onClick:()=>w(e.id),size:"sm",style:{backgroundColor:"#ff4d4d",color:"white"},children:"View"})})]},o))})]}),s.jsxs(z,{visible:h,scrollable:!0,size:"xl",onClose:()=>x(!1),children:[s.jsx(L,{closeButton:!0,children:s.jsx(H,{children:"Customer Order List Information"})}),s.jsx(N,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:B?s.jsx(p,{}):s.jsxs(m,{children:[s.jsx(f,{children:s.jsxs(c,{children:[s.jsx(a,{scope:"col",children:"#"}),s.jsx(a,{scope:"col",children:"Photo"}),s.jsx(a,{scope:"col",children:"Name"}),s.jsx(a,{scope:"col",children:"Price"}),s.jsx(a,{scope:"col",children:"SubTotal"}),s.jsx(a,{scope:"col",children:"Measurement"}),s.jsx(a,{scope:"col",children:"Saving"}),s.jsx(a,{scope:"col",children:"Quantity"}),s.jsx(a,{scope:"col",children:"Chain"}),s.jsx(a,{scope:"col",children:"Market"})]})}),s.jsx(g,{children:M.map((e,o)=>s.jsxs(c,{children:[s.jsx(r,{children:o+1}),s.jsx(r,{scope:"row",children:s.jsx(R,{style:{width:"50px",height:"50px"},src:"https://api.zeuler.com/image/"+e.photo})}),s.jsx(r,{children:e.name}),s.jsx(r,{children:e.price}),s.jsx(r,{children:e.subTotal}),s.jsx(r,{children:e.measurement}),s.jsx(r,{children:e.saving}),s.jsx(r,{children:e.quantity}),s.jsx(r,{children:e.chain}),s.jsx(r,{children:e.market})]},o))})]})}),s.jsx(I,{})]})]})};export{K as default};