import{r as a,y,l as P,j as t,A as i}from"./index-DL088vmD.js";import{a as D}from"./axios-Cm0UX6qg.js";import{m as E}from"./helpers-KIKB9CVT.js";import{B as R}from"./config-HOLfLxHr.js";/* empty css               */import{b as S,a as b}from"./CContainer-Cz7hNUvN.js";import{C as r}from"./CCol-B72LVP_5.js";import{C as n}from"./CFormInput-CpQLZKmo.js";import"./CFormLabel-Be3SnnEd.js";const L=()=>{const[l,g]=a.useState(),[m,f]=a.useState(),[d,h]=a.useState(),[u,p]=a.useState(),[{user:x,token:c},s]=y(),C=P();a.useEffect(()=>{const e=E(8);p(e)},[]);const j=()=>{if(l&&m&&d&&u){const e={name:l,startDate:m,endDate:d,promo_id:u};c&&x&&c&&D.post(R+"promotion/registration",e,{headers:{Authorization:`Bearer ${c}`}}).then(o=>{o.status===200?(s({type:i,payload:{status:!0,title:"Promotion Registration",message:"Promotion Registration Success",color:"success"}}),C("/promotions/all")):o.status===400?s({type:i,payload:{status:!0,title:"Promotion Registration error",message:"Promotion Registration error",color:"warning"}}):o.status===500&&s({type:i,payload:{status:!0,title:"Promotion Registration error",message:"Promotion Registration error 500",color:"warning"}})}).catch(o=>{console.error("Error:",o)})}else s({type:i,payload:{status:!0,title:"Error!",message:"Promotion Registration error, Please Check the input fields",color:"warning"}})};return t.jsx(S,{children:t.jsxs("div",{className:"row g-3",children:[t.jsx(r,{md:6,children:t.jsx(n,{id:"name",label:"Promotion Name",defaultValue:l,onChange:e=>g(e.target.value)})}),t.jsx(r,{md:6,children:t.jsx(n,{id:"startDate",type:"date",label:"Start Date",defaultValue:m,onChange:e=>f(e.target.value)})}),t.jsx(r,{md:6,children:t.jsx(n,{id:"endDate",type:"date",label:"End Date",defaultValue:d,onChange:e=>h(e.target.value)})}),t.jsx(r,{md:6,children:t.jsx(n,{id:"Promotion ID",label:"promotionid",defaultValue:u,readOnly:!0,onChange:e=>p(e.target.value)})}),t.jsx(r,{xs:12,children:t.jsx(b,{style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>j(),children:"Add Promotion"})})]})})};export{L as default};
