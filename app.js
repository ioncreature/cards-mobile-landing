#!/usr/bin/env node
/**
 * @author Alexander Marenin
 * @date November 2014
 */

var program = require( 'commander' ),
    util = require( './lib/util' ),
    packageInfo = util.getPackageInfo(),
    registry = require( './lib/registry' );


program
    .version( packageInfo.version )
    .usage( '[options]' )
    .option( '-c, --config [name]', 'set the config name to use, default is "dev"', 'dev' )
    .option( '-s, --screenshot', 'make screenshots' );

program.parse( process.argv );
var config = util.getConfig( program.config );
process.title = config.processTitle;
registry.set( 'config', config );

var server = require( './lib/webServer' );
server( function( error ){
    if ( error )
        util.abort( error );
    else
        console.log( 'Server listening on port %s', config.port );
});
