import{r as o,y as es,l as ss,A as c,j as e,h as ge,L as N,m as E}from"./index-DL088vmD.js";import{a as C}from"./axios-Cm0UX6qg.js";import{B as x}from"./config-HOLfLxHr.js";import{b as ts,a as G}from"./CContainer-Cz7hNUvN.js";import{C as as}from"./CNavbar-BVF-796O.js";import{C as p}from"./CFormInput-CpQLZKmo.js";import{C as xe,a as je,b as M,c as l,d as fe,e as i}from"./CTable-BSxJfPDp.js";import{C as Ce}from"./CCardImage-u0t1JMSY.js";import{c as os}from"./cil-pencil-m516yCOw.js";import{c as rs}from"./cil-info-CmGCY32x.js";import{e as ls}from"./DefaultLayout-CbdqckCh.js";import{C as ye,a as j}from"./CPaginationItem-QA40uF-_.js";import{C as T,a as U,b as B,c as L}from"./CModalTitle-gMqvNIMh.js";import{C as J}from"./CModalFooter-BbdK8yzN.js";import{C as h}from"./CCol-B72LVP_5.js";import"./CFormLabel-Be3SnnEd.js";var ns=["512 512","<rect width='288' height='32' x='112' y='152' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='288' height='32' x='112' y='240' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='152' height='32' x='112' y='328' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M480,48H32V464H480ZM448,432H64V80H448Z' class='ci-primary'/>"];const Ss=()=>{const[K,W]=o.useState(!1),[{user:f,token:u},n]=es();ss();const[X,O]=o.useState([]),[Pe,be]=o.useState([]);o.useState(!1);const[we,ee]=o.useState(!1),[Se,z]=o.useState(!1),[y,D]=o.useState(0),[se,P]=o.useState(!1),[m,Ie]=o.useState([]),[te,ae]=o.useState(),[oe,re]=o.useState(),[le,ne]=o.useState(),[ce,ie]=o.useState(),[R,ve]=o.useState(""),[Ae,de]=o.useState(!0),[ke,Ne]=o.useState(0),[b,V]=o.useState(1),[w,S]=o.useState(0),[I,v]=o.useState(1),[Ee,Me]=o.useState(0),[Te,H]=o.useState(!0),[_,$]=o.useState(""),[A,Ue]=o.useState(""),[F,Be]=o.useState(""),[Le,Q]=o.useState(!1),[ue,Z]=o.useState(!1),[ze,he]=o.useState("");o.useEffect(()=>{const s=setTimeout(()=>{n({type:c,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),z(!1)},2e4);return f&&u&&g(0,s),()=>{clearTimeout(s)}},[f,u,R]);const g=(s,a)=>{z(!0),C.get(x+"assistant/customers/"+s+"?email="+R,{headers:{Authorization:`Bearer ${u}`}}).then(t=>{t.status===200?(O(t.data.list),Ne(t.data.count),z(!1),clearTimeout(a),console.log(x),t.data.list.length<50?(de(!0),console.log("ok")):t.data.list.length>49&&de(!1)):t.status===500&&n({type:c,payload:{status:!0,title:"Customers loading error",message:t.data.message}})}).catch(t=>{console.error("Error:",t)})},De=()=>{V(b+1);const s=y+50;D(s),g(s,!0)},Re=()=>{V(b-1);const s=y-50;console.log(s),D(s),g(s,!1)},Ve=()=>{v(I+1);const s=w+20;S(s),k(_,s)},He=()=>{v(I-1);const s=w-20;console.log(s),S(s),k(_,s)},_e=s=>{W(!K),$(s),k(s,0)},k=(s,a)=>{$(s),u&&(ee(!0),C.get(x+`assistant/addresses/customer/${a}/`+s,{headers:{Authorization:`Bearer ${u}`}}).then(t=>{t.status===200?(console.log(t.data.count),be(t.data.list),Me(t.data.count),t.data.list.length<20?(H(!0),console.log("ok")):t.data.list.length>19&&H(!1),ee(!1)):t.status===500&&n({type:c,payload:{status:!0,title:"Customers address error",message:t.data.message}})}).catch(t=>{console.error("Customers address:",t)}))},$e=s=>{console.log(s),P(!se),Ie(s),ae(s.name),re(s.surname),ne(s.email),ie(s.contact)},Fe=()=>{if(te&&oe&&le&&ce){const s={name:te,surname:oe,email:le,contact:ce},a=m._id;console.log("id",a),u&&f&&u&&C.patch(x+"assistant/customers/update/"+a,s,{headers:{Authorization:`Bearer ${u}`}}).then(t=>{if(t.status===200){P(!1),g(0,!0);const d=t.data,q=X.map(r=>r.id===d.id?d:r);O([...q]),n({type:c,payload:{status:!0,title:"Customer update",message:"Customer updated successfully",color:"success"}})}else t.status===203?n({type:c,payload:{status:!0,title:"Customer update error",message:"203",color:"warning"}}):t.status===204?n({type:c,payload:{status:!0,title:"Customer update error",message:"204",color:"warning"}}):t.status===500&&n({type:c,payload:{status:!0,title:"Customer update error",message:"500",color:"warning"}})}).catch(t=>{console.error("Error:",t)})}else n({type:c,payload:{status:!0,title:"Error!",message:"Customer update error, Please Check the input fields",color:"warning"}})},Qe=s=>{V(s);const a=(s-1)*50;D(a),g(a,!0)},Ze=()=>{const s=Math.ceil(ke/50),a=[];for(let r=1;r<=s;r++)a.push(r);const t=Math.max(b-2,1),d=Math.min(t+4,s);return a.slice(t-1,d).map(r=>e.jsx(j,{active:b===r,onClick:()=>Qe(r),children:r},r))},Ye=s=>{v(s);const a=(s-1)*20;S(a),k(_,a)},qe=()=>{const s=Math.ceil(Ee/20),a=[];for(let r=1;r<=s;r++)a.push(r);const t=Math.max(I-2,1),d=Math.min(t+4,s);return a.slice(t-1,d).map(r=>e.jsx(j,{active:I===r,onClick:()=>Ye(r),children:r},r))},Ge=()=>{P(!1),Q(!0)},Je=s=>{if(A===""||F==="")n({type:c,payload:{status:!0,title:"Password update error",message:"Check the input fields",color:"warning"}});else if(A===F){const a={password:A};console.log(a,s),f&&u&&C.patch(x+"assistant/customers/update/"+s,a,{headers:{Authorization:`Bearer ${u}`}}).then(t=>{t.status===200?(Q(!1),n({type:c,payload:{status:!0,title:"Password update",message:"Password updated successfully",color:"success"}}),setVisiblePicker(!0)):t.status===203?n({type:c,payload:{status:!0,title:"Password update error",message:t.data.message}}):t.status===204?n({type:c,payload:{status:!0,title:"Password update error",message:t.data.message}}):t.status===500&&n({type:c,payload:{status:!0,title:"Password update error",message:t.data.message}})}).catch(t=>{console.error(t)})}else n(A!==F?{type:c,payload:{status:!0,title:"Password update error",message:"Password does not match",color:"warning"}}:{type:c,payload:{status:!0,title:"Password update error",message:"Password update error or check the input fields",color:"warning"}})},Ke=s=>{Z(!ue),he(s)},[We,Y]=o.useState(null),[pe,me]=o.useState(null),Xe=s=>{console.log(s),me(URL.createObjectURL(s)),Y(s)},Oe=async(s,a)=>{if(console.log(s,a),f&&u){const t=new FormData;t.append("image",a),t.append("id",s),C.post(x+"test/customer/image/update",t,{headers:{Authorization:`Bearer ${u}`}}).then(d=>{d.status===200?(Z(!1),he(""),Y(null),console.log("response",d.data),n({type:c,payload:{status:!0,title:"Image upload ",message:"Image upload success",color:"success"}}),g(0,!0)):d.status===500&&n({type:c,payload:{status:!0,title:"Image upload error",message:d.data.message,color:"danger"}})}).catch(d=>{console.error("Error:",d)})}};return e.jsxs(ts,{children:[e.jsx(as,{className:"bg-body-tertiary",children:e.jsx(p,{type:"text",placeholder:"Search by customer name, surname, email and contact",style:{width:450,marginLeft:"0%"},value:R,onChange:s=>ve(s.target.value)})}),Se?e.jsx(ge,{}):e.jsxs(xe,{children:[e.jsx(je,{children:e.jsxs(M,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"Photo"}),e.jsx(l,{scope:"col",children:"Name"}),e.jsx(l,{scope:"col",children:"Surname"}),e.jsx(l,{scope:"col",children:"email"}),e.jsx(l,{scope:"col",children:"Contact"}),e.jsx(l,{scope:"col",children:"Country"}),e.jsx(l,{scope:"col",children:"Language"}),e.jsx(l,{scope:"col",children:"Edit"}),e.jsx(l,{scope:"col",children:"Address"}),e.jsx(l,{scope:"col",children:"List"}),e.jsx(l,{scope:"col",children:"Order"})]})}),e.jsx(fe,{children:X.map((s,a)=>e.jsxs(M,{children:[e.jsx(i,{children:y+a+1}),e.jsx(l,{onClick:()=>{Ke(s._id)},children:e.jsx(Ce,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.photo})}),e.jsx(i,{children:s.name}),e.jsx(i,{children:s.surname}),e.jsx(i,{children:s.email}),e.jsx(i,{children:s.contact}),e.jsx(i,{children:s.country==="it"||s.country==="Italy"?"Italy":s.country}),e.jsx(i,{children:s.language==="en"?"English":s.language==="it"?"Italy":s.language}),e.jsx(i,{children:e.jsx(N,{children:e.jsx(E,{icon:os,size:"xl",onClick:()=>$e(s)})})}),e.jsx(i,{children:e.jsx(N,{children:e.jsx(E,{icon:rs,size:"xl",onClick:()=>_e(s._id)})})}),e.jsx(i,{children:e.jsx(N,{to:`/customers/list/${s._id}`,children:e.jsx(E,{icon:ns,size:"xl"})})}),e.jsx(i,{children:e.jsx(N,{to:`/customers/items/${s._id}`,children:e.jsx(E,{icon:ls,size:"xl"})})})]},a))})]}),e.jsxs(ye,{"aria-label":"Page navigation example",children:[e.jsx(j,{disabled:y<=0,onClick:Re,children:"Previous"}),Ze(),e.jsx(j,{disabled:Ae===!0,onClick:De,children:"Next"})]}),e.jsxs(T,{alignment:"center",visible:ue,scrollable:!0,size:"lg",onClose:()=>{Z(!1),Y(null),me(null)},children:[e.jsx(U,{closeButton:!0,children:e.jsx(B,{children:"Image Uploader"})}),e.jsxs(L,{children:[pe&&e.jsx(Ce,{style:{width:"100px",height:"100px"},src:pe,alt:"Uploaded Image"}),e.jsx("input",{style:{marginLeft:"5%"},type:"file",accept:".jpg, .jpeg, .png",onChange:s=>Xe(s.target.files[0])})]}),e.jsx(J,{children:e.jsx(G,{style:{backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{Oe(ze,We)},children:"Upload Image"})})]}),e.jsxs(T,{alignment:"center",visible:Le,scrollable:!0,size:"sm",onClose:()=>Q(!1),children:[e.jsx(U,{closeButton:!0,children:e.jsx(B,{children:"Update Password"})}),e.jsxs(L,{children:[e.jsx(h,{md:12,children:e.jsx(p,{id:"password",label:"Enter New Password",type:"password",onChange:s=>Ue(s.target.value)})}),e.jsx("br",{}),e.jsx(h,{md:12,children:e.jsx(p,{id:"repassword",label:"Re Enter Password",type:"password",onChange:s=>Be(s.target.value)})})]}),e.jsx(J,{children:e.jsx(G,{type:"submit",style:{marginBottom:"3%",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>{Je(m._id)},children:"Update"})})]}),e.jsxs(T,{visible:K,scrollable:!0,size:"xl",onClose:()=>{W(!1),S(0),v(1),H(!0),$("")},children:[e.jsx(U,{closeButton:!0,children:e.jsx(B,{children:"Used Addresses"})}),e.jsx(L,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:we?e.jsx(ge,{}):e.jsxs(xe,{children:[e.jsx(je,{children:e.jsxs(M,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"Name"}),e.jsx(l,{scope:"col",children:"Intercom"}),e.jsx(l,{scope:"col",children:"Flat"}),e.jsx(l,{scope:"col",children:"Street"}),e.jsx(l,{scope:"col",children:"House Number"})]})}),e.jsx(fe,{children:Pe.map((s,a)=>e.jsxs(M,{children:[e.jsx(i,{children:w+a+1}),e.jsx(i,{children:s.name}),e.jsx(i,{children:s.intercom}),e.jsx(i,{children:s.flat}),e.jsx(i,{children:s.street}),e.jsx(i,{children:s.houseNumber})]},a))})]})}),e.jsx(J,{children:e.jsxs(ye,{"aria-label":"Page navigation example",children:[e.jsx(j,{disabled:w<=0,onClick:He,children:"Previous"}),qe(),e.jsx(j,{disabled:Te===!0,onClick:Ve,children:"Next"})]})})]}),e.jsxs(T,{visible:se,scrollable:!0,size:"lg",onClose:()=>P(!1),children:[e.jsx(U,{closeButton:!0,children:e.jsx(B,{children:"Edit Customer Information"})}),e.jsx(L,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(h,{md:6,children:e.jsx(p,{id:"name",label:"Firt Name",defaultValue:m.name,onChange:s=>ae(s.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"surname",label:"LastName",defaultValue:m.surname,onChange:s=>re(s.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"email",label:"Email",defaultValue:m.email,onChange:s=>ne(s.target.value)})}),e.jsx(h,{md:6,children:e.jsx(p,{id:"phone",label:"Contact Number",defaultValue:m.contact,onChange:s=>ie(s.target.value)})}),e.jsx(h,{xs:6,children:e.jsx(G,{type:"submit",style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>Fe(),children:"Update Customer"})}),e.jsx(h,{xs:6,children:e.jsx("span",{style:{fontSize:15,color:"red",cursor:"pointer",marginLeft:"64%",marginTop:"10%"},onClick:()=>Ge(),children:"Change Password"})})]})})]})]})};export{Ss as default};
