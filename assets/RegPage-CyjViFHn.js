import{r as v,u as D,a as y,w as F,c as j,b as q,o as x,d as k,e as s,f as V,g as C,h as o,i as z,j as d,v as S,m as u,k as m,t as p,n as A,l as L,p as $,q as G,s as H,C as I,_ as J,x as K,y as O,R as Q}from"./index-BtGB_OIj.js";const W={class:"log-p"},X={class:"container"},Y={class:"log-p__inner"},Z={class:"log-p__content"},ee={class:"log-p__top"},se={class:"log-p__subtitle"},te={class:"form__items"},oe={class:"item-form"},ae={"data-error":""},le={class:"item-form"},ie={"data-error":""},ne=["type"],re={"data-error":""},de={class:"form__footer"},ue={class:"item-checkbox"},me={"data-error":""},pe=["disabled"],ge={__name:"RegPage",setup(ce){const w=v(""),c=v(!1),i=v(!1),U={login:t=>t?!0:"Заполните поле",email:async t=>{if(t)if(K(t))if(w.value!=t)try{const{data:e}=await y.getUser(t);return e.length>0?(w.value=t,"Пользователь с таким email уже существует"):!0}catch(e){console.log(e)}else return"Пользователь с таким email уже существует";else return"Некорректный E-mail";else return"Заполните поле"},password:t=>t?O(t)?!0:"Пароль должен содержать минимум 6 символов":"Заполните поле",agree:t=>t===!0?!0:"Требуется согласие"},{errors:n,handleSubmit:B,isSubmitting:h,defineField:r}=D({validationSchema:U}),[_,R]=r("login"),[g,E]=r("email"),[l,M]=r("password"),[f,N]=r("agree"),P=q(),T=()=>{i.value=!i.value},b=B(async t=>{const e={email:t.email,login:t.login,password:t.password,isAdmin:!1,disable:!1};try{await y.setUser(e),P.push({name:"login"})}catch(a){console.log(a)}});return F(()=>l.value,()=>{c.value=l.value.length>0}),(t,e)=>(x(),j(J,null,{default:k(()=>[s("section",W,[s("div",X,[s("div",Y,[s("div",Z,[s("div",ee,[e[8]||(e[8]=s("h1",null,"Регистрация",-1)),s("p",se,[e[7]||(e[7]=V(" Уже зарегистрированы? ")),C(o(Q),{to:{name:"login"},class:"link"},{default:k(()=>e[6]||(e[6]=[V("Войти")])),_:1})])]),s("form",{class:"form",onSubmit:e[5]||(e[5]=z((...a)=>o(b)&&o(b)(...a),["prevent"]))},[s("div",te,[s("div",oe,[d(s("input",u({type:"text",placeholder:"Логин","onUpdate:modelValue":e[0]||(e[0]=a=>m(_)?_.value=a:null)},o(R)),null,16),[[S,o(_)]]),s("div",ae,p(o(n).login),1)]),s("div",le,[d(s("input",u({type:"email",placeholder:"E-mail",name:"mail","onUpdate:modelValue":e[1]||(e[1]=a=>m(g)?g.value=a:null)},o(E)),null,16),[[S,o(g)]]),s("div",ie,p(o(n).email),1)]),s("div",{class:A(["item-form item-form--password",{"show-eyeBtn":c.value,"show-password":i.value}])},[d(s("input",u({type:i.value?"text":"password",placeholder:"Пароль",name:"password","onUpdate:modelValue":e[2]||(e[2]=a=>m(l)?l.value=a:null)},o(M),{autocomplete:"off"}),null,16,ne),[[L,o(l)]]),s("div",re,p(o(n).password),1),c.value?(x(),$("button",{key:0,type:"button",class:"btn-reset item-form__eye",onClick:e[3]||(e[3]=()=>T())})):G("",!0)],2)]),s("div",de,[s("label",ue,[d(s("input",u({name:"agree",type:"checkbox",id:"result",class:"checkbox-input","onUpdate:modelValue":e[4]||(e[4]=a=>m(f)?f.value=a:null)},o(N)),null,16),[[H,o(f)]]),e[9]||(e[9]=s("span",null,"Даю согласие на обработку персональных данных",-1)),s("div",me,p(o(n).agree),1)]),s("button",{class:"btn main-btn",type:"submit",disabled:o(h)},[s("span",{class:A(o(h)&&"loading")},"Зарегистрироваться",2)],8,pe)])],32),C(I)])])])])]),_:1}))}};export{ge as default};
