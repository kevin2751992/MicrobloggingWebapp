!function i(u,f,s){function c(t,e){if(!f[t]){if(!u[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=f[t]={exports:{}};u[t][0].call(o.exports,function(e){return c(u[t][1][e]||e)},o,o.exports,i,u,f,s)}return f[t].exports}for(var l="function"==typeof require&&require,e=0;e<s.length;e++)c(s[e]);return c}({1:[function(e,t,n){e("./test"),window.test=function(){console.log("Dies ist ein neuer Test 3"),console.log("test2")}},{"./test":2}],2:[function(e,t,n){console.log("test 2")},{}]},{},[1]);