import{y as As,r as a,A as n,j as e,h as B,m as k}from"./index-BzWpTyRP.js";import{a as x}from"./axios-Cm0UX6qg.js";import{B as j}from"./config-HOLfLxHr.js";import{b as ws,a as h}from"./CContainer-BohUAxSl.js";import{C as Se}from"./CNavbar-u7Q3iHwm.js";import{C as vs}from"./CFormInput-ztrVIr0j.js";import{C as M,a as b,b as u,c as o,d as S,e as r}from"./CTable-C62CAHLk.js";import{c as X,C as Ds,a as Pe,b as Ae,d as we,e as P}from"./DefaultLayout-Blmcm6y8.js";import{c as Ns}from"./cil-view-module-CSS15w8m.js";import{c as Fs}from"./cil-trash-CBbKHhHb.js";import{C as ve,a as p}from"./CPaginationItem-CQqCx2lq.js";import{C as A,a as w,b as v,c as D}from"./CModalTitle-BEoCtNfZ.js";import{C as E}from"./CModalFooter-COP8gJvv.js";import{C as Ts}from"./CCardImage-DI-tOl1o.js";import"./CFormLabel-BSwA839n.js";const lt=()=>{const[{user:f,token:d},i]=As(),[De,y]=a.useState(!1),[Z,$]=a.useState(0),[ee,zs]=a.useState(0),[Ne,se]=a.useState(!0),[g,Fe]=a.useState(""),[Te,te]=a.useState(g),[ze,Ie]=a.useState(0),[N,_]=a.useState(1),[R,Is]=a.useState(),[ae,Le]=a.useState([]),[Be,V]=a.useState(!1);a.useState(!1);const[Ee,m]=a.useState(!1);a.useState("");const[Ls,$e]=a.useState("");a.useState("");const[_e,Re]=a.useState([]),[F,Ve]=a.useState([]),[He,le]=a.useState(!1),[Qe,H]=a.useState(!1),[Oe,T]=a.useState(!1),[re,oe]=a.useState(!1),[ie,ne]=a.useState(""),[Ye,Q]=a.useState("All Cities"),[Ue,O]=a.useState("All Chains"),[Bs,ce]=a.useState(""),[Es,de]=a.useState("All Cities"),[ue,Y]=a.useState(""),[he,U]=a.useState(""),[$s,ge]=a.useState("All Chains"),[_s,xe]=a.useState("");a.useState([]);const[Rs,qe]=a.useState([]),[Ge,Je]=a.useState([]),[Ke,je]=a.useState(!1),[fe,We]=a.useState([]),[Xe,Ze]=a.useState(""),[Vs,es]=a.useState(""),[ye,ss]=a.useState({flayerId:""}),[ts,pe]=a.useState(!1),[Hs,as]=a.useState(""),[me,Ce]=a.useState([]),[ls,q]=a.useState(!1),[rs,ke]=a.useState(!0),[z,G]=a.useState(0),[os,is]=a.useState(0),[I,J]=a.useState(1);a.useEffect(()=>{const s=setTimeout(()=>{i({type:n,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),V(!1)},2e4);return f&&d&&C(0,s),()=>{clearTimeout(s)}},[f,d,Te]),a.useEffect(()=>{const s=setTimeout(()=>{(g.length>=3||g.length===0)&&te(g)},500);return()=>{clearTimeout(s)}},[g]);const C=(s,t)=>{V(!0),x.get(j+`flayers/all/${s}?search=${g}`,{headers:{Authorization:`Bearer ${d}`}}).then(l=>{l.status===200?(Le(l.data.list),Ie(l.data.count),V(!1),clearTimeout(t),l.data.list.length<20?se(!0):l.data.list.length>19&&se(!1),console.log(l.data.list.length)):l.status===500&&i({type:n,payload:{status:!0,title:"Category loading error",message:l.data.message}})}).catch(l=>{console.error("Error:",l)})},ns=()=>{_(N+1);const s=ee+20;$(s),C(s,R)},cs=()=>{_(N-1);const s=ee-20;console.log(s),$(s),C(s,R)},ds=s=>{_(s);const t=(s-1)*20;$(t),C(t,R)},us=()=>{const s=Math.ceil(ze/20),t=[];for(let c=1;c<=s;c++)t.push(c);const l=Math.max(N-2,1),W=Math.min(l+4,s);return t.slice(l-1,W).map(c=>e.jsx(p,{active:N===c,onClick:()=>ds(c),children:c},c))},hs=(s,t)=>{m(!0),Re(s),es(t)},gs=s=>{s?(le(!0),xs(s)):i({type:n,payload:{status:!0,title:"Error!",message:"Flayers Product Loading error, Please Check the input fields",color:"warning"}})},xs=s=>{s?(console.log("id",s),d&&(y(!0),x.get(j+"flayer/products/"+s,{headers:{Authorization:`Bearer ${d}`}}).then(t=>{t.status===200?(Ve(t.data),y(!1)):t.status===204?(i({type:n,payload:{status:!0,title:"Flayers Product Loading error",message:"Flayers Product Loading error",color:"warning"}}),y(!1)):t.status===404?(i({type:n,payload:{status:!0,title:"Flayers Product Loading error",message:"Flayers Product Loading error",color:"warning"}}),y(!1)):t.status===500&&(i({type:n,payload:{status:!0,title:"Flayers Product Loading error",message:"Flayers Product Loading error",color:"warning"}}),y(!1))}).catch(t=>{console.error("Error:",t),y(!1)}))):i({type:n,payload:{status:!0,title:"Missing!",message:"Flayers Product Loading error",color:"warning"}})},Me=(s,t)=>{T(!0),oe(t),ne(s)},js=()=>{const s={status:re};console.log(ie,s),f&&d&&x.patch(j+"assistant/flayer/status/"+ie,s,{headers:{Authorization:`Bearer ${d}`}}).then(t=>{t.status===200?(console.log("updated"),T(!1),oe(""),ne(""),C(0,null),i({type:n,payload:{status:!0,title:"Flayer status update",message:"Flayer status updated successfully",color:"success"}})):t.status===203?i({type:n,payload:{status:!0,title:"Flayer status update error",message:t.data.message}}):t.status===204?i({type:n,payload:{status:!0,title:"Flayer status update error",message:t.data.message}}):t.status===500&&i({type:n,payload:{status:!0,title:"Flayer status update error",message:t.data.message}})}).catch(t=>{console.error(t)})},be=(s,t,l)=>{l==="view"?s==="all"?(xe(""),ge("All Chains")):(xe(s),ge(t)):l==="modal"&&(s==="all"?(U(""),O("All Chains")):(U(s),O(t)))},K=(s,t)=>{t==="view"?s==="all"?(ce(""),de("All Cities")):(ce(s),de(s)):t==="modal"&&(s==="all"?(Y(""),Q("All Cities")):(Y(s),Q(s)))},fs=()=>{d&&x.get(j+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(qe(s.data),Je(s.data)):s.status===500&&i({type:n,payload:{status:!0,title:"Chain Loading error",message:s.data.message}})}).catch(s=>{console.error("Error: ",s)})};a.useEffect(()=>{f&&d&&L(0)},[he,ue,f]);const L=(s,t)=>{je(!0),x.get(j+`assistant/market/locations/${s}?brand=${he}&city=${ue}`,{headers:{Authorization:`Bearer ${d}`}}).then(l=>{l.status===200?(We(l.data.data),is(l.data.count),je(!1),l.data.data.length<20?ke(!0):l.data.data.length>19&&ke(!1)):l.status===500&&i({type:n,payload:{status:!0,title:"Market Loading error",message:l.data.message}})}).catch(l=>{console.error("Error: ",l)})},ys=()=>{J(I+1);const s=z+20;G(s),L(s)},ps=()=>{J(I-1);const s=z-20;console.log(s),G(s),L(s)},ms=s=>{J(s);const t=(s-1)*20;G(t),L(t)},Cs=()=>{const s=Math.ceil(os/20),t=[];for(let c=1;c<=s;c++)t.push(c);const l=Math.max(I-2,1),W=Math.min(l+4,s);return t.slice(l-1,W).map(c=>e.jsx(p,{active:I===c,onClick:()=>ms(c),children:c},c))},ks=(s,t)=>{m(!1),H(!0),Ze(t),fs(),console.log(s),ss({flayerId:s})},Ms=s=>{const t=ye;s&&ye!==null?f&&d&&(console.log("data",t),x.patch(j+"flayer/market/update/"+s,t,{headers:{Authorization:`Bearer ${d}`}}).then(l=>{l.status===200?(console.log("updated"),i({type:n,payload:{status:!0,title:"Flayer market update",message:"Flayer market updated successfully",color:"success"}}),H(!1),m(!0)):l.status===203?i({type:n,payload:{status:!0,title:"Flayer market update error",message:l.data.message}}):l.status===204?i({type:n,payload:{status:!0,title:"Flayer market update error",message:l.data.message}}):l.status===500&&i({type:n,payload:{status:!0,title:"Flayer market update error",message:l.data.message}})}).catch(l=>{console.error(l)})):i({type:n,payload:{status:!0,title:"Missing!",message:"Flayers Loading error",color:"warning"}})},bs=s=>{console.log("id",s),pe(!0),as(s),Ss(s)},Ss=s=>{q(!0),x.get(j+`flayer/market/assign/${s}`,{headers:{Authorization:`Bearer ${d}`}}).then(t=>{t.status===200?(t.data.length!==0&&(Ce(t.data),console.log("data market")),q(!1)):t.status===500&&i({type:n,payload:{status:!0,title:"Market Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})};return e.jsxs(ws,{children:[e.jsx(Se,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:e.jsx(vs,{type:"text",placeholder:"Search by Id, end date and retailer ",style:{width:450,marginRight:"30%"},value:g,onChange:s=>Fe(s.target.value)})}),Be?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(B,{style:{marginTop:"15%"}})}):e.jsxs(M,{children:[e.jsx(b,{children:e.jsxs(u,{children:[e.jsx(o,{scope:"col",children:"#"}),e.jsx(o,{scope:"col",children:"Id"}),e.jsx(o,{scope:"col",children:"End Date"}),e.jsx(o,{scope:"col",children:"Retailer"}),e.jsx(o,{scope:"col",children:"Markets"}),e.jsx(o,{scope:"col",children:"Products"}),e.jsx(o,{scope:"col",children:"Assigned Market"}),e.jsx(o,{scope:"col",children:"Action"})]})}),e.jsx(S,{children:ae.length===0?e.jsx(u,{children:e.jsx(r,{colSpan:"8",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):ae.map((s,t)=>e.jsxs(u,{children:[e.jsx(r,{children:Z+t+1}),e.jsx(r,{children:s.flayer_id}),e.jsx(r,{children:s.endDate}),e.jsx(r,{children:s.retailer}),e.jsx(r,{children:e.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{hs(s.stores,s._id)},children:e.jsx(k,{icon:X,size:"lg",style:{color:"white"}})})}),e.jsx(r,{children:e.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{gs(s._id)},children:e.jsx(k,{icon:Ns,size:"lg",style:{color:"white"}})})}),e.jsx(r,{children:e.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{bs(s._id)},children:e.jsx(k,{icon:X,size:"lg",style:{color:"white"}})})}),e.jsx(r,{children:s.status===!0?e.jsxs(h,{size:"sm",onClick:()=>{Me(s._id,!1)},style:{backgroundColor:"#ff4d4d",color:"white"},children:[" ",e.jsx(k,{icon:Fs,size:"lg",style:{color:"white"}})]}):e.jsx(h,{size:"sm",onClick:()=>{Me(s._id,!0)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Activate"})})]},t))})]}),e.jsxs(ve,{"aria-label":"Page navigation example",children:[e.jsx(p,{disabled:Z<=0,onClick:cs,children:"Previous"}),us(),e.jsx(p,{disabled:Ne===!0,onClick:ns,children:"Next"})]}),e.jsxs(A,{alignment:"center",visible:ts,scrollable:!0,size:"lg",onClose:()=>{Ce([]),pe(!1)},children:[e.jsx(w,{closeButton:!0,children:e.jsx(v,{children:"All Assign Markets details"})}),e.jsx(D,{children:ls?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(B,{style:{marginTop:"15%"}})}):e.jsxs(M,{children:[e.jsx(b,{children:e.jsxs(u,{children:[e.jsx(o,{scope:"col",children:"#"}),e.jsx(o,{scope:"col",children:"Chain Name"}),e.jsx(o,{scope:"col",children:"Address"}),e.jsx(o,{scope:"col",children:"City"})]})}),e.jsx(S,{children:me.length===0?e.jsx(u,{children:e.jsx(r,{colSpan:"4",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):me.map((s,t)=>e.jsxs(u,{children:[e.jsx(r,{children:t+1}),e.jsx(r,{children:s.chain.name}),e.jsx(r,{children:s.address}),e.jsx(r,{children:s.city})]},t))})]})}),e.jsx(E,{})]}),e.jsxs(A,{alignment:"center",visible:Ee,scrollable:!0,size:"lg",onClose:()=>{m(!1),$e("")},children:[e.jsx(w,{closeButton:!0,children:e.jsx(v,{children:"Markets"})}),e.jsx(D,{children:e.jsxs(M,{children:[e.jsx(b,{children:e.jsxs(u,{children:[e.jsx(o,{scope:"col",children:"#"}),e.jsx(o,{scope:"col",children:"Name"}),e.jsx(o,{scope:"col",children:"Market"})]})}),e.jsx(S,{children:_e.map((s,t)=>e.jsxs(u,{children:[e.jsx(r,{children:t+1}),e.jsx(r,{children:s.address}),e.jsx(r,{children:e.jsx(h,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{ks(s._id,s.market)},children:e.jsx(k,{icon:X,size:"lg",style:{color:"white"}})})})]},t))})]})}),e.jsx(E,{})]}),e.jsxs(A,{visible:He,scrollable:!0,size:"xl",onClose:()=>le(!1),children:[e.jsx(w,{closeButton:!0,children:e.jsx(v,{children:"Flayers Products Information"})}),e.jsx(D,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:De?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(B,{style:{marginTop:"15%"}})}):e.jsxs(M,{children:[e.jsx(b,{children:e.jsxs(u,{children:[e.jsx(o,{scope:"col",children:"#"}),e.jsx(o,{scope:"col",children:"Photo"}),e.jsx(o,{scope:"col",children:"Name"}),e.jsx(o,{scope:"col",children:"Price"}),e.jsx(o,{scope:"col",children:"Description"})]})}),e.jsx(S,{children:F.length===0?e.jsx(u,{children:e.jsx(r,{colSpan:"5",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):F==null?void 0:F.map((s,t)=>e.jsxs(u,{children:[e.jsx(r,{children:t+1}),e.jsx(r,{children:e.jsx(Ts,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.image})}),e.jsx(r,{children:s.name}),e.jsx(r,{children:s.price}),e.jsx(r,{children:s.description})]},t))})]})}),e.jsx(E,{})]}),e.jsxs(A,{alignment:"center",visible:Oe,scrollable:!0,size:"sm",onClose:()=>T(!1),children:[e.jsx(w,{closeButton:!1,children:e.jsx(v,{children:"Confirmation"})}),e.jsxs(D,{children:[e.jsxs("a",{children:["Are you sure you want to ",re?"activate":"deactivate"," this flayer?"]}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(h,{onClick:()=>{js()},style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(h,{onClick:()=>{T(!1)},style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(A,{visible:Qe,scrollable:!0,size:"xl",onClose:()=>{H(!1),m(!0),O("All Chains"),Q("All Cities"),U(""),Y("")},children:[e.jsx(w,{closeButton:!0,children:e.jsx(v,{children:"Market assign view"})}),e.jsxs(D,{children:[e.jsx(Ds,{style:{marginLeft:"54%"},color:"secondary",children:"Filter by"}),e.jsxs(Pe,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(Ae,{style:{color:"white"},children:Ye}),e.jsxs(we,{children:[e.jsx(P,{onClick:()=>K("all","modal"),children:"All"}),e.jsx(P,{onClick:()=>K("Milano","modal"),children:"Milano"}),e.jsx(P,{onClick:()=>K("Napoli","modal"),children:"Napoli"})]})]}),e.jsxs(Pe,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d",color:"white"},children:[e.jsx(Ae,{style:{color:"white"},children:Ue}),e.jsxs(we,{children:[e.jsx(P,{onClick:()=>be("all",null,"modal"),children:"All"}),Ge.map((s,t)=>e.jsx(P,{onClick:()=>be(s.id,s.name,"modal"),children:s.name},t))]})]}),e.jsx(Se,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),Ke?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(B,{style:{marginTop:"15%"}})}):e.jsxs(M,{children:[e.jsx(b,{children:e.jsxs(u,{children:[e.jsx(o,{scope:"col",children:"#"}),e.jsx(o,{scope:"col",children:"Name"}),e.jsx(o,{scope:"col",children:"Address"}),e.jsx(o,{scope:"col",children:"City"}),e.jsx(o,{scope:"col",children:"Assign Market"})]})}),e.jsx(S,{children:fe.length===0?e.jsx(u,{children:e.jsx(r,{colSpan:"5",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):fe.map((s,t)=>e.jsxs(u,{children:[e.jsx(r,{children:z+t+1}),e.jsx(r,{children:s.chain.name}),e.jsx(r,{children:s.address}),e.jsx(r,{children:s.city}),e.jsx(r,{children:Xe===s._id?e.jsx(h,{size:"sm",onClick:()=>{},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Assigned"}):e.jsx(h,{size:"sm",onClick:()=>{Ms(s._id)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Add"})})]},t))})]}),e.jsx(E,{children:e.jsxs(ve,{"aria-label":"Page navigation example",children:[e.jsx(p,{disabled:z<=0,onClick:ps,children:"Previous"}),Cs(),e.jsx(p,{disabled:rs===!0,onClick:ys,children:"Next"})]})})]})]})]})};export{lt as default};
