import{r as d,_ as N,a as b,b as E,c as L,P as p,l as S,y as w,j as a,m as u,S as T,z as A,A as n}from"./index-D7hMCpfZ.js";import{a as V}from"./axios-Cm0UX6qg.js";import{m as I}from"./helpers-KIKB9CVT.js";import{B as _}from"./config-HOLfLxHr.js";import{b as k,a as R}from"./CContainer-CtIWBirN.js";import{C as h}from"./CRow-CssFVCFd.js";import{C as x}from"./CCol-DHGwoefR.js";import{C as B,a as H}from"./CCardBody-C0SbaLa4.js";import{C,a as y}from"./CInputGroupText-7mz4RZUu.js";import{C as f}from"./CFormInput-C_rKCNW0.js";import"./CFormLabel-COYWKIaa.js";var m=d.forwardRef(function(e,i){var t=e.children,l=e.className,c=N(e,["children","className"]);return b.createElement("div",E({className:L("card-group",l)},c,{ref:i}),t)});m.propTypes={children:p.node,className:p.string};m.displayName="CCardGroup";var M=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M384,200V144a128,128,0,0,0-256,0v56H88V328c0,92.635,75.364,168,168,168s168-75.365,168-168V200ZM160,144a96,96,0,0,1,192,0v56H160ZM392,328c0,74.99-61.01,136-136,136s-136-61.01-136-136V232H392Z' class='ci-primary'/>"],Z=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z' class='ci-primary'/>"];const Q=()=>{const[e,i]=d.useState(""),[t,l]=d.useState(""),c=S(),[G,o]=w(),g=()=>{if(e&&t){const r=I(32),j={browserId:r,email:e,password:t};V.post(_+"assistant/login",j).then(s=>{if(s.status===200){const v={browser:r,code:s.data.token};localStorage.setItem("userData",JSON.stringify(v)),o({type:T,payload:s.data.user}),o({type:A,payload:s.data.token}),c("/")}else s.status===203?o({type:n,payload:{status:!0,title:"Login error",message:s.data.message}}):s.status===204?o({type:n,payload:{status:!0,title:"Login error",message:s.data.message}}):s.status===500&&o({type:n,payload:{status:!0,title:"Login error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})}else alert("Both fields are required!")};return a.jsx("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:a.jsx(k,{children:a.jsx(h,{className:"justify-content-center",children:a.jsx(x,{md:6,children:a.jsx(m,{children:a.jsx(B,{className:"p-4",children:a.jsx(H,{children:a.jsxs("div",{children:[a.jsx("h1",{children:"Login"}),a.jsx("p",{className:"text-body-secondary",children:"Sign In to your account"}),a.jsxs(C,{className:"mb-3",children:[a.jsx(y,{children:a.jsx(u,{icon:Z})}),a.jsx(f,{placeholder:"Username",autoComplete:"username",value:e,onChange:r=>i(r.target.value)})]}),a.jsxs(C,{className:"mb-4",children:[a.jsx(y,{children:a.jsx(u,{icon:M})}),a.jsx(f,{type:"password",placeholder:"Password",autoComplete:"current-password",value:t,onChange:r=>l(r.target.value)})]}),a.jsx(h,{children:a.jsx(x,{xs:6,children:a.jsx(R,{color:"primary",className:"px-4",onClick:g,children:"Login"})})})]})})})})})})})})};export{Q as default};
