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
        model = isMobile && getModel( ua ),
        modelName = model && getModelName( model );

    fs.appendFile( config.userAgents, (new Date).toISOString() + ': ' + ua + '\n' );

    res.render( 'landing', {
        isMobile: isMobile,
        modelName: modelName,
        url: modelName ? config.appUrls[modelName] : ''
    });
});


router.post( route.INDEX, function( req, res ){
    var ua = req.header( 'User-Agent' ),
        model = getModel( ua ) || req.body.model,
        email = req.body.email;

    if ( model && email )
        fs.appendFile( config.subscribers, JSON.stringify([(new Date).toISOString(), email, model, ua]) + '\n', util.noop );

    res.end();
});


function getModel( userAgent ){
    try {
        var info = userAgent
                .match( /\([^\(]*\)/ )[0]
                .replace( /[\(\)]/g, '' )
                .split( ';' ),
            device = info.pop().split( 'Build' )[0];
        return device && device.trim();
    } catch ( e ){
        console.log( 'error', e );
        return false;
    }
}


function getModelName( model ){
    var m = model && model.toLowerCase();
    return m && config.modelAliases[m];
}
