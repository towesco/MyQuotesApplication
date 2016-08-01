var html = '<div id="MyQuotes" class="reset-this MyQuotesform"> <h3 class="reset-this">MyQuotes.com</h3> <hr /> <h3 style="color:red;" class="reset-this">Giriş Yapılamadı !</h3>  <a style="margin:10px 0px;display:block;" href="#">Giriş yapmak için tıklayınız.</a> </div>';

$("#MyQuotes").is(function () {
    $(".MyQuotesform").remove();
});

$("html body").append(html);