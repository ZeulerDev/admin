const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FlatRateVatRegistrationPDF-C6Qw-mdC.js","assets/index-BismIp9s.js","assets/index-Bi_wmZ_L.css","assets/react-pdf.browser-B9pYrJIQ.js","assets/createClass-BvLlRGHb.js","assets/index-BIx93Imz.js","assets/_commonjs-dynamic-modules-TDtrdbi3.js","assets/zeuler-B_--SqBc.js","assets/OccasionalEmployeePDF-BAmHTt2y.js"])))=>i.map(i=>d[i]);
import{R as w,f as P,r as o,x as K,z as d,j as s,h as X}from"./index-BismIp9s.js";import{a as z}from"./axios-B4uVmeYG.js";import{B}from"./config-HOLfLxHr.js";import{b as Z,a as u}from"./CContainer-BEr4FbZI.js";import{d as L,C as ss,a as es,b as as,c as h}from"./DefaultLayout-CH4w68Bh.js";import{C as ts}from"./CNavbar-yECAKyfe.js";import{C as os}from"./CFormInput-BKuvivfL.js";import{C as ls,a as ns,b as V,c as l,d as rs,e as n}from"./CTable-BeI7nJZA.js";import{C as F,a as I,b as O,c as N}from"./CModalTitle-hhCfvApu.js";import"./CFormLabel-s32zAUud.js";const cs=w.lazy(()=>P(()=>import("./FlatRateVatRegistrationPDF-C6Qw-mdC.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),is=w.lazy(()=>P(()=>import("./OccasionalEmployeePDF-BAmHTt2y.js"),__vite__mapDeps([8,1,2,3,4,5,6,7]))),M=w.lazy(()=>P(()=>import("./react-pdf.browser-B9pYrJIQ.js"),__vite__mapDeps([3,4,1,2,5,6])).then(y=>({default:y.PDFViewer}))),ws=()=>{const[y,b]=o.useState(!1),[H,p]=o.useState(!1),[{user:k,token:x},c]=K(),[$,S]=o.useState(!1),[T,D]=o.useState([]),[f,Q]=o.useState([]),[W,_]=o.useState("All"),[v,E]=o.useState(""),[j,Y]=o.useState(""),[R,g]=o.useState(""),[A,U]=o.useState("");o.useEffect(()=>{console.log("Payout with"),k&&x&&q()},[v,j]);const q=()=>{S(!0),z.get(B+`assistant/pickers/payouts/0?status=${v}&no=${j}`,{headers:{Authorization:`Bearer ${x}`}}).then(e=>{e.status===200?(D(e.data),S(!1)):e.status===204?c({type:d,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}}):e.status===500&&c({type:d,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}})}).catch(e=>{console.log("Error",e)})},G=(e,a)=>{b(!y),Q({type:e,item:a}),console.log("Toggle",e,a)},C=(e,a)=>{p(!y),U(e),console.log("VIew",e,a),a==="waiting"||a==="sent"?g("ready"):a==="ready"&&g("done")},J=()=>{console.log("Confirmation",R,A);const e={status:R};k&&x&&z.patch(B+"assistant/payout/change/"+A,e,{headers:{Authorization:`Bearer ${x}`}}).then(a=>{if(a.status===200){console.log("updated"),p(!1);const t=a.data,r=T.map(m=>m.id===t.id?t:m);D([...r]),c({type:d,payload:{status:!0,title:"Pricker Payout status",message:"Payout status updated successfully",color:"success"}})}else a.status===203?c({type:d,payload:{status:!0,title:"Pricker Payout status error",message:a.data.message}}):a.status===204?(console.log("204"),c({type:d,payload:{status:!0,title:"Pricker Payout status error",message:a.data.message}})):a.status===500&&c({type:d,payload:{status:!0,title:"Pricker Payout status update error",message:a.data.message}})}).catch(a=>{console.error(a)})},i=e=>{e==="all"?(E(""),_("All")):(console.log(e),E(e),_(e))};return s.jsxs(Z,{children:[s.jsx(L,{style:{marginLeft:"75%"},color:"secondary",children:"Filter by"}),s.jsxs(ss,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[s.jsx(es,{style:{color:"white"},children:W}),s.jsxs(as,{children:[s.jsx(h,{onClick:()=>i("all"),children:"All"}),s.jsx(h,{onClick:()=>i("pending"),children:"Pending"}),s.jsx(h,{onClick:()=>i("sent"),children:"Sent"}),s.jsx(h,{onClick:()=>i("ready"),children:"Ready"}),s.jsx(h,{onClick:()=>i("waiting"),children:"Waiting"}),s.jsx(h,{onClick:()=>i("done"),children:"Done"})]})]}),s.jsx(ts,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:s.jsx(os,{type:"text",placeholder:"Search By No",style:{width:450,marginLeft:"0%"},value:j,onChange:e=>Y(e.target.value)})}),$?s.jsx(X,{}):s.jsxs(ls,{children:[s.jsx(ns,{children:s.jsxs(V,{children:[s.jsx(l,{scope:"col",children:"#"}),s.jsx(l,{scope:"col",children:"No"}),s.jsx(l,{scope:"col",children:"Name"}),s.jsx(l,{scope:"col",children:"Status"}),s.jsx(l,{scope:"col",children:"Date"}),s.jsx(l,{scope:"col",children:"Total"}),s.jsx(l,{scope:"col",children:"Tax"}),s.jsx(l,{scope:"col",children:"Tips"}),s.jsx(l,{scope:"col",children:"Payable"}),s.jsx(l,{scope:"col",children:"Action"}),s.jsx(l,{scope:"col",children:"PDF"})]})}),s.jsx(rs,{children:T.map((e,a)=>{let t="info",r="";return(e==null?void 0:e.status)==="pending"?(r="Pending",t="info"):(e==null?void 0:e.status)==="done"?(r="Paid",t="primary"):(e==null?void 0:e.status)==="sent"?(r="Sent",t="success"):(e==null?void 0:e.status)==="waiting"?(r="Waiting",t="warning"):(e==null?void 0:e.status)==="ready"&&(r="Ready",t="danger"),s.jsxs(V,{children:[s.jsx(n,{children:a+1}),s.jsx(n,{children:e.no}),s.jsx(n,{children:e.name}),s.jsx(n,{children:s.jsx(L,{style:{width:60},color:t,children:r})}),s.jsx(n,{children:e.date}),s.jsx(n,{children:e.total}),s.jsx(n,{children:e.tax}),s.jsx(n,{children:e.tips}),s.jsx(n,{children:e.payable}),s.jsxs(n,{children:[(e==null?void 0:e.status)==="waiting"&&s.jsx(u,{onClick:()=>C(e.id,e.status),size:"sm",color:t,style:{width:90},children:"Received"}),(e==null?void 0:e.status)==="sent"&&s.jsx(u,{size:"sm",onClick:()=>C(e.id,e.status),color:t,style:{width:90},children:"Received"}),(e==null?void 0:e.status)==="ready"&&s.jsx(u,{size:"sm",onClick:()=>C(e.id,e.status),color:t,style:{width:90},children:"To Pay"})]}),s.jsxs(n,{children:[s.jsx(u,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80,color:"white"},onClick:()=>G(e.type,e),children:"View"})," "]})]},a)})})]}),s.jsxs(F,{visible:y,scrollable:!0,size:"xl",onClose:()=>b(!1),children:[s.jsx(I,{closeButton:!0,children:s.jsx(O,{children:"Information"})}),s.jsx(N,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:s.jsx(o.Suspense,{fallback:s.jsx("div",{children:"Loading PDF Viewer..."}),children:f.type==="flat_rate"?s.jsx(M,{style:{width:"100%",height:"100vh"},children:s.jsx(cs,{data:f.item})}):f.type==="occasional"?s.jsx(M,{style:{width:"100%",height:"100vh"},children:s.jsx(is,{data:f.item})}):null})})]}),s.jsxs(F,{alignment:"center",visible:H,scrollable:!0,size:"sm",onClose:()=>p(!1),children:[s.jsx(I,{closeButton:!1,children:s.jsx(O,{children:"Confirmation"})}),s.jsxs(N,{children:[s.jsx("a",{children:"Are you sure you want to pay out status ?"}),s.jsx("br",{}),s.jsx("br",{}),s.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[s.jsx(u,{onClick:()=>J(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),s.jsx(u,{onClick:()=>p(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{ws as default};
