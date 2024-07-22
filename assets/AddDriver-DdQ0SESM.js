import{r as a,y as L,l as M,j as e,A as n}from"./index-Cmo8jOUG.js";import{a as T}from"./axios-Cm0UX6qg.js";import{B as _}from"./config-HOLfLxHr.js";import{m as z}from"./helpers-KIKB9CVT.js";import{b as O,a as U}from"./CContainer-D7fLRyZt.js";import{C as s}from"./CCol-B7RSY0v1.js";import{C as r}from"./CFormInput-C1iM2HIO.js";import{C as S}from"./CFormSelect-DP_TgmHO.js";import"./CFormLabel-Ds_mHWoR.js";const Z=()=>{const[i,b]=a.useState(),[d,w]=a.useState(),[u,E]=a.useState(),[c,V]=a.useState(),[m,D]=a.useState(),[g,A]=a.useState(),[h,R]=a.useState(),[p,N]=a.useState(),[x,B]=a.useState(),[v,y]=a.useState(),[j,I]=a.useState(),[C,k]=a.useState(),[{user:F,token:f},l]=L(),P=M();a.useEffect(()=>{const t=z(8);k(t)},[]);const G=()=>{if(i&&d&&u&&c&&m&&g&&p&&h&&x&&j&&C){const t={name:i,surname:d,password:u,email:c,code:C,contact:m,iban:g,city:p,vat:v,employeeId:h,gender:x,address:j};f&&F&&f&&T.post(_+"rider/create",t,{headers:{Authorization:`Bearer ${f}`}}).then(o=>{o.status===200?(l({type:n,payload:{status:!0,title:"Driver Registration",message:"Driver Registration Success",color:"success"}}),P("/driver/view")):o.status===203?l({type:n,payload:{status:!0,title:"Driver Registration error",message:o.data.message,color:"warning"}}):o.status===204?l({type:n,payload:{status:!0,title:"Driver Registration error",message:o.data.message,color:"warning"}}):o.status===500&&l({type:n,payload:{status:!0,title:"Driver Registration error",message:o.data.message,color:"warning"}})}).catch(o=>{console.error("Error:",o)})}else l({type:n,payload:{status:!0,title:"Error!",message:"Driver Registration error, Please Check the input fields",color:"warning"}})};return e.jsx(O,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(s,{md:6,children:e.jsx(r,{id:"name",label:"Firt Name",defaultValue:i,onChange:t=>b(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"surname",label:"LastName",defaultValue:d,onChange:t=>w(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"address",label:"Address",defaultValue:j,onChange:t=>I(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"password",label:"Password",type:"password",defaultValue:u,onChange:t=>E(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"email",label:"Email",defaultValue:c,onChange:t=>V(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"phone",label:"Contact Number",defaultValue:m,onChange:t=>D(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"iban",label:"IBAN",defaultValue:g,onChange:t=>A(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"employeeid",label:"Employee Id",defaultValue:h,onChange:t=>R(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"vat",label:"Vat",defaultValue:v,onChange:t=>y(t.target.value)})}),e.jsx(s,{md:6,children:e.jsx(r,{id:"code",label:"Code",defaultValue:C,readOnly:!0,onChange:t=>y(t.target.value)})}),e.jsx(s,{md:6,children:e.jsxs(S,{id:"inputState",label:"City",value:p,onChange:t=>N(t.target.value),children:[e.jsx("option",{children:"Select City"}),e.jsx("option",{children:"Milano"}),e.jsx("option",{children:"Napoli"})]})}),e.jsx(s,{md:6,children:e.jsxs(S,{id:"gender",label:"Gender",value:x,onChange:t=>B(t.target.value),children:[e.jsx("option",{children:"Select Gender"}),e.jsx("option",{children:"Male"}),e.jsx("option",{children:"Female"})]})}),e.jsx(s,{xs:12,children:e.jsx(U,{style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>G(),children:"Add Driver"})})]})})};export{Z as default};