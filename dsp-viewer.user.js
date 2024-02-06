// ==UserScript==
// @name       dsp-viewer
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @include    https://www.dsp2b.com/*
// @include    https://www.dsp2b.com/zh-CN/blueprint/*
// @grant      GM_addStyle
// @grant      unsafeWindow
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(' .dsp-viewer{padding:1em 2em;border:none;border-radius:5px;font-weight:700;letter-spacing:5px;text-transform:uppercase;cursor:pointer;color:#2c9caf;transition:all 1s;font-size:15px;position:relative;overflow:hidden;outline:2px solid #2c9caf}.dsp-viewer:hover{color:#fff;transform:scale(1.1);outline:2px solid #70bdca;box-shadow:4px 5px 17px -4px #268391}.dsp-viewer:before{content:"";position:absolute;left:-50px;top:0;width:0;height:100%;background-color:#2c9caf;transform:skew(45deg);z-index:-1;transition:width 1s}.dsp-viewer:hover:before{width:250%}.dsp-viewer-box,details{display:flex;justify-content:center;padding-bottom:15px} ');

(function () {
  'use strict';

  var _unsafeWindow = /* @__PURE__ */ (() => "undefined" != typeof unsafeWindow ? unsafeWindow : void 0)();
  console.log("hello world"), _unsafeWindow.addEventListener("popstate", () => {
    console.log("页面变动");
  }), setInterval(function process() {
    let url = _unsafeWindow.location.href;
    if (console.log(`url: ${url}, currentUrl: ${currentUrl}`), currentUrl === url)
      return;
    /dsp2b\.com\/zh-CN(?:\?.*|\/?)$/i.test(url) && (console.log("列表页"), function listInit() {
      _unsafeWindow.document.querySelectorAll(".ant-card-cover").forEach((ele) => {
        ele.querySelectorAll(".dsp-viewer").forEach((btn) => {
          btn.remove();
        }), ele.append(getBtn());
      });
    }());
    /dsp2b\.com\/zh-CN\/blueprint/i.test(url) && (console.log("内容页"), function detailInit() {
      let desc = _unsafeWindow.document.querySelector(".markdown-body");
      if (desc)
        return void desc.before(getBtn("details"));
    }());
    currentUrl = url;
  }, 500);
  let currentUrl = "";
  function getBtn(suffix = "list") {
    let div = _unsafeWindow.document.createElement("div");
    div.className = `dsp-viewer-box ${suffix}`;
    let btn = _unsafeWindow.document.createElement("button");
    return btn.textContent = "蓝图预览", btn.className = "dsp-viewer", btn.onclick = (event) => {
      !function viewBlueprint(event2, suffix2) {
        var _a;
        let url = "";
        if ("list" == suffix2) {
          let a = (_a = event2.target.parentNode) == null ? void 0 : _a.querySelector("a");
          a && (url = a.href);
        } else
          url = currentUrl;
        const regex = /\/blueprint\/([a-f0-9]+)$/, match = url.match(regex);
        if (match && match.length > 0) {
          let id = match[1];
          _unsafeWindow.open(`https://dsp.huizhek.com/?bp=${id}`);
        }
      }(event, suffix);
    }, div.append(btn), div;
  }

})();