import{r as u,_ as y,a as d,b as h,c as x,P as e}from"./index-CaYaFnV6.js";var g=["xxl","xl","lg","md","sm","xs"],p=u.forwardRef(function(t,l){var i=t.children,m=t.className,c=y(t,["children","className"]),s=[];return g.forEach(function(n){var o=c[n];delete c[n];var a=n==="xs"?"":"-".concat(n);(typeof o=="number"||typeof o=="string")&&s.push("col".concat(a,"-").concat(o)),typeof o=="boolean"&&s.push("col".concat(a)),o&&typeof o=="object"&&((typeof o.span=="number"||typeof o.span=="string")&&s.push("col".concat(a,"-").concat(o.span)),typeof o.span=="boolean"&&s.push("col".concat(a)),(typeof o.order=="number"||typeof o.order=="string")&&s.push("order".concat(a,"-").concat(o.order)),typeof o.offset=="number"&&s.push("offset".concat(a,"-").concat(o.offset)))}),d.createElement("div",h({className:x(s.length>0?s:"col",m)},c,{ref:l}),i)}),f=e.oneOfType([e.bool,e.number,e.string,e.oneOf(["auto"])]),r=e.oneOfType([f,e.shape({span:f,offset:e.oneOfType([e.number,e.string]),order:e.oneOfType([e.oneOf(["first","last"]),e.number,e.string])})]);p.propTypes={children:e.node,className:e.string,xs:r,sm:r,md:r,lg:r,xl:r,xxl:r};p.displayName="CCol";export{p as C};