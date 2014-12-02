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
    uaParser = require( 'user-agent-parser' ),
    route = config.route;

module.exports = router;


router.get( route.INDEX, function( req, res ){
    var ua = uaParser( req.header('User-Agent') ),
        model = ua.device.model,
        isMobile = ua.device.type === 'mobile';

    res.render( 'landing', {
        isMobile: isMobile,
        isModelOk: isMobile && config.availableModels.indexOf( model ) > -1,
        phoneModel: model
    });
});


// TODO: mock

function getAgentHardware( req ){
    console.log( uaParser(req.header( 'User-Agent' )) );
    return req.header( 'User-Agent' );
}


function isMobile( agentHardware ){
    return false;
}