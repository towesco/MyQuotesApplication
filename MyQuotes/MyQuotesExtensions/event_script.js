var ID_CONTEXT_MENU_ITEM_HELLO = "ID_CONTEXT_MENU_ITEM_HELLO";

var TYPES_CONTEXT_MENU_ITEM = {
    "NORMAL": "normal",
    "CHECKBOX": "checkbox",
    "RADIO": "radio",
    "SEPARATOR": "separator"
};

var TYPES_CONTEXT = {
    "ALL": "all",
    "PAGE": "page",
    "FRAME": "frame",
    "SELECTION": "selection",
    "LINK": "link",
    "EDITABLE": "editable",
    "IMAGE": "image",
    "LAUNCHER": "launcher",
    "BROWSER_ACTION": "browser_action",
    "PAGE_ACTION": "page_action"
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
                console.log("popup.css yüklendi");
            });

            chrome.tabs.executeScript(null, { file: "jquery.js" }, function () {
                console.log("jquery yüklendi")
            });

            chrome.tabs.executeScript(null, { file: "popup.js", runAt: "document_start", }, function () {
                console.log("popup yüklendi");

                var veri = "'";
                veri += info.selectionText;
                veri += "'";

                var code = 'var text = document.getElementById("myQuotesText");';

                code += "text.value=" + veri;
                console.log(code);
                chrome.tabs.executeScript({ code: code }, function () {
                    console.log("ekleme yapýldý");
                });
            });
        })
    };
})