// ==UserScript==
// @include         main
// ==/UserScript==

console.log("RightClickCloseTab.js");

(() => {
    if (gBrowser===undefined)
        // MrOtherGuy/fx-autoconfig workaround
        UC_API.Runtime.startupFinished().then(start_RightClickCloseTab);
    else
        start_RightClickCloseTab();

    function start_RightClickCloseTab() {
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
