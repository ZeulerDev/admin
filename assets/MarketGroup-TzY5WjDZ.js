import{y as N,r as o,A as l,j as e,L as m,i as B}from"./index-CaYaFnV6.js";import{a as D}from"./axios-Cm0UX6qg.js";import{B as M}from"./config-HOLfLxHr.js";import{b as $,a as c}from"./CContainer-B9Em2jPq.js";import{C as z}from"./CNavbar-DMXNcqxD.js";import{C as I}from"./CForm-C7sOUWBh.js";import{C as _,a as H,b as F,c as g}from"./DefaultLayout-DweglOhE.js";import{C as U,a as q,b as v,c as i,d as J,e as h}from"./CTable-DeWYaT23.js";import{C as K,a as w}from"./CPaginationItem-2nqblV7r.js";const ae=()=>{const[{user:x,token:d},r]=N(),[C,f]=o.useState(""),[G,j]=o.useState("All Cities"),[P,S]=o.useState([]),[u,k]=o.useState(0),[A,y]=o.useState(!0),[L,b]=o.useState(!1),p=t=>{t==="all"?(f(""),j("All Cities")):(f(t),j(t))};o.useEffect(()=>{x&&d&&n(0)},[x,C]);const n=(t,a)=>{b(!0),D.get(M+`market/groups/fetch/${t}?city=${C}`,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{console.log(s.status),s.status===200?(S(s.data),b(!1),s.data.length<20?(y(!0),console.log("ok")):s.data.length>19&&y(!1)):s.status===500&&r({type:l,payload:{status:!0,title:"Makrket Group loading error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})},T=()=>{const t=u+20;k(t),n(t)},E=()=>{const t=u-20;console.log(t),k(t),n(t)},R=t=>{console.log(t),D.delete(M+"marketgroup/"+t,{headers:{Authorization:`Bearer ${d}`}}).then(a=>{a.status===200?(r({type:l,payload:{status:!0,title:"Market Group Delete",message:"Market Group Delete Success",color:"success"}}),n(0),console.log("Remove Market Group")):a.status===203?r({type:l,payload:{status:!0,title:"Market Group Delete",message:a.data.message,color:"warning"}}):a.status===404?r({type:l,payload:{status:!0,title:"Market Group Delete",message:a.data.message,color:"warning"}}):a.status===500&&r({type:l,payload:{status:!0,title:"Market Group Delete",message:a.data.message,color:"warning"}})}).catch(a=>{console.error("Error:",a)})};return e.jsxs($,{children:[e.jsxs(z,{className:"bg-body-tertiary",children:[e.jsxs(I,{children:[e.jsx(m,{to:"/marketgroups/marketmap",children:e.jsx(c,{type:"submit",color:"success",variant:"outline",style:{marginLeft:"5px"},children:"Add Market"})}),e.jsx(m,{to:"/marketgroups/createmarketgroup",children:e.jsx(c,{type:"submit",color:"warning",variant:"outline",style:{marginLeft:"5px"},children:"Create Market Group"})})]}),e.jsxs(_,{style:{marginLeft:"40%",width:"10%",marginRight:"5px",backgroundColor:"#ff4d4d"},children:[e.jsx(H,{children:G}),e.jsxs(F,{children:[e.jsx(g,{onClick:()=>p("all"),children:"All"}),e.jsx(g,{onClick:()=>p("Milano"),children:"Milano"}),e.jsx(g,{onClick:()=>p("Napoli"),children:"Napoli"})]})]})]}),L?e.jsx(B,{}):e.jsxs(U,{children:[e.jsx(q,{children:e.jsxs(v,{children:[e.jsx(i,{scope:"col",children:"Name"}),e.jsx(i,{scope:"col",children:"City"}),e.jsx(i,{scope:"col",children:"Location"}),e.jsx(i,{scope:"col",children:"Remove"})]})}),e.jsx(J,{children:P.map((t,a)=>e.jsxs(v,{children:[e.jsx(i,{scope:"row",children:t.name}),e.jsx(h,{children:t.city}),e.jsx(h,{children:e.jsx(m,{to:`/marketgroups/marketdistance/${t._id}`,children:e.jsx(c,{size:"sm",color:"light",variant:"outline",style:{marginLeft:"5px"},children:"view"})})}),e.jsx(h,{children:e.jsx(c,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>R(t._id),children:"Remove"})})]},a))})]}),e.jsxs(K,{"aria-label":"Page navigation example",children:[e.jsx(w,{disabled:u<=0,onClick:E,children:"Previous"}),e.jsx(w,{disabled:A===!0,onClick:T,children:"Next"})]})]})};export{ae as default};