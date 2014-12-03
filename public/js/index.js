/**
 * @author Alexander Marenin
 * @date November 2014
 */

$( function(){
    console.log( 'Hi man!' );

    if ( localStorage.sent )
        showSocial();

    $( 'form' ).submit( function(){
        if ( isValid() ){
            localStorage.sent = 'yo';
            showSocial();
            $.ajax({
                url: '/',
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

    function isValid(){
        return true;
    }

    function showSocial(){
        $( '.row.thanks' ).show();
        $( '.row.desktop, .row.mobile' ).hide();
    }
});