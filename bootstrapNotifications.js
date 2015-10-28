(function($){

    var initialized = false,
        init = function() {
            if ($('#bootstrap-notification-bin').length == 0) {
                $('head').append(
                    '<style>' +
                    '#bootstrap-notification-bin {' +
                    '    width: 20%;' +
                    '    position: absolute;' +
                    '    color: #666;' +
                    '    right: 25px;' +
                    '    top: 10px;' +
                    '}' +
                    '#bootstrap-notification-bin > .note {' +
                    '   position: relative;' +
                    '   margin-bottom: 10px;' +
                    '   z-index: 1000;' +
                    '}' +
                    '</style>' +
                    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"' +
                    'integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ=="' +
                    'crossorigin="anonymous">'
                );
                $('body').prepend('<div id="bootstrap-notification-bin"></div>');
            }
            initialized = true;
        },
        makeToken = function(n){
            if(!n){
                n = 10;
            }
            var text = '',
                possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for(var i=0; i < n; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

    /*
     * success - green
     * info - blue
     * warning - yellow
     * danger - red
     * */
    $.notify = function(text, status, dismissTime){
        if(!initialized){
            init();
        }
        if(!text){
            text = 'Boop.';
        }
        if(!status){
            status = 'success';
        }
        if(!dismissTime){
            dismissTime = 5000;
        }
        var token = makeToken();
        $('#bootstrap-notification-bin').append(
            '<div class="row note alert alert-' + status + ' alert-dismissible" id="' + token + '">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '<div>' +
            text +
            '</div>' +
            '</div>'
        );
        setTimeout(function(){
            $('#' + token).animate({'opacity': '0.01'}).slideUp(500, function(){ $(this).remove() });
        }, dismissTime);
        return this;
    };

})(jQuery);