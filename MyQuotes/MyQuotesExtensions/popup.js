var header = chrome.i18n.getMessage("extHeader");
var icon = chrome.extension.getURL('32.png')
$("#Quotesheader").attr("src", icon);

var html = '<div id="MyQuotes" class="reset-this MyQuotesform"><div class="reset_this"><img src="' + icon + '" id="QuotesheaderIcon" class="reset-this"/><h3 class="reset-this">' + header + '</h3></div>  <form class="reset-this login-form">  <div class="reset-this"> <textarea placeHolder="Note almak için yazı ekleyiniz..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="reset-this" id="myQuotesText"></textarea></div> <div class="reset-this" id="MyQuotesOwnerWrapper"> <img class="reset-this" id="MyQuotesOwnerLoading" /> <input class="reset-this" placeHolder="yazı için etiket belirle..." type="text" id="MyQuotesOwner" /> </div> <div class="reset-this"> <button class="reset-this" id="MyQuotesSave" type="button">KAYDET</button> <button id="MyQuotesCancel" class="reset-this" type="button">İPTAL</button> </div> <p class="reset-this MyQuotesmessage"></p> </form> </div>';

var load = '<div style="float:left !important;margin:5px;"><img style="width:32px;" src="' + chrome.extension.getURL('loading2.gif') + '" /></div> <div style="float:left !important;margin:10px 0px 0px 0px !important"><p class="reset-this">Kaydediliyor...</p></div> <i style="clear:both"></i>';
var complete = '<div style="float:left !important;margin:5px;"><img style="width:32px;" src="' + chrome.extension.getURL('ok.png') + '" /></div> <div style="float:left !important;margin:10px 0px 0px 0px !important"><p class="reset-this" >kaydedildi.</p></div> <i style="clear:both"></i>';

var error = '<div style="float:left !important;margin:5px;"><img style="width:32px;" src="' + chrome.extension.getURL('error.png') + '" /></div> <div style="float:left !important;margin:10px 0px 0px 0px !important"><p class="reset-this" >Hata :((</p></div> <i style="clear:both"></i>';

$("#MyQuotes").is(function () {
    $(".MyQuotesform").remove();
});

$("html body").append(html);

var loading = chrome.extension.getURL('loading.gif')
var loading2 = chrome.extension.getURL('loading2.gif');

$("#MyQuotesOwnerLoading").hide().attr("src", loading)

//function getCookie(cname) {
//    var name = cname + "=";
//    var ca = document.cookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') {
//            c = c.substring(1);
//        }
//        if (c.indexOf(name) == 0) {
//            return c.substring(name.length, c.length);
//        }
//    }
//    return "";
//}

//var profilId = getCookie("Putnotes").split("=")[1];

var siteUrl = "http://localhost:64481";
var OnlineSiteUrl = "http://www.putnotes.net";
//console.log("profil:" + profilId);
//$("#MyQuotesOwner").autocomplete({
//    source: OnlineSiteUrl + "/api/quotes/GetTagList/" + profilId,
//    minLength: 1,
//    search: function (event, ui) {
//        $('#MyQuotesOwnerLoading').show();
//        console.log("searching");
//    },
//    open: function (event, ui) {
//        $('#MyQuotesOwnerLoading').hide();
//        console.log("open");
//    },
//    close: function (event, ui) {
//        console.log("close");
//        $('#MyQuotesOwnerLoading').hide();
//    },
//    response: function (event, ui) {
//        console.log(ui);
//        $('#MyQuotesOwnerLoading').hide();
//    }
//});

$("#MyQuotesCancel").click(function () {
    console.log("popup remove");
    $(".MyQuotesform").remove();
})

$("#MyQuotesSave").click(function () {
    var tag = $("#MyQuotesOwner").val();
    var note = $("#myQuotesText").val();
    var validation = false;
    if (jQuery.trim(tag).length > 0 && jQuery.trim(tag).length > 0) {
        validation = true;
    };

    if (validation) {
        $("#MyQuotes").css("cssText", "width: 160px !important;").html(load);
        var quites = {
            favorite: false,
            profilId: profilId,
            quoteNote: note,
            tag: tag,
            url: url
        };

        $.ajax({
            url: OnlineSiteUrl + "/api/quotes",
            data: quites,
            method: "POST",
            success: function () {
                console.log("api ajax success");
                $("#MyQuotes").html(complete);
            },
            error: function () {
                $("#MyQuotes").html(error);
            },
            complete: function () {
                setTimeout(function () {
                    $("#MyQuotes").hide();
                    $(".MyQuotesform").remove();
                }, 2000)
            }
        })
    }
    else {
        $(".MyQuotesmessage").show().text("Hoppa ! doldurmak gereken yer var").fadeOut(2000);
    };

    console.log(quites);
})