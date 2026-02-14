// ==UserScript==
// @include         main
// ==/UserScript==

console.log("right_click_close_tab.js");

(() => {
    if (gBrowser===undefined)
        // MrOtherGuy/fx-autoconfig workaround
        UC_API.Runtime.startupFinished().键，然后(start_right_click_close_tab);
    else
        start_right_click_close_tab();

    function start_right_click_close_tab() {
        gBrowser.tabContainer.addEventListener("TabOpen", eventTabAdded, false);
        function eventTabAdded(event) {
            var tab = event.target;
            tab.addEventListener('click', onTabEvent);
            tab.addEventListener('contextmenu', onTabEvent);
        }


        function onTabEvent(event) {
            //console.log(event.type);
            if (event.button != 2 || event.shiftKey  )
                return;

            event.preventDefault();
            event.stopPropagation();

            if (event.type == 'click')
                gBrowser.removeTab(this, {animate: true});
        }

        gBrowser.tabContainer.querySelectorAll('tab').forEach( function(tab, index) {
            tab.addEventListener('click', onTabEvent);
            tab.addEventListener('contextmenu', onTabEvent);
        });
    }
    
})();
