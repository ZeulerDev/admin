import{y as pe,r as a,l as je,A as r,j as e,h as _,m as H}from"./index-BzWpTyRP.js";import{a as y}from"./axios-Cm0UX6qg.js";import{B as k}from"./config-HOLfLxHr.js";import{b as ye,a as h}from"./CContainer-BohUAxSl.js";import{C as ke,a as Z,b as F,d as Y,e as g}from"./DefaultLayout-Blmcm6y8.js";import{C as be}from"./CNavbar-u7Q3iHwm.js";import{C as Me,a as Pe,b as S,c as d,d as Se,e as c}from"./CTable-C62CAHLk.js";import{c as ve}from"./cil-trash-CBbKHhHb.js";import{C as De,a as v}from"./CPaginationItem-CQqCx2lq.js";import{C as U,a as q,b as G,c as J}from"./CModalTitle-BEoCtNfZ.js";var Ae=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z' class='ci-primary'/>"];const He=()=>{const[{user:x,token:i},o]=pe(),[K,O]=a.useState([]),[D,Q]=a.useState([]),[A,T]=a.useState(""),[w,N]=a.useState(""),[f,b]=a.useState(0),[W,E]=a.useState("All Cities"),[X,L]=a.useState("All Chains");a.useState();const[ee,m]=a.useState(!1),[te,B]=a.useState(!1),[Te,I]=a.useState(!1),[se,z]=a.useState(!0);je();const[R,C]=a.useState(!1),[$,p]=a.useState(!1),[ae,le]=a.useState(""),[oe,re]=a.useState(""),[ie,ne]=a.useState(0),[j,M]=a.useState(1);a.useEffect(()=>{i&&y.get(k+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?O(t.data):t.status===500&&o({type:r,payload:{status:!0,title:"Chain Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},[]),a.useEffect(()=>{const t=setTimeout(()=>{o({type:r,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),m(!1)},2e4);return x&&i&&u(0,t),()=>{clearTimeout(t)}},[A,w,x]);const u=(t,s)=>{m(!0),y.get(k+`assistant/virtual/market/locations/${t}?brand=${A}&city=${w}`,{headers:{Authorization:`Bearer ${i}`}}).then(l=>{l.status===200?(Q(l.data.data),ne(l.data.count),console.log("count",l.data.count),m(!1),clearTimeout(s),l.data.data.length<20?(z(!0),console.log("ok")):l.data.data.length>19&&z(!1)):l.status===500&&(m(!1),o({type:r,payload:{status:!0,title:"Market Loading error",message:l.data.message}}))}).catch(l=>{m(!1),console.error("Error: ",l)})},ce=()=>{M(j+1);const t=f+20;b(t),u(t,!0)},de=()=>{M(j-1);const t=f-20;console.log(t),b(t),u(t,!0)},V=(t,s)=>{t==="all"?(T(""),L("All Chains")):(T(t),L(s))},P=t=>{t==="all"?(N(""),E("All Cities")):(N(t),E(t))},ue=t=>{C(!R),le(t)},he=t=>{p(!$),re(t)},me=t=>{x&&i&&(B(!0),console.log(t),y.delete(k+"market/virtual/"+t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(o({type:r,payload:{status:!0,title:"Market Delete",message:"Market Remove Success",color:"success"}}),B(!1),C(!1),u(0,!0)):s.status===404?o({type:r,payload:{status:!0,title:"Market remove error",message:s.data.message}}):s.status===500&&o({type:r,payload:{status:!0,title:"Market remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)}))},ge=t=>{x&&i&&(I(!0),console.log("id",t),y.delete(k+"product/delete/all/"+t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(o({type:r,payload:{status:!0,title:"Market Products Delete",message:"Market Products Remove Success",color:"success"}}),I(!1),p(!1),u(0,!0),console.log("Remove Market Products")):s.status===404?o({type:r,payload:{status:!0,title:"Market Products remove error",message:s.data.message}}):s.status===500&&o({type:r,payload:{status:!0,title:"Market Products remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)}))},xe=t=>{M(t);const s=(t-1)*20;b(s),u(s,!0)},fe=()=>{const t=Math.ceil(ie/20),s=[];for(let n=1;n<=t;n++)s.push(n);console.log(s,t);const l=Math.max(j-2,1),Ce=Math.min(l+4,t);return s.slice(l-1,Ce).map(n=>e.jsx(v,{active:j===n,onClick:()=>xe(n),children:n},n))};return e.jsxs(ye,{children:[e.jsx(ke,{style:{marginLeft:"57%"},color:"secondary",children:"Filter by"}),e.jsxs(Z,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(F,{style:{color:"white"},children:W}),e.jsxs(Y,{children:[e.jsx(g,{onClick:()=>P("all"),children:"All"}),e.jsx(g,{onClick:()=>P("Milano"),children:"Milano"}),e.jsx(g,{onClick:()=>P("Napoli"),children:"Napoli"})]})]}),e.jsxs(Z,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(F,{style:{color:"white"},children:X}),e.jsxs(Y,{children:[e.jsx(g,{onClick:()=>V("all"),children:"All"}),K.map((t,s)=>e.jsx(g,{onClick:()=>V(t.id,t.name),children:t.name},s))]})]}),e.jsx(be,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),ee?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(_,{style:{marginTop:"15%"}})}):e.jsxs(Me,{children:[e.jsx(Pe,{children:e.jsxs(S,{children:[e.jsx(d,{scope:"col",children:"#"}),e.jsx(d,{scope:"col",children:"Name"}),e.jsx(d,{scope:"col",children:"Address"}),e.jsx(d,{scope:"col",children:"City"}),e.jsx(d,{scope:"col",children:"Scraped"}),e.jsx(d,{scope:"col",children:"Delete"}),e.jsx(d,{scope:"col",children:"Empty Products"})]})}),e.jsx(Se,{children:D.length===0?e.jsx(S,{children:e.jsx(c,{colSpan:"7",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):D.map((t,s)=>e.jsxs(S,{children:[e.jsx(c,{children:f+s+1}),e.jsx(c,{children:t.chain.name}),e.jsx(c,{children:t.address}),e.jsx(c,{children:t.city}),e.jsx(c,{children:t.scraped}),e.jsx(c,{children:e.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>ue(t._id),children:e.jsx(H,{icon:ve,size:"lg",style:{color:"white"}})})}),e.jsx(c,{children:e.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>he(t._id),children:e.jsx(H,{icon:Ae,size:"lg",style:{color:"white"}})})})]},s))})]}),e.jsxs(De,{"aria-label":"Page navigation example",children:[e.jsx(v,{disabled:f<=0,onClick:de,children:"Previous"}),fe(),e.jsx(v,{disabled:se===!0,onClick:ce,children:"Next"})]}),e.jsxs(U,{alignment:"center",visible:R,scrollable:!0,size:"sm",onClose:()=>C(!1),children:[e.jsx(q,{closeButton:!1,children:e.jsx(G,{children:"Confirmation"})}),e.jsxs(J,{children:[e.jsx("a",{children:"Are you sure you want to delete this market?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:te?e.jsx(_,{}):e.jsxs(e.Fragment,{children:[e.jsx(h,{onClick:()=>me(ae),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(h,{onClick:()=>C(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})})]})]}),e.jsxs(U,{alignment:"center",visible:$,scrollable:!0,size:"sm",onClose:()=>p(!1),children:[e.jsx(q,{closeButton:!1,children:e.jsx(G,{children:"Confirmation"})}),e.jsxs(J,{children:[e.jsx("a",{children:"Are you sure you want to delete all products in this market?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(h,{onClick:()=>ge(oe),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(h,{onClick:()=>p(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{He as default};
