/**
 * @author Alexander Marenin
 * @date December 2014
 */

$( function(){
    var form = $( 'form' ),
        name = form.find( 'input[name="name"]' ),
        email = form.find( 'input[type="email"]' ),
        phone = form.find( 'input[name="phone"]' ),
        model = form.find( 'select[name="model"]' ),
        version = form.find( 'input[name="version"]' ),
        imei = form.find( 'input[name="imei"]' ),
        comment = form.find( 'textarea[name="comment"]' ),
        agree = form.find( 'input[name="agree"]' );

    form.submit( function( event ){
        if ( isValid(this) ){
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    name: name.val(),
                    model: model.val(),
                    email: email.val(),
                    phone: phone.val(),
                    version: version.val(),
                    imei: imei.val(),
                    comment: comment.val(),
                    agree: agree.val()
                }
            });
            form.hide();
            $( '.thanks' ).show();
        }
        event.preventDefault();
        return false;
    });

    function isValid(){
        removeErrors( email, model, name, phone, version, imei, comment, agree );

        if ( !isEmail(email.val()) ){
            setError( email );
            return false;
        }

        return [name, model, phone, version, imei, comment, agree].every( function( elem ){
            if ( !elem.val() ){
                setError( elem );
                return false;
            }
            else
                return true;
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
        });
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

        var options = list.map( function( item ){
            return '<option value="' + item + '">' + item + '</option>';
        }).join( '' );

        model.append( options );

        //var substringMatcher = function( strs ){
        //    var maxLength = 8;
        //    return function findMatches( q, cb ){
        //        var matches = [],
        //            substrRegex = new RegExp( q, 'i' ),
        //            i = 0;
        //        for (; i < strs.length; i++ ){
        //            if ( substrRegex.test(strs[i] ) )
        //                matches.push( {value: strs[i]} );
        //            if ( matches.length >= maxLength )
        //                break;
        //        }
        //        cb( matches );
        //    };
        //};

        //$( 'input[name="model"]' ).typeahead(
        //    {
        //        hint: false,
        //        highlight: true,
        //        minLength: 2
        //    },
        //    {
        //        name: 'models',
        //        displayKey: 'value',
        //        source: substringMatcher( list )
        //    }
        //);
    }
});