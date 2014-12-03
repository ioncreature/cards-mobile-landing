/**
 * @author Alexander Marenin
 * @date November 2014
 */

var join = require( 'path' ).join;

exports.title = 'Cards Mobile';

exports.processTitle = 'device-monitor';

exports.cookieTtl = 6 * 3600 * 1000;

exports.proxyUsed = false;

exports.route = {
    INDEX: '/',
    PUBLIC: '/public',
    PUBLIC_CSS: '/public/css'
};

exports.availableModels = [
    'nexus 5', // На самом деле нет
    'htc one_m8',
    'htc one_m7',
    'htc one max',
    'htc one_e8 dual sim',
    'htc one_e8',
    'htc one s',
    'c6833', // Sony Xperia Z
    'philips w336',
    'philips w5888' // Нигде не нашел юзер агента этого девайса, выдумал сам.
];

exports.modelAliases = {
    'c6833': 'Sony Xperia Z'
};

exports.subscribers = join(__dirname, '..', 'subscribers' );