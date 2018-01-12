$(function () {

    if ($('div.pub-container').length) {

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
                    $msgLog.prepend($('<li>').html('#' + num + ' : ' + '<b>' + msg + '</b>  - ' + date.toLocaleTimeString()));
                    // $msgInput.val('');
                    num++;

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                });
            }
        });
    }


    if ($('div.sub-container').length) {

        var $msgLog = $("#msgLog");
        
        var socket = io();
        // $('form').submit(function(){
        //     socket.emit('message1', $('#m').val());
        //     $('#m').val('');
        //     return false;
        // });
        var date = new Date();
        socket.on('message1', function(msg){
            $('#messages').prepend($('<li>').html('<b>' + msg + '</b>  - ' + date.toLocaleTimeString()));
            // window.scrollTo(0, document.body.scrollHeight);
        });



        // var $form = $("form");
        // var $msgLog = $("#msgLog");
        // var $msgInput= $("#msg");
        // var num =  0;
        //
        // $form.submit(function(e){
        //     e.preventDefault();
        //     e.stopPropagation();
        //
        //     var date = new Date();
        //     var msg =  $msgInput.val();
        //
        //     if (msg != '') {
        //         $.ajax({
        //             type: 'POST',
        //             url: '/ajax/pub',
        //             data: {
        //                 msg: msg,
        //                 num: num
        //             }
        //         }).done(function (data) {
        //             $msgLog.prepend($('<li>').html('#' + num + ' : ' + '<b>' + msg + '</b>  - ' + date.toLocaleTimeString()));
        //             // $msgInput.val('');
        //             num++;
        //
        //         }).fail(function (jqXHR, textStatus, errorThrown) {
        //             alert(errorThrown);
        //         });
        //     }
        // });
    }

});