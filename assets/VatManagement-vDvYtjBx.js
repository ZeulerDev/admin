import{r as o,y as O,A as d,j as e,h as W}from"./index-BPO4cydh.js";import{a as B}from"./axios-Cm0UX6qg.js";import{B as M}from"./config-HOLfLxHr.js";import{b as X,a as T}from"./CContainer-CzrymXOH.js";import{C as Z}from"./CNavbar-BFoBctN0.js";import{C as z}from"./CFormInput-LNlkVcKE.js";import{C as ee,a as te,b as S,c,d as se,e as r}from"./CTable-C0lRWiFj.js";import{C as g}from"./DefaultLayout-BjLm7xgN.js";import{C as ae,a as D}from"./CPaginationItem-68gnEGM1.js";import{C as oe,a as re,b as le,c as ne}from"./CModalTitle-D7OB1RAV.js";import{C as ce}from"./CModalFooter-MHlU5bj7.js";import"./CFormLabel-CaOASrRa.js";const ve=()=>{const[I,f]=o.useState(!1),[{user:j,token:h},i]=O(),[p,A]=o.useState([]),[L,C]=o.useState(!1),[R,Q]=o.useState(""),[P,V]=o.useState(""),[l,H]=o.useState(""),[$,w]=o.useState(l),[F,U]=o.useState(0),[x,y]=o.useState(1),[v,b]=o.useState(0),[Y,E]=o.useState(!0);o.useEffect(()=>{const t=setTimeout(()=>{i({type:d,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),C(!1)},2e4);return j&&h&&m(0,t),()=>{clearTimeout(t)}},[$]),o.useEffect(()=>{const t=setTimeout(()=>{(l.length>=3||l.length===0)&&w(l)},500);return()=>{clearTimeout(t)}},[l]);const m=(t,s)=>{j&&h&&(C(!0),B.get(M+`assistant/vat/riders/${t}?search=`+l,{headers:{Authorization:`Bearer ${h}`}}).then(a=>{a.status===200?(A(a.data.list),U(a.data.count),C(!1),console.log("done"),clearTimeout(s),a.data.list.length<50?(E(!0),console.log("ok")):a.data.list.length>49&&E(!1)):a.status===204?i({type:d,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}}):a.status===500&&i({type:d,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}})}).catch(a=>{console.error("Error:",a)}))},_=()=>{y(x+1);const t=v+50;b(t),m(t,!0)},G=()=>{y(x-1);const t=v-50;console.log(t),b(t),m(t,!1)},N=(t,s=null)=>{f(!I),Q(t),s!==null?V(s):console.log("VAT DID not provided"),console.log(t)},q=()=>{const t={vat:P};j&&h&&B.patch(M+"assistant/rider/vat/"+R,t,{headers:{Authorization:`Bearer ${h}`}}).then(s=>{if(s.status===200){console.log("updated"),f(!1);const a=s.data,u=p.find(k=>k.id===a.id);u&&(u.vat=a.vat),A([...p]),i({type:d,payload:{status:!0,title:"Driver VAT Id ",message:"VAT Id updated successfully"}})}else s.status===203?(console.log("203"),i({type:d,payload:{status:!0,title:"Driver VAT Id error",message:s.data.message}})):s.status===204?(console.log("204"),i({type:d,payload:{status:!0,title:"Driver VAT Id error",message:s.data.message}})):s.status===500&&i({type:d,payload:{status:!0,title:"Driver VAT Id update error",message:s.data.message}})}).catch(s=>{console.error(s)})},J=t=>{y(t);const s=(t-1)*50;b(s),m(s,!0)},K=()=>{const t=Math.ceil(F/50),s=[];for(let n=1;n<=t;n++)s.push(n);const a=Math.max(x-2,1),u=Math.min(a+4,t);return s.slice(a-1,u).map(n=>e.jsx(D,{active:x===n,onClick:()=>J(n),children:n},n))};return e.jsxs(X,{children:[e.jsx(Z,{className:"bg-body-tertiary",children:e.jsx(z,{type:"text",placeholder:"Search by name",style:{width:450,marginLeft:"0%"},value:l,onChange:t=>H(t.target.value)})}),L?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(W,{style:{marginTop:"15%"}})}):e.jsxs(ee,{children:[e.jsx(te,{children:e.jsxs(S,{children:[e.jsx(c,{scope:"col",children:"#"}),e.jsx(c,{scope:"col",children:"Name"}),e.jsx(c,{scope:"col",children:"City"}),e.jsx(c,{scope:"col",children:"Vat"}),e.jsx(c,{scope:"col",children:"Activate"}),e.jsx(c,{scope:"col",children:"Enabled"}),e.jsx(c,{scope:"col",children:"Groups"}),e.jsx(c,{scope:"col",children:"Action"})]})}),e.jsx(se,{children:p.length===0?e.jsx(S,{children:e.jsx(r,{colSpan:"8",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):p.map((t,s)=>e.jsxs(S,{children:[e.jsx(r,{children:s+1}),e.jsx(r,{children:t.name}),e.jsx(r,{children:t.city}),e.jsx(r,{children:t.vat?t.vat:e.jsx(g,{color:"warning",children:"Null"})}),e.jsx(r,{children:t.activate?e.jsx(g,{color:"success",children:"Yes"}):e.jsx(g,{color:"warning",children:"No"})}),e.jsx(r,{children:t.disabled?e.jsx(g,{color:"success",children:"No"}):e.jsx(g,{color:"warning",children:"Yes"})}),e.jsx(r,{children:t.groups.map((a,u)=>e.jsx("div",{children:a.name},u))}),e.jsx(r,{children:t.vat===""?e.jsx(T,{size:"sm",style:{backgroundColor:"#ff4d4d",width:70,color:"white"},onClick:()=>N(t.id,t.vat),children:"Insert "}):e.jsx(T,{size:"sm",style:{backgroundColor:"#ff4d4d",width:70,color:"white"},onClick:()=>N(t.id,t.vat),children:"Edit "})})]},s))})]}),e.jsxs(ae,{"aria-label":"Page navigation example",children:[e.jsx(D,{disabled:v<=0,onClick:G,children:"Previous"}),K(),e.jsx(D,{disabled:Y===!0,onClick:_,children:"Next"})]}),e.jsxs(oe,{alignment:"center",visible:I,scrollable:!0,size:"sm",onClose:()=>f(!1),children:[e.jsx(re,{closeButton:!0,children:e.jsx(le,{children:"Confirmation"})}),e.jsxs(ne,{children:[e.jsx("a",{children:"Enter Driver's VAT id here"}),e.jsx("br",{}),e.jsx(z,{type:"text",placeholder:"Vat id",value:P,onChange:t=>V(t.target.value)})]}),e.jsx(ce,{children:e.jsx(T,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>q(),children:"Save changes"})})]})]})};export{ve as default};
