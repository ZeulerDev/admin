function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./FlatRateVatRegistrationPDF-CeKpENNj.js","./index-NZtDbKA_.js","./index-BQTabIt4.css","./react-pdf.browser-BTJS8nDP.js","./inheritsLoose-CkMbdMht.js","./index-C-G7CHS3.js","./_commonjs-dynamic-modules-TDtrdbi3.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{a as M,g as N,r as o,y as X,A as h,j as e,i as Z}from"./index-NZtDbKA_.js";import{a as m}from"./axios-Cm0UX6qg.js";import{B as R}from"./config-HOLfLxHr.js";import{b as ss,a as y}from"./CContainer-CR1x02kr.js";import{d as B,C as es,a as as,b as ts,c as d}from"./DefaultLayout-Cbr2wWEM.js";import{C as os}from"./CNavbar-D11C0qJ8.js";import{C as ls}from"./CFormInput-CKDZMbYy.js";import{C as ns,a as rs,b as z,c as l,d as is,e as n}from"./CTable-BwvoBTuh.js";import{C as F,a as I,b as L,c as V}from"./CModalTitle-D-YYns3Q.js";import"./CFormLabel-C36k72cX.js";const $=M.lazy(()=>N(()=>import("./FlatRateVatRegistrationPDF-CeKpENNj.js").then(i=>i.F),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url)),H=M.lazy(()=>N(()=>import("./react-pdf.browser-BTJS8nDP.js"),__vite__mapDeps([3,4,1,2,5,6]),import.meta.url).then(i=>({default:i.PDFViewer}))),Cs=()=>{const[i,w]=o.useState(!1),[O,f]=o.useState(!1),[{user:P,token:p},u]=X(),[Y,b]=o.useState(!1),[S,T]=o.useState([]),[x,Q]=o.useState([]),[W,k]=o.useState("All"),[D,v]=o.useState(""),[j,q]=o.useState(""),[_,g]=o.useState(""),[E,U]=o.useState("");o.useEffect(()=>{console.log("Payout with"),P&&p&&G()},[D,j]);const G=()=>{b(!0),m.get(R+`assistant/pickers/payouts/0?status=${D}&no=${j}`,{headers:{Authorization:`Bearer ${p}`}}).then(s=>{s.status===200?(T(s.data),b(!1)):s.status===204?u({type:h,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}}):s.status===500&&u({type:h,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.log("Error",s)})},J=(s,a)=>{w(!i),Q({type:s,item:a}),console.log("Toggle",s,a)},C=(s,a)=>{f(!i),U(s),console.log("VIew",s,a),a==="waiting"||a==="sent"?g("ready"):a==="ready"&&g("done")},K=()=>{console.log("Confirmation",_,E);const s={status:_};P&&p&&m.patch(R+"assistant/payout/change/"+E,s,{headers:{Authorization:`Bearer ${p}`}}).then(a=>{if(a.status===200){console.log("updated"),f(!1);const t=a.data,r=S.map(A=>A.id===t.id?t:A);T([...r])}else a.status===203?u({type:h,payload:{status:!0,title:"Pricker Payout status error",message:a.data.message}}):a.status===204?(console.log("204"),u({type:h,payload:{status:!0,title:"Pricker Payout status error",message:a.data.message}})):a.status===500&&u({type:h,payload:{status:!0,title:"Pricker Payout status update error",message:a.data.message}})}).catch(a=>{console.error(a)})},c=s=>{s==="all"?(v(""),k("All")):(console.log(s),v(s),k(s))};return e.jsxs(ss,{children:[e.jsx(B,{style:{marginLeft:"75%"},color:"secondary",children:"Filter by"}),e.jsxs(es,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(as,{style:{color:"white"},children:W}),e.jsxs(ts,{children:[e.jsx(d,{onClick:()=>c("all"),children:"All"}),e.jsx(d,{onClick:()=>c("pending"),children:"Pending"}),e.jsx(d,{onClick:()=>c("sent"),children:"Sent"}),e.jsx(d,{onClick:()=>c("ready"),children:"Ready"}),e.jsx(d,{onClick:()=>c("waiting"),children:"Waiting"}),e.jsx(d,{onClick:()=>c("done"),children:"Done"})]})]}),e.jsx(os,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:e.jsx(ls,{type:"text",placeholder:"Search By No",style:{width:450,marginLeft:"0%"},value:j,onChange:s=>q(s.target.value)})}),Y?e.jsx(Z,{}):e.jsxs(ns,{children:[e.jsx(rs,{children:e.jsxs(z,{children:[e.jsx(l,{scope:"col",children:"No"}),e.jsx(l,{scope:"col",children:"Name"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"Date"}),e.jsx(l,{scope:"col",children:"Total"}),e.jsx(l,{scope:"col",children:"Tax"}),e.jsx(l,{scope:"col",children:"Tips"}),e.jsx(l,{scope:"col",children:"Payable"}),e.jsx(l,{scope:"col",children:"Action"}),e.jsx(l,{scope:"col",children:"PDF"})]})}),e.jsx(is,{children:S.map((s,a)=>{let t="info",r="";return(s==null?void 0:s.status)==="pending"?(r="Pending",t="info"):(s==null?void 0:s.status)==="done"?(r="Paid",t="primary"):(s==null?void 0:s.status)==="sent"?(r="Sent",t="success"):(s==null?void 0:s.status)==="waiting"?(r="Waiting",t="warning"):(s==null?void 0:s.status)==="ready"&&(r="Ready",t="danger"),e.jsxs(z,{children:[e.jsx(n,{children:s.no}),e.jsx(n,{children:s.name}),e.jsx(n,{children:e.jsx(B,{style:{width:60},color:t,children:r})}),e.jsx(n,{children:s.date}),e.jsx(n,{children:s.total}),e.jsx(n,{children:s.tax}),e.jsx(n,{children:s.tips}),e.jsx(n,{children:s.payable}),e.jsxs(n,{children:[(s==null?void 0:s.status)==="waiting"&&e.jsx(y,{onClick:()=>C(s.id,s.status),size:"sm",color:t,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="sent"&&e.jsx(y,{size:"sm",onClick:()=>C(s.id,s.status),color:t,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="ready"&&e.jsx(y,{size:"sm",onClick:()=>C(s.id,s.status),color:t,style:{width:90},children:"To Pay"})]}),e.jsxs(n,{children:[e.jsx(y,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80,color:"white"},onClick:()=>J(s.type,s),children:"View"})," "]})]},a)})})]}),e.jsxs(F,{visible:i,scrollable:!0,size:"xl",onClose:()=>w(!1),children:[e.jsx(I,{closeButton:!0,children:e.jsx(L,{children:"Information"})}),e.jsx(V,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:x.type==="flat_rate"?e.jsx(H,{style:{width:"100%",height:"100vh"},children:e.jsx($,{data:x.item})}):x.type==="occasional"?e.jsx(H,{style:{width:"100%",height:"100vh"},children:e.jsx($,{data:x.item})}):null})]}),e.jsxs(F,{transition:!1,alignment:"center",visible:O,scrollable:!0,size:"lg",onClose:()=>f(!1),children:[e.jsx(I,{closeButton:!0,children:e.jsx(L,{children:"Confirmation"})}),e.jsxs(V,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:[e.jsx("a",{children:"Are you sure you want to pay out status ?"}),e.jsx(y,{onClick:()=>K(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]})]})};export{Cs as default};