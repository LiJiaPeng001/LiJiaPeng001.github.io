if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let a={};const o=e=>i(e,l),t={module:{uri:l},exports:a,require:o};s[l]=Promise.all(r.map((e=>t[e]||o(e)))).then((e=>(n(...e),a)))}}define(["./workbox-ab24e45d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"about.html",revision:"5ebf425b56ee0bb7cd223496b6848266"},{url:"assets/_...all_.9f71fcbf.js",revision:null},{url:"assets/_name_.105daae0.js",revision:null},{url:"assets/404.c43e2051.js",revision:null},{url:"assets/about.ce666d4e.js",revision:null},{url:"assets/app.22d3eee6.js",revision:null},{url:"assets/home.7e902663.js",revision:null},{url:"assets/index.1b5d2e2d.css",revision:null},{url:"assets/README.bbf16a86.js",revision:null},{url:"assets/virtual_pwa-register.44c4d3df.js",revision:null},{url:"assets/workbox-window.prod.es5.6954f450.js",revision:null},{url:"index.html",revision:"aee4414a8a1cddb43a3a4c1f1a8a8239"},{url:"readme.html",revision:"7ea3ce559cf9a079ae5096ecdcecbacf"},{url:"favicon.svg",revision:"a795ab195c26601ea433babed25a7d0d"},{url:"safari-pinned-tab.svg",revision:"5eaf74d1c43d30e0af743b68a3f48504"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"37e8d18026b05432f623fc5efac2b4b1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
