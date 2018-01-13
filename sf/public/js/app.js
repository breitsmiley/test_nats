$(function () {

    if ($('div.pub-container').length) {

        console.log('div.pub-container');

        var $form = $("form");
        var $msgLog = $("#msgLog");
        var $msgInput= $("#msg");
        var num =  0;

        $form.submit(function(e){
            e.preventDefault();
            e.stopPropagation();

            var date = new Date();
            var msg =  $msgInput.val();

            if (msg != '') {
                $.ajax({
                    type: 'POST',
                    url: '/ajax/pub',
                    data: {
                        msg: msg,
                        num: num
                    }
                }).done(function (data) {
                    $msgLog.prepend($('<li>').html('[SF] #' + num  + ' : ' + '"<b>' + msg + '</b>" - ' + date.toLocaleTimeString()));

                    // $msgInput.val('');
                    num++;

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log('Ajax throw error', errorThrown);
                });
            }
        });
    }


    // if ($('div.sub-container').length) {
    //
    //     var $msgLog = $("#msgLog");
    //
    //     (function poll() {
    //         setTimeout(function() {
    //             $.ajax({
    //                 type: 'POST',
    //                 dataType: "json",
    //                 url: '/ajax/sub',
    //                 data: {},
    //                 success: function(data) {
    //                     if (data.msg == '') {
    //                         return;
    //                     }
    //                     var date = new Date();
    //                     $msgLog.prepend($('<li>').html('<b>' + data.msg + '</b>  - ' + date.toLocaleTimeString()));
    //                 },
    //                 complete: poll
    //             });
    //         }, 3000);
    //     })();
    //
    //     // setInterval(function () {
    //     //     $.ajax({
    //     //         type: 'POST',
    //     //         url: '/ajax/sub',
    //     //         data: {}
    //     //     }).done(function (data) {
    //     //
    //     //         if (data.msg == '') {
    //     //             return;
    //     //         }
    //     //         var date = new Date();
    //     //         $msgLog.prepend($('<li>').html('<b>' + data.msg + '</b>  - ' + date.toLocaleTimeString()));
    //     //     }).fail(function (jqXHR, textStatus, errorThrown) {
    //     //         console.log('Ajax throw error', errorThrown);
    //     //     });
    //     // }, 2000);
    // }

});