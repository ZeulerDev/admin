import{y as Fe,r,A as l,j as t,h as A,L as Ve,m as He}from"./index-C7xebdlB.js";import{a as p}from"./axios-Cm0UX6qg.js";import{B as C}from"./config-HOLfLxHr.js";import{b as _e,a as f}from"./CContainer-DmyDJSbi.js";import{C as Z,a as ee,b as te,c as ae,d as D}from"./DefaultLayout-jQufvVlr.js";import{C as Qe}from"./CNavbar-DAGRjB36.js";import{C as se}from"./CFormInput-BJT20qYv.js";import{C as Oe,a as qe,b as re,c as n,d as Ge,e as h}from"./CTable-bhvJ0O4o.js";import{C as oe}from"./CCardImage-Ca25NGao.js";import{c as Je}from"./cil-pencil-m516yCOw.js";import{C as Ke,a as T}from"./CPaginationItem-BwX0sL4W.js";import{C as le,a as ce,b as de,c as ne}from"./CModalTitle-DqlcJFLS.js";import{C as ie}from"./CModalFooter-DExbXLa3.js";import"./CFormLabel-Dfa51LwS.js";const ut=()=>{const[{user:g,token:d},o]=Fe(),[ue,m]=r.useState(!1),[$,j]=r.useState(!1);r.useState(!1);const[pe,x]=r.useState(!1),[he,ge]=r.useState([]),[k,I]=r.useState(0),[fe,S]=r.useState(!0),[me,xe]=r.useState([]),[ye,w]=r.useState("All Chains"),[U,R]=r.useState("All market"),[We,M]=r.useState(""),[P,F]=r.useState(""),[Ce,V]=r.useState([]),[v,je]=r.useState(""),[Pe,z]=r.useState(!1),[ke,H]=r.useState(""),[L,_]=r.useState(""),[Se,Q]=r.useState(""),[be,Ae]=r.useState(0),[b,B]=r.useState(1);r.useState("NAME");const[O,E]=r.useState(!1),[De,q]=r.useState("");r.useEffect(()=>{g&&d&&i(0)},[g,d,P,v]),r.useEffect(()=>{d&&p.get("http://localhost:8003/assistant/market/chains/all",{headers:{Authorization:`Bearer ${d}`}}).then(e=>{e.status===200?xe(e.data):e.status===500&&o({type:l,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},[]);const Ie=e=>{p.get(`http://localhost:8003/assistant/market/locations?brand=${e}`,{headers:{Authorization:`Bearer ${d}`}}).then(a=>{a.status===200?(V(a.data.data),a.data.data.length<20?(S(!0),console.log("ok")):a.data.data.length>19&&S(!1)):a.status===500&&o({type:l,payload:{status:!0,title:"Market Loading error",message:a.data.message}})}).catch(a=>{console.error("Error: ",a)})},i=(e,a)=>{m(!0),p.get(C+`product/all/${e}?marketId=${P}&name=${v}`,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(ge(s.data.list),Ae(s.data.count),m(!1),s.data.list.length<20?(S(!0),console.log("ok")):s.data.list.length>19&&S(!1)):s.status===203?(m(!1),o({type:l,payload:{status:!0,title:"product loading error error",message:s.data.message}})):s.status===204?(m(!1),o({type:l,payload:{status:!0,title:"No Products",message:"No products found in this market address",color:"info"}})):s.status===500&&(m(!1),o({type:l,payload:{status:!0,title:"product loading error error",message:s.data.message}}))}).catch(s=>{m(!1),console.error("Error:",s)})},G=(e,a)=>{e==="all"?(M(""),w("All Chains")):(M(e),Ie(e),w(a))},J=(e,a)=>{e==="all"?(F(""),R("All Markets"),M(""),w("All Chains"),V([])):(F(e),R(a))},we=()=>{B(b+1);const e=k+50;I(e),i(e)},Ue=()=>{B(b-1);const e=k-50;console.log(e),I(e),i(e)},Me=(e,a)=>{z(!0),H(e),Q(a)},ve=()=>{console.log("called"),L==""?o({type:l,payload:{status:!0,title:"Alert",message:"Please enter the price",color:"warning"}}):Be(ke)},ze=e=>{B(e);const a=(e-1)*50;I(a),i(a)},Le=()=>{const e=Math.ceil(be/50),a=[];for(let u=1;u<=e;u++)a.push(u);const s=Math.max(b-2,1),c=Math.min(s+4,e);return a.slice(s-1,c).map(u=>t.jsx(T,{active:b===u,onClick:()=>ze(u),children:u},u))},Be=e=>{if(e){let a={price:L+" €"};g&&d&&p.put(C+"product/update/price/"+e,a,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(o({type:l,payload:{status:!0,title:"Product Details Update",message:"Product price update Success",color:"success"}}),H(""),_(""),i(0),z(!1),Q("")):s.status===204?o({type:l,payload:{status:!0,title:"Product Details Update error",message:s.data.message,color:"danger"}}):s.status===500&&o({type:l,payload:{status:!0,title:"Product Details Update error",message:s.data.message,color:"danger"}})}).catch(s=>{console.error("Error:",s)})}else alert("Please Check the Fields!")},Ee=e=>{E(!O),q(e)},[Ne,N]=r.useState(null),[K,W]=r.useState(null),Te=e=>{console.log(e),W(URL.createObjectURL(e)),N(e)},$e=async(e,a)=>{if(console.log(e,a),g&&d){const s=new FormData;s.append("image",a),s.append("id",e),p.post(C+"test/product/image/update",s,{headers:{Authorization:`Bearer ${d}`}}).then(c=>{c.status===200?(E(!1),q(""),N(null),console.log("response",c.data),o({type:l,payload:{status:!0,title:"Image upload ",message:"Image upload success",color:"success"}}),i(0)):c.status===500&&o({type:l,payload:{status:!0,title:"Image upload error",message:c.data.message,color:"danger"}})}).catch(c=>{console.error("Error:",c)})}},X=(e,a)=>{if(e){let s={status:a};g&&d&&p.put(C+"product/update/status/"+e,s,{headers:{Authorization:`Bearer ${d}`}}).then(c=>{c.status===200?(o({type:l,payload:{status:!0,title:"Product Status Update",message:"Product status update Success",color:"success"}}),i(0)):c.status===204?o({type:l,payload:{status:!0,title:"Product Details Update error",message:"Product status update error",color:"danger"}}):c.status===500&&o({type:l,payload:{status:!0,title:"Product Details Update error",message:"Product status update error",color:"danger"}})}).catch(c=>{console.error("Error:",c)})}else alert("Please Check the Fields!")},Y=(e,a)=>{j(!0);let s;if(e==="1"?s=!0:e==="0"&&(s=!1),a){let c={status:s,mid:a};console.log("data",c),g&&d&&p.put(C+"product/update/all",c,{headers:{Authorization:`Bearer ${d}`}}).then(y=>{y.status===200?(o({type:l,payload:{status:!0,title:"Product Status Update",message:"Product status update Success",color:"success"}}),i(0),j(!1)):y.status===204?(o({type:l,payload:{status:!0,title:"Product Details Update error",message:"Product status update error",color:"danger"}}),j(!1)):y.status===500&&(o({type:l,payload:{status:!0,title:"Product Details Update error",message:"Product status update error",color:"danger"}}),j(!1))}).catch(y=>{console.error("Error:",y),j(!1)})}else o({type:l,payload:{status:!0,title:"Alert",message:"Please select the market",color:"danger"}}),x(!1)},Re=e=>{x(!0),console.log("mid",e),g&&d&&(e?(console.log("data"),p.put(C+"product/sync/all/"+e,{},{headers:{Authorization:`Bearer ${d}`}}).then(a=>{a.status===200?(o({type:l,payload:{status:!0,title:"Product Sync",message:"Product sync Success",color:"success"}}),i(0),x(!1)):a.status===204?(o({type:l,payload:{status:!0,title:"Product Sync error",message:"Product sync error",color:"danger"}}),x(!1)):a.status===500&&(o({type:l,payload:{status:!0,title:"Product Sync error",message:"Product sync error",color:"danger"}}),x(!1))}).catch(a=>{console.error("Error:",a),x(!1)})):o({type:l,payload:{status:!0,title:"Alert",message:"Please select the market",color:"danger"}}))};return t.jsxs(_e,{children:[t.jsx(Z,{style:{marginLeft:"0%"},color:"secondary",children:"Action "}),t.jsx(f,{size:"sm",onClick:()=>{Y("1",P)},style:{backgroundColor:"#ff4d4d",marginLeft:"2%",width:120,color:"white"},children:$?t.jsx(A,{size:"sm"}):"Activate All"}),t.jsx(f,{size:"sm",onClick:()=>{Y("0",P)},style:{backgroundColor:"#ff4d4d",marginLeft:"2%",width:120,color:"white"},children:$?t.jsx(A,{size:"sm"}):"Deactivate All"}),t.jsx(f,{size:"sm",onClick:()=>{Re(P)},style:{backgroundColor:"#ff4d4d",marginLeft:"2%",width:120,color:"white"},children:pe?t.jsx(A,{size:"sm"}):"Sync"}),t.jsx(Z,{style:{marginLeft:"15%"},color:"secondary",children:"Filter by"}),t.jsxs(ee,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[t.jsx(te,{children:ye}),t.jsxs(ae,{children:[t.jsx(D,{onClick:()=>G("all"),children:"All"}),me.map((e,a)=>t.jsx(D,{onClick:()=>G(e.id,e.name),children:e.name},a))]})]}),t.jsxs(ee,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[t.jsx(te,{children:U.length>15?`${U.substring(0,15)}...`:U}),t.jsxs(ae,{children:[t.jsx(D,{onClick:()=>J("all"),children:"Select the Chain"}),Ce.map((e,a)=>t.jsx(D,{onClick:()=>J(e._id,e.address),children:t.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[t.jsx("span",{children:e.address.substring(0,e.address.length/2)}),t.jsx("span",{children:e.address.substring(e.address.length/2)})]})},a))]})]}),t.jsx(Qe,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:t.jsx(se,{type:"text",placeholder:"Search products by name, brand name and product id",style:{width:450,marginRight:"50%"},value:v,onChange:e=>je(e.target.value)})}),ue?t.jsx(A,{}):t.jsxs(Oe,{children:[t.jsx(qe,{children:t.jsxs(re,{children:[t.jsx(n,{scope:"col",children:"#"}),t.jsx(n,{scope:"col",children:"Product Id"}),t.jsx(n,{scope:"col",children:"Photo"}),t.jsx(n,{scope:"col",children:"Name"}),t.jsx(n,{scope:"col",children:"Price"}),t.jsx(n,{scope:"col",children:"Brand"}),t.jsx(n,{scope:"col",children:"Chain"}),t.jsx(n,{scope:"col",children:"Market Address"}),t.jsx(n,{scope:"col",children:"Action"})]})}),t.jsx(Ge,{children:he.map((e,a)=>t.jsxs(re,{children:[t.jsx(h,{children:k+a+1}),t.jsx(h,{children:e.pid}),t.jsx(n,{onClick:()=>{Ee(e.productId)},children:t.jsx(oe,{style:{width:"50px",height:"50px"},src:"https://api.zeuler.com/image/"+e.image})}),t.jsx(h,{children:e.name}),t.jsxs(h,{children:[e.price,t.jsx(Ve,{to:"",children:t.jsx(He,{icon:Je,size:"sm",onClick:()=>Me(e.productId,e.price)})})]}),t.jsx(h,{children:e.brand}),t.jsx(h,{children:e.chainName}),t.jsx(h,{children:e.marketAddress}),t.jsx(h,{children:e.status?t.jsx(f,{size:"sm",onClick:()=>{X(e.productId,!1)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Deactivate"}):t.jsx(f,{size:"sm",onClick:()=>{X(e.productId,!0)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Activate"})})]},a))})]}),t.jsxs(Ke,{"aria-label":"Page navigation example",children:[t.jsx(T,{disabled:k<=0,onClick:Ue,children:"Previous"}),Le(),t.jsx(T,{disabled:fe===!0,onClick:we,children:"Next"})]}),t.jsxs(le,{alignment:"center",visible:Pe,scrollable:!0,size:"sm",onClose:()=>z(!1),children:[t.jsx(ce,{closeButton:!0,children:t.jsx(de,{children:"Change Price"})}),t.jsxs(ne,{children:[t.jsx("a",{children:"Enter New Name"}),t.jsx("br",{}),t.jsx(se,{type:"text",placeholder:Se,value:L,onChange:e=>_(e.target.value)})]}),t.jsx(ie,{children:t.jsx(f,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>ve(),children:"Save changes"})})]}),t.jsxs(le,{alignment:"center",visible:O,scrollable:!0,size:"lg",onClose:()=>{E(!1),N(null),W(null)},children:[t.jsx(ce,{closeButton:!0,children:t.jsx(de,{children:"Image Uploader"})}),t.jsxs(ne,{children:[K&&t.jsx(oe,{style:{width:"100px",height:"100px"},src:K,alt:"Uploaded Image"}),t.jsx("input",{style:{marginLeft:"5%"},type:"file",accept:".jpg, .jpeg, .png",onChange:e=>Te(e.target.files[0])})]}),t.jsx(ie,{children:t.jsx(f,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{$e(De,Ne)},children:"Upload Image"})})]})]})};export{ut as default};