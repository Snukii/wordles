import{S as p,i as m,s as _,e as v,t as g,c as x,a as y,g as b,d as f,b as s,f as j,I as C,h as w,D as h}from"../chunks/vendor-fb7309c6.js";function D(i){var u,c;let e,a=((c=(u=i[0])==null?void 0:u.value)==null?void 0:c.toUpperCase())+"",r,l;return{c(){e=v("div"),r=g(a),this.h()},l(t){e=x(t,"DIV",{display:!0,text:!0,h:!0,w:!0,justify:!0,align:!0,class:!0});var n=y(e);r=b(n,a),n.forEach(f),this.h()},h(){s(e,"display","flex"),s(e,"text","6xl light-500"),s(e,"h","5rem"),s(e,"w","5rem"),s(e,"justify","content-center"),s(e,"align","items-center"),s(e,"class",l="bg-"+i[0].status)},m(t,n){j(t,e,n),C(e,r)},p(t,[n]){var o,d;n&1&&a!==(a=((d=(o=t[0])==null?void 0:o.value)==null?void 0:d.toUpperCase())+"")&&w(r,a),n&1&&l!==(l="bg-"+t[0].status)&&s(e,"class",l)},i:h,o:h,d(t){t&&f(e)}}}const U=!1,k=!1;function I(i,e,a){let{letter:r}=e;return i.$$set=l=>{"letter"in l&&a(0,r=l.letter)},[r]}class q extends p{constructor(e){super();m(this,e,I,D,_,{letter:0})}}export{q as default,U as prerender,k as ssr};
