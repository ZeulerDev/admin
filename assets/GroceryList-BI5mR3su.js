import{D as h,y as j,r as t,j as s,i as u,L as m}from"./index-D7hMCpfZ.js";import{a as C}from"./axios-Cm0UX6qg.js";import{B as f}from"./config-HOLfLxHr.js";import{b,a as g}from"./CContainer-CtIWBirN.js";import{C as T}from"./CNavbar-CF5s_Yu1.js";import{C as y,a as E,b as d,c as a,d as L,e as r}from"./CTable-DPgvjQZA.js";const v=()=>{const{id:l}=h(),[{token:o},i]=j(),[n,x]=t.useState([]),[p,c]=t.useState(!1);return t.useEffect(()=>{o&&(c(!0),C.get(f+"assistant/list/customer/"+l,{headers:{Authorization:`Bearer ${o}`}}).then(e=>{e.status===200?(x(e.data),c(!1)):e.status===500&&i({type:SET_ALERT,payload:{status:!0,title:"Orders loading error",message:e.data.message}})}).catch(e=>{console.error("Error:",e)}))},[]),s.jsxs(b,{children:[s.jsx(T,{className:"bg-body-tertiary"}),p?s.jsx(u,{}):s.jsxs(y,{children:[s.jsx(E,{children:s.jsxs(d,{children:[s.jsx(a,{scope:"col",children:"Name"}),s.jsx(a,{scope:"col",children:"Total"}),s.jsx(a,{scope:"col",children:"Date"}),s.jsx(a,{scope:"col",children:"Saving"}),s.jsx(a,{scope:"col",children:"Address"}),s.jsx(a,{scope:"col"})]})}),s.jsx(L,{children:n.map(e=>s.jsxs(d,{children:[s.jsx(a,{scope:"row",children:e.name}),s.jsx(r,{children:e.total}),s.jsx(r,{children:e.date}),s.jsx(r,{children:e.saving}),s.jsx(r,{children:e.address.address}),s.jsx(r,{children:s.jsx(m,{to:`/customers/orders/products/${e.id}`,children:s.jsx(g,{color:"primary",style:{marginLeft:"5px"},children:"View Products"})})})]},e.id))})]})]})};export{v as default};
