import{r as s,y as z,l as H,A as p,j as t,h as _}from"./index-D3QfJGEc.js";import{a as F}from"./axios-Cm0UX6qg.js";/* empty css               */import{B as U}from"./config-HOLfLxHr.js";import{f as y}from"./index-PqYCJD3r.js";import{b as q}from"./CContainer-SkiLYL4n.js";import{C as G}from"./CNavbar-DrnOaIAd.js";import{D as J}from"./index-D_zuUMqo.js";import{C as K}from"./CFormInput-kbUX0XsV.js";import{C as V,a as W,b as D,c as r,e as c,d as X}from"./CTable-0Zi6KOL_.js";import{C as Y}from"./CCardImage-Be8VNZHU.js";import{C as Z,a as b}from"./CPaginationItem-WVPg8jye.js";import"./typeof-QjJsDpFa.js";import"./inheritsLoose-BR9xv5Kf.js";import"./CFormLabel-WCNlfVmk.js";const ye=()=>{s.useState(!1),s.useState(!1);const[{user:P,token:f},d]=z();H();const[T,w]=s.useState([]);s.useState([]);const[I,x]=s.useState(!1);s.useState(!1),s.useState([]);const[i,j]=s.useState([]),[u,C]=s.useState(0),[N,M]=s.useState(!0),[v,R]=s.useState(0),[h,S]=s.useState(1);s.useState("EMAIL");const[n,k]=s.useState(""),[A,E]=s.useState(n);s.useEffect(()=>{const e=new Date,o=new Date(e.getTime()-30*24*60*60*1e3),a=y(o,"yyyy-MM-dd"),m=y(e,"yyyy-MM-dd");j([a,m]),console.log(a,m)},[]),s.useEffect(()=>{const e=setTimeout(()=>{d({type:p,payload:{status:!0,title:"Data Loading",message:"There no data to display at the moment or something went wrong",color:"warning"}}),x(!1)},2e4);return P&&f&&g(0,e),()=>{clearTimeout(e)}},[P,f,i,A]),s.useEffect(()=>{const e=setTimeout(()=>{(n.length>=3||n.length===0)&&E(n)},500);return()=>{clearTimeout(e)}},[n]);const g=(e,o)=>{console.log(e,i),x(!0),F.get(U+`assistant/users/advance/search/${e}?date=${i}&name=${n}`,{headers:{Authorization:`Bearer ${f}`}}).then(a=>{a.status===200?(w(a.data.list),R(a.data.count),console.log(a.data.list),x(!1),clearTimeout(o),a.data.list.length<50?(M(!0),console.log("ok")):a.data.list.length>49&&M(!1)):a.status===203?d({type:p,payload:{status:!0,title:"Orders loading error",message:a.data.message}}):a.status===204?d({type:p,payload:{status:!0,title:"Orders loading error",message:a.data.message}}):a.status===500&&d({type:p,payload:{status:!0,title:"Orders loading error",message:a.data.message}})}).catch(a=>{console.error("Error:",a)})},L=()=>{S(h+1);const e=u+50;C(e),g(e,!0)},O=()=>{S(h-1);const e=u-50;console.log(e),C(e),g(e,!1)},B=e=>{S(e);const o=(e-1)*50;C(o),g(o,!0)},Q=()=>{const e=Math.ceil(v/50),o=[];for(let l=1;l<=e;l++)o.push(l);const a=Math.max(h-2,1),m=Math.min(a+4,e);return o.slice(a-1,m).map(l=>t.jsx(b,{active:h===l,onClick:()=>B(l),children:l},l))},$=e=>{if(e){const o=y(e[0],"yyyy-MM-dd"),a=y(e[1],"yyyy-MM-dd");j([o,a])}else j([])};return t.jsxs(q,{children:[t.jsxs(G,{className:"bg-body-tertiary",children:[t.jsx(J,{style:{marginLeft:0},format:"yyyy/MM/dd",onChange:$,value:i.length>0?[new Date(i[0]),new Date(i[1])]:null}),t.jsx(K,{type:"text",placeholder:"Search by customer name, surname, email and contact",style:{width:450,marginRight:"0%"},value:n,onChange:e=>k(e.target.value)})]}),I?t.jsx("div",{className:"d-flex justify-content-center",children:t.jsx(_,{style:{marginTop:"15%"}})}):t.jsxs(V,{children:[t.jsx(W,{children:t.jsxs(D,{children:[t.jsx(r,{scope:"col",children:"#"}),t.jsx(r,{scope:"col",children:"Photo"}),t.jsx(r,{scope:"col",children:"Name"}),t.jsx(r,{scope:"col",children:"Surname"}),t.jsx(r,{scope:"col",children:"email"}),t.jsx(r,{scope:"col",children:"Contact"}),t.jsx(r,{scope:"col",children:"Country"}),t.jsx(r,{scope:"col",children:"Language"})]})}),T.length===0?t.jsx(D,{children:t.jsx(c,{colSpan:"8",style:{textAlign:"center",backgroundColor:"white"},children:t.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):t.jsx(X,{children:T.map((e,o)=>t.jsxs(D,{children:[t.jsx(c,{children:u+o+1}),t.jsx(r,{children:t.jsx(Y,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+e.photo})}),t.jsx(c,{children:e.name}),t.jsx(c,{children:e.surname}),t.jsx(c,{children:e.email}),t.jsx(c,{children:e.contact}),t.jsx(c,{children:e.country==="it"||e.country==="Italy"?"Italy":e.country}),t.jsx(c,{children:e.language==="en"?"English":e.language==="it"?"Italy":e.language})]},o))})]}),t.jsxs(Z,{"aria-label":"Page navigation example",children:[t.jsx(b,{disabled:u<=0,onClick:O,children:"Previous"}),Q(),t.jsx(b,{disabled:N===!0,onClick:L,children:"Next"})]})]})};export{ye as default};