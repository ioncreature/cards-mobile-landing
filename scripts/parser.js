/**
 * @author Alexander Marenin
 * @date November 2014
 */

var async = require( 'async' ),
    fs = require( 'fs' ),
    jsdom = require( 'jsdom' );

var vendorsObj = {
    "Acer": "http://android.sotovik.ru/catalog/acer/android/",
    "Alcatel": "http://windows.sotovik.ru/catalog/alcatel/windows/",
    "Apple": "http://www.sotovik.ru/catalog/apple/iphone/",
    "ASUS": "http://android.sotovik.ru/catalog/asus/android/",
    "DELL": "http://android.sotovik.ru/catalog/dell/android/",
    "Explay": "http://android.sotovik.ru/catalog/explay/android/",
    "Fly": "http://android.sotovik.ru/catalog/Fly/android/",
    "Gigabyte": "http://android.sotovik.ru/catalog/gigabyte/android/",
    "Highscreen": "http://android.sotovik.ru/catalog/highscreen/android/",
    "HTC": ["http://android.sotovik.ru/catalog/htc/android/", "http://windows.sotovik.ru/catalog/htc/windows/"],
    "Huawei": ["http://android.sotovik.ru/catalog/huawei/android/", "http://windows.sotovik.ru/catalog/huawei/windows/"],
    "LG": "http://android.sotovik.ru/catalog/lg/android/",
    "Motorola": "http://android.sotovik.ru/catalog/motorola/android/",
    "Nokia": ["http://android.sotovik.ru/catalog/nokia/android/", "http://windows.sotovik.ru/catalog/nokia/windows/"],
    "Oppo": "http://android.sotovik.ru/catalog/oppo/android/",
    "Pantech": "http://android.sotovik.ru/catalog/pantech/android/",
    "Samsung": ["http://android.sotovik.ru/catalog/samsung/android/", "http://windows.sotovik.ru/catalog/samsung/windows/"],
    "Sony": "http://android.sotovik.ru/catalog/sony/android/",
    "SonyEricsson": "http://android.sotovik.ru/catalog/sonyericsson/android/",
    "T-Mobile": "http://android.sotovik.ru/catalog/tmobile/android/",
    "TeXet": "http://android.sotovik.ru/catalog/texet/android/",
    "ViewSonic": "http://android.sotovik.ru/catalog/viewsonic/android/",
    "Zopo": "http://android.sotovik.ru/catalog/zopo/android/",
    "МегаФон": ["http://android.sotovik.ru/catalog/megafon/android/", "http://windows.sotovik.ru/catalog/megafon/windows/"],
    "МТС": "http://android.sotovik.ru/catalog/mts/android/"
};

var list = [];
Object.keys( vendorsObj ).forEach( function( vendor ){
    var urls = vendorsObj[vendor];
    urls = urls instanceof Array ? urls : [urls];
    urls.forEach( function( url ){
        list.push({
            name: vendor,
            url: url
        });
    });
});

var tasks = list.map( function( vendor ){
    return function( cb ){
        console.log( vendor.name );
        jsdom.env(
            vendor.url,
            [],
            function( errors, window ){
                if ( errors )
                    console.log( errors );
                else {
                    var res = [],
                        phones = Array.prototype.slice.call( window.document.querySelectorAll( '.phones > li > strong > a' ) ).forEach( function( elem ){
                            res.push( elem.innerHTML.trim() );
                        });
                    cb( null, {
                        vendor: vendor.name,
                        models: res
                    });
                }
            }
        );
    };
});


var start = Date.now();
async.parallelLimit( tasks, 7, function( error, results ){
    console.log( '\nTime elapsed ' + ((Date.now() - start) / 1000).toFixed( 1 ) + 's' );
    if ( error )
        console.log( error );
    else {
        var res = results.reduce( function( prev, item ){
            if ( prev[item.vendor] )
                prev[item.vendor].push.apply( prev[item.vendor], item.models );
            else
                prev[item.vendor] = item.models;

            prev[item.vendor].sort();
            return prev;
        }, {} );

        fs.writeFileSync( 'phones', JSON.stringify(res, null, '  '), {encoding: 'utf8'} );
        console.log( 'Success!' );
        process.exit();
    }
});