var html = '<div id="MyQuotes" class="reset-this MyQuotesform"> <h3 class="reset-this">Save to Selected Quotes</h3> <form class="reset-this login-form">  <div class="reset-this"> <textarea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="reset-this" id="myQuotesText"></textarea></div> <div class="reset-this" id="MyQuotesOwnerWrapper"> <img class="reset-this" id="MyQuotesOwnerLoading" /> <input class="reset-this" type="text" id="MyQuotesOwner" /> </div> <div class="reset-this"> <button class="reset-this" id="MyQuotesSave" type="button">Save</button> <button id="MyQuotesCancel" class="reset-this" type="button">Cancel</button> </div> <p class="reset-this MyQuotesmessage">Kaydedildi</p> </form> </div>';

$("#MyQuotes").is(function () {
    $(".MyQuotesform").remove();
});

$("html body").append(html);

var loading = chrome.extension.getURL('loading.gif')

$("#MyQuotesOwnerLoading").hide().attr("src", loading)

$("#MyQuotesOwner").autocomplete({
    source: "http://localhost:64481/api/bos/complete",
    minLength: 1,
    search: function (event, ui) {
        $('#MyQuotesOwnerLoading').show();
        console.log("searching")
    },
    open: function (event, ui) {
        $('#MyQuotesOwnerLoading').hide();
        console.log("searcing close")
    }
});

$("#MyQuotesCancel").click(function () {
    console.log("popup remove");
    $(".MyQuotesform").remove();
})

$("#MyQuotesSave").click(function () {
    console.log("buttona click");
})