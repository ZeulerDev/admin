import{r as o,y as O,A as u,j as e,h as W}from"./index-BzWpTyRP.js";import{a as B}from"./axios-Cm0UX6qg.js";import{B as M}from"./config-HOLfLxHr.js";import{b as X,a as T}from"./CContainer-BohUAxSl.js";import{C as Z}from"./CNavbar-u7Q3iHwm.js";import{C as z}from"./CFormInput-ztrVIr0j.js";import{C as ee,a as te,b as k,c,d as se,e as r}from"./CTable-C62CAHLk.js";import{C as p}from"./DefaultLayout-Blmcm6y8.js";import{C as ae,a as P}from"./CPaginationItem-CQqCx2lq.js";import{C as oe,a as re,b as le,c as ne}from"./CModalTitle-BEoCtNfZ.js";import{C as ce}from"./CModalFooter-COP8gJvv.js";import"./CFormLabel-BSwA839n.js";const be=()=>{const[S,j]=o.useState(!1),[{user:I,token:g},i]=O(),[x,A]=o.useState([]),[L,C]=o.useState(!1),[R,Q]=o.useState(""),[V,w]=o.useState(""),[l,H]=o.useState(""),[$,E]=o.useState(l),[F,U]=o.useState(0),[m,y]=o.useState(1),[b,v]=o.useState(0),[Y,D]=o.useState(!0);o.useEffect(()=>{let t=setTimeout(()=>{i({type:u,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),C(!1)},2e4);return f(0,t),()=>{clearTimeout(t)}},[$]),o.useEffect(()=>{const t=setTimeout(()=>{(l.length>=3||l.length===0)&&E(l)},500);return()=>{clearTimeout(t)}},[l]);const f=(t,s)=>{I&&g&&(C(!0),B.get(M+`assistant/vat/shoppers/${t}?search=`+l,{headers:{Authorization:`Bearer ${g}`}}).then(a=>{a.status===200?(A(a.data.list),U(a.data.count),clearTimeout(s),C(!1),a.data.list.length<50?(D(!0),console.log("ok")):a.data.list.length>49&&D(!1)):a.status===204?i({type:u,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}}):a.status===500&&i({type:u,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}})}).catch(a=>{console.error("Error:",a)}))},_=()=>{y(m+1);const t=b+50;v(t),f(t,!0)},q=()=>{y(m-1);const t=b-50;console.log(t),v(t),f(t,!1)},N=(t,s=null)=>{j(!S),Q(t),s!==null?w(s):console.log("VAT PID not provided"),console.log(t)},G=()=>{const t={vat:V};I&&g&&B.patch(M+"assistant/shopper/vat/"+R,t,{headers:{Authorization:`Bearer ${g}`}}).then(s=>{if(s.status===200){console.log("updated"),j(!1);const a=s.data,d=x.find(h=>h.id===a.id);d&&(d.vat=a.vat),A([...x]),i({type:u,payload:{status:!0,title:"Picker VAT Id ",message:"VAT Id updated successfully"}})}else s.status===203?(console.log("203"),i({type:u,payload:{status:!0,title:"Picker VAT Id update error",message:s.data.message}})):s.status===204?(console.log("204"),i({type:u,payload:{status:!0,title:"Picker VAT Id update error",message:s.data.message}})):s.status===500&&i({type:u,payload:{status:!0,title:"Picker VAT Id update error",message:s.data.message}})}).catch(s=>{console.error(s)})},J=t=>{y(t);const s=(t-1)*50;v(s),f(s,!0)},K=()=>{const t=Math.ceil(F/50),s=[];for(let n=1;n<=t;n++)s.push(n);const a=Math.max(m-2,1),d=Math.min(a+4,t);return s.slice(a-1,d).map(n=>e.jsx(P,{active:m===n,onClick:()=>J(n),children:n},n))};return e.jsxs(X,{children:[e.jsx(Z,{className:"bg-body-tertiary",children:e.jsx(z,{type:"text",placeholder:"Search by name",style:{width:450,marginLeft:"0%"},value:l,onChange:t=>H(t.target.value)})}),L?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(W,{style:{marginTop:"15%"}})}):e.jsxs(ee,{children:[e.jsx(te,{children:e.jsxs(k,{children:[e.jsx(c,{scope:"col",children:"#"}),e.jsx(c,{scope:"col",children:"Name"}),e.jsx(c,{scope:"col",children:"City"}),e.jsx(c,{scope:"col",children:"Vat"}),e.jsx(c,{scope:"col",children:"Activate"}),e.jsx(c,{scope:"col",children:"Disabled"}),e.jsx(c,{scope:"col",children:"market"}),e.jsx(c,{scope:"col",children:"Action"})]})}),e.jsx(se,{children:x.length===0?e.jsx(k,{children:e.jsx(r,{colSpan:"8",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):x.map((t,s)=>{var a,d,h;return e.jsxs(k,{children:[e.jsx(r,{children:s+1}),e.jsx(r,{children:t.name}),e.jsx(r,{children:t.city}),e.jsx(r,{children:t.vat?t.vat:e.jsx(p,{color:"warning",children:"Empty"})}),e.jsx(r,{children:t.activate?e.jsx(p,{color:"success",children:"Yes"}):e.jsx(p,{color:"warning",children:"No"})}),e.jsx(r,{children:t.disabled?e.jsx(p,{color:"success",children:"No"}):e.jsx(p,{color:"warning",children:"Yes"})}),e.jsxs(r,{children:[(d=(a=t.market)==null?void 0:a.chain)==null?void 0:d.name," - ",(h=t.market)==null?void 0:h.address]}),e.jsx(r,{children:t.vat===""?e.jsx(T,{size:"sm",style:{backgroundColor:"#ff4d4d",width:70,color:"white"},onClick:()=>N(t.id,t.vat),children:"Insert "}):e.jsx(T,{size:"sm",style:{backgroundColor:"#ff4d4d",width:70,color:"white"},onClick:()=>N(t.id,t.vat),children:"Edit "})})]},s)})})]}),e.jsxs(ae,{"aria-label":"Page navigation example",children:[e.jsx(P,{disabled:b<=0,onClick:q,children:"Previous"}),K(),e.jsx(P,{disabled:Y===!0,onClick:_,children:"Next"})]}),e.jsxs(oe,{alignment:"center",visible:S,scrollable:!0,size:"sm",onClose:()=>j(!1),children:[e.jsx(re,{closeButton:!0,children:e.jsx(le,{children:"Confirmation"})}),e.jsxs(ne,{children:[e.jsx("a",{children:"Enter Picker's VAT id here"}),e.jsx("br",{}),e.jsx(z,{type:"text",placeholder:"Vat id",value:V,onChange:t=>w(t.target.value)})]}),e.jsx(ce,{children:e.jsx(T,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>G(),children:"Save changes"})})]})]})};export{be as default};
