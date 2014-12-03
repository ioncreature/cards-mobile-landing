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
    'htc_one_m8',
    'htc_one',
    'htc one_m7',
    'htc one max',
    'htc one_e8',
    'htc one_e8 dual sim',
    'htc one s',
    'htc_onesv',
    'c6603', // Sony Xperia Z
    'philips w336',
    'philips i908',
    'philips w5888' // Нигде не нашел юзер агента этого девайса, выдумал сам.
];

exports.modelAliases = {
    'c6833': 'Sony Xperia Z',
    'C6603': 'Sony Xperia Z',
    'htc one_m7': 'HTC One M7',
    'htc one_m8': 'HTC One M8',
    'htc_one_m8': 'HTC One M8',
    'htc_one': 'HTC One',
    'htc_onesv': 'HTC One SV',
    'htc one_e8': 'HTC One E8',
    'htc one_e8 dual sim': 'HTC One E8 Dual SIM'
};

exports.subscribers = join(__dirname, '..', 'subscribers' );