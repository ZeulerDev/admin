import{r as p,y as h,l as y,j as e,A as r}from"./index-BzWpTyRP.js";import{a as x}from"./axios-Cm0UX6qg.js";import{B as k}from"./config-HOLfLxHr.js";import{b as C,a as j}from"./CContainer-BohUAxSl.js";import{C as l}from"./CCol-DZj90Uni.js";import{C as c}from"./CFormInput-ztrVIr0j.js";import"./CFormLabel-BSwA839n.js";const w=()=>{const[o,u]=p.useState(),[i,m]=p.useState(),[{user:d,token:n},s]=h(),g=y(),f=()=>{if(o&&i){const t={name:o,url:i};console.log(t),d&&n&&x.post(k+"app/flayer/link/create",t,{headers:{Authorization:`Bearer ${n}`}}).then(a=>{a.status===200?(s({type:r,payload:{status:!0,title:"Link Registration",message:"Link Registration Success",color:"success"}}),g("/marketing/app/flayer/all")):a.status===400?s({type:r,payload:{status:!0,title:"Link Registration error",message:"Please check the input field"}}):a.status===500&&s({type:r,payload:{status:!0,title:"Link Registration error",message:a.data.message}})}).catch(a=>{console.error("Error:",a)})}else console.log("Please check the input field"),s({type:r,payload:{status:!0,title:"Registration error",message:"Please check the input field",color:"warning"}})};return e.jsx(C,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(l,{md:6,children:e.jsx(c,{id:"name",label:"App Flayer Name",defaultValue:o,onChange:t=>u(t.target.value)})}),e.jsx(l,{md:6,children:e.jsx(c,{id:"url",label:"Url",defaultValue:i,onChange:t=>m(t.target.value)})}),e.jsx(l,{xs:12,children:e.jsx(j,{color:"warning",type:"submit",style:{marginBottom:"3%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>f(),children:"Add Link"})})]})})};export{w as default};
