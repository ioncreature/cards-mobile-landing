/**
 * @author Alexander Marenin
 * @date November 2014
 */

$( function(){
    //if ( localStorage.sent )
    //    showSocial();

    $( 'form' ).submit( function(){
        if ( isValid() ){
            localStorage.sent = 'yo';
            showSocial();
            $.ajax({
                url: '/download/',
                type: 'POST',
                data: {
                    model: $( 'input[name="model"]' ).val(),
                    email: $( 'input[name="email"]' ).val()
                }
            }).done( function(){
                console.log( 'its done!', arguments );
            });
        }
        return false;
    });

    var instructions = $( 'a.instructions' );
    instructions.click( function(){
        var instr = $( '#instructions' );
        if ( instr.is(':visible') ){
            instr.hide();
            instructions.removeClass( 'expanded' );
        }
        else {
            instr.show();
            instructions.addClass( 'expanded' );
        }
    });

    function isValid(){
        return true;
    }

    function showSocial(){
        $( '.row.thanks' ).show();
        $( '.row.desktop, .row.mobile' ).hide();
    }
});