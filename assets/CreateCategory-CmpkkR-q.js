import{y as lt,r as s,A as n,j as e,h as W,m as I,L as nt}from"./index-Dr2bAMPU.js";import{a as h}from"./axios-Cm0UX6qg.js";import{B as C}from"./config-HOLfLxHr.js";import{b as ct,a as p}from"./CContainer-u87GNtez.js";import{C as xe,a as q,b as G,d as J,e as x,c as ye}from"./DefaultLayout-B2Nh7q8u.js";import{C as it}from"./CNavbar-B7PVcNkl.js";import{C as K,a as O,b as y,c as r,d as Q,e as c}from"./CTable-Bfn_R52F.js";import{C as me,a as je,b as Se,c as be}from"./CModalTitle-DKRx84Yh.js";import{C as dt}from"./CRow-GyQAruCl.js";import{C as ke}from"./CCol-T9BjQEAn.js";import{C as Me}from"./CFormCheck-1xGMNiA0.js";import{C as Pe}from"./CModalFooter-op4IeWM8.js";import{C as ut}from"./CCardImage-CGnGRqbq.js";import{C as gt,a as X}from"./CPaginationItem-DP1tcg58.js";import"./CFormLabel-BwWU-nc5.js";var Ae=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M345.994,42.019,179.531,208.481A646.3,646.3,0,0,0,25.325,456.521a24.845,24.845,0,0,0,6,25.708l.087.087a24.84,24.84,0,0,0,17.611,7.342,25.172,25.172,0,0,0,8.1-1.344,646.283,646.283,0,0,0,248.04-154.207L471.62,167.646A88.831,88.831,0,0,0,345.994,42.019ZM282.531,311.48A614.445,614.445,0,0,1,60.419,453.221,614.435,614.435,0,0,1,202.158,231.108l99.162-99.161,80.372,80.372ZM448.993,145.019l-44.674,44.673L323.947,109.32l44.674-44.674a56.832,56.832,0,1,1,80.372,80.373Z' class='ci-primary'/>"];const Et=()=>{const[{user:m,token:i},l]=lt(),[De,d]=s.useState(!1),[we,Y]=s.useState(!1),[ze,ee]=s.useState(!1),[te,ht]=s.useState(0),[Ct,ae]=s.useState(!0),[Le,se]=s.useState(!0),[Ie,Ne]=s.useState([]),[ve,N]=s.useState("All Chains"),[v,b]=s.useState("All market"),[ft,B]=s.useState(""),[oe,k]=s.useState(""),[Be,E]=s.useState([]);s.useState(""),s.useState(!1),s.useState(""),s.useState(""),s.useState(""),s.useState("NAME"),s.useState(!1),s.useState("");const[$,re]=s.useState([]),[U,le]=s.useState("Selected Market ");let[T,ne]=s.useState([]),[Ee,$e]=s.useState([]);const[Ue,R]=s.useState(!1),[pt,F]=s.useState("All Main Categories"),[xt,V]=s.useState(""),[Te,Re]=s.useState([]),[Fe,j]=s.useState(""),[yt,ce]=s.useState("Select Main Categories"),[Ve,M]=s.useState(""),[He,ie]=s.useState([]),[u,P]=s.useState({mainCategory:"",subCategory:"",category:""}),[H,mt]=s.useState([]),[Ze,de]=s.useState([]),[_e,ue]=s.useState(0),[A,D]=s.useState(1),[Z,We]=s.useState(),[qe,ge]=s.useState(!1),[Ge,f]=s.useState(!1),[w,z]=s.useState(0);s.useEffect(()=>{m&&i&&(oe===""?(ee(!0),Je(),console.log("ok")):(ee(!1),console.log("no")),console.log("all"))},[m,i,oe]),s.useEffect(()=>{i&&h.get(C+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?Ne(t.data):t.status===500&&l({type:n,payload:{status:!0,title:"Chain Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},[]),s.useEffect(()=>{i&&h.get(C+"product/categories",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?(console.log(t.data[1]),Re(t.data)):t.status===500&&l({type:n,payload:{status:!0,title:"Main Category Loading error",message:"Main Category loading error"}})}).catch(t=>{console.error("Error: ",t)})},[]);const Je=()=>{m&&i&&(Y(!0),h.get(C+"product/category/check/all",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?($e(t.data),Y(!1),console.log(t.data.length)):t.status===204?(l({type:n,payload:{status:!0,title:"Unregistered Categories error",message:t.data.message,color:"danger"}}),d(!1)):t.status===500&&(l({type:n,payload:{status:!0,title:"Unregistered Categories error",message:t.data.message,color:"danger"}}),d(!1))}).catch(t=>{console.error("Error:",t),d(!1)}))},Ke=t=>{h.get(C+`assistant/market/locations?brand=${t}`,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{a.status===200?(E(a.data.data),a.data.data.length<20?(ae(!0),console.log("ok")):a.data.data.length>19&&ae(!1)):a.status===500&&l({type:n,payload:{status:!0,title:"Market Loading error",message:a.data.message}})}).catch(a=>{console.error("Error: ",a)})},he=(t,a)=>{t==="all"?(B(""),N("All Chains"),k(""),b("All Markets"),E([])):(B(t),Ke(t),N(a),k(""),b("All Markets"))},_=(t,a)=>{t==="all"?(k(""),b("All Markets"),B(""),N("All Chains"),E([])):t==="select"?(re([]),le("Selected Market ")):(k(t),b(a),re([...$,{id:t,name:a}]),le(a))};s.useState(null),s.useState(null);const Oe=t=>{if(t.length>0){let a=t.map(o=>o.id);console.log(a),m&&i&&(d(!0),h.get(C+`product/category/check?markets=${a}`,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{o.status===200?(ne(o.data),d(!1)):o.status===204?(l({type:n,payload:{status:!0,title:"Unregistered Categories error",message:o.data.message,color:"danger"}}),d(!1)):o.status===500&&(l({type:n,payload:{status:!0,title:"Unregistered Categories error",message:o.data.message,color:"danger"}}),d(!1))}).catch(o=>{console.error("Error:",o),d(!1)}))}else l({type:n,payload:{status:!0,title:"Select Market",message:"Please select the market to search",color:"warning"}}),d(!1)},Ce=t=>{console.log(t),H.push(t),P({...u,category:t}),R(!0)},Qe=()=>{u.mainCategory!==""&&u.subCategory!==""?(console.log(u),Xe(),R(!1),P({mainCategory:"",subCategory:"",category:""})):l({type:n,payload:{status:!0,title:"Check the fields",message:"Please select the Main and Sub Category",color:"warning"}})},Xe=()=>{if(u){let t={category:u};m&&i&&h.put(C+"product/add/category",t,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{if(a.status===200){l({type:n,payload:{status:!0,title:"Category Update",message:"Category update Success",color:"success"}}),console.log(T.length),console.log(H);const o=T.filter(S=>!H.some(pe=>pe.name===S.name));console.log(o.length),j(""),M(""),ne([...o])}else a.status===204?l({type:n,payload:{status:!0,title:"Category Update",message:"No category found",color:"danger"}}):a.status===500&&l({type:n,payload:{status:!0,title:"Category Update",message:"Category update error",color:"danger"}})}).catch(a=>{console.error("Error:",a)})}else l({type:n,payload:{status:!0,title:"Category Update",message:"Please Check the Fields!",color:"warning"}})},Ye=(t,a)=>{t==="all"?(V(""),F("All Main Categories"),j("")):(V(t),et(t),F(a),j(t),P({...u,mainCategory:t}))},et=t=>{i&&h.get(C+"product/categories/sub/"+t,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{a.status===200?ie(a.data):a.status===500&&l({type:n,payload:{status:!0,title:"Sub Category Loading",message:"Sub Category loading error"}})}).catch(a=>{console.error("Error: ",a)})},tt=(t,a)=>{t==="all"?(M(""),ce("Select Main Categories"),V(""),F("All Main Categories"),ie([]),j("")):(console.log("index",t),M(t),ce(a),P({...u,subCategory:t}))},fe=t=>{console.log(t),We(t.id),ge(!0),L(0,t.id)},L=(t,a)=>{f(!0),h.get(C+`product/unregistered/category/${t}?id=${a}`,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{o.status===200?(de(o.data.list),ue(o.data.count),f(!1),o.data.list.length<50?(se(!0),console.log("ok")):o.data.list.length>50&&se(!1)):o.status===203?(f(!1),l({type:n,payload:{status:!0,title:"product loading error error",message:o.data.message}})):o.status===204?(f(!1),l({type:n,payload:{status:!0,title:"No Products",message:"No products found in this market address",color:"info"}})):o.status===500&&(f(!1),l({type:n,payload:{status:!0,title:"product loading error error",message:o.data.message}}))}).catch(o=>{f(!1),console.error("Error:",o)})},at=()=>{D(A+1);const t=w+50;z(t),L(t,Z)},st=()=>{D(A-1);const t=w-50;console.log(t),z(t),L(t,Z)},ot=t=>{D(t);const a=(t-1)*50;z(a),L(a,Z)},rt=()=>{const t=Math.ceil(_e/50),a=[];for(let g=1;g<=t;g++)a.push(g);const o=Math.max(A-2,1),S=Math.min(o+4,t);return a.slice(o-1,S).map(g=>e.jsx(X,{active:A===g,onClick:()=>ot(g),children:g},g))};return e.jsxs(ct,{children:[e.jsx(xe,{style:{marginLeft:"0%"},color:"secondary",children:"Filter by"}),e.jsxs(q,{style:{marginLeft:"2%",width:"19%",backgroundColor:"#ff4d4d"},children:[e.jsx(G,{children:ve}),e.jsxs(J,{children:[e.jsx(x,{onClick:()=>he("all"),children:"All"}),Ie.map((t,a)=>e.jsx(x,{onClick:()=>he(t.id,t.name),children:t.name},a))]})]}),e.jsxs(q,{style:{marginLeft:"1%",width:"19%",backgroundColor:"#ff4d4d"},children:[e.jsx(G,{children:v.length>15?`${v.substring(0,15)}...`:v}),e.jsxs(J,{children:[e.jsx(x,{onClick:()=>_("all"),children:"Select the Chain"}),Be.map((t,a)=>e.jsx(x,{onClick:()=>_(t._id,t.address),children:e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("span",{children:t.address.substring(0,t.address.length/2)}),e.jsx("span",{children:t.address.substring(t.address.length/2)})]})},a))]})]}),e.jsx(xe,{style:{marginLeft:"4%"},color:"secondary",children:"Selected Markets"}),e.jsxs(q,{style:{marginLeft:"2%",width:"19%",backgroundColor:"#ff4d4d"},children:[e.jsx(G,{children:U.length>15?`${U.substring(0,15)}...`:U}),e.jsxs(J,{children:[e.jsx(x,{onClick:()=>_("select"),children:"Select the Chain"}),$.map((t,a)=>e.jsx(x,{children:e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("span",{children:t.name.substring(0,t.name.length/2)}),e.jsx("span",{children:t.name.substring(t.name.length/2)})]})},a))]})]}),e.jsx(p,{style:{marginLeft:"1%",backgroundColor:"#ff4d4d",color:"white",width:"19%"},onClick:()=>{Oe($)},children:"Search"}),e.jsx(it,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),ze?we?e.jsx(W,{}):e.jsxs(K,{children:[e.jsx(O,{children:e.jsxs(y,{children:[e.jsx(r,{scope:"col",children:"#"}),e.jsx(r,{scope:"col",children:"Category Name"}),e.jsx(r,{scope:"col",children:"Chain Name"}),e.jsx(r,{scope:"col",children:"Insert"}),e.jsx(r,{scope:"col",children:"Product"})]})}),e.jsx(Q,{children:Ee.map((t,a)=>e.jsxs(y,{children:[e.jsx(c,{children:te+a+1}),e.jsx(c,{children:t.name}),e.jsx(c,{}),e.jsx(c,{children:e.jsx(p,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{Ce(t)},children:e.jsx(I,{icon:Ae,size:"lg",style:{color:"white"}})})}),e.jsx(c,{children:e.jsx(p,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{fe(t)},children:e.jsx(I,{icon:ye,size:"lg",style:{color:"white"}})})})]},a))})]}):De?e.jsx(W,{}):e.jsxs(K,{children:[e.jsx(O,{children:e.jsxs(y,{children:[e.jsx(r,{scope:"col",children:"#"}),e.jsx(r,{scope:"col",children:"Category Name"}),e.jsx(r,{scope:"col",children:"Chain Name"}),e.jsx(r,{scope:"col",children:"Insert"}),e.jsx(r,{scope:"col",children:"Product"})]})}),e.jsx(Q,{children:T.map((t,a)=>e.jsxs(y,{children:[e.jsx(c,{children:te+a+1}),e.jsx(c,{children:t.name}),e.jsx(c,{children:t.chainName.map((o,S)=>e.jsxs("span",{children:[o," / "]},S))}),e.jsx(c,{children:e.jsx(p,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{Ce(t)},children:e.jsx(I,{icon:Ae,size:"lg",style:{color:"white"}})})}),e.jsx(c,{children:e.jsx(p,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{fe(t)},children:e.jsx(I,{icon:ye,size:"lg",style:{color:"white"}})})})]},a))})]}),e.jsxs(me,{alignment:"center",visible:Ue,scrollable:!0,size:"lg",onClose:()=>{j(""),M(""),R(!1)},children:[e.jsx(je,{closeButton:!0,children:e.jsx(Se,{children:"Add Category"})}),e.jsx(be,{children:e.jsxs(dt,{children:[e.jsxs(ke,{md:6,children:[e.jsx("a",{style:{fontSize:17,fontWeight:"bold"},children:"Select the Main Category"}),e.jsx("br",{}),e.jsx("br",{}),Te.map((t,a)=>e.jsx(Me,{onChange:()=>Ye(a,t),type:"radio",name:"mainCategoryRadio",id:`flexRadioDefault${a}`,label:t,checked:Fe===a},a))]}),e.jsxs(ke,{md:6,children:[e.jsx("a",{style:{fontSize:17,fontWeight:"bold"},children:"Select the Sub Category"}),e.jsx("br",{}),e.jsx("br",{}),He.map((t,a)=>e.jsx(Me,{onChange:()=>tt(a,t),checked:Ve===a,type:"radio",name:"subCategory",id:`flexRadioDefault2-${a}`,label:t},a))]})]})}),e.jsx(Pe,{children:e.jsx(p,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{Qe()},children:"Save"})})]}),e.jsxs(me,{alignment:"center",visible:qe,scrollable:!0,size:"xl",onClose:()=>{ge(!1),de([]),ue(0),D(1),z(0)},children:[e.jsx(je,{closeButton:!0,children:e.jsx(Se,{children:"View Products"})}),e.jsx(be,{children:Ge?e.jsx(W,{}):e.jsxs(K,{children:[e.jsx(O,{children:e.jsxs(y,{children:[e.jsx(r,{scope:"col",children:"#"}),e.jsx(r,{scope:"col",children:"Product Id"}),e.jsx(r,{scope:"col",children:"Photo"}),e.jsx(r,{scope:"col",children:"Name"}),e.jsx(r,{scope:"col",children:"Price"}),e.jsx(r,{scope:"col",children:"Brand"}),e.jsx(r,{scope:"col",children:"Chain"}),e.jsx(r,{scope:"col",children:"Market Address"})]})}),e.jsx(Q,{children:Ze.map((t,a)=>e.jsxs(y,{children:[e.jsx(c,{children:w+a+1}),e.jsx(c,{children:t.pid}),e.jsx(r,{onClick:()=>{},children:e.jsx(ut,{style:{width:"50px",height:"50px"},src:"https://api.zeuler.com/image/"+t.image})}),e.jsx(c,{children:t.name}),e.jsxs(c,{children:[t.price,e.jsx(nt,{to:""})]}),e.jsx(c,{children:t.brand}),e.jsx(c,{children:t.chainName}),e.jsx(c,{children:t.marketAddress})]},a))})]})}),e.jsx(Pe,{children:e.jsxs(gt,{"aria-label":"Page navigation example",children:[e.jsx(X,{disabled:w<=0,onClick:st,children:"Previous"}),rt(),e.jsx(X,{disabled:Le===!0,onClick:at,children:"Next"})]})})]})]})};export{Et as default};
