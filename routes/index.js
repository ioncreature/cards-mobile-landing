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
    route = config.route;

module.exports = router;


router.get( route.INDEX, function( req, res ){
    var agentHardware = getAgentHardware( req ),
        phoneModel = config.availableModels[agentHardware];

    res.render( 'landing', {
        isMobile: isMobile( agentHardware ),
        isModelOk: !!phoneModel,
        phoneModel: agentHardware
    });
});


// TODO: mock

function getAgentHardware( req ){
    return req.header( 'User-Agent' );
}


function isMobile( agentHardware ){
    return false;
}