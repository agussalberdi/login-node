$(document).ready(function(){
    $(".redactar").click(function(){
        $("#nuevo").css("display","flex");
    });

    $(function() {
        $('#texto').froalaEditor({toolbarInline: false, width: 750, height: 200})
    });
});