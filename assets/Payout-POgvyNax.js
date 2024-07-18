import{r as o,x as J,z as x,j as s,h as K}from"./index-CDqShAOb.js";import{a as N}from"./axios-B4uVmeYG.js";import{PDFViewer as H}from"./react-pdf.browser-DJMtX2J3.js";import X from"./FlatRateVatRegistrationPDF-iGTG0TkH.js";import Z from"./OccasionalEmployeePDF-Co3JeETR.js";/* empty css               */import{B as M}from"./config-HOLfLxHr.js";import{b as ss,a as i}from"./CContainer-DEegVvsu.js";import{d as V,C as es,a as ts,b as as,c as d}from"./DefaultLayout-C9KYxm3W.js";import{C as os}from"./CNavbar-B6oj_pJK.js";import{C as ls}from"./CFormInput-Bjg6Coe7.js";import{C as rs,a as ns,b as O,c as l,d as is,e as r}from"./CTable-CP7UyO6E.js";import{C as w,a as b,b as S,c as m}from"./CModalTitle-DaPHYhnr.js";import"./createClass-BvLlRGHb.js";import"./index-BoUWQVJe.js";import"./zeuler-B_--SqBc.js";import"./CFormLabel-DWl-bp6_.js";const ks=()=>{const[f,v]=o.useState(!1),[P,u]=o.useState(!1),[{user:D,token:p},h]=J(),[Y,k]=o.useState(!1),[T,A]=o.useState([]),[y,$]=o.useState([]),[_,B]=o.useState("All"),[E,R]=o.useState(""),[j,Q]=o.useState(""),[z,g]=o.useState(""),[F,W]=o.useState(""),[cs,U]=o.useState(!1);o.useEffect(()=>{D&&p&&q()},[E,j]);const q=()=>{k(!0),N.get(M+`assistant/drivers/payouts/0?status=${E}&no=${j}`,{headers:{Authorization:`Bearer ${p}`}}).then(e=>{e.status===200?(A(e.data),k(!1),U(!1)):e.status===204?h({type:x,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}}):e.status===500&&h({type:x,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}})}).catch(e=>{console.log("Error",e)})},G=(e,t)=>{v(!f),$({type:e,item:t}),console.log("Toggle",e,t)},C=(e,t)=>{u(!f),W(e),console.log("VIew",e,t),t==="waiting"||t==="sent"?g("ready"):t==="ready"&&g("done")},L=()=>{console.log("Confirmation",z,F);const e={status:z};D&&p&&N.patch(M+"assistant/payout/change/"+F,e,{headers:{Authorization:`Bearer ${p}`}}).then(t=>{if(t.status===200){console.log("updated"),u(!1);const a=t.data,n=T.map(I=>I.id===a.id?a:I);A([...n])}else t.status===203?h({type:x,payload:{status:!0,title:"Driver Payout status error",message:t.data.message}}):t.status===204?(console.log("204"),h({type:x,payload:{status:!0,title:"Driver Payout status error",message:t.data.message}})):t.status===500&&h({type:x,payload:{status:!0,title:"Driver Payout status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},c=e=>{e==="all"?(R(""),B("All")):(console.log(e),R(e),B(e))};return s.jsxs(ss,{children:[s.jsx(V,{style:{marginLeft:"75%"},color:"secondary",children:"Filter by"}),s.jsxs(es,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[s.jsx(ts,{style:{color:"white"},children:_}),s.jsxs(as,{children:[s.jsx(d,{onClick:()=>c("all"),children:"All"}),s.jsx(d,{onClick:()=>c("pending"),children:"Pending"}),s.jsx(d,{onClick:()=>c("sent"),children:"Sent"}),s.jsx(d,{onClick:()=>c("ready"),children:"Ready"}),s.jsx(d,{onClick:()=>c("waiting"),children:"Waiting"}),s.jsx(d,{onClick:()=>c("done"),children:"Done"})]})]}),s.jsx(os,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:s.jsx(ls,{type:"text",placeholder:"Search by No",style:{width:450,marginLeft:"0%"},value:j,onChange:e=>Q(e.target.value)})}),Y?s.jsx(K,{}):s.jsxs(rs,{children:[s.jsx(ns,{children:s.jsxs(O,{children:[s.jsx(l,{scope:"col",children:"#"}),s.jsx(l,{scope:"col",children:"No"}),s.jsx(l,{scope:"col",children:"Name"}),s.jsx(l,{scope:"col",children:"Status"}),s.jsx(l,{scope:"col",children:"Date"}),s.jsx(l,{scope:"col",children:"Total"}),s.jsx(l,{scope:"col",children:"Tax"}),s.jsx(l,{scope:"col",children:"Tips"}),s.jsx(l,{scope:"col",children:"Payable"}),s.jsx(l,{scope:"col",children:"Action"}),s.jsx(l,{scope:"col",children:"PDF"})]})}),s.jsx(is,{children:T.map((e,t)=>{let a="info",n="";return(e==null?void 0:e.status)==="pending"?(n="Pending",a="info"):(e==null?void 0:e.status)==="done"?(n="Paid",a="primary"):(e==null?void 0:e.status)==="sent"?(n="Sent",a="success"):(e==null?void 0:e.status)==="waiting"?(n="Waiting",a="warning"):(e==null?void 0:e.status)==="ready"&&(n="Ready",a="danger"),s.jsxs(O,{children:[s.jsx(r,{children:t+1}),s.jsx(r,{children:e.no}),s.jsx(r,{children:e.name}),s.jsx(r,{children:s.jsx(V,{style:{width:60},color:a,children:n})}),s.jsx(r,{children:e.date}),s.jsx(r,{children:e.total}),s.jsx(r,{children:e.tax}),s.jsx(r,{children:e.tips}),s.jsx(r,{children:e.payable}),s.jsxs(r,{children:[(e==null?void 0:e.status)==="waiting"&&s.jsx(i,{onClick:()=>C(e.id,e.status),size:"sm",color:a,style:{width:90},children:"Received"}),(e==null?void 0:e.status)==="sent"&&s.jsx(i,{size:"sm",onClick:()=>C(e.id,e.status),color:a,style:{width:90},children:"Received"}),(e==null?void 0:e.status)==="ready"&&s.jsx(i,{size:"sm",onClick:()=>C(e.id,e.status),color:a,style:{width:90},children:"To Pay"})]}),s.jsxs(r,{children:[s.jsx(i,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80,color:"white"},onClick:()=>G(e.type,e),children:"View"})," "]})]},t)})})]}),s.jsxs(w,{visible:f,scrollable:!0,size:"xl",onClose:()=>v(!1),children:[s.jsx(b,{closeButton:!0,children:s.jsx(S,{children:"Information"})}),s.jsx(m,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:y.type==="flat_rate"?s.jsx(H,{style:{width:"100%",height:"100vh"},children:s.jsx(X,{data:y.item})}):y.type==="occasional"?s.jsx(H,{style:{width:"100%",height:"100vh"},children:s.jsx(Z,{data:y.item})}):null})]}),s.jsxs(w,{alignment:"center",transition:!1,visible:P,scrollable:!0,size:"lg",onClose:()=>u(!1),children:[s.jsx(b,{closeButton:!0,children:s.jsx(S,{children:"Confirmation"})}),s.jsxs(m,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:[s.jsx("a",{children:"Are you sure you want to pay out status ?"}),s.jsx(i,{onClick:()=>L(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]}),s.jsxs(w,{alignment:"center",visible:P,scrollable:!0,size:"sm",onClose:()=>u(!1),children:[s.jsx(b,{closeButton:!1,children:s.jsx(S,{children:"Confirmation"})}),s.jsxs(m,{children:[s.jsx("a",{children:"Are you sure you want to pay out status ?"}),s.jsx("br",{}),s.jsx("br",{}),s.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[s.jsx(i,{onClick:()=>L(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),s.jsx(i,{onClick:()=>u(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{ks as default};