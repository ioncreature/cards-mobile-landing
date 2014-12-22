/**
 * @author Alexander Marenin
 * @date December 2014
 */

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
    eventer = window[eventMethod],
    messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message",
    iframe = document.getElementById( 'ourframe' );

eventer( messageEvent, function(){
    iframe.style.height = '200px';
}, false );

