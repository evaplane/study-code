!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("eva",[],t):"object"==typeof exports?exports.eva=t():e.eva=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=1)}([function(e,t,n){"use strict";t.a={name:"eva",props:["val"],data:function(){return{timer:null,text:""}},created:function(){var e=this,t=setTimeout(function(){e.move(),clearTimeout(t)},1e3)},mounted:function(){var e=!0,t=!1,n=void 0;try{for(var r,o=this.val[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){var a=r.value;this.text+=" "+a}}catch(e){t=!0,n=e}finally{try{!e&&o.return&&o.return()}finally{if(t)throw n}}},methods:{move:function(){var e=document.querySelector(".eva-wrap").clientWidth,t=document.querySelector(".getWidth").scrollWidth;if(!(t<=e)){var n=document.querySelector(".scroll");document.querySelector(".copy").innerText=this.text;var r=0;this.timer=setInterval(function(){r-=1,-r>=t&&(r=16),n.style.transform="translateX("+r+"px)"},20)}}},beforeDestroy:function(){clearInterval(this.timer)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);r.a.install=function(e){return e.component(r.a.name,r.a)},t.default=r.a},function(e,t,n){"use strict";function r(e){n(3)}var o=n(0),a=n(9),i=n(8),s=r,u=i(o.a,a.a,!1,s,"data-v-87a044ca",null);t.a=u.exports},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(6)("71b1fe5e",r,!0,{})},function(e,t,n){t=e.exports=n(5)(!1),t.push([e.i,".eva-wrap[data-v-87a044ca]{width:100%;overflow:hidden;position:relative}.eva[data-v-87a044ca]{margin-right:16px}p[data-v-87a044ca]{word-break:keep-all;white-space:nowrap;font-size:16px;font-family:\\\\5FAE\\8F6F\\96C5\\9ED1 Light}.scroll[data-v-87a044ca]{display:flex}.getWidth[data-v-87a044ca]{word-break:keep-all;white-space:nowrap;position:absolute;opacity:0;top:0}",""])},function(e,t){function n(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var a=r(o);return[n].concat(o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"})).concat([a]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=f[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(a(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var i=[],o=0;o<n.parts.length;o++)i.push(a(n.parts[o]));f[n.id]={id:n.id,refs:1,parts:i}}}}function o(){var e=document.createElement("style");return e.type="text/css",l.appendChild(e),e}function a(e){var t,n,r=document.querySelector("style["+y+'~="'+e.id+'"]');if(r){if(v)return h;r.parentNode.removeChild(r)}if(g){var a=p++;r=d||(d=o()),t=i.bind(null,r,a,!1),n=i.bind(null,r,a,!0)}else r=o(),t=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function i(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var a=document.createTextNode(o),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function s(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),m.ssrId&&e.setAttribute(y,t.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(7),f={},l=u&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,v=!1,h=function(){},m=null,y="data-vue-ssr-id",g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n,o){v=n,m=o||{};var a=c(e,t);return r(a),function(t){for(var n=[],o=0;o<a.length;o++){var i=a[o],s=f[i.id];s.refs--,n.push(s)}t?(a=c(e,t),r(a)):a=[];for(var o=0;o<n.length;o++){var s=n[o];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete f[s.id]}}}};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],r={},o=0;o<t.length;o++){var a=t[o],i=a[0],s=a[1],u=a[2],c=a[3],f={id:e+":"+o,css:s,media:u,sourceMap:c};r[i]?r[i].parts.push(f):n.push(r[i]={id:i,parts:[f]})}return n}},function(e,t){e.exports=function(e,t,n,r,o,a){var i,s=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(i=e,s=e.default);var c="function"==typeof s?s.options:s;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o);var f;if(a?(f=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},c._ssrRegister=f):r&&(f=r),f){var l=c.functional,d=l?c.render:c.beforeCreate;l?(c._injectStyles=f,c.render=function(e,t){return f.call(t),d(e,t)}):c.beforeCreate=d?[].concat(d,f):[f]}return{esModule:i,exports:s,options:c}}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"eva-wrap"},[n("div",{staticClass:"scroll"},[n("p",{staticClass:"eva"},[e._v(e._s(e.text))]),e._v(" "),n("p",{staticClass:"copy"})]),e._v(" "),n("p",{staticClass:"getWidth"},[e._v(e._s(e.text))])])},o=[],a={render:r,staticRenderFns:o};t.a=a}])});
//# sourceMappingURL=eva.js.map