/**
 * @author Alexander Marenin
 * @date November 2014
 */

var join = require( 'path' ).join;

exports.processTitle = 'device-monitor';

exports.cookieTtl = 6 * 3600 * 1000;

exports.proxyUsed = false;

exports.routePrefix = '';

exports.route = {
    PREFIX: '',
    INDEX: '/',
    AGENTS: '/wow/such/secure/link/for/user/agents',
    SUBSCRIBERS: '/wow/such/secure/link/for/subscribers',
    SUBSCRIBE_FORM: '/cloud/subscribe',
    SUBSCRIBE_FORM_DATA: '/cloud/subscribe/pa/pa/pi/du/pu',
    PRESSKIT_SUBSCRIBE: '/presskit/subscribe',
    PRESSKIT_SUBSCRIBE_DATA: '/presskit/subscribe/hey/who/they/are',
    PUBLIC: '/public',
    PUBLIC_CSS: '/public/css'
};

exports.modelAliases = {
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
    'htc desire 600': 'HTC One SV',
    'htc desire 500': 'HTC One SV',
    'htc desire 600 dual sim': 'HTC One SV',
    'htc desire 500 dual sim': 'HTC One SV',
    'philips w8555': 'Philips W8555',
    'philips w336': 'Philips W336',
    'philips i908': 'Philips i908'
};

exports.appUrls = {
    'Sony Xperia Z': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet.sony&device=C6603&version=25204040',
    'HTC One M8': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One_M8&version=25304040',
    'HTC One E8': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25204040',
    'HTC One SV': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One%20SV&version=25204040',
    'HTC One Max': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25204040',
    'HTC One': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25204040',
    'HTC One M7': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=HTC%20One&version=25204040',
    'Philips i908': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=Philips%20I908&version=25204040',
    'Philips W8555': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=Philips%20W8555&version=25204040',
    'Philips W336': 'http://apk-updater.cardsmobile.ru/resource-updater/loader/wallet/getAPK.apk?package=com.beskontakt.mobilewallet&device=Philips%20W336&version=25204040'
};

exports.subscribers = join(__dirname, '..', 'subscribers.log' );
exports.cloudSubscribers = join(__dirname, '..', 'cloud-subscribers.log' );
exports.presskitSubscribers = join(__dirname, '..', 'press-subscribers.log' );
exports.userAgents = join(__dirname, '..', 'user-agents.log' );
exports.phoneList = join(__dirname, '..', 'phones.json' );
exports.cloudPhoneList = join(__dirname, '..', 'cloud-phones' );

exports.login = 'wow login!';
exports.password = 'such password!';
