import{x as hs,r as a,z as u,j as e,i as be,L as Se,m as Ae}from"./index-CPWz2mBo.js";import{a as g}from"./axios-B4uVmeYG.js";import{D as ps,f as Pe}from"./rsuite-BzWZwScg.js";import{b as xs,a as h}from"./CContainer-DVjuDtow.js";import{C as De}from"./CNavbar-BtIsg1Gz.js";import{C as gs}from"./CForm-2L6OIrNj.js";import{C}from"./CFormInput-5yBBU1-5.js";import{C as P,a as D,b as w,c as n,e as we}from"./DefaultLayout-DMPR4tUM.js";import{C as Be,a as ze,b as B,c as l,d as Ee,e as r}from"./CTable-CHBcUNK4.js";import{c as js}from"./cil-pencil-m516yCOw.js";import{c as ms}from"./cil-info-CmGCY32x.js";import{C as fs,a as Ge}from"./CPaginationItem-BKIV6uSe.js";import{C as z,a as E,b as G,c as M}from"./CModalTitle-Xk0eoXg3.js";import{C as H}from"./CModalFooter-HZC0g86p.js";import{C as Cs}from"./CRow-B1iGE4Cp.js";import{C as $}from"./CFormLabel-BpCfGFcO.js";import{C as V}from"./CCol-DDJXnyWl.js";import"./createClass-BvLlRGHb.js";import"./index-BQnJyDzJ.js";const Fs=()=>{var fe,Ce,ye;const[{user:j,token:c},d]=hs(),[m,y]=a.useState([]),[Me,O]=a.useState(!1),[v,ve]=a.useState(""),[k,_]=a.useState(0),[U,b]=a.useState(!1),[Ie,Ne]=a.useState(""),[Q,Y]=a.useState(""),[I,W]=a.useState(""),[Te,Le]=a.useState([]),[Re,Fe]=a.useState([]),[q,J]=a.useState(""),[K,X]=a.useState(""),[Z,ee]=a.useState(""),[se,te]=a.useState(""),[He,ae]=a.useState("All Cities"),[$e,oe]=a.useState("All Status"),[Ve,le]=a.useState("All Market Groups"),[Oe,re]=a.useState("All Chains"),[_e,Ue]=a.useState([]),[Qe,ne]=a.useState(!1),[N,S]=a.useState(!1),[f,Ye]=a.useState([]),[ce,A]=a.useState(!1),[We,qe]=a.useState(""),[ie,Je]=a.useState(""),[Ke,Xe]=a.useState(""),[de,T]=a.useState(!1),[ue,he]=a.useState([]),[Ze,pe]=a.useState(!0);a.useEffect(()=>{j&&c&&L(0)},[j,c,v,K,ue]);const L=(s,t)=>{O(!0),g.get("https://15.160.211.157/assistant/grocery/group/"+s+"?rider="+v+"&status="+K+"&date="+ue,{headers:{Authorization:`Bearer ${c}`}}).then(o=>{o.status===200?(y(o.data),O(!1),o.data.length<50?(pe(!0),console.log("ok")):o.data.length>49&&pe(!1)):o.status===204?d({type:u,payload:{status:!0,title:"Grocery groups loading error",message:o.data.message}}):o.status===500&&d({type:u,payload:{status:!0,title:"Grocery groups error",message:o.data.message}})}).catch(o=>{console.error("Error:",o)})},es=()=>{console.log(k);const s=k+50;console.log(s),_(s),L(s)},ss=()=>{const s=k-50;console.log(s),_(s),L(s)},ts=(s,t=null)=>{b(!U),Ne(s),t!==null?Y(t):console.log("Bonus number not provided")},as=()=>{const s={bonus:Q};console.log(s),j&&c&&g.put("https://15.160.211.157/assistant/grocery/group/bonus/"+Ie,s,{headers:{Authorization:`Bearer ${c}`}}).then(t=>{if(t.status===200){console.log("updated"),b(!1);const o=t.data,p=m.find(i=>i.id===o._id);p&&(p.bonus=o.bonus),y([...m])}else t.status===203?(console.log("203"),d({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===204?(console.log("204"),d({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===500&&d({type:u,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})}).catch(t=>{console.error(t)})};a.useEffect(()=>{os(),ls()},[]);const os=()=>{c&&g.get("https://15.160.211.157/market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?Le(s.data):s.status===500&&d({type:u,payload:{status:!0,title:"Market Group Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},ls=()=>{c&&g.get("https://15.160.211.157/assistant/market/chains/all",{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?Fe(s.data):s.status===500&&d({type:u,payload:{status:!0,title:"Chain Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},R=s=>{s==="all"?(J(""),ae("All Cities")):(J(s),ae(s))},x=s=>{s==="all"?(X(""),oe("All Status")):(X(s),oe(s))},xe=(s,t)=>{s==="all"?(ee(""),le("All Market Groups")):(ee(s),le(t))},ge=(s,t)=>{s==="all"?(te(""),re("All Chains")):(te(s),re(t))};a.useEffect(()=>{rs()},[q,Z,se,alert]);const rs=()=>{j&&c&&(ne(!0),g.get(`https://15.160.211.157/assistant/shoppers/:skip?city=${q}&group=${Z}&chain=${se}`,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(Ue(s.data),ne(!1)):s.status===500&&d({type:u,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)}))},ns=(s,t,o)=>{S(!N),console.log("Grocery ID",s),Ye(o),W(t)},je=(s,t,o)=>{A(!ce),console.log("picker id",s),console.log("Grocery id",o),W(t),Je(o),qe(s)},me=(s,t,o)=>{console.log("bid",s,"PID",t,o);const p={pickerId:t,status:o};console.log(p),j&&c&&g.put("https://15.160.211.157/assistant/grocery/group/picker/"+s,p,{headers:{Authorization:`Bearer ${c}`}}).then(i=>{if(i.status===200){console.log("updated",i.data),N&&S(!1),A(!1);const F=i.data,us=m.map(ke=>ke.id===F._id?(console.log("matched"),F):ke);console.log("update obj",F),y([...us])}else i.status===203?(console.log("203"),d({type:u,payload:{status:!0,title:"Picker Assign error",message:i.data.message}})):i.status===204?(console.log("204"),d({type:u,payload:{status:!0,title:"Picker Assign error",message:i.data.message}})):i.status===500&&d({type:u,payload:{status:!0,title:"Picker Assign error",message:i.data.message}})}).catch(i=>{console.error(i)})},cs=s=>{T(!de),Xe(s)},is=s=>{console.log("status",s),j&&c&&g.put("https://15.160.211.157/assistant/grocery/group/status/"+s,{},{headers:{Authorization:`Bearer ${c}`}}).then(t=>{if(t.status===200){console.log("updated",t.data),T(!1);const o=t.data,p=m.find(i=>i.id===o._id);p&&(console.log("done",p),p.status=o.status),y([...m])}else t.status===203?(console.log("203"),d({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===204?(console.log("204"),d({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===500&&d({type:u,payload:{status:!0,title:"Status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},ds=s=>{if(s){const t=Pe(s[0],"MM/dd/yyyy HH:mm"),o=Pe(s[1],"MM/dd/yyyy HH:mm");he([t,o])}else he([])};return e.jsxs(xs,{children:[e.jsxs(De,{className:"bg-body-tertiary",children:[e.jsx(ps,{style:{marginLeft:3},format:"MM/dd/yyyy HH:mm",onChange:ds}),e.jsx(gs,{children:e.jsx(C,{type:"text",placeholder:"Search By Rider No",style:{width:300,marginLeft:"50%"},value:v,onChange:s=>ve(s.target.value)})}),e.jsxs(P,{style:{marginRight:"2%",width:"10%",backgroundColor:"#ff4d4d"},children:[e.jsx(D,{children:$e}),e.jsxs(w,{children:[e.jsx(n,{onClick:()=>x("all"),children:"All Status"}),e.jsx(n,{onClick:()=>x("created"),children:"Created"}),e.jsx(n,{onClick:()=>x("ready"),children:"Ready"}),e.jsx(n,{onClick:()=>x("finalized"),children:"Finalized"}),e.jsx(n,{onClick:()=>x("freeze"),children:"Freeze"}),e.jsx(n,{onClick:()=>x("forced"),children:"Forced"}),e.jsx(n,{onClick:()=>x("open"),children:"Open"}),e.jsx(n,{onClick:()=>x("completed"),children:"Completed"}),e.jsx(n,{onClick:()=>x("waiting"),children:"Waiting"}),e.jsx(n,{onClick:()=>x("paid "),children:"Paid "})]})]})]}),Me?e.jsx(be,{}):e.jsxs(Be,{children:[e.jsx(ze,{children:e.jsxs(B,{children:[e.jsx(l,{scope:"col",children:"No"}),e.jsx(l,{scope:"col",children:"Rider Assign No"}),e.jsx(l,{scope:"col",children:"Rider Status"}),e.jsx(l,{scope:"col",children:"Duration"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"Date"}),e.jsx(l,{scope:"col",children:"Bonus"}),e.jsx(l,{scope:"col",children:"Amount"}),e.jsx(l,{scope:"col",children:"Hour"}),e.jsx(l,{scope:"col",children:"Rank"}),e.jsx(l,{scope:"col",children:"Start"}),e.jsx(l,{scope:"col",children:"End"}),e.jsx(l,{scope:"col",children:"Picker"}),e.jsx(l,{scope:"col"}),e.jsx(l,{scope:"col"})]})}),e.jsx(Ee,{children:m.map((s,t)=>e.jsxs(B,{children:[e.jsx(r,{children:s.no}),e.jsx(r,{children:s.ridersAssigningNo}),e.jsx(r,{children:e.jsx(we,{style:{width:80},color:"info",children:s.ridersAssigningStatus})}),e.jsxs(r,{children:[s.duration," min"]}),e.jsx(r,{children:e.jsx(we,{style:{width:80},color:"warning",children:s.status})}),e.jsx(r,{children:s.date}),e.jsxs(r,{children:[s.bonus!=null?s.bonus.toFixed(2):0," ",e.jsx(Se,{to:"",children:e.jsx(Ae,{icon:js,size:"sm",onClick:()=>ts(s.id,s.bonus)})})," "]}),e.jsx(r,{children:s.amount}),e.jsx(r,{children:s.hour}),e.jsx(r,{children:s.rank+1}),e.jsx(r,{children:s.start}),e.jsx(r,{children:s.end}),e.jsx(r,{children:s.shopper?e.jsx(h,{onClick:()=>ns(s.id,s.status,s),size:"sm",style:{width:80},color:"danger",children:"View"}):e.jsx(h,{onClick:()=>je(s.accepted,s.status,s.id),size:"sm",style:{width:80},color:"danger",children:"Add"})}),e.jsx(r,{children:s.status==="complete"?e.jsx(h,{size:"sm",disabled:!0,style:{width:80},color:"danger",children:"Cancel"}):s.status==="canceled"?e.jsx(h,{size:"sm",disabled:!0,style:{width:80},color:"danger",children:"Cancel"}):e.jsx(h,{onClick:()=>cs(s.id),size:"sm",style:{width:80},color:"danger",children:"Cancel"})}),e.jsx(r,{children:e.jsx(Se,{to:`/order/grocerygroup/orders/${s.id}`,children:e.jsx(Ae,{icon:ms,size:"xl"})})})]},t))})]}),e.jsxs(fs,{"aria-label":"Page navigation example",children:[e.jsx(Ge,{disabled:k<=50,onClick:ss,children:"Previous"}),e.jsx(Ge,{disabled:Ze===!0,onClick:es,children:"Next"})]}),e.jsxs(z,{alignment:"center",visible:U,scrollable:!0,size:"sm",onClose:()=>b(!1),children:[e.jsx(E,{closeButton:!0,children:e.jsx(G,{children:"Confirmation"})}),e.jsxs(M,{children:[e.jsx("a",{children:"Enter Bonus Amount"}),e.jsx("br",{}),e.jsx(C,{type:"text",placeholder:"Bonus",value:Q,onChange:s=>Y(s.target.value)})]}),e.jsxs(H,{children:[e.jsx(h,{color:"secondary",onClick:()=>b(!1),children:"Close"}),e.jsx(h,{color:"primary",onClick:()=>as(),children:"Save changes"})]})]}),e.jsxs(z,{alignment:"center",visible:N,scrollable:!0,size:"lg",onClose:()=>S(!1),children:[e.jsx(E,{closeButton:!0,children:e.jsx(G,{children:"Picker Information"})}),e.jsx(M,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:e.jsx("div",{children:e.jsxs(Cs,{className:"mb-3",children:[e.jsx($,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(V,{sm:10,children:e.jsx(C,{type:"text",defaultValue:(fe=f.shopper)==null?void 0:fe.name,readOnly:!0,plainText:!0})}),e.jsx($,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(V,{sm:10,children:e.jsx(C,{type:"text",defaultValue:(Ce=f.shopper)==null?void 0:Ce.email,readOnly:!0,plainText:!0})}),e.jsx($,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(V,{sm:10,children:e.jsx(C,{type:"text",defaultValue:(ye=f.shopper)==null?void 0:ye.contact,readOnly:!0,plainText:!0})})]})})}),e.jsxs(H,{children:[e.jsx(h,{color:"warning",onClick:()=>{var s;return je((s=f.shopper)==null?void 0:s.id,I,f.id)},children:"Change"}),e.jsx(h,{color:"secondary",onClick:()=>S(!1),children:"Close"})]})]}),e.jsxs(z,{alignment:"center",visible:ce,scrollable:!0,size:"xl",onClose:()=>A(!1),children:[e.jsx(E,{closeButton:!0,children:e.jsx(G,{children:"Confirmation"})}),e.jsxs(M,{children:[e.jsxs(De,{className:"bg-body-tertiary",children:[e.jsxs(P,{style:{marginLeft:"43%",width:"10%",backgroundColor:"#ff4d4d"},children:[e.jsx(D,{children:He}),e.jsxs(w,{children:[e.jsx(n,{onClick:()=>R("all"),children:"All"}),e.jsx(n,{onClick:()=>R("Milan"),children:"Milan"}),e.jsx(n,{onClick:()=>R("Napoli"),children:"Napoli"})]})]}),e.jsxs(P,{style:{marginRight:"0%",width:"15%",backgroundColor:"#ff4d4d"},children:[e.jsx(D,{children:Oe}),e.jsxs(w,{children:[e.jsx(n,{onClick:()=>ge("all"),children:"All"}),Re.map((s,t)=>e.jsx(n,{onClick:()=>ge(s.id,s.name),children:s.name},t))]})]}),e.jsxs(P,{style:{marginRight:"1%",width:"30%",backgroundColor:"#ff4d4d"},children:[e.jsx(D,{children:Ve}),e.jsxs(w,{children:[e.jsx(n,{onClick:()=>xe("all"),children:"All"}),Te.map((s,t)=>e.jsx(n,{onClick:()=>xe(s._id,s.name),children:s.name},t))]})]})]}),Qe?e.jsx(be,{}):e.jsxs(Be,{children:[e.jsx(ze,{children:e.jsxs(B,{children:[e.jsx(l,{scope:"col",children:"First Name"}),e.jsx(l,{scope:"col",children:"Last Name"}),e.jsx(l,{scope:"col",children:"Email"}),e.jsx(l,{scope:"col",children:"Phone"}),e.jsx(l,{scope:"col",children:"Country"}),e.jsx(l,{scope:"col",children:"City"}),e.jsx(l,{scope:"col",children:"Language"}),e.jsx(l,{scope:"col",children:"Market"}),e.jsx(l,{scope:"col",children:"Action"})]})}),e.jsx(Ee,{children:_e.map((s,t)=>{var o,p;return e.jsxs(B,{children:[e.jsx(r,{children:s.name}),e.jsx(r,{children:s.surname}),e.jsx(r,{children:s.email}),e.jsx(r,{children:s.contact}),e.jsx(r,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(r,{children:s.city}),e.jsx(r,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language==="es"?"Spanish":s.language}),e.jsxs(r,{children:[(p=(o=s.market)==null?void 0:o.chain)==null?void 0:p.name," - ",s.market.address]}),e.jsx(r,{children:s.id===We?e.jsx(h,{size:"sm",onClick:()=>me(ie,s.id,I),style:{backgroundColor:"#ff4d4d",width:90},children:"Assigned"}):e.jsx(h,{size:"sm",onClick:()=>me(ie,s.id,I),style:{backgroundColor:"#ff4d4d",width:90},children:"Add"})})]},t)})})]})]}),e.jsx(H,{children:e.jsx(h,{color:"secondary",onClick:()=>A(!1),children:"Close"})})]}),e.jsxs(z,{alignment:"center",visible:de,scrollable:!0,size:"sm",onClose:()=>T(!1),children:[e.jsx(E,{closeButton:!0,children:e.jsx(G,{children:"Confirmation"})}),e.jsxs(M,{children:[e.jsx("a",{children:"Are you sure you want to cancel this grocery group order?"}),e.jsx("br",{}),e.jsx(h,{onClick:()=>is(Ke),style:{marginLeft:200},color:"primary",children:"Yes"})]})]})]})};export{Fs as default};
