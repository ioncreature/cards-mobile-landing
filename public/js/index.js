/**
 * @author Alexander Marenin
 * @date November 2014
 */

$( function(){
    $( 'form' ).submit( function( event ){
        if ( isValid(this) ){
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
            list = [];
        Object.keys( data ).forEach( function( vendor ){
            if ( data[vendor].length )
                data[vendor].forEach( function( model ){
                    list.push( vendor + ' ' + model );
                });
            else
                list.push( vendor );
        });

        var substringMatcher = function( strs ){
            var maxLength = 8;
            return function findMatches( q, cb ){
                var matches = [],
                    substrRegex = new RegExp( q, 'i' ),
                    i = 0;
                for (; i < strs.length; i++ ){
                    if ( substrRegex.test(strs[i] ) )
                        matches.push( {value: strs[i]} );
                    if ( matches.length >= maxLength )
                        break;
                }
                cb( matches );
            };
        };

        $( 'input[name="model"]' ).typeahead(
            {
                hint: false,
                highlight: true,
                minLength: 2
            },
            {
                name: 'models',
                displayKey: 'value',
                source: substringMatcher( list )
            }
        );
    }
});