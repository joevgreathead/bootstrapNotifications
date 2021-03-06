(function($){

    var initialized = false,
        init = function() {
            if ($('#bootstrap-notification-bin').length == 0) {
                $('head').append(
                    '<style>' +
                    '#bootstrap-notification-bin {' +
                    '    width: 20%;' +
                    '    position: fixed;' +
                    '    color: #666;' +
                    '    right: 25px;' +
                    '    top: 10px;' +
                    '    z-index: 1000;' +
                    '}' +
                    '#bootstrap-notification-bin > .note {' +
                    '   position: relative;' +
                    '   margin-bottom: 10px;' +
                    '   z-index: 1000;' +
                    '}' +
                    '#bootstrap-notification-bin > .note:hover {' +
                    '   cursor: pointer;' +
                    '   -moz-box-shadow:    inset 0 0 10px #ccc;' +
                    '   -webkit-box-shadow: inset 0 0 10px #ccc;' +
                    '   box-shadow:         inset 0 0 10px #ccc;' +
                    '}' +
                    '</style>'
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
        },
        dismissNote = function(noteObj){
            if(noteObj) {
                noteObj.animate({'opacity': '0.01'}).slideUp(500, function () { $(this).remove() });
            }
        },
        enabled = true,
        consoleOnly = false;

    $(document).delegate('#bootstrap-notification-bin > .note', 'click', function(){
        dismissNote($(this));
    });

    /*
     * success - green
     * info - blue
     * warning - yellow
     * danger - red
     * */
    $.notify = function(text, status, dismissTime){
        if(!enabled){
            return this;
        }
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
        if(consoleOnly){
            if(console && console.log && (typeof console.log === 'function')){
                console.log('|:: notify.js :: -- [', new Date(), '] -- ', text);
            }
            return this;
        }
        var token = makeToken();
        $('#bootstrap-notification-bin').append(
            '<div class="row note alert alert-' + status + ' alert-dismissible" id="' + token + '">' +
            '<div>' +
            text +
            '</div>' +
            '</div>'
        );
        setTimeout(function(){
            dismissNote($('#' + token));
        }, dismissTime);
        return this;
    };
    
    $.notify.disable = function(){
        enabled = false;
    };
    
    $.notify.enable = function(){
        enabled = true;
    };
    
    $.notify.enableConsoleOnly = function(){
        enabled = true;
        consoleOnly = true;
    };
    
    $.notify.disableConsoleOnly = function(){
        enabled = true;
        consoleOnly = true;
    };

})(jQuery);
