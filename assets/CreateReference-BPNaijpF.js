import{y as G,r as o,A as n,j as e,h as H}from"./index-DL088vmD.js";import{a as A}from"./axios-Cm0UX6qg.js";import{B as J}from"./config-HOLfLxHr.js";import{b as K,a as O}from"./CContainer-Cz7hNUvN.js";import{a as C,b as m,c as p,d as l}from"./DefaultLayout-CbdqckCh.js";const tt=()=>{const[{user:M,token:c},r]=G(),[T,D]=o.useState([]),[b,S]=o.useState(null),[P,L]=o.useState([]),[Q,k]=o.useState(""),[E,d]=o.useState("All Chains"),[B,x]=o.useState("All market"),[$,g]=o.useState("All market"),[W,j]=o.useState(""),[U,h]=o.useState("All Chains"),[_,z]=o.useState([]),[R,F]=o.useState([]),[V,y]=o.useState(null),[q,i]=o.useState(!1);o.useEffect(()=>{c&&A.get("http://localhost:8003/assistant/market/chains/all",{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?(D(t.data),F(t.data)):t.status===500&&r({type:n,payload:{status:!0,title:"Chain Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},[]);const w=(t,s)=>{A.get(`http://localhost:8003/assistant/market/locations?brand=${t}`,{headers:{Authorization:`Bearer ${c}`}}).then(a=>{a.status===200?s==="from"?L(a.data.data):s==="to"&&z(a.data.data):a.status===500&&r({type:n,payload:{status:!0,title:"Market Loading error",message:a.data.message}})}).catch(a=>{console.error("Error: ",a)})},u=(t,s,a)=>{s==="from"?t==="all"?(k(""),d("All Chains")):(k(t),w(t,"from"),d(a)):s==="to"&&(t==="all"?(j(""),h("All Chains")):(j(t),w(t,"to"),h(a)))},f=(t,s,a)=>{s==="from"?t==="all"?(S(""),x("All Markets"),k(""),d("All Chains")):(S(t),x(a)):s==="to"&&(t==="all"?(y(""),g("All Markets"),j(""),h("All Chains")):(y(t),g(a)))},v=(t,s)=>{console.log("Update",t,s),i(!0),M&&A.post(J+`product/market/copy?from=${t}&to=${s}`,null,{headers:{Authorization:`Bearer ${c}`}}).then(a=>{a.status===200?(d("All Chains"),x("All Markets"),h("All Chains"),g("All Markets"),i(!1),r({type:n,payload:{status:!0,title:"Product Clone",message:"Products cloned successfully",color:"success"}})):a.status===204?(r({type:n,payload:{status:!0,title:"Product Clone",message:"Products clone error",color:"warning"}}),i(!1)):a.status===404?(r({type:n,payload:{status:!0,title:"Product Clone",message:"No products to clone",color:"warning"}}),i(!1)):a.status===500&&(r({type:n,payload:{status:!0,title:"Product Clone",message:"Products clone error",color:"warning"}}),i(!1))}).catch(a=>{console.error("Error: ",a)})};return e.jsxs(K,{children:[e.jsx("h4",{children:"From"}),e.jsx("br",{}),e.jsxs(C,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(m,{style:{color:"white"},children:E}),e.jsxs(p,{children:[e.jsx(l,{onClick:()=>u("all","from"),children:"All"}),T.map((t,s)=>e.jsx(l,{onClick:()=>u(t.id,"from",t.name),children:t.name},s))]})]}),e.jsxs(C,{style:{marginLeft:"2%",width:"53%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(m,{style:{color:"white"},children:B}),e.jsxs(p,{children:[e.jsx(l,{onClick:()=>f("all","from"),children:"Select the Chain"}),P.map((t,s)=>e.jsx(l,{onClick:()=>f(t._id,"from",t.address),children:t.address},s))]})]}),e.jsx("br",{}),"  ",e.jsx("h4",{children:"To"}),e.jsx("br",{}),e.jsxs(C,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(m,{style:{color:"white"},children:U}),e.jsxs(p,{children:[e.jsx(l,{onClick:()=>u("all","to"),children:"All"}),R.map((t,s)=>e.jsx(l,{onClick:()=>u(t.id,"to",t.name),children:t.name},s))]})]}),e.jsxs(C,{style:{marginLeft:"2%",width:"53%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(m,{style:{color:"white"},children:$}),e.jsxs(p,{children:[e.jsx(l,{onClick:()=>f("all","to"),children:"Select the Chain"}),_.map((t,s)=>e.jsx(l,{onClick:()=>f(t._id,"to",t.address),children:t.address},s))]})]}),e.jsx("br",{}),e.jsx(O,{onClick:()=>v(b,V),style:{marginLeft:"2%",marginTop:"2%",backgroundColor:"#ff4d4d",color:"white"},children:q?e.jsx(H,{}):"Update Market"})]})};export{tt as default};
