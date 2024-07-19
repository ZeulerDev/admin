import{r as u,R as O,e as h}from"./index-yStlV239.js";import{l as c,u as v,d as w,c as L,a as f,e as d,b as E,f as G,g as S,h as N,i as P,j as R,k as _,m as I,n as B,w as H}from"./leaflet-CcVPK71n.js";import{M as Ce,P as Le,T as ve}from"./leaflet-CcVPK71n.js";import{F as Ee,P as ge}from"./Polygon-BKAgnFYA.js";import{M as Oe}from"./Marker-B_zzFHJb.js";function M(a,n,e){n.center!==e.center&&a.setLatLng(n.center),n.radius!=null&&n.radius!==e.radius&&a.setRadius(n.radius)}function V(a){return a.split(" ").filter(Boolean)}function A(a,n){V(n).forEach(e=>{c.DomUtil.addClass(a,e)})}function g(a,n,e){n.bounds instanceof c.LatLngBounds&&n.bounds!==e.bounds&&a.setBounds(n.bounds),n.opacity!=null&&n.opacity!==e.opacity&&a.setOpacity(n.opacity),n.zIndex!=null&&n.zIndex!==e.zIndex&&a.setZIndex(n.zIndex)}function k(){return v().map}function Y(a,n){const e=k();return u.useEffect(function(){return e.on(a,n),function(){e.off(a,n)}},[e,a,n]),e}function K(a){const n=k();return u.useEffect(function(){return n.on(a),function(){n.off(a)}},[n,a]),n}const Q=w(function(n){return new c.Control.Attribution(n)}),X=L(function({center:n,children:e,...t},o){const r=new c.Circle(n,t);return f(r,d(o,{overlayContainer:r}))},M),ee=L(function({center:n,children:e,...t},o){const r=new c.CircleMarker(n,t);return f(r,d(o,{overlayContainer:r}))},M),ne=L(function({data:n,...e},t){const o=new c.GeoJSON(n,e);return f(o,d(t,{overlayContainer:o}))},function(n,e,t){e.style!==t.style&&(e.style==null?n.resetStyle():n.setStyle(e.style))}),te=E(function({bounds:n,url:e,...t},o){const r=new c.ImageOverlay(e,n,t);return f(r,d(o,{overlayContainer:r}))},function(n,e,t){if(g(n,e,t),e.bounds!==t.bounds){const o=e.bounds instanceof c.LatLngBounds?e.bounds:new c.LatLngBounds(e.bounds);n.setBounds(o)}e.url!==t.url&&n.setUrl(e.url)}),ae=E(function({children:n,...e},t){const o=new c.LayerGroup([],e);return f(o,d(t,{layerContainer:o}))}),J=P(function({children:n,...e},t){const o=new c.Control.Layers(void 0,void 0,e);return f(o,d(t,{layersControl:o}))},function(n,e,t){e.collapsed!==t.collapsed&&(e.collapsed===!0?n.collapse():n.expand())}),j=N(J),x=G(j);function T(a){return function(e){const t=v(),o=u.useRef(e),[r,l]=u.useState(null),{layersControl:i,map:s}=t,y=u.useCallback(C=>{i!=null&&(o.current.checked&&s.addLayer(C),a(i,C,o.current.name),l(C))},[i,s]),m=u.useCallback(C=>{i==null||i.removeLayer(C),l(null)},[i]),p=u.useMemo(()=>d(t,{layerContainer:{addLayer:y,removeLayer:m}}),[t,y,m]);return u.useEffect(()=>{r!==null&&o.current!==e&&(e.checked===!0&&(o.current.checked==null||o.current.checked===!1)?s.addLayer(r):o.current.checked===!0&&(e.checked==null||e.checked===!1)&&s.removeLayer(r),o.current=e)}),e.children?O.createElement(S,{value:p},e.children):null}}x.BaseLayer=T(function(n,e,t){n.addBaseLayer(e,t)});x.Overlay=T(function(n,e,t){n.addOverlay(e,t)});const z=["mapPane","markerPane","overlayPane","popupPane","shadowPane","tilePane","tooltipPane"];function b(a,n){const{[n]:e,...t}=a;return t}function U(a,n,e){if(z.indexOf(a)!==-1)throw new Error(`You must use a unique name for a pane that is not a default Leaflet pane: ${a}`);if(e.map.getPane(a)!=null)throw new Error(`A pane with this name already exists: ${a}`);const t=n.pane??e.pane,o=t?e.map.getPane(t):void 0,r=e.map.createPane(a,o);return n.className!=null&&A(r,n.className),n.style!=null&&Object.keys(n.style).forEach(l=>{r.style[l]=n.style[l]}),r}function W(a,n){const[e]=u.useState(a.name),[t,o]=u.useState(null);u.useImperativeHandle(n,()=>t,[t]);const r=v(),l=u.useMemo(()=>({...r,pane:e}),[r]);return u.useEffect(()=>(o(U(e,a,r)),function(){var y;const s=r.map.getPane(e);(y=s==null?void 0:s.remove)==null||y.call(s),r.map._panes!=null&&(r.map._panes=b(r.map._panes,e),r.map._paneRenderers=b(r.map._paneRenderers,e))}),[]),a.children!=null&&t!=null?h.createPortal(O.createElement(S,{value:l},a.children),t):null}const oe=u.forwardRef(W),re=L(function({positions:n,...e},t){const o=new c.Polyline(n,e);return f(o,d(t,{overlayContainer:o}))},function(n,e,t){e.positions!==t.positions&&n.setLatLngs(e.positions)}),le=L(function({bounds:n,...e},t){const o=new c.Rectangle(n,e);return f(o,d(t,{overlayContainer:o}))},function(n,e,t){e.bounds!==t.bounds&&n.setBounds(e.bounds)}),ce=w(function(n){return new c.Control.Scale(n)}),Z=P(function(n,e){const{attributes:t,bounds:o,...r}=n,l=document.createElementNS("http://www.w3.org/2000/svg","svg");l.setAttribute("xmlns","http://www.w3.org/2000/svg"),t!=null&&Object.keys(t).forEach(s=>{l.setAttribute(s,t[s])});const i=new c.SVGOverlay(l,o,r);return f(i,e,l)},g),D=R(Z);function F({children:a,...n},e){const{instance:t,container:o}=D(n).current;return u.useImperativeHandle(e,()=>t),o==null||a==null?null:h.createPortal(a,o)}const ue=u.forwardRef(F),ie=_(function(n,e){const t=new c.Tooltip(n,e.overlayContainer);return f(t,e)},function(n,e,{position:t},o){u.useEffect(function(){const l=e.overlayContainer;if(l==null)return;const{instance:i}=n,s=m=>{m.tooltip===i&&(t!=null&&i.setLatLng(t),i.update(),o(!0))},y=m=>{m.tooltip===i&&o(!1)};return l.on({tooltipopen:s,tooltipclose:y}),l.bindTooltip(i),function(){l.off({tooltipopen:s,tooltipclose:y}),l._map!=null&&l.unbindTooltip()}},[n,e,o,t])}),se=E(function({bounds:n,url:e,...t},o){var l;const r=new c.VideoOverlay(e,n,t);return t.play===!0&&((l=r.getElement())==null||l.play()),f(r,d(o,{overlayContainer:r}))},function(n,e,t){g(n,e,t),typeof e.url=="string"&&e.url!==t.url&&n.setUrl(e.url);const o=n.getElement();o!=null&&(e.play===!0&&!t.play?o.play():!e.play&&t.play===!0&&o.pause())}),fe=I(function({eventHandlers:n,params:e={},url:t,...o},r){const l=new c.TileLayer.WMS(t,{...e,...H(o,r)});return f(l,r)},function(n,e,t){B(n,e,t),e.params!=null&&e.params!==t.params&&n.setParams(e.params)}),de=w(function(n){return new c.Control.Zoom(n)});export{Q as AttributionControl,X as Circle,ee as CircleMarker,Ee as FeatureGroup,ne as GeoJSON,te as ImageOverlay,ae as LayerGroup,x as LayersControl,Ce as MapContainer,Oe as Marker,oe as Pane,ge as Polygon,re as Polyline,Le as Popup,le as Rectangle,ue as SVGOverlay,ce as ScaleControl,ve as TileLayer,ie as Tooltip,se as VideoOverlay,fe as WMSTileLayer,de as ZoomControl,k as useMap,Y as useMapEvent,K as useMapEvents};
