import{r as o,y as Ms,A as i,j as e,h as U,L as T,m as C}from"./index-Dr2bAMPU.js";import{a as b}from"./axios-Cm0UX6qg.js";import{B as k}from"./config-HOLfLxHr.js";import{L as Oe}from"./leaflet-C9gRHF7-.js";import{c as Ls}from"./leaflet-routing-machine-B-slrAp6.js";import{b as Rs,a as j}from"./CContainer-u87GNtez.js";import{C as $,a as X,b as ee,d as se,e as d,c as Ts}from"./DefaultLayout-B2Nh7q8u.js";import{C as te}from"./CNavbar-B7PVcNkl.js";import{C as ae,a as oe,b as z,c as l,d as le,e as r}from"./CTable-Bfn_R52F.js";import{c as Is}from"./cil-pencil-m516yCOw.js";import{c as re}from"./cil-info-CmGCY32x.js";import{c as Ns}from"./cil-map-dAArMthr.js";import{C as Ps,a as ne}from"./CPaginationItem-DP1tcg58.js";import{C as D,a as A,b as S,c as v}from"./CModalTitle-DKRx84Yh.js";import{C as O}from"./CFormInput-BN0BKVRX.js";import{C as I}from"./CModalFooter-op4IeWM8.js";import{C as Es}from"./CRow-GyQAruCl.js";import{C as ce}from"./CFormLabel-BwWU-nc5.js";import{C as ie}from"./CCol-T9BjQEAn.js";import{M as Fs,T as _s,P as Ve}from"./TileLayer-B7KDSCUq.js";import{M as He}from"./Marker-BJBPHlDJ.js";const nt=()=>{var Fe,_e,Ge,Ue,$e;const[de,ue]=o.useState(!1),[f,N]=o.useState([]),[Ye,w]=o.useState(!1),[{user:m,token:x},n]=Ms(),[We,he]=o.useState(!0),[Ze,qe]=o.useState(0),[P,V]=o.useState(1),[E,H]=o.useState(0),[xe,Y]=o.useState(!1),[Je,pe]=o.useState(""),[Ke,Qe]=o.useState(""),[je,ge]=o.useState(""),[fe,W]=o.useState(!1),[Z,me]=o.useState(""),[ye,Xe]=o.useState(""),[es,ss]=o.useState(""),[ts,Ce]=o.useState("All Cities"),[be,ke]=o.useState(""),[Se,we]=o.useState(""),[as,Be]=o.useState("All Market Groups"),[os,ls]=o.useState([]),[rs,ns]=o.useState([]),[cs,F]=o.useState(!1),[q,J]=o.useState(!1),[ze,M]=o.useState(!1),[L,is]=o.useState([]),[_,ds]=o.useState([]),[De,Ae]=o.useState(!1),[ve,us]=o.useState({duration:" ",distance:" "}),[Me,hs]=o.useState({market:[],customers:[]}),[Le,G]=o.useState(!1),[xs,ps]=o.useState(""),[Re,Te]=o.useState(""),[js,Ie]=o.useState("All Status");o.useEffect(()=>{const s=setTimeout(()=>{n({type:i,payload:{status:!0,title:"Data Loading",message:"Data loading error or Timeout exceeded",color:"warning"}}),w(!1)},2e4);return m&&x&&R(0,s),()=>{clearTimeout(s)}},[m,x,Re]);const R=(s,t)=>{w(!0),b.get(k+"assistant/solo/courier/"+s+"?status="+Re,{headers:{Authorization:`Bearer ${x}`}}).then(a=>{a.status===200?(N(a.data.data),console.log(a.data.data.length),qe(a.data.count),w(!1),clearTimeout(t),a.data.length<20?he(!0):a.data.length>19&&he(!1)):a.status===204?(w(!1),n({type:i,payload:{status:!0,title:"Batches loading error",message:"No data to show or something went wrong"}})):a.status===500&&(w(!1),n({type:i,payload:{status:!0,title:"Batches loading error",message:"No data to show or something went wrong"}}))}).catch(a=>{w(!1),console.error("Error:",a),n({type:i,payload:{status:!0,title:"Batches error",message:res.data.message}})})},gs=()=>{V(P+1);const s=E+20;H(s),R(s,!0)},fs=()=>{V(P-1);const s=E-20;console.log(s),H(s),R(s,!1)},ms=s=>{V(s);const t=(s-1)*20;H(t),R(t,!0)},ys=()=>{const s=Math.ceil(Ze/20),t=[];for(let h=1;h<=s;h++)t.push(h);const a=Math.max(P-2,1),u=Math.min(a+4,s);return t.slice(a-1,u).map(h=>e.jsx(ne,{active:P===h,onClick:()=>ms(h),children:h},h))},Cs=(s,t)=>{Y(!xe),pe(s),t!==null&&Qe(t)},bs=()=>{if(je==="")console.log("bonus is empty"),n({type:i,payload:{status:!0,title:"Bonus Update",message:"Bonus number not provided",color:"warning"}});else{const s={bonus:je};m&&x&&b.put(k+"assistant/solo/courier/bonus/"+Je,s,{headers:{Authorization:`Bearer ${x}`}}).then(t=>{if(t.status===200){Y(!1);const a=t.data,u=f.find(c=>c._id===a._id);u&&(u.bonus=a.bonus),N([...f]),n({type:i,payload:{status:!0,title:"Bonus Update",message:"Bonus Update Success",color:"success"}}),pe(""),ge("")}else t.status===203?(console.log("203"),n({type:i,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===204?(console.log("204"),n({type:i,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})):t.status===500&&n({type:i,payload:{status:!0,title:"Bonus Update error",message:t.data.message}})}).catch(t=>{console.error(t)})}},Ne=(s,t,a)=>{W(!fe),me(t),Xe(a),ss(s)},K=s=>{s==="all"?(ke(""),Ce("All Cities")):(ke(s),Ce(s))},Pe=(s,t)=>{s==="all"?(we(""),Be("All Market Groups")):(we(s),Be(t))};o.useEffect(()=>{ks()},[]);const ks=()=>{x&&b.get(k+"market/groups/dropdown/fetch",{headers:{Authorization:`Bearer ${x}`}}).then(s=>{s.status===200?ls(s.data):s.status===500&&n({type:i,payload:{status:!0,title:"Market Group Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})};o.useEffect(()=>{Ss()},[be,Se]);const Ss=()=>{m&&x&&(F(!0),b.get(k+`assistant/riders/:skip?city=${be}&group=${Se}`,{headers:{Authorization:`Bearer ${x}`}}).then(s=>{s.status===200?(ns(s.data),F(!1)):s.status===500&&(F(!1),n({type:i,payload:{status:!0,title:"Error",message:s.data.message,color:"warning"}}))}).catch(s=>{F(!1),console.error("Error:",s)}))},Ee=(s,t,a)=>{console.log("bid",s,"rid",t,a);const u={riderId:t,status:a};m&&x&&b.put(k+"assistant/solo/courier/assign/rider/"+s,u,{headers:{Authorization:`Bearer ${x}`}}).then(c=>{if(c.status===200){console.log("updated"),q&&J(!1),W(!1);const h=c.data,g=f.find(B=>B.id===h._id);g&&(g.bonus=h.bonus),N([...f]),R(0,!0),n({type:i,payload:{status:!0,title:"Rider Assign",message:"Rider assign update success",color:"success"}})}else c.status===203?(console.log("203"),n({type:i,payload:{status:!0,title:"Rider Assign error",message:c.data.message}})):c.status===204?(console.log("204"),n({type:i,payload:{status:!0,title:"Rider Assign error",message:c.data.message}})):c.status===500&&n({type:i,payload:{status:!0,title:"Rider Assign error",message:c.data.message}})}).catch(c=>{console.error(c)})},ws=(s,t)=>{J(!q),M(!0),me(t),x&&m&&(M(!0),b.get(k+"assistant/solo/courier/rider/"+s,{headers:{Authorization:`Bearer ${x}`}}).then(a=>{a.status===200?(is(a.data),M(!1)):a.status===500&&(M(!1),n({type:i,payload:{status:!0,title:"Order details view error",message:a.data.message}}))}).catch(a=>{M(!1),console.error("Order details view error:",a)}))},Q=(s,t)=>{ue(!de),ds(t)},Bs=(s,t,a,u,c)=>{console.log(s),Ae(!De);const h=u.map(y=>({lat:y.location.lat,lng:y.location.lng,address:y.address})),g=c.map(y=>({lat:y.lat,lng:y.lng,address:y.address}));hs({market:h,customers:g}),console.log(h,g);const B=t/60;us({duration:B.toFixed(0),distance:a})},zs=new Oe.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),Ds=new Oe.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),As=s=>{G(!Le),ps(s),console.log(s)},vs=s=>{console.log("status",s),m&&x&&b.put(k+"assistant/solo/courier/assign/status/"+s,{},{headers:{Authorization:`Bearer ${x}`}}).then(t=>{if(t.status===200){console.log("updated",t.data),G(!1);const a=t.data,u=f.find(c=>c._id===a._id);u&&(console.log("done",u),u.status=a.status),N([...f]),n({type:i,payload:{status:!0,title:"Status update",message:"Status update success",color:"success"}})}else t.status===203?(console.log("203"),n({type:i,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===204?(console.log("204"),n({type:i,payload:{status:!0,title:"Status update error",message:t.data.message}})):t.status===500&&n({type:i,payload:{status:!0,title:"Status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},p=s=>{s==="all"?(Te(""),Ie("All Status")):(Te(s),Ie(s))};return e.jsxs(Rs,{children:[e.jsx($,{style:{marginLeft:"75.5%"},color:"secondary",children:"Filter by"}),e.jsxs(X,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(ee,{style:{color:"white"},children:js}),e.jsxs(se,{children:[e.jsx(d,{onClick:()=>p("all"),children:"All Status"}),e.jsx(d,{onClick:()=>p("created"),children:"Created"}),e.jsx(d,{onClick:()=>p("ready"),children:"Ready"}),e.jsx(d,{onClick:()=>p("finalized"),children:"Finalized"}),e.jsx(d,{onClick:()=>p("finished"),children:"Finished"}),e.jsx(d,{onClick:()=>p("freeze"),children:"Freeze"}),e.jsx(d,{onClick:()=>p("forced"),children:"Forced"}),e.jsx(d,{onClick:()=>p("open"),children:"Open"}),e.jsx(d,{onClick:()=>p("completed"),children:"Completed"}),e.jsx(d,{onClick:()=>p("waiting"),children:"Waiting"}),e.jsx(d,{onClick:()=>p("paid "),children:"Paid "}),e.jsx(d,{onClick:()=>p("coloring "),children:"Coloring "}),e.jsx(d,{onClick:()=>p("delivery "),children:"Delivery "})]})]}),e.jsx(te,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),Ye?e.jsx(U,{}):e.jsxs(ae,{children:[e.jsx(oe,{children:e.jsxs(z,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"No"}),e.jsx(l,{scope:"col",children:"Duration (min)"}),e.jsx(l,{scope:"col",children:"Distance (m)"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"Bonus"}),e.jsx(l,{scope:"col",children:"Hour"}),e.jsx(l,{scope:"col",children:"fee"}),e.jsx(l,{scope:"col",children:"Start"}),e.jsx(l,{scope:"col",children:"End"}),e.jsx(l,{scope:"col",children:"Rider"}),e.jsx(l,{scope:"col",children:"Customers"}),e.jsx(l,{scope:"col",children:"Market"}),e.jsx(l,{scope:"col",children:"Orders"}),e.jsx(l,{scope:"col",children:"Map"}),e.jsx(l,{scope:"col",children:"Batch"})]})}),e.jsx(le,{children:f.map((s,t)=>e.jsxs(z,{children:[e.jsx(r,{children:E+t+1}),e.jsx(r,{children:s.no}),e.jsx(r,{children:s.duration}),e.jsx(r,{children:s.distance}),e.jsx(r,{children:e.jsx($,{style:{width:80},color:"info",children:s.status})}),e.jsxs(r,{children:[s.bonus!=null?s.bonus.toFixed(2):0," ",e.jsx(T,{to:"",children:e.jsx(C,{icon:Is,size:"sm",onClick:()=>Cs(s._id,s.bonus)})})," "]}),e.jsx(r,{children:s.hour}),e.jsx(r,{children:s.fee}),e.jsx(r,{children:new Date(s.start).toLocaleString()}),e.jsx(r,{children:new Date(s.end).toLocaleString()}),e.jsx(r,{children:s.accepted?e.jsx(j,{onClick:()=>{ws(s._id,s.status)},size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"View"}):e.jsx(j,{onClick:()=>{Ne(s.accepted,s.status,s._id)},size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"Add"})}),e.jsx(r,{children:e.jsx(T,{children:e.jsx(C,{icon:re,size:"xl",onClick:()=>{Q(s._id,s.customers)}})})}),e.jsx(r,{children:e.jsx(T,{to:`/solocouriers/order/market/${s._id}`,children:e.jsx(C,{icon:Ts,size:"xl"})})}),e.jsx(r,{children:e.jsx(T,{to:`/solocouriers/batches/orders/${s._id}`,children:e.jsx(C,{icon:Ls,size:"xl"})})}),e.jsx(r,{children:e.jsx(T,{children:e.jsx(C,{icon:Ns,size:"xl",onClick:()=>{Bs(s.id,s.duration,s.distance,s.markets,s.customers)}})})}),e.jsx(r,{children:s.status==="complete"?e.jsx(j,{size:"sm",disabled:!0,style:{width:80},children:"Cancel"}):s.status==="canceled"?e.jsx(j,{size:"sm",disabled:!0,style:{width:80,backgroundColor:"#ff4d4d",color:"white"},color:"danger",children:"Cancel"}):e.jsx(j,{onClick:()=>As(s._id),size:"sm",style:{width:80,backgroundColor:"#ff4d4d",color:"white"},children:"Cancel"})})]},t))})]}),e.jsxs(Ps,{"aria-label":"Page navigation example",children:[e.jsx(ne,{disabled:E<=0,onClick:fs,children:"Previous"}),ys(),e.jsx(ne,{disabled:We===!0,onClick:gs,children:"Next"})]}),e.jsxs(D,{alignment:"center",visible:xe,scrollable:!0,size:"sm",onClose:()=>Y(!1),children:[e.jsx(A,{closeButton:!0,children:e.jsx(S,{children:"Confirmation"})}),e.jsxs(v,{children:[e.jsx("a",{children:"Enter Bonus Amount"}),e.jsx("br",{}),e.jsx(O,{type:"text",placeholder:Ke,onChange:s=>ge(s.target.value)})]}),e.jsx(I,{children:e.jsx(j,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{bs()},children:"Save changes"})})]}),e.jsxs(D,{alignment:"center",visible:fe,scrollable:!0,size:"xl",onClose:()=>W(!1),children:[e.jsx(A,{closeButton:!0,children:e.jsx(S,{children:"Rider Assign to the Batch"})}),e.jsxs(v,{children:[e.jsx($,{style:{marginLeft:"57%"},color:"secondary",children:"Filter by"}),e.jsxs(X,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(ee,{style:{color:"white"},children:ts}),e.jsxs(se,{children:[e.jsx(d,{onClick:()=>K("all"),children:"All"}),e.jsx(d,{onClick:()=>K("Milan"),children:"Milan"}),e.jsx(d,{onClick:()=>K("Napoli"),children:"Napoli"})]})]}),e.jsxs(X,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[e.jsx(ee,{style:{color:"white"},children:as}),e.jsxs(se,{children:[e.jsx(d,{onClick:()=>Pe("all"),children:"All"}),os.map((s,t)=>e.jsx(d,{onClick:()=>Pe(s._id,s.name),children:s.name},t))]})]}),e.jsx(te,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),cs?e.jsx(U,{}):e.jsxs(ae,{children:[e.jsx(oe,{children:e.jsxs(z,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"First Name"}),e.jsx(l,{scope:"col",children:"Last Name"}),e.jsx(l,{scope:"col",children:"Email"}),e.jsx(l,{scope:"col",children:"Phone"}),e.jsx(l,{scope:"col",children:"Country"}),e.jsx(l,{scope:"col",children:"Employee ID"}),e.jsx(l,{scope:"col",children:"Language"}),e.jsx(l,{scope:"col",children:"Group"}),e.jsx(l,{scope:"col",children:"Add Rider"})]})}),e.jsx(le,{children:rs.map((s,t)=>e.jsxs(z,{children:[e.jsx(r,{children:t+1}),e.jsx(r,{children:s.name}),e.jsx(r,{children:s.surname}),e.jsx(r,{children:s.email}),e.jsx(r,{children:s.contact}),e.jsx(r,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(r,{children:s.employeeId?s.employeeId:e.jsx($,{color:"warning",children:"Not Provide"})}),e.jsx(r,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language==="es"?"Spanish":s.language}),e.jsx(r,{children:s.groups.map((a,u)=>e.jsx("div",{children:a.name},u))}),e.jsx(r,{children:s.id===es?e.jsx(j,{size:"sm",onClick:()=>Ee(ye,s.id,Z),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Assigned"}):e.jsx(j,{size:"sm",onClick:()=>Ee(ye,s.id,Z),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},t))})]})]}),e.jsx(I,{})]}),e.jsxs(D,{alignment:"center",visible:q,scrollable:!0,size:"lg",onClose:()=>J(!1),children:[e.jsx(A,{closeButton:!0,children:e.jsx(S,{children:"Rider Information"})}),e.jsx(v,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:ze?e.jsx(U,{}):e.jsx("div",{children:e.jsxs(Es,{className:"mb-3",children:[e.jsx(ce,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(ie,{sm:10,children:e.jsx(O,{type:"text",defaultValue:(Fe=L.accepted)==null?void 0:Fe.name,readOnly:!0,plainText:!0})}),e.jsx(ce,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(ie,{sm:10,children:e.jsx(O,{type:"text",defaultValue:(_e=L.accepted)==null?void 0:_e.email,readOnly:!0,plainText:!0})}),e.jsx(ce,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(ie,{sm:10,children:e.jsx(O,{type:"text",defaultValue:(Ge=L.accepted)==null?void 0:Ge.contact,readOnly:!0,plainText:!0})})]})})}),e.jsx(I,{children:e.jsx(j,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{var s;return Ne((s=L.accepted)==null?void 0:s.id,Z,L.id)},children:"Change"})})]}),e.jsxs(D,{visible:de,scrollable:!0,size:"xl",onClose:()=>ue(!1),children:[e.jsx(A,{closeButton:!0,children:e.jsx(S,{children:"Customers Information"})}),e.jsx(v,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:ze?e.jsx(U,{}):_.length===0?e.jsx("h3",{children:"No data to show"}):e.jsxs(ae,{children:[e.jsx(oe,{children:e.jsxs(z,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"Order No"}),e.jsx(l,{scope:"col",children:"Name"}),e.jsx(l,{scope:"col",children:"surname"}),e.jsx(l,{scope:"col",children:"email"}),e.jsx(l,{scope:"col",children:"contact"}),e.jsx(l,{scope:"col",children:"Total"}),e.jsx(l,{scope:"col",children:"Latitude"}),e.jsx(l,{scope:"col",children:"Longitude"})]})}),e.jsx(le,{children:_==null?void 0:_.map((s,t)=>{var a,u,c,h,g,B;return e.jsxs(z,{children:[e.jsx(r,{children:t+1}),e.jsx(r,{children:(a=s==null?void 0:s.order)==null?void 0:a.no}),e.jsx(r,{children:(u=s==null?void 0:s.customer)==null?void 0:u.name}),e.jsx(r,{children:(c=s==null?void 0:s.customer)==null?void 0:c.surname}),e.jsx(r,{children:(h=s==null?void 0:s.customer)==null?void 0:h.email}),e.jsx(r,{children:(g=s==null?void 0:s.customer)==null?void 0:g.contact}),e.jsx(r,{children:(((B=s==null?void 0:s.order)==null?void 0:B.total)??0).toFixed(2)}),e.jsx(r,{children:s==null?void 0:s.lat}),e.jsx(r,{children:s==null?void 0:s.lng})]},t)})})]})}),e.jsx(I,{})]}),e.jsxs(D,{alignment:"center",visible:De,scrollable:!0,size:"xl",onClose:()=>Ae(!1),children:[e.jsxs(A,{closeButton:!0,children:[e.jsx(S,{children:"Location Information"}),e.jsx(S,{})]}),e.jsxs(v,{children:[e.jsxs(te,{className:"bg-body-tertiary",children:[e.jsxs("a",{style:{fontSize:19,marginLeft:760},children:["Distance : ",ve.distance,"m"]}),"  ",e.jsxs("a",{style:{fontSize:19,marginRight:20},children:["Duration : ",ve.duration,"min"]})]}),e.jsxs(Fs,{dragging:!0,center:[40.85631,14.24641],zoom:13,scrollWheelZoom:!0,style:{height:"500px",width:"100%"},children:[e.jsx(_s,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),(Ue=Me.customers)==null?void 0:Ue.map((s,t)=>e.jsx(He,{position:[s.lat,s.lng],icon:zs,onClick:Q,children:e.jsxs(Ve,{children:[e.jsx(C,{icon:re,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:s.address})]})},t)),($e=Me.market)==null?void 0:$e.map((s,t)=>e.jsx(He,{position:[s.lat,s.lng],icon:Ds,onClick:Q,children:e.jsxs(Ve,{children:[e.jsx(C,{icon:re,size:"lg",style:{marginLeft:"10px"}})," ",e.jsx("span",{children:s.address})]})},t))]})]}),e.jsx(I,{})]}),e.jsxs(D,{alignment:"center",visible:Le,scrollable:!0,size:"sm",onClose:()=>G(!1),children:[e.jsx(A,{closeButton:!0,children:e.jsx(S,{children:"Confirmation"})}),e.jsxs(v,{children:[e.jsx("a",{children:"Are you sure you want to cancel this solo courier order?"}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(j,{onClick:()=>vs(xs),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(j,{onClick:()=>G(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]})]})};export{nt as default};
