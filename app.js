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


var ScreenShooter = require( './lib/ScreenShooter' ),
    screenShooter = new ScreenShooter({
        stdoutPath: config.stdoutPath,
        stderrPath: config.stderrPath,
        screenshoterPath: config.screenshoterPath,
        loopInterval: config.screenshoterInterval,
        timeout: config.screenshoterTimeout
    });
registry.set( 'screenShooter', screenShooter );

if ( program.screenshot ){
    console.log( 'start collecting' );
    screenShooter.collect( function(){
        console.log( 'Collecting finished' );
        process.exit();
    });
}
else {
    screenShooter.startLoop();
    var server = require( './lib/webServer' );
    server( function( error ){
        if ( error )
            util.abort( error );
        else
            console.log( 'Server listening on port %s', config.port );
    });
}

