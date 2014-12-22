/**
 * @author Alexander Marenin
 * @date December 2014
 */

$( function(){
    var form = $( 'form' ),
        email = form.find( 'input[type="email"]' );

    $( 'input, select, textarea' ).on( 'keyup change', function(){
        removeErrors( email );
    });

    email.isValid = function(){
        return isEmail( email.val() );
    };

    form.submit( function( event ){
        if ( isValid() ){
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    email: email.val()
                }
            });
            form.hide();
            $( '.thanks' ).show();
        }
        event.preventDefault();
        return false;
    });

    function isValid(){
        removeErrors( email );

        return [email].every( function( elem ){
            var valid = elem.isValid ? elem.isValid() : !!elem.val();
            if ( valid )
                return true;
            else {
                if ( elem.setError )
                    elem.setError();
                else
                    setError( elem );
                return false;
            }
        });
    }

    function isEmail( str ){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( typeof str !== 'string' )
            return false;
        else
            return re.test( str );
    }

    function setError( elem ){
        elem.focus();
        elem.addClass( 'error' );
    }

    function removeErrors(){
        [].slice.call( arguments ).forEach( function( elem ){
            elem.removeClass( 'error' );
            elem.removeError && elem.removeError();
        });
    }
});