webpackJsonp([0x67ef26645b2a,60335399758886],{"./node_modules/json-loader/index.js!./.cache/json/layout-index.json":function(e,t){e.exports={layoutContext:{}}},'./node_modules/babel-loader/lib/index.js?{"plugins":["/Users/mks/webapps/blog/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/mks/webapps/blog/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/mks/webapps/blog/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":[["/Users/mks/webapps/blog/node_modules/babel-preset-env/lib/index.js",{"loose":true,"uglify":true,"modules":"commonjs","targets":{"browsers":["> 1%","last 2 versions","IE >= 9"]},"exclude":["transform-regenerator","transform-es2015-typeof-symbol"]}],"/Users/mks/webapps/blog/node_modules/babel-preset-stage-0/lib/index.js","/Users/mks/webapps/blog/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./.cache/layouts/index.js':function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=n("./node_modules/react/react.js"),i=o(s),a=n("./src/layouts/index.js"),d=o(a),l=n("./node_modules/json-loader/index.js!./.cache/json/layout-index.json"),u=o(l);t.default=function(e){return i.default.createElement(d.default,r({},e,u.default))},e.exports=t.default},"./node_modules/element-resize-event/index.js":function(e,t){function n(e){var t=e.target||e.srcElement;t.__resizeRAF__&&r(t.__resizeRAF__),t.__resizeRAF__=o(function(){var n=t.__resizeTrigger__;n.__resizeListeners__.forEach(function(t){t.call(n,e)})})}var o=function(){var e=this,t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){return e.setTimeout(t,20)};return function(e){return t(e)}}(),r=function(){var e=this,t=e.cancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelAnimationFrame||e.clearTimeout;return function(e){return t(e)}}(),t=function(e,t){function o(){this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__,this.contentDocument.defaultView.addEventListener("resize",n)}var r,s=this,i=s.document,a=i.attachEvent;if("undefined"!=typeof navigator&&(r=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)),!e.__resizeListeners__)if(e.__resizeListeners__=[],a)e.__resizeTrigger__=e,e.attachEvent("onresize",n);else{"static"===getComputedStyle(e).position&&(e.style.position="relative");var d=e.__resizeTrigger__=i.createElement("object");d.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;"),d.setAttribute("class","resize-sensor"),d.__resizeElement__=e,d.onload=o,d.type="text/html",r&&e.appendChild(d),d.data="about:blank",r||e.appendChild(d)}e.__resizeListeners__.push(t)};e.exports="undefined"==typeof window?t:t.bind(window),e.exports.unbind=function(e,t){var o=document.attachEvent;t?e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1):e.__resizeListeners__=[],e.__resizeListeners__.length||(o?e.detachEvent("onresize",n):(e.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize",n),delete e.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__,e.__resizeTrigger__=!e.removeChild(e.__resizeTrigger__)),delete e.__resizeListeners__)}},"./node_modules/raf/index.js":function(e,t,n){for(var o=n("./node_modules/raf/node_modules/performance-now/lib/performance-now.js"),r="undefined"==typeof window?{}:window,s=["moz","webkit"],i="AnimationFrame",a=r["request"+i],d=r["cancel"+i]||r["cancelRequest"+i],l=!0,u=0;u<s.length&&!a;u++)a=r[s[u]+"Request"+i],d=r[s[u]+"Cancel"+i]||r[s[u]+"CancelRequest"+i];if(!a||!d){l=!1;var p=0,c=0,m=[],h=1e3/60;a=function(e){if(0===m.length){var t=o(),n=Math.max(0,h-(t-p));p=n+t,setTimeout(function(){var e=m.slice(0);m.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(p)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return m.push({handle:++c,callback:e,cancelled:!1}),c},d=function(e){for(var t=0;t<m.length;t++)m[t].handle===e&&(m[t].cancelled=!0)}}e.exports=function(e){return l?a.call(r,function(){try{e.apply(this,arguments)}catch(e){setTimeout(function(){throw e},0)}}):a.call(r,e)},e.exports.cancel=function(){d.apply(r,arguments)}},"./node_modules/raf/node_modules/performance-now/lib/performance-now.js":function(e,t,n){(function(t){(function(){var n,o,r;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-r)/1e6},o=t.hrtime,n=function(){var e;return e=o(),1e9*e[0]+e[1]},r=n()):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(t,n("./node_modules/process/browser.js"))},"./node_modules/react-component-width-mixin/index.js":function(e,t,n){var o=n("./node_modules/react-dom/index.js"),r=n("./node_modules/element-resize-event/index.js");e.exports={getInitialState:function(){return void 0!==this.props.initialComponentWidth&&null!==this.props.initialComponentWidth?{componentWidth:this.props.initialComponentWidth}:{}},componentDidMount:function(){this.setState({componentWidth:o.findDOMNode(this).getBoundingClientRect().width}),r(o.findDOMNode(this),this.onResize)},componentDidUpdate:function(){0===o.findDOMNode(this).getElementsByClassName("resize-sensor").length&&r(o.findDOMNode(this),this.onResize)},onResize:function(){this.setState({componentWidth:o.findDOMNode(this).getBoundingClientRect().width})}}},"./node_modules/react-page-width/dist/index.js":function(e,t,n){var o;o=n("./node_modules/react-page-width/dist/resizeListener.js"),e.exports={getInitialState:function(){return this.props.initialPageWidth?{pageWidth:this.props.initialPageWidth}:{}},componentDidMount:function(){return o.on(this.onResize)},componentWillUnmount:function(){return o.off(this.onResize)},onResize:function(e){return this.setState({pageWidth:e})}}},"./node_modules/react-page-width/dist/resizeListener.js":function(e,t,n){var o,r,s,i,a,d;s=n("./node_modules/raf/index.js"),o=void 0,i=[],a=!1,"undefined"!=typeof window&&null!==window&&(o=window.innerWidth),r=function(){if(!a)return a=!0,s(d)},d=function(){var e,t,n;for(o=window.innerWidth,e=0,t=i.length;e<t;e++)(n=i[e])(o);return a=!1},"undefined"!=typeof window&&null!==window&&window.addEventListener("resize",r),e.exports={on:function(e){return e(o),i.push(e)},off:function(e){return i.splice(i.indexOf(e),1)}}},"./node_modules/react-responsive-grid/dist/components/Breakpoint.js":function(e,t,n){var o,r,s,i,a,d;i=n("./node_modules/react/react.js"),a=n("./node_modules/react-component-width-mixin/index.js"),s=n("./node_modules/react-page-width/dist/index.js"),d=n("./node_modules/object-assign/index.js"),o=i.createClass({displayName:"Breakpoint",mixins:[a],propTypes:{minWidth:i.PropTypes.number,maxWidth:i.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return i.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?i.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=d({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.componentWidth&&this.props.minWidth<=(t=this.state.componentWidth)&&t<this.props.maxWidth?i.createElement("div",Object.assign({},e),this.renderChildren()):i.createElement("div",null)}}),r=i.createClass({displayName:"Breakpoint",mixins:[s],propTypes:{minWidth:i.PropTypes.number,maxWidth:i.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return i.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=(n=t.type)?n.displayName:void 0)?i.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=d({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.pageWidth&&this.props.minWidth<=(t=this.state.pageWidth)&&t<this.props.maxWidth?i.createElement("div",Object.assign({},e),this.renderChildren()):i.createElement("div",null)}}),e.exports=i.createClass({displayName:"Breakpoint",propTypes:{widthMethod:i.PropTypes.string.isRequired,minWidth:i.PropTypes.number,maxWidth:i.PropTypes.number},getDefaultProps:function(){return{widthMethod:"pageWidth"}},render:function(){return"pageWidth"===this.props.widthMethod?i.createElement(r,Object.assign({},this.props)):"componentWidth"===this.props.widthMethod?i.createElement(o,Object.assign({},this.props)):void 0}})},"./node_modules/react-responsive-grid/dist/components/Container.js":function(e,t,n){var o,r;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),e.exports=o.createClass({displayName:"Container",render:function(){var e,t,n,s;return t={maxWidth:"960px",marginLeft:"auto",marginRight:"auto"},s=r(t,this.props.style),e=this.props.children,n=r({},this.props),delete n.children,delete n.style,o.createElement("div",Object.assign({},n,{style:s}),e,o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/components/Grid.js":function(e,t,n){var o,r;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),e.exports=o.createClass({displayName:"Grid",propTypes:{columns:o.PropTypes.number,gutterRatio:o.PropTypes.number},getDefaultProps:function(){return{columns:12,gutterRatio:.25}},renderChildren:function(){return o.Children.map(this.props.children,function(e){return function(t){var n,r;return"Breakpoint"===(n=null!=(r=t.type)?r.displayName:void 0)||"Span"===n?o.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.gutterRatio}}):t}}(this))},render:function(){var e;return e=r({},this.props),delete e.gutterRatio,delete e.columns,o.createElement("div",Object.assign({},e),this.renderChildren(),o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/components/Span.js":function(e,t,n){var o,r,s;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),s=n("./node_modules/react-responsive-grid/dist/utils/SpanCalculate.js"),e.exports=o.createClass({displayName:"Span",propTypes:{context:o.PropTypes.object,columns:o.PropTypes.number,at:o.PropTypes.number,pre:o.PropTypes.number,post:o.PropTypes.number,squish:o.PropTypes.number,last:o.PropTypes.bool,break:o.PropTypes.bool},getDefaultProps:function(){return{at:0,pre:0,post:0,squish:0,last:!1,first:!1,break:!1}},renderChildren:function(){return o.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?o.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.context.gutterRatio}}):t}}(this))},render:function(){var e,t;return t=s({contextColumns:this.props.context.columns,gutterRatio:this.props.context.gutterRatio,columns:this.props.columns,at:this.props.at,pre:this.props.pre,post:this.props.post,squish:this.props.squish,last:this.props.last,break:this.props.break}),t=r(t,this.props.style),e=r({},this.props,{style:t}),delete e.at,delete e.break,delete e.columns,delete e.context,delete e.first,delete e.last,delete e.post,delete e.pre,delete e.squish,delete e.style,o.createElement("div",Object.assign({},e,{style:t}),this.renderChildren(),o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/index.js":function(e,t,n){t.Container=n("./node_modules/react-responsive-grid/dist/components/Container.js"),t.Grid=n("./node_modules/react-responsive-grid/dist/components/Grid.js"),t.Breakpoint=n("./node_modules/react-responsive-grid/dist/components/Breakpoint.js"),t.Span=n("./node_modules/react-responsive-grid/dist/components/Span.js")},"./node_modules/react-responsive-grid/dist/utils/SpanCalculate.js":function(e,t,n){var o;o=n("./node_modules/object-assign/index.js"),e.exports=function(e){var t,n,r,s,i,a,d,l,u,p;return r={columns:3,at:0,pre:0,post:0,squish:0,contextColumns:12,gutterRatio:.25,first:!1,last:!1},u=o(r,e),l=100/(u.contextColumns+(u.contextColumns-1)*u.gutterRatio),i=u.gutterRatio*l,n=function(e){return l*e+i*(e-1)},t=function(e){return 0===e?0:n(e)+i},p=n(u.columns),a=0===u.at&&0===u.pre&&0===u.squish?0:t(u.at)+t(u.pre)+t(u.squish),u.last&&0===u.post&&0===u.squish?d=0:0!==u.post||0!==u.squish?(d=t(u.post)+t(u.squish),u.last||(d+=i)):d=i,s=u.last?"right":"left",p+="%",a+="%",d+="%",{float:s,marginLeft:a,marginRight:d,width:p,clear:u.break?"both":"none"}}},"./src/layouts/index.js":function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},d=n("./node_modules/react/react.js"),l=o(d),u=n("./node_modules/gatsby-link/index.js"),p=o(u),c=n("./node_modules/react-responsive-grid/dist/index.js"),m=n("./src/utils/typography.js"),h=function(e){function t(){return r(this,t),s(this,e.apply(this,arguments))}return i(t,e),t.prototype.render=function(){var e=this.props,t=e.location,n=e.children,o=void 0,r="/";return o=t.pathname===r?l.default.createElement("h1",{style:a({},(0,m.scale)(1.5),{marginBottom:(0,m.rhythm)(1.5),marginTop:0})},l.default.createElement(p.default,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},"Mehmet Kose")):l.default.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0,marginBottom:(0,m.rhythm)(-1)}},l.default.createElement(p.default,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},"Mehmet Kose")),l.default.createElement(c.Container,{style:{maxWidth:(0,m.rhythm)(24),padding:(0,m.rhythm)(1.5)+" "+(0,m.rhythm)(.75)}},o,n())},t}(l.default.Component);h.propTypes={children:l.default.PropTypes.func,location:l.default.PropTypes.object,route:l.default.PropTypes.object},t.default=h,e.exports=t.default}});
//# sourceMappingURL=component---src-layouts-index-js-53d1c8e6202a05fdfd0b.js.map