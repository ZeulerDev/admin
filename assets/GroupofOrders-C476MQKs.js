import{y as ps,r as a,A as u,j as e,i as Se,L as Ae,m as Pe}from"./index-DQh7p-hj.js";import{a as g}from"./axios-Cm0UX6qg.js";import{D as xs,f as De}from"./rsuite-C_Qy0KTs.js";import{B as j}from"./config-HOLfLxHr.js";import{b as gs,a as h}from"./CContainer-B5cqIgKm.js";import{C as Be}from"./CNavbar-jCLBApQx.js";import{C as js}from"./CForm-lcBKMVcs.js";import{C as y}from"./CFormInput-BjvUaJOc.js";import{C as D,a as B,b as w,c as n,e as we}from"./DefaultLayout-Bl41Qa4g.js";import{C as Ee,a as ze,b as E,c as l,d as Ge,e as r}from"./CTable-YwKxy4aR.js";import{c as ms}from"./cil-pencil-m516yCOw.js";import{c as fs}from"./cil-info-CmGCY32x.js";import{C as Cs,a as Me}from"./CPaginationItem-_p4F5BTz.js";import{C as z,a as G,b as M,c as v}from"./CModalTitle-Dpe3PnII.js";import{C as $}from"./CModalFooter-3mr4-Hew.js";import{C as ys}from"./CRow-hU8pYvHw.js";import{C as V}from"./CFormLabel-D8Vl5PCz.js";import{C as O}from"./CCol-CpYg2sgv.js";import"./inheritsLoose-CkMbdMht.js";import"./index-Dw2AbCjZ.js";const $s=()=>{var Ce,ye,ke;const[{user:m,token:c},d]=ps(),[f,k]=a.useState([]),[ve,_]=a.useState(!1),[I,Ie]=a.useState(""),[b,U]=a.useState(0),[Q,S]=a.useState(!1),[Ne,Te]=a.useState(""),[Y,W]=a.useState(""),[N,q]=a.useState(""),[Le,Re]=a.useState([]),[Fe,He]=a.useState([]),[J,K]=a.useState(""),[X,Z]=a.useState(""),[ee,se]=a.useState(""),[te,ae]=a.useState(""),[$e,oe]=a.useState("All Cities"),[Ve,le]=a.useState("All Status"),[Oe,re]=a.useState("All Market Groups"),[_e,ne]=a.useState("All Chains"),[Ue,Qe]=a.useState([]),[Ye,ce]=a.useState(!1),[T,A]=a.useState(!1),[C,We]=a.useState([]),[ie,P]=a.useState(!1),[qe,Je]=a.useState(""),[de,Ke]=a.useState(""),[Xe,Ze]=a.useState(""),[ue,L]=a.useState(!1),[he,pe]=a.useState([]),[es,xe]=a.useState(!0);a.useEffect(()=>{m&&c&&R(0)},[m,c,I,X,he]);const R=(s,t)=>{_(!0),g.get(j+"assistant/grocery/group/"+s+"?rider="+I+"&status="+X+"&date="+he,{headers:{Authorization:`Bearer ${c}`}}).then(o=>{console.log("data"),o.status===200?(k(o.data),console.log("dataaaaaaa"),_(!1),o.data.length<50?(xe(!0),console.log("ok")):o.data.length>49&&xe(!1)):o.status===204?d({type:u,payload:{status:!0,title:"Grocery groups loading error",message:o.data.message}}):o.status===500&&d({type:u,payload:{status:!0,title:"Grocery groups error",message:o.data.message}})}).catch(o=>{console.error("Error:",o)})},ss=()=>{console.log(b);const s=b+50;console.log(s),U(s),R(s)},ts=()=>{const s=b-50;console.log(s),U(s),R(s)},as=(s,t=null)=>{S(!Q),Te(s),t!==null?W(t):console.log("Bonus number not provided")},os=()=>{const s={bonus:Y};console.log(s),m&&c&&g.put(j+"assistant/grocery/group/bonus/"+Ne,s,{headers:{Authorization:`Bearer ${c}`}}).then(t=>{if(t.status===200){console.log("updated"),S(!1);const o=t.data,p=f.find(i=>i.id===o._id);p&&(p.bonus=o.bonus),k([...f])}else t.status===203?(console.log("203"),d({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===204?(console.log("204"),d({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===500&&d({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})}).catch(t=>{console.error(t)})};a.useEffect(()=>{ls(),rs()},[]);const ls=()=>{c&&g.get(j+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?Re(s.data):s.status===500&&d({type:u,payload:{status:!0,title:"Market Group Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},rs=()=>{c&&g.get(j+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?He(s.data):s.status===500&&d({type:u,payload:{status:!0,title:"Chain Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},F=s=>{s==="all"?(K(""),oe("All Cities")):(K(s),oe(s))},x=s=>{s==="all"?(Z(""),le("All Status")):(Z(s),le(s))},ge=(s,t)=>{s==="all"?(se(""),re("All Market Groups")):(se(s),re(t))},je=(s,t)=>{s==="all"?(ae(""),ne("All Chains")):(ae(s),ne(t))};a.useEffect(()=>{ns()},[J,ee,te,alert]);const ns=()=>{m&&c&&(ce(!0),g.get(j+`assistant/shoppers/:skip?city=${J}&group=${ee}&chain=${te}`,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(Qe(s.data),ce(!1)):s.status===500&&d({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)}))},cs=(s,t,o)=>{A(!T),console.log("Grocery ID",s),We(o),q(t)},me=(s,t,o)=>{P(!ie),console.log("picker id",s),console.log("Grocery id",o),q(t),Ke(o),Je(s)},fe=(s,t,o)=>{console.log("bid",s,"PID",t,o);const p={pickerId:t,status:o};console.log(p),m&&c&&g.put(j+"assistant/grocery/group/picker/"+s,p,{headers:{Authorization:`Bearer ${c}`}}).then(i=>{if(i.status===200){console.log("updated",i.data),T&&A(!1),P(!1);const H=i.data,hs=f.map(be=>be.id===H._id?(console.log("matched"),H):be);console.log("update obj",H),k([...hs])}else i.status===203?(console.log("203"),d({type:u,payload:{status:!0,title:"Picker Assign error",message:i.data.message}})):i.status===204?(console.log("204"),d({type:u,payload:{status:!0,title:"Picker Assign error",message:i.data.message}})):i.status===500&&d({type:u,payload:{status:!0,title:"Picker Assign error",message:i.data.message}})}).catch(i=>{console.error(i)})},is=s=>{L(!ue),Ze(s)},ds=s=>{console.log("status",s),m&&c&&g.put(j+"assistant/grocery/group/status/"+s,{},{headers:{Authorization:`Bearer ${c}`}}).then(t=>{if(t.status===200){console.log("updated",t.data),L(!1);const o=t.data,p=f.find(i=>i.id===o._id);p&&(console.log("done",p),p.status=o.status),k([...f])}else t.status===203?(console.log("203"),d({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===204?(console.log("204"),d({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===500&&d({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},us=s=>{if(s){const t=De(s[0],"MM/dd/yyyy HH:mm"),o=De(s[1],"MM/dd/yyyy HH:mm");pe([t,o])}else pe([])};return e.jsxs(gs,{children:[e.jsxs(Be,{className:"bg-body-tertiary",children:[e.jsx(xs,{style:{marginLeft:3},format:"MM/dd/yyyy HH:mm",onChange:us}),e.jsx(js,{children:e.jsx(y,{type:"text",placeholder:"Search By Rider No",style:{width:300,marginLeft:"50%"},value:I,onChange:s=>Ie(s.target.value)})}),e.jsxs(D,{style:{marginRight:"2%",width:"10%",backgroundColor:"#ff4d4d"},children:[e.jsx(B,{children:Ve}),e.jsxs(w,{children:[e.jsx(n,{onClick:()=>x("all"),children:"All Status"}),e.jsx(n,{onClick:()=>x("created"),children:"Created"}),e.jsx(n,{onClick:()=>x("ready"),children:"Ready"}),e.jsx(n,{onClick:()=>x("finalized"),children:"Finalized"}),e.jsx(n,{onClick:()=>x("freeze"),children:"Freeze"}),e.jsx(n,{onClick:()=>x("forced"),children:"Forced"}),e.jsx(n,{onClick:()=>x("open"),children:"Open"}),e.jsx(n,{onClick:()=>x("completed"),children:"Completed"}),e.jsx(n,{onClick:()=>x("waiting"),children:"Waiting"}),e.jsx(n,{onClick:()=>x("paid "),children:"Paid "})]})]})]}),ve?e.jsx(Se,{}):e.jsxs(Ee,{children:[e.jsx(ze,{children:e.jsxs(E,{children:[e.jsx(l,{scope:"col",children:"No"}),e.jsx(l,{scope:"col",children:"Rider Assign No"}),e.jsx(l,{scope:"col",children:"Rider Status"}),e.jsx(l,{scope:"col",children:"Duration"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"Date"}),e.jsx(l,{scope:"col",children:"Bonus"}),e.jsx(l,{scope:"col",children:"Amount"}),e.jsx(l,{scope:"col",children:"Hour"}),e.jsx(l,{scope:"col",children:"Rank"}),e.jsx(l,{scope:"col",children:"Start"}),e.jsx(l,{scope:"col",children:"End"}),e.jsx(l,{scope:"col",children:"Picker"}),e.jsx(l,{scope:"col"}),e.jsx(l,{scope:"col"})]})}),e.jsx(Ge,{children:f.map((s,t)=>e.jsxs(E,{children:[e.jsx(r,{children:s.no}),e.jsx(r,{children:s.ridersAssigningNo}),e.jsx(r,{children:e.jsx(we,{style:{width:80},color:"info",children:s.ridersAssigningStatus})}),e.jsxs(r,{children:[s.duration," min"]}),e.jsx(r,{children:e.jsx(we,{style:{width:80},color:"warning",children:s.status})}),e.jsx(r,{children:s.date}),e.jsxs(r,{children:[s.bonus!=null?s.bonus.toFixed(2):0," ",e.jsx(Ae,{to:"",children:e.jsx(Pe,{icon:ms,size:"sm",onClick:()=>as(s.id,s.bonus)})})," "]}),e.jsx(r,{children:s.amount}),e.jsx(r,{children:s.hour}),e.jsx(r,{children:s.rank+1}),e.jsx(r,{children:s.start}),e.jsx(r,{children:s.end}),e.jsx(r,{children:s.shopper?e.jsx(h,{onClick:()=>cs(s.id,s.status,s),size:"sm",style:{width:80},color:"danger",children:"View"}):e.jsx(h,{onClick:()=>me(s.accepted,s.status,s.id),size:"sm",style:{width:80},color:"danger",children:"Add"})}),e.jsx(r,{children:s.status==="complete"?e.jsx(h,{size:"sm",disabled:!0,style:{width:80},color:"danger",children:"Cancel"}):s.status==="canceled"?e.jsx(h,{size:"sm",disabled:!0,style:{width:80},color:"danger",children:"Cancel"}):e.jsx(h,{onClick:()=>is(s.id),size:"sm",style:{width:80},color:"danger",children:"Cancel"})}),e.jsx(r,{children:e.jsx(Ae,{to:`/order/grocerygroup/orders/${s.id}`,children:e.jsx(Pe,{icon:fs,size:"xl"})})})]},t))})]}),e.jsxs(Cs,{"aria-label":"Page navigation example",children:[e.jsx(Me,{disabled:b<=50,onClick:ts,children:"Previous"}),e.jsx(Me,{disabled:es===!0,onClick:ss,children:"Next"})]}),e.jsxs(z,{alignment:"center",visible:Q,scrollable:!0,size:"sm",onClose:()=>S(!1),children:[e.jsx(G,{closeButton:!0,children:e.jsx(M,{children:"Confirmation"})}),e.jsxs(v,{children:[e.jsx("a",{children:"Enter Bonus Amount"}),e.jsx("br",{}),e.jsx(y,{type:"text",placeholder:"Bonus",value:Y,onChange:s=>W(s.target.value)})]}),e.jsxs($,{children:[e.jsx(h,{color:"secondary",onClick:()=>S(!1),children:"Close"}),e.jsx(h,{color:"primary",onClick:()=>os(),children:"Save changes"})]})]}),e.jsxs(z,{alignment:"center",visible:T,scrollable:!0,size:"lg",onClose:()=>A(!1),children:[e.jsx(G,{closeButton:!0,children:e.jsx(M,{children:"Picker Information"})}),e.jsx(v,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:e.jsx("div",{children:e.jsxs(ys,{className:"mb-3",children:[e.jsx(V,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(O,{sm:10,children:e.jsx(y,{type:"text",defaultValue:(Ce=C.shopper)==null?void 0:Ce.name,readOnly:!0,plainText:!0})}),e.jsx(V,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(O,{sm:10,children:e.jsx(y,{type:"text",defaultValue:(ye=C.shopper)==null?void 0:ye.email,readOnly:!0,plainText:!0})}),e.jsx(V,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(O,{sm:10,children:e.jsx(y,{type:"text",defaultValue:(ke=C.shopper)==null?void 0:ke.contact,readOnly:!0,plainText:!0})})]})})}),e.jsxs($,{children:[e.jsx(h,{color:"warning",onClick:()=>{var s;return me((s=C.shopper)==null?void 0:s.id,N,C.id)},children:"Change"}),e.jsx(h,{color:"secondary",onClick:()=>A(!1),children:"Close"})]})]}),e.jsxs(z,{alignment:"center",visible:ie,scrollable:!0,size:"xl",onClose:()=>P(!1),children:[e.jsx(G,{closeButton:!0,children:e.jsx(M,{children:"Confirmation"})}),e.jsxs(v,{children:[e.jsxs(Be,{className:"bg-body-tertiary",children:[e.jsxs(D,{style:{marginLeft:"43%",width:"10%",backgroundColor:"#ff4d4d"},children:[e.jsx(B,{children:$e}),e.jsxs(w,{children:[e.jsx(n,{onClick:()=>F("all"),children:"All"}),e.jsx(n,{onClick:()=>F("Milan"),children:"Milan"}),e.jsx(n,{onClick:()=>F("Napoli"),children:"Napoli"})]})]}),e.jsxs(D,{style:{marginRight:"0%",width:"15%",backgroundColor:"#ff4d4d"},children:[e.jsx(B,{children:_e}),e.jsxs(w,{children:[e.jsx(n,{onClick:()=>je("all"),children:"All"}),Fe.map((s,t)=>e.jsx(n,{onClick:()=>je(s.id,s.name),children:s.name},t))]})]}),e.jsxs(D,{style:{marginRight:"1%",width:"30%",backgroundColor:"#ff4d4d"},children:[e.jsx(B,{children:Oe}),e.jsxs(w,{children:[e.jsx(n,{onClick:()=>ge("all"),children:"All"}),Le.map((s,t)=>e.jsx(n,{onClick:()=>ge(s._id,s.name),children:s.name},t))]})]})]}),Ye?e.jsx(Se,{}):e.jsxs(Ee,{children:[e.jsx(ze,{children:e.jsxs(E,{children:[e.jsx(l,{scope:"col",children:"First Name"}),e.jsx(l,{scope:"col",children:"Last Name"}),e.jsx(l,{scope:"col",children:"Email"}),e.jsx(l,{scope:"col",children:"Phone"}),e.jsx(l,{scope:"col",children:"Country"}),e.jsx(l,{scope:"col",children:"City"}),e.jsx(l,{scope:"col",children:"Language"}),e.jsx(l,{scope:"col",children:"Market"}),e.jsx(l,{scope:"col",children:"Action"})]})}),e.jsx(Ge,{children:Ue.map((s,t)=>{var o,p;return e.jsxs(E,{children:[e.jsx(r,{children:s.name}),e.jsx(r,{children:s.surname}),e.jsx(r,{children:s.email}),e.jsx(r,{children:s.contact}),e.jsx(r,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(r,{children:s.city}),e.jsx(r,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language==="es"?"Spanish":s.language}),e.jsxs(r,{children:[(p=(o=s.market)==null?void 0:o.chain)==null?void 0:p.name," - ",s.market.address]}),e.jsx(r,{children:s.id===qe?e.jsx(h,{size:"sm",onClick:()=>fe(de,s.id,N),style:{backgroundColor:"#ff4d4d",width:90},children:"Assigned"}):e.jsx(h,{size:"sm",onClick:()=>fe(de,s.id,N),style:{backgroundColor:"#ff4d4d",width:90},children:"Add"})})]},t)})})]})]}),e.jsx($,{children:e.jsx(h,{color:"secondary",onClick:()=>P(!1),children:"Close"})})]}),e.jsxs(z,{alignment:"center",visible:ue,scrollable:!0,size:"sm",onClose:()=>L(!1),children:[e.jsx(G,{closeButton:!0,children:e.jsx(M,{children:"Confirmation"})}),e.jsxs(v,{children:[e.jsx("a",{children:"Are you sure you want to cancel this grocery group order?"}),e.jsx("br",{}),e.jsx(h,{onClick:()=>ds(Xe),style:{marginLeft:200},color:"primary",children:"Yes"})]})]})]})};export{$s as default};
