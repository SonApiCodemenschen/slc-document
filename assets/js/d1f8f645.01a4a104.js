"use strict";(self.webpackChunkdocument=self.webpackChunkdocument||[]).push([[934],{2132:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>d,metadata:()=>l,toc:()=>a});var t=n(5893),s=n(1151);const d={sidebar_position:3},i="Alert API",l={id:"homepage/alert",title:"Alert API",description:"POST /api/widgets/alert",source:"@site/docs/homepage/alert.md",sourceDirName:"homepage",slug:"/homepage/alert",permalink:"/slc-document/docs/homepage/alert",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/homepage/alert.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Weekly Overview API",permalink:"/slc-document/docs/homepage/weekly-overview"},next:{title:"Recommendations API",permalink:"/slc-document/docs/homepage/recommendations"}},c={},a=[{value:"Headers",id:"headers",level:5},{value:"Parameters",id:"parameters",level:5},{value:"Responses",id:"responses",level:5}];function o(e){const r={blockquote:"blockquote",code:"code",h1:"h1",h5:"h5",img:"img",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.a)(),...e.components},{Details:d}=r;return d||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"alert-api",children:"Alert API"}),"\n",(0,t.jsxs)(d,{open:!0,children:[(0,t.jsxs)("summary",{children:[(0,t.jsx)("code",{children:"POST"}),(0,t.jsx)("code",{children:(0,t.jsx)("b",{children:"/api/widgets/alert"})})]}),(0,t.jsx)(r.h5,{id:"headers",children:"Headers"}),(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.th,{children:"name"}),(0,t.jsx)(r.th,{children:"type"}),(0,t.jsx)(r.th,{children:"data type"}),(0,t.jsx)(r.th,{children:"description"})]})}),(0,t.jsxs)(r.tbody,{children:[(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"Authorization"}),(0,t.jsx)(r.td,{children:"required"}),(0,t.jsx)(r.td,{children:"String"}),(0,t.jsx)(r.td,{children:(0,t.jsx)(r.code,{children:"Bearer <Access Token>"})})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"Content-Type"}),(0,t.jsx)(r.td,{children:"required"}),(0,t.jsx)(r.td,{children:"String"}),(0,t.jsx)(r.td,{children:(0,t.jsx)(r.code,{children:"application/json"})})]})]})]}),"\n"]}),(0,t.jsx)(r.h5,{id:"parameters",children:"Parameters"}),(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.th,{children:"name"}),(0,t.jsx)(r.th,{children:"type"}),(0,t.jsx)(r.th,{children:"data type"}),(0,t.jsx)(r.th,{children:"description"})]})}),(0,t.jsx)(r.tbody,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:"action"}),(0,t.jsx)(r.td,{children:"required"}),(0,t.jsx)(r.td,{children:"String"}),(0,t.jsx)(r.td,{children:"ajax_get_data_widget"})]})})]}),"\n"]}),(0,t.jsx)(r.h5,{id:"responses",children:"Responses"}),(0,t.jsxs)(r.blockquote,{children:["\n",(0,t.jsxs)(r.table,{children:[(0,t.jsx)(r.thead,{children:(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.th,{children:"http code"}),(0,t.jsx)(r.th,{children:"content-type"}),(0,t.jsx)(r.th,{children:"response"})]})}),(0,t.jsxs)(r.tbody,{children:[(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:(0,t.jsx)(r.code,{children:"400"})}),(0,t.jsx)(r.td,{children:(0,t.jsx)(r.code,{children:"application/json"})}),(0,t.jsx)(r.td,{children:(0,t.jsx)(r.code,{children:'{"code":"400","message":"Bad Request"}'})})]}),(0,t.jsxs)(r.tr,{children:[(0,t.jsx)(r.td,{children:(0,t.jsx)(r.code,{children:"200"})}),(0,t.jsx)(r.td,{children:(0,t.jsx)(r.code,{children:"text/plain;charset=UTF-8"})}),(0,t.jsx)(r.td,{children:(0,t.jsx)(r.code,{children:"json data"})})]})]})]}),"\n"]}),(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-javascript",metastring:'title="JSON DATA"',children:'[\r\n    {\r\n        "id": 152544,\r\n        "team_id": 148315,\r\n        "first_name": "Lennart",\r\n        "last_name": "Grill",\r\n        "playing_time": 12344678,\r\n        "aka": "Franz Stolz",\r\n        "max_velocity": "30.00",\r\n        "max_heart_rate": "200.00",\r\n        "birthday": "2001-02-14",\r\n        "ignore_velocity": null,\r\n        "need_for_speed": {\r\n            "18495": null,\r\n            "3382": null,\r\n            "3375": null\r\n        },\r\n        "jersey": "12",\r\n        "ac": [],\r\n        "option": 1062,\r\n        "sleep": null,\r\n        "stress": null,\r\n        "fatigue": null,\r\n        "muscle": null,\r\n        "week_to_week": [\r\n            {\r\n                "parameter_value": 0,\r\n                "parameter_id": 3380\r\n            },\r\n            {\r\n                "parameter_value": 0,\r\n                "parameter_id": 3375\r\n            },\r\n            {\r\n                "parameter_value": 0,\r\n                "parameter_id": 3376\r\n            },\r\n            {\r\n                "parameter_value": 0,\r\n                "parameter_id": 3377\r\n            }\r\n        ],\r\n        "wellness": [\r\n            {\r\n                "sleep": 1,\r\n                "well_being": 2,\r\n                "fatigue": 3,\r\n                "muscle": 4,\r\n                "wellness_score": 5\r\n            }\r\n        ]\r\n    },\r\n    //...\r\n]\n'})})]}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.img,{alt:"Home Alert 1",src:n(6033).Z+"",width:"653",height:"492"})})]})}function h(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},6033:(e,r,n)=>{n.d(r,{Z:()=>t});const t=n.p+"assets/images/home_alert-de19a0fdaede7d829dff9a729cc48e3e.png"},1151:(e,r,n)=>{n.d(r,{Z:()=>l,a:()=>i});var t=n(7294);const s={},d=t.createContext(s);function i(e){const r=t.useContext(d);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(d.Provider,{value:r},e.children)}}}]);