//GNB
function initGNB() {
	var btnGnbAll = $("header#header button.btn_gnb_all");
	var gnb = $("nav#gnb");
	var gDeps1 = gnb.find(">ul>li");
	var gDeps2 = gnb.find(">ul>li>ul>li");
	var gDeps3 = gnb.find(">ul>li>ul>li>ul>li");
	
	$(window).on("load resize orientationchange",function() {
		if($(window).width() > 1798) {
			btnGnbAll.removeClass("on");
			gnb.removeAttr("style")
			gnb.find(">ul").removeAttr("style")
		}
	})
	
	$(window).on("resize orientationchange",function() {
		$("main#container").css({
			"height":$(window).height() - 112+"px"
		})
	})
	$("main#container").css({
		"height":$(window).height() - 112+"px"
	})
	
	btnGnbAll.on("click",function() {
		$(this).prop("disabled",true);
		if($(this).hasClass("on") == false) {
			$(this).addClass("on")
			gnb.find(">ul").show();
			gnb.animate({
				"left": "0px"
			},250,function() {
				btnGnbAll.prop("disabled",false);
			})
		} else if($(this).hasClass("on") == true) {
			gDeps1.find(">a").removeClass("active");
			gDeps1.find(">ul").hide();
			
			gDeps2.find(">a").removeClass("active");
			gDeps2.find(">ul").hide();
			
			$(this).removeClass("on")
			gnb.animate({
				"left": "-75px"
			},250,function() {
				gnb.find(">ul").hide();
				btnGnbAll.prop("disabled",false);
			})
		}
	})
	
	gDeps1.find(">a").on("click",function() {
		if($(this).hasClass("active") == false) {
			gDeps1.find(">a").removeClass("active");
			$(this).addClass("active");
			
			gDeps1.find(">ul").hide();
			if($(window).width() > 1800) {
				$(this).parent().find(">ul").slideDown(200);
			} else {
				$(this).parent().find(">ul").fadeIn(200);
			}
		} else if($(this).hasClass("active") == true) {
			$(this).removeClass("active");
			$(this).parent().find(">ul").hide();
		}
		
		gDeps2.find(">a").removeClass("active");
		gDeps2.find(">ul").hide();
	})
	
	gDeps2.find(">a").on("click",function() {
		if($(this).parent().find(">ul").length > 0) {
			if($(this).hasClass("active") == false) {
				gDeps2.find(">a").removeClass("active");
				$(this).addClass("active");
				
				gDeps2.find(">ul").slideUp(200);
				$(this).parent().find(">ul").slideDown(200);
			} else if($(this).hasClass("active") == true) {
				$(this).removeClass("active");
				$(this).parent().find(">ul").hide();
			}
		} else {
			gDeps1.find(">a").removeClass("active");
			gDeps1.find(">ul").hide();
		}
	})
	
	gDeps3.on("click",function() {
		gDeps1.find(">a").removeClass("active");
		gDeps1.find(">ul").hide();
		
		gDeps2.find(">a").removeClass("active");
		gDeps2.find(">ul").hide();
	})
		
	$("main#container,header#header>h1,#header>#g_utile,#header>button.btn_sitemap").on("click",function() {
		gDeps1.find(">a").removeClass("active");
		gDeps1.find(">ul").hide();
		gDeps2.find(">a").removeClass("active");
		gDeps2.find(">ul").hide();
	})
}

//퀵메뉴
function initQuickMenu() {
	var barQuickMenu = $("nav#g_contents_navi ul.btn_quick_menu")
	var btnQm = barQuickMenu.find("a");
	var quickMenu = $("aside#quick_menu");
	var qmWrap = quickMenu.find(".qm_wrap");
	
	btnQm.on("click",function() {
		if($(this).hasClass("active") == false) {
			btnQm.removeClass("active");
			$(this).addClass("active");
			
			qmWrap.hide();
			$($(this).attr("href")).show();
			
			if(quickMenu.hasClass("active") == false) {
				quickMenu.animate({
					"left":"0px"
				},200,function() {
					quickMenu.addClass("active");
				})
			}
			
		} else if($(this).hasClass("active") == true) {
			$(this).removeClass("active");
			
			quickMenu.animate({
				"left":"-230px"
			},200,function() {
				quickMenu.removeClass("active");
				qmWrap.hide();
			})
		}
		return false;
	})
}

//사이트맵
function initSitemap() {
	var btnSitmap = $("header#header button.btn_sitemap");
	var sitemap = $("nav#sitemap");
	var sDeps1 = sitemap.find(">ul>li");
	var sDeps2 = sitemap.find(">ul>li>ul>li");
	var sDeps3 = sitemap.find(">ul>li>ul>li>ul>li");
	var btnClse = sitemap.find("button.btn_close");
	
	btnSitmap.on("click",function() {
		sitemap.fadeIn(300)
	})
	
	sDeps1.on("mouseleave",function() {
		sDeps2.find(">a").removeClass("active");
		sDeps2.find(">ul").slideUp();
	})
	
	
	sDeps2.find(">a").on("click",function() {
		if($(this).parent().find(">ul").length > 0) {
			if($(this).hasClass("active") == false) {
				sDeps2.find(">a").removeClass("active");
				$(this).addClass("active");
				
				sDeps2.find(">ul").slideUp(200);
				$(this).parent().find(">ul").slideDown(200);
			} else if($(this).hasClass("active") == true) {
				$(this).removeClass("active");
				$(this).parent().find(">ul").slideUp(200);
			}
		} else {
			sitemap.hide()
		}
	})
	
	sDeps3.on("click",function() {sitemap.hide()})
	btnClse.on("click",function() {sitemap.fadeOut(300)})
}

//컨텐츠 텝 스크롤
function initCurrentOpenTabScroll() {
	var gContentsNavi = $("#g_contents_navi");
	var currentOpenTab = gContentsNavi.find("ul.current_open_tab");
	var cotItem = currentOpenTab.find(">li");
	var btnCotSet = gContentsNavi.find(".btn_cot_set");
	var btnPrev = btnCotSet.find("button.btn_prev");
	var btnNext = btnCotSet.find("button.btn_next");
	
	//console.log(currentOpenTab.find(">li>a.active").parent().index()+1)
	
	$(window).on("load resize orientationchange",function() {
		if(currentOpenTab.width() < (cotItem.width()+5)*cotItem.length) {
			btnCotSet.show();
			
			if(currentOpenTab.width() < (cotItem.width()+5)*(currentOpenTab.find(">li>a.active").parent().index()+1)) {
				currentOpenTab.animate({
					"scrollLeft": (((cotItem.width()+5)*(currentOpenTab.find(">li>a.active").parent().index()+1))-currentOpenTab.width())
				})
			}
			
		} else {
			btnCotSet.hide();
		}
	})
	$(window).resize();
	
	btnNext.on("click",function() {
		btnNext.prop("disabled",true);
		currentOpenTab.animate({
			"scrollLeft": "+="+(cotItem.width()+5)
		},300,function() {
			btnNext.prop("disabled",false);
		})
	})
	
	btnPrev.on("click",function() {
		btnPrev.prop("disabled",true);
		currentOpenTab.animate({
			"scrollLeft": "-="+(cotItem.width()+5)
		},300,function() {
			btnPrev.prop("disabled",false);
		})
	})
}

//퀵툴바
function openCloselayerToolbar(tBtn) {
	var btnOpenClose = $(tBtn);
	var layerToolbar = btnOpenClose.parent();
	var ltList = layerToolbar.find(">ul");
	var ltItem = ltList.find(">li");
	
	ltItem.each(function(i) {
		ltItem.eq(i).find("button").off().on("click",function() {
			btnOpenClose.click();
		})
	})
	
	if(btnOpenClose.hasClass("active") == false) {
		btnOpenClose.addClass("active")
		ltList.show();
		layerToolbar.animate({
			"right":"0px"
		},200)
	} else if(btnOpenClose.hasClass("active") == true) {
		btnOpenClose.removeClass("active")
		layerToolbar.animate({
			"right":"-160px"
		},200,function() {
			ltList.hide();
		})
	}
}

//Show Tab Contents
function showTabContent(tLink) {
	var currentOpentab = $("nav#g_contents_navi ul.current_open_tab");
	var cotItem = currentOpentab.find("li");
	var tLink = $(tLink);
	var tContId = tLink.attr("href");
	var contents = $("main#container article.content");
	
	cotItem.find("a").removeClass("active");
	tLink.addClass("active");
	
	contents.hide();
	$(tContId).show();
}

//컨텐츠 내부 텝
function innerTabNavi(groupName) {
	var tabNavi = $(".inner_tabnavi ul");
	var tnItem = tabNavi.find("li");
	var tabGroupName = groupName;
	var tabCont;
	
	tnItem.find("a").on("click",function() {
		tabGroupName = $(this).parents(".inner_tabnavi").attr("data-inner-tabnavi");
		//console.log(tabGroupName)
		tabCont = $('[data-inner-tabcont="'+tabGroupName+'"]');
		tabCont.hide();
		
		$(this).parents("ul").find("li>a").removeClass("active");
		$(this).addClass("active")
		
		tContId = $(this).attr("href");
		$(tContId).show();
		
		if(tabGroupName == "check_out" && $(this).parents("article.content").find(".layer_toolbar button.lt_open_close").hasClass("active") == true) {
			$(this).parents("article.content").find(".layer_toolbar button.lt_open_close").click();
		}
		
		return false;
	})
}

//Input Keyword Drop Box
function keywordDropbox(tInput,event) {
	//console.log(event.keyCode)
	
	var kdInput = $(tInput);
	var kdList = kdInput.parent().find("span.kd_list");
	var kdItem = kdList.find("b");
	var kdIdx = -1;
	
	if(event.keyCode == 9) {
		kdList.hide()
		return false;
	} else {
		kdList.show()
	}
	
	kdItem.find("a").on("click",function(e) {
		e.stopPropagation();
	})
	
	$("html,body").on("click",function() {
		kdList.hide()
	})
}

//레이어 팝업 열기
function openLayerPopup(popupID,tBtn) {
	var container = $("#container");
	var tBtn = $(tBtn);
	var targetPopup = $(popupID);
	var tpZIndex;
	var allLayerPopup = targetPopup.parent().find(".layer_popup");
	var btnClose = targetPopup.find(">button.lp_close");
	var bgModal = $(popupID).parent().find(".bg_modal");
	var modalZIndex = parseInt(bgModal.css("zIndex"));
	var orgScrollTop = $(window).scrollTop();
	var tpWidth;
	var tpHeight;

	if(targetPopup.parent().find(".layer_toolbar button.lt_open_close").hasClass("active") == true) {
		targetPopup.parent().find(".layer_toolbar button.lt_open_close").click();
	}
	$("body").css({
		"overflow":"hidden"
	})
	window.addEventListener("scroll touchmove mousewheel", function(event) { event.preventDefault(); }, {passive: false});
	
	
	modalZIndex = modalZIndex+2
	tpZIndex = modalZIndex+1
	
	targetPopup.css({"zIndex": tpZIndex})
	bgModal.css({"zIndex": modalZIndex})
	

	bgModal.fadeIn(200)

	targetPopup.show();
	tpWidth = targetPopup.width();
	tpHeight = targetPopup.height();
	targetPopup.css({
		"top": Math.round((targetPopup.parent().outerHeight()-tpHeight)/2)+"px",
		"left": Math.round((targetPopup.parent().outerWidth()-tpWidth)/2)+"px"
	})
	
	targetPopup.animate({
		"opacity":1
	},300,function() {
		targetPopup.draggable({
			handle: targetPopup.find(">h2")
		});
	})
}

//레이어 팝업 닫기
function closeLayerPopup(popupID,tBtn) {
	var targetPopup = $(popupID);
	var allLayerPopup = targetPopup.parent().find(".layer_popup");
	var bgModal = $(popupID).parent().find(".bg_modal");
	var orgModalZIndex = 97
	//console.log(orgScrollTop)
	
	document.getSelection().removeAllRanges()
	targetPopup.animate({
		"opacity": 0
	},200,function() {
		targetPopup.removeAttr("style")
		
	});
	
	if(parseInt(bgModal.css("zIndex")) == orgModalZIndex) {
		bgModal.fadeOut(300,function() {
			$("body").css({
				"overflow":""
			})
			bgModal.removeAttr("style")
		})
	} else if(parseInt(bgModal.css("zIndex")) > orgModalZIndex) {
		bgModal.css({zIndex: parseInt(bgModal.css("zIndex"))-2})
	}
}

//확장 테이블
function expensionTable(tableId,tBtn) {
	var searchResult = $("section.search_result");
	var srTit = searchResult.find(".sr_tit");
	var btnExpansion = srTit.find("button.btn_expansion")
	var srCont = searchResult.find(".sr_cont");
	var scrollTable = srCont.find(".scroll_table");
	var tBtn = $(tBtn);
	var expTable = $(tableId);
	var orgHeight = expTable.attr("data-org-height");
	var expHeight = expTable.attr("data-exp-height");
	
	if(tBtn.hasClass("active") == false) {
		scrollTable.each(function(i) {
			scrollTable.eq(i).css({
				"height":scrollTable.eq(i).attr("data-org-height")+"px"
			})
		})
		btnExpansion.removeClass("active");
		tBtn.addClass("active");
		expTable.css({
			"height": expHeight+"px"
		})
		expTable.parent().css({
			"marginBottom": "0px"
		})
		
		if(tBtn.hasClass("reverse") == true) {
			expTable.parents(".sr_cont").prev().prevAll().css({
				"display": "none",
				"marginBottom": ""
			});
		} else {
			expTable.parents(".sr_cont").nextAll().css({
				"display": "none",
				"marginBottom": ""
			});
		}
	} else if(tBtn.hasClass("active") == true) {
		tBtn.removeClass("active");
		expTable.css({
			"height": orgHeight+"px"
		})
		expTable.parents(".sr_cont").css({
			"marginBottom": ""
		})
		if(tBtn.hasClass("reverse") == true) {
			expTable.parents(".sr_cont").prev().prevAll().show();
		} else {
			expTable.parents(".sr_cont").nextAll().show();
		}
	}
}

//컨텐츠 내부 상세 검색
function innerSearchDetail(tBtn) {
	var tBtn = $(tBtn);
	var isdWrap = tBtn.parents(".isd_wrap");
	var btnSearch = isdWrap.find(".btn_isd_set button.btn_search");
	
	if(isdWrap.hasClass("active") == false) {
		isdWrap.addClass("active")
	} else if(isdWrap.hasClass("active") == true) {
		isdWrap.removeClass("active")
	}
	
	btnSearch.on("click",function() {
		isdWrap.removeClass("active")
	})
}

//멀티 셀렉트 박스 UI
function multiSelectBoxUI(tBtn) {
	var tBtn = $(tBtn);
	var btnValue = tBtn.find("span.value")
	var valKeyword = new Array();
	var valTxt;
	var multiSelectListWrap = tBtn.next(".ms_list_wrap");
	var multiSelectList = multiSelectListWrap.find(".ms_list");
	var msItem = multiSelectList.find("label");
	var btnSet = multiSelectListWrap.find("span.btn_set");
	var btnCancel = btnSet.find("button.btn_cancel");
	var btnApply = btnSet.find("button.btn_apply");
	
	if(tBtn.parent().hasClass("active") == false) {
		$("span.multi_select").removeClass("active");
		tBtn.parent().addClass("active")
	} else if(tBtn.parent().hasClass("active") == true) {
		tBtn.parent().removeClass("active")
	}
	
	multiSelectList.on("click",function(e) {
		e.stopPropagation();
	})
	
	msItem.find("input[type='checkbox']").on("click",function() {
		if($(this).is(":checked") == true) {
			tIdx = $(this).parent().index()
		}
	})
	
	btnApply.on("click",function() {
		valKeyword = []
		btnValue.empty();
		msItem.find("input:checked").each(function(i) {
			//console.log($(this).parent().text())
			valKeyword.push(" "+$(this).parent().text())
		})
		btnValue.append(valKeyword.toString())
	})
	
	$("html,body").on("click",function() {
		if(tBtn.parent().hasClass("active") == true) {
			tBtn.parent().removeClass("active")
		}
	})
}

//멀티 셀렉트 키워드 스크롤 인터렉션
function scrollMultiSelected(smBox) {
	var smBox = smBox;
	var smList = smBox.find(">ul");
	var smItem = smList.find(">li");
	var btnSmUp = smBox.find(".btn_ms_set button.up");
	var btnSmDown = smBox.find(".btn_ms_set button.down");
	
	//기본 스크롤 막기
	/* smList.on("scroll touchmove mousewheel",function(e) {
		if($(this).hasClass("double") == false) {
			e.preventDefault();
		}
	}) */
	
	//스크롤 업
	btnSmUp.on("click",function() {
		smList.animate({
			"scrollTop":"-="+(smItem.outerHeight()+4)
		},200)
	})
	
	//스크롤 다운
	btnSmDown.on("click",function() {
		smList.animate({
			"scrollTop":"+="+(smItem.outerHeight()+4)
		},200)
	})
}

//메뉴 권한 설정
function selectAuthorityMenu() {
	var asSelectMenu = $(".as_select_menu ul");
	var smItem = asSelectMenu.find("li")
	
	smItem.find("a").on("click",function() {
		if($(this).parent().find(">ul").length > 0) {
			if($(this).hasClass("on") == false) {
				$(this).addClass("on")
				$(this).parent().find(">ul").slideUp(200);
			} else if($(this).hasClass("on") == true) {
				$(this).removeClass("on")
				$(this).parent().find(">ul").slideDown(200);
			}
		}
	})
}

//Expension Checkout Bill Detail
function expensionCheckoutBillDetail(tBtn) {
	var tBtn = $(tBtn);
	var checkoutDetailSearch = $("section.search_result.checkout_detail_search")
	var checkoutSummary = $("section.search_filter.checkout_summary")
	var checkoutBillDetail = $("section.search_result.checkout_bill_detail")
	
	if(tBtn.hasClass("active") == false) {
		$(tBtn).addClass("active");
		checkoutDetailSearch.find(".inner_search_detail,.scroll_table").hide();
		checkoutSummary.find(".sf_form").hide();
		checkoutBillDetail.find(".scroll_table").css({
			"height": checkoutBillDetail.find(".scroll_table").attr("data-exp-height")+"px"
		})
	} else if(tBtn.hasClass("active") == true) {
		$(tBtn).removeClass("active");
		checkoutDetailSearch.find(".inner_search_detail,.scroll_table").show();
		checkoutSummary.find(".sf_form").show();
		checkoutBillDetail.find(".scroll_table").css({
			"height": checkoutBillDetail.find(".scroll_table").attr("data-org-height")+"px"
		})
	}
	
	checkoutDetailSearch.find(".inner_search_filter, .inner_tabnavi a").on("click",function() {
		if(tBtn.hasClass("active") == true) {
			$(tBtn).removeClass("active");
			checkoutDetailSearch.find(".inner_search_detail,.scroll_table").show();
			checkoutSummary.find(".sf_form").show();
			checkoutBillDetail.find(".scroll_table").css({
				"height": checkoutBillDetail.find(".scroll_table").attr("data-org-height")+"px"
			})
		}
	})
	checkoutSummary.find(".s_edit_set .btn_set button").on("click",function() {
		if(tBtn.hasClass("active") == true) {
			$(tBtn).removeClass("active");
			checkoutDetailSearch.find(".inner_search_detail,.scroll_table").show();
			checkoutSummary.find(".sf_form").show();
			checkoutBillDetail.find(".scroll_table").css({
				"height": checkoutBillDetail.find(".scroll_table").attr("data-org-height")+"px"
			})
		}
	})
}

//Room Status Extention List 
function rsExtentionList(tBtn) {
	var tBtn = $(tBtn);
	var extentionList = tBtn.parents(".rs_extention_list");
	
	if(tBtn.hasClass("active") == false) {
		$(".inner_search_filter.room_status_sorting .rs_extention_list").removeClass("active");
		$(".inner_search_filter.room_status_sorting button.btn_extention").removeClass("active");
		
		tBtn.addClass("active")
		extentionList.addClass("active")
	} else if(tBtn.hasClass("active") == true) {
		tBtn.removeClass("active")
		extentionList.removeClass("active")
	}
}

//Room Status Edit Menu
function roomStatusEditMenu(tItem) {
	var tItem = $(tItem);
	var tiTop = tItem.position().top;
	var tiLeft = tItem.position().left;
	var roomStatus = $(".room_status");
	var roomList = roomStatus.find(".room_list");
	var roomEditMenu = roomStatus.find(".room_edit_menu");
	
	console.log(roomStatus.height()+" , "+parseInt(tItem.offset().top))
	
	if(tItem.hasClass("active") == false) {
		roomList.find("ul li").removeClass("active");
		roomEditMenu.css({
			"display": "none",
			"top": "",
			"left": ""
		});
		roomEditMenu.find("a").removeClass("active")
		roomEditMenu.removeClass("reverse")
		
		if(roomStatus.height() < parseInt(tItem.offset().top)) {
			roomEditMenu.addClass("end_pos")
			roomEditMenu.css({
				"marginTop": "-"+parseInt(roomEditMenu.outerHeight()-tItem.outerHeight())+"px"
			})
		} else if(roomStatus.height() >= parseInt(tItem.offset().top)) {
			roomEditMenu.removeClass("end_pos")
			roomEditMenu.css({
				"marginTop": ""
			})
		}
		
		if(parseInt(roomList.width())-tiLeft < 200) {
			roomEditMenu.addClass("reverse")
			roomEditMenu.css({
				"top": (tiTop+7)+roomStatus.scrollTop()+"px",
				"left": (tiLeft-roomEditMenu.width())+"px"
			});
		} else {
			roomEditMenu.css({
				"top": (tiTop+7)+roomStatus.scrollTop()+"px",
				"left": (tiLeft+tItem.width())+"px"
			});
		}
		tItem.addClass("active");
		roomEditMenu.show();
	} else if(tItem.hasClass("active") == true) {
		tItem.removeClass("active");
		roomEditMenu.css({
			"display": "none",
			"top": "",
			"left": ""
		});
		roomEditMenu.find("a").removeClass("active")
		roomEditMenu.removeClass("reverse")
	}
	
	roomEditMenu.find(">ul>li>a").on("mouseenter",function(e) {
		roomEditMenu.find("ul>li>a").removeClass("active");
		$(this).addClass("active");
		
		e.stopPropagation();
	})
	
	roomList.on("mouseenter",function() {
		if(tItem.hasClass("active") == true) {
			tItem.removeClass("active");
			roomEditMenu.css({
				"display": "none",
				"top": "",
				"left": ""
			});
			roomEditMenu.find("button").removeClass("active")
			roomEditMenu.removeClass("reverse")
		}
	})
	roomStatus.on("mouseleave",function() {
		if(tItem.hasClass("active") == true) {
			tItem.removeClass("active");
			roomEditMenu.css({
				"display": "none",
				"top": "",
				"left": ""
			});
			roomEditMenu.find("button").removeClass("active")
			roomEditMenu.removeClass("reverse")
		}
	})
}


//Zoom Room Status List
function zoomRoomStatusList(scaleIs) {
	var roomStatus = $(".room_status");
	var rsInfo = roomStatus.find("td.rs_info");
	var rsKiosk = roomStatus.find("tr.kiosk, td.rs_info p.kiosk");
	var rsCP = roomStatus.find("tr.cp, td.rs_info p.cp");
	
	if(scaleIs == "minus") {
		rsInfo.attr("rowspan",2)
		rsKiosk.hide();
		rsCP.hide();
	} else if(scaleIs == "plus") {
		rsInfo.attr("rowspan",4)
		rsKiosk.show();
		rsCP.show();
		
	}
}

//Check Radio TR
function checkRadioTR(tTR) {
	var tTR = $(tTR);
	var checkRadioBtn = tTR.find(">.check_radio input");
	
	if(checkRadioBtn.attr("type") == "checkbox" && checkRadioBtn.is(":checked") == false) {
		checkRadioBtn.prop("checked",true)
	} else if(checkRadioBtn.attr("type") == "checkbox" && checkRadioBtn.is(":checked") == true) {
		checkRadioBtn.prop("checked",false)
	}
	
	if(checkRadioBtn.attr("type") == "radio") {
		checkRadioBtn.prop("checked",true)
	}
}

$(document).ready(function() {
	initGNB();
	initSitemap() //사이트맵
	initQuickMenu(); //퀵메뉴
})