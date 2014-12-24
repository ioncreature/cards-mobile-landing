/**
 * @author Alexander Marenin
 * @date November 2014
 */

var crypto = require( 'crypto' ),
    querystring = require( 'querystring' );

exports.CONFIG_DIR = '../config/';
exports.noop = function(){};


/**
 * @param {string} route
 * @param {Object} data
 * @return string
 */
exports.format = function( route, data ){
    var placeholders = route.match( /:\w+/g ) || [],
        res = route,
        i;

    for ( i = 0; i < placeholders.length; i++ )
        res = res.replace( new RegExp(placeholders[i], 'g'), data[placeholders[i].substr(1)] );

    return res;
};


exports.formatUrl = function( route, data ){
    var encodedData = {};
    for ( var key in data )
        if ( data.hasOwnProperty(key) )
            encodedData[key] = querystring.escape( data[key] );
    return exports.format( route, encodedData );
};


/**
 * @param {Object} target
 * @return Object
 */
exports.mixin = function( target ){
    Array.prototype.slice.call( arguments, 1 ).forEach( function( arg ){
        Object.keys( arg ).forEach( function( propName ){
            target[propName] = arg[propName];
        });
    });

    return target;
};


/**
 * @param {string} configName
 * @param {string?} configDir
 * @return Object
 */
exports.getConfig = function( configName, configDir ){
    var dir = configDir || exports.CONFIG_DIR,
        common = requireConfig( 'common' );
    return exports.mixin( common, requireConfig(configName) );

    function requireConfig( name ){
        var conf = require( dir + name + '.js' );
        return conf._extends
            ? exports.mixin( requireConfig(conf._extends), conf )
            : conf;
    }
};


/**
 * @returns {Object}
 */
exports.getPackageInfo = function(){
    var fs = require( 'fs' ),
        path = require( 'path' );
    return JSON.parse( fs.readFileSync(path.join(__dirname, '..', 'package.json')) );
};


exports.stripTags = function stripTags( string ){
    return String( typeof string === 'undefined' ? '' : string ).replace( stripTags.re, '' );
};
exports.stripTags.re = /<[^>]+>/g;


/**
 * @param {Function} ChildClass
 * @param {Function} BaseClass
 */
exports.inherits = exports.inherit = require( 'util' ).inherits;


exports.abort = function abort( error ){
    if ( error ){
        console.error( error.message.red );
        console.error( error.stack );
    }
    process.abort( 1 );
};


Date.prototype.toStartOfDay = function(){
    this.setHours( 0 );
    this.setMinutes( 0 );
    this.setSeconds( 0 );
    this.setMilliseconds( 0 );
    return this;
};


Date.prototype.toEndOfDay = function(){
    this.setHours( 23 );
    this.setMinutes( 59 );
    this.setSeconds( 59 );
    this.setMilliseconds( 999 );
    return this;
};


Date.prototype.isValid = function(){
    return !isNaN( this.valueOf() );
};


Date.isValid = function( data ){
    var d = data instanceof Date ? data : new Date( data );
    return !isNaN( d.valueOf() );
};
