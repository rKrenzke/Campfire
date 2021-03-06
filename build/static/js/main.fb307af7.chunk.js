(this.webpackJsonpcampfire=this.webpackJsonpcampfire||[]).push([[0],{43:function(e,t,s){},44:function(e,t,s){},54:function(e,t,s){},55:function(e,t,s){},58:function(e,t,s){},62:function(e,t,s){"use strict";s.r(t);var i=s(1),n=s(2),a=s.n(n),c=s(21),r=s.n(c),o=(s(42),s(43),s(25)),l=(s(44),s(24)),d=s(10),j=s(11),h=s(12),p=s(7),u=s(14),b=s(13),m=s(71),O=s(72),x=s(73),f=s(74),g=s(75),v=s(76),k=s(77),S=s(64),y=s(85),C=s(63),w=s(65),T=s(66),N=s(67),P=s(68),I=s(69),A=s(70),U="";switch(window.location.hostname){case"localhost":U="http://localhost:4000";break;case"micampfire.herokuapp.com":U="https://micampfire.herokuapp.com"}var L=U,M=RegExp("((?=.*?[0-9]).*|(?=.*?[#?!@$%^&*-]).*)"),F=function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).handleSubmit=i.handleSubmit.bind(Object(p.a)(i)),i.state={username:"",email:"",password:"",passwordConfirm:""},i}return Object(h.a)(s,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var s=this.state.username,i=this.state.email,n=this.state.password,a=this.state.passwordConfirm;try{if(!s||!i||!n)throw"Please fill out all fields";if(this.state.password.length<5)throw"Password must be 5 or more characters";if(s.length<4||!M.test(s))throw"Username must be 4 or more characters and include 1 number and/or special character";if(n!==a)throw"Passwords do not match";fetch("".concat(L,"/user/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{username:s,email:i,password:n}})}).then((function(e){return e.json()})).then((function(e){console.log(e),t.props.updateToken(e.sessionToken),t.props.setUser(e.user.username),t.props.close()})).catch((function(e){return console.log(e)}))}catch(c){alert(c)}}},{key:"render",value:function(){var e=this;return Object(i.jsx)("div",{id:"register",role:"navigation",children:Object(i.jsxs)(y.a,{isOpen:this.props.open,id:"registerModal",children:[Object(i.jsxs)(C.a,{className:"modalHeader",children:[Object(i.jsx)("div",{id:"mainTitle",children:"Welcome to Campfire"}),Object(i.jsx)(S.a,{className:"closeModal",onClick:this.props.close,children:Object(i.jsx)("span",{children:"x"})})]}),Object(i.jsxs)(w.a,{id:"modalBody",children:[Object(i.jsx)("div",{id:"modalImage"}),Object(i.jsx)("div",{id:"modalForm",children:Object(i.jsxs)(T.a,{id:"registerForm",onSubmit:this.handleSubmit,children:[Object(i.jsxs)(N.a,{children:[Object(i.jsx)(P.a,{htmlFor:"registerUsername",children:"Username"}),Object(i.jsx)(I.a,{onChange:function(t){return e.setState({username:t.target.value})},value:this.state.username,id:"registerUsername"})]}),Object(i.jsxs)(N.a,{children:[Object(i.jsx)(P.a,{htmlFor:"registerEmail",children:"Email"}),Object(i.jsx)(I.a,{onChange:function(t){return e.setState({email:t.target.value})},value:this.state.email,id:"registerEmail",type:"email"})]}),Object(i.jsxs)(N.a,{children:[Object(i.jsx)(P.a,{htmlFor:"registerPassword",children:" Password"}),Object(i.jsx)(I.a,{onChange:function(t){return e.setState({password:t.target.value})},value:this.state.password,id:"registerPassword",type:"password"})]}),Object(i.jsxs)(N.a,{children:[Object(i.jsx)(P.a,{htmlFor:"passwordConfirm",children:"Confirm Password"}),Object(i.jsx)(I.a,{onChange:function(t){return e.setState({passwordConfirm:t.target.value})},value:this.state.passwordConfirm,id:"passwordConfirm",type:"password"})]})]})})]}),Object(i.jsxs)(A.a,{className:"modalFooter",children:[Object(i.jsx)(S.a,{form:"registerForm",id:"modalSubmitButton",type:"submit",children:"Create Account"})," "]})]})})}}]),s}(a.a.Component),E=function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).handleSubmit=i.handleSubmit.bind(Object(p.a)(i)),i.state={username:"",password:""},i}return Object(h.a)(s,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var s=this.state.username,i=this.state.password;fetch("".concat(L,"/user/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{username:s,password:i}})}).then((function(e){return e.json()})).then((function(e){e.error?alert("Login not valid, please try again"):1==e.isAdmin?(t.props.adminStatus(),t.props.updateToken(e.sessionToken),t.props.setUser(t.state.username),console.log(e.isAdmin),t.props.close()):(t.props.updateToken(e.sessionToken),t.props.setUser(t.state.username),t.props.close())}))}},{key:"render",value:function(){var e=this;return Object(i.jsx)("div",{id:"login",role:"navigation",children:Object(i.jsxs)(y.a,{isOpen:this.props.open,id:"loginModal",children:[Object(i.jsxs)(C.a,{className:"modalHeader",children:[Object(i.jsx)("div",{id:"mainTitle",children:"Welcome Back!"}),Object(i.jsx)(S.a,{className:"closeModal",onClick:this.props.close,children:Object(i.jsx)("span",{children:"x"})})]}),Object(i.jsxs)(w.a,{id:"modalBody",children:[Object(i.jsx)("div",{id:"modalImage"}),Object(i.jsx)("div",{id:"modalForm",children:Object(i.jsxs)(T.a,{id:"loginForm",onSubmit:this.handleSubmit,children:[Object(i.jsxs)(N.a,{children:[Object(i.jsx)(P.a,{htmlFor:"loginrUsername",children:"Username"}),Object(i.jsx)(I.a,{onChange:function(t){return e.setState({username:t.target.value})},value:this.state.username,id:"loginUsername"})]}),Object(i.jsxs)(N.a,{children:[Object(i.jsx)(P.a,{htmlFor:"loginPassword",children:" Password"}),Object(i.jsx)(I.a,{onChange:function(t){return e.setState({password:t.target.value})},value:this.state.password,id:"loginPassword",type:"password"})]})]})})]}),Object(i.jsxs)(A.a,{className:"modalFooter",children:[Object(i.jsx)(S.a,{form:"loginForm",id:"modalSubmitButton",type:"submit",children:"Login"})," "]})]})})}}]),s}(a.a.Component),R=(s(54),function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).closeRegister=i.closeRegister.bind(Object(p.a)(i)),i.closeLogin=i.closeLogin.bind(Object(p.a)(i)),i.state={collapsed:!0,showRegister:!1,showLogin:!1,hasScrolled:!1},i}return Object(h.a)(s,[{key:"closeRegister",value:function(){this.setState({showRegister:!1})}},{key:"closeLogin",value:function(){this.setState({showLogin:!1})}},{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{children:[Object(i.jsxs)(m.a,{id:"navbar",color:"faded",light:!0,expand:"md",children:[Object(i.jsxs)(O.a,{id:"brand",href:"/",className:"mr-auto",children:[Object(i.jsx)("span",{children:"MI"}),"CAMPFIRE"]}),Object(i.jsx)(x.a,{onClick:function(){return e.setState({collapsed:!e.state.collapsed})},className:"mr-2"}),Object(i.jsx)(f.a,{isOpen:!this.state.collapsed,navbar:!0,children:Object(i.jsxs)(g.a,{id:"navLinks",navbar:!0,className:"navbar-nav ml-auto fullwidth justify-content-end",children:[Object(i.jsx)(i.Fragment,{children:this.props.isAdmin?Object(i.jsx)(v.a,{children:Object(i.jsx)(k.a,{href:"/admin",children:"Manage Users"})}):Object(i.jsx)(i.Fragment,{})}),this.props.isLoggedIn?null:Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(v.a,{children:Object(i.jsx)(k.a,{href:"/search",children:"Campsites"})}),Object(i.jsx)(v.a,{children:Object(i.jsx)(S.a,{onClick:function(){return e.setState({showLogin:!0})},children:"Login"})}),Object(i.jsx)(v.a,{children:Object(i.jsx)(S.a,{onClick:function(){return e.setState({showRegister:!0})},children:"SignUp"})})]}),this.props.isLoggedIn?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(v.a,{children:Object(i.jsx)(k.a,{href:"/search",children:"Campsites"})}),Object(i.jsx)(v.a,{children:Object(i.jsx)(k.a,{href:"/campTrips",children:"My Campfires"})}),Object(i.jsx)(v.a,{children:Object(i.jsx)(S.a,{onClick:this.props.logout,children:"Logout"})})]}):null]})})]}),Object(i.jsx)(F,{updateToken:this.props.updateToken,open:this.state.showRegister,close:this.closeRegister,setUser:this.props.setUserName}),Object(i.jsx)(E,{updateToken:this.props.updateToken,open:this.state.showLogin,close:this.closeLogin,adminStatus:this.props.updateStatus,setUser:this.props.setUserName})]})}}]),s}(a.a.Component)),D=s(78),H=(s(55),function(){return Object(i.jsx)("div",{className:"mainDiv",children:Object(i.jsxs)(D.a,{id:"landingTitle",children:[Object(i.jsxs)("h1",{className:"title",children:[Object(i.jsx)("span",{children:"MI"}),"campfire"]}),Object(i.jsxs)("div",{className:"navButtons",children:[Object(i.jsx)(l.b,{to:"/search",children:Object(i.jsx)(S.a,{children:"National Parks"})})," ",Object(i.jsx)(S.a,{children:"State Parks"})]})]})})}),B=s(79),z=s(80),J=s(81),W=s(82),G=s(83),K=(s(58),s.p+"static/media/imageNotFound.9ad964ff.png"),V=function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).getActivities=i.getActivities.bind(Object(p.a)(i)),i.state={activities:[]},i}return Object(h.a)(s,[{key:"componentWillMount",value:function(){this.getActivities()}},{key:"setActivities",value:function(e){this.setState({activities:e})}},{key:"getActivities",value:function(){var e=this,t=this.props.parkCode,s="https://developer.nps.gov/api/v1/thingstodo?parkCode=".concat(t,"&stateCode=MI&limit=10&api_key=").concat("aVaKQGdwfxUJg0jYUsfle3uPmoLi5w7qgKVfB5ZD");fetch(s).then((function(e){return e.json()})).then((function(t){return e.setActivities(t)})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this;return console.log(this.state.activities),Object(i.jsxs)(y.a,{isOpen:this.props.modalOpen,children:[Object(i.jsx)(w.a,{children:this.state.activities?Object(i.jsxs)("p",{children:["Hello from the Things To Do Modal ",this.props.parkCode]}):Object(i.jsx)("p",{children:"Activities not loaded"})}),Object(i.jsx)(A.a,{children:Object(i.jsx)(S.a,{onclick:function(){return e.props.closeModal()},children:"Done"})})]})}}]),s}(a.a.Component),Y=s(15),q=s(16),Q=function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).getSites=function(){var e="https://developer.nps.gov/api/v1/campgrounds?stateCode=MI"+"&start=".concat(i.state.pageNumber,"&limit=3&api_key=").concat("aVaKQGdwfxUJg0jYUsfle3uPmoLi5w7qgKVfB5ZD");fetch(e).then((function(e){return e.json()})).then((function(e){i.setState({allSites:e})}))},i.getSites=i.getSites.bind(Object(p.a)(i)),i.nextPage=i.nextPage.bind(Object(p.a)(i)),i.previousPage=i.previousPage.bind(Object(p.a)(i)),i.createNewTrip=i.createNewTrip.bind(Object(p.a)(i)),i.closeExtrasModal=i.closeExtrasModal.bind(Object(p.a)(i)),i.state={pageNumber:1,allSites:null,oneSiteInfo:null,extrasModal:!1,parkCode:""},i}return Object(h.a)(s,[{key:"componentDidMount",value:function(){this.getSites()}},{key:"nextPage",value:function(){this.setState({pageNumber:this.state.pageNumber+3}),this.getSites()}},{key:"previousPage",value:function(){this.setState({pageNumber:this.state.pageNumber-3}),this.getSites()}},{key:"extrasModal",value:function(e){this.setState({parkCode:e}),this.setState({extrasModal:!0})}},{key:"closeExtrasModal",value:function(){console.log("hitting?"),this.setState({extrasModal:!1})}},{key:"createNewTrip",value:function(e){var t=this.props.token,s=e.name,i=e.description?e.description:null,n=e.campsites.totalSites?e.campsites.totalSites:null,a=e.contacts.emailAddresses[0].emailAddress?e.contacts.emailAddresses[0].emailAddress:null,c=e.addresses[0].city&&e.addresses[0].line1?e.addresses[0].city+e.addresses[0].line1:null,r=e.operatingHours[0].description?e.operatingHours[0].description:null,o=e.url?e.url:null,l=e.fees.length>0?e.fees[0].cost:null;fetch("".concat(L,"/tripList/new"),{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:t}),body:JSON.stringify({trip:{campsiteName:s,siteDescription:i,totalSites:n,contactEmail:a,siteAddress:c,operatingHours:r,reservationUrl:o,nights:null,costPerNight:l,siteImage:null}})}).then((function(e){return e.json()})).then((function(e){e.error?alert("Something went wrong, trip not saved"):(alert("Trip Saved!"),console.log("Trip Saved!"))}))}},{key:"render",value:function(){var e=this;return Object(i.jsx)("div",{id:"mainDiv",children:Object(i.jsxs)("div",{id:"resultsBody",children:[console.log(this.state.allSites),this.state.allSites?this.state.allSites.data.map((function(t,s){return Object(i.jsx)(D.a,{id:"siteResults",children:Object(i.jsxs)(B.a,{children:[Object(i.jsx)(z.a,{children:Object(i.jsx)("th",{children:"".concat(t.name," - ").concat(t.addresses[0].city)})}),Object(i.jsx)(J.a,{children:Object(i.jsxs)(W.a,{children:[Object(i.jsx)(G.a,{className:"col-md-3",children:0===t.images.length?Object(i.jsx)("img",{src:K,className:"img-fluid",alt:"imageNotFound"}):Object(i.jsx)("img",{id:"siteImage",src:t.images[0].url,className:"img-fluid",alt:"Campsite"})}),Object(i.jsxs)(G.a,{className:"col-md-4",children:[Object(i.jsx)("p",{children:t.description?t.description:"Site description not available"}),Object(i.jsx)("tr",{children:Object(i.jsx)("a",{href:t.url,target:"blank",children:"Park Website"})})]}),Object(i.jsxs)(G.a,{className:"col-md-5",children:[Object(i.jsxs)("table",{children:[Object(i.jsx)("thead",{children:Object(i.jsx)("tr",{children:Object(i.jsx)("th",{scope:"col",children:"Open Dates"})})}),Object(i.jsxs)("tbody",{children:[Object(i.jsx)("tr",{children:Object(i.jsx)("td",{children:t.operatingHours.length>0?t.operatingHours[0].description:"Contact for operating hours"})}),Object(i.jsx)("hr",{}),Object(i.jsx)("tr",{children:Object(i.jsxs)("td",{children:[Object(i.jsx)("b",{children:"Total Sites:"})," ",t.campsites.totalSites?t.campsites.totalSites:"Contact for available sites"]})}),Object(i.jsx)("hr",{})]})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)("th",{children:"Amenities:"}),Object(i.jsxs)("div",{id:"amenitiesIcons",children:["No"==t.amenities.cellPhoneReception?Object(i.jsx)("div",{id:"noSignal",title:"No cellphone signal",children:Object(i.jsx)(Y.a,{icon:q.e})}):Object(i.jsx)("div",{id:"signal",title:"Cellphone signal available",children:Object(i.jsx)(Y.a,{icon:q.e})}),"No"==t.amenities.firewoodForSale?Object(i.jsx)("div",{id:"noFirewood",title:"No firewood for sale",children:Object(i.jsx)(Y.a,{icon:q.a})}):Object(i.jsx)("div",{id:"fire",title:"Firewood for sale",children:Object(i.jsx)(Y.a,{icon:q.a})}),t.amenities.potableWater[0]?Object(i.jsx)("div",{id:"water",title:"Potable water available",children:Object(i.jsx)(Y.a,{icon:q.f})}):Object(i.jsx)("div",{id:"noWater",title:"No potable water",children:Object(i.jsx)(Y.a,{icon:q.f})}),"None"==t.amenities.showers[0]?Object(i.jsx)("div",{id:"noShower",title:"No shower facilities",children:Object(i.jsx)(Y.a,{icon:q.d})}):Object(i.jsx)("div",{id:"shower",title:"Shower facilities available",children:Object(i.jsx)(Y.a,{icon:q.d})}),t.amenities.toilets[0]?Object(i.jsx)("div",{id:"toilet",title:"Toilets available",children:Object(i.jsx)(Y.a,{icon:q.g})}):Object(i.jsx)("div",{id:"noToilet",title:"No toilets available",children:Object(i.jsx)(Y.a,{icon:q.g})})]})]}),Object(i.jsx)("hr",{}),Object(i.jsxs)("div",{className:"moreInfoButtons",children:[Object(i.jsx)(S.a,{onClick:function(){return e.extrasModal(t.parkCode)},children:"Things To Do"}),e.props.token?Object(i.jsx)(S.a,{onClick:function(){return e.createNewTrip(t)},value:t,children:"Save Campsite"}):Object(i.jsx)(i.Fragment,{})]})]})]})})]})})})):Object(i.jsx)(i.Fragment,{}),Object(i.jsx)(V,{modalOpen:this.state.extrasModal,parkCode:this.state.parkCode,closeModal:this.closeExtrasModal}),Object(i.jsxs)("div",{id:"pageButtons",children:[Object(i.jsx)(S.a,{onClick:this.previousPage,children:"Previous Sites"}),Object(i.jsx)(S.a,{onClick:this.nextPage,children:"More Sites"})]})]})})}}]),s}(a.a.Component),X=s(84),Z=function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).deletePackItem=function(e){fetch("".concat(L,"/packList/").concat(e.id),{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:i.props.token})}).then((function(){return i.props.getItems(e.tripId)}))},i.editPackItem=function(e){i.setState({itemToUpdate:e.packItem}),i.setState({editModal:!0}),i.setState({tripId:e.tripId}),i.setState({itemId:e.id})},i.updatePackItem=function(){var e=i.state.itemToUpdate;fetch("".concat(L,"/packList/").concat(i.state.itemId),{method:"PUT",headers:new Headers({"Content-Type":"application/json",Authorization:i.props.token}),body:JSON.stringify({packList:{newItem:e}})}).then((function(e){return e.json()})).then((function(e){e.error?console.log(e.error.message):(i.props.getItems(i.state.tripId),i.setState({editModal:!1}))}))},i.deletePackItem=i.deletePackItem.bind(Object(p.a)(i)),i.editPackItem=i.editPackItem.bind(Object(p.a)(i)),i.state={editModal:!1,itemToUpdate:"",tripId:0,itemId:0},i}return Object(h.a)(s,[{key:"render",value:function(){var e=this;return this.props.packList.map((function(t,s){return Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:t.packItem}),Object(i.jsx)("td",{children:t.who}),Object(i.jsxs)("div",{id:"packListButtons",children:[Object(i.jsx)(S.a,{color:"info",onClick:function(){return e.editPackItem(t)},children:Object(i.jsx)(Y.a,{icon:q.c})}),Object(i.jsx)(S.a,{color:"danger",onClick:function(){return e.deletePackItem(t)},children:Object(i.jsx)(Y.a,{icon:q.b})})]}),Object(i.jsx)("div",{children:Object(i.jsx)(y.a,{isOpen:e.state.editModal,children:Object(i.jsxs)(w.a,{children:[Object(i.jsx)("h4",{children:"Edit Pack Item"}),Object(i.jsx)(S.a,{onClick:function(){return e.setState({editModal:!1})},children:"X"}),Object(i.jsx)(I.a,{name:"itemToEdit",type:"text",placeholder:e.state.itemToUpdate,onChange:function(t){return e.setState({itemToUpdate:t.target.value})}}),Object(i.jsx)(S.a,{onClick:function(){return e.updatePackItem()},children:"Save"})]})})})]},s)}))}}]),s}(a.a.Component),_=function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).fetchPackList=function(e){var t=e;i.props.token&&fetch("".concat(L,"/packList/getList/").concat(t),{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:i.props.token})}).then((function(e){return e.json()})).then((function(e){e.length>0&&i.setState({packListItems:e})})).catch((function(e){return console.log(e)}))},i.addPackItem=function(e,t){var s=e,n=t;fetch("".concat(L,"/packList/newPackList"),{method:"POST",headers:new Headers({"Content-Type":"application/json",Authorization:i.props.token}),body:JSON.stringify({packList:{tripId:s,packItem:n},user:{userName:"MountainGoat220"}})}).then((function(e){return e.json()})).then((function(e){e.error?console.log(e.error.message):i.fetchPackList(s)}))},i.updateTripInfo=function(e){var t=i.state.campRes,s=i.state.recPass,n=i.state.fireRes,a=i.state.rustic;fetch("".concat(L,"/tripList/").concat(e),{method:"PUT",headers:new Headers({"Content-Type":"application/json",Authorization:i.props.token}),body:JSON.stringify({trip:{campsiteReserved:t,recreationPassport:s,fireRestrictions:n,rusticSite:a}})}).then((function(){return i.props.fetchAllSites()}))},i.updateTripInfo=i.updateTripInfo.bind(Object(p.a)(i)),i.addPackItem=i.addPackItem.bind(Object(p.a)(i)),i.state={packList:"",packItem:"",campRes:!1,recPass:!1,fireRes:!1,rustic:!1,packListItems:[]},i}return Object(h.a)(s,[{key:"handleChange",value:function(e){this.setState({packItem:e.target.value})}},{key:"render",value:function(){var e=this;return Object(i.jsxs)(B.a,{className:"tripCard",children:[Object(i.jsx)(z.a,{className:"cardHeader",children:Object(i.jsx)("b",{children:this.props.site.campsiteName})}),Object(i.jsxs)(J.a,{className:"cardBody",children:[Object(i.jsx)("p",{children:this.props.site.siteDescription}),Object(i.jsx)("hr",{}),Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)(G.a,{className:"col align-self-start",children:[Object(i.jsxs)(T.a,{children:[Object(i.jsx)("h6",{children:"Fee Calculator"}),Object(i.jsx)(I.a,{type:"number",placeholder:"Site fee per night"}),Object(i.jsx)(I.a,{type:"number",placeholder:"# of campers"}),Object(i.jsx)(I.a,{type:"number",placeholder:"# of nights"})]}),Object(i.jsx)("hr",{}),Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)("div",{className:"input-group=prepend",children:Object(i.jsx)("div",{className:"input-group-text",children:Object(i.jsx)("input",{type:"checkbox",checked:!!this.props.site.campsiteReserved,"aria-label":"reservation",value:"reservation",onChange:function(){return e.setState({campRes:!0})}})})}),Object(i.jsx)("label",{htmlFor:"reservation",children:"Campsite reserved"})]}),Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)("div",{className:"input-group=prepend",children:Object(i.jsx)("div",{className:"input-group-text",children:Object(i.jsx)("input",{type:"checkbox",checked:!!this.props.site.recreationPassport,"aria-label":"recPassport",value:"recPassport",onChange:function(){return e.setState({recPass:!0})}})})}),Object(i.jsxs)("label",{htmlFor:"recPassport",children:["Recreation Passport ",Object(i.jsx)("i",{children:"(State parks only)"})]})]}),Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)("div",{className:"input-group=prepend",children:Object(i.jsx)("div",{className:"input-group-text",children:Object(i.jsx)("input",{type:"checkbox",checked:!!this.props.site.fireRestriction,"aria-label":"reservation",value:"reservation",onChange:function(){return e.setState({fireRes:!0})}})})}),Object(i.jsx)("label",{htmlFor:"reservation",children:"Fire restrictions"})]}),Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)("div",{className:"input-group=prepend",children:Object(i.jsx)("div",{className:"input-group-text",children:Object(i.jsx)("input",{type:"checkbox",checked:!!this.props.site.rusticSite,"aria-label":"rustic",value:"rustic",onChange:function(){return e.setState({rustic:!0})}})})}),Object(i.jsx)("label",{htmlFor:"rustic",children:"Rustic site"})]}),Object(i.jsx)(S.a,{onClick:function(){return e.updateTripInfo(e.props.site.id)},children:"Save Changes"})]}),Object(i.jsx)(G.a,{className:"col align-self-end",children:Object(i.jsxs)("table",{children:[Object(i.jsx)("thead",{children:"Pack List"}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Item"}),Object(i.jsx)("th",{children:"Who"})]}),this.state.packListItems.length>0?Object(i.jsx)(Z,{packList:this.state.packListItems,getItems:this.fetchPackList,token:this.props.token}):this.fetchPackList(this.props.site.id),Object(i.jsxs)("tr",{children:[Object(i.jsx)("input",{type:"text",id:"newItem",placeholder:"Add new pack item",value:this.state.packItem,onChange:this.handleChange.bind(this)}),Object(i.jsx)(S.a,{color:"success",onClick:function(){return e.addPackItem(e.props.site.id,e.state.packItem)},children:" + "})]})]})})]})]}),Object(i.jsx)(X.a,{className:"cardFooter",children:Object(i.jsx)(G.a,{id:"deleteCol",md:"6",children:Object(i.jsx)(S.a,{onClick:function(){e.props.deleteTrip(e.props.site)},children:"Delete"})})})]},this.props.index)}}]),s}(n.Component),$=function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).fetchAllSites=function(){i.props.token&&fetch("".concat(L,"/tripList/all"),{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:i.props.token})}).then((function(e){return e.json()})).then((function(e){return i.setState({userTrips:e})})).catch((function(e){return console.log(e)}))},i.deleteTrip=function(e){fetch("".concat(L,"/tripList/").concat(e.id),{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:i.props.token})}).then((function(){return i.fetchAllSites()}))},i.editUpdateSite=function(e){i.setState({tripToUpdate:e})},i.updateOn=function(){i.setState({updateActive:!0})},i.updateOff=function(){i.setState({updateActive:!1})},i.updateOn=i.updateOn.bind(Object(p.a)(i)),i.editUpdateSite=i.editUpdateSite.bind(Object(p.a)(i)),i.updateOff=i.updateOff.bind(Object(p.a)(i)),i.deleteTrip=i.deleteTrip.bind(Object(p.a)(i)),i.state={userTrips:[],updateActive:!1,tripToUpdate:{},packItem:"",packListItems:[],packListEmpty:!0},i}return Object(h.a)(s,[{key:"componentDidMount",value:function(){this.fetchAllSites(),console.log(this.props.token)}},{key:"render",value:function(){var e=this;return console.log(this.props.user),Object(i.jsx)("div",{children:Object(i.jsx)("div",{id:"siteCards",children:Object(i.jsxs)(D.a,{children:[Object(i.jsxs)(G.a,{children:[console.log(this.state.userTrips.length,this.state.userTrips),this.state.userTrips.length?this.state.userTrips.map((function(t,s){return Object(i.jsx)(_,{site:t,index:s,token:e.props.token,deleteTrip:e.deleteTrip,fetchAllSites:e.fetchAllSites})})):this.fetchAllSites()]}),Object(i.jsx)(y.a,{isOpen:this.state.updateActive,children:Object(i.jsxs)(w.a,{children:[Object(i.jsx)("h4",{children:"Edit Campsite"}),Object(i.jsx)("div",{id:"deleteModalButtons",children:Object(i.jsx)(S.a,{onClick:function(){return e.setState({updateActive:!1})},children:"Done"})})]})})]})})})}}]),s}(a.a.Component),ee=function(e){Object(u.a)(s,e);var t=Object(b.a)(s);function s(e){var i;return Object(j.a)(this,s),(i=t.call(this,e)).modifyAdminStatus=i.modifyAdminStatus.bind(Object(p.a)(i)),i.deleteUserFunction=i.deleteUserFunction.bind(Object(p.a)(i)),i.state={admin:!0,allUsers:[]},i}return Object(h.a)(s,[{key:"fetchAllUsers",value:function(){var e=this;fetch("".concat(L,"/user/admin"),{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token})}).then((function(e){return e.json()})).then((function(t){return e.setState({allUsers:t})})).catch((function(e){return console.log(e)}))}},{key:"modifyAdminStatus",value:function(e){fetch("".concat(L,"/user/admin/").concat(e.id),{method:"PUT",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token})}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)})),this.fetchAllUsers()}},{key:"deleteUserFunction",value:function(e){fetch("".concat(L,"/user/admin/").concat(e.id),{method:"DELETE",headers:new Headers({"Content-Type":"application/json",Authorization:this.props.token})}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)})),this.fetchAllUsers()}},{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{id:"manageUsersTable",children:[Object(i.jsx)("thead",{children:"User Management Options"}),Object(i.jsxs)("tbody",{children:[Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"User"}),Object(i.jsx)("th",{children:"Email"}),Object(i.jsx)("th",{children:"Admin Privileges"}),Object(i.jsx)("th",{children:"Modify Privileges"}),Object(i.jsx)("th",{children:"Delete User"})]}),this.state.allUsers.length>0?this.state.allUsers.map((function(t){return Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:t.username}),Object(i.jsx)("td",{children:t.email}),Object(i.jsx)("td",{children:1==t.isAdmin?"Yes":"No"}),Object(i.jsx)("td",{children:Object(i.jsx)(S.a,{color:"info",onClick:function(){return e.modifyAdminStatus(t)},children:"Modify"})}),Object(i.jsx)("td",{children:Object(i.jsx)(S.a,{color:"danger",onClick:function(){return e.deleteUserFunction(t)},children:"X"})})]})})):this.fetchAllUsers()]})]})}}]),s}(a.a.Component),te={isAuthenticated:!1},se=function(){var e=Object(n.useState)(),t=Object(o.a)(e,2),s=t[0],a=t[1],c=Object(n.useState)(!1),r=Object(o.a)(c,2),j=r[0],h=r[1],p=Object(n.useState)(""),u=Object(o.a)(p,2),b=u[0],m=u[1];Object(n.useEffect)((function(){localStorage.getItem("token")&&(a(localStorage.getItem("token")),te.isAuthenticated=!0)}),[s]);return Object(i.jsxs)(l.a,{children:[Object(i.jsx)(R,{updateToken:function(e){localStorage.setItem("token",e),a(e),console.log(s)},logout:function(){localStorage.clear(),a(""),m(""),h(!1),te.isAuthenticated=!1},isLoggedIn:!!s,isAdmin:!!j,updateStatus:function(){h(!0)},setUserName:function(e){m(e)}}),Object(i.jsxs)(d.c,{children:[Object(i.jsx)(d.a,{path:"/search",children:Object(i.jsx)(Q,{token:s})}),Object(i.jsx)(d.a,{path:"/admin",children:Object(i.jsx)(ee,{isAdmin:j,token:s})}),Object(i.jsx)(d.a,{path:"/campTrips",children:Object(i.jsx)($,{token:s,user:b})}),Object(i.jsx)(d.a,{path:"/",children:Object(i.jsx)(H,{})})]})]})};r.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(se,{})}),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.fb307af7.chunk.js.map