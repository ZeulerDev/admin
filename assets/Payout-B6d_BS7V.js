import{r as o,y as J,A as x,j as s,h as K}from"./index-DRBwahOQ.js";import{a as N}from"./axios-Cm0UX6qg.js";import{P as H,F as X,O as Z}from"./OccasionalEmployeePDF-CzkkUDOd.js";/* empty css               */import{B as M}from"./config-HOLfLxHr.js";import{b as ss,a as i}from"./CContainer-ClwVMbXL.js";import{d as O,C as es,a as as,b as ts,c as d}from"./DefaultLayout-BXq3TR03.js";import{C as os}from"./CNavbar-CwM8xPax.js";import{C as ls}from"./CFormInput-BJeaTOMD.js";import{C as ns,a as rs,b as V,c as l,d as is,e as n}from"./CTable-CmbKqvVl.js";import{C as w,a as b,b as S,c as P}from"./CModalTitle-BWuqRlN0.js";import"./inheritsLoose-CkMbdMht.js";import"./index-QTP9ApTX.js";import"./CFormLabel-DvmqnOgH.js";const vs=()=>{const[f,v]=o.useState(!1),[D,u]=o.useState(!1),[{user:k,token:y},h]=J(),[Y,T]=o.useState(!1),[m,A]=o.useState([]),[p,$]=o.useState([]),[_,B]=o.useState("All"),[E,R]=o.useState(""),[j,Q]=o.useState(""),[z,g]=o.useState(""),[F,W]=o.useState(""),[cs,U]=o.useState(!1);o.useEffect(()=>{k&&y&&q()},[E,j]);const q=()=>{T(!0),N.get(M+`assistant/drivers/payouts/0?status=${E}&no=${j}`,{headers:{Authorization:`Bearer ${y}`}}).then(e=>{e.status===200?(A(e.data),T(!1),U(!1)):e.status===204?h({type:x,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}}):e.status===500&&h({type:x,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}})}).catch(e=>{console.log("Error",e)})},G=(e,a)=>{v(!f),$({type:e,item:a}),console.log("Toggle",e,a)},C=(e,a)=>{u(!f),W(e),console.log("VIew",e,a),a==="waiting"||a==="sent"?g("ready"):a==="ready"&&g("done")},L=()=>{console.log("Confirmation",z,F);const e={status:z};k&&y&&N.patch(M+"assistant/payout/change/"+F,e,{headers:{Authorization:`Bearer ${y}`}}).then(a=>{if(a.status===200){console.log("updated"),u(!1);const t=a.data,r=m.map(I=>I.id===t.id?t:I);A([...r])}else a.status===203?h({type:x,payload:{status:!0,title:"Driver Payout status error",message:a.data.message}}):a.status===204?(console.log("204"),h({type:x,payload:{status:!0,title:"Driver Payout status error",message:a.data.message}})):a.status===500&&h({type:x,payload:{status:!0,title:"Driver Payout status update error",message:a.data.message}})}).catch(a=>{console.error(a)})},c=e=>{e==="all"?(R(""),B("All")):(console.log(e),R(e),B(e))};return s.jsxs(ss,{children:[s.jsx(O,{style:{marginLeft:"75%"},color:"secondary",children:"Filter by"}),s.jsxs(es,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[s.jsx(as,{style:{color:"white"},children:_}),s.jsxs(ts,{children:[s.jsx(d,{onClick:()=>c("all"),children:"All"}),s.jsx(d,{onClick:()=>c("pending"),children:"Pending"}),s.jsx(d,{onClick:()=>c("sent"),children:"Sent"}),s.jsx(d,{onClick:()=>c("ready"),children:"Ready"}),s.jsx(d,{onClick:()=>c("waiting"),children:"Waiting"}),s.jsx(d,{onClick:()=>c("done"),children:"Done"})]})]}),s.jsx(os,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:s.jsx(ls,{type:"text",placeholder:"Search by No",style:{width:450,marginLeft:"0%"},value:j,onChange:e=>Q(e.target.value)})}),Y?s.jsx(K,{}):s.jsxs(ns,{children:[s.jsx(rs,{children:s.jsxs(V,{children:[s.jsx(l,{scope:"col",children:"#"}),s.jsx(l,{scope:"col",children:"No"}),s.jsx(l,{scope:"col",children:"Name"}),s.jsx(l,{scope:"col",children:"Status"}),s.jsx(l,{scope:"col",children:"Date"}),s.jsx(l,{scope:"col",children:"Total"}),s.jsx(l,{scope:"col",children:"Tax"}),s.jsx(l,{scope:"col",children:"Tips"}),s.jsx(l,{scope:"col",children:"Payable"}),s.jsx(l,{scope:"col",children:"Action"}),s.jsx(l,{scope:"col",children:"PDF"})]})}),s.jsx(is,{children:m.map((e,a)=>{let t="info",r="";return(e==null?void 0:e.status)==="pending"?(r="Pending",t="info"):(e==null?void 0:e.status)==="done"?(r="Paid",t="primary"):(e==null?void 0:e.status)==="sent"?(r="Sent",t="success"):(e==null?void 0:e.status)==="waiting"?(r="Waiting",t="warning"):(e==null?void 0:e.status)==="ready"&&(r="Ready",t="danger"),s.jsxs(V,{children:[s.jsx(n,{children:a+1}),s.jsx(n,{children:e.no}),s.jsx(n,{children:e.name}),s.jsx(n,{children:s.jsx(O,{style:{width:60},color:t,children:r})}),s.jsx(n,{children:e.date}),s.jsx(n,{children:e.total}),s.jsx(n,{children:e.tax}),s.jsx(n,{children:e.tips}),s.jsx(n,{children:e.payable}),s.jsxs(n,{children:[(e==null?void 0:e.status)==="waiting"&&s.jsx(i,{onClick:()=>C(e.id,e.status),size:"sm",color:t,style:{width:90},children:"Received"}),(e==null?void 0:e.status)==="sent"&&s.jsx(i,{size:"sm",onClick:()=>C(e.id,e.status),color:t,style:{width:90},children:"Received"}),(e==null?void 0:e.status)==="ready"&&s.jsx(i,{size:"sm",onClick:()=>C(e.id,e.status),color:t,style:{width:90},children:"To Pay"})]}),s.jsxs(n,{children:[s.jsx(i,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80,color:"white"},onClick:()=>G(e.type,e),children:"View"})," "]})]},a)})})]}),s.jsxs(w,{visible:f,scrollable:!0,size:"xl",onClose:()=>v(!1),children:[s.jsx(b,{closeButton:!0,children:s.jsx(S,{children:"Information"})}),s.jsx(P,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:p.type==="flat_rate"?s.jsx(H,{style:{width:"100%",height:"100vh"},children:s.jsx(X,{data:p.item})}):p.type==="occasional"?s.jsx(H,{style:{width:"100%",height:"100vh"},children:s.jsx(Z,{data:p.item})}):null})]}),s.jsxs(w,{alignment:"center",transition:!1,visible:D,scrollable:!0,size:"lg",onClose:()=>u(!1),children:[s.jsx(b,{closeButton:!0,children:s.jsx(S,{children:"Confirmation"})}),s.jsxs(P,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:[s.jsx("a",{children:"Are you sure you want to pay out status ?"}),s.jsx(i,{onClick:()=>L(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]}),s.jsxs(w,{alignment:"center",visible:D,scrollable:!0,size:"sm",onClose:()=>u(!1),children:[s.jsx(b,{closeButton:!1,children:s.jsx(S,{children:"Confirmation"})}),s.jsxs(P,{children:[s.jsx("a",{children:"Are you sure you want to pay out status ?"}),s.jsx("br",{}),s.jsx("br",{}),s.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[s.jsx(i,{onClick:()=>L(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),s.jsx(i,{onClick:()=>u(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{vs as default};
