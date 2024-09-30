import{y as Ge,r as s,A as n,j as a,h as Je,L as Ke,m as We}from"./index-Mnl7ywnx.js";import{a as g}from"./axios-Cm0UX6qg.js";import{B as h}from"./config-HOLfLxHr.js";import{b as Xe,a as oe}from"./CContainer-DyMd7UJQ.js";import{C as Ye,a as b,b as S,c as k,d as u}from"./DefaultLayout-KEyrXcev.js";import{C as Ze}from"./CNavbar-B8deKARA.js";import{C as re}from"./CFormInput-D_sV52kd.js";import{C as ea,a as aa,b as le,c,d as ta,e as p}from"./CTable-p6lxjGi4.js";import{C as ne}from"./CCardImage-CYGdeo4q.js";import{c as sa}from"./cil-pencil-m516yCOw.js";import{C as oa,a as T}from"./CPaginationItem-CnvN1cpo.js";import{C as ce,a as ie,b as de,c as ue}from"./CModalTitle-B79RZCtM.js";import{C as ge}from"./CModalFooter-CL9E9di5.js";import"./CFormLabel-BWrCyi81.js";const ba=()=>{const[{user:f,token:r},l]=Ge(),[he,m]=s.useState(!1),[pe,me]=s.useState([]),[x,P]=s.useState(0),[Ce,j]=s.useState(!0),[fe,xe]=s.useState([]),[je,M]=s.useState("All Chains"),[D,z]=s.useState("All market"),[R,I]=s.useState(""),[F,H]=s.useState(""),[ye,V]=s.useState([]),[A,be]=s.useState(""),[Se,w]=s.useState(!1),[ke,_]=s.useState(""),[E,Q]=s.useState(""),[Pe,O]=s.useState(""),[Me,De]=s.useState(0),[y,L]=s.useState(1);s.useState("NAME");const[q,N]=s.useState(!1),[Ie,G]=s.useState(""),[Ae,U]=s.useState("All Main Categories"),[ra,B]=s.useState(""),[we,Ee]=s.useState([]),[Le,v]=s.useState(""),[Ne,J]=s.useState("Select Main Categories"),[K,W]=s.useState(""),[Ue,X]=s.useState([]);s.useEffect(()=>{f&&r&&C(0)},[f,r,F,A,K,R]),s.useEffect(()=>{r&&g.get(h+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${r}`}}).then(e=>{e.status===200?xe(e.data):e.status===500&&l({type:n,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},[]),s.useEffect(()=>{r&&g.get(h+"product/categories",{headers:{Authorization:`Bearer ${r}`}}).then(e=>{e.status===200?(console.log(e.data[1]),Ee(e.data)):e.status===500&&l({type:n,payload:{status:!0,title:"Main Category Loading error",message:"Main Category loading error"}})}).catch(e=>{console.error("Error: ",e)})},[]);const Be=e=>{g.get(h+`assistant/market/locations?brand=${e}`,{headers:{Authorization:`Bearer ${r}`}}).then(t=>{t.status===200?(V(t.data.data),t.data.data.length<20?(j(!0),console.log("ok")):t.data.data.length>19&&j(!1)):t.status===500&&l({type:n,payload:{status:!0,title:"Market Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},C=(e,t)=>{m(!0),g.get(h+`product/category/all/${e}?marketId=${F}&name=${A}&category=${K}&mainCategory=${Le}&chainId=${R}`,{headers:{Authorization:`Bearer ${r}`}}).then(o=>{o.status===200?(me(o.data.list),De(o.data.count),m(!1),o.data.list.length<20?(j(!0),console.log("ok")):o.data.list.length>19&&j(!1)):o.status===203?(m(!1),l({type:n,payload:{status:!0,title:"product loading error error",message:o.data.message}})):o.status===204?(m(!1),l({type:n,payload:{status:!0,title:"No Products",message:"No products found in this market address",color:"info"}})):o.status===500&&(m(!1),l({type:n,payload:{status:!0,title:"product loading error error",message:o.data.message}}))}).catch(o=>{m(!1),console.error("Error:",o)})},Y=(e,t)=>{e==="all"?(B(""),U("All Main Categories"),v("")):(B(e),ve(e),U(t),v(e))},ve=e=>{r&&g.get(h+"product/categories/sub/"+e,{headers:{Authorization:`Bearer ${r}`}}).then(t=>{t.status===200?X(t.data):t.status===500&&l({type:n,payload:{status:!0,title:"Sub Category Loading",message:"Sub Category loading error"}})}).catch(t=>{console.error("Error: ",t)})},Z=(e,t)=>{e==="all"?(W(""),J("Select Main Categories"),B(""),U("All Main Categories"),X([]),v("")):(console.log("index",e),W(e),J(t))},ee=(e,t)=>{e==="all"?(I(""),M("All Chains")):(I(e),Be(e),M(t))},ae=(e,t)=>{e==="all"?(H(""),z("All Markets"),I(""),M("All Chains"),V([])):(H(e),z(t))},$e=()=>{L(y+1);const e=x+50;P(e),C(e)},Te=()=>{L(y-1);const e=x-50;console.log(e),P(e),C(e)},ze=(e,t)=>{w(!0),_(e),O(t)},Re=()=>{console.log("called"),E==""?l({type:n,payload:{status:!0,title:"Alert",message:"Please enter the price",color:"warning"}}):Ve(ke)},Fe=e=>{L(e);const t=(e-1)*50;P(t),C(t)},He=()=>{const e=Math.ceil(Me/50),t=[];for(let d=1;d<=e;d++)t.push(d);const o=Math.max(y-2,1),i=Math.min(o+4,e);return t.slice(o-1,i).map(d=>a.jsx(T,{active:y===d,onClick:()=>Fe(d),children:d},d))},Ve=e=>{if(e){let t={price:E+" €"};f&&r&&g.put(h+"product/update/price/"+e,t,{headers:{Authorization:`Bearer ${r}`}}).then(o=>{o.status===200?(l({type:n,payload:{status:!0,title:"Product Details Update",message:"Product price update Success",color:"success"}}),_(""),Q(""),C(0),w(!1),O("")):o.status===204?l({type:n,payload:{status:!0,title:"Product Details Update error",message:o.data.message,color:"danger"}}):o.status===500&&l({type:n,payload:{status:!0,title:"Product Details Update error",message:o.data.message,color:"danger"}})}).catch(o=>{console.error("Error:",o)})}else alert("Please Check the Fields!")},_e=e=>{N(!q),G(e)},[Qe,$]=s.useState(null),[te,se]=s.useState(null),Oe=e=>{console.log(e),se(URL.createObjectURL(e)),$(e)},qe=async(e,t)=>{if(console.log(e,t),f&&r){const o=new FormData;o.append("image",t),o.append("id",e),g.post(h+"test/product/image/update",o,{headers:{Authorization:`Bearer ${r}`}}).then(i=>{i.status===200?(N(!1),G(""),$(null),console.log("response",i.data),l({type:n,payload:{status:!0,title:"Image upload ",message:"Image upload success",color:"success"}}),C(0)):i.status===500&&l({type:n,payload:{status:!0,title:"Image upload error",message:i.data.message,color:"danger"}})}).catch(i=>{console.error("Error:",i)})}};return a.jsxs(Xe,{children:[a.jsx(Ye,{style:{marginLeft:"14%"},color:"secondary",children:"Filter by"}),a.jsxs(b,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d"},children:[a.jsx(S,{children:Ae}),a.jsxs(k,{children:[a.jsx(u,{onClick:()=>Y("all"),children:"All Main Category"}),we.map((e,t)=>a.jsx(u,{onClick:()=>Y(t,e),children:e},t))]})]}),a.jsxs(b,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d"},children:[a.jsx(S,{children:Ne}),a.jsxs(k,{children:[a.jsx(u,{onClick:()=>Z("all"),children:"Clear Category"}),Ue.map((e,t)=>a.jsx(u,{onClick:()=>Z(t,e),children:e},t))]})]}),a.jsxs(b,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d"},children:[a.jsx(S,{children:je}),a.jsxs(k,{children:[a.jsx(u,{onClick:()=>ee("all"),children:"All"}),fe.map((e,t)=>a.jsx(u,{onClick:()=>ee(e.id,e.name),children:e.name},t))]})]}),a.jsxs(b,{style:{marginLeft:"2%",width:"18%",backgroundColor:"#ff4d4d"},children:[a.jsx(S,{children:D.length>15?`${D.substring(0,15)}...`:D}),a.jsxs(k,{children:[a.jsx(u,{onClick:()=>ae("all"),children:"Select the Chain"}),ye.map((e,t)=>a.jsx(u,{onClick:()=>ae(e._id,e.address),children:a.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[a.jsx("span",{children:e.address.substring(0,e.address.length/2)}),a.jsx("span",{children:e.address.substring(e.address.length/2)})]})},t))]})]}),a.jsx(Ze,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:a.jsx(re,{type:"text",placeholder:"Search products by name, brand name and product id",style:{width:450,marginRight:"50%"},value:A,onChange:e=>be(e.target.value)})}),he?a.jsx(Je,{}):a.jsxs(ea,{children:[a.jsx(aa,{children:a.jsxs(le,{children:[a.jsx(c,{scope:"col",children:"#"}),a.jsx(c,{scope:"col",children:"Product Id"}),a.jsx(c,{scope:"col",children:"Photo"}),a.jsx(c,{scope:"col",children:"Name"}),a.jsx(c,{scope:"col",children:"Price"}),a.jsx(c,{scope:"col",children:"Brand"}),a.jsx(c,{scope:"col",children:"Chain"}),a.jsx(c,{scope:"col",children:"Market Address"})]})}),a.jsx(ta,{children:pe.map((e,t)=>a.jsxs(le,{children:[a.jsx(p,{children:x+t+1}),a.jsx(p,{children:e.pid}),a.jsx(c,{onClick:()=>{_e(e.productId)},children:a.jsx(ne,{style:{width:"50px",height:"50px"},src:"https://api.zeuler.com/image/"+e.image})}),a.jsx(p,{children:e.name}),a.jsxs(p,{children:[e.price,a.jsx(Ke,{to:"",children:a.jsx(We,{icon:sa,size:"sm",onClick:()=>ze(e.productId,e.price)})})]}),a.jsx(p,{children:e.brand}),a.jsx(p,{children:e.chainName}),a.jsx(p,{children:e.marketAddress})]},t))})]}),a.jsxs(oa,{"aria-label":"Page navigation example",children:[a.jsx(T,{disabled:x<=0,onClick:Te,children:"Previous"}),He(),a.jsx(T,{disabled:Ce===!0,onClick:$e,children:"Next"})]}),a.jsxs(ce,{alignment:"center",visible:Se,scrollable:!0,size:"sm",onClose:()=>w(!1),children:[a.jsx(ie,{closeButton:!0,children:a.jsx(de,{children:"Change Price"})}),a.jsxs(ue,{children:[a.jsx("a",{children:"Enter New Name"}),a.jsx("br",{}),a.jsx(re,{type:"text",placeholder:Pe,value:E,onChange:e=>Q(e.target.value)})]}),a.jsx(ge,{children:a.jsx(oe,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>Re(),children:"Save changes"})})]}),a.jsxs(ce,{alignment:"center",visible:q,scrollable:!0,size:"lg",onClose:()=>{N(!1),$(null),se(null)},children:[a.jsx(ie,{closeButton:!0,children:a.jsx(de,{children:"Image Uploader"})}),a.jsxs(ue,{children:[te&&a.jsx(ne,{style:{width:"100px",height:"100px"},src:te,alt:"Uploaded Image"}),a.jsx("input",{style:{marginLeft:"5%"},type:"file",accept:".jpg, .jpeg, .png",onChange:e=>Oe(e.target.files[0])})]}),a.jsx(ge,{children:a.jsx(oe,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{qe(Ie,Qe)},children:"Upload Image"})})]})]})};export{ba as default};
