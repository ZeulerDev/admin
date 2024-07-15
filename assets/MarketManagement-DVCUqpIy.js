import{r as t,y as Ee,A as d,j as a,i as Y}from"./index-BWkgGQRa.js";import{a as g}from"./axios-Cm0UX6qg.js";import{B as C}from"./config-HOLfLxHr.js";import{b as Pe,a as A}from"./CContainer-n_XM2trt.js";import{d as Z,C as j,a as k,b as y,c as h}from"./DefaultLayout-C-k2K-WS.js";import{C as ee}from"./CNavbar-BwlLOQyI.js";import{C as ae,a as se,b as S,c as i,d as te,e as n}from"./CTable-Bb3Q9-5y.js";import{C as ve,a as Le,b as Be,c as Te}from"./CModalTitle-CZnaKMAX.js";import{C as $e}from"./CModalFooter-BT_4nXdn.js";const qe=()=>{const[L,M]=t.useState(!1),[{user:x,token:o},c]=Ee(),[b,D]=t.useState([]),[le,B]=t.useState(!1),[re,T]=t.useState(!1),[$,z]=t.useState(""),[G,N]=t.useState(""),[R,_]=t.useState("");t.useState(!1),t.useState("");const[oe,ie]=t.useState(!1),[ne,F]=t.useState("All Cities"),[ce,H]=t.useState("All Market Groups"),[de,I]=t.useState("All Chains"),[he,ue]=t.useState([]),[pe,fe]=t.useState([]),[ge,U]=t.useState("All Cities"),[Ce,V]=t.useState("All Chains"),[xe,me]=t.useState([]),[q,J]=t.useState(""),[K,O]=t.useState(""),[je,ke]=t.useState([]),[ze,E]=t.useState(0),[Q,P]=t.useState(""),[ye,v]=t.useState("");t.useEffect(()=>{Me(),we()},[]);const Me=()=>{o&&g.get(C+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${o}`}}).then(e=>{e.status===200?ue(e.data):e.status===500&&c({type:d,payload:{status:!0,title:"Market Group Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},we=()=>{o&&g.get(C+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${o}`}}).then(e=>{e.status===200?(fe(e.data),me(e.data)):e.status===500&&c({type:d,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})};t.useEffect(()=>{Ae()},[$,G,R,oe]);const Ae=()=>{x&&o&&(B(!0),g.get(C+`assistant/shoppers/:skip?city=${$}&group=${G}&chain=${R}`,{headers:{Authorization:`Bearer ${o}`}}).then(e=>{e.status===200?(D(e.data),B(!1),ie(!1)):e.status===500&&c({type:d,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}})}).catch(e=>{console.error("Error:",e)}))},f=(e,s)=>{s==="view"?e==="all"?(z(""),F("All Cities")):(z(e),F(e)):s==="modal"&&(e==="all"?(J(""),U("All Cities")):(J(e),U(e)))},W=(e,s)=>{e==="all"?(N(""),H("All Market Groups")):(N(e),H(s))},w=(e,s,r)=>{r==="view"?e==="all"?(_(""),I("All Chains")):(_(e),I(s)):r==="modal"&&(e==="all"?(O(""),V("All Chains")):(O(e),V(s)))},X=(e,s)=>{M(!L),console.log(e,s),P(e),v(s)};t.useEffect(()=>{x&&o&&Se(0,!0)},[K,q,x]);const Se=(e,s)=>{T(!0),g.get(C+`assistant/market/locations/${e}?brand=${K}&city=${q}`,{headers:{Authorization:`Bearer ${o}`}}).then(r=>{if(r.status===200)if(ke(r.data.data),T(!1),s){const l=e+r.data.data.length;E(l)}else{const l=e-r.data.data.length;e<0?E(0):E(l)}else r.status===500&&c({type:d,payload:{status:!0,title:"Market Loading error",message:r.data.message}})}).catch(r=>{console.error("Error: ",r)})},be=(e,s)=>{if(s&&e){const r={market:s,shopper:e};o&&x&&o&&g.post(C+"assistant/picker/assign/market",r,{headers:{Authorization:`Bearer ${o}`}}).then(l=>{if(l.status===200){M(!1),P(""),v("");const p=l.data,u=b.map(m=>m.id===p.id?p:m);D([...u]),c({type:d,payload:{status:!0,title:"Market Assign",message:"successfully Market assigned to the picker ",color:"success"}})}else l.status===204?c({type:d,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}}):l.status===500&&c({type:d,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else c({type:d,payload:{status:!0,title:"Error!",message:"Picker Registration error, Please Check the input fields",color:"warning"}})},De=(e,s)=>{if(s&&e){const r={market:s,shopper:e};o&&x&&o&&g.post(C+"assistant/picker/remove/market",r,{headers:{Authorization:`Bearer ${o}`}}).then(l=>{if(l.status===200){M(!1),P(""),v("");const p=l.data,u=b.map(m=>m.id===p.id?p:m);D([...u]),c({type:d,payload:{status:!0,title:"Market Assign",message:"successfully Market removed from the picker ",color:"success"}})}else l.status===204?c({type:d,payload:{status:!0,title:"Market remove error",message:l.data.message,color:"warning"}}):l.status===500&&c({type:d,payload:{status:!0,title:"Market remove error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else c({type:d,payload:{status:!0,title:"Error!",message:"Picker Registration error, Please Check the input fields",color:"warning"}})};return a.jsxs(Pe,{children:[a.jsx(Z,{style:{marginLeft:"34%"},color:"secondary",children:"Filter by"}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:ne}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>f("all","view"),children:"All"}),a.jsx(h,{onClick:()=>f("Milan","view"),children:"Milan"}),a.jsx(h,{onClick:()=>f("Napoli","view"),children:"Napoli"})]})]}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:de}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>w("all",null,"view"),children:"All"}),pe.map((e,s)=>a.jsx(h,{onClick:()=>w(e.id,e.name,"view"),children:e.name},s))]})]}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:ce}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>W("all"),children:"All"}),he.map((e,s)=>a.jsx(h,{onClick:()=>W(e._id,e.name),children:e.name},s))]})]}),a.jsx(ee,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),le?a.jsx(Y,{}):a.jsxs(ae,{children:[a.jsx(se,{children:a.jsxs(S,{children:[a.jsx(i,{scope:"col",children:"First Name"}),a.jsx(i,{scope:"col",children:"Last Name"}),a.jsx(i,{scope:"col",children:"Email"}),a.jsx(i,{scope:"col",children:"Phone"}),a.jsx(i,{scope:"col",children:"Country"}),a.jsx(i,{scope:"col",children:"City"}),a.jsx(i,{scope:"col",children:"Language"}),a.jsx(i,{scope:"col",children:"Market"}),a.jsx(i,{scope:"col",children:"Add Market"})]})}),a.jsx(te,{children:b.map((e,s)=>{var r,l,p;return a.jsxs(S,{children:[a.jsx(n,{children:e.name}),a.jsx(n,{children:e.surname}),a.jsx(n,{children:e.email}),a.jsx(n,{children:e.contact}),a.jsx(n,{children:e.country==="it"||e.country==="Italy"?"Italy":e.country}),a.jsx(n,{children:e.city}),a.jsx(n,{children:e.language==="en"?"English":e.language==="it"?"Italy":e.language==="es"?"Spanish":e.language}),a.jsxs(n,{children:[(l=(r=e.market)==null?void 0:r.chain)==null?void 0:l.name," - ",e.market.address]}),a.jsx(n,{children:(p=e.market)!=null&&p.id?a.jsx(A,{size:"sm",onClick:()=>{var u;return X(e.id,(u=e.market)==null?void 0:u.id)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Assign"}):a.jsx(A,{size:"sm",onClick:()=>{var u;return X(e.id,(u=e.market)==null?void 0:u.id)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},s)})})]}),a.jsxs(ve,{visible:L,scrollable:!0,size:"xl",onClose:()=>M(!1),children:[a.jsx(Le,{closeButton:!0,children:a.jsx(Be,{children:"Market assign view"})}),a.jsxs(Te,{children:[a.jsx(Z,{style:{marginLeft:"54%"},color:"secondary",children:"Filter by"}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:ge}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>f("all","modal"),children:"All"}),a.jsx(h,{onClick:()=>f("Milano","modal"),children:"Milano"}),a.jsx(h,{onClick:()=>f("Napoli","modal"),children:"Napoli"})]})]}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:Ce}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>w("all",null,"modal"),children:"All"}),xe.map((e,s)=>a.jsx(h,{onClick:()=>w(e.id,e.name,"modal"),children:e.name},s))]})]}),a.jsx(ee,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),re?a.jsx(Y,{}):a.jsxs(ae,{children:[a.jsx(se,{children:a.jsxs(S,{children:[a.jsx(i,{scope:"col",children:"Name"}),a.jsx(i,{scope:"col",children:"Address"}),a.jsx(i,{scope:"col",children:"City"}),a.jsx(i,{scope:"col",children:"Measurement"}),a.jsx(i,{scope:"col"})]})}),a.jsx(te,{children:je.map((e,s)=>a.jsxs(S,{children:[a.jsx(n,{children:e.chain.name}),a.jsx(n,{children:e.address}),a.jsx(n,{children:e.city}),a.jsx(n,{children:e.scraped}),a.jsx(n,{children:ye===e._id?a.jsx(A,{size:"sm",onClick:()=>De(Q,e._id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Remove"}):a.jsx(A,{size:"sm",onClick:()=>be(Q,e._id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},s))})]}),a.jsx($e,{})]})]})]})};export{qe as default};
