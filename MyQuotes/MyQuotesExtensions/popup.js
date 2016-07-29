var html = ' <div id="MyQuotes" class="MyQuotesform"> <h4>Save to Selected Quotes</h4> <form class="login-form"> <textarea id="myQuotesText"></textarea>  <button id="MyQuotesSave" type="button">Save</button> <button id="MyQuotesCancel" type="button">Cancel</button> <p class="MyQuotesmessage">Kaydedildi</p> </form> </div>';

$("html body").append(html);

$("#MyQuotesCancel").click(function () {
    console.log("popup silindi");
    $(".MyQuotesform").remove();
})

$("#MyQuotesSave").click(function () {
    console.log("buttona tıklandı");
})