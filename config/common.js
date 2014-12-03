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
    'c6603': 'Sony Xperia Z',
    'htc one_m7': 'HTC One M7',
    'htc one_m8': 'HTC One M8',
    'htc_one_m8': 'HTC One M8',
    'htc_one_m8 dual sim': 'HTC One M8',
    'htc_one': 'HTC One',
    'htc one_e8': 'HTC One E8',
    'htc one_e8 dual sim': 'HTC One E8',
    'htc one max': 'HTC One Max',
    'htc one s': 'HTC One S',
    'htc one_s': 'HTC One S',
    'htc_one_s': 'HTC One S',
    'htc_onesv': 'HTC One SV',
    'philips w8555': 'Philips W8555',
    'philips w336': 'Philips W336',
    'philips i908': 'Philips i908'
};

exports.appUrls = {
    'Sony Xperia Z': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK?package=com.beskontakt.mobilewallet.sony&device=C6603&version=25024040',
    'HTC One M8': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK?package=com.beskontakt.mobilewallet&device=HTC%20One_M8&version=25024040',
    'HTC One E8': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK?package=com.beskontakt.mobilewallet&device=HTC%20One_M8&version=25024040',
    'HTC One SV': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK?package=com.beskontakt.mobilewallet&device=HTC%20One%20SV&version=25024040',
    'HTC One Max': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25024040',
    'Philips i908': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK?package=com.beskontakt.mobilewallet&device=Philips%20I908&version=25024040',
    'Philips W8555': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK?package=com.beskontakt.mobilewallet&device=Philips%20W8555&version=25024040',
    'Philips W336': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK?package=com.beskontakt.mobilewallet&device=Philips%20W336&version=25024040'
};

exports.subscribers = join(__dirname, '..', 'subscribers' );
exports.userAgents = join(__dirname, '..', 'user-agents' );