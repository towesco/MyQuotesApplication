var ID_CONTEXT_MENU_ITEM_HELLO = "ID_CONTEXT_MENU_ITEM_HELLO";

var TYPES_CONTEXT_MENU_ITEM = {
    "NORMAL": "normal"
};

var TYPES_CONTEXT = {
    "SELECTION": "selection"
};

var createProperties = {
    "type": TYPES_CONTEXT_MENU_ITEM.NORMAL,
    "id": ID_CONTEXT_MENU_ITEM_HELLO,
    "title": "Save to Quotes",
    "contexts": [TYPES_CONTEXT.SELECTION],
    "targetUrlPatterns": []
}

chrome.contextMenus.create(createProperties, function () {
    if (!chrome.runtime.lastError) {
        chrome.contextMenus.onClicked.addListener(function (info, tab) {
            console.log("týklandý");

            console.log("id: %s,selection: %s,url: %s", info.menuItemId, info.selectionText, tab.url)

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

                var code = 'var text = document.getElementById("myQuotesText");';

                code += "text.value=" + veri;
                console.log(code);
                chrome.tabs.executeScript({ code: code }, function () {
                });
            });
        })
    };
})