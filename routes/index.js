/**
 * @author Alexander Marenin
 * @date July 2014
 */

require('date-utils');

var router = require( 'express' ).Router(),
    fs = require( 'fs' ),
    registry = require( '../lib/registry' ),
    util = require( '../lib/util' ),
    async = require( 'async' ),
    basicAuth = require( 'basic-auth-connect' ),
    join = require( 'path' ).join,
    config = registry.get( 'config' ),
    MobileDetect = require( 'mobile-detect' ),
    mailer = require( 'nodemailer' ),
    directTransport = require( 'nodemailer-direct-transport' ),
    route = config.route,
    phonesString = loadPhonesString(),
    subscribePhonesString = loadCloudPhonesString();

module.exports = router;


router.get( route.INDEX, function( req, res ){
    var ua = req.header( 'User-Agent' ),
        md = new MobileDetect( ua ),
        isMobile = md.phone(),
        model = isMobile && getModel( ua ),
        modelName = model && getModelName( model );

    if ( isMobile && !modelName )
        fs.appendFile( config.userAgents, (new Date).toISOString() + ': ' + ua + '\n' );

    if ( isMobile )
        res.render( 'landing', {
            isMobile: isMobile,
            modelName: modelName,
            url: modelName ? config.appUrls[modelName] : ''
        });
    else
        res.render( 'desktop', {phones: phonesString} );
});


router.post( route.INDEX, function( req, res ){
    var ua = req.header( 'User-Agent' ),
        model = req.body.model || getModel( ua ),
        email = req.body.email;

    if ( model && email ){
        fs.appendFile( config.subscribers, JSON.stringify([(new Date).toISOString(), email, model, ua]) + '\n', util.noop );
        sendMail( email, console.log );
    }

    res.end();
});


router.get( route.AGENTS, function( req, res ){
    res.type = 'text/plain';
    res.sendFile( config.userAgents );
});


router
    .use( route.SUBSCRIBERS, basicAuth(config.login, config.password) )
    .get( route.SUBSCRIBERS, function( req, res ){
        res.type = 'text/plain';
        res.sendFile( config.subscribers );
    });


router.get( route.SUBSCRIBE_FORM, function( req, res ){
    res.render( 'cloud-subscribe', {
        url: route.PREFIX + route.SUBSCRIBE_FORM,
        phones: subscribePhonesString,
        data: {}
    });
});


router.post( route.SUBSCRIBE_FORM, function( req, res ){
    var b = req.body,
        name = b.name,
        email = b.email,
        phone = b.phone,
        model = b.model,
        version = b.version,
        imei = b.imei,
        comment = b.comment,
        city = b.city,
        agree = b.agree;

    if ( name && email && phone && model && version && imei && comment && agree && city ){
        fs.appendFile( config.cloudSubscribers, JSON.stringify({
            date: new Date,
            name: name,
            email: email,
            phone: phone,
            model: model,
            version: version,
            imei: imei,
            comment: comment,
            city: city
        }) + '\n', util.noop );
        res.render( 'cloud-subscribe', {thanks: true} );
        sendCloudMail( email, console.log );
    }
    else
        res.render( 'cloud-subscribe', {
            url: route.PREFIX + route.SUBSCRIBE_FORM,
            error: 'Все поля являются обязательными',
            phones: subscribePhonesString,
            data: b
        });
});


router
    .use( route.SUBSCRIBE_FORM_DATA, basicAuth(config.login, config.password) )
    .get( route.SUBSCRIBE_FORM_DATA, function( req, res ){
        var from = req.query.from,
            to = req.query.to,
            date = req.query.date,
            toDate,
            fromDate;

        if ( date && Date.isValid(date) ){
            fromDate = new Date( date );
            fromDate.toStartOfDay();

            toDate = new Date( date );
            toDate.toEndOfDay();
        }
        else if ( from || to ){
            if ( from === 'today' )
                fromDate = Date.today();
            else if ( from === 'yesterday' )
                fromDate = Date.yesterday();
            else if ( Date.isValid(from) )
                fromDate = new Date( from );

            if ( to === 'today' )
                toDate = Date.today().toEndOfDay();
            else if ( to === 'yesterday' )
                toDate = Date.yesterday().toEndOfDay();
            else if ( Date.isValid(to) )
                toDate = new Date( to );

            if ( fromDate && toDate && fromDate > toDate ){
                var tmp = fromDate;
                fromDate = toDate;
                toDate = tmp;
                fromDate.toStartOfDay();
                toDate.toEndOfDay();
            }
        }

        res.type( 'text/plain' );
        if ( fromDate || toDate ){
            var list = fs.readFileSync( config.cloudSubscribers, {encoding: 'utf8'} ).split( '\n' ),
                bom = '\uFEFF',
                csv = list
                    .map( function( line ){
                        try {
                            return JSON.parse( line );
                        }
                        catch( e ){
                            console.log( e );
                            console.log( line );
                            return undefined;
                        }
                    })
                    .filter( function( item ){
                        if ( !item )
                            return false;
                        else {
                            var ok = true;

                            if ( fromDate )
                                ok = fromDate <= new Date( item.date );

                            if ( ok && toDate )
                                ok = toDate >= new Date( item.date );

                            return ok;
                        }
                    })
                    .map( function( item ){
                        return '"' + [
                            item.date,
                            item.name,
                            item.email,
                            item.phone,
                            item.model,
                            item.version,
                            item.imei
                        ].join( '";"' ) + '";' + JSON.stringify( item.comment ) + ';"' + (item.city || '') + '"';
                    })
                    .join( '\n' );

            res.send( bom + csv );
        }
        else
            res.sendFile( config.cloudSubscribers );
    });


router.get( route.PRESSKIT_SUBSCRIBE, function( req, res ){
    res.render( 'presskit', {
        url: route.PREFIX + route.PRESSKIT_SUBSCRIBE
    });
});


router.post( route.PRESSKIT_SUBSCRIBE, function( req, res ){
    var email = req.body.email,
        str = (new Date).toISOString() + ',' + email + '\n';
    fs.appendFile( config.presskitSubscribers, str, {encoding: 'utf8'}, util.noop );
    res.end();

    //mailer
    //    .createTransport( directTransport({retryDelay: 1000, name: this.hostname}) )
    //    .sendMail({
    //        from: 'Страничка пресскита <presskit@cardsmobile.ru>',
    //        to: config.presskitTo,
    //        subject: 'Новый подписчик, аее!',
    //        text: email
    //    }, console.log );
});


router
    .use( route.PRESSKIT_SUBSCRIBE_DATA, basicAuth(config.login, config.password) )
    .get( route.PRESSKIT_SUBSCRIBE_DATA, function( req, res ){
        res.type = 'text/plain';
        res.sendFile( config.presskitSubscribers );
    });


function getModel( userAgent ){
    try {
        var info = userAgent
                .match( /\([^\(]*\)/ )[0]
                .replace( /[\(\)]/g, '' )
                .split( ';' ),
            device = info.pop().split( 'Build' )[0];
        return device && device.trim();
    } catch ( e ){
        console.log( 'error', e );
        return false;
    }
}


function getModelName( model ){
    var m = model && model.toLowerCase().replace( /_/g, ' ' );

    return m && config.modelAliases[m];
}


function sendMail( email, callback ){
    var transport = mailer.createTransport( directTransport({retryDelay: 1000, name: this.hostname}) );

    if ( !sendMail.html )
        sendMail.html = fs.readFileSync( join(__dirname, '../views/mail.html'), {encoding: 'utf8'} );

    transport.sendMail({
        from: 'Приложение «Кошелёк» <support@cardsmobile.ru>',
        to: email,
        subject: 'Благодарим за вашу заявку',
        html: sendMail.html
    }, callback );
}

function sendCloudMail( email, callback ){
    var transport = mailer.createTransport( directTransport({retryDelay: 1000, name: this.hostname}) );

    if ( !sendCloudMail.html )
        sendCloudMail.html = fs.readFileSync( join(__dirname, '../views/mail-cloud.html'), {encoding: 'utf8'} );

    transport.sendMail({
        from: 'Приложение «Кошелёк» <support@cardsmobile.ru>',
        to: email,
        subject: 'Заявка на участие в тестировании принята',
        html: sendCloudMail.html
    }, callback );
}


function loadPhonesString(){
    try {
        return fs.readFileSync(config.phoneList, {encoding: 'utf8'} );
    }
    catch ( error ){
        console.log( error );
        return '[]';
    }
}


function loadCloudPhonesString(){
    try {
        return fs
            .readFileSync(config.cloudPhoneList, {encoding: 'utf8'} )
            .replace( /\n/gm, ';' )
            .replace( /\r/gm, '' );
    }
    catch ( error ){
        console.log( error );
        return '[]';
    }
}
