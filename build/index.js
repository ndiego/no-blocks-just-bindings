(()=>{"use strict";const t=window.wp.i18n,e=window.wp.blocks,o=window.wp.primitives,n=window.ReactJSXRuntime,i=(0,n.jsx)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)(o.Path,{d:"M8 12.5h8V11H8v1.5Z M19 6.5H5a2 2 0 0 0-2 2V15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a2 2 0 0 0-2-2ZM5 8h14a.5.5 0 0 1 .5.5V15a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8.5A.5.5 0 0 1 5 8Z"})});(0,e.registerBlockVariation)("core/button",{name:"read-more-button/post-url",icon:i,title:(0,t.__)("Read More","no-blocks-just-bindings"),description:(0,t.__)("Displays a button that links to the current post, page, or other content-type.","no-blocks-just-bindings"),scope:["inserter"],example:{attributes:{className:"is-style-fill",text:(0,t.__)("Read More","no-blocks-just-bindings")}},attributes:{metadata:{bindings:{url:{source:"read-more-button/post-url"}}}},isActive:t=>"read-more-button/post-url"===t?.metadata?.bindings?.url?.source});const s=window.wp.wordcount,r=(0,n.jsx)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,n.jsx)(o.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M12 18.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13ZM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm9 1V8h-1.5v3.5h-2V13H13Z"})});(0,e.registerBlockVariation)("core/paragraph",{name:"time-to-read/time",icon:r,title:(0,t.__)("Time To Read","no-blocks-just-bindings"),description:(0,t.__)("Show minutes required to finish reading the post.","no-blocks-just-bindings"),category:"theme",scope:["block","inserter"],example:{attributes:{content:(0,t.__)("12 minutes","no-blocks-just-bindings")}},attributes:{metadata:{bindings:{content:{source:"time-to-read/time"}}}},isActive:t=>"time-to-read/time"===t?.metadata?.bindings?.content?.source}),(0,e.registerBlockBindingsSource)({name:"time-to-read/time",getValues({select:o,clientId:n,context:i,bindings:r}){const{postId:a,postType:c}=i,d=o("core").getEditedEntityRecord("postType",c,a),l=d?.blocks?(0,e.serialize)(d.blocks):d?.content,u=(0,t._x)("words","Word count type. Do not translate!"),m=Math.max(1,Math.round((0,s.count)(l||"",u)/189));return{content:(0,t.sprintf)(/* translators: %s: the number of minutes to read the post. */ /* translators: %s: the number of minutes to read the post. */
(0,t._n)("%s minute","%s minutes",m),m)}}})})();