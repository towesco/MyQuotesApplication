var ID_CONTEXT_MENU_ITEM_HELLO = "ID_CONTEXT_MENU_ITEM_HELLO";
var UserId = null;
var TYPES_CONTEXT_MENU_ITEM = {
    "NORMAL": "normal"
};

var TYPES_CONTEXT = {
    "SELECTION": "selection"
};

var createProperties = {
    "type": TYPES_CONTEXT_MENU_ITEM.NORMAL,
    "id": ID_CONTEXT_MENU_ITEM_HELLO,
    "title": chrome.i18n.getMessage("extName"),
    "contexts": [TYPES_CONTEXT.SELECTION],
    "targetUrlPatterns": []
}

var cookie = {
    url: "http://www.putnotes.net",
    name: "Putnotes"
};

function Success(info, profilId) {
    chrome.tabs.insertCSS(null, { file: "popup.css" }, function () {
        console.log("popup.css load");
    });

    chrome.tabs.insertCSS(null, { file: "jquery-ui.min.css" }, function () {
        console.log("ui.css load");
    });

    chrome.tabs.executeScript(null, { file: "jquery.js" }, function () {
        console.log("jquery.js load")
    });

    chrome.tabs.executeScript(null, { file: "jquery-ui.min.js" }, function () {
        console.log("jquery-ui.js load")
    });

    chrome.tabs.executeScript(null, { file: "popup.js", runAt: "document_start", }, function () {
        console.log("popup.js laod");

        var veri = "'";
        veri += info.selectionText.replace(/['"]+/g, '');
        veri += "'";

        var id = "'" + profilId + "'";

        var url = "'" + info.pageUrl + "'";

        var code = 'var text = document.getElementById("myQuotesText"); profilId=' + id + ';' + "url=" + url + ";";

        code += "text.value=" + veri;
        console.log(code);
        chrome.tabs.executeScript({ code: code }, function () {
            chrome.tabs.executeScript(null, { file: "auto.js", runAt: "document_start", }, function () { });
        });
    });
}

function Fail() {
    console.log("GÝRÝÞ YAPILMADI")
    chrome.tabs.insertCSS(null, { file: "popup.css" }, function () {
        console.log("popup.css load");
    });
    chrome.tabs.executeScript(null, { file: "jquery.js" }, function () {
        console.log("jquery.js load")
    });
    chrome.tabs.executeScript(null, { file: "fail.js" }, function () {
        console.log("fail.js load");
    });
}

chrome.browserAction.onClicked.addListener(function () {
    var tabObject = {
        url: "http://www.putnotes.net"
    }
    chrome.tabs.create(tabObject, function (tab) {
        console.log("geldi");
    })
})

chrome.contextMenus.create(createProperties, function () {
    if (!chrome.runtime.lastError) {
        chrome.contextMenus.onClicked.addListener(function (info, tab) {
            console.log(info);

            if (info.pageUrl.indexOf("https") > -1) {
                alert("Maalesef bu sayfa not almaya izin vermemektedir.")
            }
            else {
                chrome.cookies.get(cookie, function (c) {
                    console.log(c);
                    if (c != null) {
                        var id = c.value.split("=")[1];

                        if (id != null) {
                            Success(info, id);
                        }
                        else {
                            Fail();
                        }
                    }
                    else {
                        Fail();
                    }
                });
            }
        })
    };
})