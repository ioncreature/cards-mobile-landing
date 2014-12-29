/**
 * @author Alexander Marenin
 * @date December 2014
 */

$( function(){
    var form = $( 'form' ),
        name = form.find( 'input[name="name"]' ),
        city = form.find( 'input[name="city"]' ),
        email = form.find( 'input[type="email"]' ),
        phone = form.find( 'input[name="phone"]' ),
        model = form.find( 'select[name="model"]' ),
        otherModel = form.find( 'input[name="otherModel"]' ),
        version = form.find( 'input[name="version"]' ),
        imei = form.find( 'input[name="imei"]' ),
        comment = form.find( 'textarea[name="comment"]' ),
        agree = form.find( 'input[name="agree"]' ),
        otherOs = $( '#other-os' ),
        otherOsError = $( '#other-os-error' );

    $( 'input, select, textarea' ).on( 'keyup change', function(){
        removeErrors( name, city, email, phone, model, otherModel, version, imei, comment, agree );
    });

    email.isValid = function(){
        return isEmail( email.val() );
    };

    otherModel.isValid = function(){
        return model.val() === 'other' ? !!otherModel.val() : true;
    };

    version.isValid = function(){
        var val = version.filter( ':checked' ).val();
        return val && val !== 'other';
    };

    version.setError = function(){
        version.focus();
        version.parent().parent().addClass( 'error' );
    };

    version.removeError = function(){
        version.parent().parent().removeClass( 'error' );
    };

    agree.isValid = function(){
        return agree.is(':checked');
    };

    agree.setError = function(){
        agree.parent().addClass( 'error' );
    };

    agree.removeError = function(){
        agree.parent().removeClass( 'error' );
    };

    form.submit( function( event ){
        if ( isValid() ){
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    name: name.val(),
                    model: model.val() === 'other' ? otherModel.val() : model.val(),
                    email: email.val(),
                    phone: phone.val(),
                    version: version.val(),
                    imei: imei.val(),
                    comment: comment.val(),
                    agree: agree.is( ':checked' ) ? agree.val() : '',
                    city: city.val()
                }
            });
            form.hide();
            $( '.thanks' ).show();
            window.parent && window.parent.postMessage( "Пыщ-пыщ", "*" );
        }
        event.preventDefault();
        return false;
    });

    function isValid(){
        removeErrors( name, email, phone, model, otherModel, version, imei, comment, agree );

        return [name, email, phone, model, otherModel, version, imei, comment, agree].every( function( elem ){
            var valid = elem.isValid ? elem.isValid() : !!elem.val();
            if ( valid )
                return true;
            else {
                $( 'p#bottom' ).show();
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
        $( 'p#bottom' ).hide();
        [].slice.call( arguments ).forEach( function( elem ){
            elem.removeClass( 'error' );
            elem.removeError && elem.removeError();
        });
    }

    if ( typeof phones === 'object' ){
        var list = window.phones;
        var options = list.map( function( item ){
            return '<option value="' + item + '">' + item + '</option>';
        }).join( '' );

        model.find( 'option:first-child' ).after( options );
    }

    version.change( function(){
        if ( otherOs.is(':checked') )
            otherOsError.show();
        else
            otherOsError.hide();
    });


    model.change( function(){
        if ( model.val() === 'other' ){
            otherModel.show();
            $( '.for-model' ).hide();
            $( '.for-other-model' ).removeClass( 'hidden' );
            model.addClass( 'sticky' );
        }
        else {
            otherModel.hide();
            $( '.for-model' ).show();
            $( '.for-other-model' ).addClass( 'hidden' );
            model.removeClass( 'sticky' );
        }
    });

    city.kladr({
        token: '54a15f8c7c523999148b4567',
        type: 'city'
    });
});
