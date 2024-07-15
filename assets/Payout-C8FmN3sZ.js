import{r as o,y as W,A as u,j as a,i as Y}from"./index-BfQSggYC.js";import{a as E}from"./axios-Cm0UX6qg.js";import{B as v}from"./config-HOLfLxHr.js";import{b as _,a as h}from"./CContainer-BOQ-qPbl.js";import{C as F}from"./CNavbar-BgTOZ4do.js";import{C as U}from"./CFormInput-C9ZpgdHu.js";import{C as m,a as q,b as G,c as d,e as J}from"./DefaultLayout-DnPtDY5H.js";import{C as K,a as X,b as R,c as l,d as Z,e as n}from"./CTable-c_qfGzj5.js";import{C as ss,a as as,b as es,c as ts}from"./CModalTitle-Ba_t-Rt1.js";import"./CFormLabel---RBetZs.js";const xs=()=>{const[j,z]=o.useState(!1),[I,y]=o.useState(!1),[{user:C,token:p},i]=W(),[L,w]=o.useState(!1),[S,b]=o.useState([]),[os,M]=o.useState([]),[N,P]=o.useState("All"),[k,T]=o.useState(""),[x,H]=o.useState(""),[A,f]=o.useState(""),[D,$]=o.useState("");o.useEffect(()=>{console.log("Payout with"),C&&p&&O()},[k,x]);const O=()=>{w(!0),E.get(v+`assistant/pickers/payouts/0?status=${k}&no=${x}`,{headers:{Authorization:`Bearer ${p}`}}).then(s=>{s.status===200?(b(s.data),w(!1)):s.status===204?i({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}}):s.status===500&&i({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.log("Error",s)})},V=(s,e)=>{z(!j),M({type:s,item:e}),console.log("Toggle",s,e)},g=(s,e)=>{y(!j),$(s),console.log("VIew",s,e),e==="waiting"||e==="sent"?f("ready"):e==="ready"&&f("done")},Q=()=>{console.log("Confirmation",A,D);const s={status:A};C&&p&&E.patch(v+"assistant/payout/change/"+D,s,{headers:{Authorization:`Bearer ${p}`}}).then(e=>{if(e.status===200){console.log("updated"),y(!1);const t=e.data,r=S.map(B=>B.id===t.id?t:B);b([...r])}else e.status===203?i({type:u,payload:{status:!0,title:"Pricker Payout status error",message:e.data.message}}):e.status===204?(console.log("204"),i({type:u,payload:{status:!0,title:"Pricker Payout status error",message:e.data.message}})):e.status===500&&i({type:u,payload:{status:!0,title:"Pricker Payout status update error",message:e.data.message}})}).catch(e=>{console.error(e)})},c=s=>{s==="all"?(T(""),P("All")):(console.log(s),T(s),P(s))};return a.jsxs(_,{children:[a.jsxs(F,{className:"bg-body-tertiary",children:[a.jsx(U,{type:"text",placeholder:"Search By No",style:{width:200,marginLeft:"1%"},value:x,onChange:s=>H(s.target.value)}),a.jsxs(m,{style:{marginLeft:"65%",width:"10%",backgroundColor:"#ff4d4d"},children:[a.jsx(q,{children:N}),a.jsxs(G,{children:[a.jsx(d,{onClick:()=>c("all"),children:"All"}),a.jsx(d,{onClick:()=>c("pending"),children:"Pending"}),a.jsx(d,{onClick:()=>c("sent"),children:"Sent"}),a.jsx(d,{onClick:()=>c("ready"),children:"Ready"}),a.jsx(d,{onClick:()=>c("waiting"),children:"Waiting"}),a.jsx(d,{onClick:()=>c("done"),children:"Done"})]})]}),a.jsx("br",{})]}),L?a.jsx(Y,{}):a.jsxs(K,{children:[a.jsx(X,{children:a.jsxs(R,{children:[a.jsx(l,{scope:"col",children:"No"}),a.jsx(l,{scope:"col",children:"Name"}),a.jsx(l,{scope:"col",children:"Status"}),a.jsx(l,{scope:"col",children:"Date"}),a.jsx(l,{scope:"col",children:"Total"}),a.jsx(l,{scope:"col",children:"Tax"}),a.jsx(l,{scope:"col",children:"Tips"}),a.jsx(l,{scope:"col",children:"Payable"}),a.jsx(l,{scope:"col",children:"Action"}),a.jsx(l,{scope:"col"})]})}),a.jsx(Z,{children:S.map((s,e)=>{let t="info",r="";return(s==null?void 0:s.status)==="pending"?(r="Pending",t="info"):(s==null?void 0:s.status)==="done"?(r="Paid",t="primary"):(s==null?void 0:s.status)==="sent"?(r="Sent",t="success"):(s==null?void 0:s.status)==="waiting"?(r="Waiting",t="warning"):(s==null?void 0:s.status)==="ready"&&(r="Ready",t="danger"),a.jsxs(R,{children:[a.jsx(n,{children:s.no}),a.jsx(n,{children:s.name}),a.jsx(n,{children:a.jsx(J,{style:{width:60},color:t,children:r})}),a.jsx(n,{children:s.date}),a.jsx(n,{children:s.total}),a.jsx(n,{children:s.tax}),a.jsx(n,{children:s.tips}),a.jsx(n,{children:s.payable}),a.jsxs(n,{children:[(s==null?void 0:s.status)==="waiting"&&a.jsx(h,{onClick:()=>g(s.id,s.status),size:"sm",color:t,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="sent"&&a.jsx(h,{size:"sm",onClick:()=>g(s.id,s.status),color:t,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="ready"&&a.jsx(h,{size:"sm",onClick:()=>g(s.id,s.status),color:t,style:{width:90},children:"To Pay"})]}),a.jsxs(n,{children:[a.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80},onClick:()=>V(s.type,s),children:"View"})," "]})]},e)})})]}),a.jsxs(ss,{transition:!1,alignment:"center",visible:I,scrollable:!0,size:"lg",onClose:()=>y(!1),children:[a.jsx(as,{closeButton:!0,children:a.jsx(es,{children:"Confirmation"})}),a.jsxs(ts,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:[a.jsx("a",{children:"Are you sure you want to pay out status ?"}),a.jsx(h,{onClick:()=>Q(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]})]})};export{xs as default};
