import{z as V,o as i,p as f,e,j as F,v as L,t as C,q as y,n as B,f as O,i as D,c as P,g as S,d as I,h as x,R as T,r as p,A as M,B as U,_ as z,D as h}from"./index-Bk1WK7aq.js";import{_ as k,a as E,b as R,d as j}from"./vuedraggable.umd-C8AgLcOc.js";const q=k+"#plus",G={class:"add-page"},H={class:"form__items"},J={class:"item-form"},K={key:0,"data-error":""},Q={class:"btn primary-btn"},W={__name:"AddPage",props:{addPageLoading:Boolean},emits:["addNewPage"],setup(l,{expose:d,emit:m}){const r=m,s=V({value:"",error:!1,errorTxt:"Заполните поле"});d({resetForm:()=>{s.value=""}});const o=()=>{if(s.value.length>0){let g={title:s.value};r("addNewPage",g),s.error=!1}else s.error=!0};return(g,u)=>(i(),f("div",G,[e("form",{class:"form",onSubmit:D(o,["prevent"])},[e("div",H,[e("div",J,[F(e("input",{type:"text",name:"title",placeholder:"Введите название страницы","onUpdate:modelValue":u[0]||(u[0]=w=>s.value=w)},null,512),[[L,s.value]]),s.error?(i(),f("div",K,C(s.errorTxt),1)):y("",!0)])]),e("button",Q,[e("span",{class:B(l.addPageLoading&&"loading")},u[1]||(u[1]=[O("Добавить страницу"),e("svg",null,[e("use",{"xlink:href":q})],-1)]),2)])],32)]))}},X=k+"#chevron-top",Y=k+"#chevron-bot",Z=k+"#ext-link",ee={class:"item-doc"},te={key:0,class:"item-doc__handle"},ae={class:"card-anim item-doc__inner"},se={class:"item-doc__content"},oe={class:"item-doc__info"},ne={key:1},le={class:"item-doc__action"},de={__name:"CatalogItem",props:{id:Number,title:String,isAdmin:Boolean},emits:["delPage","pageNameOnChange"],setup(l,{emit:d}){const m=l,r=d,s=v=>{r("pageNameOnChange",m.id,v)};return(v,o)=>(i(),f("div",ee,[l.isAdmin?(i(),f("div",te,o[1]||(o[1]=[e("svg",null,[e("use",{"xlink:href":X})],-1),e("svg",null,[e("use",{"xlink:href":Y})],-1)]))):y("",!0),e("div",ae,[e("div",se,[e("div",oe,[e("h5",null,[l.isAdmin?(i(),P(E,{key:0,initVal:l.title,onOnChange:s},null,8,["initVal"])):(i(),f("span",ne,C(l.title),1))])]),e("div",le,[S(x(T),{to:{name:"docs",params:{id:l.id}},class:"item-doc__btn"},{default:I(()=>o[2]||(o[2]=[e("span",null,"Открыть",-1),e("svg",null,[e("use",{"xlink:href":Z})],-1)])),_:1},8,["to"]),l.isAdmin?(i(),f("button",{key:0,onClick:o[0]||(o[0]=()=>r("delPage",l.id)),class:"btn-reset item-doc__btn item-doc__btn--del"},o[3]||(o[3]=[e("img",{src:R,alt:""},null,-1)]))):y("",!0)])])])]))}},ie={class:"section intro docs-p"},re={class:"container"},ce={class:"docs-p__items"},ge={__name:"CatalogPage",setup(l){const d=p([]),m=p([...d.value]),r=p(!1),s=p(!1),v=M(),o=p(null),g=p(0),u=async()=>{r.value=!0;try{const{data:t}=await h.getPages();d.value=t,m.value=[...d.value]}catch(t){console.log(t)}finally{r.value=!1}},w=async t=>{r.value=!0;try{await h.delPage(t),u()}catch(a){console.log(a),r.value=!1}},N=async t=>{s.value=!0;try{await h.postPage(t),o.value.resetForm(),u()}catch(a){console.log(a)}finally{s.value=!1}},b=async(t,a)=>{let n={title:a};try{await h.changePageName(t,n)}catch(c){console.log(c)}},A=async(t,a)=>{r.value=!0;let n=a.length+1;try{await h.sortPages(t.id,{orderId:t.orderId}),g.value++,a.forEach(async c=>{try{await h.sortPages(c.id,c.params),g.value++,g.value==n&&(u(),g.value=0)}catch(_){console.log(_)}})}catch(c){console.log(c)}},$=t=>{let a={id:d.value[t.oldIndex].id,orderId:d.value[t.newIndex].orderId},n=[...d.value],c=[];t.newIndex>t.oldIndex?c=[...n.slice(t.oldIndex+1,t.newIndex+1)].map(_=>({id:_.id,params:{orderId:_.orderId-1}})):c=[...n.slice(t.newIndex,t.oldIndex)].map(_=>({id:_.id,params:{orderId:_.orderId+1}})),A(a,c),console.log("updateend")};return U(u),(t,a)=>(i(),P(z,null,{default:I(()=>[e("section",ie,[e("div",re,[a[2]||(a[2]=e("div",{class:"sec-top"},[e("h1",null,"Каталог"),e("p",null,"Доступные вам инструкции на ваши сайты вы найдете ниже."),e("p",null,"Если вам кажется, что чего-то не хватает, или вам что-то непонятно, пожалуйста свяжитесь с нами")],-1)),e("div",ce,[a[1]||(a[1]=e("div",{class:"docs-p__title"},[e("h2",null,"Список страниц")],-1)),d.value.length?(i(),P(x(j),{key:0,"item-key":"id",modelValue:m.value,"onUpdate:modelValue":a[0]||(a[0]=n=>m.value=n),handle:".item-doc__handle",class:"docs-p__pages",onUpdate:$},{item:I(({element:n})=>[(i(),P(de,{key:n.id,id:n.id,title:n.title,isAdmin:x(v).userData.isAdmin,onPageNameOnChange:b,onDelPage:w},null,8,["id","title","isAdmin"]))]),_:1},8,["modelValue"])):y("",!0)]),x(v).userData.isAdmin?(i(),P(W,{key:0,ref_key:"addPageForm",ref:o,addPageLoading:s.value,onAddNewPage:N},null,8,["addPageLoading"])):y("",!0)])])]),_:1}))}};export{ge as default};