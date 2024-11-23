import{r as o,x as oe,l as ce,z as u,j as e,h as b,L as A,m as B}from"./index-DN-qvEvp.js";import{a as T}from"./axios-B4uVmeYG.js";/* empty css               */import{B as D}from"./config-HOLfLxHr.js";import{b as ie}from"./CContainer-CE2leGJY.js";import{C as ne}from"./CNavbar-BwzS-p4g.js";import{D as de}from"./index-CPLErkGq.js";import{C as I,a as V,b as h,c as l,d as z,e as a}from"./CTable-ga_G5UAI.js";import{C as R,c as xe}from"./DefaultLayout-DIk-F9gb.js";import{c as he}from"./cil-info-CmGCY32x.js";import{C as me,a as H}from"./CPaginationItem-CvHo-KRp.js";import{C as $,a as Y,b as _,c as q}from"./CModalTitle-BCVX7zp0.js";import{C as ue}from"./CCardImage-BGC5XzWU.js";import{C as Q}from"./CModalFooter-YX-dALfA.js";import{C as U}from"./CRow-Dy7AoFdQ.js";import{C as i}from"./CFormLabel-Cf3WryxB.js";import{C as n}from"./CCol-zmKUvkDb.js";import{C as d}from"./CFormInput-C5VMyRoB.js";import{f as G}from"./index-CTYcLtJ8.js";import"./createClass-DQukZ2RA.js";import"./typeof-QjJsDpFa.js";const Be=()=>{var L,P;const[N,v]=o.useState(!1),[J,O]=o.useState(!1),[{user:j,token:x},m]=oe();ce();const[S,K]=o.useState([]),[c,W]=o.useState([]),[X,g]=o.useState(!1),[y,p]=o.useState(!1),[E,Z]=o.useState([]),[M,F]=o.useState([]),[f,k]=o.useState(0),[ee,w]=o.useState(!0);o.useEffect(()=>{const s=setTimeout(()=>{m({type:u,payload:{status:!0,title:"Data Loading",message:"Data loading error: Timeout exceeded",color:"warning"}}),g(!1)},2e4);return j&&x&&C(0,s),()=>{clearTimeout(s)}},[j,x,M]);const C=(s,t)=>{g(!0),T.get(D+"assistant/grocery/orders/"+s+"?date="+M,{headers:{Authorization:`Bearer ${x}`}}).then(r=>{r.status===200?(K(r.data),g(!1),clearTimeout(t),r.data.length<50?(w(!0),console.log("ok")):r.data.length>49&&w(!1)):r.status===204?m({type:u,payload:{status:!0,title:"Orders loading error",message:r.data.message}}):r.status===500&&m({type:u,payload:{status:!0,title:"Orders loading error",message:r.data.message}})}).catch(r=>{console.error("Error:",r)})},se=()=>{const s=f+50;k(s),C(s,!0)},te=()=>{const s=f-50;console.log(s),k(s),C(s,!1)},ae=s=>{v(!N),console.log(s),x&&j&&(p(!0),T.get(D+"assistant/grocery/order/details/"+s,{headers:{Authorization:`Bearer ${x}`}}).then(t=>{t.status===200?(Z(t.data),console.log("data",t.data),p(!1)):t.status===500&&m({type:u,payload:{status:!0,title:"Order details view error",message:t.data.message}})}).catch(t=>{console.error("Order details view error:",t)}))},le=s=>{O(!y),console.log(s),x&&j&&(p(!0),T.get(D+"assistant/grocery/customer/"+s,{headers:{Authorization:`Bearer ${x}`}}).then(t=>{t.status===200?(W(t.data),p(!1)):t.status===500&&m({type:u,payload:{status:!0,title:"Order details view error",message:t.data.message}})}).catch(t=>{console.error("Order details view error:",t)}))},re=s=>{if(s){const t=G(s[0],"yyyy-MM-dd"),r=G(s[1],"yyyy-MM-dd");F([t,r])}else F([])};return e.jsxs(ie,{children:[e.jsx(ne,{className:"bg-body-tertiary",children:e.jsx(de,{style:{marginLeft:0},format:"yyyy/MM/dd",onChange:re})}),X?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(b,{})}):e.jsxs(I,{children:[e.jsx(V,{children:e.jsxs(h,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"No"}),e.jsx(l,{scope:"col",children:"Customer"}),e.jsx(l,{scope:"col",children:"Status"}),e.jsx(l,{scope:"col",children:"Address"}),e.jsx(l,{scope:"col",children:"Delivery Fee"}),e.jsx(l,{scope:"col",children:"Slot"}),e.jsx(l,{scope:"col",children:"Date"}),e.jsx(l,{scope:"col",children:"Total"}),e.jsx(l,{scope:"col",children:"Markup"}),e.jsx(l,{scope:"col",children:"Order Details"}),e.jsx(l,{scope:"col",children:"Info"})]})}),e.jsx(z,{children:S.length===0?e.jsx(h,{children:e.jsx(a,{colSpan:"12",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):S.map((s,t)=>e.jsxs(h,{children:[e.jsx(a,{children:f+t+1}),e.jsx(a,{children:s.no}),e.jsx(a,{children:s.customer}),e.jsx(a,{children:e.jsx(R,{style:{width:80},color:"info",children:s.status})}),e.jsx(a,{children:s.address}),e.jsx(a,{children:((s==null?void 0:s.deliveryFee)??0).toFixed(2)}),e.jsx(a,{children:s.slot}),e.jsx(a,{children:s.date}),e.jsx(a,{children:((s==null?void 0:s.total)??0).toFixed(2)}),e.jsx(a,{children:s.markup}),e.jsx(a,{children:e.jsx(A,{children:e.jsx(B,{icon:he,size:"xl",onClick:()=>ae(s.id)})})}),e.jsx(a,{children:e.jsx(A,{children:e.jsx(B,{icon:xe,size:"xl",onClick:()=>le(s.id)})})})]},t))})]}),e.jsxs(me,{"aria-label":"Page navigation example",children:[e.jsx(H,{disabled:f<=0,onClick:te,children:"Previous"}),e.jsx(H,{disabled:ee===!0,onClick:se,children:"Next"})]}),e.jsxs($,{visible:N,scrollable:!0,size:"xl",onClose:()=>v(!1),children:[e.jsx(Y,{closeButton:!0,children:e.jsx(_,{children:"Customer Order Information"})}),e.jsx(q,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:y?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(b,{})}):e.jsxs(I,{children:[e.jsx(V,{children:e.jsxs(h,{children:[e.jsx(l,{scope:"col",children:"#"}),e.jsx(l,{scope:"col",children:"Photo"}),e.jsx(l,{scope:"col",children:"Name"}),e.jsx(l,{scope:"col",children:"Price"}),e.jsx(l,{scope:"col",children:"Qty"}),e.jsx(l,{scope:"col",children:"Measure"}),e.jsx(l,{scope:"col",children:"Market"}),e.jsx(l,{scope:"col",children:"Status"})]})}),e.jsx(z,{children:E.length===0?e.jsx(h,{children:e.jsx(a,{colSpan:"8",style:{textAlign:"center",backgroundColor:"white"},children:e.jsx("h6",{style:{marginTop:"1%"},children:"No Data"})})}):(L=E.items)==null?void 0:L.map((s,t)=>e.jsxs(h,{children:[e.jsx(a,{children:t+1}),e.jsx(a,{children:e.jsx(ue,{style:{width:50,height:50,borderRadius:10},src:"https://api.zeuler.com/image/"+s.photo})}),e.jsx(a,{children:s.name}),e.jsx(a,{children:s.price}),e.jsx(a,{children:s.qty}),e.jsx(a,{children:s.measure}),e.jsxs(a,{children:[s.chain," - ",s.market]}),e.jsx(a,{children:e.jsx(R,{style:{width:80},color:"info",children:s.status})})]},t))})]})}),e.jsx(Q,{})]}),e.jsxs($,{visible:J,scrollable:!0,size:"lg",onClose:()=>O(!1),children:[e.jsx(Y,{closeButton:!0,children:e.jsx(_,{children:"Customer Information"})}),e.jsx(q,{style:{overflowY:"auto",maxHeight:"70vh",display:"flex",justifyContent:"center"},children:y?e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx(b,{style:{marginTop:"15%"}})}):e.jsxs("div",{children:[e.jsxs(U,{className:"mb-3",children:[e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Name"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.name,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Address"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:(P=c.address)==null?void 0:P.name,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Email"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.email,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Contact"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.contact,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Language"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.language==="en"?"English":c.language,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Country"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.country==="en"?"English":c.country,readOnly:!0,plainText:!0})})]}),e.jsxs(U,{className:"mb-3",children:[e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Latitude"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.lat,readOnly:!0,plainText:!0})}),e.jsx(i,{htmlFor:"staticEmail",className:"col-sm-2 col-form-label",children:"Longitude"}),e.jsx(n,{sm:10,children:e.jsx(d,{type:"text",defaultValue:c.lng,readOnly:!0,plainText:!0})})]})]})}),e.jsx(Q,{})]})]})};export{Be as default};
