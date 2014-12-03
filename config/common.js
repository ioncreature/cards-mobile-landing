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
    'c6603',
    'c6833',
    'philips w336',
    'philips i908',
    'philips w5888' // Нигде не нашел юзер агента этого девайса, выдумал сам.
];

exports.modelAliases = {
    'nexus 5': 'Nexus 5', // На самом деле нет
    'c6833': 'Sony Xperia Z Ultra',
    'c6603': 'Sony Xperia Z',
    'htc one_m7': 'HTC One M7',
    'htc one_m8': 'HTC One M8',
    'htc_one_m8': 'HTC One M8',
    'htc_one': 'HTC One',
    'htc one_e8': 'HTC One E8',
    'htc one_e8 dual sim': 'HTC One E8 Dual SIM',
    'htc one max': 'HTC One Max',
    'htc one s': 'HTC One S',
    'htc one_s': 'HTC One S',
    'htc_one_s': 'HTC One S',
    'htc_onesv': 'HTC One SV',
    'philips w5888': 'Philips W5888',
    'philips w336': 'Philips W336',
    'philips i908': 'Philips I908'
};

exports.subscribers = join(__dirname, '..', 'subscribers' );
exports.userAgents = join(__dirname, '..', 'user-agents' );