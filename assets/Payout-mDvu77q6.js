import{r as o,y as de,A as h,j as e,h as ue}from"./index-vIOSoMUu.js";import{a as Q}from"./axios-Cm0UX6qg.js";import{P as W,F as he,O as xe}from"./OccasionalEmployeePDF-CQ-dMMcs.js";/* empty css               */import{B as U}from"./config-HOLfLxHr.js";import{b as pe,a as c}from"./CContainer-DQqje6Yb.js";import{C as q,a as fe,b as ge,c as ye,d as x}from"./DefaultLayout-CKhc0dtY.js";import{C as je}from"./CNavbar-CKkucrSO.js";import{C as Ce}from"./CFormInput-D-Eh3JXR.js";import{C as Pe,a as be,b as G,c as l,d as me,e as n}from"./CTable-CA_T2BdW.js";import{C as we,a as T}from"./CPaginationItem-4rDKfmAB.js";import{C as A,a as R,b as B,c as E}from"./CModalTitle-UWL2UZXd.js";import"./inheritsLoose-BR9xv5Kf.js";import"./typeof-QjJsDpFa.js";import"./index-ChCC6iOD.js";import"./CFormLabel-B9P4EuKI.js";const Ve=()=>{const[C,I]=o.useState(!1),[N,p]=o.useState(!1),[{user:z,token:f},d]=de(),[J,P]=o.useState(!1),[F,L]=o.useState([]),[g,K]=o.useState([]),[X,M]=o.useState("All"),[H,O]=o.useState(""),[b,Z]=o.useState(""),[V,m]=o.useState(""),[$,ee]=o.useState(""),[Se,se]=o.useState(!1),[te,ae]=o.useState(0),[y,w]=o.useState(1),[S,v]=o.useState(0),[oe,Y]=o.useState(!0);o.useEffect(()=>{const s=setTimeout(()=>{d({type:h,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),P(!1)},2e4);return z&&f&&j(0,s),()=>{clearTimeout(s)}},[H,b]);const j=(s,t)=>{P(!0),Q.get(U+`assistant/drivers/payouts/${s}?status=${H}&no=${b}`,{headers:{Authorization:`Bearer ${f}`}}).then(a=>{a.status===200?(L(a.data.data),ae(a.data.count),P(!1),se(!1),clearTimeout(t),a.data.data.length<50?(Y(!0),console.log("ok")):a.data.data.length>49&&Y(!1)):a.status===204?d({type:h,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}}):a.status===500&&d({type:h,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}})}).catch(a=>{console.log("Error",a)})},le=()=>{w(y+1);const s=S+50;v(s),j(s,!0)},ne=()=>{w(y-1);const s=S-50;console.log(s),v(s),j(s,!1)},re=(s,t)=>{I(!C),K({type:s,item:t}),console.log("Toggle",s,t)},D=(s,t)=>{p(!C),ee(s),console.log("VIew",s,t),t==="waiting"||t==="sent"?m("ready"):t==="ready"&&m("done")},_=()=>{console.log("Confirmation",V,$);const s={status:V};z&&f&&Q.patch(U+"assistant/payout/change/"+$,s,{headers:{Authorization:`Bearer ${f}`}}).then(t=>{if(t.status===200){console.log("updated"),p(!1);const a=t.data,r=F.map(k=>k.id===a.id?a:k);L([...r])}else t.status===203?d({type:h,payload:{status:!0,title:"Driver Payout status error",message:t.data.message}}):t.status===204?(console.log("204"),d({type:h,payload:{status:!0,title:"Driver Payout status error",message:t.data.message}})):t.status===500&&d({type:h,payload:{status:!0,title:"Driver Payout status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},u=s=>{s==="all"?(O(""),M("All")):(console.log(s),O(s),M(s))},ie=s=>{w(s);const t=(s-1)*50;v(t),j(t,!0)},ce=()=>{const s=Math.ceil(te/50),t=[];for(let i=1;i<=s;i++)t.push(i);const a=Math.max(y-2,1),r=Math.min(a+4,s);return t.slice(a-1,r).map(i=>e.jsx(T,{active:y===i,onClick:()=>ie(i),children:i},i))};return e.jsxs(pe,{children:[e.jsx(q,{style:{marginLeft:"75%"},color:"secondary",children:"Filter by"}),e.jsxs(fe,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(ge,{style:{color:"white"},children:X}),e.jsxs(ye,{children:[e.jsx(x,{onClick:()=>u("all"),children:"All"}),e.jsx(x,{onClick:()=>u("pending"),children:"Pending"}),e.jsx(x,{onClick:()=>u("sent"),children:"Sent"}),e.jsx(x,{onClick:()=>u("ready"),children:"Ready"}),e.jsx(x,{onClick:()=>u("waiting"),children:"Waiting"}),e.jsx(x,{onClick:()=>u("done"),children:"Done"})]})]}),e.jsx(je,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:e.jsx(Ce,{type:"text",placeholder:"Search by No",style:{width:450,marginLeft:"0%"},value:b,onChange:s=>Z(s.target.value)})}),J?e.jsx(ue,{}):e.jsxs(Pe,{children:[e.jsx(be,{children:e.jsxs(G,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"No"}),e.jsx(l,{scope:"col",children:"Name"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"Date"}),e.jsx(l,{scope:"col",children:"Total"}),e.jsx(l,{scope:"col",children:"Tax"}),e.jsx(l,{scope:"col",children:"Tips"}),e.jsx(l,{scope:"col",children:"Payable"}),e.jsx(l,{scope:"col",children:"Action"}),e.jsx(l,{scope:"col",children:"PDF"})]})}),e.jsx(me,{children:F.map((s,t)=>{let a="info",r="";return(s==null?void 0:s.status)==="pending"?(r="Pending",a="info"):(s==null?void 0:s.status)==="done"?(r="Paid",a="primary"):(s==null?void 0:s.status)==="sent"?(r="Sent",a="success"):(s==null?void 0:s.status)==="waiting"?(r="Waiting",a="warning"):(s==null?void 0:s.status)==="ready"&&(r="Ready",a="danger"),e.jsxs(G,{children:[e.jsx(n,{children:t+1}),e.jsx(n,{children:s.no}),e.jsx(n,{children:s.name}),e.jsx(n,{children:e.jsx(q,{style:{width:60},color:a,children:r})}),e.jsx(n,{children:s.date}),e.jsx(n,{children:s.total}),e.jsx(n,{children:s.tax}),e.jsx(n,{children:s.tips}),e.jsx(n,{children:s.payable}),e.jsxs(n,{children:[(s==null?void 0:s.status)==="waiting"&&e.jsx(c,{onClick:()=>D(s.id,s.status),size:"sm",color:a,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="sent"&&e.jsx(c,{size:"sm",onClick:()=>D(s.id,s.status),color:a,style:{width:90},children:"Received"}),(s==null?void 0:s.status)==="ready"&&e.jsx(c,{size:"sm",onClick:()=>D(s.id,s.status),color:a,style:{width:90},children:"To Pay"})]}),e.jsxs(n,{children:[e.jsx(c,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80,color:"white"},onClick:()=>re(s.type,s),children:"View"})," "]})]},t)})})]}),e.jsxs(we,{"aria-label":"Page navigation example",children:[e.jsx(T,{disabled:S<=0,onClick:ne,children:"Previous"}),ce(),e.jsx(T,{disabled:oe===!0,onClick:le,children:"Next"})]}),e.jsxs(A,{visible:C,scrollable:!0,size:"xl",onClose:()=>I(!1),children:[e.jsx(R,{closeButton:!0,children:e.jsx(B,{children:"Information"})}),e.jsx(E,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:g.type==="flat_rate"?e.jsx(W,{style:{width:"100%",height:"100vh"},children:e.jsx(he,{data:g.item})}):g.type==="occasional"?e.jsx(W,{style:{width:"100%",height:"100vh"},children:e.jsx(xe,{data:g.item})}):null})]}),e.jsxs(A,{alignment:"center",transition:!1,visible:N,scrollable:!0,size:"lg",onClose:()=>p(!1),children:[e.jsx(R,{closeButton:!0,children:e.jsx(B,{children:"Confirmation"})}),e.jsxs(E,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:[e.jsx("a",{children:"Are you sure you want to pay out status ?"}),e.jsx(c,{onClick:()=>_(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]}),e.jsxs(A,{alignment:"center",visible:N,scrollable:!0,size:"sm",onClose:()=>p(!1),children:[e.jsx(R,{closeButton:!1,children:e.jsx(B,{children:"Confirmation"})}),e.jsxs(E,{children:[e.jsx("a",{children:"Are you sure you want to pay out status ?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(c,{onClick:()=>_(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(c,{onClick:()=>p(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{Ve as default};