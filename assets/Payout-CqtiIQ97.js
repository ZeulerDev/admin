import{r as o,y as he,A as x,j as s,h as xe}from"./index-Dr2bAMPU.js";import{a as U}from"./axios-Cm0UX6qg.js";import{P as q,F as fe,O as ge}from"./OccasionalEmployeePDF-4Iwwny51.js";/* empty css               */import{B as G}from"./config-HOLfLxHr.js";import{b as pe,a as d}from"./CContainer-u87GNtez.js";import{C as J,a as ye,b as je,d as Ce,e as f}from"./DefaultLayout-B2Nh7q8u.js";import{C as Pe}from"./CNavbar-B7PVcNkl.js";import{C as be}from"./CFormInput-BN0BKVRX.js";import{C as me,a as we,b as K,c as l,d as Se,e as n}from"./CTable-Bfn_R52F.js";import{C as ve,a as A}from"./CPaginationItem-DP1tcg58.js";import{C as E,a as R,b as B,c as I}from"./CModalTitle-DKRx84Yh.js";import"./inheritsLoose-BR9xv5Kf.js";import"./typeof-QjJsDpFa.js";import"./index-CH4LTGP1.js";import"./CFormLabel-BwWU-nc5.js";const Qe=()=>{const[P,N]=o.useState(!1),[z,g]=o.useState(!1),[{user:F,token:p},u]=he(),[X,b]=o.useState(!1),[L,M]=o.useState([]),[y,Z]=o.useState([]),[ee,H]=o.useState("All"),[O,V]=o.useState(""),[i,m]=o.useState(""),[se,$]=o.useState(i),[Q,w]=o.useState(""),[Y,te]=o.useState(""),[Te,ae]=o.useState(!1),[oe,le]=o.useState(0),[j,S]=o.useState(1),[v,T]=o.useState(0),[ne,_]=o.useState(!0);o.useEffect(()=>{const e=setTimeout(()=>{u({type:x,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),b(!1)},2e4);return F&&p&&C(0,e),()=>{clearTimeout(e)}},[O,se]),o.useEffect(()=>{const e=setTimeout(()=>{(i.length>=3||i.length===0)&&$(i)},500);return()=>{clearTimeout(e)}},[i]);const C=(e,t)=>{b(!0),U.get(G+`assistant/drivers/payouts/${e}?status=${O}&no=${i}`,{headers:{Authorization:`Bearer ${p}`}}).then(a=>{a.status===200?(M(a.data.data),le(a.data.count),b(!1),ae(!1),clearTimeout(t),a.data.data.length<50?(_(!0),console.log("ok")):a.data.data.length>49&&_(!1)):a.status===204?u({type:x,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}}):a.status===500&&u({type:x,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}})}).catch(a=>{console.log("Error",a)})},re=()=>{S(j+1);const e=v+50;T(e),C(e,!0)},ie=()=>{S(j-1);const e=v-50;console.log(e),T(e),C(e,!1)},ce=(e,t)=>{N(!P),Z({type:e,item:t}),console.log("Toggle",e,t)},D=(e,t)=>{g(!P),te(e),console.log("VIew",e,t),t==="waiting"||t==="sent"?w("ready"):t==="ready"&&w("done")},W=()=>{console.log("Confirmation",Q,Y);const e={status:Q};F&&p&&U.patch(G+"assistant/payout/change/"+Y,e,{headers:{Authorization:`Bearer ${p}`}}).then(t=>{if(t.status===200){console.log("updated"),g(!1);const a=t.data,r=L.map(k=>k.id===a.id?a:k);M([...r])}else t.status===203?u({type:x,payload:{status:!0,title:"Driver Payout status error",message:t.data.message}}):t.status===204?(console.log("204"),u({type:x,payload:{status:!0,title:"Driver Payout status error",message:t.data.message}})):t.status===500&&u({type:x,payload:{status:!0,title:"Driver Payout status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},h=e=>{e==="all"?(V(""),H("All"),m("")):(console.log(e),V(e),H(e),m(""))},de=e=>{S(e);const t=(e-1)*50;T(t),C(t,!0)},ue=()=>{const e=Math.ceil(oe/50),t=[];for(let c=1;c<=e;c++)t.push(c);const a=Math.max(j-2,1),r=Math.min(a+4,e);return t.slice(a-1,r).map(c=>s.jsx(A,{active:j===c,onClick:()=>de(c),children:c},c))};return s.jsxs(pe,{children:[s.jsx(J,{style:{marginLeft:"75%"},color:"secondary",children:"Filter by"}),s.jsxs(ye,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[s.jsx(je,{style:{color:"white"},children:ee}),s.jsxs(Ce,{children:[s.jsx(f,{onClick:()=>h("all"),children:"All"}),s.jsx(f,{onClick:()=>h("pending"),children:"Pending"}),s.jsx(f,{onClick:()=>h("sent"),children:"Sent"}),s.jsx(f,{onClick:()=>h("ready"),children:"Ready"}),s.jsx(f,{onClick:()=>h("waiting"),children:"Waiting"}),s.jsx(f,{onClick:()=>h("done"),children:"Paid"})]})]}),s.jsx(Pe,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:s.jsx(be,{type:"text",placeholder:"Search by No",style:{width:450,marginLeft:"0%"},value:i,onChange:e=>m(e.target.value)})}),X?s.jsx(xe,{}):s.jsxs(me,{children:[s.jsx(we,{children:s.jsxs(K,{children:[s.jsx(l,{scope:"col",children:"#"}),s.jsx(l,{scope:"col",children:"No"}),s.jsx(l,{scope:"col",children:"Name"}),s.jsx(l,{scope:"col",children:"Status"}),s.jsx(l,{scope:"col",children:"Date"}),s.jsx(l,{scope:"col",children:"Total"}),s.jsx(l,{scope:"col",children:"Tax"}),s.jsx(l,{scope:"col",children:"Tips"}),s.jsx(l,{scope:"col",children:"Payable"}),s.jsx(l,{scope:"col",children:"Action"}),s.jsx(l,{scope:"col",children:"PDF"})]})}),s.jsx(Se,{children:L.map((e,t)=>{let a="info",r="";return(e==null?void 0:e.status)==="pending"?(r="Pending",a="info"):(e==null?void 0:e.status)==="done"?(r="Paid",a="primary"):(e==null?void 0:e.status)==="sent"?(r="Sent",a="success"):(e==null?void 0:e.status)==="waiting"?(r="Waiting",a="warning"):(e==null?void 0:e.status)==="ready"&&(r="Ready",a="danger"),s.jsxs(K,{children:[s.jsx(n,{children:t+1}),s.jsx(n,{children:e.no}),s.jsx(n,{children:e.name}),s.jsx(n,{children:s.jsx(J,{style:{width:60},color:a,children:r})}),s.jsx(n,{children:e.date}),s.jsx(n,{children:e.total}),s.jsx(n,{children:e.tax}),s.jsx(n,{children:e.tips}),s.jsx(n,{children:e.payable}),s.jsxs(n,{children:[(e==null?void 0:e.status)==="waiting"&&s.jsx(d,{onClick:()=>D(e.id,e.status),size:"sm",color:a,style:{width:90},children:"Received"}),(e==null?void 0:e.status)==="sent"&&s.jsx(d,{size:"sm",onClick:()=>D(e.id,e.status),color:a,style:{width:90},children:"Received"}),(e==null?void 0:e.status)==="ready"&&s.jsx(d,{size:"sm",onClick:()=>D(e.id,e.status),color:a,style:{width:90},children:"To Pay"})]}),s.jsxs(n,{children:[s.jsx(d,{size:"sm",style:{backgroundColor:"#ff4d4d",width:80,color:"white"},onClick:()=>ce(e.type,e),children:"View"})," "]})]},t)})})]}),s.jsxs(ve,{"aria-label":"Page navigation example",children:[s.jsx(A,{disabled:v<=0,onClick:ie,children:"Previous"}),ue(),s.jsx(A,{disabled:ne===!0,onClick:re,children:"Next"})]}),s.jsxs(E,{visible:P,scrollable:!0,size:"xl",onClose:()=>N(!1),children:[s.jsx(R,{closeButton:!0,children:s.jsx(B,{children:"Information"})}),s.jsx(I,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:y.type==="flat_rate"?s.jsx(q,{style:{width:"100%",height:"100vh"},children:s.jsx(fe,{data:y.item})}):y.type==="occasional"?s.jsx(q,{style:{width:"100%",height:"100vh"},children:s.jsx(ge,{data:y.item})}):null})]}),s.jsxs(E,{alignment:"center",transition:!1,visible:z,scrollable:!0,size:"lg",onClose:()=>g(!1),children:[s.jsx(R,{closeButton:!0,children:s.jsx(B,{children:"Confirmation"})}),s.jsxs(I,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:[s.jsx("a",{children:"Are you sure you want to pay out status ?"}),s.jsx(d,{onClick:()=>W(),style:{display:"flex",justifyContent:"center"},color:"primary",children:"Yes"})]})]}),s.jsxs(E,{alignment:"center",visible:z,scrollable:!0,size:"sm",onClose:()=>g(!1),children:[s.jsx(R,{closeButton:!1,children:s.jsx(B,{children:"Confirmation"})}),s.jsxs(I,{children:[s.jsx("a",{children:"Are you sure you want to pay out status ?"}),s.jsx("br",{}),s.jsx("br",{}),s.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[s.jsx(d,{onClick:()=>W(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),s.jsx(d,{onClick:()=>g(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{Qe as default};
