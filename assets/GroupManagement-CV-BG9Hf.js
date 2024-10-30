import{r as t,y as ke,l as we,A as d,j as e,h as K}from"./index-BzWpTyRP.js";import{a as p}from"./axios-Cm0UX6qg.js";import{B as g}from"./config-HOLfLxHr.js";import{b as De,a as C}from"./CContainer-BohUAxSl.js";import{C as A,a as G,b as S,d as v,e as u}from"./DefaultLayout-Blmcm6y8.js";import{C as O}from"./CNavbar-u7Q3iHwm.js";import{C as Q,a as W,b as f,c as n,d as X,e as l}from"./CTable-C62CAHLk.js";import{C as Me,a as be,b as Ae,c as Ge}from"./CModalTitle-BEoCtNfZ.js";import{C as Se}from"./CModalFooter-COP8gJvv.js";import{C as ve,a as Y}from"./CPaginationItem-CQqCx2lq.js";const He=()=>{const[T,x]=t.useState(!1),[{user:m,token:i},c]=ke(),[E,Z]=t.useState([]),[ee,j]=t.useState(!1),[N,P]=t.useState(""),[L,B]=t.useState(""),[z,Te]=t.useState("");t.useState(!1),t.useState(""),we();const[se,ae]=t.useState(!1),[te,$]=t.useState("All Cities"),[re,I]=t.useState("All Market Groups");t.useState("All Chains");const[oe,le]=t.useState([]),[Ee,ie]=t.useState([]),[R,k]=t.useState(""),[ne,w]=t.useState([]),[ce,D]=t.useState("All Cities"),[_,M]=t.useState(""),[de,ue]=t.useState([]),[he,F]=t.useState(!1),[pe,H]=t.useState(!0),[y,U]=t.useState(0);t.useEffect(()=>{b(),ge()},[]);const b=()=>{i&&p.get(g+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?le(s.data):s.status===500&&c({type:d,payload:{status:!0,title:"Market Group Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},ge=()=>{i&&p.get(g+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${i}`}}).then(s=>{s.status===200?(ie(s.data),ae(!1)):s.status===500&&c({type:d,payload:{status:!0,title:"Chain Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})};t.useEffect(()=>{const s=setTimeout(()=>{c({type:d,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),j(!1)},2e4);return V(s),()=>{clearTimeout(s)}},[N,L,z,se]);const V=s=>{m&&i&&(j(!0),p.get(g+`assistant/riders/test/0?city=${N}&group=${L}&chain=${z}`,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{a.status===200?(Z(a.data),j(!1),clearTimeout(s)):a.status===500&&c({type:d,payload:{status:!0,title:"Error",message:a.data.message,color:"warning"}})}).catch(a=>{console.error("Error:",a)}))},h=(s,a)=>{a==="view"?s==="all"?(P(""),$("All Cities")):(P(s),$(s)):a==="modal"&&(s==="all"?(M(""),D("All Cities")):(M(s),D(s)))},q=(s,a)=>{s==="all"?(B(""),I("All Market Groups")):(B(s),I(a))},J=(s,a)=>{D("All Cities"),M(""),x(!T),k(a),w(s)};t.useEffect(()=>{m&&i&&me(0)},[m,_]);const me=(s,a)=>{F(!0),p.get(g+`market/groups/fetch/${s}?city=${_}`,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{o.status===200?(ue(o.data),F(!1),o.data.length<20?(H(!0),console.log("ok")):o.data.length>19&&H(!1)):o.status===500&&c({type:d,payload:{status:!0,title:"Makrket Group loading error",message:o.data.message}})}).catch(o=>{console.error("Error:",o)})},fe=()=>{const s=y+20;U(s),loadData(s,!0)},xe=()=>{const s=y-20;console.log(s),U(s),loadData(s,!1)},je=(s,a)=>{if(console.log("driver id",s),console.log("group id",a),a&&s){const o={id:a,rider:s};i&&m&&i&&p.put(g+"assistant/groups/rider/assign",o,{headers:{Authorization:`Bearer ${i}`}}).then(r=>{if(r.status===200){x(!1),k(""),w([]),console.log(r.data),b();const Ce=setTimeout(()=>{j(!1)},2e4);V(Ce),c({type:d,payload:{status:!0,title:"Market Group Assign",message:"successfully Market Group assigned to the picker ",color:"success"}})}else r.status===204?c({type:d,payload:{status:!0,title:"Group Assign error",message:r.data.message,color:"warning"}}):r.status===500&&c({type:d,payload:{status:!0,title:"Group Assign error",message:r.data.message,color:"warning"}})}).catch(r=>{console.error("Error:",r)})}else c({type:d,payload:{status:!0,title:"Error!",message:"Driver group assign error",color:"warning"}})},ye=(s,a)=>{if(a&&s){const o={id:a,rider:s};i&&m&&i&&p.put(g+"assistant/groups/rider/remove",o,{headers:{Authorization:`Bearer ${i}`}}).then(r=>{r.status===200?(x(!1),k(""),w([]),b(),c({type:d,payload:{status:!0,title:"Market Group Remove",message:"successfully Market Group removed from the picker ",color:"success"}})):r.status===204?c({type:d,payload:{status:!0,title:"Group remove error",message:r.data.message,color:"warning"}}):r.status===500&&c({type:d,payload:{status:!0,title:"Group remove error",message:r.data.message,color:"warning"}})}).catch(r=>{console.error("Error:",r)})}else c({type:d,payload:{status:!0,title:"Error!",message:"Driver group assign error",color:"warning"}})};return e.jsxs(De,{children:[e.jsx(A,{style:{marginLeft:"54%"},color:"secondary",children:"Filter by"}),e.jsxs(G,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(S,{style:{color:"white"},children:te}),e.jsxs(v,{children:[e.jsx(u,{onClick:()=>h("all","view"),children:"All"}),e.jsx(u,{onClick:()=>h("Milan","view"),children:"Milan"}),e.jsx(u,{onClick:()=>h("Napoli","view"),children:"Napoli"})]})]}),e.jsxs(G,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(S,{style:{color:"white"},children:re}),e.jsxs(v,{children:[e.jsx(u,{onClick:()=>q("all"),children:"All"}),oe.map((s,a)=>e.jsx(u,{onClick:()=>q(s._id,s.name),children:s.name},a))]})]}),e.jsx(O,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),ee?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(K,{style:{marginTop:"15%"}})}):e.jsxs(Q,{children:[e.jsx(W,{children:e.jsxs(f,{children:[e.jsx(n,{scope:"col",children:"#"}),e.jsx(n,{scope:"col",children:"First Name"}),e.jsx(n,{scope:"col",children:"Last Name"}),e.jsx(n,{scope:"col",children:"Email"}),e.jsx(n,{scope:"col",children:"Phone"}),e.jsx(n,{scope:"col",children:"Country"}),e.jsx(n,{scope:"col",children:"Employee ID"}),e.jsx(n,{scope:"col",children:"Language"}),e.jsx(n,{scope:"col",children:"Group"}),e.jsx(n,{scope:"col",children:"Add Market Group"})]})}),e.jsx(X,{children:E.length===0?e.jsx(f,{children:e.jsx(l,{colSpan:"10",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):E.map((s,a)=>e.jsxs(f,{children:[e.jsx(l,{children:a+1}),e.jsx(l,{children:s.name}),e.jsx(l,{children:s.surname}),e.jsx(l,{children:s.email}),e.jsx(l,{children:s.contact}),e.jsx(l,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(l,{children:s.employeeId?s.employeeId:e.jsx(A,{color:"warning",children:"Not Provide"})}),e.jsx(l,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language==="es"?"Spanish":s.language}),e.jsx(l,{children:s.groups.map((o,r)=>e.jsx("div",{children:o.name},r))}),e.jsx(l,{children:s.groups.length>0?e.jsx(C,{size:"sm",onClick:()=>J(s.groups,s.id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Assign"}):e.jsx(C,{size:"sm",onClick:()=>J(s.groups,s.id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},a))})]}),e.jsxs(Me,{alignment:"center",visible:T,scrollable:!0,size:"xl",onClose:()=>x(!1),children:[e.jsx(be,{closeButton:!0,children:e.jsx(Ae,{children:"Market Group Assign"})}),e.jsxs(Ge,{children:[e.jsx(A,{style:{marginLeft:"74%"},color:"secondary",children:"Filter by"}),e.jsxs(G,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(S,{style:{color:"white"},children:ce}),e.jsxs(v,{children:[e.jsx(u,{onClick:()=>h("all","modal"),children:"All"}),e.jsx(u,{onClick:()=>h("Milano","modal"),children:"Milano"}),e.jsx(u,{onClick:()=>h("Napoli","modal"),children:"Napoli"})]})]}),e.jsx(O,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),he?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(K,{style:{marginTop:"15%"}})}):e.jsxs(Q,{children:[e.jsx(W,{children:e.jsxs(f,{children:[e.jsx(n,{scope:"col",children:"#"}),e.jsx(n,{scope:"col",children:"Name"}),e.jsx(n,{scope:"col",children:"City"}),e.jsx(n,{scope:"col",children:"Location"})]})}),e.jsx(X,{children:de.map((s,a)=>e.jsxs(f,{children:[e.jsx(l,{children:y+a+1}),e.jsx(l,{children:s.name}),e.jsx(l,{children:s.city}),e.jsx(l,{children:ne.map(o=>o.id).includes(s._id)?e.jsx(C,{size:"sm",onClick:()=>ye(R,s._id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Remove"}):e.jsx(C,{size:"sm",onClick:()=>je(R,s._id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},a))})]})]}),e.jsx(Se,{children:e.jsxs(ve,{"aria-label":"Page navigation example",children:[e.jsx(Y,{disabled:y<=0,onClick:xe,children:"Previous"}),e.jsx(Y,{disabled:pe===!0,onClick:fe,children:"Next"})]})})]})]})};export{He as default};
