/**
 * @author Alexander Marenin
 * @date July 2014
 */

var router = require( 'express' ).Router(),
    fs = require( 'fs' ),
    mime = require( 'mime' ),
    registry = require( '../lib/registry' ),
    util = require( '../lib/util' ),
    async = require( 'async' ),
    join = require( 'path' ).join,
    config = registry.get( 'config' ),
    MobileDetect = require( 'mobile-detect' ),
    route = config.route;

module.exports = router;


router.get( route.INDEX, function( req, res ){
    var ua = new MobileDetect( req.header('User-Agent') ),
        isMobile = ua.phone();

    console.log( isMobile );
    console.log( ua );
    res.render( 'landing', {
        isMobile: isMobile,
        isModelOk: isMobile && config.availableModels.indexOf( isMobile ) > -1
    });
});


router.post( route.INDEX, function( req, res ){
    var ua = uaParser( req.header('User-Agent') ),
        model = ua.device.model || req.body.model,
        email = req.body.email;

    if ( model && email )
        fs.appendFileSync( config.subscribers, email + ' ' + model );

    res.end();
});
