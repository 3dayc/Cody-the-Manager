/**
 * Mcx Dialog Mobile v0.2.0
 * Copyright (C) 2019 mcx
 * https://github.com/code-mcx/mcx-dialog-mobile
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./css/dialog-mobile.css')) :
  typeof define === 'function' && define.amd ? define(['./css/dialog-mobile.css'], factory) :
  (global = global || self, global.mcxDialog = factory());
}(this, function () { 'use strict';

  function getAnimationEndName(dom) {
    var cssAnimation = ["animation", "webkitAnimation"];
    var animationEnd = {
      "animation": "animationend",
      "webkitAnimation": "webkitAnimationEnd"
    };
    for (var i = 0; i < cssAnimation.length; i++) {
      if (dom.style[cssAnimation[i]] != undefined) {
        return animationEnd[cssAnimation[i]];
      }
    }
    return undefined;
  }

  function addClass(e, c) {
    var newclass = e.className.split(" ");
    if (e.className === "") newclass = [];
    newclass.push(c);
    e.className = newclass.join(" ");
  }

  function extend(source, target) {
    for (var key in target) {
      source[key] = target[key];
    }
    return source;
  }

  function getFontSize() {
    var clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 640) {
      return 16 * (clientWidth / 375) + "px";
    } else {
      return 16;
    }
  }

  var layer = {
    initOpen: function initOpen(dom, options) {
      dom.style.fontSize = getFontSize();

      var body = document.querySelector("body");
      var bg = document.createElement("div");
      addClass(bg, "dialog-mobile-bg");

      if($(this).hasClass("info")){
        // addClass(dialog, "info");
        //console.log('1yes');
      }
	  //console.log('1no');

      if (options.showBottom == true) {
        addClass(bg, "animation-bg-fadeIn");
      }

      if (options.bottom) {
        bg.addEventListener("click", function () {
          handleClose();
        });
      }
	
	console.log(options.appendParentId)
	
	//컨텐츠 영역 안쪽에서 팝업 생성을 위한 추가 옵션
	if(options.appendParentId) {
		document.getElementById(options.appendParentId).appendChild(bg);
		document.getElementById(options.appendParentId).appendChild(dom);
	} else {
		body.appendChild(bg);
		body.appendChild(dom);
	}
      

      var animationEndName = getAnimationEndName(dom);
      function handleClose() {
        if (animationEndName) {
          layer.close([bg],options);
          addClass(dom, options.closeAnimation);
          dom.addEventListener(animationEndName, function () {
            layer.close([dom],options);
          });
        } else {
          layer.close([bg, dom],options);
        }
      };


      //상단 닫기 아이콘
      var closeBtn = document.querySelector(".dialog-close-button");
      closeBtn.addEventListener("click", function () {
        handleClose();
      });
      closeBtn.focus(); 	/* 20220121 윤성미 추가  */


      // set button click event
      options.btns.forEach(function (btn, i) {
        if (i == 0) {

          if (!options.bottom) {
            btn.addEventListener("click", function () {
              handleClose();
              options.sureBtnClick();
            });
          } else {
            btn.addEventListener("click", function () {
              handleClose();
              options.btnClick(this.getAttribute("i"));
            });
          }
        } else if(i == 1) {
			if (!options.bottom) {
				btn.addEventListener("click", function () {
				  handleClose();
				  options.cancelBtnClick();
				});
			  } else {
				btn.addEventListener("click", function () {
				  handleClose();
				  options.btnClick(this.getAttribute("i"));
				});
			  }
		} else {
          btn.addEventListener("click", handleClose);
        }
      });

      if (!options.bottom) {
        // set position
		dom.style.top = (document.documentElement.clientHeight - dom.offsetHeight) / 2 + "px";
        dom.style.left = (document.documentElement.clientWidth - dom.offsetWidth) / 2 + "px";
		$(dom).draggable({
			"containment": $(bg)
		}); //드래그 기능 추가
      }
		
    },
    close: function close(doms, options) {
		var body = document.querySelector("body");
		
		//컨텐츠 영역 안쪽에서 팝업 제거를 위한 추가 옵션
		if(options.appendParentId) {
			for (var k = 0; k < doms.length; k++) {
				document.getElementById(options.appendParentId).removeChild(doms[k]);
			  }
		} else {
			for (var i = 0; i < doms.length; i++) {
				body.removeChild(doms[i]);
			  }
		}
      
    }
  };

  var mcxDialog = {
    alert: function alert(content, options) {
      var opts = {
        titleText: "",
        sureBtnText: "YES"
      };
      opts = extend(opts, options);
      var btn = document.createElement("div");
      btn.innerText = opts.sureBtnText;
      addClass(btn, "dialog-button");

      opts.btns = [btn];

      this.open(content, opts);
    },
    // alert Info : 윤성미 추가
    alertI: function alert(content, options) {
      var opts = {
        titleText: "",
        sureBtnText: "YES"
      };
      opts = extend(opts, options);
      var btn = document.createElement("div");
      btn.innerText = opts.sureBtnText;
      addClass(btn, "dialog-button");

      opts.btns = [btn];

      this.openInfo(content, opts);
    },
    // alert Danger : 윤성미 추가
    alertD: function alert(content, options) {
      var opts = {
        titleText: "",
        sureBtnText: "YES"
      };
      opts = extend(opts, options);
      var btn = document.createElement("div");
      btn.innerText = opts.sureBtnText;
      addClass(btn, "dialog-button");

      opts.btns = [btn];

      this.openDanger(content, opts);
    },
    // alert Warning : 윤성미 추가
    alertW: function alert(content, options) {
      var opts = {
        titleText: "",
        sureBtnText: "YES"
      };
      opts = extend(opts, options);
      var btn = document.createElement("div");
      btn.innerText = opts.sureBtnText;
      addClass(btn, "dialog-button");

      opts.btns = [btn];

      this.openWarning(content, opts);
    },
    confirm: function confirm(content, options) {
      var opts = {
        titleText: "",
        cancelBtnText: "NO",
		cancelBtnClick: function cancelBtnClick() {},
        sureBtnText: "YES",
        sureBtnClick: function sureBtnClick() {}
      };
      opts = extend(opts, options);

      // var cancelBtn = document.createElement("div");
      // cancelBtn.innerText = opts.cancelBtnText;
      // addClass(cancelBtn, "dialog-cancel-button");

      var cancelBtn = document.createElement("button"); /*  */
      cancelBtn.setAttribute("type", "button"); /*  */
      cancelBtn.innerText = opts.cancelBtnText; /*  */
      addClass(cancelBtn, "dialog-cancel-button");

      // var sureBtn = document.createElement("div");
      // sureBtn.innerText = opts.sureBtnText;
      // addClass(sureBtn, "dialog-sure-button");

      var sureBtn = document.createElement("button"); /*  */
      sureBtn.setAttribute("type", "button"); /*  */
      sureBtn.innerText = opts.sureBtnText;
      addClass(sureBtn, "dialog-sure-button");


      opts.btns = [sureBtn, cancelBtn];
      this.open(content, opts);
    },
    // confirm Info : 윤성미 추가
    confirmI: function confirm(content, options) {
      var opts = {
        titleText: "",
        cancelBtnText: "NO",
		cancelBtnClick: function cancelBtnClick() {},
        sureBtnText: "YES",
        sureBtnClick: function sureBtnClick() {}
      };
      opts = extend(opts, options);

      // var cancelBtn = document.createElement("div");
      // cancelBtn.innerText = opts.cancelBtnText;
      // addClass(cancelBtn, "dialog-cancel-button");

      var cancelBtn = document.createElement("button"); /*  */
      cancelBtn.setAttribute("type", "button"); /*  */
      cancelBtn.innerText = opts.cancelBtnText; /*  */
      addClass(cancelBtn, "dialog-cancel-button");

      // var sureBtn = document.createElement("div");
      // sureBtn.innerText = opts.sureBtnText;
      // addClass(sureBtn, "dialog-sure-button");

      var sureBtn = document.createElement("button"); /*  */
      sureBtn.setAttribute("type", "button"); /*  */
      sureBtn.innerText = opts.sureBtnText;
      addClass(sureBtn, "dialog-sure-button");


      opts.btns = [sureBtn, cancelBtn];
      this.openInfo(content, opts);
    },
    // confirm Danger : 윤성미 추가
    confirmD: function confirm(content, options) {
      var opts = {
        titleText: "",
        cancelBtnText: "NO",
		cancelBtnClick: function cancelBtnClick() {},
        sureBtnText: "YES",
        sureBtnClick: function sureBtnClick() {}
      };
      opts = extend(opts, options);

      // var cancelBtn = document.createElement("div");
      // cancelBtn.innerText = opts.cancelBtnText;
      // addClass(cancelBtn, "dialog-cancel-button");

      var cancelBtn = document.createElement("button"); /*  */
      cancelBtn.setAttribute("type", "button"); /*  */
      cancelBtn.innerText = opts.cancelBtnText; /*  */
      addClass(cancelBtn, "dialog-cancel-button");

      // var sureBtn = document.createElement("div");
      // sureBtn.innerText = opts.sureBtnText;
      // addClass(sureBtn, "dialog-sure-button");

      var sureBtn = document.createElement("button"); /*  */
      sureBtn.setAttribute("type", "button"); /*  */
      sureBtn.innerText = opts.sureBtnText;
      addClass(sureBtn, "dialog-sure-button");


      opts.btns = [sureBtn, cancelBtn];
      this.openDanger(content, opts);
    },
    // confirm Warning : 윤성미 추가
    confirmW: function confirm(content, options) {
      var opts = {
        titleText: "",
        cancelBtnText: "NO",
		cancelBtnClick: function cancelBtnClick() {},
        sureBtnText: "YES",
        sureBtnClick: function sureBtnClick() {}
      };
      opts = extend(opts, options);

      // var cancelBtn = document.createElement("div");
      // cancelBtn.innerText = opts.cancelBtnText;
      // addClass(cancelBtn, "dialog-cancel-button");

      var cancelBtn = document.createElement("button"); /*  */
      cancelBtn.setAttribute("type", "button"); /*  */
      cancelBtn.innerText = opts.cancelBtnText; /*  */
      addClass(cancelBtn, "dialog-cancel-button");

      // var sureBtn = document.createElement("div");
      // sureBtn.innerText = opts.sureBtnText;
      // addClass(sureBtn, "dialog-sure-button");

      var sureBtn = document.createElement("button"); /*  */
      sureBtn.setAttribute("type", "button"); /*  */
      sureBtn.innerText = opts.sureBtnText;
      addClass(sureBtn, "dialog-sure-button");


      opts.btns = [sureBtn, cancelBtn];
      this.openWarning(content, opts);
    },
    open: function open(content, options) {
      var dialog = document.createElement("div");
      var dialogContent = document.createElement("div");
      var closeBtn = document.createElement("button"); /* 20220121 윤성미 추가  */
      closeBtn.setAttribute("type", "button"); /* 20220121 윤성미 추가  */

      addClass(dialog, "dialog-mobile");
      addClass(dialog, "animation-zoom-in");
      addClass(dialogContent, "dialog-content");
      addClass(closeBtn, "dialog-close-button"); /* 20220121 윤성미 추가  */

      dialogContent.innerText = content;

      if (options.titleText) {
        var dialogTitle = document.createElement("div");
        addClass(dialogTitle, "dialog-title");
        dialogTitle.innerText = options.titleText;
        dialog.appendChild(dialogTitle);
      }

      dialog.appendChild(dialogContent);
      dialog.appendChild(closeBtn); /* 20220121 윤성미 추가  */

      options.btns.forEach(function (btn, i) {
        dialog.appendChild(btn);
      });
      options.closeAnimation = "animation-zoom-out";

      layer.initOpen(dialog, options);
    },
    // open Info : 윤성미 추가
    openInfo: function open(content, options) {
      var dialog = document.createElement("div");
      var dialogContent = document.createElement("div");
      var closeBtn = document.createElement("button"); /* 20220121 윤성미 추가  */
      closeBtn.setAttribute("type", "button"); /* 20220121 윤성미 추가  */

      addClass(dialog, "dialog-mobile");
      addClass(dialog, "info");  /* 20220121 윤성미 추가  */
      addClass(dialog, "animation-zoom-in");
      addClass(dialogContent, "dialog-content");
      addClass(closeBtn, "dialog-close-button"); /* 20220121 윤성미 추가  */

      dialogContent.innerText = content;

      if (options.titleText) {
        var dialogTitle = document.createElement("div");
        addClass(dialogTitle, "dialog-title");
        dialogTitle.innerText = options.titleText;
        dialog.appendChild(dialogTitle);
      }

      dialog.appendChild(dialogContent);
      dialog.appendChild(closeBtn); /* 20220121 윤성미 추가  */

      options.btns.forEach(function (btn, i) {
        dialog.appendChild(btn);
      });
      options.closeAnimation = "animation-zoom-out";

      layer.initOpen(dialog, options);
    },
    // open Danger : 윤성미 추가
    openDanger: function open(content, options) {
      var dialog = document.createElement("div");
      var dialogContent = document.createElement("div");
      var closeBtn = document.createElement("button"); /* 20220121 윤성미 추가  */
      closeBtn.setAttribute("type", "button"); /* 20220121 윤성미 추가  */

      addClass(dialog, "dialog-mobile");
      addClass(dialog, "danger");  /* 20220121 윤성미 추가  */
      addClass(dialog, "animation-zoom-in");
      addClass(dialogContent, "dialog-content");
      addClass(closeBtn, "dialog-close-button"); /* 20220121 윤성미 추가  */

      dialogContent.innerText = content;

      if (options.titleText) {
        var dialogTitle = document.createElement("div");
        addClass(dialogTitle, "dialog-title");
        dialogTitle.innerText = options.titleText;
        dialog.appendChild(dialogTitle);
      }

      dialog.appendChild(dialogContent);
      dialog.appendChild(closeBtn); /* 20220121 윤성미 추가  */

      options.btns.forEach(function (btn, i) {
        dialog.appendChild(btn);
      });
      options.closeAnimation = "animation-zoom-out";

      layer.initOpen(dialog, options);
    },
    // open Warning : 윤성미 추가
    openWarning: function open(content, options) {
      var dialog = document.createElement("div");
      var dialogContent = document.createElement("div");
      var closeBtn = document.createElement("button"); /* 20220121 윤성미 추가  */
      closeBtn.setAttribute("type", "button"); /* 20220121 윤성미 추가  */

      addClass(dialog, "dialog-mobile");
      addClass(dialog, "warning");  /* 20220121 윤성미 추가  */
      addClass(dialog, "animation-zoom-in");
      addClass(dialogContent, "dialog-content");
      addClass(closeBtn, "dialog-close-button"); /* 20220121 윤성미 추가  */

      dialogContent.innerText = content;

      if (options.titleText) {
        var dialogTitle = document.createElement("div");
        addClass(dialogTitle, "dialog-title");
        dialogTitle.innerText = options.titleText;
        dialog.appendChild(dialogTitle);
      }

      dialog.appendChild(dialogContent);
      dialog.appendChild(closeBtn); /* 20220121 윤성미 추가  */

      options.btns.forEach(function (btn, i) {
        dialog.appendChild(btn);
      });
      options.closeAnimation = "animation-zoom-out";

      layer.initOpen(dialog, options);
    },
    showBottom: function showBottom(options) {
      var opts = {
        title: "",
        cancelText: "NO",
        btn: ["취소"],
        btnColor: [],
        btnClick: function btnClick(index) {}
      };
      opts = extend(opts, options);
      opts.bottom = true;
      if (opts.btn.length == 1 && opts.btn[0] == "취소") {
        opts.btnColor = ["#EE2C2C"];
      }

      var bottomDialog = document.createElement("div");
      var title = document.createElement("div");
      var dialogItem = document.createElement("div");
      var cancelBtn = document.createElement("div");
      title.innerText = opts.title;
      cancelBtn.innerText = opts.cancelText;
      addClass(bottomDialog, "dialog-mobile-bottom");
      addClass(bottomDialog, "animation-bottom-in");
      addClass(title, "bottom-btn-title");
      addClass(dialogItem, "bottom-btn-item");
      addClass(cancelBtn, "dialog-cancel-btn");
      if (opts.title) {
        bottomDialog.appendChild(title);
      }
      bottomDialog.appendChild(dialogItem);
      bottomDialog.appendChild(cancelBtn);

      opts.btns = [];
      opts.btns.push(cancelBtn);
      opts.btn.forEach(function (b, i) {
        var btn = document.createElement("div");
        btn.innerText = opts.btn[i];
        btn.setAttribute("i", i + 1);
        addClass(btn, "dialog-item-btn");
        if (opts.btnColor[i]) btn.style.color = opts.btnColor[i];
        dialogItem.appendChild(btn);
        opts.btns.push(btn);
      });
      opts.closeAnimation = "animation-bottom-out";
      opts.showBottom = true;

      layer.initOpen(bottomDialog, opts);
    },
    toast: function toast(content, time) {
      time = time || 3;
      var toast = document.createElement("div");
      var toastContent = document.createElement("div");

      addClass(toast, "dialog-mobile-toast");
      addClass(toast, "animation-fade-in");
      addClass(toastContent, "toast-content");

      toastContent.innerText = content;

      toast.appendChild(toastContent);

      var body = document.querySelector("body");
      body.appendChild(toast);

      toast.style.fontSize = getFontSize();
      toast.style.left = (document.documentElement.clientWidth - toast.offsetWidth) / 2 + "px";

      setTimeout(function () {
        body.removeChild(toast);
      }, time * 1000);
    },

    loadElement: [],
    loading: function loading(options) {
      var opts = {
        src: "img",
        hint: ""
      };
      opts = extend(opts, options);

      var loadingBg = document.createElement("div");
      var loading = document.createElement("div");
      var img = document.createElement("img");

      addClass(loadingBg, "mobile-loading-bg");
      addClass(loading, "mobile-loading");
      addClass(loading, "animation-zoom-in");
      img.src = opts.src + "/loading.gif";
      loading.appendChild(img);

      if (opts.hint) {
        var loadingContent = document.createElement("div");
        addClass(loadingContent, "loading-content");
        loadingContent.innerText = opts.hint;
        loading.appendChild(loadingContent);
      }

      var body = document.querySelector("body");
      body.appendChild(loadingBg);
      body.appendChild(loading);

      loading.style.fontSize = getFontSize();
      loading.style.left = (document.documentElement.clientWidth - loading.offsetWidth) / 2 + "px";
      loading.style.top = (document.documentElement.clientHeight - loading.offsetHeight) / 2 + "px";

      this.loadElement.push(loadingBg);
      this.loadElement.push(loading);
    },
    closeLoading: function closeLoading() {
      layer.close(this.loadElement);
      this.loadElement = [];
    }
  };

  // providing better operations in Vue
  mcxDialog.install = function (Vue, options) {
    Vue.prototype.$mcxDialog = mcxDialog;
  };

  return mcxDialog;

}));
