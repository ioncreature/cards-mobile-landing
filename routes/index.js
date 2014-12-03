/**
 * @author Alexander Marenin
 * @date July 2014
 */

var router = require( 'express' ).Router(),
    fs = require( 'fs' ),
    registry = require( '../lib/registry' ),
    util = require( '../lib/util' ),
    async = require( 'async' ),
    join = require( 'path' ).join,
    config = registry.get( 'config' ),
    MobileDetect = require( 'mobile-detect' ),
    route = config.route;

module.exports = router;


router.get( route.INDEX, function( req, res ){
    var ua = req.header( 'User-Agent' ),
        md = new MobileDetect( ua ),
        isMobile = md.phone(),
        model = isMobile && getModel( ua );

    console.log( ua );
    console.log( md );
    console.log( model );

    res.render( 'landing', {
        isMobile: isMobile,
        model: model,
        isModelOk: true
        //isModelOk: isMobile && config.availableModels.indexOf( model ) > -1
    });
});


router.post( route.INDEX, function( req, res ){
    var ua = req.header( 'User-Agent' ),
        model = getModel( ua ) || req.body.model,
        email = req.body.email;

    if ( model && email )
        fs.appendFile( config.subscribers, [new Date, email, model, '\n'].join(';'), util.noop );

    res.end();
});


function getModel( userAgent ){
    try {
        var device = userAgent
            .match( /\([^\(]*\)/ )[0]
            .replace( /[\(\)]/g, '' )
            .split( ';' )[2];
        return device && device.trim();
    } catch ( e ){
        console.log( 'error', e );
        return false;
    }
}
