import{B as ye,r as t,y as Me,A as i,j as a,h as U,m as be}from"./index-Dr2bAMPU.js";import{B as f}from"./config-HOLfLxHr.js";import{a as C}from"./axios-Cm0UX6qg.js";import{b as Ae,a as y}from"./CContainer-u87GNtez.js";import{C as V}from"./CNavbar-B7PVcNkl.js";import{C as q,a as G,b as M,c,d as J,e as d}from"./CTable-Bfn_R52F.js";import{c as Se}from"./cil-trash-CBbKHhHb.js";import{C as we,a as De,b as Pe,c as ve}from"./CModalTitle-DKRx84Yh.js";import{C as Ee,a as K,b as O,d as Q,e as p}from"./DefaultLayout-B2Nh7q8u.js";import{C as Ne}from"./CModalFooter-op4IeWM8.js";import{C as Be,a as N}from"./CPaginationItem-DP1tcg58.js";const Ye=()=>{const{id:h}=ye(),[W,X]=t.useState([]),[Y,m]=t.useState(!1),[{user:g,token:n},r]=Me(),[Z,x]=t.useState(!1),[ee,B]=t.useState(!1),[ae,b]=t.useState("All Cities"),[se,A]=t.useState("All Chains"),[T,S]=t.useState(""),[z,w]=t.useState(""),[Te,L]=t.useState(""),[ze,$]=t.useState("All Cities"),[Le,R]=t.useState(""),[$e,_]=t.useState("All Chains"),[Re,te]=t.useState([]),[oe,le]=t.useState([]),[re,ie]=t.useState([]),[_e,H]=t.useState(!0);t.useState(0);const[ne,ce]=t.useState([]),[de,He]=t.useState(!0),[k,D]=t.useState(0),[ue,he]=t.useState(0),[j,P]=t.useState(1);t.useEffect(()=>{console.log("id",h),v(h)},[]);const v=e=>{e?(console.log("id",e),g&&n?(m(!0),C.get(f+"promotion/all/markets/"+e,{headers:{Authorization:`Bearer ${n}`}}).then(s=>{s.status===200?(console.log("market",s.data.market),X(s.data.market),ce(s.data.market.map(o=>o._id)),m(!1)):s.status===203?(m(!1),r({type:i,payload:{status:!0,title:" markets loading error",message:s.data.message}})):s.status===500&&(m(!1),r({type:i,payload:{status:!0,title:" markets loading error",message:s.data.message}}))})):(m(!1),r({type:i,payload:{status:!0,title:" markets loading error",message:"No user or token found"}}))):r({type:i,payload:{status:!0,title:" markets loading error",message:"No id found"}})};t.useEffect(()=>{me()},[]);const me=()=>{n&&C.get(f+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${n}`}}).then(e=>{e.status===200?(te(e.data),le(e.data)):e.status===500&&r({type:i,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},E=(e,s)=>{s==="view"?e==="all"?(R(""),$("All Cities")):(R(e),$(e)):s==="modal"&&(e==="all"?(w(""),b("All Cities")):(w(e),b(e)))},I=(e,s,o)=>{o==="view"?e==="all"?(L(""),_("All Chains")):(L(e),_(s)):o==="modal"&&(e==="all"?(S(""),A("All Chains")):(S(e),A(s)))};t.useEffect(()=>{g&&n&&ge(0)},[T,z,g]);const ge=(e,s)=>{B(!0),C.get(f+`assistant/market/locations/${e}?brand=${T}&city=${z}`,{headers:{Authorization:`Bearer ${n}`}}).then(o=>{o.status===200?(ie(o.data.data),he(o.data.count),console.log("data market"),B(!1),o.data.data.length<20?(H(!0),console.log("ok")):o.data.data.length>19&&H(!1)):o.status===500&&r({type:i,payload:{status:!0,title:"Market Loading error",message:o.data.message}})}).catch(o=>{console.error("Error: ",o)})},fe=()=>{P(j+1);const e=k+20;D(e),loadDataMarket(e,!0)},Ce=()=>{P(j-1);const e=k-20;console.log(e),D(e),loadDataMarket(e,!0)},pe=e=>{P(e);const s=(e-1)*20;D(s),loadDataMarket(s,!0)},xe=()=>{const e=Math.ceil(ue/20),s=[];for(let u=1;u<=e;u++)s.push(u);const o=Math.max(j-2,1),l=Math.min(o+4,e);return s.slice(o-1,l).map(u=>a.jsx(N,{active:j===u,onClick:()=>pe(u),children:u},u))},ke=()=>{x(!0)},je=(e,s)=>{if(s&&e){const o={marketId:s};n&&g&&n&&C.patch(f+"promotion/add/market/"+e,o,{headers:{Authorization:`Bearer ${n}`}}).then(l=>{l.status===200?(x(!1),v(e),r({type:i,payload:{status:!0,title:"Market Assign",message:"successfully Market assigned to the promotion",color:"success"}})):l.status===400?r({type:i,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}}):l.status===404?r({type:i,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}}):l.status===500&&r({type:i,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else r({type:i,payload:{status:!0,title:"Error!",message:"check again",color:"warning"}})},F=(e,s)=>{if(s&&e){const o={marketId:s};n&&g&&n&&C.patch(f+"promotion/remove/market/"+e,o,{headers:{Authorization:`Bearer ${n}`}}).then(l=>{l.status===200?(v(e),x(!1),r({type:i,payload:{status:!0,title:"Market Assign",message:"successfully Market removed from the promotion",color:"success"}})):l.status===204?r({type:i,payload:{status:!0,title:"Market remove error",message:l.data.message,color:"warning"}}):l.status===500&&r({type:i,payload:{status:!0,title:"Market remove error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else r({type:i,payload:{status:!0,title:"Error!",message:"check again",color:"warning"}})};return a.jsxs(Ae,{children:[a.jsx(y,{onClick:()=>{ke()},style:{marginLeft:"0%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:"Add Market"}),a.jsx(V,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),Y?a.jsx(U,{}):a.jsxs(q,{children:[a.jsx(G,{children:a.jsxs(M,{children:[a.jsx(c,{scope:"col",children:"#"}),a.jsx(c,{scope:"col",children:"Name"}),a.jsx(c,{scope:"col",children:"Address"}),a.jsx(c,{scope:"col",children:"City"}),a.jsx(c,{scope:"col",children:"Remove Market "})]})}),a.jsx(J,{children:W.map((e,s)=>a.jsxs(M,{children:[a.jsx(d,{children:s+1}),a.jsx(d,{children:e.chain.name}),a.jsx(d,{children:e.address}),a.jsx(d,{children:e.city}),a.jsx(d,{children:a.jsx(y,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{F(h,e._id)},children:a.jsx(be,{icon:Se,size:"lg",style:{color:"white"}})})})]},s))})]}),a.jsxs(we,{visible:Z,scrollable:!0,size:"xl",onClose:()=>{x(!1),A("All Chains"),b("All Cities"),S(""),w("")},children:[a.jsx(De,{closeButton:!0,children:a.jsx(Pe,{children:"Market assign view"})}),a.jsxs(ve,{children:[a.jsx(Ee,{style:{marginLeft:"54%"},color:"secondary",children:"Filter by"}),a.jsxs(K,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(O,{style:{color:"white"},children:ae}),a.jsxs(Q,{children:[a.jsx(p,{onClick:()=>E("all","modal"),children:"All"}),a.jsx(p,{onClick:()=>E("Milano","modal"),children:"Milano"}),a.jsx(p,{onClick:()=>E("Napoli","modal"),children:"Napoli"})]})]}),a.jsxs(K,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(O,{style:{color:"white"},children:se}),a.jsxs(Q,{children:[a.jsx(p,{onClick:()=>I("all",null,"modal"),children:"All"}),oe.map((e,s)=>a.jsx(p,{onClick:()=>I(e.id,e.name,"modal"),children:e.name},s))]})]}),a.jsx(V,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),ee?a.jsx(U,{}):a.jsxs(q,{children:[a.jsx(G,{children:a.jsxs(M,{children:[a.jsx(c,{scope:"col",children:"#"}),a.jsx(c,{scope:"col",children:"Name"}),a.jsx(c,{scope:"col",children:"Address"}),a.jsx(c,{scope:"col",children:"City"}),a.jsx(c,{scope:"col",children:"Measurement"}),a.jsx(c,{scope:"col"})]})}),a.jsx(J,{children:re.map((e,s)=>a.jsxs(M,{children:[a.jsx(d,{children:k+s+1}),a.jsx(d,{children:e.chain.name}),a.jsx(d,{children:e.address}),a.jsx(d,{children:e.city}),a.jsx(d,{children:e.scraped}),a.jsx(d,{children:ne.includes(e._id)?a.jsx(y,{size:"sm",onClick:()=>F(h,e._id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Remove"}):a.jsx(y,{size:"sm",onClick:()=>je(h,e._id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},s))})]}),a.jsx(Ne,{children:a.jsxs(Be,{"aria-label":"Page navigation example",children:[a.jsx(N,{disabled:k<=0,onClick:Ce,children:"Previous"}),xe(),a.jsx(N,{disabled:de===!0,onClick:fe,children:"Next"})]})})]})]})]})};export{Ye as default};
