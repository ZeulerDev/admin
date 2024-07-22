import{r as t,y as $e,A as d,j as a,h as ae}from"./index-Cmo8jOUG.js";import{a as g}from"./axios-Cm0UX6qg.js";import{B as x}from"./config-HOLfLxHr.js";import{b as ze,a as S}from"./CContainer-D7fLRyZt.js";import{d as se,C as j,a as k,b as y,c as h}from"./DefaultLayout-CcL3hFND.js";import{C as te}from"./CNavbar-15em09iB.js";import{C as le,a as re,b,c as o,d as oe,e as i}from"./CTable-CC7vKO1g.js";import{C as Ge,a as Ne,b as Re,c as _e}from"./CModalTitle-C6NN_sbf.js";import{C as Fe}from"./CModalFooter-tE8B90GT.js";import{C as He,a as ie}from"./CPaginationItem-CjQjA-61.js";const Ye=()=>{const[B,M]=t.useState(!1),[{user:m,token:n},c]=$e(),[D,P]=t.useState([]),[ne,T]=t.useState(!1),[ce,$]=t.useState(!1),[z,G]=t.useState(""),[N,R]=t.useState(""),[_,F]=t.useState("");t.useState(!1),t.useState("");const[de,he]=t.useState(!1),[ue,H]=t.useState("All Cities"),[pe,I]=t.useState("All Market Groups"),[fe,U]=t.useState("All Chains"),[ge,xe]=t.useState([]),[me,Ce]=t.useState([]),[je,V]=t.useState("All Cities"),[ke,q]=t.useState("All Chains"),[ye,Me]=t.useState([]),[J,K]=t.useState(""),[O,Q]=t.useState(""),[we,Ae]=t.useState([]),[w,W]=t.useState(0),[X,E]=t.useState(""),[Se,v]=t.useState(""),[be,Y]=t.useState(!0);t.useEffect(()=>{De(),Pe()},[]);const De=()=>{n&&g.get(x+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${n}`}}).then(e=>{e.status===200?xe(e.data):e.status===500&&c({type:d,payload:{status:!0,title:"Market Group Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},Pe=()=>{n&&g.get(x+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${n}`}}).then(e=>{e.status===200?(Ce(e.data),Me(e.data)):e.status===500&&c({type:d,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})};t.useEffect(()=>{Ee()},[z,N,_,de]);const Ee=()=>{m&&n&&(T(!0),g.get(x+`assistant/shoppers/:skip?city=${z}&group=${N}&chain=${_}`,{headers:{Authorization:`Bearer ${n}`}}).then(e=>{e.status===200?(P(e.data),T(!1),he(!1)):e.status===500&&c({type:d,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}})}).catch(e=>{console.error("Error:",e)}))},f=(e,s)=>{s==="view"?e==="all"?(G(""),H("All Cities")):(G(e),H(e)):s==="modal"&&(e==="all"?(K(""),V("All Cities")):(K(e),V(e)))},Z=(e,s)=>{e==="all"?(R(""),I("All Market Groups")):(R(e),I(s))},A=(e,s,r)=>{r==="view"?e==="all"?(F(""),U("All Chains")):(F(e),U(s)):r==="modal"&&(e==="all"?(Q(""),q("All Chains")):(Q(e),q(s)))},ee=(e,s)=>{M(!B),console.log(e,s),E(e),v(s)};t.useEffect(()=>{m&&n&&L(0)},[O,J,m]);const L=(e,s)=>{$(!0),g.get(x+`assistant/market/locations/${e}?brand=${O}&city=${J}`,{headers:{Authorization:`Bearer ${n}`}}).then(r=>{r.status===200?(Ae(r.data.data),console.log("data market"),$(!1),r.data.data.length<20?(Y(!0),console.log("ok")):r.data.data.length>19&&Y(!1)):r.status===500&&c({type:d,payload:{status:!0,title:"Market Loading error",message:r.data.message}})}).catch(r=>{console.error("Error: ",r)})},ve=()=>{const e=w+20;W(e),L(e)},Le=()=>{const e=w-20;console.log(e),W(e),L(e)},Be=(e,s)=>{if(s&&e){const r={market:s,shopper:e};n&&m&&n&&g.post(x+"assistant/picker/assign/market",r,{headers:{Authorization:`Bearer ${n}`}}).then(l=>{if(l.status===200){M(!1),E(""),v("");const p=l.data,u=D.map(C=>C.id===p.id?p:C);P([...u]),c({type:d,payload:{status:!0,title:"Market Assign",message:"successfully Market assigned to the picker ",color:"success"}})}else l.status===204?c({type:d,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}}):l.status===500&&c({type:d,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else c({type:d,payload:{status:!0,title:"Error!",message:"Picker Registration error, Please Check the input fields",color:"warning"}})},Te=(e,s)=>{if(s&&e){const r={market:s,shopper:e};n&&m&&n&&g.post(x+"assistant/picker/remove/market",r,{headers:{Authorization:`Bearer ${n}`}}).then(l=>{if(l.status===200){M(!1),E(""),v("");const p=l.data,u=D.map(C=>C.id===p.id?p:C);P([...u]),c({type:d,payload:{status:!0,title:"Market Assign",message:"successfully Market removed from the picker ",color:"success"}})}else l.status===204?c({type:d,payload:{status:!0,title:"Market remove error",message:l.data.message,color:"warning"}}):l.status===500&&c({type:d,payload:{status:!0,title:"Market remove error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else c({type:d,payload:{status:!0,title:"Error!",message:"Picker Registration error, Please Check the input fields",color:"warning"}})};return a.jsxs(ze,{children:[a.jsx(se,{style:{marginLeft:"34%"},color:"secondary",children:"Filter by"}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:ue}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>f("all","view"),children:"All"}),a.jsx(h,{onClick:()=>f("Milan","view"),children:"Milan"}),a.jsx(h,{onClick:()=>f("Napoli","view"),children:"Napoli"})]})]}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:fe}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>A("all",null,"view"),children:"All"}),me.map((e,s)=>a.jsx(h,{onClick:()=>A(e.id,e.name,"view"),children:e.name},s))]})]}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:pe}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>Z("all"),children:"All"}),ge.map((e,s)=>a.jsx(h,{onClick:()=>Z(e._id,e.name),children:e.name},s))]})]}),a.jsx(te,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),ne?a.jsx(ae,{}):a.jsxs(le,{children:[a.jsx(re,{children:a.jsxs(b,{children:[a.jsx(o,{scope:"col",children:"#"}),a.jsx(o,{scope:"col",children:"First Name"}),a.jsx(o,{scope:"col",children:"Last Name"}),a.jsx(o,{scope:"col",children:"Email"}),a.jsx(o,{scope:"col",children:"Phone"}),a.jsx(o,{scope:"col",children:"Country"}),a.jsx(o,{scope:"col",children:"City"}),a.jsx(o,{scope:"col",children:"Language"}),a.jsx(o,{scope:"col",children:"Market"}),a.jsx(o,{scope:"col",children:"Add Market"})]})}),a.jsx(oe,{children:D.map((e,s)=>{var r,l,p;return a.jsxs(b,{children:[a.jsx(i,{children:s+1}),a.jsx(i,{children:e.name}),a.jsx(i,{children:e.surname}),a.jsx(i,{children:e.email}),a.jsx(i,{children:e.contact}),a.jsx(i,{children:e.country==="it"||e.country==="Italy"?"Italy":e.country}),a.jsx(i,{children:e.city}),a.jsx(i,{children:e.language==="en"?"English":e.language==="it"?"Italy":e.language==="es"?"Spanish":e.language}),a.jsxs(i,{children:[(l=(r=e.market)==null?void 0:r.chain)==null?void 0:l.name," - ",e.market.address]}),a.jsx(i,{children:(p=e.market)!=null&&p.id?a.jsx(S,{size:"sm",onClick:()=>{var u;return ee(e.id,(u=e.market)==null?void 0:u.id)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Assign"}):a.jsx(S,{size:"sm",onClick:()=>{var u;return ee(e.id,(u=e.market)==null?void 0:u.id)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},s)})})]}),a.jsxs(Ge,{visible:B,scrollable:!0,size:"xl",onClose:()=>M(!1),children:[a.jsx(Ne,{closeButton:!0,children:a.jsx(Re,{children:"Market assign view"})}),a.jsxs(_e,{children:[a.jsx(se,{style:{marginLeft:"54%"},color:"secondary",children:"Filter by"}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:je}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>f("all","modal"),children:"All"}),a.jsx(h,{onClick:()=>f("Milano","modal"),children:"Milano"}),a.jsx(h,{onClick:()=>f("Napoli","modal"),children:"Napoli"})]})]}),a.jsxs(j,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[a.jsx(k,{style:{color:"white"},children:ke}),a.jsxs(y,{children:[a.jsx(h,{onClick:()=>A("all",null,"modal"),children:"All"}),ye.map((e,s)=>a.jsx(h,{onClick:()=>A(e.id,e.name,"modal"),children:e.name},s))]})]}),a.jsx(te,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),ce?a.jsx(ae,{}):a.jsxs(le,{children:[a.jsx(re,{children:a.jsxs(b,{children:[a.jsx(o,{scope:"col",children:"#"}),a.jsx(o,{scope:"col",children:"Name"}),a.jsx(o,{scope:"col",children:"Address"}),a.jsx(o,{scope:"col",children:"City"}),a.jsx(o,{scope:"col",children:"Measurement"}),a.jsx(o,{scope:"col"})]})}),a.jsx(oe,{children:we.map((e,s)=>a.jsxs(b,{children:[a.jsx(i,{children:w+s+1}),a.jsx(i,{children:e.chain.name}),a.jsx(i,{children:e.address}),a.jsx(i,{children:e.city}),a.jsx(i,{children:e.scraped}),a.jsx(i,{children:Se===e._id?a.jsx(S,{size:"sm",onClick:()=>Te(X,e._id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Remove"}):a.jsx(S,{size:"sm",onClick:()=>Be(X,e._id),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},s))})]}),a.jsx(Fe,{children:a.jsxs(He,{"aria-label":"Page navigation example",children:[a.jsx(ie,{disabled:w<=0,onClick:Le,children:"Previous"}),a.jsx(ie,{disabled:be===!0,onClick:ve,children:"Next"})]})})]})]})]})};export{Ye as default};