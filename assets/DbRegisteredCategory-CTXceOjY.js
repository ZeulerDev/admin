import{x as ce,r as a,z as l,j as e,h as de,m as ue}from"./index-Dy30eiM6.js";import{a as v}from"./axios-B4uVmeYG.js";import{B as T}from"./config-HOLfLxHr.js";import{b as ge,a as y}from"./CContainer-PswvU4of.js";import{C as he}from"./CNavbar-DSEUJjHx.js";import{C as w}from"./CFormInput-C4Xof77t.js";import{C as me,a as ye,b as D,c as N,d as Ce,e as C}from"./CTable-2kSvDEKq.js";import{c as pe}from"./cil-pencil-m516yCOw.js";import{C as fe,a as E}from"./CPaginationItem-CIVwLBfW.js";import{C as L,a as Q,b as H,c as _}from"./CModalTitle-CFHTVTiy.js";import{C as F}from"./CModalFooter-BrzcW4v0.js";import"./CFormLabel-CXmS8KuA.js";import"./DefaultLayout-E8F3KeA2.js";const Be=()=>{const[{user:A,token:c},r]=ce();a.useState(!1),a.useState(!1);const[V,p]=a.useState(0),[f,xe]=a.useState(0),[U,I]=a.useState(!0);a.useState([]),a.useState("All Chains"),a.useState("All market"),a.useState(""),a.useState(""),a.useState([]);const[i,q]=a.useState(""),[G,B]=a.useState(i);a.useState([]);const[J,K]=a.useState(0),[h,x]=a.useState(1),[b,be]=a.useState(),[z,O]=a.useState([]),[W,S]=a.useState(!1),[X,u]=a.useState(!1),[Y,j]=a.useState(!1),[m,P]=a.useState(""),[M,k]=a.useState(""),[R,$]=a.useState("");a.useEffect(()=>{const t=setTimeout(()=>{r({type:l,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),S(!1)},2e4);return A&&c&&g(0,t),()=>{clearTimeout(t)}},[A,c,G]),a.useEffect(()=>{const t=setTimeout(()=>{(i.length>=3||i.length===0)&&B(i)},500);return()=>{clearTimeout(t)}},[i]);const g=(t,o)=>{console.log("search",i),S(!0),v.get(T+`product/category/main/db/${t}?name=${i}`,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(O(s.data.list),K(s.data.count),console.log(s.data.list.length),S(!1),clearTimeout(o),s.data.list.length<50?(I(!0),console.log("ok")):s.data.list.length>49&&I(!1),console.log(s.data.list.length)):s.status===500&&r({type:l,payload:{status:!0,title:"Category loading error",message:s.data.message}})}).catch(s=>{console.error("Error:",s)})},Z=()=>{x(h+1);const t=f+50;p(t),g(t,b)},ee=()=>{x(h-1);const t=f-50;console.log(t),p(t),g(t,b)},te=t=>{x(t);const o=(t-1)*50;p(o),g(o,b)},ae=()=>{const t=Math.ceil(J/50),o=[];for(let n=1;n<=t;n++)o.push(n);const s=Math.max(h-2,1),d=Math.min(s+4,t);return o.slice(s-1,d).map(n=>e.jsx(E,{active:h===n,onClick:()=>te(n),children:n},n))},se=()=>{u(!0)},oe=t=>{j(!0),$(t)},re=()=>{m?(console.log(m),ie(m),u(!1)):r({type:l,payload:{status:!0,title:"Check the fields",message:"Please check the fields",color:"warning"}})},le=()=>{R?(console.log(M,R),ne(M,R),u(!1)):r({type:l,payload:{status:!0,title:"Check the fields",message:"Please check the fields",color:"warning"}})},ie=t=>{if(t){const o={name:t};c&&v.post(T+"product/category/main/add",o,{headers:{Authorization:`Bearer ${c}`}}).then(s=>{s.status===200?(r({type:l,payload:{status:!0,title:"Category Registration",message:"Category Registration Success",color:"success"}}),u(!1),P(""),g(0)):s.status===400?r({type:l,payload:{status:!0,title:"Category Registration error",message:"Category Registration error",color:"warning"}}):s.status===500&&r({type:l,payload:{status:!0,title:"Picker Registration error",message:"Picker Registration error 500",color:"warning"}})}).catch(s=>{console.error("Error:",s)})}else r({type:l,payload:{status:!0,title:"Error!",message:"Picker Registration error, Please Check the input fields",color:"warning"}})},ne=(t,o)=>{if(t){const s={name:t,categoryId:o};c&&v.post(T+"product/category/sub/add",s,{headers:{Authorization:`Bearer ${c}`}}).then(d=>{d.status===200?(r({type:l,payload:{status:!0,title:"SubCategory Registration",message:"SubCategory Registration Success",color:"success"}}),j(!1),$(""),k("")):d.status===400?r({type:l,payload:{status:!0,title:"SubCategory Registration error",message:"SubCategory Registration error",color:"warning"}}):d.status===500&&r({type:l,payload:{status:!0,title:"SubCategory Registration error",message:"SubCategory Registration error 500",color:"warning"}})}).catch(d=>{console.error("Error:",d)})}else r({type:l,payload:{status:!0,title:"Error!",message:"Category Registration error, Please Check the input fields",color:"warning"}})};return e.jsxs(ge,{children:[e.jsx(y,{onClick:()=>{se()},style:{backgroundColor:"#ff4d4d",width:"17%",color:"white"},children:"Add Main Category"}),e.jsx(he,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:e.jsx(w,{type:"text",placeholder:"Search here",style:{width:450,marginRight:"30%"},value:i,onChange:t=>q(t.target.value)})}),W?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(de,{style:{marginTop:"15%"}})}):e.jsxs(me,{children:[e.jsx(ye,{children:e.jsxs(D,{children:[e.jsx(N,{scope:"col",children:"#"}),e.jsx(N,{scope:"col",children:"Name"}),e.jsx(N,{scope:"col",children:"Add Subcategory"})]})}),e.jsx(Ce,{children:z.length===0?e.jsx(D,{children:e.jsx(C,{colSpan:"3",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):z.map((t,o)=>e.jsxs(D,{children:[e.jsx(C,{children:V+o+1}),e.jsx(C,{children:t.name}),e.jsx(C,{children:e.jsx(y,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>{oe(t._id)},children:e.jsx(ue,{icon:pe,size:"lg",style:{color:"white"}})})})]},o))})]}),e.jsxs(fe,{"aria-label":"Page navigation example",children:[e.jsx(E,{disabled:f<=0,onClick:ee,children:"Previous"}),ae(),e.jsx(E,{disabled:U===!0,onClick:Z,children:"Next"})]}),e.jsxs(L,{alignment:"center",visible:X,scrollable:!0,size:"sm",onClose:()=>{u(!1),P("")},children:[e.jsx(Q,{closeButton:!0,children:e.jsx(H,{children:"Category Registration"})}),e.jsx(_,{children:e.jsx(w,{type:"text",placeholder:"Enter Category Name",value:m,onChange:t=>P(t.target.value)})}),e.jsx(F,{children:e.jsx(y,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{re()},children:"Save"})})]}),e.jsxs(L,{alignment:"center",visible:Y,scrollable:!0,size:"sm",onClose:()=>{j(!1),k("")},children:[e.jsx(Q,{closeButton:!0,children:e.jsx(H,{children:"Subcategory Registration"})}),e.jsx(_,{children:e.jsx(w,{type:"text",placeholder:"Enter Subcategory Name",value:M,onChange:t=>k(t.target.value)})}),e.jsx(F,{children:e.jsx(y,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{le()},children:"Save"})})]})]})};export{Be as default};