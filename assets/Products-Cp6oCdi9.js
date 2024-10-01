import{y as Ne,r,A as d,j as a,h as ve,L as Be,m as Ee}from"./index-vIOSoMUu.js";import{a as m}from"./axios-Cm0UX6qg.js";import{B as x}from"./config-HOLfLxHr.js";import{b as Te,a as J}from"./CContainer-DQqje6Yb.js";import{C as Le,a as K,b as W,c as X,d as P}from"./DefaultLayout-CKhc0dtY.js";import{C as $e}from"./CNavbar-CKkucrSO.js";import{C as Y}from"./CFormInput-D-Eh3JXR.js";import{C as ze,a as Fe,b as Z,c,d as Re,e as i}from"./CTable-CA_T2BdW.js";import{C as ee}from"./CCardImage-DSZEHEI-.js";import{c as He}from"./cil-pencil-m516yCOw.js";import{C as Ve,a as v}from"./CPaginationItem-4rDKfmAB.js";import{C as ae,a as te,b as se,c as re}from"./CModalTitle-UWL2UZXd.js";import{C as le}from"./CModalFooter-CdxMNKJi.js";import"./CFormLabel-B9P4EuKI.js";const ra=()=>{const[{user:f,token:u},n]=Ne(),[oe,p]=r.useState(!1),[B,E]=r.useState([]),[j,k]=r.useState(0),[ce,C]=r.useState(!0),[ne,de]=r.useState([]),[ie,b]=r.useState("All Chains"),[S,T]=r.useState("All market"),[_e,I]=r.useState(""),[L,$]=r.useState(""),[ue,z]=r.useState([]),[D,pe]=r.useState(""),[he,M]=r.useState(!1),[ge,F]=r.useState(""),[A,R]=r.useState(""),[me,H]=r.useState(""),[xe,fe]=r.useState(0),[y,w]=r.useState(1);r.useState("NAME");const[V,U]=r.useState(!1),[je,_]=r.useState("");r.useEffect(()=>{f&&u&&h(0)},[f,u,L,D]),r.useEffect(()=>{u&&m.get(x+"assistant/market/chains/all",{headers:{Authorization:`Bearer ${u}`}}).then(e=>{e.status===200?de(e.data):e.status===500&&n({type:d,payload:{status:!0,title:"Chain Loading error",message:e.data.message}})}).catch(e=>{console.error("Error: ",e)})},[]);const Ce=e=>{m.get(x+`assistant/market/locations?brand=${e}`,{headers:{Authorization:`Bearer ${u}`}}).then(t=>{t.status===200?(z(t.data.data),t.data.data.length<20?(C(!0),console.log("ok")):t.data.data.length>19&&C(!1)):t.status===500&&n({type:d,payload:{status:!0,title:"Market Loading error",message:t.data.message}})}).catch(t=>{console.error("Error: ",t)})},h=(e,t)=>{p(!0),m.get(x+`product/all/${e}?marketId=${L}&name=${D}`,{headers:{Authorization:`Bearer ${u}`}}).then(s=>{s.status===200?(E(s.data.list),fe(s.data.count),p(!1),s.data.list.length<20?(C(!0),console.log("ok")):s.data.list.length>19&&C(!1)):s.status===203?(p(!1),n({type:d,payload:{status:!0,title:"product loading error error",message:s.data.message}})):s.status===204?(p(!1),n({type:d,payload:{status:!0,title:"No Products",message:"No products found in this market address",color:"info"}})):s.status===500&&(p(!1),n({type:d,payload:{status:!0,title:"product loading error error",message:s.data.message}}))}).catch(s=>{p(!1),console.error("Error:",s)})},Q=(e,t)=>{e==="all"?(I(""),b("All Chains")):(I(e),Ce(e),b(t))},O=(e,t)=>{e==="all"?($(""),T("All Markets"),I(""),b("All Chains"),z([])):($(e),T(t))},ye=()=>{w(y+1);const e=j+50;k(e),h(e)},Pe=()=>{w(y-1);const e=j-50;console.log(e),k(e),h(e)},ke=(e,t)=>{M(!0),F(e),H(t)},be=()=>{console.log("called"),A==""?n({type:d,payload:{status:!0,title:"Alert",message:"Please enter the price",color:"warning"}}):De(ge)},Se=e=>{w(e);const t=(e-1)*50;k(t),h(t)},Ie=()=>{const e=Math.ceil(xe/50),t=[];for(let l=1;l<=e;l++)t.push(l);const s=Math.max(y-2,1),o=Math.min(s+4,e);return t.slice(s-1,o).map(l=>a.jsx(v,{active:y===l,onClick:()=>Se(l),children:l},l))},De=e=>{if(e){let t={price:A+" €"};f&&u&&m.put(x+"product/update/price/"+e,t,{headers:{Authorization:`Bearer ${u}`}}).then(s=>{if(s.status===200){const o=s.data,g=B.map(l=>(l.productId===o.productId&&(l.price.basePrice=o.price.basePrice,l.price.tax=o.price.tax,l.price.markup=o.price.markup,l.price.total=o.price.total),l));E([...g]),n({type:d,payload:{status:!0,title:"Product Details Update",message:"Product price update Success",color:"success"}}),F(""),R(""),M(!1),H("")}else s.status===204?n({type:d,payload:{status:!0,title:"Product Details Update error",message:s.data.message,color:"danger"}}):s.status===500&&n({type:d,payload:{status:!0,title:"Product Details Update error",message:s.data.message,color:"danger"}})}).catch(s=>{console.error("Error:",s)})}else alert("Please Check the Fields!")},Me=e=>{U(!V),_(e)},[Ae,N]=r.useState(null),[q,G]=r.useState(null),we=e=>{console.log(e),G(URL.createObjectURL(e)),N(e)},Ue=async(e,t)=>{if(console.log(e,t),f&&u){const s=new FormData;s.append("image",t),s.append("id",e),m.post(x+"test/product/image/update",s,{headers:{Authorization:`Bearer ${u}`}}).then(o=>{o.status===200?(U(!1),_(""),N(null),console.log("response",o.data),n({type:d,payload:{status:!0,title:"Image upload ",message:"Image upload success",color:"success"}}),h(0)):o.status===500&&n({type:d,payload:{status:!0,title:"Image upload error",message:o.data.message,color:"danger"}})}).catch(o=>{console.error("Error:",o)})}};return a.jsxs(Te,{children:[a.jsx(Le,{style:{marginLeft:"57%"},color:"secondary",children:"Filter by"}),a.jsxs(K,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[a.jsx(W,{children:ie}),a.jsxs(X,{children:[a.jsx(P,{onClick:()=>Q("all"),children:"All"}),ne.map((e,t)=>a.jsx(P,{onClick:()=>Q(e.id,e.name),children:e.name},t))]})]}),a.jsxs(K,{style:{marginLeft:"2%",width:"17%",backgroundColor:"#ff4d4d"},children:[a.jsx(W,{children:S.length>15?`${S.substring(0,15)}...`:S}),a.jsxs(X,{children:[a.jsx(P,{onClick:()=>O("all"),children:"Select the Chain"}),ue.map((e,t)=>a.jsx(P,{onClick:()=>O(e._id,e.address),children:a.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[a.jsx("span",{children:e.address.substring(0,e.address.length/2)}),a.jsx("span",{children:e.address.substring(e.address.length/2)})]})},t))]})]}),a.jsx($e,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:a.jsx(Y,{type:"text",placeholder:"Search products by name, brand name and product id",style:{width:450,marginRight:"60%"},value:D,onChange:e=>pe(e.target.value)})}),oe?a.jsx(ve,{}):a.jsxs(ze,{children:[a.jsx(Fe,{children:a.jsxs(Z,{children:[a.jsx(c,{scope:"col",children:"#"}),a.jsx(c,{scope:"col",children:"Product Id"}),a.jsx(c,{scope:"col",children:"Photo"}),a.jsx(c,{scope:"col",children:"Name"}),a.jsx(c,{scope:"col",children:"Base Price"}),a.jsx(c,{scope:"col",children:"Tax"}),a.jsx(c,{scope:"col",children:"Markup Percentage "}),a.jsx(c,{scope:"col",children:"Markup"}),a.jsx(c,{scope:"col",children:"Total"}),a.jsx(c,{scope:"col",children:"Brand"}),a.jsx(c,{scope:"col",children:"Chain"}),a.jsx(c,{scope:"col",children:"Market Address"})]})}),a.jsx(Re,{children:B.map((e,t)=>{var s,o,g,l;return a.jsxs(Z,{children:[a.jsx(i,{children:j+t+1}),a.jsx(i,{children:e.pid}),a.jsx(c,{onClick:()=>{Me(e.productId)},children:a.jsx(ee,{style:{width:"50px",height:"50px"},src:"https://api.zeuler.com/image/"+e.image})}),a.jsx(i,{children:e.name}),a.jsxs(i,{children:[(((s=e.price)==null?void 0:s.basePrice)??0).toFixed(2),a.jsx(Be,{to:"",children:a.jsx(Ee,{icon:He,size:"sm",onClick:()=>ke(e.productId,e.price.basePrice)})})]}),a.jsx(i,{children:(((o=e.price)==null?void 0:o.tax)??0).toFixed(2)}),a.jsxs(i,{children:[e.price.percentage,"%"]}),a.jsx(i,{children:(((g=e.price)==null?void 0:g.markup)??0).toFixed(2)}),a.jsx(i,{children:(((l=e.price)==null?void 0:l.total)??0).toFixed(2)}),a.jsx(i,{children:e.brand}),a.jsx(i,{children:e.chainName}),a.jsx(i,{children:e.marketAddress})]},t)})})]}),a.jsxs(Ve,{"aria-label":"Page navigation example",children:[a.jsx(v,{disabled:j<=0,onClick:Pe,children:"Previous"}),Ie(),a.jsx(v,{disabled:ce===!0,onClick:ye,children:"Next"})]}),a.jsxs(ae,{alignment:"center",visible:he,scrollable:!0,size:"sm",onClose:()=>M(!1),children:[a.jsx(te,{closeButton:!0,children:a.jsx(se,{children:"Change Price"})}),a.jsxs(re,{children:[a.jsx("a",{children:"Enter New Price"}),a.jsx("br",{}),a.jsx(Y,{type:"text",placeholder:me,value:A,onChange:e=>R(e.target.value)})]}),a.jsx(le,{children:a.jsx(J,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>be(),children:"Save changes"})})]}),a.jsxs(ae,{alignment:"center",visible:V,scrollable:!0,size:"lg",onClose:()=>{U(!1),N(null),G(null)},children:[a.jsx(te,{closeButton:!0,children:a.jsx(se,{children:"Image Uploader"})}),a.jsxs(re,{children:[q&&a.jsx(ee,{style:{width:"100px",height:"100px"},src:q,alt:"Uploaded Image"}),a.jsx("input",{style:{marginLeft:"5%"},type:"file",accept:".jpg, .jpeg, .png",onChange:e=>we(e.target.files[0])})]}),a.jsx(le,{children:a.jsx(J,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{Ue(je,Ae)},children:"Upload Image"})})]})]})};export{ra as default};