/**
 * @author Alexander Marenin
 * @date November 2014
 */

$( function(){
    //if ( localStorage.sent )
    //    showSocial();

    $( 'form' ).submit( function( event ){
        if ( isValid(this) ){
            localStorage.sent = 'yo';
            showSocial();
            $.ajax({
                url: '/download/',
                type: 'POST',
                data: {
                    vendor: $( 'select[name="vendor"]' ).val(),
                    model: $( 'select[name="model"]' ).val(),
                    email: $( 'input[name="email"]' ).val()
                }
            }).done( function(){
                console.log( 'its done!', arguments );
            });
        }
        event.preventDefault();
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

    function isValid( elem ){
        var form = $( elem ),
            emailElem = form.find( 'input[type="email"]' ),
            email = emailElem.val(),
            modelElem = form.find( 'input[name="model"]' );

        modelElem.removeClass( 'error' );
        emailElem.removeClass( 'error' );

        if ( modelElem.length )
            if ( !modelElem.val() ){
                modelElem.focus();
                modelElem.addClass( 'error' );
                return false;
            }

        if ( !email || !isEmail(email) ){
            emailElem.focus();
            emailElem.addClass( 'error' );
            return false;
        }

        return true;
    }

    function isEmail( str ){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( typeof str !== 'string' )
            return false;
        else
            return re.test( str );
    }

    function showSocial(){
        $( '.row.thanks' ).show();
        $( '.row.desktop, .row.mobile, form#desktop' ).hide();
    }


    if ( typeof phones === 'object' ){
        var data = window.phones,
            vendorSelect = $( 'select[name="vendor"]' ),
            modelSelect = $( 'select[name="model"]' );

        vendorSelect.change( function(){
            var vendor = vendorSelect.val();
            if ( vendor )
                fillSelect( modelSelect, data[vendor] );
        });

        fillSelect( vendorSelect, Object.keys(data) );
        vendorSelect.val( 'Apple' );
        vendorSelect.change();
        modelSelect.val( 'iPhone 6' );
    }


    function fillSelect( select, list ){
        var html = list.map( function( str ){
            return '<option value="' + str + '">' + str + '</option>';
        }).join( '' );

        select.html( html );
    }
});