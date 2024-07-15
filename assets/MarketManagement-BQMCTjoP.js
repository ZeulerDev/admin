import{r as t,x as Ee,z as h,j as a,i as Z}from"./index-B2mJY6nk.js";import{a as x}from"./axios-B4uVmeYG.js";import{b as ve,a as S}from"./CContainer-HxaQKhHw.js";import{C as ze}from"./CNavbar-C6aw6t1r.js";import{C as j,a as m,b as k,c}from"./DefaultLayout-CXJ534N4.js";import{C as ee,a as ae,b as A,c as i,d as se,e as n}from"./CTable-D7t5m_Bv.js";import{C as $e,a as Ge,b as Le,c as Te}from"./CModalTitle-CJnjKzOP.js";import{C as Be}from"./CModalFooter-DI0RJn1I.js";import{C as Ne,a as te}from"./CPaginationItem-DTZe_mIK.js";const Oe=()=>{const[$,y]=t.useState(!1),[{user:f,token:o},d]=Ee(),[w,b]=t.useState([]),[le,G]=t.useState(!1),[re,L]=t.useState(!1),[T,B]=t.useState(""),[N,R]=t.useState(""),[_,H]=t.useState("");t.useState(!1),t.useState("");const[oe,ie]=t.useState(!1),[ne,F]=t.useState("All Cities"),[ce,I]=t.useState("All Market Groups"),[de,V]=t.useState("All Chains"),[he,ue]=t.useState([]),[pe,Ce]=t.useState([]),[xe,q]=t.useState("All Cities"),[fe,J]=t.useState("All Chains"),[ge,je]=t.useState([]),[K,O]=t.useState(""),[Q,U]=t.useState(""),[me,ke]=t.useState([]),[D,P]=t.useState(0),[W,E]=t.useState(""),[ye,v]=t.useState("");t.useEffect(()=>{Me(),Se()},[]);const Me=()=>{o&&x.get("http://localhost:8003/market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${o}`}}).then(e=>{e.status===200?ue(e.data):e.status===500&&d({type:h,payload:{status:!0,title:"Market Group Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},Se=()=>{o&&x.get("http://localhost:8003/assistant/market/chains/all",{headers:{Authorization:`Bearer ${o}`}}).then(e=>{e.status===200?(Ce(e.data),je(e.data)):e.status===500&&d({type:h,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})};t.useEffect(()=>{Ae()},[T,N,_,oe]);const Ae=()=>{f&&o&&(G(!0),x.get(`http://localhost:8003/assistant/shoppers/:skip?city=${T}&group=${N}&chain=${_}`,{headers:{Authorization:`Bearer ${o}`}}).then(e=>{e.status===200?(b(e.data),G(!1),ie(!1)):e.status===500&&d({type:h,payload:{status:!0,title:"Error",message:e.data.message,color:"warning"}})}).catch(e=>{console.error("Error:",e)}))},C=(e,s)=>{s==="view"?e==="all"?(B(""),F("All Cities")):(B(e),F(e)):s==="modal"&&(e==="all"?(O(""),q("All Cities")):(O(e),q(e)))},X=(e,s)=>{e==="all"?(R(""),I("All Market Groups")):(R(e),I(s))},M=(e,s,r)=>{r==="view"?e==="all"?(H(""),V("All Chains")):(H(e),V(s)):r==="modal"&&(e==="all"?(U(""),J("All Chains")):(U(e),J(s)))},Y=(e,s)=>{y(!$),console.log(e,s),E(e),v(s)};t.useEffect(()=>{f&&o&&z(0,!0)},[Q,K,f]);const z=(e,s)=>{L(!0),x.get(`http://localhost:8003/assistant/market/locations/${e}?brand=${Q}&city=${K}`,{headers:{Authorization:`Bearer ${o}`}}).then(r=>{if(r.status===200)if(ke(r.data.data),L(!1),s){const l=e+r.data.data.length;P(l)}else{const l=e-r.data.data.length;e<0?P(0):P(l)}else r.status===500&&d({type:h,payload:{status:!0,title:"Market Loading error",message:r.data.message}})}).catch(r=>{console.error("Error: ",r)})},we=()=>{z(D,!0)},be=()=>{z(D,!1)},De=(e,s)=>{if(s&&e){const r={market:s,shopper:e};o&&f&&o&&x.post("http://localhost:8003/assistant/picker/assign/market",r,{headers:{Authorization:`Bearer ${o}`}}).then(l=>{if(l.status===200){y(!1),E(""),v("");const p=l.data,u=w.map(g=>g.id===p.id?p:g);b([...u])}else l.status===204?d({type:h,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}}):l.status===500&&d({type:h,payload:{status:!0,title:"Market Assign error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else d({type:h,payload:{status:!0,title:"Error!",message:"Picker Registration error, Please Check the input fields",color:"warning"}})},Pe=(e,s)=>{if(s&&e){const r={market:s,shopper:e};o&&f&&o&&x.post("http://localhost:8003/assistant/picker/remove/market",r,{headers:{Authorization:`Bearer ${o}`}}).then(l=>{if(l.status===200){y(!1),E(""),v("");const p=l.data,u=w.map(g=>g.id===p.id?p:g);b([...u])}else l.status===204?d({type:h,payload:{status:!0,title:"Market remove error",message:l.data.message,color:"warning"}}):l.status===500&&d({type:h,payload:{status:!0,title:"Market remove error",message:l.data.message,color:"warning"}})}).catch(l=>{console.error("Error:",l)})}else d({type:h,payload:{status:!0,title:"Error!",message:"Picker Registration error, Please Check the input fields",color:"warning"}})};return a.jsxs(ve,{children:[a.jsxs(ze,{className:"bg-body-tertiary",children:[a.jsxs(j,{style:{marginLeft:"43%",width:"10%",backgroundColor:"#ff4d4d"},children:[a.jsx(m,{children:ne}),a.jsxs(k,{children:[a.jsx(c,{onClick:()=>C("all","view"),children:"All"}),a.jsx(c,{onClick:()=>C("Milan","view"),children:"Milan"}),a.jsx(c,{onClick:()=>C("Napoli","view"),children:"Napoli"})]})]}),a.jsxs(j,{style:{marginRight:"0%",width:"15%",backgroundColor:"#ff4d4d"},children:[a.jsx(m,{children:de}),a.jsxs(k,{children:[a.jsx(c,{onClick:()=>M("all",null,"view"),children:"All"}),pe.map((e,s)=>a.jsx(c,{onClick:()=>M(e.id,e.name,"view"),children:e.name},s))]})]}),a.jsxs(j,{style:{marginRight:"1%",width:"30%",backgroundColor:"#ff4d4d"},children:[a.jsx(m,{children:ce}),a.jsxs(k,{children:[a.jsx(c,{onClick:()=>X("all"),children:"All"}),he.map((e,s)=>a.jsx(c,{onClick:()=>X(e._id,e.name),children:e.name},s))]})]})]}),le?a.jsx(Z,{}):a.jsxs(ee,{children:[a.jsx(ae,{children:a.jsxs(A,{children:[a.jsx(i,{scope:"col",children:"First Name"}),a.jsx(i,{scope:"col",children:"Last Name"}),a.jsx(i,{scope:"col",children:"Email"}),a.jsx(i,{scope:"col",children:"Phone"}),a.jsx(i,{scope:"col",children:"Country"}),a.jsx(i,{scope:"col",children:"City"}),a.jsx(i,{scope:"col",children:"Language"}),a.jsx(i,{scope:"col",children:"Market"}),a.jsx(i,{scope:"col",children:"Status"})]})}),a.jsx(se,{children:w.map((e,s)=>{var r,l,p;return a.jsxs(A,{children:[a.jsx(n,{children:e.name}),a.jsx(n,{children:e.surname}),a.jsx(n,{children:e.email}),a.jsx(n,{children:e.contact}),a.jsx(n,{children:e.country==="it"||e.country==="Italy"?"Italy":e.country}),a.jsx(n,{children:e.city}),a.jsx(n,{children:e.language==="en"?"English":e.language==="it"?"Italy":e.language==="es"?"Spanish":e.language}),a.jsxs(n,{children:[(l=(r=e.market)==null?void 0:r.chain)==null?void 0:l.name," - ",e.market.address]}),a.jsx(n,{children:(p=e.market)!=null&&p.id?a.jsx(S,{size:"sm",onClick:()=>{var u;return Y(e.id,(u=e.market)==null?void 0:u.id)},style:{backgroundColor:"#ff4d4d",width:90},children:"Assign"}):a.jsx(S,{size:"sm",onClick:()=>{var u;return Y(e.id,(u=e.market)==null?void 0:u.id)},style:{backgroundColor:"#ff4d4d",width:90},children:"Add"})})]},s)})})]}),a.jsxs($e,{visible:$,scrollable:!0,size:"xl",onClose:()=>y(!1),children:[a.jsxs(Ge,{closeButton:!0,children:[a.jsx(Le,{children:"Market"}),a.jsxs(j,{style:{marginLeft:0,width:"10%",backgroundColor:"#ff4d4d"},children:[a.jsx(m,{children:xe}),a.jsxs(k,{children:[a.jsx(c,{onClick:()=>C("all","modal"),children:"All"}),a.jsx(c,{onClick:()=>C("Milano","modal"),children:"Milano"}),a.jsx(c,{onClick:()=>C("Napoli","modal"),children:"Napoli"})]})]}),a.jsxs(j,{style:{marginLeft:"20%",width:"15%",backgroundColor:"#ff4d4d"},children:[a.jsx(m,{children:fe}),a.jsxs(k,{children:[a.jsx(c,{onClick:()=>M("all",null,"modal"),children:"All"}),ge.map((e,s)=>a.jsx(c,{onClick:()=>M(e.id,e.name,"modal"),children:e.name},s))]})]})]}),a.jsxs(Te,{children:[re?a.jsx(Z,{}):a.jsxs(ee,{children:[a.jsx(ae,{children:a.jsxs(A,{children:[a.jsx(i,{scope:"col",children:"Name"}),a.jsx(i,{scope:"col",children:"Address"}),a.jsx(i,{scope:"col",children:"City"}),a.jsx(i,{scope:"col",children:"Measurement"}),a.jsx(i,{scope:"col"})]})}),a.jsx(se,{children:me.map((e,s)=>a.jsxs(A,{children:[a.jsx(n,{children:e.chain.name}),a.jsx(n,{children:e.address}),a.jsx(n,{children:e.city}),a.jsx(n,{children:e.scraped}),a.jsx(n,{children:ye===e._id?a.jsx(S,{size:"sm",onClick:()=>Pe(W,e._id),style:{backgroundColor:"#ff4d4d",width:90},children:"Remove"}):a.jsx(S,{size:"sm",onClick:()=>De(W,e._id),style:{backgroundColor:"#ff4d4d",width:90},children:"Add"})})]},s))})]}),a.jsx(Be,{children:a.jsxs(Ne,{"aria-label":"Page navigation example",children:[a.jsx(te,{disabled:D<=20,onClick:be,children:"Previous"}),a.jsx(te,{onClick:we,children:"Next"})]})})]})]})]})};export{Oe as default};
