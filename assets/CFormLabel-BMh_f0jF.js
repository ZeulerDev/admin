import{r as p,_ as v,a as d,b as m,c as f,P as e}from"./index-B2mJY6nk.js";var n=p.forwardRef(function(a,t){var l,r=a.children,i=a.as,o=i===void 0?"div":i,s=a.className,c=a.invalid,b=a.tooltip,u=a.valid,y=v(a,["children","as","className","invalid","tooltip","valid"]);return d.createElement(o,m({className:f((l={},l["invalid-".concat(b?"tooltip":"feedback")]=c,l["valid-".concat(b?"tooltip":"feedback")]=u,l),s)},y,{ref:t}),r)});n.propTypes={as:e.elementType,children:e.node,className:e.string,invalid:e.bool,tooltip:e.bool,valid:e.bool};n.displayName="CFormFeedback";var N=function(a){var t=a.describedby,l=a.feedback,r=a.feedbackInvalid,i=a.feedbackValid,o=a.invalid,s=a.tooltipFeedback,c=a.valid;return d.createElement(d.Fragment,null,l&&(c||o)&&d.createElement(n,m({},o&&{id:t},{invalid:o,tooltip:s,valid:c}),l),r&&d.createElement(n,{id:t,invalid:!0,tooltip:s},r),i&&d.createElement(n,{valid:!0,tooltip:s},i))};N.propTypes={describedby:e.string,feedback:e.oneOfType([e.node,e.string]),feedbackValid:e.oneOfType([e.node,e.string]),feedbackInvalid:e.oneOfType([e.node,e.string]),invalid:e.bool,tooltipFeedback:e.bool,valid:e.bool};N.displayName="CFormControlValidation";var k=p.forwardRef(function(a,t){var l=a.children,r=a.className,i=a.customClassName,o=v(a,["children","className","customClassName"]);return d.createElement("label",m({className:i??f("form-label",r)},o,{ref:t}),l)});k.propTypes={children:e.node,className:e.string,customClassName:e.string};k.displayName="CFormLabel";export{k as C,N as a};
