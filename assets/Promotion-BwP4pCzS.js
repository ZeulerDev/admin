import{r as s,y as De,A as i,j as e,L as b,h as ke,m as P}from"./index-BbIMGn6I.js";import{a as S}from"./axios-Cm0UX6qg.js";/* empty css               */import{B as D}from"./config-HOLfLxHr.js";import{b as ve,a as c}from"./CContainer-DW1l_mtt.js";import{C as we}from"./CNavbar-CaFAFoGR.js";import{C as f}from"./CFormInput-CYaLtnDR.js";import{C as Ae,a as Te,b as re,c as d,d as Le,e as u}from"./CTable-Bo3KO6JA.js";import{c as Ee}from"./cil-pencil-m516yCOw.js";import{c as ze}from"./cil-trash-CBbKHhHb.js";import{C as Ne,a as T}from"./CPaginationItem-Cm1VX4Uo.js";import{C as L,a as E,b as z,c as N}from"./CModalTitle-BlxPdlJz.js";import{C as k}from"./CCol-n25nGd7N.js";import"./CFormLabel-0HkVgzW6.js";import"./DefaultLayout-DAj23qfB.js";var ie=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z' class='ci-primary'/>"];const Je=()=>{var ae,oe;const[M,x]=s.useState(!1),[B,j]=s.useState(!1),[{user:y,token:m},l]=De(),[I,_]=s.useState([]),[ne,v]=s.useState(!1);s.useState(""),s.useState(""),s.useState("");const[h,ce]=s.useState(""),[de,$]=s.useState(h),[R,V]=s.useState(!1),[H,Q]=s.useState("");s.useState("All Cities"),s.useState("All Market Groups"),s.useState("All Chains"),s.useState([]),s.useState([]);const[Z,w]=s.useState(!1),[p,ue]=s.useState([]),[U,Y]=s.useState(),[q,F]=s.useState(),[G,J]=s.useState(),[K,W]=s.useState();s.useState(""),s.useState(""),s.useState(!1);const[me,X]=s.useState(!0),[he,pe]=s.useState(0),[C,O]=s.useState(1),[A,ee]=s.useState(0),[ge,te]=s.useState("");s.useEffect(()=>{const t=setTimeout(()=>{l({type:i,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),v(!1)},2e4);return g(0,t),()=>{clearTimeout(t)}},[de]),s.useEffect(()=>{const t=setTimeout(()=>{(h.length>=3||h.length===0)&&$(h)},500);return()=>{clearTimeout(t)}},[h]);const g=(t,a)=>{if(y&&m){v(!0);let o=D+`promotion/all/${t}?name=${h}`;S.get(o,{headers:{Authorization:`Bearer ${m}`}}).then(r=>{r.status===200?(_(r.data.list),console.log("result",r.data.list),pe(r.data.count),v(!1),clearTimeout(a),r.data.list.length<20?(X(!0),console.log("ok")):r.data.list.length>19&&X(!1)):r.status===500&&l({type:i,payload:{status:!0,title:"Error",message:r.data.message,color:"warning"}})}).catch(r=>{console.error("Error:",r)})}},fe=()=>{O(C+1);const t=A+50;ee(t),g(t,!0)},xe=()=>{O(C-1);const t=A-50;console.log(t),ee(t),g(t,!1)},je=()=>{const t=Math.ceil(he/20),a=[];for(let n=1;n<=t;n++)a.push(n);const o=Math.max(C-2,1),r=Math.min(o+4,t);return a.slice(o-1,r).map(n=>e.jsx(T,{active:C===n,onClick:()=>handlePages(n),children:n},n))},se=(t,a)=>{x(!M),V(a),Q(t)},ye=()=>{const t={status:R};console.log(H,t),y&&m&&S.patch(D+"promotion/update/status/"+H,t,{headers:{Authorization:`Bearer ${m}`}}).then(a=>{a.status===200?(console.log("updated"),x(!1),V(""),Q(""),g(0),l({type:i,payload:{status:!0,title:"Promotion status update",message:"Promotion status updated successfully",color:"success"}})):a.status===404?l({type:i,payload:{status:!0,title:"Promotion status update error",message:a.data.message}}):a.status===400?l({type:i,payload:{status:!0,title:"Promotion status update error",message:a.data.message}}):a.status===500&&l({type:i,payload:{status:!0,title:"Picker status update error",message:a.data.message}})}).catch(a=>{console.error(a)})},Ce=t=>{console.log(t),ue(t),w(!Z),Y(t.name),F(t.startDate),J(t.endDate),W(t.promo_id)},be=()=>{if(U&&q&&G&&K){const t={name:U,startDate:q,endDate:G,promo_id:K},a=p._id;console.log(t,a),m&&y&&m&&S.put(D+"promotion/update/"+a,t,{headers:{Authorization:`Bearer ${m}`}}).then(o=>{if(o.status===200){console.log(o.data),w(!1);const r=o.data,le=I.map(n=>n.id===r.id?(console.log("update obj"),r):n);_([...le]),l({type:i,payload:{status:!0,title:"Promotion update",message:"Promotion details updated successfully",color:"success"}})}else o.status===404?l({type:i,payload:{status:!0,title:"Promotion update error",message:"Missing required fields",color:"warning"}}):o.status===400?l({type:i,payload:{status:!0,title:"Promotion update error",message:o.data.message,color:"warning"}}):o.status===500&&l({type:i,payload:{status:!0,title:"Promotion update error",message:o.data.message,color:"warning"}})}).catch(o=>{console.error("Error:",o)})}else l({type:i,payload:{status:!0,title:"Error!",message:"Picker update error, Please Check the input fields",color:"warning"}})},Pe=t=>{j(!B),te(t)},Se=t=>{const a={disabled:!0};console.log(t,a),y&&m&&S.patch(D+"promotion/delete/"+t,a,{headers:{Authorization:`Bearer ${m}`}}).then(o=>{o.status===200?(console.log("updated"),j(!1),te(""),g(),l({type:i,payload:{status:!0,title:"Promotion Delete",message:"Promotion delete successfully",color:"success"}})):o.status===404?l({type:i,payload:{status:!0,title:"Promotion delete error",message:o.data.message}}):o.status===400?l({type:i,payload:{status:!0,title:"Promotion delete error",message:o.data.message}}):o.status===500&&l({type:i,payload:{status:!0,title:"Picker delete error",message:o.data.message}})}).catch(o=>{console.error(o)})};return e.jsxs(ve,{children:[e.jsx(b,{to:"/promotions/add/promotion",className:"picker-link",children:e.jsx(c,{style:{marginLeft:"0%",width:"17%",backgroundColor:"#ff4d4d",color:"white"},children:"Add Promotion"})}),e.jsx(we,{style:{marginTop:"1%"},className:"bg-body-tertiary",children:e.jsx(f,{type:"text",placeholder:"Search by Promotion by name",className:"picker-input",value:h,style:{width:480,marginLeft:"0%"},onChange:t=>ce(t.target.value)})}),ne?e.jsx(ke,{}):e.jsxs(Ae,{children:[e.jsx(Te,{children:e.jsxs(re,{children:[e.jsx(d,{scope:"col",children:"#"}),e.jsx(d,{scope:"col",children:"Promotion Id"}),e.jsx(d,{scope:"col",children:"Name"}),e.jsx(d,{scope:"col",children:"Start Date"}),e.jsx(d,{scope:"col",children:"End Date"}),e.jsx(d,{scope:"col",children:"Status"}),e.jsx(d,{scope:"col",children:"Manage Markets"}),e.jsx(d,{scope:"col",children:"Manage Products"}),e.jsx(d,{scope:"col",children:"Edit"}),e.jsx(d,{scope:"col",children:"Edit Status"}),e.jsx(d,{scope:"col",children:"Action"})]})}),e.jsx(Le,{children:I.map((t,a)=>e.jsxs(re,{children:[e.jsx(u,{children:a+1}),e.jsx(u,{children:t.promo_id}),e.jsx(u,{children:t.name}),e.jsx(u,{children:new Date(t.startDate).toLocaleDateString()}),e.jsx(u,{children:new Date(t.endDate).toLocaleDateString()}),e.jsx(u,{children:t.status===!0?"Active":"Deactive"}),e.jsx(u,{children:e.jsx(b,{to:`/promotions/market/${t._id}`,children:e.jsx(c,{size:"sm",style:{backgroundColor:"#ff4d4d",color:"white"},variant:"outline",children:e.jsx(P,{icon:ie,size:"lg",style:{color:"white"}})})})}),e.jsx(u,{children:e.jsx(b,{to:`/promotions/products/${t._id}`,children:e.jsx(c,{size:"sm",style:{backgroundColor:"#ff4d4d",color:"white"},variant:"outline",children:e.jsx(P,{icon:ie,size:"lg",style:{color:"white"}})})})}),e.jsx(u,{children:e.jsx(b,{children:e.jsx(P,{icon:Ee,size:"xl",onClick:()=>Ce(t)})})}),e.jsx(u,{children:t.status?e.jsx(c,{size:"sm",onClick:()=>se(t._id,!1),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Deactivate"}):e.jsx(c,{size:"sm",onClick:()=>se(t._id,!0),style:{backgroundColor:"#ff4d4d",width:90,color:"white"},children:"Activate"})}),e.jsx(u,{children:e.jsx(c,{size:"sm",style:{backgroundColor:"#ff4d4d"},variant:"outline",onClick:()=>Pe(t._id),children:e.jsx(P,{icon:ze,size:"lg",style:{color:"white"}})})})]},a))})]}),e.jsxs(Ne,{"aria-label":"Page navigation example",children:[e.jsx(T,{disabled:A<=0,onClick:xe,children:"Previous"}),je(),e.jsx(T,{disabled:me===!0,onClick:fe,children:"Next"})]}),e.jsxs(L,{alignment:"center",visible:B,scrollable:!0,size:"sm",onClose:()=>j(!1),children:[e.jsx(E,{closeButton:!1,children:e.jsx(z,{children:"Confirmation"})}),e.jsxs(N,{children:[e.jsx("a",{children:"Are you sure you want to delete this promotion?"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(c,{onClick:()=>Se(ge),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(c,{onClick:()=>j(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(L,{alignment:"center",visible:M,scrollable:!0,size:"sm",onClose:()=>x(!1),children:[e.jsx(E,{closeButton:!1,children:e.jsx(z,{children:"Confirmation"})}),e.jsxs(N,{children:[e.jsxs("a",{children:["Are you sure you want to ",R?"activate":"deactivate"," this promotion?"]}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",justifyContent:"center"},children:[e.jsx(c,{onClick:()=>ye(),style:{backgroundColor:"#ff4d4d",color:"white",marginRight:"10px"},children:"Yes"}),e.jsx(c,{onClick:()=>x(!1),style:{backgroundColor:"#ff4d4d",color:"white",marginLeft:"10px"},children:"No"})]})]})]}),e.jsxs(L,{visible:Z,scrollable:!0,size:"lg",onClose:()=>w(!1),children:[e.jsx(E,{closeButton:!0,children:e.jsx(z,{children:"Edit Promotion Information"})}),e.jsx(N,{children:e.jsxs("div",{className:"row g-3",children:[e.jsx(k,{md:6,children:e.jsx(f,{id:"name",label:"Promotion Name",defaultValue:p.name,onChange:t=>Y(t.target.value)})}),e.jsx(k,{md:6,children:e.jsx(f,{id:"startDate",label:"Start Date",type:"date",defaultValue:((ae=p.startDate)==null?void 0:ae.split("T")[0])||"",onChange:t=>F(t.target.value)})}),e.jsx(k,{md:6,children:e.jsx(f,{id:"endDate",label:"End Date",type:"date",defaultValue:((oe=p.endDate)==null?void 0:oe.split("T")[0])||"",onChange:t=>J(t.target.value)})}),e.jsx(k,{md:6,children:e.jsx(f,{id:"promotionid",label:"Promotion ID",readOnly:!0,defaultValue:p.promo_id,onChange:t=>W(t.target.value)})}),e.jsx(c,{type:"submit",style:{marginBottom:"3%",width:"200px",backgroundColor:"#ff4d4d",color:"white"},onClick:()=>be(),children:"Update Promotion"})]})})]})]})};export{Je as default};
