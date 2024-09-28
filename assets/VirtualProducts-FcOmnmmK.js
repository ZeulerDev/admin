import{y as Fe,r,A as c,j as t,h as A,L as Ve,m as He}from"./index-1nLR5RGy.js";import{a as h}from"./axios-Cm0UX6qg.js";import{B as C}from"./config-HOLfLxHr.js";import{b as _e,a as f}from"./CContainer-DfgIIkA9.js";import{C as te,a as ae,b as se,c as re,d as D}from"./DefaultLayout-PY4GQLlg.js";import{C as Qe}from"./CNavbar-Cn5Tba6R.js";import{C as oe}from"./CFormInput-B-dT1a4O.js";import{C as Oe,a as qe,b as le,c as i,d as Ge,e as g}from"./CTable-BbDDKHT4.js";import{C as ce}from"./CCardImage-BNe5Nk8h.js";import{c as Je}from"./cil-pencil-m516yCOw.js";import{C as Ke,a as T}from"./CPaginationItem-p0LfWE13.js";import{C as de,a as ne,b as ie,c as ue}from"./CModalTitle-H_mL68lj.js";import{C as pe}from"./CModalFooter-BePzWYJy.js";import"./CFormLabel-DeTrB1R-.js";const ut=()=>{const[{user:m,token:d},l]=Fe(),[he,x]=r.useState(!1),[$,j]=r.useState(!1);r.useState(!1);const[ge,y]=r.useState(!1),[R,F]=r.useState([]),[k,I]=r.useState(0),[me,S]=r.useState(!0),[fe,xe]=r.useState([]),[ye,w]=r.useState("All Chains"),[U,V]=r.useState("All market"),[We,M]=r.useState(""),[P,H]=r.useState(""),[Ce,_]=r.useState([]),[v,je]=r.useState(""),[Pe,z]=r.useState(!1),[ke,Q]=r.useState(""),[L,O]=r.useState(""),[Se,q]=r.useState(""),[be,Ae]=r.useState(0),[b,E]=r.useState(1);r.useState("NAME");const[G,B]=r.useState(!1),[De,J]=r.useState("");r.useEffect(()=>{m&&d&&u(0)},[m,d,P,v]),r.useEffect(()=>{d&&h.get("http://localhost:8003/assistant/market/chains/all",{headers:{Authorization:`Bearer ${d}`}}).then(e=>{e.status===200?xe(e.data):e.status===500&&l({type:c,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},[]);const Ie=e=>{h.get(`http://localhost:8003/assistant/market/locations?brand=${e}`,{headers:{Authorization:`Bearer ${d}`}}).then(a=>{a.status===200?(_(a.data.data),a.data.data.length<20?(S(!0),console.log("ok")):a.data.data.length>19&&S(!1)):a.status===500&&l({type:c,payload:{status:!0,title:"Market Loading error",message:a.data.message}})}).catch(a=>{console.error("Error: ",a)})},u=(e,a)=>{x(!0),h.get(C+`product/all/${e}?marketId=${P}&name=${v}`,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{s.status===200?(F(s.data.list),Ae(s.data.count),x(!1),s.data.list.length<20?(S(!0),console.log("ok")):s.data.list.length>19&&S(!1)):s.status===203?(x(!1),l({type:c,payload:{status:!0,title:"product loading error error",message:s.data.message}})):s.status===204?(x(!1),l({type:c,payload:{status:!0,title:"No Products",message:"No products found in this market address",color:"info"}})):s.status===500&&(x(!1),l({type:c,payload:{status:!0,title:"product loading error error",message:s.data.message}}))}).catch(s=>{x(!1),console.error("Error:",s)})},K=(e,a)=>{e==="all"?(M(""),w("All Chains")):(M(e),Ie(e),w(a))},W=(e,a)=>{e==="all"?(H(""),V("All Markets"),M(""),w("All Chains"),_([])):(H(e),V(a))},we=()=>{E(b+1);const e=k+50;I(e),u(e)},Ue=()=>{E(b-1);const e=k-50;console.log(e),I(e),u(e)},Me=(e,a)=>{z(!0),Q(e),q(a)},ve=()=>{console.log("called"),L==""?l({type:c,payload:{status:!0,title:"Alert",message:"Please enter the price",color:"warning"}}):Ee(ke)},ze=e=>{E(e);const a=(e-1)*50;I(a),u(a)},Le=()=>{const e=Math.ceil(be/50),a=[];for(let n=1;n<=e;n++)a.push(n);const s=Math.max(b-2,1),o=Math.min(s+4,e);return a.slice(s-1,o).map(n=>t.jsx(T,{active:b===n,onClick:()=>ze(n),children:n},n))},Ee=e=>{if(e){let a={price:L+" €"};m&&d&&h.put(C+"product/update/price/"+e,a,{headers:{Authorization:`Bearer ${d}`}}).then(s=>{if(s.status===200){const o=s.data,p=R.map(n=>(n.productId===o.productId&&(n.price.basePrice=o.price.basePrice,n.price.tax=o.price.tax,n.price.markup=o.price.markup,n.price.total=o.price.total),n));F([...p]),l({type:c,payload:{status:!0,title:"Product Details Update",message:"Product price update Success",color:"success"}}),Q(""),O(""),z(!1),q("")}else s.status===204?l({type:c,payload:{status:!0,title:"Product Details Update error",message:s.data.message,color:"danger"}}):s.status===500&&l({type:c,payload:{status:!0,title:"Product Details Update error",message:s.data.message,color:"danger"}})}).catch(s=>{console.error("Error:",s)})}else alert("Please Check the Fields!")},Be=e=>{B(!G),J(e)},[Ne,N]=r.useState(null),[X,Y]=r.useState(null),Te=e=>{console.log(e),Y(URL.createObjectURL(e)),N(e)},$e=async(e,a)=>{if(console.log(e,a),m&&d){const s=new FormData;s.append("image",a),s.append("id",e),h.post(C+"test/product/image/update",s,{headers:{Authorization:`Bearer ${d}`}}).then(o=>{o.status===200?(B(!1),J(""),N(null),console.log("response",o.data),l({type:c,payload:{status:!0,title:"Image upload ",message:"Image upload success",color:"success"}}),u(0)):o.status===500&&l({type:c,payload:{status:!0,title:"Image upload error",message:o.data.message,color:"danger"}})}).catch(o=>{console.error("Error:",o)})}},Z=(e,a)=>{if(e){let s={status:a};m&&d&&h.put(C+"product/update/status/"+e,s,{headers:{Authorization:`Bearer ${d}`}}).then(o=>{o.status===200?(l({type:c,payload:{status:!0,title:"Product Status Update",message:"Product status update Success",color:"success"}}),u(0)):o.status===204?l({type:c,payload:{status:!0,title:"Product Details Update error",message:"Product status update error",color:"danger"}}):o.status===500&&l({type:c,payload:{status:!0,title:"Product Details Update error",message:"Product status update error",color:"danger"}})}).catch(o=>{console.error("Error:",o)})}else alert("Please Check the Fields!")},ee=(e,a)=>{j(!0);let s;if(e==="1"?s=!0:e==="0"&&(s=!1),a){let o={status:s,mid:a};console.log("data",o),m&&d&&h.put(C+"product/update/all",o,{headers:{Authorization:`Bearer ${d}`}}).then(p=>{p.status===200?(l({type:c,payload:{status:!0,title:"Product Status Update",message:"Product status update Success",color:"success"}}),u(0),j(!1)):p.status===204?(l({type:c,payload:{status:!0,title:"Product Details Update error",message:"Product status update error",color:"danger"}}),j(!1)):p.status===500&&(l({type:c,payload:{status:!0,title:"Product Details Update error",message:"Product status update error",color:"danger"}}),j(!1))}).catch(p=>{console.error("Error:",p),j(!1)})}else l({type:c,payload:{status:!0,title:"Alert",message:"Please select the market",color:"danger"}}),y(!1)},Re=e=>{y(!0),console.log("mid",e),m&&d&&(e?(console.log("data"),h.put(C+"product/sync/all/"+e,{},{headers:{Authorization:`Bearer ${d}`}}).then(a=>{a.status===200?(l({type:c,payload:{status:!0,title:"Product Sync",message:"Product sync Success",color:"success"}}),u(0),y(!1)):a.status===204?(l({type:c,payload:{status:!0,title:"Product Sync error",message:"Product sync error",color:"danger"}}),y(!1)):a.status===500&&(l({type:c,payload:{status:!0,title:"Product Sync error",message:"Product sync error",color:"danger"}}),y(!1))}).catch(a=>{console.error("Error:",a),y(!1)})):l({type:c,payload:{status:!0,title:"Alert",message:"Please select the market",color:"danger"}}))};return t.jsxs(_e,{children:[t.jsx(te,{style:{marginLeft:"0%"},color:"secondary",children:"Action "}),t.jsx(f,{size:"sm",onClick:()=>{ee("1",P)},style:{backgroundColor:"#ff4d4d",marginLeft:"2%",width:120,color:"white"},children:$?t.jsx(A,{size:"sm"}):"Activate All"}),t.jsx(f,{size:"sm",onClick:()=>{ee("0",P)},style:{backgroundColor:"#ff4d4d",marginLeft:"2%",width:120,color:"white"},children:$?t.jsx(A,{size:"sm"}):"Deactivate All"}),t.jsx(f,{size:"sm",onClick:()=>{Re(P)},style:{backgroundColor:"#ff4d4d",marginLeft:"2%",width:120,color:"white"},children:ge?t.jsx(A,{size:"sm"}):"Sync"}),t.jsx(te,{style:{marginLeft:"15%"},color:"secondary",children:"Filter by"}),t.jsxs(ae,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[t.jsx(se,{children:ye}),t.jsxs(re,{children:[t.jsx(D,{onClick:()=>K("all"),children:"All"}),fe.map((e,a)=>t.jsx(D,{onClick:()=>K(e.id,e.name),children:e.name},a))]})]}),t.jsxs(ae,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[t.jsx(se,{children:U.length>15?`${U.substring(0,15)}...`:U}),t.jsxs(re,{children:[t.jsx(D,{onClick:()=>W("all"),children:"Select the Chain"}),Ce.map((e,a)=>t.jsx(D,{onClick:()=>W(e._id,e.address),children:t.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[t.jsx("span",{children:e.address.substring(0,e.address.length/2)}),t.jsx("span",{children:e.address.substring(e.address.length/2)})]})},a))]})]}),t.jsx(Qe,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:t.jsx(oe,{type:"text",placeholder:"Search products by name, brand name and product id",style:{width:450,marginRight:"50%"},value:v,onChange:e=>je(e.target.value)})}),he?t.jsx(A,{}):t.jsxs(Oe,{children:[t.jsx(qe,{children:t.jsxs(le,{children:[t.jsx(i,{scope:"col",children:"#"}),t.jsx(i,{scope:"col",children:"Product Id"}),t.jsx(i,{scope:"col",children:"Photo"}),t.jsx(i,{scope:"col",children:"Name"}),t.jsx(i,{scope:"col",children:"Price"}),t.jsx(i,{scope:"col",children:"Brand"}),t.jsx(i,{scope:"col",children:"Chain"}),t.jsx(i,{scope:"col",children:"Market Address"}),t.jsx(i,{scope:"col",children:"Action"})]})}),t.jsx(Ge,{children:R.map((e,a)=>t.jsxs(le,{children:[t.jsx(g,{children:k+a+1}),t.jsx(g,{children:e.pid}),t.jsx(i,{onClick:()=>{Be(e.productId)},children:t.jsx(ce,{style:{width:"50px",height:"50px"},src:"https://api.zeuler.com/image/"+e.image})}),t.jsx(g,{children:e.name}),t.jsxs(g,{children:[e.price.basePrice,t.jsx(Ve,{to:"",children:t.jsx(He,{icon:Je,size:"sm",onClick:()=>Me(e.productId,e.price.basePrice)})})]}),t.jsx(g,{children:e.brand}),t.jsx(g,{children:e.chainName}),t.jsx(g,{children:e.marketAddress}),t.jsx(g,{children:e.status?t.jsx(f,{size:"sm",onClick:()=>{Z(e.productId,!1)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Deactivate"}):t.jsx(f,{size:"sm",onClick:()=>{Z(e.productId,!0)},style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Activate"})})]},a))})]}),t.jsxs(Ke,{"aria-label":"Page navigation example",children:[t.jsx(T,{disabled:k<=0,onClick:Ue,children:"Previous"}),Le(),t.jsx(T,{disabled:me===!0,onClick:we,children:"Next"})]}),t.jsxs(de,{alignment:"center",visible:Pe,scrollable:!0,size:"sm",onClose:()=>z(!1),children:[t.jsx(ne,{closeButton:!0,children:t.jsx(ie,{children:"Change Price"})}),t.jsxs(ue,{children:[t.jsx("a",{children:"Enter New Name"}),t.jsx("br",{}),t.jsx(oe,{type:"text",placeholder:Se,value:L,onChange:e=>O(e.target.value)})]}),t.jsx(pe,{children:t.jsx(f,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>ve(),children:"Save changes"})})]}),t.jsxs(de,{alignment:"center",visible:G,scrollable:!0,size:"lg",onClose:()=>{B(!1),N(null),Y(null)},children:[t.jsx(ne,{closeButton:!0,children:t.jsx(ie,{children:"Image Uploader"})}),t.jsxs(ue,{children:[X&&t.jsx(ce,{style:{width:"100px",height:"100px"},src:X,alt:"Uploaded Image"}),t.jsx("input",{style:{marginLeft:"5%"},type:"file",accept:".jpg, .jpeg, .png",onChange:e=>Te(e.target.files[0])})]}),t.jsx(pe,{children:t.jsx(f,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{$e(De,Ne)},children:"Upload Image"})})]})]})};export{ut as default};
