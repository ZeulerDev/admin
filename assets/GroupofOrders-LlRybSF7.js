import{y as ps,r as a,A as u,j as e,i as we,L as Ae,m as Pe}from"./index-BWkgGQRa.js";import{a as x}from"./axios-Cm0UX6qg.js";import{D as gs,f as De}from"./rsuite-BpGoBmGH.js";import{B as j}from"./config-HOLfLxHr.js";import{b as xs,a as p}from"./CContainer-n_XM2trt.js";import{d as w,C as A,a as P,b as D,c as n}from"./DefaultLayout-C-k2K-WS.js";import{C as Be}from"./CNavbar-BwlLOQyI.js";import{C}from"./CFormInput-DvjVNdkB.js";import{C as Ee,a as Ge,b as B,c as l,d as ze,e as r}from"./CTable-Bb3Q9-5y.js";import{c as js}from"./cil-pencil-m516yCOw.js";import{c as fs}from"./cil-info-CmGCY32x.js";import{C as ys,a as Me}from"./CPaginationItem-B1pJDnz4.js";import{C as E,a as G,b as z,c as M}from"./CModalTitle-CZnaKMAX.js";import{C as V}from"./CModalFooter-BT_4nXdn.js";import{C as ms}from"./CRow-wG5hGiWu.js";import{C as O}from"./CFormLabel-CoAYXVYV.js";import{C as _}from"./CCol-CAExLm0H.js";import"./inheritsLoose-CkMbdMht.js";import"./index-CG5Noq7m.js";const Rs=()=>{var Ce,ke,be;const[{user:f,token:c},i]=ps(),[y,k]=a.useState([]),[ve,U]=a.useState(!1),[v,Le]=a.useState(""),[b,Q]=a.useState(0),[Y,L]=a.useState(!1),[Ie,Ne]=a.useState(""),[W,q]=a.useState(""),[I,J]=a.useState(""),[Te,Fe]=a.useState([]),[Re,He]=a.useState([]),[K,X]=a.useState(""),[Z,ee]=a.useState(""),[se,te]=a.useState(""),[ae,oe]=a.useState(""),[$e,le]=a.useState("All Cities"),[Ve,re]=a.useState("All Status"),[Oe,ne]=a.useState("All Market Groups"),[_e,ce]=a.useState("All Chains"),[Ue,Qe]=a.useState([]),[Ye,ie]=a.useState(!1),[N,T]=a.useState(!1),[m,We]=a.useState([]),[de,F]=a.useState(!1),[qe,Je]=a.useState(""),[ue,Ke]=a.useState(""),[Xe,Ze]=a.useState(""),[he,S]=a.useState(!1),[pe,ge]=a.useState([]),[es,xe]=a.useState(!0);a.useEffect(()=>{f&&c&&R(0)},[f,c,v,Z,pe]);const R=(s,t)=>{U(!0),x.get(j+"assistant/grocery/group/"+s+"?rider="+v+"&status="+Z+"&date="+pe,{headers:{Authorization:`Bearer ${c}`}}).then(o=>{console.log("data"),o.status===200?(k(o.data),console.log("dataaaaaaa"),U(!1),o.data.length<50?(xe(!0),console.log("ok")):o.data.length>49&&xe(!1)):o.status===204?i({type:u,payload:{status:!0,title:"Grocery groups loading error",message:o.data.message}}):o.status===500&&i({type:u,payload:{status:!0,title:"Grocery groups error",message:o.data.message}})}).catch(o=>{console.error("Error:",o)})},ss=()=>{console.log(b);const s=b+50;console.log(s),Q(s),R(s)},ts=()=>{const s=b-50;console.log(s),Q(s),R(s)},as=(s,t=null)=>{L(!Y),Ne(s),t!==null?q(t):console.log("Bonus number not provided")},os=()=>{const s={bonus:W};console.log(s),f&&c&&x.put(j+"assistant/grocery/group/bonus/"+Ie,s,{headers:{Authorization:`Bearer ${c}`}}).then(t=>{if(t.status===200){console.log("updated"),L(!1);const o=t.data,h=y.find(d=>d.id===o._id);h&&(h.bonus=o.bonus),k([...y])}else t.status===203?(console.log("203"),i({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===204?(console.log("204"),i({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===500&&i({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})}).catch(t=>{console.error(t)})};a.useEffect(()=>{ls(),rs()},[]);const ls=()=>{c&&x.get(j+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?Fe(s.data):s.status===500&&i({type:u,payload:{status:!0,title:"Market Group Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},rs=()=>{c&&x.get(j+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?He(s.data):s.status===500&&i({type:u,payload:{status:!0,title:"Chain Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},H=s=>{s==="all"?(X(""),le("All Cities")):(X(s),le(s))},g=s=>{s==="all"?(ee(""),re("All Status")):(ee(s),re(s))},je=(s,t)=>{s==="all"?(te(""),ne("All Market Groups")):(te(s),ne(t))},fe=(s,t)=>{s==="all"?(oe(""),ce("All Chains")):(oe(s),ce(t))};a.useEffect(()=>{ns()},[K,se,ae,alert]);const ns=()=>{f&&c&&(ie(!0),x.get(j+`assistant/shoppers/:skip?city=${K}&group=${se}&chain=${ae}`,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(Qe(s.data),ie(!1)):s.status===500&&i({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)}))},cs=(s,t,o)=>{T(!N),console.log("Grocery ID",s),We(o),J(t)},ye=(s,t,o)=>{F(!de),console.log("picker id",s),console.log("Grocery id",o),J(t),Ke(o),Je(s)},me=(s,t,o)=>{console.log("bid",s,"PID",t,o);const h={pickerId:t,status:o};console.log(h),f&&c&&x.put(j+"assistant/grocery/group/picker/"+s,h,{headers:{Authorization:`Bearer ${c}`}}).then(d=>{if(d.status===200){console.log("updated",d.data),N&&T(!1),F(!1);const $=d.data,hs=y.map(Se=>Se.id===$._id?(console.log("matched"),$):Se);console.log("update obj",$),k([...hs]),i({type:u,payload:{status:!0,title:"Picker Assign ",message:"Successfully picker assigned to the grocery group",color:"success"}})}else d.status===203?(console.log("203"),i({type:u,payload:{status:!0,title:"Picker Assign error",message:d.data.message}})):d.status===204?(console.log("204"),i({type:u,payload:{status:!0,title:"Picker Assign error",message:d.data.message}})):d.status===500&&i({type:u,payload:{status:!0,title:"Picker Assign error",message:d.data.message}})}).catch(d=>{console.error(d)})},is=s=>{S(!he),Ze(s)},ds=s=>{console.log("status",s),f&&c&&x.put(j+"assistant/grocery/group/status/"+s,{},{headers:{Authorization:`Bearer ${c}`}}).then(t=>{if(t.status===200){console.log("updated",t.data),S(!1);const o=t.data,h=y.find(d=>d.id===o._id);h&&(console.log("done",h),h.status=o.status),k([...y])}else t.status===203?(console.log("203"),i({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===204?(console.log("204"),i({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===500&&i({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},us=s=>{if(s){const t=De(s[0],"MM/dd/yyyy HH:mm"),o=De(s[1],"MM/dd/yyyy HH:mm");ge([t,o])}else ge([])};return e.jsxs(xs,{children:[e.jsx(w,{style:{marginLeft:"76%"},color:"secondary",children:"Filter by"}),e.jsxs(A,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(P,{style:{color:"white"},children:Ve}),e.jsxs(D,{children:[e.jsx(n,{onClick:()=>g("all"),children:"All Status"}),e.jsx(n,{onClick:()=>g("created"),children:"Created"}),e.jsx(n,{onClick:()=>g("ready"),children:"Ready"}),e.jsx(n,{onClick:()=>g("finalized"),children:"Finalized"}),e.jsx(n,{onClick:()=>g("freeze"),children:"Freeze"}),e.jsx(n,{onClick:()=>g("forced"),children:"Forced"}),e.jsx(n,{onClick:()=>g("open"),children:"Open"}),e.jsx(n,{onClick:()=>g("completed"),children:"Completed"}),e.jsx(n,{onClick:()=>g("waiting"),children:"Waiting"}),e.jsx(n,{onClick:()=>g("paid "),children:"Paid "})]})]}),e.jsxs(Be,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:[e.jsx(gs,{style:{marginLeft:1},format:"MM/dd/yyyy HH:mm",onChange:us}),e.jsx(C,{type:"text",placeholder:"Search By Rider No",style:{width:300,marginLeft:"5%"},value:v,onChange:s=>Le(s.target.value)})]}),ve?e.jsx(we,{}):e.jsxs(Ee,{children:[e.jsx(Ge,{children:e.jsxs(B,{children:[e.jsx(l,{scope:"col",children:"No"}),e.jsx(l,{scope:"col",children:"Rider Assign No"}),e.jsx(l,{scope:"col",children:"Rider Status"}),e.jsx(l,{scope:"col",children:"Duration"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"Date"}),e.jsx(l,{scope:"col",children:"Bonus"}),e.jsx(l,{scope:"col",children:"Amount"}),e.jsx(l,{scope:"col",children:"Hour"}),e.jsx(l,{scope:"col",children:"Rank"}),e.jsx(l,{scope:"col",children:"Start"}),e.jsx(l,{scope:"col",children:"End"}),e.jsx(l,{scope:"col",children:"Picker"}),e.jsx(l,{scope:"col",children:"Order"}),e.jsx(l,{scope:"col"})]})}),e.jsx(ze,{children:y.map((s,t)=>e.jsxs(B,{children:[e.jsx(r,{children:s.no}),e.jsx(r,{children:s.ridersAssigningNo}),e.jsx(r,{children:e.jsx(w,{style:{width:80},color:"info",children:s.ridersAssigningStatus})}),e.jsxs(r,{children:[s.duration," min"]}),e.jsx(r,{children:e.jsx(w,{style:{width:80},color:"warning",children:s.status})}),e.jsx(r,{children:s.date}),e.jsxs(r,{children:[s.bonus!=null?s.bonus.toFixed(2):0," ",e.jsx(Ae,{to:"",children:e.jsx(Pe,{icon:js,size:"sm",onClick:()=>as(s.id,s.bonus)})})," "]}),e.jsx(r,{children:s.amount}),e.jsx(r,{children:s.hour}),e.jsx(r,{children:s.rank+1}),e.jsx(r,{children:s.start}),e.jsx(r,{children:s.end}),e.jsx(r,{children:s.shopper?e.jsx(p,{onClick:()=>cs(s.id,s.status,s),size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"View"}):e.jsx(p,{onClick:()=>ye(s.accepted,s.status,s.id),size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"Add"})}),e.jsx(r,{children:s.status==="complete"?e.jsx(p,{size:"sm",disabled:!0,style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"Cancel"}):s.status==="canceled"?e.jsx(p,{size:"sm",disabled:!0,style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"Cancel"}):e.jsx(p,{onClick:()=>is(s.id),size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"Cancel"})}),e.jsx(r,{children:e.jsx(Ae,{to:`/order/grocerygroup/orders/${s.id}`,children:e.jsx(Pe,{icon:fs,size:"xl"})})})]},t))})]}),e.jsxs(ys,{"aria-label":"Page navigation example",children:[e.jsx(Me,{disabled:b<=50,onClick:ts,children:"Previous"}),e.jsx(Me,{disabled:es===!0,onClick:ss,children:"Next"})]}),e.jsxs(E,{alignment:"center",visible:Y,scrollable:!0,size:"sm",onClose:()=>L(!1),children:[e.jsx(G,{closeButton:!0,children:e.jsx(z,{children:"Confirmation"})}),e.jsxs(M,{children:[e.jsx("a",{children:"Enter Bonus Amount"}),e.jsx("br",{}),e.jsx(C,{type:"text",placeholder:"Bonus",value:W,onChange:s=>q(s.target.value)})]}),e.jsx(V,{children:e.jsx(p,{color:"primary",onClick:()=>os(),children:"Save changes"})})]}),e.jsxs(E,{alignment:"center",visible:N,scrollable:!0,size:"lg",onClose:()=>T(!1),children:[e.jsx(G,{closeButton:!0,children:e.jsx(z,{children:"Picker Information"})}),e.jsx(M,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:e.jsx("div",{children:e.jsxs(ms,{className:"mb-3",children:[e.jsx(O,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(_,{sm:10,children:e.jsx(C,{type:"text",defaultValue:(Ce=m.shopper)==null?void 0:Ce.name,readOnly:!0,plainText:!0})}),e.jsx(O,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(_,{sm:10,children:e.jsx(C,{type:"text",defaultValue:(ke=m.shopper)==null?void 0:ke.email,readOnly:!0,plainText:!0})}),e.jsx(O,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(_,{sm:10,children:e.jsx(C,{type:"text",defaultValue:(be=m.shopper)==null?void 0:be.contact,readOnly:!0,plainText:!0})})]})})}),e.jsx(V,{children:e.jsx(p,{color:"warning",onClick:()=>{var s;return ye((s=m.shopper)==null?void 0:s.id,I,m.id)},children:"Change"})})]}),e.jsxs(E,{alignment:"center",visible:de,scrollable:!0,size:"xl",onClose:()=>F(!1),children:[e.jsx(G,{closeButton:!0,children:e.jsx(z,{children:"Picker Assing to the Grocery Batch"})}),e.jsxs(M,{children:[e.jsx(w,{style:{marginLeft:"37%"},color:"secondary",children:"Filter by"}),e.jsxs(A,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(P,{style:{color:"white"},children:$e}),e.jsxs(D,{children:[e.jsx(n,{onClick:()=>H("all"),children:"All"}),e.jsx(n,{onClick:()=>H("Milan"),children:"Milan"}),e.jsx(n,{onClick:()=>H("Napoli"),children:"Napoli"})]})]}),e.jsxs(A,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(P,{style:{color:"white"},children:_e}),e.jsxs(D,{children:[e.jsx(n,{onClick:()=>fe("all"),children:"All"}),Re.map((s,t)=>e.jsx(n,{onClick:()=>fe(s.id,s.name),children:s.name},t))]})]}),e.jsxs(A,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(P,{style:{color:"white"},children:Oe}),e.jsxs(D,{children:[e.jsx(n,{onClick:()=>je("all"),children:"All"}),Te.map((s,t)=>e.jsx(n,{onClick:()=>je(s._id,s.name),children:s.name},t))]})]}),e.jsx(Be,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),Ye?e.jsx(we,{}):e.jsxs(Ee,{children:[e.jsx(Ge,{children:e.jsxs(B,{children:[e.jsx(l,{scope:"col",children:"First Name"}),e.jsx(l,{scope:"col",children:"Last Name"}),e.jsx(l,{scope:"col",children:"Email"}),e.jsx(l,{scope:"col",children:"Phone"}),e.jsx(l,{scope:"col",children:"Country"}),e.jsx(l,{scope:"col",children:"City"}),e.jsx(l,{scope:"col",children:"Language"}),e.jsx(l,{scope:"col",children:"Market"}),e.jsx(l,{scope:"col",children:"Action"})]})}),e.jsx(ze,{children:Ue.map((s,t)=>{var o,h;return e.jsxs(B,{children:[e.jsx(r,{children:s.name}),e.jsx(r,{children:s.surname}),e.jsx(r,{children:s.email}),e.jsx(r,{children:s.contact}),e.jsx(r,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(r,{children:s.city}),e.jsx(r,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language==="es"?"Spanish":s.language}),e.jsxs(r,{children:[(h=(o=s.market)==null?void 0:o.chain)==null?void 0:h.name," - ",s.market.address]}),e.jsx(r,{children:s.id===qe?e.jsx(p,{size:"sm",onClick:()=>me(ue,s.id,I),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Assigned"}):e.jsx(p,{size:"sm",onClick:()=>me(ue,s.id,I),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},t)})})]})]}),e.jsx(V,{})]}),e.jsxs(E,{alignment:"center",visible:he,scrollable:!0,size:"sm",onClose:()=>S(!1),children:[e.jsx(G,{closeButton:!0,children:e.jsx(z,{children:"Confirmation"})}),e.jsxs(M,{children:[e.jsx("a",{children:"Are you sure you want to cancel this grocery group order?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(p,{onClick:()=>ds(Xe),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(p,{onClick:()=>S(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{Rs as default};
