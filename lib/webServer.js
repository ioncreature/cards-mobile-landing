/**
 * @author Alexander Marenin
 * @date November 2014
 */

var http = require( 'http' ),
    express = require( 'express' ),
    join = require( 'path' ).join,
    favicon = require( 'serve-favicon' ),
    httpError = require( 'yahel' ),
    logger = require( 'morgan' ),
    bodyParser = require( 'body-parser' ),
    lessMiddleware = require( 'less-middleware' ),
    app = express(),
    util = require( './util' ),
    config = require( './registry' ).get( 'config' ),
    route = config.route,
    publicDir = join( __dirname, '..', 'public' );


app.set( 'views', join(__dirname, '..', 'views') );
app.set( 'view engine', 'jade' );
app.set( 'trust proxy', config.proxyUsed );
app.disable( 'view cache' );
app.disable( 'x-powered-by' );
app.set( 'json spaces', '    ' );

config.route.PREFIX = config.routePrefix;

app.locals.route = config.route;
app.locals.formatUrl = util.formatUrl;

app.use( favicon(join(publicDir, 'favicon.ico')) );
app.use( config.debug ? logger('dev') : logger() );
app.use( route.PREFIX + route.PUBLIC_CSS, lessMiddleware(join(publicDir, 'less'), {
    dest: join(publicDir, 'css'),
    prefix: 'css',
    force: false
}));
app.use( route.PREFIX + route.PUBLIC, function( req, res, next ){
    res.set('Access-Control-Allow-Origin', '*');
    next();
}, express.static(publicDir) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}) );
app.use( route.PREFIX + route.INDEX, require('../routes/index') );
app.use( function( req, res, next ){
    next( new httpError.NotFound );
});

app.use( function( err, req, res, next ){
    res.status( err.status || 500 );
    res.json({
        message: err.message,
        stack: config.debug ? err.stack : ''
    });
});

module.exports = function( callback ){
    http.createServer( app ).listen( config.port, callback );
};