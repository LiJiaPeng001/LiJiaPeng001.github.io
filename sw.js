if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let a={};const o=e=>i(e,l),t={module:{uri:l},exports:a,require:o};s[l]=Promise.all(r.map((e=>t[e]||o(e)))).then((e=>(n(...e),a)))}}define(["./workbox-ab24e45d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"about.html",revision:"880184edcd0644567b6604ac83911b1c"},{url:"assets/_...all_.c3795d42.js",revision:null},{url:"assets/_name_.d0fa0404.js",revision:null},{url:"assets/404.f6c20a5d.js",revision:null},{url:"assets/about.849a3b6c.js",revision:null},{url:"assets/app.bc743002.js",revision:null},{url:"assets/home.d3e72bb8.js",revision:null},{url:"assets/index.1b5d2e2d.css",revision:null},{url:"assets/README.d15a1724.js",revision:null},{url:"assets/virtual_pwa-register.743219be.js",revision:null},{url:"assets/workbox-window.prod.es5.6954f450.js",revision:null},{url:"index.html",revision:"2cfbdf87d4f65214f7bc32b68fd39091"},{url:"readme.html",revision:"e85727840e4d7a6fd0aa7b98a0cf3a67"},{url:"favicon.svg",revision:"a795ab195c26601ea433babed25a7d0d"},{url:"safari-pinned-tab.svg",revision:"5eaf74d1c43d30e0af743b68a3f48504"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"37e8d18026b05432f623fc5efac2b4b1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
