var html = '<div id="MyQuotes" class="reset-this MyQuotesform"> <div style="display:block!important" class="reset-this">www.putnotes.net</div> <br /> <div style="color:red;display:block!important" class="reset-this">Giriş Yapılamadı !</div><br/>  <a style="display:block!important" class="reset-this"  href="http://www.putnotes.net">Giriş yapmak için tıklayınız.</a> </div>';

$("#MyQuotes").is(function () {
    $(".MyQuotesform").remove();
});

$("html body").append(html);