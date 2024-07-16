function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./FlatRateVatRegistrationPDF-DQ0Bf2jm.js","./index-D57LfKhM.js","./index-BQTabIt4.css","./inheritsLoose-CkMbdMht.js","./index-B_vnaIPa.js","./_commonjs-dynamic-modules-TDtrdbi3.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{a as V,g as Q,r as o,y as W,A as u,j as a,i as Y}from"./index-D57LfKhM.js";import{a as v}from"./axios-Cm0UX6qg.js";import{B}from"./config-HOLfLxHr.js";import{b as q,a as h}from"./CContainer-BtQ2t7b-.js";import{d as R,C as U,a as G,b as J,c as i}from"./DefaultLayout-DwIbSn6R.js";import{C as K}from"./CNavbar-BnBXOJLU.js";import{C as X}from"./CFormInput-DLdREMBa.js";import{C as Z,a as ss,b as _,c as l,d as as,e as n}from"./CTable-CoFhlMIc.js";import{C as es,a as ts,b as os,c as ls}from"./CModalTitle-w8bCTZR7.js";import"./CFormLabel-UW7-bZhj.js";V.lazy(()=>Q(()=>import("./FlatRateVatRegistrationPDF-DQ0Bf2jm.js").then(p=>p.F),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url));const gs=()=>{const[p,z]=o.useState(!1),[L,x]=o.useState(!1),[{user:C,token:y},d]=W(),[I,w]=o.useState(!1),[P,S]=o.useState([]),[ns,$]=o.useState([]),[m,b]=o.useState("All"),[T,k]=o.useState(""),[f,M]=o.useState(""),[D,g]=o.useState(""),[A,N]=o.useState("");o.useEffect(()=>{console.log("Payout with"),C&&y&&F()},[T,f]);const F=()=>{w(!0),v.get(B+`assistant/pickers/payouts/0?status=${T}&no=${f}`,{headers:{Authorization:`Bearer ${y}`}}).then(s=>{s.status===200?(S(s.data),w(!1)):s.status===204?d({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}}):s.status===500&&d({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.log("Error",s)})},H=(s,e)=>{z(!p),$({type:s,item:e}),console.log("Toggle",s,e)},j=(s,e)=>{x(!p),N(s),console.log("VIew",s,e),e==="waiting"||e==="sent"?g("ready"):e==="ready"&&g("done")},O=()=>{console.log("Confirmation",D,A);const s={status:D};C&&y&&v.patch(B+"assistant/payout/change/"+A,s,{headers:{Authorization:`Bearer ${y}`}}).then(e=>{if(e.status===200){console.log("updated"),x(!1);const t=e.data,r=P.map(E=>E.id===t.id?t:E);S([...r])}else e.status===203?d({type:u,payload:{status:!0,title:"Pricker Payout status error",message:e.data.message}}):e.status===204?(console.log("204"),d({type:u,payload:{status:!0,title:"Pricker Payout status error",message:e.data.message}})):e.status===500&&d({type:u,payload:{status:!0,title:"Pricker Payout status update error",message:e.data.message}})}).catch(e=>{console.error(e)})},c=s=>{s==="all"?(k(""),b("All")):(console.log(s),k(s),b(s))};return a.jsxs(q,{children:[a.jsx(R,{style:{marginLeft:"75%"},color:"secondary",children:"Filter by"}),a.jsxs(U,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[a.jsx(G,{style:{color:"white"},children:m}),a.jsxs(J,{children:[a.jsx(i,{onClick:()=>c("all"),children:"All"}),a.jsx(i,{onClick:()=>c("pending"),children:"Pending"}),a.jsx(i,{onClick:()=>c("sent"),children:"Sent"}),a.jsx(i,{onClick:()=>c("ready"),children:"Ready"}),a.jsx(i,{onClick:()=>c("waiting"),children:"Waiting"}),a.jsx(i,{onClick:()=>c("done"),children:"Done"})]})]}),a.jsx(K,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:a.jsx(X,{type:"text",placeholder:"Search By No",style:{width:450,marginLeft:"0%"},value:f,onChange:s=>M(s.target.value)})}),I?a.jsx(Y,{}):a.jsxs(Z,{children:[a.jsx(ss,{children:a.jsxs(_,{children:[a.jsx(l,{scope:"col",children:"No"}),a.jsx(l,{scope:"col",children:"Name"}),a.jsx(l,{scope:"col",children:"Status"}),a.jsx(l,{scope:"col",children:"Date"}),a.jsx(l,{scope:"col",children:"Total"}),a.jsx(l,{scope:"col",children:"Tax"}),a.jsx(l,{scope:"col",children:"Tips"}),a.jsx(l,{scope:"col",children:"Payable"}),a.jsx(l,{scope:"col",children:"Action"}),a.jsx(l,{scope:"col",children:"PDF"})]})}),a.jsx(as,{children:P.map((s,e)=>{let t="info",r="";return(s==null?void 0:s.status)==="pending"?(r="Pending",t="info"):(s==null?void 0:s.status)==="done"?(r="Paid",t="primary"):(s==null?void 0:s.status)==="sent"?(r="Sent",t="success"):(s==null?void 0:s.status)==="waiting"?(r="Waiting",t="warning"):(s==null?void 0:s.status)==="ready"&&(r="Ready",t="danger"),a.jsxs(_,{children:[a.jsx(n,{children:s.no}),a.jsx(n,{children:s.name}),a.jsx(n,{children:a.jsx(R,{style:{width:60},color:t,children:r})}),a.jsx(n,{children:s.date}),a.jsx(n,{children:s.total}),a.jsx(n,{children:s.tax}),a.jsx(n,{children:s.tips}),a.jsx(n,{children:s.payable}),a.jsxs(n,{children:[(s==null?void 0:s.status)==="waiting"&&a.jsx(h,{onClick:()=>j(s.id,s.status),size:"sm",color:t,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="sent"&&a.jsx(h,{size:"sm",onClick:()=>j(s.id,s.status),color:t,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="ready"&&a.jsx(h,{size:"sm",onClick:()=>j(s.id,s.status),color:t,style:{width:90},children:"To Pay"})]}),a.jsxs(n,{children:[a.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80,color:"white"},onClick:()=>H(s.type,s),children:"View"})," "]})]},e)})})]}),a.jsxs(es,{transition:!1,alignment:"center",visible:L,scrollable:!0,size:"lg",onClose:()=>x(!1),children:[a.jsx(ts,{closeButton:!0,children:a.jsx(os,{children:"Confirmation"})}),a.jsxs(ls,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:[a.jsx("a",{children:"Are you sure you want to pay out status ?"}),a.jsx(h,{onClick:()=>O(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]})]})};export{gs as default};
