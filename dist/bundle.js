!function i(f,l,d){function u(n,e){if(!l[n]){if(!f[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(c)return c(n,!0);var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}var r=l[n]={exports:{}};f[n][0].call(r.exports,function(e){return u(f[n][1][e]||e)},r,r.exports,i,f,l,d)}return l[n].exports}for(var c="function"==typeof require&&require,e=0;e<d.length;e++)u(d[e]);return u}({1:[function(e,n,t){(function(e){"use strict";e=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==e)return e;throw new Error("unable to locate global object")}();n.exports=t=e.fetch,t.default=e.fetch.bind(e),t.Headers=e.Headers,t.Request=e.Request,t.Response=e.Response}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,n,t){"use strict";var o,r=e("node-fetch"),i=(o=r)&&o.__esModule?o:{default:o};function f(){console.log("clicked"),function(e,n){var t=0<arguments.length&&void 0!==e?e:"https://localhost:3000/newBlogEntry",o=1<arguments.length&&void 0!==n?n:{};console.log("create new BlogEntry");var r={method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)};(0,i.default)(t,r).then(function(e){return console.log("fetch",e),e.json()})}("https://localhost:8080/newBlogEntry",{title:"myNewBlogEntry"})}document.addEventListener("DOMContentLoaded",function(e){console.log("loaded"),document.getElementById("testButton").addEventListener("click",f)})},{"node-fetch":1}]},{},[2]);