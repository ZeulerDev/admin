import{y as ve,r as o,l as Me,A as l,j as e,h as Y,m as q}from"./index-vIOSoMUu.js";import{a as h}from"./axios-Cm0UX6qg.js";import{B as p}from"./config-HOLfLxHr.js";import{b as Pe,a as m}from"./CContainer-DQqje6Yb.js";import{C as De,a as G,b as J,c as K,d as C}from"./DefaultLayout-CKhc0dtY.js";import{C as Se}from"./CNavbar-CKkucrSO.js";import{C as Ae,a as we,b as O,c,d as Te,e as n}from"./CTable-CA_T2BdW.js";import{C as v}from"./CFormCheck-XP3Pf_8K.js";import{c as Ee}from"./cil-trash-CBbKHhHb.js";import{C as Be,a as S}from"./CPaginationItem-4rDKfmAB.js";import{C as Q,a as W,b as X,c as ee}from"./CModalTitle-UWL2UZXd.js";import"./CFormLabel-B9P4EuKI.js";var Le=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z' class='ci-primary'/>"];const Je=()=>{const[{user:x,token:i},r]=ve(),[te,se]=o.useState([]),[A,ae]=o.useState([]),[w,T]=o.useState(""),[E,B]=o.useState(""),[y,M]=o.useState(0),[oe,L]=o.useState("All Cities"),[re,N]=o.useState("All Chains");o.useState();const[le,g]=o.useState(!1),[ie,z]=o.useState(!1),[Ne,R]=o.useState(!1),[ce,$]=o.useState(!0);Me();const[I,j]=o.useState(!1),[_,k]=o.useState(!1),[ne,de]=o.useState(""),[ue,he]=o.useState(""),[pe,me]=o.useState(0),[b,P]=o.useState(1);o.useEffect(()=>{i&&h.get(p+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?se(t.data):t.status===500&&r({type:l,payload:{status:!0,title:"Chain Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},[]),o.useEffect(()=>{const t=setTimeout(()=>{r({type:l,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),g(!1)},2e4);return x&&i&&u(0,t),()=>{clearTimeout(t)}},[w,E,x]);const u=(t,s)=>{g(!0),h.get(p+`assistant/virtual/market/locations/${t}?brand=${w}&city=${E}`,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{a.status===200?(ae(a.data.data),me(a.data.count),console.log("count",a.data.count),g(!1),clearTimeout(s),a.data.data.length<20?($(!0),console.log("ok")):a.data.data.length>19&&$(!1)):a.status===500&&(g(!1),r({type:l,payload:{status:!0,title:"Market Loading error",message:a.data.message}}))}).catch(a=>{g(!1),console.error("Error: ",a)})},ge=()=>{P(b+1);const t=y+20;M(t),u(t,!0)},fe=()=>{P(b-1);const t=y-20;console.log(t),M(t),u(t,!0)},U=(t,s)=>{t==="all"?(T(""),N("All Chains")):(T(t),N(s))},D=t=>{t==="all"?(B(""),L("All Cities")):(B(t),L(t))},V=(t,s,a)=>{console.log(t),console.log(A),a==="delivery"?(H({market:t,service:a}),console.log("add delivery")):a==="pickup"&&(H({market:t,service:a}),console.log("add pickup"))},F=(t,s,a)=>{a==="delivery"?(Z({market:t,service:a}),console.log("remove delivery")):a==="pickup"&&(Z({market:t,service:a}),console.log("remove pickup"))},H=t=>{h.post(p+"assistant/markets/add/services",t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?console.log("Updated add service"):s.status===203?r({type:l,payload:{status:!0,title:"Market Updated error",message:s.data.message}}):s.status===204?r({type:l,payload:{status:!0,title:"Market Updated error",message:s.data.message}}):s.status===500&&r({type:l,payload:{status:!0,title:"Market Updated error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})},Z=t=>{h.post(p+"assistant/markets/remove/services",t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?console.log("Updated remove service"):s.status===203?r({type:l,payload:{status:!0,title:"Market remove error",message:s.data.message}}):s.status===204?r({type:l,payload:{status:!0,title:"Market remove error",message:s.data.message}}):s.status===500&&r({type:l,payload:{status:!0,title:"Market remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})},Ce=t=>{j(!I),de(t)},xe=t=>{k(!_),he(t)},ye=t=>{x&&i&&(z(!0),console.log(t),h.delete(p+"market/virtual/"+t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(r({type:l,payload:{status:!0,title:"Market Delete",message:"Market Remove Success",color:"success"}}),z(!1),j(!1),u(0,!0)):s.status===404?r({type:l,payload:{status:!0,title:"Market remove error",message:s.data.message}}):s.status===500&&r({type:l,payload:{status:!0,title:"Market remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)}))},je=t=>{x&&i&&(R(!0),console.log("id",t),h.delete(p+"product/delete/all/"+t,{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(r({type:l,payload:{status:!0,title:"Market Products Delete",message:"Market Products Remove Success",color:"success"}}),R(!1),k(!1),u(0,!0),console.log("Remove Market Products")):s.status===404?r({type:l,payload:{status:!0,title:"Market Products remove error",message:s.data.message}}):s.status===500&&r({type:l,payload:{status:!0,title:"Market Products remove error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)}))},ke=t=>{P(t);const s=(t-1)*20;M(s),u(s,!0)},be=()=>{const t=Math.ceil(pe/20),s=[];for(let d=1;d<=t;d++)s.push(d);console.log(s,t);const a=Math.max(b-2,1),f=Math.min(a+4,t);return s.slice(a-1,f).map(d=>e.jsx(S,{active:b===d,onClick:()=>ke(d),children:d},d))};return e.jsxs(Pe,{children:[e.jsx(De,{style:{marginLeft:"57%"},color:"secondary",children:"Filter by"}),e.jsxs(G,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(J,{style:{color:"white"},children:oe}),e.jsxs(K,{children:[e.jsx(C,{onClick:()=>D("all"),children:"All"}),e.jsx(C,{onClick:()=>D("Milano"),children:"Milano"}),e.jsx(C,{onClick:()=>D("Napoli"),children:"Napoli"})]})]}),e.jsxs(G,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(J,{style:{color:"white"},children:re}),e.jsxs(K,{children:[e.jsx(C,{onClick:()=>U("all"),children:"All"}),te.map((t,s)=>e.jsx(C,{onClick:()=>U(t.id,t.name),children:t.name},s))]})]}),e.jsx(Se,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),le?e.jsx(Y,{}):e.jsxs(Ae,{children:[e.jsx(we,{children:e.jsxs(O,{children:[e.jsx(c,{scope:"col",children:"#"}),e.jsx(c,{scope:"col",children:"Name"}),e.jsx(c,{scope:"col",children:"Address"}),e.jsx(c,{scope:"col",children:"City"}),e.jsx(c,{scope:"col",children:"Delivery"}),e.jsx(c,{scope:"col",children:"Pickup"}),e.jsx(c,{scope:"col",children:"Scraped"}),e.jsx(c,{scope:"col",children:"Delete"}),e.jsx(c,{scope:"col",children:"Empty Products"})]})}),e.jsx(Te,{children:A.map((t,s)=>e.jsxs(O,{children:[e.jsx(n,{children:y+s+1}),e.jsx(n,{children:t.chain.name}),e.jsx(n,{children:t.address}),e.jsx(n,{children:t.city}),e.jsx(n,{children:t.services.includes("delivery")?e.jsx(v,{id:"flexCheckChecked",label:"",defaultChecked:!0,onChange:()=>F(t._id,!0,"delivery")}):e.jsx(v,{id:"flexCheckChecked",label:"",onChange:()=>V(t._id,!0,"delivery")})}),e.jsx(n,{children:t.services.includes("pickup")?e.jsx(v,{id:"flexCheckChecked",label:"",defaultChecked:!0,onChange:()=>F(t._id,!0,"pickup")}):e.jsx(v,{id:"flexCheckChecked",label:"",onChange:()=>V(t._id,!0,"pickup")})}),e.jsx(n,{children:t.scraped}),e.jsx(n,{children:e.jsx(m,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>Ce(t._id),children:e.jsx(q,{icon:Ee,size:"lg",style:{color:"white"}})})}),e.jsx(n,{children:e.jsx(m,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>xe(t._id),children:e.jsx(q,{icon:Le,size:"lg",style:{color:"white"}})})})]},s))})]}),e.jsxs(Be,{"aria-label":"Page navigation example",children:[e.jsx(S,{disabled:y<=0,onClick:fe,children:"Previous"}),be(),e.jsx(S,{disabled:ce===!0,onClick:ge,children:"Next"})]}),e.jsxs(Q,{alignment:"center",visible:I,scrollable:!0,size:"sm",onClose:()=>j(!1),children:[e.jsx(W,{closeButton:!1,children:e.jsx(X,{children:"Confirmation"})}),e.jsxs(ee,{children:[e.jsx("a",{children:"Are you sure you want to delete this market?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:ie?e.jsx(Y,{}):e.jsxs(e.Fragment,{children:[e.jsx(m,{onClick:()=>ye(ne),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(m,{onClick:()=>j(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})})]})]}),e.jsxs(Q,{alignment:"center",visible:_,scrollable:!0,size:"sm",onClose:()=>k(!1),children:[e.jsx(W,{closeButton:!1,children:e.jsx(X,{children:"Confirmation"})}),e.jsxs(ee,{children:[e.jsx("a",{children:"Are you sure you want to delete all products in this market?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(m,{onClick:()=>je(ue),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(m,{onClick:()=>k(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{Je as default};