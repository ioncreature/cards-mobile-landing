/**
 * @author Alexander Marenin
 * @date November 2014
 */

var data = {};


exports.get = function( key ){
    return data[key];
};


exports.set = function( key, value ){
    data[key] = value;
};