import{y as Ce,r as t,A as i,j as o}from"./index-CGFmEmA4.js";import{a as u}from"./axios-Cm0UX6qg.js";import{B as C}from"./config-HOLfLxHr.js";import{b as Se,a as de}from"./CContainer-r0pJjvK6.js";import{C as ye}from"./CNavbar-C3RG89Yj.js";import{C as Q,a as I,b as B,c as P,d as n}from"./DefaultLayout-c2mwkARU.js";const Qe=()=>{const[{user:V,token:r},l]=Ce();t.useState(!1);const[Me,T]=t.useState(!1);t.useState(!1),t.useState(0),t.useState(0),t.useState(!0),t.useState([]),t.useState("All Chains"),t.useState("All market"),t.useState(""),t.useState(""),t.useState([]),t.useState(""),t.useState([]),t.useState("Selected markets"),t.useState([]),t.useState(!1);const[W,f]=t.useState("All Main Categories"),[me,b]=t.useState(""),[X,Y]=t.useState([]),[fe,p]=t.useState(""),[Z,U]=t.useState("Select Sub Categories"),[be,$]=t.useState(""),[N,z]=t.useState([]);t.useState({mainCategory:"",subCategory:"",category:""});const[c,S]=t.useState({selectMainCategory:"",selectMainSubCategory:"",moveMainCategory:"",moveMainSubCategory:""}),[d,y]=t.useState({selectMainCategory:"",selectMainSubCategory:"",selectMainSecondSubCategory:"",moveMainCategory:"",moveMainSubCategory:""});t.useState([]);const[x,h]=t.useState("All Main Categories"),[pe,v]=t.useState(""),[he,R]=t.useState("Select Sub Categories"),[ve,_]=t.useState(""),[ee,te]=t.useState([]),[De,D]=t.useState([]),[Ae,M]=t.useState(""),[je,A]=t.useState("All Main Categories"),[we,j]=t.useState(""),[ke,F]=t.useState("Select Sub Categories"),[Le,q]=t.useState(""),[Ee,ae]=t.useState([]),[Ie,oe]=t.useState([]),[se,G]=t.useState(""),[Be,re]=t.useState([]),[Pe,le]=t.useState("Select Second Sub Categories");t.useState([]);const[Te,w]=t.useState("All Main Categories"),[Ue,k]=t.useState(""),[$e,H]=t.useState("Select Sub Categories"),[ze,J]=t.useState(""),[Re,ie]=t.useState([]),[_e,K]=t.useState([]),[Fe,L]=t.useState("");t.useState(!1),t.useState([]),t.useState(0),t.useState(1),t.useState(),t.useEffect(()=>{r&&u.get(C+"product/categories",{headers:{Authorization:`Bearer ${r}`}}).then(e=>{e.status===200?(console.log(e.data[1]),Y(e.data),te(e.data),ie(e.data),ae(e.data)):e.status===500&&l({type:i,payload:{status:!0,title:"Main Category Loading error",message:"Main Category loading error"}})}).catch(e=>{console.error("Error: ",e)})},[]);const ce=()=>{console.log(c),ne()},ne=()=>{if(c){let e={category:c};V&&r&&u.put(C+"product/update/file/category",e,{headers:{Authorization:`Bearer ${r}`}}).then(a=>{a.status===200?l({type:i,payload:{status:!0,title:"Category Update",message:"Category update Success",color:"success"}}):a.status===204?l({type:i,payload:{status:!0,title:"Category Update",message:"No category found",color:"danger"}}):a.status===500&&l({type:i,payload:{status:!0,title:"Category Update",message:"Category update error",color:"danger"}})}).catch(a=>{console.error("Error:",a)})}else l({type:i,payload:{status:!0,title:"Category Update",message:"Please Check the Fields!",color:"warning"}})},m=(e,a,s)=>{s==="move"?e==="all"?(v(""),h("All Main Categories"),M("")):(v(e),E(e,"move"),h(a),M(e),S({...c,moveMainCategory:e})):s==="select"?e==="all"?(b(""),f("All Main Categories"),p("")):(b(e),ge(e),f(a),p(e),S({...c,selectMainCategory:e})):s==="select2"?e==="all"?(j(""),A("All Main Categories"),G("")):(j(e),E(e,"select2"),A(a),G(e),y({...d,selectMainCategory:e})):s==="move2"&&(e==="all"?(k(""),w("All Main Categories"),L("")):(k(e),E(e,"move2"),w(a),L(e),y({...d,moveMainCategory:e})))},O=(e,a,s)=>{s==="move"?e==="all"?(_(""),R("Select Main Categories"),v(""),h("All Main Categories"),D([]),M("")):(console.log("index",e),_(e),R(a),S({...c,moveMainSubCategory:e})):s==="select"?e==="all"?($(""),U("Select Main Categories"),b(""),f("All Main Categories"),z([]),p("")):(console.log("index",e),$(e),U(a),S({...c,selectMainSubCategory:e})):s==="select2"?e==="all"?(q(""),F("Select Main Categories"),j(""),A("All Main Categories"),D([]),M(""),le("Select Second Sub Categories")):(console.log("index",e),q(e),F(a),ue(se,e),y({...d,selectMainSubCategory:e})):s==="move2"&&(e==="all"?(J(""),H("Select Main Categories"),k(""),w("All Main Categories"),K([]),L("")):(console.log("index",e),J(e),H(a),y({...d,moveMainSubCategory:e})))},ge=e=>{r&&u.get(C+"product/categories/sub/"+e,{headers:{Authorization:`Bearer ${r}`}}).then(a=>{a.status===200?(z(a.data),console.log("select")):a.status===500&&l({type:i,payload:{status:!0,title:"Sub Category Loading",message:"Sub Category loading error"}})}).catch(a=>{console.error("Error: ",a)})},E=(e,a)=>{r&&u.get(C+"product/categories/sub/"+e,{headers:{Authorization:`Bearer ${r}`}}).then(s=>{s.status===200?(a==="move"?D(s.data):a==="select2"?oe(s.data):a==="move2"&&K(s.data),console.log("Move")):s.status===500&&l({type:i,payload:{status:!0,title:"Sub Category Loading",message:"Sub Category loading error"}})}).catch(s=>{console.error("Error: ",s)})},ue=(e,a,s)=>{r&&(T(!0),u.get(C+`product/categories/sub?mId=${e}&subId=${a}`,{headers:{Authorization:`Bearer ${r}`}}).then(g=>{g.status===200?(re(g.data),T(!1),console.log("Done Load")):g.status===500&&l({type:i,payload:{status:!0,title:"Sub Category Loading",message:"Sub Category loading error"}})}).catch(g=>{console.error("Error: ",g)}))};return o.jsxs(Se,{children:[o.jsx(ye,{style:{marginTop:"1%"},className:"bg-body-tertiary"}),o.jsx(Q,{style:{marginLeft:"0%",width:"7%",marginTop:"2%"},color:"secondary",children:"Select Category"}),o.jsxs(I,{style:{marginLeft:"2%",width:"20%",backgroundColor:"#ff4d4d"},children:[o.jsx(B,{children:W}),o.jsxs(P,{children:[o.jsx(n,{onClick:()=>m("all",null,"select"),children:"All Main Category"}),X.map((e,a)=>o.jsx(n,{onClick:()=>m(a,e,"select"),children:e},a))]})]}),o.jsxs(I,{style:{marginLeft:"2%",width:"20%",backgroundColor:"#ff4d4d"},children:[o.jsx(B,{children:Z}),o.jsxs(P,{children:[o.jsx(n,{onClick:()=>O("all",null,"select"),children:"Clear Category"}),N.map((e,a)=>o.jsx(n,{onClick:()=>O(a,e,"select"),children:e},a))]})]}),o.jsx(Q,{style:{marginLeft:"5%",width:"7%"},color:"secondary",children:"Send To"}),o.jsxs(I,{style:{marginLeft:"2%",width:"20%",backgroundColor:"#ff4d4d"},children:[o.jsx(B,{children:x}),o.jsxs(P,{children:[o.jsx(n,{onClick:()=>m("all",null,"move"),children:"All Main Category"}),ee.map((e,a)=>o.jsx(n,{onClick:()=>m(a,e,"move"),children:e},a))]})]}),o.jsx(de,{style:{marginLeft:"0%",backgroundColor:"#ff4d4d",color:"white",width:"19%",marginTop:"3%"},onClick:()=>{ce()},children:"Update"})]})};export{Qe as default};