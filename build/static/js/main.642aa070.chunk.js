(this.webpackJsonpcrawler=this.webpackJsonpcrawler||[]).push([[0],{25:function(e,t,a){e.exports=a(38)},38:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(22),l=a.n(c),i=a(24),o=a(1),s=a(8),u=a.n(s),m=a(17),d=a(12),E=a(6),f=a(14),g=a.n(f);var p=function(){return r.a.createElement("nav",null,r.a.createElement("div",{className:"title-container"},r.a.createElement("a",{href:"/"},r.a.createElement("div",{className:"img-container"},r.a.createElement("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQh6jNkrPDXGYRhEW04IeKTYiaiAwSj_LoknEfupEI16pwyeko&usqp=CAU",alt:"none"}))),r.a.createElement("a",{href:"/"},r.a.createElement("h1",{className:"title"},"Crawler"))))};var h=function(){return r.a.createElement("div",{className:"loader-page-container"},r.a.createElement(p,null),r.a.createElement("div",{className:"blur-background"},r.a.createElement("div",{className:"loader"})))};var v=function(e){var t=Object(n.useState)([]),a=Object(E.a)(t,2),c=a[0],l=a[1],i=Object(n.useState)(0),s=Object(E.a)(i,2),f=s[0],g=s[1],v=Object(n.useState)(Object(o.f)().tg),b=Object(E.a)(v,2),y=b[0],j=(b[1],Object(n.useState)(!1)),N=Object(E.a)(j,2),O=N[0],k=N[1],w=Object(n.useState)(!1),x=Object(E.a)(w,2),S=x[0],A=x[1];function q(e){return C.apply(this,arguments)}function C(){return(C=Object(d.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(!0),e.next=3,fetch("/get-blogs/?tag=".concat(t,"&&start=").concat(f));case 3:return a=e.sent,e.next=6,a.json();case 6:a=e.sent,l((function(e){return[].concat(Object(m.a)(e),Object(m.a)(a.blogs))})),k(!1),g((function(e){return e+10})),A(a.hasMore);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){q(y)}),[]),0===c.length&&O?r.a.createElement(h,null):r.a.createElement("div",null,O&&r.a.createElement("div",{className:"top-loader"}),r.a.createElement(p,null),r.a.createElement("div",{className:"main-container"},r.a.createElement("h1",{className:"tag-name"},"#",y),r.a.createElement("div",null,r.a.createElement("div",null,c.map((function(e,t){return r.a.createElement("a",{href:"/detailed-article?q=".concat(e.linkToBlogPage),key:t,target:"_blank"},r.a.createElement("div",{className:"card",key:t},r.a.createElement("div",{className:"content-container"},r.a.createElement("h2",null,e.title),r.a.createElement("p",null,e.description,"..."),r.a.createElement("ul",null,r.a.createElement("li",null,"written By - ",r.a.createElement("strong",null,e.writer)),r.a.createElement("li",null,r.a.createElement("i",{class:"far fa-star"}),e.details))),e.img&&r.a.createElement("div",{className:"img-container"},r.a.createElement("img",{src:e.img,alt:""}))))}))),r.a.createElement("div",{className:"button-container"},!O&&S&&r.a.createElement("button",{className:"get-more-button",onClick:function(){q(y)}},"Get More")))))};var b=function(){return r.a.createElement("footer",null,r.a.createElement("h3",null,"Crawler"),r.a.createElement("p",null," &COPY; All rights reserved, 2020"))};var y=function(e){var t=g.a.parse(e.location.search,{ignoreQueryPrefix:!0}).q,a=Object(n.useState)(""),c=Object(E.a)(a,2),l=c[0],i=c[1];function o(){console.log("loaded")}return Object(n.useEffect)((function(){function e(){return(e=Object(d.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/detailed-blog?q="+t);case 2:return a=e.sent,e.next=5,a.json();case 5:a=e.sent,console.log(a),i(a.body);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(t){e.apply(this,arguments)}(t)}),[]),r.a.createElement(r.a.Fragment,null,l&&r.a.createElement(r.a.Fragment,null,r.a.createElement(p,null),r.a.createElement("div",{onLoad:o,className:"article-content",dangerouslySetInnerHTML:{__html:l}}),r.a.createElement(b,null)),!l&&r.a.createElement(h,{onLoad:o}))},j=["artificial-intelligence","data-science","javascript","biotechnology","math","space","travel","outdoors","world","photography","fitness","creativity","fiction","books","poetry","writing","true-crime","comics","tv","film","music","style","lifestyle","beauty","environment","social-media","science","technology","deep-learning","blockchain","health","future","business","work","culture","programming","design","LGBTQIA","politics","relationships","self","startups","food","neuroscience","python","mental-health","mindfulness","spirituality","productivity","machine-learning","freelancing","leadership","economy","money","basic-income","cryptocurrency","cybersecurity","privacy","blockchain","society","cities","self-driving-cars","transportation","san-francisco","humor","language","digital-life","gadgets","gaming","erotica","love","sex"];var N=function(){return r.a.createElement("div",{className:"landing-page-container"},r.a.createElement("div",{className:"content-container"},r.a.createElement("h1",null,"Select What you are into!!!"),r.a.createElement("p",null,"And it will help you find great things that really matter to you."),r.a.createElement("div",{className:"tags-container"},j.map((function(e,t){return r.a.createElement("a",{className:" tag",key:t,id:e,href:"/blogs/".concat(e)},r.a.createElement("div",{className:"pound",id:e},"#"),e)})))))};var O=function(){return r.a.createElement(i.a,null,r.a.createElement("div",null,r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/",render:function(e){return r.a.createElement(N,e)}}),r.a.createElement(o.a,{exact:!0,path:"/detailed-article",render:function(e){return r.a.createElement(y,e)}}),r.a.createElement(o.a,{exact:!0,path:"/blogs/:tg",render:function(e){return r.a.createElement(v,e)}}))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(O,null)),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.642aa070.chunk.js.map