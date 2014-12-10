/**
 * @author Alexander Marenin
 * @date November 2014
 */

var join = require( 'path' ).join;

exports.title = 'Cards Mobile';

exports.processTitle = 'device-monitor';

exports.cookieTtl = 6 * 3600 * 1000;

exports.proxyUsed = false;

exports.routePrefix = '';

exports.route = {
    PREFIX: '',
    INDEX: '/',
    AGENTS: '/wow/such/secure/link/for/user/agents',
    PUBLIC: '/public',
    PUBLIC_CSS: '/public/css'
};

exports.modelAliases = {
    //'nexus 5': 'Nexus 5', // На самом деле нет
    'sonyc6603': 'Sony Xperia Z',
    'sony c6603': 'Sony Xperia Z',
    'c6603': 'Sony Xperia Z',
    'htc one m7': 'HTC One M7',
    'htc one m7 dual sim': 'HTC One M7',
    'htc one m8': 'HTC One M8',
    'htc one m8 dual sim': 'HTC One M8',
    'htc one': 'HTC One',
    'htc one dual sim': 'HTC One',
    'htc one e8': 'HTC One E8',
    'htc one e8 dual sim': 'HTC One E8',
    'htc one max': 'HTC One Max',
    'htc onesv': 'HTC One SV',
    'htc one sv': 'HTC One SV',
    'htc desire 600 dual sim': 'HTC Desire 600',
    'htc desire 500 dual sim': 'HTC Desire 500',
    'philips w8555': 'Philips W8555',
    'philips w336': 'Philips W336',
    'philips i908': 'Philips i908'
};

exports.appUrls = {
    //'Nexus 5': 'http://google.com/nexus/5', // На самом деле нет
    'Sony Xperia Z': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet.sony&device=C6603&version=25112040',
    'HTC One M8': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25102040',
    'HTC One E8': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25102040',
    'HTC One SV': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One%20SV&version=25102040',
    'HTC Desire 600': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One%20SV&version=25102040',
    'HTC Desire 500': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One%20SV&version=25102040',
    'HTC One Max': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25102040',
    'HTC One': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25102040',
    'HTC One M7': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25102040',
    'Philips i908': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=Philips%20I908&version=25102040',
    'Philips W8555': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=Philips%20W8555&version=25102040',
    'Philips W336': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=Philips%20W336&version=25102040'
};

exports.subscribers = join(__dirname, '..', 'subscribers.log' );
exports.userAgents = join(__dirname, '..', 'user-agents.log' );
exports.phoneList = join(__dirname, '..', 'phones' );