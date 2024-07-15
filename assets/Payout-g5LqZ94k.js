import{r as o,y as Q,A as u,j as a,i as W}from"./index-BWkgGQRa.js";import{a as E}from"./axios-Cm0UX6qg.js";import{B as v}from"./config-HOLfLxHr.js";import{b as Y,a as h}from"./CContainer-n_XM2trt.js";import{d as R,C as _,a as U,b as q,c as d}from"./DefaultLayout-C-k2K-WS.js";import{C as G}from"./CNavbar-BwlLOQyI.js";import{C as J}from"./CFormInput-DvjVNdkB.js";import{C as K,a as X,b as z,c as l,d as Z,e as n}from"./CTable-Bb3Q9-5y.js";import{C as ss,a as as,b as es,c as ts}from"./CModalTitle-CZnaKMAX.js";import"./CFormLabel-CoAYXVYV.js";const xs=()=>{const[j,L]=o.useState(!1),[I,y]=o.useState(!1),[{user:C,token:p},i]=Q(),[M,w]=o.useState(!1),[S,b]=o.useState([]),[os,N]=o.useState([]),[H,P]=o.useState("All"),[k,T]=o.useState(""),[x,$]=o.useState(""),[D,f]=o.useState(""),[A,F]=o.useState("");o.useEffect(()=>{console.log("Payout with"),C&&p&&O()},[k,x]);const O=()=>{w(!0),E.get(v+`assistant/pickers/payouts/0?status=${k}&no=${x}`,{headers:{Authorization:`Bearer ${p}`}}).then(s=>{s.status===200?(b(s.data),w(!1)):s.status===204?i({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}}):s.status===500&&i({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.log("Error",s)})},V=(s,e)=>{L(!j),N({type:s,item:e}),console.log("Toggle",s,e)},g=(s,e)=>{y(!j),F(s),console.log("VIew",s,e),e==="waiting"||e==="sent"?f("ready"):e==="ready"&&f("done")},m=()=>{console.log("Confirmation",D,A);const s={status:D};C&&p&&E.patch(v+"assistant/payout/change/"+A,s,{headers:{Authorization:`Bearer ${p}`}}).then(e=>{if(e.status===200){console.log("updated"),y(!1);const t=e.data,r=S.map(B=>B.id===t.id?t:B);b([...r])}else e.status===203?i({type:u,payload:{status:!0,title:"Pricker Payout status error",message:e.data.message}}):e.status===204?(console.log("204"),i({type:u,payload:{status:!0,title:"Pricker Payout status error",message:e.data.message}})):e.status===500&&i({type:u,payload:{status:!0,title:"Pricker Payout status update error",message:e.data.message}})}).catch(e=>{console.error(e)})},c=s=>{s==="all"?(T(""),P("All")):(console.log(s),T(s),P(s))};return a.jsxs(Y,{children:[a.jsx(R,{style:{marginLeft:"75%"},color:"secondary",children:"Filter by"}),a.jsxs(_,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[a.jsx(U,{style:{color:"white"},children:H}),a.jsxs(q,{children:[a.jsx(d,{onClick:()=>c("all"),children:"All"}),a.jsx(d,{onClick:()=>c("pending"),children:"Pending"}),a.jsx(d,{onClick:()=>c("sent"),children:"Sent"}),a.jsx(d,{onClick:()=>c("ready"),children:"Ready"}),a.jsx(d,{onClick:()=>c("waiting"),children:"Waiting"}),a.jsx(d,{onClick:()=>c("done"),children:"Done"})]})]}),a.jsx(G,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:a.jsx(J,{type:"text",placeholder:"Search By No",style:{width:450,marginLeft:"0%"},value:x,onChange:s=>$(s.target.value)})}),M?a.jsx(W,{}):a.jsxs(K,{children:[a.jsx(X,{children:a.jsxs(z,{children:[a.jsx(l,{scope:"col",children:"No"}),a.jsx(l,{scope:"col",children:"Name"}),a.jsx(l,{scope:"col",children:"Status"}),a.jsx(l,{scope:"col",children:"Date"}),a.jsx(l,{scope:"col",children:"Total"}),a.jsx(l,{scope:"col",children:"Tax"}),a.jsx(l,{scope:"col",children:"Tips"}),a.jsx(l,{scope:"col",children:"Payable"}),a.jsx(l,{scope:"col",children:"Action"}),a.jsx(l,{scope:"col",children:"PDF"})]})}),a.jsx(Z,{children:S.map((s,e)=>{let t="info",r="";return(s==null?void 0:s.status)==="pending"?(r="Pending",t="info"):(s==null?void 0:s.status)==="done"?(r="Paid",t="primary"):(s==null?void 0:s.status)==="sent"?(r="Sent",t="success"):(s==null?void 0:s.status)==="waiting"?(r="Waiting",t="warning"):(s==null?void 0:s.status)==="ready"&&(r="Ready",t="danger"),a.jsxs(z,{children:[a.jsx(n,{children:s.no}),a.jsx(n,{children:s.name}),a.jsx(n,{children:a.jsx(R,{style:{width:60},color:t,children:r})}),a.jsx(n,{children:s.date}),a.jsx(n,{children:s.total}),a.jsx(n,{children:s.tax}),a.jsx(n,{children:s.tips}),a.jsx(n,{children:s.payable}),a.jsxs(n,{children:[(s==null?void 0:s.status)==="waiting"&&a.jsx(h,{onClick:()=>g(s.id,s.status),size:"sm",color:t,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="sent"&&a.jsx(h,{size:"sm",onClick:()=>g(s.id,s.status),color:t,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="ready"&&a.jsx(h,{size:"sm",onClick:()=>g(s.id,s.status),color:t,style:{width:90},children:"To Pay"})]}),a.jsxs(n,{children:[a.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80,color:"white"},onClick:()=>V(s.type,s),children:"View"})," "]})]},e)})})]}),a.jsxs(ss,{transition:!1,alignment:"center",visible:I,scrollable:!0,size:"lg",onClose:()=>y(!1),children:[a.jsx(as,{closeButton:!0,children:a.jsx(es,{children:"Confirmation"})}),a.jsxs(ts,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:[a.jsx("a",{children:"Are you sure you want to pay out status ?"}),a.jsx(h,{onClick:()=>m(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]})]})};export{xs as default};
