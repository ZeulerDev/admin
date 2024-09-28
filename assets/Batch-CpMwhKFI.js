import{r as l,y as Is,l as Ts,A as n,j as e,h as I,L as v,m as y}from"./index-C7xebdlB.js";import{a as j}from"./axios-Cm0UX6qg.js";import{L as Ge,M as Es,T as Ns,P as Ue}from"./leaflet-I9MjXyom.js";import{B as g}from"./config-HOLfLxHr.js";import{b as Ps,a as p}from"./CContainer-DmyDJSbi.js";import{C as T,a as E,b as N,c as P,d,e as Vs}from"./DefaultLayout-jQufvVlr.js";import{C as W}from"./CNavbar-DAGRjB36.js";import{C as q,a as J,b,c as a,d as K,e as o}from"./CTable-bhvJ0O4o.js";import{c as $s}from"./cil-pencil-m516yCOw.js";import{c as Q}from"./cil-info-CmGCY32x.js";import{C as Fs,a as Oe}from"./CPaginationItem-BwX0sL4W.js";import{C as k,a as S,b as C,c as w}from"./CModalTitle-DqlcJFLS.js";import{C as D}from"./CModalFooter-DExbXLa3.js";import{C as V}from"./CFormInput-BJT20qYv.js";import{M as Ze}from"./Marker-BezZPPrr.js";import{C as Gs}from"./CRow-0j8aqt5h.js";import{C as X}from"./CFormLabel-Dfa51LwS.js";import{C as ee}from"./CCol-wCTVnzpM.js";var Us=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M487.938,162.108l-224-128a16,16,0,0,0-15.876,0l-224,128a16,16,0,0,0,.382,28l224,120a16,16,0,0,0,15.112,0l224-120a16,16,0,0,0,.382-28ZM256,277.849,65.039,175.548,256,66.428l190.961,109.12Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M263.711,394.02,480,275.061V238.539L256,361.74,32,238.539v36.522L248.289,394.02a16.005,16.005,0,0,0,15.422,0Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M32,362.667,248.471,478.118a16,16,0,0,0,15.058,0L480,362.667V326.4L256,445.867,32,326.4Z' class='ci-primary'/>"],Os=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M478.465,89.022,329.6,47.382,180.3,89.438,41.459,50.052h0A20,20,0,0,0,16,69.293v340.6a24.093,24.093,0,0,0,17.449,23.089l146.817,41.65,149.365-42.074,140.983,39.436A20,20,0,0,0,496,452.728V112.135A24.08,24.08,0,0,0,478.465,89.022ZM163,436.466,48,403.842V85.17l115,32.624Zm150.615-32.647L195,437.231V118.542L313.615,85.13ZM464,436.91,345.615,403.8V85.089L464,118.2Z' class='ci-primary'/>"];const ct=()=>{var Ie,Te,Ee,Ne,Pe,Ve;const[$,se]=l.useState(!1),[te,z]=l.useState(!1),[He,F]=l.useState(!1),[ae,le]=l.useState(!1),[{user:f,token:c},i]=Is();Ts();const[m,M]=l.useState([]),[_e,G]=l.useState(!1),[Ye,oe]=l.useState(!1),[re,B]=l.useState(!1),[ie,We]=l.useState([]),[L,ne]=l.useState(0),[ce,de]=l.useState(""),[U,he]=l.useState(""),[qe,Je]=l.useState(""),[O,Z]=l.useState(!1),[A,Ke]=l.useState([]),[ue,H]=l.useState(!1),[Qe,Xe]=l.useState([]),[es,ss]=l.useState([]),[xe,pe]=l.useState(""),[je,ge]=l.useState(""),[fe,me]=l.useState(""),[ts,ye]=l.useState("All Cities"),[as,Ce]=l.useState("All Market Groups"),[ls,be]=l.useState("All Chains"),[os,rs]=l.useState([]),[ke,is]=l.useState(""),[ns,cs]=l.useState(""),[Se,we]=l.useState(""),[ds,Be]=l.useState("All Status"),[hs,us]=l.useState(""),[Zs,xs]=l.useState(""),[ps,js]=l.useState([]),[Ae,gs]=l.useState({duration:" ",distance:" "}),[fs,ve]=l.useState(!0);l.useEffect(()=>{const s=setTimeout(()=>{i({type:n,payload:{status:!0,title:"Data Loading",message:"Data loading timeout exceeded or no data to show",color:"warning"}}),G(!1)},2e4);return f&&c&&R(0,s),()=>{clearTimeout(s)}},[f,c,Se]);const R=(s,t)=>{G(!0),j.get(g+"assistant/batches/"+s+"?status="+Se,{headers:{Authorization:`Bearer ${c}`}}).then(r=>{r.status===200?(M(r.data),G(!1),clearTimeout(t),r.data.length<50?(ve(!0),console.log("ok")):r.data.length>49&&ve(!1)):r.status===204?i({type:n,payload:{status:!0,title:"Batches loading error",message:r.data.message}}):r.status===500&&i({type:n,payload:{status:!0,title:"Batches loading error",message:r.data.message}})}).catch(r=>{console.error("Error:",r)})},ms=()=>{const s=L+50;ne(s),R(s,!0)},ys=()=>{const s=L-50;console.log(s),ne(s),R(s,!1)},_=s=>{se(!$),console.log(s),De(s)},De=s=>{c&&f&&(B(!0),j.get(g+"assistant/batch/customers/"+s,{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?(console.log("done"),We(t.data),B(!1)):t.status===500&&i({type:n,payload:{status:!0,title:"Batch details view error",message:t.data.message}})}).catch(t=>{console.error("Batch details view error:",t)}))},Cs=(s,t=null)=>{F(!$),Je(s),t!==null?de(t):console.log("Bonus number not provided")},bs=()=>{const s={bonus:ce};f&&c&&j.put(g+"assistant/batch/bonus/"+qe,s,{headers:{Authorization:`Bearer ${c}`}}).then(t=>{if(t.status===200){console.log("updated"),F(!1);const r=t.data,x=m.find(h=>h.id===r._id);x&&(x.bonus=r.bonus),M([...m]),i({type:n,payload:{status:!0,title:"Bonus Update",message:"Bonus Update Success",color:"success"}})}else t.status===203?(console.log("203"),i({type:n,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===204?(console.log("204"),i({type:n,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===500&&i({type:n,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})}).catch(t=>{console.error(t)})},ks=(s,t)=>{Z(!O),B(!0),he(t),c&&f&&(B(!0),j.get(g+"assistant/batch/"+s,{headers:{Authorization:`Bearer ${c}`}}).then(r=>{r.status===200?(Ke(r.data),B(!1)):r.status===500&&i({type:n,payload:{status:!0,title:"Order details view error",message:r.data.message}})}).catch(r=>{console.error("Order details view error:",r)}))},ze=(s,t,r)=>{H(!ue),he(t),is(r),cs(s)};l.useEffect(()=>{Ss(),ws()},[]);const Ss=()=>{c&&j.get(g+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?Xe(s.data):s.status===500&&i({type:n,payload:{status:!0,title:"Market Group Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})},ws=()=>{c&&j.get(g+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?ss(s.data):s.status===500&&i({type:n,payload:{status:!0,title:"Chain Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})};l.useEffect(()=>{Bs()},[xe,je,fe]);const Bs=()=>{f&&c&&(oe(!0),j.get(g+`assistant/riders/:skip?city=${xe}&group=${je}&chain=${fe}`,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(rs(s.data),oe(!1)):s.status===500&&i({type:n,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}})}).catch(s=>{console.error("Error:",s)}))},Y=s=>{s==="all"?(pe(""),ye("All Cities")):(pe(s),ye(s))},Me=(s,t)=>{s==="all"?(ge(""),Ce("All Market Groups")):(ge(s),Ce(t))},Le=(s,t)=>{s==="all"?(me(""),be("All Chains")):(me(s),be(t))},Re=(s,t,r)=>{console.log("bid",s,"rid",t,r);const x={riderId:t,status:r};f&&c&&j.put(g+"assistant/batch/assign/rider/"+s,x,{headers:{Authorization:`Bearer ${c}`}}).then(h=>{if(h.status===200){console.log("updated"),O&&Z(!1),H(!1);const $e=h.data,Fe=m.find(Rs=>Rs.id===$e._id);Fe&&(Fe.bonus=$e.bonus),M([...m]),R(0,!0),i({type:n,payload:{status:!0,title:"Rider Assign",message:"Rider assign update success"}})}else h.status===203?(console.log("203"),i({type:n,payload:{status:!0,title:"Rider Assign error",message:h.data.message}})):h.status===204?(console.log("204"),i({type:n,payload:{status:!0,title:"Rider Assign error",message:h.data.message}})):h.status===500&&i({type:n,payload:{status:!0,title:"Rider Assign error",message:h.data.message}})}).catch(h=>{console.error(h)})},u=s=>{s==="all"?(we(""),Be("All Status")):(we(s),Be(s))},As=s=>{z(!te),us(s),console.log(s)},vs=s=>{console.log("status",s),f&&c&&j.put(g+"assistant/batch/assign/status/"+s,{},{headers:{Authorization:`Bearer ${c}`}}).then(t=>{if(t.status===200){console.log("updated",t.data),z(!1);const r=t.data,x=m.find(h=>h.id===r._id);x&&(console.log("done",x),x.status=r.status),M([...m])}else t.status===203?(console.log("203"),i({type:n,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===204?(console.log("204"),i({type:n,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===500&&i({type:n,payload:{status:!0,title:"Status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},Ds=s=>{j.get(g+"assistant/batch/markets/"+s,{headers:{Authorization:`Bearer ${c}`}}).then(t=>{t.status===200?(js(t.data),t.data):t.status===203?i({type:n,payload:{status:!0,title:"Batch markets loading error",message:t.data.message}}):t.status===204?i({type:n,payload:{status:!0,title:"Batch markets loading error",message:t.data.message}}):t.status===500&&i({type:n,payload:{status:!0,title:"Batch markets loading error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},zs=(s,t,r)=>{console.log(s),xs(s),le(!ae),De(s),Ds(s);const x=t/60;gs({duration:x.toFixed(0),distance:r})},Ms=new Ge.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),Ls=new Ge.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});return e.jsxs(Ps,{children:[e.jsx(T,{style:{marginLeft:"75.5%"},color:"secondary",children:"Filter by"}),e.jsxs(E,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(N,{style:{color:"white"},children:ds}),e.jsxs(P,{children:[e.jsx(d,{onClick:()=>u("all"),children:"All Status"}),e.jsx(d,{onClick:()=>u("created"),children:"Created"}),e.jsx(d,{onClick:()=>u("ready"),children:"Ready"}),e.jsx(d,{onClick:()=>u("finalized"),children:"Finalized"}),e.jsx(d,{onClick:()=>u("freeze"),children:"Freeze"}),e.jsx(d,{onClick:()=>u("forced"),children:"Forced"}),e.jsx(d,{onClick:()=>u("open"),children:"Open"}),e.jsx(d,{onClick:()=>u("completed"),children:"Completed"}),e.jsx(d,{onClick:()=>u("waiting"),children:"Waiting"}),e.jsx(d,{onClick:()=>u("paid "),children:"Paid "}),e.jsx(d,{onClick:()=>u("coloring "),children:"Coloring "}),e.jsx(d,{onClick:()=>u("delivery "),children:"Delivery "})]})]}),e.jsx(W,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),_e?e.jsx(I,{}):e.jsxs(q,{children:[e.jsx(J,{children:e.jsxs(b,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"No"}),e.jsx(a,{scope:"col",children:"Duration"}),e.jsx(a,{scope:"col",children:"Distance"}),e.jsx(a,{scope:"col",children:"Status"}),e.jsx(a,{scope:"col",children:"Bonus"}),e.jsx(a,{scope:"col",children:"Date"}),e.jsx(a,{scope:"col",children:"Hour"}),e.jsx(a,{scope:"col",children:"fee"}),e.jsx(a,{scope:"col",children:"Start"}),e.jsx(a,{scope:"col",children:"End"}),e.jsx(a,{scope:"col",children:"Rider"}),e.jsx(a,{scope:"col",children:"Customers"}),e.jsx(a,{scope:"col",children:"Market"}),e.jsx(a,{scope:"col",children:"Orders"}),e.jsx(a,{scope:"col",children:"Map"}),e.jsx(a,{scope:"col",children:"Batch"})]})}),e.jsx(K,{children:m.map((s,t)=>e.jsxs(b,{children:[e.jsx(o,{children:L+t+1}),e.jsx(a,{scope:"row",children:s.no}),e.jsx(a,{scope:"row",children:s.duration}),e.jsx(o,{children:s.distance}),e.jsx(o,{children:e.jsx(T,{style:{width:80},color:"info",children:s.status})}),e.jsxs(o,{children:[s.bonus!=null?s.bonus.toFixed(2):0," ",e.jsx(v,{to:"",children:e.jsx(y,{icon:$s,size:"sm",onClick:()=>Cs(s.id,s.bonus)})})," "]}),e.jsx(o,{children:s.date}),e.jsx(o,{children:s.hour}),e.jsx(o,{children:s.fee}),e.jsx(o,{children:s.start}),e.jsx(o,{children:s.end}),e.jsx(o,{children:s.accepted?e.jsx(p,{onClick:()=>ks(s.id,s.status),size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"View"}):e.jsx(p,{onClick:()=>ze(s.accepted,s.status,s.id),size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"Add"})}),e.jsx(o,{children:e.jsx(v,{children:e.jsx(y,{icon:Q,size:"xl",onClick:()=>_(s.id)})})}),e.jsx(o,{children:e.jsx(v,{to:`/order/batches/market/${s.id}`,children:e.jsx(y,{icon:Vs,size:"xl"})})}),e.jsx(o,{children:e.jsx(v,{to:`/order/batches/orders/${s.id}`,children:e.jsx(y,{icon:Us,size:"xl"})})}),e.jsx(o,{children:e.jsx(v,{children:e.jsx(y,{icon:Os,size:"xl",onClick:()=>zs(s.id,s.duration,s.distance)})})}),e.jsx(o,{children:s.status==="complete"?e.jsx(p,{size:"sm",disabled:!0,style:{width:80},children:"Cancel"}):s.status==="canceled"?e.jsx(p,{size:"sm",disabled:!0,style:{width:80,backgroundColor:"#ff4d4d",color:"white"},color:"danger",children:"Cancel"}):e.jsx(p,{onClick:()=>As(s.id),size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"Cancel"})})]},t))})]}),e.jsxs(Fs,{"aria-label":"Page navigation example",children:[e.jsx(Oe,{disabled:L<=0,onClick:ys,children:"Previous"}),e.jsx(Oe,{disabled:fs===!0,onClick:ms,children:"Next"})]}),e.jsxs(k,{visible:$,scrollable:!0,size:"xl",onClose:()=>se(!1),children:[e.jsx(S,{closeButton:!0,children:e.jsx(C,{children:"Customers Information"})}),e.jsx(w,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:re?e.jsx(I,{}):e.jsxs(q,{children:[e.jsx(J,{children:e.jsxs(b,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"Order No"}),e.jsx(a,{scope:"col",children:"Name"}),e.jsx(a,{scope:"col",children:"Address"}),e.jsx(a,{scope:"col",children:"Slot"}),e.jsx(a,{scope:"col",children:"Date"}),e.jsx(a,{scope:"col",children:"Total"}),e.jsx(a,{scope:"col",children:"Latitude"}),e.jsx(a,{scope:"col",children:"Longitude"})]})}),e.jsx(K,{children:(Ie=ie.customers)==null?void 0:Ie.map((s,t)=>e.jsxs(b,{children:[e.jsx(o,{children:t+1}),e.jsx(o,{children:s.orderNo}),e.jsx(o,{children:s.name}),e.jsx(o,{children:s.address}),e.jsx(o,{children:s.orderSlot}),e.jsx(o,{children:s.orderDate}),e.jsx(o,{children:s.orderTotal}),e.jsx(o,{children:s.lat}),e.jsx(o,{children:s.lng})]},t))})]})}),e.jsx(D,{})]}),e.jsxs(k,{alignment:"center",visible:He,scrollable:!0,size:"sm",onClose:()=>F(!1),children:[e.jsx(S,{closeButton:!0,children:e.jsx(C,{children:"Confirmation"})}),e.jsxs(w,{children:[e.jsx("a",{children:"Enter Bonus Amount"}),e.jsx("br",{}),e.jsx(V,{type:"text",placeholder:"Bonus",value:ce,onChange:s=>de(s.target.value)})]}),e.jsx(D,{children:e.jsx(p,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>bs(),children:"Save changes"})})]}),e.jsxs(k,{alignment:"center",visible:ae,scrollable:!0,size:"xl",onClose:()=>le(!1),children:[e.jsxs(S,{closeButton:!0,children:[e.jsx(C,{children:"Location Information"}),e.jsx(C,{})]}),e.jsxs(w,{children:[e.jsxs(W,{className:"bg-body-tertiary",children:[e.jsxs("a",{style:{fontSize:19,marginLeft:760},children:["Distance : ",Ae.distance,"m"]}),"  ",e.jsxs("a",{style:{fontSize:19,marginRight:20},children:["Duration : ",Ae.duration,"min"]})]}),e.jsxs(Es,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(Ns,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),(Te=ie.customers)==null?void 0:Te.map((s,t)=>e.jsx(Ze,{position:[s.lat,s.lng],icon:Ms,onClick:_,children:e.jsxs(Ue,{children:[e.jsx(y,{icon:Q,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:s.address})]})},t)),(Ee=ps.markets)==null?void 0:Ee.map((s,t)=>e.jsx(Ze,{position:[s.lat,s.lng],icon:Ls,onClick:_,children:e.jsxs(Ue,{children:[e.jsx(y,{icon:Q,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:s.address})]})},t))]})]}),e.jsx(D,{})]}),e.jsxs(k,{alignment:"center",visible:ue,scrollable:!0,size:"xl",onClose:()=>H(!1),children:[e.jsx(S,{closeButton:!0,children:e.jsx(C,{children:"Rider Assign to the Batch"})}),e.jsxs(w,{children:[e.jsx(T,{style:{marginLeft:"37%"},color:"secondary",children:"Filter by"}),e.jsxs(E,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(N,{style:{color:"white"},children:ts}),e.jsxs(P,{children:[e.jsx(d,{onClick:()=>Y("all"),children:"All"}),e.jsx(d,{onClick:()=>Y("Milan"),children:"Milan"}),e.jsx(d,{onClick:()=>Y("Napoli"),children:"Napoli"})]})]}),e.jsxs(E,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(N,{style:{color:"white"},children:ls}),e.jsxs(P,{children:[e.jsx(d,{onClick:()=>Le("all"),children:"All"}),es.map((s,t)=>e.jsx(d,{onClick:()=>Le(s.id,s.name),children:s.name},t))]})]}),e.jsxs(E,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(N,{style:{color:"white"},children:as}),e.jsxs(P,{children:[e.jsx(d,{onClick:()=>Me("all"),children:"All"}),Qe.map((s,t)=>e.jsx(d,{onClick:()=>Me(s._id,s.name),children:s.name},t))]})]}),e.jsx(W,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),Ye?e.jsx(I,{}):e.jsxs(q,{children:[e.jsx(J,{children:e.jsxs(b,{children:[e.jsx(a,{scope:"col",children:"#"}),e.jsx(a,{scope:"col",children:"First Name"}),e.jsx(a,{scope:"col",children:"Last Name"}),e.jsx(a,{scope:"col",children:"Email"}),e.jsx(a,{scope:"col",children:"Phone"}),e.jsx(a,{scope:"col",children:"Country"}),e.jsx(a,{scope:"col",children:"Employee ID"}),e.jsx(a,{scope:"col",children:"Language"}),e.jsx(a,{scope:"col",children:"Group"}),e.jsx(a,{scope:"col",children:"Add Rider"})]})}),e.jsx(K,{children:os.map((s,t)=>e.jsxs(b,{children:[e.jsx(o,{children:t+1}),e.jsx(o,{children:s.name}),e.jsx(o,{children:s.surname}),e.jsx(o,{children:s.email}),e.jsx(o,{children:s.contact}),e.jsx(o,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(o,{children:s.employeeId?s.employeeId:e.jsx(T,{color:"warning",children:"Not Provide"})}),e.jsx(o,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language==="es"?"Spanish":s.language}),e.jsx(o,{children:s.groups.map((r,x)=>e.jsx("div",{children:r.name},x))}),e.jsx(o,{children:s.id===ns?e.jsx(p,{size:"sm",onClick:()=>Re(ke,s.id,U),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Assigned"}):e.jsx(p,{size:"sm",onClick:()=>Re(ke,s.id,U),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},t))})]})]}),e.jsx(D,{})]}),e.jsxs(k,{alignment:"center",visible:O,scrollable:!0,size:"lg",onClose:()=>Z(!1),children:[e.jsx(S,{closeButton:!0,children:e.jsx(C,{children:"Rider Information"})}),e.jsx(w,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:re?e.jsx(I,{}):e.jsx("div",{children:e.jsxs(Gs,{className:"mb-3",children:[e.jsx(X,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(ee,{sm:10,children:e.jsx(V,{type:"text",defaultValue:(Ne=A.accepted)==null?void 0:Ne.name,readOnly:!0,plainText:!0})}),e.jsx(X,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(ee,{sm:10,children:e.jsx(V,{type:"text",defaultValue:(Pe=A.accepted)==null?void 0:Pe.email,readOnly:!0,plainText:!0})}),e.jsx(X,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(ee,{sm:10,children:e.jsx(V,{type:"text",defaultValue:(Ve=A.accepted)==null?void 0:Ve.contact,readOnly:!0,plainText:!0})})]})})}),e.jsx(D,{children:e.jsx(p,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{var s;return ze((s=A.accepted)==null?void 0:s.id,U,A.id)},children:"Change"})})]}),e.jsxs(k,{alignment:"center",visible:te,scrollable:!0,size:"sm",onClose:()=>z(!1),children:[e.jsx(S,{closeButton:!0,children:e.jsx(C,{children:"Confirmation"})}),e.jsxs(w,{children:[e.jsx("a",{children:"Are you sure you want to cancel this batch order?"}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(p,{onClick:()=>vs(hs),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(p,{onClick:()=>z(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{ct as default};