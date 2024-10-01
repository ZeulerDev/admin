import{y as lt,r as s,A as n,j as e,h as V,m as z,L as nt}from"./index-vIOSoMUu.js";import{a as h}from"./axios-Cm0UX6qg.js";import{B as C}from"./config-HOLfLxHr.js";import{b as ct,a as f}from"./CContainer-DQqje6Yb.js";import{C as fe,a as H,b as Z,c as _,d as x,e as xe}from"./DefaultLayout-CKhc0dtY.js";import{C as it}from"./CNavbar-CKkucrSO.js";import{C as W,a as q,b as y,c as r,d as G,e as c}from"./CTable-CA_T2BdW.js";import{C as ye,a as me,b as je,c as Se}from"./CModalTitle-UWL2UZXd.js";import{C as dt}from"./CRow-H2ROWCgt.js";import{C as be}from"./CCol-BY5SYIt3.js";import{C as ke}from"./CFormCheck-XP3Pf_8K.js";import{C as Me}from"./CModalFooter-CdxMNKJi.js";import{C as ut}from"./CCardImage-DSZEHEI-.js";import{C as gt,a as J}from"./CPaginationItem-4rDKfmAB.js";import"./CFormLabel-B9P4EuKI.js";var Pe=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M345.994,42.019,179.531,208.481A646.3,646.3,0,0,0,25.325,456.521a24.845,24.845,0,0,0,6,25.708l.087.087a24.84,24.84,0,0,0,17.611,7.342,25.172,25.172,0,0,0,8.1-1.344,646.283,646.283,0,0,0,248.04-154.207L471.62,167.646A88.831,88.831,0,0,0,345.994,42.019ZM282.531,311.48A614.445,614.445,0,0,1,60.419,453.221,614.435,614.435,0,0,1,202.158,231.108l99.162-99.161,80.372,80.372ZM448.993,145.019l-44.674,44.673L323.947,109.32l44.674-44.674a56.832,56.832,0,1,1,80.372,80.373Z' class='ci-primary'/>"];const Et=()=>{const[{user:m,token:i},l]=lt(),[De,d]=s.useState(!1),[Ae,K]=s.useState(!1),[we,O]=s.useState(!1),[Q,ht]=s.useState(0),[Ct,X]=s.useState(!0),[ze,Y]=s.useState(!0),[Le,Ie]=s.useState([]),[Ne,L]=s.useState("All Chains"),[I,ee]=s.useState("All market"),[pt,N]=s.useState(""),[te,ae]=s.useState(""),[ve,se]=s.useState([]);s.useState(""),s.useState(!1),s.useState(""),s.useState(""),s.useState(""),s.useState("NAME"),s.useState(!1),s.useState("");const[v,oe]=s.useState([]),[B,Be]=s.useState("Selected markets");let[E,re]=s.useState([]),[Ee,$e]=s.useState([]);const[Ue,$]=s.useState(!1),[ft,U]=s.useState("All Main Categories"),[xt,T]=s.useState(""),[Te,Re]=s.useState([]),[Fe,j]=s.useState(""),[yt,le]=s.useState("Select Main Categories"),[Ve,b]=s.useState(""),[He,ne]=s.useState([]),[u,k]=s.useState({mainCategory:"",subCategory:"",category:""}),[R,mt]=s.useState([]),[Ze,ce]=s.useState([]),[_e,ie]=s.useState(0),[M,P]=s.useState(1),[de,We]=s.useState(),[qe,ue]=s.useState(!1),[Ge,p]=s.useState(!1),[D,A]=s.useState(0);s.useEffect(()=>{m&&i&&(te===""?(O(!0),Je(),console.log("ok")):(O(!1),console.log("no")),console.log("all"))},[m,i,te]),s.useEffect(()=>{i&&h.get(C+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?Ie(t.data):t.status===500&&l({type:n,payload:{status:!0,title:"Chain Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},[]),s.useEffect(()=>{i&&h.get(C+"product/categories",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?(console.log(t.data[1]),Re(t.data)):t.status===500&&l({type:n,payload:{status:!0,title:"Main Category Loading error",message:"Main Category loading error"}})}).catch(t=>{console.error("Error: ",t)})},[]);const Je=()=>{m&&i&&(K(!0),h.get(C+"product/category/check/all",{headers:{Authorization:`Bearer ${i}`}}).then(t=>{t.status===200?($e(t.data),K(!1),console.log(t.data.length)):t.status===204?(l({type:n,payload:{status:!0,title:"Unregistered Categories error",message:t.data.message,color:"danger"}}),d(!1)):t.status===500&&(l({type:n,payload:{status:!0,title:"Unregistered Categories error",message:t.data.message,color:"danger"}}),d(!1))}).catch(t=>{console.error("Error:",t),d(!1)}))},Ke=t=>{h.get(C+`assistant/market/locations?brand=${t}`,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{a.status===200?(se(a.data.data),a.data.data.length<20?(X(!0),console.log("ok")):a.data.data.length>19&&X(!1)):a.status===500&&l({type:n,payload:{status:!0,title:"Market Loading error",message:a.data.message}})}).catch(a=>{console.error("Error: ",a)})},ge=(t,a)=>{t==="all"?(N(""),L("All Chains")):(N(t),Ke(t),L(a))},F=(t,a)=>{t==="all"?(ae(""),ee("All Markets"),N(""),L("All Chains"),se([]),oe([])):(ae(t),ee(a),oe([...v,{id:t,name:a}]),Be(a))},Oe=()=>{P(M+1);const t=D+50;A(t),w(t,de)},Qe=()=>{P(M-1);const t=D-50;console.log(t),A(t),w(t,de)},Xe=t=>{P(t);const a=(t-1)*50;A(a),w(a,!0)},Ye=()=>{const t=Math.ceil(_e/50),a=[];for(let g=1;g<=t;g++)a.push(g);const o=Math.max(M-2,1),S=Math.min(o+4,t);return a.slice(o-1,S).map(g=>e.jsx(J,{active:M===g,onClick:()=>Xe(g),children:g},g))};s.useState(null),s.useState(null);const et=t=>{if(t.length>0){let a=t.map(o=>o.id);console.log(a),m&&i&&(d(!0),h.get(C+`product/category/check?markets=${a}`,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{o.status===200?(re(o.data),d(!1)):o.status===204?(l({type:n,payload:{status:!0,title:"Unregistered Categories error",message:o.data.message,color:"danger"}}),d(!1)):o.status===500&&(l({type:n,payload:{status:!0,title:"Unregistered Categories error",message:o.data.message,color:"danger"}}),d(!1))}).catch(o=>{console.error("Error:",o),d(!1)}))}else l({type:n,payload:{status:!0,title:"Select Market",message:"Please select the market to search",color:"warning"}}),d(!1)},he=t=>{console.log(t),R.push(t),k({...u,category:t}),$(!0)},tt=()=>{u.mainCategory!==""&&u.subCategory!==""?(console.log(u),at(),$(!1),k({mainCategory:"",subCategory:"",category:""})):l({type:n,payload:{status:!0,title:"Check the fields",message:"Please select the Main and Sub Category",color:"warning"}})},at=()=>{if(u){let t={category:u};m&&i&&h.put(C+"product/add/category",t,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{if(a.status===200){l({type:n,payload:{status:!0,title:"Category Update",message:"Category update Success",color:"success"}}),console.log(E.length),console.log(R);const o=E.filter(S=>!R.some(pe=>pe.name===S.name));console.log(o.length),j(""),b(""),re([...o])}else a.status===204?l({type:n,payload:{status:!0,title:"Category Update",message:"No category found",color:"danger"}}):a.status===500&&l({type:n,payload:{status:!0,title:"Category Update",message:"Category update error",color:"danger"}})}).catch(a=>{console.error("Error:",a)})}else l({type:n,payload:{status:!0,title:"Category Update",message:"Please Check the Fields!",color:"warning"}})},st=(t,a)=>{t==="all"?(T(""),U("All Main Categories"),j("")):(T(t),ot(t),U(a),j(t),k({...u,mainCategory:t}))},ot=t=>{i&&h.get(C+"product/categories/sub/"+t,{headers:{Authorization:`Bearer ${i}`}}).then(a=>{a.status===200?ne(a.data):a.status===500&&l({type:n,payload:{status:!0,title:"Sub Category Loading",message:"Sub Category loading error"}})}).catch(a=>{console.error("Error: ",a)})},rt=(t,a)=>{t==="all"?(b(""),le("Select Main Categories"),T(""),U("All Main Categories"),ne([]),j("")):(console.log("index",t),b(t),le(a),k({...u,subCategory:t}))},Ce=t=>{console.log(t),We(t.id),ue(!0),w(0,t.id)},w=(t,a)=>{p(!0),h.get(C+`product/unregistered/category/${t}?id=${a}`,{headers:{Authorization:`Bearer ${i}`}}).then(o=>{o.status===200?(ce(o.data.list),console.log(o.data.list.length),ie(o.data.count),p(!1),o.data.list.length<50?(Y(!0),console.log("ok")):o.data.list.length>50&&Y(!1)):o.status===203?(p(!1),l({type:n,payload:{status:!0,title:"product loading error error",message:o.data.message}})):o.status===204?(p(!1),l({type:n,payload:{status:!0,title:"No Products",message:"No products found in this market address",color:"info"}})):o.status===500&&(p(!1),l({type:n,payload:{status:!0,title:"product loading error error",message:o.data.message}}))}).catch(o=>{p(!1),console.error("Error:",o)})};return e.jsxs(ct,{children:[e.jsx(fe,{style:{marginLeft:"0%"},color:"secondary",children:"Filter by"}),e.jsxs(H,{style:{marginLeft:"2%",width:"19%",backgroundColor:"#ff4d4d"},children:[e.jsx(Z,{children:Ne}),e.jsxs(_,{children:[e.jsx(x,{onClick:()=>ge("all"),children:"All"}),Le.map((t,a)=>e.jsx(x,{onClick:()=>ge(t.id,t.name),children:t.name},a))]})]}),e.jsxs(H,{style:{marginLeft:"1%",width:"19%",backgroundColor:"#ff4d4d"},children:[e.jsx(Z,{children:I.length>15?`${I.substring(0,15)}...`:I}),e.jsxs(_,{children:[e.jsx(x,{onClick:()=>F("all"),children:"Select the Chain"}),ve.map((t,a)=>e.jsx(x,{onClick:()=>F(t._id,t.address),children:e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("span",{children:t.address.substring(0,t.address.length/2)}),e.jsx("span",{children:t.address.substring(t.address.length/2)})]})},a))]})]}),e.jsx(fe,{style:{marginLeft:"4%"},color:"secondary",children:"Selected Markets"}),e.jsxs(H,{style:{marginLeft:"2%",width:"19%",backgroundColor:"#ff4d4d"},children:[e.jsx(Z,{children:B.length>15?`${B.substring(0,15)}...`:B}),e.jsxs(_,{children:[e.jsx(x,{onClick:()=>F("all"),children:"Select the Chain"}),v.map((t,a)=>e.jsx(x,{children:e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("span",{children:t.name.substring(0,t.name.length/2)}),e.jsx("span",{children:t.name.substring(t.name.length/2)})]})},a))]})]}),e.jsx(f,{style:{marginLeft:"1%",backgroundColor:"#ff4d4d",color:"white",width:"19%"},onClick:()=>{et(v)},children:"Search"}),e.jsx(it,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),we?Ae?e.jsx(V,{}):e.jsxs(W,{children:[e.jsx(q,{children:e.jsxs(y,{children:[e.jsx(r,{scope:"col",children:"#"}),e.jsx(r,{scope:"col",children:"Category Name"}),e.jsx(r,{scope:"col",children:"Chain Name"}),e.jsx(r,{scope:"col",children:"Insert"}),e.jsx(r,{scope:"col",children:"Product"})]})}),e.jsx(G,{children:Ee.map((t,a)=>e.jsxs(y,{children:[e.jsx(c,{children:Q+a+1}),e.jsx(c,{children:t.name}),e.jsx(c,{}),e.jsx(c,{children:e.jsx(f,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{he(t)},children:e.jsx(z,{icon:Pe,size:"lg",style:{color:"white"}})})}),e.jsx(c,{children:e.jsx(f,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{Ce(t)},children:e.jsx(z,{icon:xe,size:"lg",style:{color:"white"}})})})]},a))})]}):De?e.jsx(V,{}):e.jsxs(W,{children:[e.jsx(q,{children:e.jsxs(y,{children:[e.jsx(r,{scope:"col",children:"#"}),e.jsx(r,{scope:"col",children:"Category Name"}),e.jsx(r,{scope:"col",children:"Chain Name"}),e.jsx(r,{scope:"col",children:"Insert"}),e.jsx(r,{scope:"col",children:"Product"})]})}),e.jsx(G,{children:E.map((t,a)=>e.jsxs(y,{children:[e.jsx(c,{children:Q+a+1}),e.jsx(c,{children:t.name}),e.jsx(c,{children:t.chainName.map((o,S)=>e.jsxs("span",{children:[o," / "]},S))}),e.jsx(c,{children:e.jsx(f,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{he(t)},children:e.jsx(z,{icon:Pe,size:"lg",style:{color:"white"}})})}),e.jsx(c,{children:e.jsx(f,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{Ce(t)},children:e.jsx(z,{icon:xe,size:"lg",style:{color:"white"}})})})]},a))})]}),e.jsxs(ye,{alignment:"center",visible:Ue,scrollable:!0,size:"lg",onClose:()=>{j(""),b(""),$(!1)},children:[e.jsx(me,{closeButton:!0,children:e.jsx(je,{children:"Add Category"})}),e.jsx(Se,{children:e.jsxs(dt,{children:[e.jsxs(be,{md:6,children:[e.jsx("a",{style:{fontSize:17,fontWeight:"bold"},children:"Select the Main Category"}),e.jsx("br",{}),e.jsx("br",{}),Te.map((t,a)=>e.jsx(ke,{onChange:()=>st(a,t),type:"radio",name:"mainCategoryRadio",id:`flexRadioDefault${a}`,label:t,checked:Fe===a},a))]}),e.jsxs(be,{md:6,children:[e.jsx("a",{style:{fontSize:17,fontWeight:"bold"},children:"Select the Sub Category"}),e.jsx("br",{}),e.jsx("br",{}),He.map((t,a)=>e.jsx(ke,{onChange:()=>rt(a,t),checked:Ve===a,type:"radio",name:"subCategory",id:`flexRadioDefault2-${a}`,label:t},a))]})]})}),e.jsx(Me,{children:e.jsx(f,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{tt()},children:"Save"})})]}),e.jsxs(ye,{alignment:"center",visible:qe,scrollable:!0,size:"xl",onClose:()=>{ue(!1),ce([]),ie(0),P(1),A(0)},children:[e.jsx(me,{closeButton:!0,children:e.jsx(je,{children:"View Products"})}),e.jsx(Se,{children:Ge?e.jsx(V,{}):e.jsxs(W,{children:[e.jsx(q,{children:e.jsxs(y,{children:[e.jsx(r,{scope:"col",children:"#"}),e.jsx(r,{scope:"col",children:"Product Id"}),e.jsx(r,{scope:"col",children:"Photo"}),e.jsx(r,{scope:"col",children:"Name"}),e.jsx(r,{scope:"col",children:"Price"}),e.jsx(r,{scope:"col",children:"Brand"}),e.jsx(r,{scope:"col",children:"Chain"}),e.jsx(r,{scope:"col",children:"Market Address"})]})}),e.jsx(G,{children:Ze.map((t,a)=>e.jsxs(y,{children:[e.jsx(c,{children:D+a+1}),e.jsx(c,{children:t.pid}),e.jsx(r,{onClick:()=>{},children:e.jsx(ut,{style:{width:"50px",height:"50px"},src:"https://api.zeuler.com/image/"+t.image})}),e.jsx(c,{children:t.name}),e.jsxs(c,{children:[t.price,e.jsx(nt,{to:""})]}),e.jsx(c,{children:t.brand}),e.jsx(c,{children:t.chainName}),e.jsx(c,{children:t.marketAddress})]},a))})]})}),e.jsx(Me,{children:e.jsxs(gt,{"aria-label":"Page navigation example",children:[e.jsx(J,{disabled:D<=0,onClick:Qe,children:"Previous"}),Ye(),e.jsx(J,{disabled:ze===!0,onClick:Oe,children:"Next"})]})})]})]})};export{Et as default};